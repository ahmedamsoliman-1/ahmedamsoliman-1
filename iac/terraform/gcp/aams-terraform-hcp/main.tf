# main.tf
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
}

resource "google_storage_bucket" "aams_state_files_bucket" {
  name          = var.bucket_name_1
  location      = var.location
  force_destroy = false

  labels = {
    environment = "dev"
    team        = "devops"
    triggered_by = "github_actions"
  }
}

variable "project_id" {
  description = "The ID of the project in which to provision resources."
  type        = string
}

variable "region" {
  description = "The region in which to provision resources."
  type        = string
}

variable "bucket_name_1" {
  description = "The name of the bucket."
  default = "aams-bucket-test-hcp-state-file-2"
  type        = string
}

variable "location" {
  description = "The location for the bucket."
  type        = string
}

output "bucket_name" {
  description = "The name of the GCP Bucket."
  value       = google_storage_bucket.aams_state_files_bucket.name
}
