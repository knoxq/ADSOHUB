# Ir a la carpeta donde está el script
Set-Location $PSScriptRoot

# Verificar que sea un repositorio Git
if (-not (Test-Path ".git")) {
    Write-Output "No es un repositorio Git"
    exit
}

git add .

# Verificar si hay cambios reales
$status = git status --porcelain
if ($status.Length -eq 0) {
    Write-Output "No hay cambios para commitear"
    exit
}

$fecha = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Auto update: $fecha"
git push origin main
