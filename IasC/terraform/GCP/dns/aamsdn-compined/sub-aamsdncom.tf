
# Create the A record for the subdomain
resource "google_dns_record_set" "argo_subdomain" {
  name         = "${var.argo_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}

resource "google_dns_record_set" "portfolio_subdomain" {
  name         = "${var.portfolio_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}



resource "google_dns_record_set" "resume_devops_subdomain" {
  name         = "${var.resume_devops_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "resume_devops_subdomain" { default = "resume.devops" }
output "resume_devops_subdomain" { value = "${var.resume_devops_subdomain}.${var.dns_name}" }

resource "google_dns_record_set" "resume_dev_subdomain" {
  name         = "${var.resume_dev_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "resume_dev_subdomain" { default = "resume.dev" }
output "resume_dev_subdomain" { value = "${var.resume_dev_subdomain}.${var.dns_name}" }







resource "google_dns_record_set" "resume_data_subdomain" {
  name         = "${var.resume_data_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "resume_data_subdomain" { default = "resume.data" }
output "resume_data_subdomain" { value = "${var.resume_data_subdomain}.${var.dns_name}" }

resource "google_dns_record_set" "resume_ts_subdomain" {
  name         = "${var.resume_ts_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "resume_ts_subdomain" { default = "resume.ts" }
output "resume_ts_subdomain" { value = "${var.resume_ts_subdomain}.${var.dns_name}" }


resource "google_dns_record_set" "ahmed_subdomain" {
  name         = "${var.resume_ts_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "ahmed_subdomain" { default = "ahmed" }
output "ahmed_subdomain" { value = "${var.ahmed_subdomain}.${var.dns_name}" }








variable "argo_subdomain" { default = "argo" }
variable "portfolio_subdomain" { default = "portfolio" }


output "argo_subdomain" { value = "${var.argo_subdomain}.${var.dns_name}" }
output "portfolio_subdomain" { value = "${var.portfolio_subdomain}.${var.dns_name}" }
