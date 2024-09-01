function Get-MotherboardInfo {
    $motherboard = Get-WmiObject -Class Win32_BaseBoard

    Write-Host "Motherboard Information:"
    Write-Host "========================"
    Write-Host "Manufacturer: $($motherboard.Manufacturer)"
    Write-Host "Product: $($motherboard.Product)"
    Write-Host "Serial Number: $($motherboard.SerialNumber)"
    Write-Host "Version: $($motherboard.Version)"
}

Get-MotherboardInfo
