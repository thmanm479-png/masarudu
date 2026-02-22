#!/bin/bash

echo "🚀 بدء نشر موقع Masar Education على Vercel..."
echo ""

# التحقق من تثبيت Vercel CLI
if ! command -v vercel &> /dev/null
then
    echo "📦 تثبيت Vercel CLI..."
    npm install -g vercel
fi

# التحقق من نجاح البناء
echo "🔨 بناء المشروع للتأكد من عدم وجود أخطاء..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ البناء نجح!"
    echo ""
    echo "📤 الآن سيتم نشر المشروع..."
    echo ""
    
    # النشر على Vercel
    vercel --prod
    
    echo ""
    echo "✅ تم النشر بنجاح!"
    echo "🌐 افتح الرابط الذي ظهر أعلاه لرؤية موقعك"
else
    echo "❌ فشل البناء! يرجى إصلاح الأخطاء أولاً."
    exit 1
fi
