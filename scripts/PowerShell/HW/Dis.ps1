function Get-DiskInfo {
    $drives = Get-WmiObject -Class Win32_LogicalDisk -Filter "DriveType = 3"

    Write-Host "Disk Information:"
    Write-Host "=================="
    foreach ($drive in $drives) {
        Write-Host "Drive Letter: $($drive.DeviceID)"
        Write-Host "File System: $($drive.FileSystem)"
        Write-Host "Total Size: $([math]::Round($drive.Size / 1GB, 2)) GB"
        Write-Host "Free Space: $([math]::Round($drive.FreeSpace / 1GB, 2)) GB"
        Write-Host "Used Space: $([math]::Round(($drive.Size - $drive.FreeSpace) / 1GB, 2)) GB"
        Write-Host "=================="
    }
}

Get-DiskInfo
