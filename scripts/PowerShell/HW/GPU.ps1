function Get-GPUInfo {
    $gpus = Get-WmiObject -Class Win32_VideoController

    Write-Host "GPU Information:"
    Write-Host "================="
    foreach ($gpu in $gpus) {
        Write-Host "Name: $($gpu.Name)"
        Write-Host "Adapter RAM: $([math]::Round($gpu.AdapterRAM / 1MB, 2)) MB"
        Write-Host "Driver Version: $($gpu.DriverVersion)"
        Write-Host "Video Mode Description: $($gpu.VideoModeDescription)"
        Write-Host "Current Refresh Rate: $($gpu.CurrentRefreshRate) Hz"
        Write-Host "================="
    }
}

Get-GPUInfo
