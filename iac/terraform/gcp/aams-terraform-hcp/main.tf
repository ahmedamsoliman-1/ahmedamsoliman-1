terraform {
  backend "remote" {
    organization = "ahmedalimsoliman-org"

    workspaces {
      name = "ahmedalimsoliman-workspace-1"
    }
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project     = var.project_id
  region      = var.region
  credentials = var.gcp_credentials
}

resource "google_storage_bucket" "aams_state_files_bucket" {
  name          = var.bucket_name
  location      = var.location
  force_destroy = var.destroy
}
