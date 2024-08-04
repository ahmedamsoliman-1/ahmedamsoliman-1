# Define the Google provider with the necessary credentials and project information
provider "google" {
  project = var.project_id
  region  = var.region
  # Uncomment and configure the following if using a service account key
  # credentials = file("<path-to-service-account-key>.json")
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


# # # # domains.tf

# Register a new domain using Google Cloud Domains
resource "google_clouddomains_registration" "aamsdn" {
  domain_name = var.dns_name
  contact_settings {
    registrant_contact {
      postal_address {
        region_code   = "US"
        recipients    = [var.recipients]
        organization  = var.organization
        address_lines = ["1234 Main St"]
        locality      = "Mountain View"
        administrative_area = "DUBAI"
        postal_code   = "00000"
      }
      email = var.email
      phone_number = var.mobile
    }

    admin_contact {
      postal_address {
        region_code   = "US"
        recipients    = [var.recipients]
        organization  = "AAMASDN"
        address_lines = ["1234 Main St"]
        locality      = "Mountain View"
        administrative_area = "DUBAI"
        postal_code   = "00000"
      }
      email = var.email
      phone_number = var.mobile
    }

    technical_contact {
      postal_address {
        region_code   = "US"
        recipients    = [var.recipients]
        organization  = var.organization
        address_lines = ["1234 Main St"]
        locality      = "Mountain View"
        administrative_area = "CA"
        postal_code   = "94043"
      }
      email = var.email
      phone_number = var.mobile
    }
  }

  yearly_price {
    amount   = "12.00"
    currency = "USD"
  }

  dns_settings {
    google_domains_dns {
      name_servers = ["ns-cloud-d1.googledomains.com", "ns-cloud-d2.googledomains.com"]
    }
  }
}




# # # # VARIABLES

variable "project_id" {  type = string }
variable "region" { type = string }
variable "dns_name" { default = "aamsdn.com." }

variable "recipients" { default = "Ahmed Soliman" }
variable "mobile" { default = "+971507065214" }
variable "email" { default = "ahmed-3010@hotmail.com" }
variable "organization" { default = "aamsdn" }

# # # # OUTPUT
output "dns_zone_name_servers" { value = google_dns_managed_zone.aamsdn.name_servers }
output "dns_zone_id" { value = google_dns_managed_zone.aamsdn.id }
output "dns_name" { value = google_dns_managed_zone.aamsdn.dns_name }

