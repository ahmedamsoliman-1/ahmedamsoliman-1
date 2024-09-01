# Define the output file
$outputFile = "$env:TEMP\HardwareInfo.txt"

# Clear the content of the output file
Clear-Content -Path $outputFile -ErrorAction SilentlyContinue

# Function to write output to both console and file
function Write-OutputWithFile {
    param (
        [string]$message
    )
    Write-Host $message
    Add-Content -Path $outputFile -Value $message
}

# Function to add a styled header
function Write-StyledHeader {
    param (
        [string]$header
    )
    $styledHeader = "`n=====================`n$header`n=====================`n"
    Write-Host $styledHeader -ForegroundColor Cyan
    Add-Content -Path $outputFile -Value $styledHeader
}

# CPU Information
function Get-CPUInfo {
    Write-StyledHeader "CPU Information"
    $cpu = Get-WmiObject -Class Win32_Processor
    Write-OutputWithFile "Name: $($cpu.Name)"
    Write-OutputWithFile "Manufacturer: $($cpu.Manufacturer)"
    Write-OutputWithFile "Number of Cores: $($cpu.NumberOfCores)"
    Write-OutputWithFile "Max Clock Speed: $($cpu.MaxClockSpeed) MHz"
    Write-OutputWithFile "Current Clock Speed: $($cpu.CurrentClockSpeed) MHz"
    Write-OutputWithFile "Load Percentage: $($cpu.LoadPercentage)%"
    Write-OutputWithFile "L2 Cache Size: $($cpu.L2CacheSize) KB"
    Write-OutputWithFile "L3 Cache Size: $($cpu.L3CacheSize) KB"
}

# Memory Information
function Get-MemoryInfo {
    Write-StyledHeader "Memory Information"
    $memory = Get-WmiObject -Class Win32_OperatingSystem
    Write-OutputWithFile "Total Visible Memory: $([math]::Round($memory.TotalVisibleMemorySize / 1MB, 2)) GB"
    Write-OutputWithFile "Free Physical Memory: $([math]::Round($memory.FreePhysicalMemory / 1MB, 2)) GB"
    Write-OutputWithFile "Total Virtual Memory: $([math]::Round($memory.TotalVirtualMemorySize / 1MB, 2)) GB"
    Write-OutputWithFile "Free Virtual Memory: $([math]::Round($memory.FreeVirtualMemory / 1MB, 2)) GB"
    Write-OutputWithFile "Memory Usage: $([math]::Round((($memory.TotalVisibleMemorySize - $memory.FreePhysicalMemory) / $memory.TotalVisibleMemorySize) * 100, 2))%"
}

# Disk Information
function Get-DiskInfo {
    Write-StyledHeader "Disk Information"
    $drives = Get-WmiObject -Class Win32_LogicalDisk -Filter "DriveType = 3"
    foreach ($drive in $drives) {
        Write-OutputWithFile "Drive Letter: $($drive.DeviceID)"
        Write-OutputWithFile "File System: $($drive.FileSystem)"
        Write-OutputWithFile "Total Size: $([math]::Round($drive.Size / 1GB, 2)) GB"
        Write-OutputWithFile "Free Space: $([math]::Round($drive.FreeSpace / 1GB, 2)) GB"
        Write-OutputWithFile "Used Space: $([math]::Round(($drive.Size - $drive.FreeSpace) / 1GB, 2)) GB"
        Write-OutputWithFile "`n---------------------------"
    }
}

# Network Adapter Information
function Get-NetworkAdapterInfo {
    Write-StyledHeader "Network Adapter Information"
    $adapters = Get-WmiObject -Class Win32_NetworkAdapterConfiguration | Where-Object { $_.IPEnabled -eq $true }
    foreach ($adapter in $adapters) {
        Write-OutputWithFile "Description: $($adapter.Description)"
        Write-OutputWithFile "MAC Address: $($adapter.MACAddress)"
        Write-OutputWithFile "IP Address: $($adapter.IPAddress -join ', ')"
        Write-OutputWithFile "Subnet Mask: $($adapter.IPSubnet -join ', ')"
        Write-OutputWithFile "Default Gateway: $($adapter.DefaultIPGateway -join ', ')"
        Write-OutputWithFile "DHCP Enabled: $($adapter.DHCPEnabled)"
        Write-OutputWithFile "`n---------------------------"
    }
}

