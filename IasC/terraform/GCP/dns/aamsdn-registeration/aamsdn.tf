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
    organization = "ahmedalimsoliman-org"

    workspaces {
      name = "aamsdn-ws-gcp2-domain-reg"
    }
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

resource "google_clouddomains_registration" aamsdn {
  domain_name = var.dns_name
  location    = "global"
  labels = {
    labelkey = "labelvalue"
  }
  yearly_price {
    currency_code = "USD"
    units         = 12
  }
  dns_settings {
    custom_dns {
      name_servers = [
        "ns-cloud-d1.googledomains.com.", 
        "ns-cloud-d2.googledomains.com.", 
        "ns-cloud-d3.googledomains.com.", 
        "ns-cloud-d4.googledomains.com."
      ]
    }
  }
  contact_settings {
    privacy = "REDACTED_CONTACT_DATA"
    registrant_contact {
      phone_number = var.mobile
      email        = var.email
      postal_address {
        region_code         = var.regioncode
        postal_code         = var.postalcode
        administrative_area = var.administrative_area
        locality            = var.locality
        address_lines       = [var.address]
        recipients          = [var.recipients]
      }
    }
    admin_contact {
      phone_number = var.mobile
      email        = var.email
      postal_address {
        region_code         = var.regioncode
        postal_code         = var.postalcode
        administrative_area = var.administrative_area
        locality            = var.locality
        address_lines       = [var.address]
        recipients          = [var.recipients]
      }
    }
    technical_contact {
      phone_number = var.mobile
      email        = var.email
      postal_address {
        region_code         = var.regioncode
        postal_code         = var.postalcode
        administrative_area = var.administrative_area
        locality            = var.locality
        address_lines       = [var.address]
        recipients          = [var.recipients]
      }
    }
  }
}

variable "project_id" { type = string }
variable "region" { type = string }
variable "dns_name" { default = "aamsdn.com" }

variable "recipients" { default = "Mohamed Ali Ali Mohamed Soliman" }
variable "mobile" { default = "+971507065214" }
variable "email" { default = "ahmed-3010@hotmail.com" }
variable "organization" { default = "AAMSDN" }
variable "regioncode" { default = "AE" }
variable "postalcode" { default = "00000" }
variable "administrative_area" { default = "Abu Dhabi" }
variable "locality" { default = "Abu Dhabi Khalifa City" }
variable "address" { default = "Abu Dhabi Khalifa City" }

# # # # # OUTPUT
output "domain_name" { value = google_clouddomains_registration.aamsdn.domain_name }
output "location" { value = google_clouddomains_registration.aamsdn.location }
