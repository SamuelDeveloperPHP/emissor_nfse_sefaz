# Builds deploy\dist\emissor-nfse.zip, ready to upload to a cPanel account.
# Run from the project root:  powershell -ExecutionPolicy Bypass -File deploy\build-package.ps1
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$stage = Join-Path ([IO.Path]::GetTempPath()) ('emissor-nfse-' + [guid]::NewGuid().ToString('N'))
$dist = Join-Path $PSScriptRoot 'dist'

Write-Host '1/4 Compilando o frontend (npm run build)...'
Push-Location $root
npm run build
if ($LASTEXITCODE -ne 0) { throw 'npm run build falhou' }
Pop-Location

Write-Host '2/4 Copiando o projeto para uma pasta temporária...'
$excludeDirs = @('.git', '.claude', '.idea', '.vscode', 'node_modules', 'vendor', 'tests', 'dist', '.phpunit.cache')
robocopy $root $stage /E /XD $excludeDirs /XF '.env' '.env.backup' '.env.production' 'hot' '*.log' '.phpunit.result.cache' /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -ge 8) { throw 'robocopy falhou' }

# Runtime folders the app writes to; contents of the dev machine must not travel.
foreach ($dir in 'storage\logs', 'storage\framework\cache\data', 'storage\framework\sessions', 'storage\framework\views', 'storage\app\certificados', 'bootstrap\cache') {
    $path = Join-Path $stage $dir
    if (Test-Path $path) { Get-ChildItem $path -Force | Where-Object { $_.Name -ne '.gitignore' } | Remove-Item -Recurse -Force }
    else { New-Item -ItemType Directory -Force $path | Out-Null }
}
Copy-Item (Join-Path $root '.env.production.example') (Join-Path $stage '.env.production.example') -Force

Write-Host '3/4 Instalando dependências PHP de produção (composer)...'
Push-Location $stage
composer install --no-dev --optimize-autoloader --no-interaction --no-scripts
if ($LASTEXITCODE -ne 0) { throw 'composer install falhou' }
Pop-Location

Write-Host '4/4 Gerando o zip...'
New-Item -ItemType Directory -Force $dist | Out-Null
$zip = Join-Path $dist 'emissor-nfse.zip'
if (Test-Path $zip) { Remove-Item $zip -Force }
# Windows' bsdtar writes forward-slash entry names (Compress-Archive in PowerShell 5.1 does
# not). Called by full path because Git Bash's GNU tar may be first on PATH.
& (Join-Path $env:SystemRoot 'System32\tar.exe') -a -c -f $zip -C $stage .
if ($LASTEXITCODE -ne 0) { throw 'tar falhou' }

Remove-Item $stage -Recurse -Force
Write-Host ("Pronto: {0} ({1:N1} MB)" -f $zip, ((Get-Item $zip).Length / 1MB))
