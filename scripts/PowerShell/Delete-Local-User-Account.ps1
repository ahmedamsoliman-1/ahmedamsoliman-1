# Delete a Local User Account

# Specify the username of the account you want to delete
$Username = "temp-1"

# Check if the user exists
$User = Get-LocalUser -Name $Username -ErrorAction SilentlyContinue

if ($User) {
    # Delete the user
    Remove-LocalUser -Name $Username
    Write-Host "User '$Username' has been deleted."
} else {
    Write-Host "User '$Username' does not exist."
}
