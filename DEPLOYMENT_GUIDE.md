# دليل النشر - MASAR

## 📋 قائمة التحقق قبل النشر

### 1. الأمان
- [ ] تفعيل RLS على جميع الجداول في Supabase
- [ ] تغيير `JWT_SECRET` إلى قيمة قوية وعشوائية
- [ ] التأكد من عدم رفع ملف `.env` على GitHub
- [ ] مراجعة جميع API endpoints للتأكد من الحماية
- [ ] تفعيل HTTPS فقط

### 2. قاعدة البيانات
- [ ] عمل نسخة احتياطية من قاعدة البيانات
- [ ] التأكد من تطبيق جميع Migrations
- [ ] إضافة Indexes على الأعمدة المستخدمة بكثرة
- [ ] التحقق من وجود مستخدم Admin

### 3. متغيرات البيئة
- [ ] إضافة جميع المتغيرات في منصة النشر
- [ ] التأكد من صحة DATABASE_URL
- [ ] التأكد من صحة SUPABASE URLs و Keys

### 4. الأداء
- [ ] تفعيل Image Optimization
- [ ] تفعيل Caching
- [ ] تصغير الملفات (Build optimization)
- [ ] اختبار سرعة التحميل

### 5. الاختبار
- [ ] اختبار جميع الصفحات
- [ ] اختبار تسجيل الدخول (Admin & Agent)
- [ ] اختبار إضافة/تعديل/حذف البيانات
- [ ] اختبار النماذج
- [ ] اختبار على أجهزة مختلفة

---

## 🚀 النشر على Vercel

### الخطوات:

1. **تثبيت Vercel CLI**
```bash
npm i -g vercel
```

2. **تسجيل الدخول**
```bash
vercel login
```

3. **ربط المشروع**
```bash
vercel link
```

4. **إضافة متغيرات البيئة**
```bash
vercel env add DATABASE_URL
vercel env add DIRECT_URL
vercel env add JWT_SECRET
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

أو من لوحة تحكم Vercel:
- اذهب إلى Settings → Environment Variables
- أضف جميع المتغيرات من ملف `.env`

5. **النشر**
```bash
# للاختبار
vercel

# للإنتاج
vercel --prod
```

### إعدادات إضافية في Vercel:

في ملف `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

---

## 🌐 النشر على Netlify

### الخطوات:

1. **تثبيت Netlify CLI**
```bash
npm i -g netlify-cli
```

2. **تسجيل الدخول**
```bash
netlify login
```

3. **تهيئة المشروع**
```bash
netlify init
```

4. **إضافة متغيرات البيئة**

من لوحة تحكم Netlify:
- اذهب إلى Site settings → Environment variables
- أضف جميع المتغيرات

5. **النشر**
```bash
# بناء المشروع
npm run build

# النشر
netlify deploy --prod
```

### إعدادات Netlify:

في ملف `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## 🔒 تفعيل RLS على Supabase

قبل النشر، يجب تفعيل Row Level Security:

```sql
-- تفعيل RLS على جميع الجداول
ALTER TABLE "Admin" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Agent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Client" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Employee" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "University" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ContactSubmission" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SiteContent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Settings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FAQ" ENABLE ROW LEVEL SECURITY;

-- إضافة سياسات للقراءة العامة (مثال)
CREATE POLICY "Allow public read access" ON "University"
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON "FAQ"
  FOR SELECT USING (true);

-- سياسات للـ Admin (يجب تخصيصها حسب احتياجاتك)
CREATE POLICY "Admin full access" ON "Admin"
  FOR ALL USING (auth.role() = 'authenticated');
```

---

## 🔍 اختبار بعد النشر

### قائمة الاختبار:

1. **الصفحة الرئيسية**
   - [ ] تحميل الصفحة بنجاح
   - [ ] عرض الجامعات
   - [ ] عمل النماذج

2. **تسجيل الدخول**
   - [ ] Admin login
   - [ ] Agent login
   - [ ] معالجة الأخطاء

3. **لوحة تحكم Admin**
   - [ ] عرض الإحصائيات
   - [ ] إدارة الوكلاء
   - [ ] إدارة العملاء
   - [ ] إدارة الجامعات

4. **لوحة تحكم Agent**
   - [ ] عرض العملاء
   - [ ] إضافة عميل جديد
   - [ ] تعديل البيانات

5. **الأداء**
   - [ ] سرعة التحميل < 3 ثواني
   - [ ] عمل الصور بشكل صحيح
   - [ ] لا توجد أخطاء في Console

---

## 🐛 حل المشاكل الشائعة

### مشكلة: Database Connection Error
**الحل**: تحقق من صحة `DATABASE_URL` في متغيرات البيئة

### مشكلة: 500 Internal Server Error
**الحل**: تحقق من logs في منصة النشر

### مشكلة: Authentication Failed
**الحل**: تحقق من `JWT_SECRET` وتأكد من تطابقه

### مشكلة: Images not loading
**الحل**: تحقق من إعدادات `next.config.mjs` و domains

---

## 📊 المراقبة والصيانة

### بعد النشر:

1. **مراقبة الأداء**
   - استخدم Vercel Analytics أو Netlify Analytics
   - راقب استخدام قاعدة البيانات في Supabase

2. **النسخ الاحتياطي**
   - اعمل نسخة احتياطية من قاعدة البيانات أسبوعياً
   - احفظ نسخة من الكود على GitHub

3. **التحديثات**
   - حدّث المكتبات بانتظام
   - راقب التحديثات الأمنية

---

## 📞 الدعم

في حالة وجود مشاكل:
1. راجع Logs في منصة النشر
2. تحقق من Supabase Dashboard
3. راجع هذا الدليل

**ملاحظة**: تأكد من عمل نسخة احتياطية قبل أي تغيير كبير!
