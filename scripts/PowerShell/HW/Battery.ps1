function Get-BatteryInfo {
    $battery = Get-WmiObject -Class Win32_Battery

    if ($battery) {
        Write-Host "Battery Information:"
        Write-Host "====================="
        Write-Host "Name: $($battery.Name)"
        Write-Host "Battery Status: $($battery.BatteryStatus)"
        Write-Host "Estimated Charge Remaining: $($battery.EstimatedChargeRemaining)%"
        Write-Host "Battery Life Percent: $($battery.BatteryLifePercent)`%"
        Write-Host "Estimated Run Time: $($battery.EstimatedRunTime) minutes"
        
        if ($battery.DesignCapacity) {
            Write-Host "Designed Capacity: $($battery.DesignCapacity) mWh"
        } else {
            Write-Host "Designed Capacity: Not Available"
        }

        if ($battery.FullChargeCapacity) {
            Write-Host "Full Charge Capacity: $($battery.FullChargeCapacity) mWh"
        } else {
            Write-Host "Full Charge Capacity: Not Available"
        }

        # Decode battery chemistry
        $chemistry = switch ($battery.Chemistry) {
            1 { "Other" }
            2 { "Lithium-Ion" }
            3 { "Nickel-Cadmium" }
            4 { "Nickel-Metal Hydride" }
            5 { "Lead Acid" }
            6 { "Zinc Air" }
            7 { "Lithium Polymer" }
            default { "Unknown" }
        }
        Write-Host "Chemistry: $chemistry"

        if ($battery.Manufacturer) {
            Write-Host "Manufacturer: $($battery.Manufacturer)"
        } else {
            Write-Host "Manufacturer: Not Available"
        }

        if ($battery.SerialNumber) {
            Write-Host "Serial Number: $($battery.SerialNumber)"
        } else {
            Write-Host "Serial Number: Not Available"
        }

        Write-Host "Design Voltage: $($battery.DesignVoltage) mV"
        Write-Host "Status: $($battery.Status)"
    } else {
        Write-Host "No battery information available. This may be a desktop computer."
    }
}

Get-BatteryInfo
