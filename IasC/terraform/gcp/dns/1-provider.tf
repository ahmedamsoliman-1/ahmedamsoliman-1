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

# A Records
resource "google_dns_record_set" "a_record_1" {
  name         = "www.${var.dns_name_gcp_2}"
  managed_zone = google_dns_managed_zone.ahmedalimsoliman2.name
  type         = "A"
  ttl          = 300
  rrdatas      = ["1.2.3.4"]
}

resource "google_dns_record_set" "a_record_2" {
  name         = "api.${var.dns_name_gcp_2}"
  managed_zone = google_dns_managed_zone.ahmedalimsoliman2.name
  type         = "A"
  ttl          = 300
  rrdatas      = ["5.6.7.8"]
}
