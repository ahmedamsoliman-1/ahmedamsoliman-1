#!/bin/bash

# Define the output file
outputFile="$HOME/HardwareInfo.txt"

# Clear the content of the output file
> "$outputFile"

# Function to write output to both console and file
function write_output {
    echo "$1"
    echo "$1" >> "$outputFile"
}

# Function to add a styled header
function write_styled_header {
    local header="$1"
    local styledHeader="\n=====================\n$header\n=====================\n"
    write_output "$styledHeader"
}

# CPU Information
write_styled_header "CPU Information"
write_output "$(sysctl -n machdep.cpu.brand_string)"
write_output "$(sysctl -n machdep.cpu.core_count) cores"
write_output "$(sysctl -n machdep.cpu.thread_count) threads"
write_output "$(sysctl -n machdep.cpu.leaf7_features)"

# Memory Information
write_styled_header "Memory Information"
vm_stat | awk '
BEGIN {
    printf "Pagesize: 4096 bytes\n"
    total_pages = 0
}
/Pages free/ { free_pages = $3 }
{
    total_pages += $3
}
END {
    total_memory = total_pages * 4096 / 1024 / 1024
    free_memory = free_pages * 4096 / 1024 / 1024
    printf "Total Memory: %.2f GB\n", total_memory / 1024
    printf "Free Memory: %.2f GB\n", free_memory / 1024
}
'

# Disk Information
write_styled_header "Disk Information"
diskutil info -all | grep -E "Device Identifier|Volume Name|Total Size|Free Space"

# Network Adapter Information
write_styled_header "Network Adapter Information"
ifconfig -a | grep -E "en[0-9]|lo[0-9]|ether|inet"

# GPU Information
write_styled_header "GPU Information"
system_profiler SPDisplaysDataType | grep -E "Chipset Model|VRAM (Total)|Resolution"

# Motherboard Information
write_styled_header "Motherboard Information"
system_profiler SPHardwareDataType | grep -E "Model Identifier|Serial Number (system)|Hardware UUID"

# Operating System Information
write_styled_header "Operating System Information"
sw_vers

# Battery Information
write_styled_header "Battery Information"
pmset -g batt

# Inform the user where the output is saved
write_output "Hardware information has been saved to: $outputFile"
