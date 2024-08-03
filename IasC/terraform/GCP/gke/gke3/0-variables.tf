variable "project_id" {  type = string }
variable "region" { type = string }
variable "location" { type = string }
variable "location_a" { default = "us-east1-a" }
variable "location_b" { default = "us-east1-b" }


variable "caluster_name" { default = "gcp-big-star-gke3-cluster" }
variable "vpc_name" { default = "gcp-big-star-gke3-main-vpc" }
variable "spot_name" { default = "gcp-big-star-gke3-spot" }
variable "general_name" { default = "gcp-big-star-gke3-general" }
variable "router_name" { default = "gcp-big-star-gke3-router" }
variable "subnet_name" { default = "gcp-big-star-gke3-private" }
variable "nat_name" { default = "gcp-big-star-gke3-nat" }
variable "allow_ssh" { default = "gcp-big-star-gke3-ssh-allow" }

variable "pod_range_name" { default = "gcp-big-star-gke3-k8s-pod-range" }
variable "svc_range_name" { default = "gcp-big-star-gke3-k8s-service-range" }
variable "workload_identity_config" { default = "comaamsdngcp2-project-1.svc.id.goog" }





################
################
################
################

output "kubernetes_cluster_name" { value = google_container_cluster.primary.name }
output "vpc_name" { value = google_compute_network.main.name }
output "google_container_node_pool_general_name" { value = google_container_node_pool.general.name }
