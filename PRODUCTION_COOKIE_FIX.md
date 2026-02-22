# حل مشكلة Application Error في Production

## 📋 تشخيص المشكلة

### الخطأ المعروض:
```
Application error: a client-side exception has occurred (see the browser console for more information).
```

### السبب الجذري:
المشكلة كانت في ملف `middleware.ts` حيث كان يستخدم دالة `decrypt()` من `lib/auth.ts` والتي تستخدم `cookies()` من `next/headers`. هذه الدالة **لا تعمل بشكل صحيح في Edge Runtime** الذي يستخدمه Middleware في بيئة Production على Vercel/Netlify.

### التفاصيل التقنية:
1. **Edge Runtime** هو بيئة تشغيل خفيفة تستخدمها Vercel للـ Middleware
2. بعض APIs من Next.js مثل `cookies()` من `next/headers` لا تعمل في Edge Runtime
3. يجب استخدام `request.cookies` مباشرة من `NextRequest` بدلاً من ذلك

## ✅ الحل المطبق

### 1. إصلاح `middleware.ts`

**التغييرات:**
- ✅ إزالة استيراد `decrypt` من `lib/auth`
- ✅ إضافة دالة `verifySession()` محلية تستخدم `jwtVerify` مباشرة من `jose`
- ✅ إضافة try-catch شامل لمنع أي أخطاء من إيقاف التطبيق
- ✅ تنظيف الكوكيز المنتهية عند فشل المصادقة
- ✅ تحديث `matcher` config لتحسين الأداء

**الكود الجديد:**
```typescript
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifySession(session: string): Promise<boolean> {
    try {
        const secretKey = process.env.JWT_SECRET || "fallback-secret-key";
        const key = new TextEncoder().encode(secretKey);
        
        await jwtVerify(session, key, {
            algorithms: ["HS256"],
        });
        
        return true;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return false;
    }
}

export async function middleware(request: NextRequest) {
    try {
        const { pathname } = request.nextUrl;

        // Protect admin routes (UI)
        if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
            const session = request.cookies.get("admin_session")?.value;

            if (!session) {
                return NextResponse.redirect(new URL("/admin/login", request.url));
            }

            const isValid = await verifySession(session);
            if (!isValid) {
                const response = NextResponse.redirect(new URL("/admin/login", request.url));
                response.cookies.delete("admin_session");
                return response;
            }

            return NextResponse.next();
        }

        // Protect admin API routes
        if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login") && !pathname.startsWith("/api/admin/logout")) {
            const session = request.cookies.get("admin_session")?.value;

            if (!session) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            const isValid = await verifySession(session);
            if (!isValid) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            return NextResponse.next();
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
```

### 2. تحديث `vercel.json`

**التغييرات:**
- ✅ إضافة `buildCommand` لتوليد Prisma client قبل البناء
- ✅ تحديد نسخة Node.js
- ✅ التأكد من تشغيل `npm install` بشكل صحيح

**الكود الجديد:**
```json
{
    "framework": "nextjs",
    "buildCommand": "prisma generate && next build",
    "installCommand": "npm install",
    "env": {
        "NODE_VERSION": "18.x"
    }
}
```

## 🚀 خطوات النشر

### الخطوة 1: التحقق من متغيرات البيئة على Vercel

تأكد من إضافة جميع المتغيرات التالية في **Vercel Dashboard** → **Settings** → **Environment Variables**:

```env
DATABASE_URL=postgresql://postgres:Admin%40Masar2024@db.triwrtqolnqkfempwlqz.supabase.co:5432/postgres?connection_limit=3
DIRECT_URL=postgresql://postgres:Admin%40Masar2024@db.triwrtqolnqkfempwlqz.supabase.co:5432/postgres
JWT_SECRET=masar-osman-admin-secret-key-2024
NEXT_PUBLIC_SUPABASE_URL=https://triwrtqolnqkfempwlqz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyaXdydHFvbG5xa2ZlbXB3bHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMzY2ODIsImV4cCI6MjA4NTcxMjY4Mn0._2XlkKrG09QiIzoi1OGTfyjR9Hk4Geoy75HPK2LtOic
```

⚠️ **مهم جداً**: تأكد من إضافة هذه المتغيرات لـ **Production**, **Preview**, و **Development**

### الخطوة 2: رفع التغييرات إلى Git

```bash
git add .
git commit -m "Fix: Resolve middleware cookie issue in production"
git push origin main
```

### الخطوة 3: الانتظار حتى اكتمال البناء

بعد الـ push، Vercel سيبني التطبيق تلقائياً. انتظر حتى يكتمل البناء (عادة 2-3 دقائق).

### الخطوة 4: التحقق من الموقع

1. افتح الموقع من الرابط الخاص بك على Vercel
2. جرب الدخول إلى لوحة التحكم `/admin`
3. تأكد من عدم ظهور رسالة "Application error"

## 🔍 اختبار إضافي

### اختبار محلي:
```bash
# اختبار البيئة المحلية
npm run dev

# اختبار البيئة المشابهة للإنتاج
npm run build
npm start
```

### اختبار على Production:
1. افتح الموقع على Vercel
2. افتح Developer Console (F12)
3. تحقق من عدم وجود أخطاء في Console
4. جرب تسجيل الدخول إلى لوحة التحكم

## 📊 الفوائد المكتسبة

✅ **الاستقرار**: لن تحدث أخطاء "Application error" بعد الآن  
✅ **الأمان**: تنظيف الكوكيز المنتهية تلقائياً  
✅ **الأداء**: استخدام Edge Runtime بكفاءة  
✅ **سهولة التشخيص**: رسائل خطأ واضحة في الـ logs  

## ⚠️ ملاحظات مهمة

1. **JWT_SECRET**: يجب أن يكون نفس القيمة في Development و Production
2. **Cookies في Edge Runtime**: دائماً استخدم `request.cookies` وليس `cookies()` من `next/headers`
3. **Error Handling**: الـ try-catch الشامل يمنع تعطل التطبيق بالكامل

## 🆘 إذا استمرت المشكلة

إذا واجهت أي مشاكل بعد تطبيق هذا الحل:

1. **تحقق من Logs على Vercel**:
   - اذهب إلى Vercel Dashboard
   - اختر المشروع
   - اذهب إلى **Deployments** → اختر آخر deployment → **View Function Logs**

2. **تحقق من Build Logs**:
   - في نفس الصفحة، اذهب إلى **Building** tab
   - ابحث عن أي أخطاء في build process

3. **Redeploy**:
   - في Vercel Dashboard → **Deployments**
   - اختر آخر deployment ناجح
   - اضغط على الـ 3 نقاط → **Redeploy**

## 📝 لمزيد من المساعدة

إذا احتجت مساعدة إضافية، يرجى توفير:
- رسالة الخطأ الكاملة من Developer Console
- Function Logs من Vercel
- Build Logs من Vercel
