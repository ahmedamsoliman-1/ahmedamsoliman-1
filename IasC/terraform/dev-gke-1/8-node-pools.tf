# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_service_account
resource "google_service_account" "kubernetes" {
  account_id = var.project_id
}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/container_node_pool
resource "google_container_node_pool" "general" {
  name       = var.general_name
  cluster    = google_container_cluster.primary.id
  node_count = 1

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  node_config {
    preemptible  = false
    machine_type = "e2-standard-8"

    labels = {
      role = var.general_name
    }

    service_account = google_service_account.kubernetes.email
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }
}

# resource "google_container_node_pool" "spot" {
#   name    = var.spot_name
#   cluster = google_container_cluster.primary.id
# 
#   management {
#     auto_repair  = true
#     auto_upgrade = true
#   }
# 
#   autoscaling {
#     min_node_count = 0
#     max_node_count = 10
#   }
# 
#   node_config {
#     preemptible  = true
#     # machine_type = "c2-small"
#     machine_type = "e2-standard-8"
# 
#     labels = {
#       team = "devops"
#     }
# 
#     taint {
#       key    = "instance_type"
#       value  = var.spot_name
#       effect = "NO_SCHEDULE"
#     }
# 
#     service_account = google_service_account.kubernetes.email
#     oauth_scopes = [
#       "https://www.googleapis.com/auth/cloud-platform"
#     ]
#   }
# }
