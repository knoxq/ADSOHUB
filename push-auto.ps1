git add .
$fecha = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
git commit -m "Auto update: $fecha"
git push origin main