function Get-CPUInfo {
    $cpu = Get-WmiObject -Class Win32_Processor

    Write-Host "CPU Information:"
    Write-Host "================="
    Write-Host "Name: $($cpu.Name)"
    Write-Host "Manufacturer: $($cpu.Manufacturer)"
    Write-Host "Number of Cores: $($cpu.NumberOfCores)"
    Write-Host "Max Clock Speed: $($cpu.MaxClockSpeed) MHz"
    Write-Host "Current Clock Speed: $($cpu.CurrentClockSpeed) MHz"
    Write-Host "Load Percentage: $($cpu.LoadPercentage)%"
    Write-Host "L2 Cache Size: $($cpu.L2CacheSize) KB"
    Write-Host "L3 Cache Size: $($cpu.L3CacheSize) KB"
}

Get-CPUInfo
