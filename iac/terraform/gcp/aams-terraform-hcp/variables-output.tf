# ############################## VARIABLE ##############################

variable "project_id" {
  description = "The ID of the project in which to provision resources."
  type        = string
}

variable "region" {
  description = "The region in which to provision resources."
  type        = string
}

variable "bucket_name" {
  description = "The name of the bucket."
  type        = string
}

variable "destroy" {
  # description = "The name of the bucket."
  type        = bool
}


variable "location" {
  description = "The location for the bucket."
  type        = string
}

variable "gcp_credentials" {
  description = "GCP Service Account JSON"
  type        = string
  sensitive   = true
}

# ############################## OUTPUT ###############################

output "bucket_name" {
  description = "The name of the GCP Bucket."
  value       = google_storage_bucket.aams_state_files_bucket.name
}
