function Get-OSInfo {
    $os = Get-WmiObject -Class Win32_OperatingSystem

    Write-Host "Operating System Information:"
    Write-Host "============================="
    Write-Host "Name: $($os.Caption)"
    Write-Host "Version: $($os.Version)"
    Write-Host "Build Number: $($os.BuildNumber)"
    Write-Host "Architecture: $($os.OSArchitecture)"
    Write-Host "Install Date: $([Management.ManagementDateTimeConverter]::ToDateTime($os.InstallDate))"
    Write-Host "Last Boot Up Time: $([Management.ManagementDateTimeConverter]::ToDateTime($os.LastBootUpTime))"
    Write-Host "Serial Number: $($os.SerialNumber)"
    Write-Host "Registered User: $($os.RegisteredUser)"
}

Get-OSInfo
