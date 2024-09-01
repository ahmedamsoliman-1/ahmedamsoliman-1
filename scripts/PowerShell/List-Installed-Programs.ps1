# List Installed Programs
Get-WmiObject -Class Win32_Product | Select-Object Name, Version
