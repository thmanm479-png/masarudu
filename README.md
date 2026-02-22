# MASAR - نظام إدارة الطلاب والوكلاء

نظام شامل لإدارة الطلاب والوكلاء والجامعات مبني بتقنيات حديثة.

## 🚀 التقنيات المستخدمة

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: JWT + Cookies
- **Deployment**: Vercel / Netlify

## 📋 المتطلبات

- Node.js 18+ 
- npm أو yarn
- حساب Supabase

## ⚙️ التثبيت

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd masar-osman
```

2. **تثبيت المكتبات**
```bash
npm install
```

3. **إعداد متغيرات البيئة**

أنشئ ملف `.env` في المجلد الرئيسي:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?connection_limit=3"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
JWT_SECRET="your-secret-key"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

4. **إعداد قاعدة البيانات**
```bash
npx prisma generate
npx prisma db push
```

5. **تشغيل المشروع**
```bash
npm run dev
```

المشروع سيعمل على: `http://localhost:3000`

## 📁 هيكل المشروع

```
masar-osman/
├── app/                    # صفحات Next.js (App Router)
│   ├── admin/             # لوحة تحكم الأدمن
│   ├── agent/             # لوحة تحكم الوكيل
│   ├── api/               # API Routes
│   └── ...
├── components/            # المكونات القابلة لإعادة الاستخدام
├── lib/                   # المكتبات والأدوات المساعدة
├── prisma/               # Prisma Schema
├── public/               # الملفات الثابتة
└── scripts/              # سكريبتات مساعدة
```

## 🔑 الميزات الرئيسية

### للأدمن
- ✅ إدارة الوكلاء والموظفين
- ✅ إدارة الطلاب والعملاء
- ✅ إدارة الجامعات
- ✅ إدارة محتوى الموقع
- ✅ إحصائيات شاملة

### للوكلاء
- ✅ إضافة وإدارة العملاء
- ✅ تتبع حالة الطلبات
- ✅ عرض الجامعات المتاحة
- ✅ إدارة الملف الشخصي

### للزوار
- ✅ عرض الجامعات
- ✅ نموذج التواصل
- ✅ التسجيل كوكيل
- ✅ الأسئلة الشائعة

## 🔒 الأمان

- مصادقة JWT
- تشفير كلمات المرور (bcrypt)
- حماية CSRF
- التحقق من الصلاحيات
- Row Level Security (RLS) على Supabase

## 📦 النشر

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod
```

## 🛠️ سكريبتات مفيدة

```bash
# تشغيل بيئة التطوير
npm run dev

# بناء للإنتاج
npm run build

# تشغيل الإنتاج محلياً
npm start

# فحص الأكواد
npm run lint

# تحديث قاعدة البيانات
npx prisma db push

# فتح Prisma Studio
npx prisma studio
```

## 📝 ملاحظات مهمة

1. **قبل النشر للإنتاج**: 
   - فعّل RLS على جميع الجداول في Supabase
   - غيّر `JWT_SECRET` إلى قيمة قوية
   - تأكد من تحديث متغيرات البيئة

2. **الأمان**:
   - لا ترفع ملف `.env` على GitHub
   - استخدم متغيرات البيئة في منصة النشر

3. **قاعدة البيانات**:
   - يجب إنشاء مستخدم Admin أول مرة يدوياً
   - استخدم سكريبت `scripts/seed.ts` لإضافة بيانات تجريبية

## 🤝 المساهمة

المشروع مفتوح للتطوير والتحسين.

## 📄 الترخيص

جميع الحقوق محفوظة © 2026 MASAR

## 📞 التواصل

للاستفسارات والدعم الفني، يرجى التواصل عبر:
- البريد الإلكتروني: admin@masar-edu.com

---

**تم التطوير بواسطة**: فريق MASAR
**آخر تحديث**: فبراير 2026
