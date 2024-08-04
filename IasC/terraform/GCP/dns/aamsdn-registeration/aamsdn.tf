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
      name = "aamsdn-ws-terraform-gcp-star-dns-domain-reg"
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
    privacy = "PRIVATE_CONTACT_DATA"
    registrant_contact {
      phone_number = var.mobile
      email        = var.email
      postal_address {
        region_code         = var.regioncode
        postal_code         = var.postalcode
        administrative_area = var.area
        locality            = var.city
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
        administrative_area = var.area
        locality            = var.city
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
        administrative_area = var.area
        locality            = var.city
        address_lines       = [var.address]
        recipients          = [var.recipients]
      }
    }
  }
}


variable "project_id" {  type = string }
variable "region" { type = string }
variable "dns_name" { default = "aamsdn.com" }

variable "recipients" { default = "Ahmed Soliman" }
variable "mobile" { default = "+971507065214" }
variable "email" { default = "ahmed-3010@hotmail.com" }
variable "organization" { default = "aamsdn" }
variable "regioncode" { default = "US" }
variable "postalcode" { default = "00000" }
variable "area" { default = "Dubai" }
variable "city" { default = "Dubai" }
variable "address" { default = "Dubai" }

# # # # # OUTPUT
output "domain_name" { value = google_clouddomains_registration.aamsdn.domain_name }
output "location" { value = google_clouddomains_registration.aamsdn.location }
