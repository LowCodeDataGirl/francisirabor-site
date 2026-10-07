# Windows: right-click > Run with PowerShell (or: powershell -ExecutionPolicy Bypass -File get-assets.ps1)
# Downloads every image and video the site uses into .\assets. Run BEFORE moving the domain off Canva.
Set-Location $PSScriptRoot
Get-Content assets.txt | Where-Object { $_ } | ForEach-Object {
  $dest = Join-Path "assets" $_
  New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
  if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 0)) { Write-Host "have  $_"; return }
  Write-Host "get   $_"
  Invoke-WebRequest -Uri "https://francisirabor.com/_assets/$_" -OutFile $dest -UseBasicParsing
}
Write-Host "Done. Open index.html to check."
