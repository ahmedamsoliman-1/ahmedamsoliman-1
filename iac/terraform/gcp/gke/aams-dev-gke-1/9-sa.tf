# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_service_account
resource "google_service_account" "service-account-gcp2-gke2" {
  account_id = "service-account-gcp2-gke2"
}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_project_iam
resource "google_project_iam_member" "service-account-gcp2-gke2" {
  project = var.project_id
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.service-account-gcp2-gke2.email}"
}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_service_account_iam
resource "google_service_account_iam_member" "service-account-gcp2-gke2" {
  service_account_id = google_service_account.service-account-gcp2-gke2.id
  role               = "roles/iam.workloadIdentityUser"
  member             = "serviceAccount:big-star-420419.svc.id.goog[staging/service-account-gcp2-gke2]"
}
