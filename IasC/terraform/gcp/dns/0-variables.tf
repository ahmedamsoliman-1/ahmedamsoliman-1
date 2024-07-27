# # # # VARIABLE
variable "project_id" {  type = string }
variable "region" { type = string }
variable "dns_name_gcp_2" { type = string }


# # # # OUTPUT
output "dns_zone_name_servers" { value = google_dns_managed_zone.ahmedalimsoliman2.name_servers }
output "dns_zone_id" { value = google_dns_managed_zone.ahmedalimsoliman2.id }

# Outputs:
# dns_zone_id = "projects/comaamsdngcp2-project-1/managedZones/ahmedalimsoliman2-com"
# dns_zone_name_servers = tolist([
#   "ns-cloud-e1.googledomains.com.",
#   "ns-cloud-e2.googledomains.com.",
#   "ns-cloud-e3.googledomains.com.",
#   "ns-cloud-e4.googledomains.com.",
# ])