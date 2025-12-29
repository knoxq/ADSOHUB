# Moverse a la carpeta del proyecto (CRÍTICO)
Set-Location "C:\ruta\a\tu\proyecto"

# Verificar que sea un repositorio git
if (-not (Test-Path ".git")) {
    Write-Output "No es un repositorio Git"
    exit
}

git add .

# Verificar si hay cambios
$status = git status --porcelain
if ($status.Length -eq 0) {
    Write-Output "No hay cambios para commitear"
    exit
}

$fecha = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Auto update: $fecha"
git push origin main