# GPU Information
function Get-GPUInfo {
    Write-StyledHeader "GPU Information"
    $gpus = Get-WmiObject -Class Win32_VideoController
    foreach ($gpu in $gpus) {
        Write-OutputWithFile "Name: $($gpu.Name)"
        Write-OutputWithFile "Adapter RAM: $([math]::Round($gpu.AdapterRAM / 1MB, 2)) MB"
        Write-OutputWithFile "Driver Version: $($gpu.DriverVersion)"
        Write-OutputWithFile "Video Mode Description: $($gpu.VideoModeDescription)"
        Write-OutputWithFile "Current Refresh Rate: $($gpu.CurrentRefreshRate) Hz"
        Write-OutputWithFile "`n---------------------------"
    }
}

# Motherboard Information
function Get-MotherboardInfo {
    Write-StyledHeader "Motherboard Information"
    $motherboard = Get-WmiObject -Class Win32_BaseBoard
    Write-OutputWithFile "Manufacturer: $($motherboard.Manufacturer)"
    Write-OutputWithFile "Product: $($motherboard.Product)"
    Write-OutputWithFile "Serial Number: $($motherboard.SerialNumber)"
    Write-OutputWithFile "Version: $($motherboard.Version)"
}

# Operating System Information
function Get-OSInfo {
    Write-StyledHeader "Operating System Information"
    $os = Get-WmiObject -Class Win32_OperatingSystem
    Write-OutputWithFile "Name: $($os.Caption)"
    Write-OutputWithFile "Version: $($os.Version)"
    Write-OutputWithFile "Build Number: $($os.BuildNumber)"
    Write-OutputWithFile "Architecture: $($os.OSArchitecture)"
    Write-OutputWithFile "Install Date: $([Management.ManagementDateTimeConverter]::ToDateTime($os.InstallDate))"
    Write-OutputWithFile "Last Boot Up Time: $([Management.ManagementDateTimeConverter]::ToDateTime($os.LastBootUpTime))"
    Write-OutputWithFile "Serial Number: $($os.SerialNumber)"
    Write-OutputWithFile "Registered User: $($os.RegisteredUser)"
}

# Battery Information
function Get-BatteryInfo {
    Write-StyledHeader "Battery Information"
    $battery = Get-WmiObject -Class Win32_Battery
    if ($battery) {
        Write-OutputWithFile "Name: $($battery.Name)"
        Write-OutputWithFile "Battery Status: $($battery.BatteryStatus)"
        Write-OutputWithFile "Estimated Charge Remaining: $($battery.EstimatedChargeRemaining)%"
        Write-OutputWithFile "Battery Life Percent: $($battery.BatteryLifePercent)`%"
        Write-OutputWithFile "Estimated Run Time: $($battery.EstimatedRunTime) minutes"

        if ($battery.DesignCapacity) {
            Write-OutputWithFile "Designed Capacity: $($battery.DesignCapacity) mWh"
        } else {
            Write-OutputWithFile "Designed Capacity: Not Available"
        }

        if ($battery.FullChargeCapacity) {
            Write-OutputWithFile "Full Charge Capacity: $($battery.FullChargeCapacity) mWh"
        } else {
            Write-OutputWithFile "Full Charge Capacity: Not Available"
        }

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
        Write-OutputWithFile "Chemistry: $chemistry"

        if ($battery.Manufacturer) {
            Write-OutputWithFile "Manufacturer: $($battery.Manufacturer)"
        } else {
            Write-OutputWithFile "Manufacturer: Not Available"
        }

        if ($battery.SerialNumber) {
            Write-OutputWithFile "Serial Number: $($battery.SerialNumber)"
        } else {
            Write-OutputWithFile "Serial Number: Not Available"
        }

        Write-OutputWithFile "Design Voltage: $($battery.DesignVoltage) mV"
        Write-OutputWithFile "Status: $($battery.Status)"
    } else {
        Write-OutputWithFile "No battery information available. This may be a desktop computer."
    }
}

# Run all functions
Get-CPUInfo
Get-MemoryInfo
Get-DiskInfo
Get-NetworkAdapterInfo
Get-GPUInfo
Get-MotherboardInfo
Get-OSInfo
Get-BatteryInfo

# Inform the user where the output is saved
Write-Host "`nHardware information has been saved to: $outputFile" -ForegroundColor Green
