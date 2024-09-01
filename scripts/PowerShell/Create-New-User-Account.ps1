# Create New User Account
$Username = "tmep-1"
$Password = ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force
New-LocalUser -Name $Username -Password $Password -FullName "New User" -Description "New local user account"
