
# Create the A record for the subdomain
resource "google_dns_record_set" "argo_subdomain" {
  name         = "${var.argo_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "argo_subdomain" { default = "argo" }
output "argo_subdomain" { value = "${var.argo_subdomain}.${var.dns_name}" }





resource "google_dns_record_set" "portfolio_subdomain" {
  name         = "${var.portfolio_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "portfolio_subdomain" { default = "portfolio" }
output "portfolio_subdomain" { value = "${var.portfolio_subdomain}.${var.dns_name}" }








resource "google_dns_record_set" "resume_devops_subdomain" {
  name         = "${var.resume_devops_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "resume_devops_subdomain" { default = "devopsresume" }
output "resume_devops_subdomain" { value = "${var.resume_devops_subdomain}.${var.dns_name}" }






resource "google_dns_record_set" "resume_dev_subdomain" {
  name         = "${var.resume_dev_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "resume_dev_subdomain" { default = "devresume" }
output "resume_dev_subdomain" { value = "${var.resume_dev_subdomain}.${var.dns_name}" }





resource "google_dns_record_set" "dashboard_subdomain" {
  name         = "${var.dashboard_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "dashboard_subdomain" { default = "dashboard" }
output "dashboard_subdomain" { value = "${var.dashboard_subdomain}.${var.dns_name}" }







resource "google_dns_record_set" "resume_data_subdomain" {
  name         = "${var.resume_data_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "resume_data_subdomain" { default = "dataresume" }
output "resume_data_subdomain" { value = "${var.resume_data_subdomain}.${var.dns_name}" }

resource "google_dns_record_set" "resume_ts_subdomain" {
  name         = "${var.resume_ts_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "resume_ts_subdomain" { default = "tsresume" }
output "resume_ts_subdomain" { value = "${var.resume_ts_subdomain}.${var.dns_name}" }


resource "google_dns_record_set" "ahmed_subdomain" {
  name         = "${var.ahmed_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "ahmed_subdomain" { default = "ahmed" }
output "ahmed_subdomain" { value = "${var.ahmed_subdomain}.${var.dns_name}" }




resource "google_dns_record_set" "supper_subdomain" {
  name         = "${var.supper_subdomain}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type         = "A"
  ttl          = 300

  rrdatas = [var.ingress_ip]
}
variable "supper_subdomain" { default = "supper" }
output "supper_subdomain" { value = "${var.supper_subdomain}.${var.dns_name}" }


