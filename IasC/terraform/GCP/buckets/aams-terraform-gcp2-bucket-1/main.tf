# main.tf
terraform {
  backend "remote" {
    organization = "ahmedalimsoliman-org"

    workspaces {
      name = "aamsdn-ws-gcp2-bucket-1"
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
}

resource "google_storage_bucket" "aams_state_files_bucket_1" {
  name          = var.bucket_name_1
  location      = var.location
  force_destroy = false
}

variable "project_id" { type = string }
variable "region" { type = string }
variable "bucket_name_1" { default = "aams-terraform-gcp2-bucket-1" }
variable "location" { type = string }

output "bucket_name_1" { value = google_storage_bucket.aams_state_files_bucket_1.name }