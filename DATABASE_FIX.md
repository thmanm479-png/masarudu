# 🔧 حل مشكلة الاتصال بقاعدة البيانات

## المشكلة:
Vercel (serverless) يحتاج إلى **connection pooling** للاتصال بـ Supabase، لكن المتغيرات الحالية تستخدم direct connection.

## الحل:

### 1. تحديث متغيرات البيئة على Vercel

افتح: https://vercel.com/thmanm479-4155s-projects/masar-osman/settings/environment-variables

**احذف أو عدّل المتغيرات التالية:**

#### DATABASE_URL (للاستعلامات العادية):
```
postgresql://postgres.triwrtqolnqkfempwlqz:Admin@Masar2024@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

#### DIRECT_URL (للـ migrations):
```
postgresql://postgres:Admin@Masar2024@db.triwrtqolnqkfempwlqz.supabase.co:5432/postgres
```

### 2. الشرح:

- **Port 6543** = Connection Pooler (Supavisor) ← لـ Vercel
- **Port 5432** = Direct Connection ← للتطوير المحلي والـ migrations
- **`?pgbouncer=true`** = مطلوب لـ Prisma مع pooling
- **`connection_limit=1`** = أمثل لـ serverless

### 3. بعد التحديث:

```bash
vercel --prod
```

---

## البديل الأفضل: استخدام Prisma Accelerate

إذا استمرت المشكلة، استخدم Prisma Accelerate:

1. اذهب إلى: https://console.prisma.io
2. أنشئ مشروع جديد
3. احصل على connection string مع pooling
4. استخدمه في Vercel

---

## تحقق
من الاتصال:

بعد التغيير، جرّب فتح:
- https://masar-osman.vercel.app/admin/login
- https://masar-osman.vercel.app/register
