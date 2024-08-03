# https://registry.terraform.io/providers/hashicorp/google/latest/docs
provider "google" {
  project = var.project_id
  region  = var.region
}

# https://www.terraform.io/language/settings/backends/gcs
terraform {
  backend "remote" {
    organization = "ahmedalimsoliman-org-gcp-big-star"

    workspaces {
      name = "ahmedalimsoliman-workspace-aams-terraform-gcp-star-bucket"
    }
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

# Required APIs
resource "google_project_service" "dns" {
  project = var.project_id
  service = "dns.googleapis.com"
}


# DNS Hosted Zone
resource "google_dns_managed_zone" "aamsdn" {
  name     = "aamsdn-com"
  dns_name = var.dns_name
  project  = var.project_id
  description = "Managed zone for aamsdn.com"
  visibility = "public"
}

# resource "google_dns_record_set" "a_record" {
#   name         = "templates.${google_dns_managed_zone.ahmedalimsoliman2.dns_name}"
#   managed_zone = google_dns_managed_zone.ahmedalimsoliman2.name
#   type         = "A"
#   ttl          = 300
#   rrdatas      = [var.ingress_ip]
# }


variable "project_id" {  type = string }
variable "region" { type = string }
variable "dns_name" { default = "aamsdn.com." }

# # # # OUTPUT
output "dns_zone_name_servers" { value = google_dns_managed_zone.aamsdn.name_servers }
output "dns_zone_id" { value = google_dns_managed_zone.aamsdn.id }
output "dns_name" { value = google_dns_managed_zone.aamsdn.dns_name }

