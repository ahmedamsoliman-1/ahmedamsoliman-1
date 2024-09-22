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
      name = "ahmedalimsoliman-workspace-gcp2-cloudrun-1"
    }
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

# Enable Cloud Run API
resource "google_project_service" "cloud_run" {
  service = "run.googleapis.com"
  project = var.project_id
}

# Enable Cloud Build API
resource "google_project_service" "cloud_build" {
  service = "cloudbuild.googleapis.com"
  project = var.project_id
}




resource "google_cloud_run_service" "fgallery" {
  name     = "fgallery"
  location = var.location

  template {
    spec {
      containers {
        image = "ahmedalimsolimansd/aams-fgallery:1.0.4"
        resources {
          limits = {
            memory = "256Mi"
            cpu    = "1"
          }
        }
      }
    }
  }

  autogenerate_revision_name = true
}

resource "google_cloud_run_service_iam_member" "invoker" {
  service = google_cloud_run_service.fgallery.name
  location = google_cloud_run_service.fgallery.location
  role = "roles/run.invoker"
  member = "allUsers"
}





variable "project_id" {  type = string }
variable "region" { default = "us-central" }
variable "location" { default = "us-central1" }

output "cloud_run_url" { value = google_cloud_run_service.fgallery.status[0].url }
