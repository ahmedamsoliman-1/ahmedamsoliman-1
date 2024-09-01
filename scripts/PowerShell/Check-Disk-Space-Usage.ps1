# Check Disk Space Usage
Get-PSDrive -PSProvider FileSystem | Select-Object Name, @{Name='Used(GB)'; Expression={[math]::Round($_.Used/1GB,2)}}, @{Name='Free(GB)'; Expression={[math]::Round($_.Used/1GB,2)}}, @{Name='Used(%)'; Expression={[math]::Round($_.Used / ($_.Used + $_.Free) * 100, 2)}}
