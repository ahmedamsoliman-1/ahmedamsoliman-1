variable "project_id" {  type = string }
variable "region" { type = string }
variable "dns_name_gcp_2" { type = string }

# variable "location" { type = string }
# variable "location_a" { type = string }
# variable "location_b" { type = string }


# variable "caluster_name" { default = "aams-gke2-gcp2-gke-primary-cluster" }
# variable "vpc_name" { default = "aams-gke2-gcp2-dev-main-vpc" }
# variable "spot_name" { default = "aams-gke2-gcp2-dev-spot" }
# variable "general_name" { default = "aams-gke2-gcp2-dev-general" }
# variable "router_name" { default = "aams-gke2-gcp2-dev-router" }
# variable "subnet_name" { default = "aams-gke2-gcp2-dev-private" }
# variable "nat_name" { default = "aams-gke2-gcp2-dev-nat" }
# variable "allow_ssh" { default = "aams-gke2-gcp2-ssh-allow" }

# variable "pod_range_name" { default = "aams-gke2-gcp2-dev-k8s-pod-range" }
# variable "svc_range_name" { default = "aams-gke2-gcp2-dev-k8s-service-range" }
# variable "workload_identity_config" { default = "comaamsdngcp2-project-1.svc.id.goog" }



# OUTPUT
output "dns_zone_name_servers" { value = google_dns_managed_zone.ahmedalimsoliman2.name_servers }
output "dns_zone_id" { value = google_dns_managed_zone.ahmedalimsoliman2.id }
