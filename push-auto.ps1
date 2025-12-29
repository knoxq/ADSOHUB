Set-Location $PSScriptRoot

if (-not (Test-Path ".git")) {
    Write-Output 'No es un repositorio Git'
    exit
}

$changes = git status --porcelain
if ($changes.Length -eq 0) {
    Write-Output 'Sin cambios - no se crea commit'
    exit
}

$fecha = Get-Date -Format 'yyyy-MM-dd HH:mm'
$usuario = git config user.name
$mensaje = 'Auto-commit (' + $usuario + ') - ' + $fecha

git add .
git commit -m $mensaje
git push