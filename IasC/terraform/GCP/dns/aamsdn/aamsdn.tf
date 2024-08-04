# Define the Google provider with the necessary credentials and project information
provider "google" {
  project = var.project_id
  region  = var.region
}

# Configure the Terraform backend to use Terraform Cloud
terraform {
  backend "remote" {
    organization = "aamsdn-org-gcp-big-star"

    workspaces {
      name = "aamsdn-ws-terraform-gcp-star-dns"
    }
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

# Enable the necessary Google Cloud DNS API
resource "google_project_service" "dns" {
  project = var.project_id
  service = "dns.googleapis.com"
}

# Enable the necessary Google Cloud Domains API
resource "google_project_service" "domains" {
  project = var.project_id
  service = "domains.googleapis.com"
}

# Create a public DNS managed zone in Google Cloud DNS
resource "google_dns_managed_zone" "aamsdn" {
  name        = "aamsdn-com"
  dns_name    = var.dns_name
  project     = var.project_id
  description = "Managed zone for aamsdn.com"
  visibility  = "public"
}



# # # # VARIABLES
variable "project_id" {  type = string }
variable "region" { type = string }
variable "dns_name" { default = "aamsdn.com." }

# # # # OUTPUT
output "dns_zone_name_servers" { value = google_dns_managed_zone.aamsdn.name_servers }
output "dns_zone_id" { value = google_dns_managed_zone.aamsdn.id }
output "dns_name" { value = google_dns_managed_zone.aamsdn.dns_name }

