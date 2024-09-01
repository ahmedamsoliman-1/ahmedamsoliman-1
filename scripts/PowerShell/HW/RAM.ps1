function Get-MemoryInfo {
    $memory = Get-WmiObject -Class Win32_OperatingSystem

    Write-Host "Memory Information:"
    Write-Host "===================="
    Write-Host "Total Visible Memory: $([math]::Round($memory.TotalVisibleMemorySize / 1MB, 2)) GB"
    Write-Host "Free Physical Memory: $([math]::Round($memory.FreePhysicalMemory / 1MB, 2)) GB"
    Write-Host "Total Virtual Memory: $([math]::Round($memory.TotalVirtualMemorySize / 1MB, 2)) GB"
    Write-Host "Free Virtual Memory: $([math]::Round($memory.FreeVirtualMemory / 1MB, 2)) GB"
    Write-Host "Memory Usage: $([math]::Round((($memory.TotalVisibleMemorySize - $memory.FreePhysicalMemory) / $memory.TotalVisibleMemorySize) * 100, 2))%"
}

Get-MemoryInfo
