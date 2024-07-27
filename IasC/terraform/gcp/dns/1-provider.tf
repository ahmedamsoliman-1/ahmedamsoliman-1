# https://registry.terraform.io/providers/hashicorp/google/latest/docs
provider "google" {
  project = var.project_id
  region  = var.region
}

# https://www.terraform.io/language/settings/backends/gcs
terraform {
  backend "remote" {
    organization = "ahmedalimsoliman-org"

    workspaces {
      name = "ahmedalimsoliman-workspace-gcp2-dns"
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
resource "google_dns_managed_zone" "ahmedalimsoliman2" {
  name     = "ahmedalimsoliman2-com"
  dns_name = var.dns_name_gcp_2
  project  = var.project_id

  description = "Managed zone for ahmedalimsoliman2.com"

  visibility = "public"
}
