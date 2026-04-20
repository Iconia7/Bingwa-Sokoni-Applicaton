# Bingwa Sokoni Landing Page Deployment Script

$server = "root@5.189.178.132"
$remotePath = "/var/www/bingwasokoni-landing"
$files = @("index.html", "style.css", "script.js", "favicon.png", "app-screenshot.png", "robots.txt", "sitemap.xml")

Write-Host "🚀 Starting deployment of Bingwa Sokoni Landing Page..." -ForegroundColor Cyan
Write-Host "Destination: $server : $remotePath"
Write-Host "------------------------------------"

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Uploading $file..."
        scp $file "${server}:${remotePath}/"
    } else {
        Write-Host "⚠️ Warning: $file not found, skipping." -ForegroundColor Yellow
    }
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Upload successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Upload failed. Please check your SSH connection." -ForegroundColor Red
}
