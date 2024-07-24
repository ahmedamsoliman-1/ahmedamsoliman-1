######################################################################
############################## VARIABLE ##############################
######################################################################

variable "project_id" {
  description = "The ID of the project in which to provision resources."
  type        = string
}

variable "region" {
  description = "The region in which to provision resources."
  type        = string
}

variable "zone" {
  description = "The zone in which to create the VM instance."
  type        = string
}

variable "machine_type" {
  description = "The machine type to use for the VM instance."
  type        = string
}

variable "instance_name" {
  description = "The name of the VM instance."
  type        = string
}

variable "image_family" {
  description = "The image family to use for the VM instance."
  type        = string
}

variable "image_project" {
  description = "The project where the image belongs."
  type        = string
}




######################################################################
############################## OUTPUT ###############################
######################################################################


output "instance_name" {
  description = "The name of the VM instance."
  value       = google_compute_instance.default.name
}

output "instance_self_link" {
  description = "The self link of the VM instance."
  value       = google_compute_instance.default.self_link
}

output "instance_network_ip" {
  description = "The internal IP address of the VM instance."
  value       = google_compute_instance.default.network_interface[0].network_ip
}

output "instance_external_ip" {
  description = "The external IP address of the VM instance."
  value       = google_compute_instance.default.network_interface[0].access_config[0].nat_ip
}
