# دليل النشر والإطلاق - منصة مسار التعليمية

هذا الدليل يشرح خطوات تجهيز ورفع الموقع للنشر النهائي.

## 1. تجهيز قاعدة البيانات (Prisma)

الموقع يعتمد على قاعدة بيانات لتخزين طلبات التسجيل والجامعات. عند الرفع على منصة مثل Vercel أو Netlify، يجب توفير قاعدة بيانات (Postgres).

### الخطوات:
1. قم بإنشاء قاعدة بيانات جديدة على خدمة مثل [Supabase](https://supabase.com/) أو [Neon](https://neon.tech/) (مجاناً).
2. احصل على رابط الاتصال (Connection String).
3. أضفه في متغيرات البيئة (Environment Variables) في منصة الاستضافة باسم `DATABASE_URL`.

## 2. متغيرات البيئة (Environment Variables)

تأكد من إعداد المتغيرات التالية في منصة الاستضافة:

```
DATABASE_URL="postgresql://user:password@host:port/database"
```

## 3. رفع الموقع (Deployment)

نوصي باستخدام **Vercel** للأداء الأفضل مع Next.js.

### النشر على Vercel:
1. ارفع الكود إلى GitHub.
2. سجل دخولك في Vercel واربط حساب GitHub.
3. اختر مستودع المشروع.
4. في **Environment Variables**، أضف `DATABASE_URL` و `JWT_SECRET`.
5. اضغط **Deploy**.

### النشر على Netlify:
1. ارفع الكود إلى GitHub.
2. سجل دخولك في Netlify واضغط على **Add new site** ثم **Import an existing project**.
3. اربط حساب GitHub واختر مستودع المشروع.
4. في خطوة **Site configuration**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. اضغط على **Add environment variables** وأضف:
   - `DATABASE_URL`: (رابط قاعدة بيانات Postgres من Supabase أو Neon).
   - `JWT_SECRET`: (أي نص طويل ومعقد لتأمين تسجيل دخول الوكلاء).
6. اضغط **Deploy site**.

## 4. ما بعد النشر

- **تهيئة قاعدة البيانات:**
  بعد النشر، قد تحتاج لتشغيل هذا الأمر لضمان تطابق قاعدة البيانات مع المخطط (Schema):
  `npx prisma migrate deploy`
  (يمكنك إضافته في `package.json` كـ `postinstall` script، وهو موجود بالفعل).

- **ملاحظة:**
  تمت إضافة بيانات تجريبية (Fallback Data) لصفحة الجامعات، بحيث يظهر الموقع بشكل متكامل وجذاب حتى لو لم يتم ملء قاعدة البيانات فوراً.

## 5. إدارة المحتوى

- لإضافة جامعات جديدة، يمكنك استخدام لوحة تحكم قاعدة البيانات (مثل Supabase Dashboard) أو بناء لوحة تحكم خاصة (Admin Dashboard) مستقبلاً.
- طلبات التسجيل تصل حالياً إلى قاعدة البيانات، ويمكنك ربطها بخدمة بريد إلكتروني إذا رغبت في إشعارات فورية.

بالتوفيق في مشروعك!
