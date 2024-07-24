# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_service_account
resource "google_service_account" "service-b" {
  account_id = "service-b"
}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_project_iam
resource "google_project_iam_member" "service-b" {
  project = var.project_id
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.service-b.email}"
}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_service_account_iam
resource "google_service_account_iam_member" "service-b" {
  service_account_id = google_service_account.service-b.id
  role               = "roles/iam.workloadIdentityUser"
  member             = "serviceAccount:big-star-420419.svc.id.goog[staging/service-b]"
}
