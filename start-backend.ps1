param(
  [int]$Port = 8787
)

& "$PSScriptRoot\backend\server.ps1" -Port $Port
