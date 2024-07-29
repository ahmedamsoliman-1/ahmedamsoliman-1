output "kubernetes_cluster_name" {
    value = google_container_cluster.primary.name
}

output "vpc_name" {
    value = google_compute_network.main.name
}

output "google_container_node_pool_general_name" {
    value = google_container_node_pool.general.name
}

# output "google_container_node_pool_spot_name" {
#     value = google_container_node_pool.spot.name
# }