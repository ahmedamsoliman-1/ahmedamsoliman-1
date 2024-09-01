function Get-NetworkAdapterInfo {
    $adapters = Get-WmiObject -Class Win32_NetworkAdapterConfiguration | Where-Object { $_.IPEnabled -eq $true }

    Write-Host "Network Adapter Information:"
    Write-Host "============================"
    foreach ($adapter in $adapters) {
        Write-Host "Description: $($adapter.Description)"
        Write-Host "MAC Address: $($adapter.MACAddress)"
        Write-Host "IP Address: $($adapter.IPAddress -join ', ')"
        Write-Host "Subnet Mask: $($adapter.IPSubnet -join ', ')"
        Write-Host "Default Gateway: $($adapter.DefaultIPGateway -join ', ')"
        Write-Host "DHCP Enabled: $($adapter.DHCPEnabled)"
        Write-Host "============================"
    }
}

Get-NetworkAdapterInfo
