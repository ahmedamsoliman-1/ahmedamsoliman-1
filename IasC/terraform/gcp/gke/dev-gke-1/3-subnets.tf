# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_subnetwork
resource "google_compute_subnetwork" "private" {
  name                     = var.subnet_name
  ip_cidr_range            = "10.0.0.0/18"
  region                   = var.region
  network                  = google_compute_network.main.id
  private_ip_google_access = true

  secondary_ip_range {
    range_name    = var.pod_range_name
    ip_cidr_range = "10.48.0.0/14"
  }
  secondary_ip_range {
    range_name    = var.svc_range_name
    ip_cidr_range = "10.52.0.0/20"
  }
}
