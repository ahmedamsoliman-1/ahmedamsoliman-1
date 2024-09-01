# List All Local Users
$Users = Get-LocalUser

# Display user information
foreach ($User in $Users) {
    Write-Host "Username: $($User.Name)"
    Write-Host "Full Name: $($User.FullName)"
    Write-Host "Description: $($User.Description)"
    Write-Host "Enabled: $($User.Enabled)"
    Write-Host "---------------------------"
}
