############################## VARIABLE ##############################

variable "project_id" { type  =  string }
variable "region" { type  =  string }
variable "location_a" { type  =  string }

variable "machine_type" { default = "n1-standard-1" }
variable "instance_name" { default = "ahmed-dev-vm-ubuntu" }
variable "image_family" { default = "ubuntu-2004-lts" }
variable "image_project" { default = "ubuntu-os-cloud" }


############################## OUTPUT ###############################


output "instance_name" {
  value =  google_compute_instance.default.name
}
output "instance_self_link" {
  value =  google_compute_instance.default.self_link
}
output "instance_network_ip" {
  value =  google_compute_instance.default.network_interface[0].network_ip
}
output "instance_external_ip" {
  value =  google_compute_instance.default.network_interface[0].access_config[0].nat_ip
}
