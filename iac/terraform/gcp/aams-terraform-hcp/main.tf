# terraform {
#   backend "remote" {
#     organization = "ahmedalimsoliman-org"

#     workspaces {
#       name = "ahmedalimsoliman-workspace-1"
#     }
#   }

#   required_providers {
#     google = {
#       source  = "hashicorp/google"
#       version = "~> 4.0"
#     }
#   }
# }

# provider "google" {
#   project     = var.project_id
#   region      = var.region
#   credentials = var.gcp_credentials
# }

# resource "google_storage_bucket" "aams_state_files_bucket" {
#   name          = var.bucket_name
#   location      = var.location
#   force_destroy = false
# }

# variable "project_id" {
#   description = "The ID of the project in which to provision resources."
#   type        = string
# }

# variable "region" {
#   description = "The region in which to provision resources."
#   type        = string
# }

# variable "bucket_name" {
#   description = "The name of the bucket."
#   type        = string
# }

# variable "location" {
#   description = "The location for the bucket."
#   type        = string
# }

# variable "gcp_credentials" {
#   description = "GCP Service Account JSON"
#   type        = string
#   sensitive   = true
# }

# output "bucket_name" {
#   description = "The name of the GCP Bucket."
#   value       = google_storage_bucket.aams_state_files_bucket.name
# }
