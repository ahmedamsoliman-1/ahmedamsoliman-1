# https://registry.terraform.io/providers/hashicorp/google/latest/docs
provider "google" {
  project = var.project_id
  region  = var.region
  credentials = file(var.credentials_file)
}

resource "google_storage_bucket" "aams_state_files_bucket" {
  name          = var.bucket_name
  location       = var.location
  force_destroy  = false
}
