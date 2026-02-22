# 🚀 نشر موقع Masar Education على Vercel

Write-Host "🚀 بدء نشر موقع Masar Education على Vercel..." -ForegroundColor Cyan
Write-Host ""

# التحقق من تثبيت Vercel CLI
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "📦 تثبيت Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# التحقق من نجاح البناء
Write-Host "🔨 بناء المشروع للتأكد من عدم وجود أخطاء..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ البناء نجح!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📤 الآن سيتم نشر المشروع..." -ForegroundColor Cyan
    Write-Host ""
    
    # النشر على Vercel
    vercel --prod
    
    Write-Host ""
    Write-Host "✅ تم النشر بنجاح!" -ForegroundColor Green
    Write-Host "🌐 افتح الرابط الذي ظهر أعلاه لرؤية موقعك" -ForegroundColor Cyan
} else {
    Write-Host "❌ فشل البناء! يرجى إصلاح الأخطاء أولاً." -ForegroundColor Red
    exit 1
}
