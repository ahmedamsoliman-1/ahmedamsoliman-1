variable "subdomains" {
  type = map(string)
  default = {
    argo        = "argo"
    portfolio   = "portfolio"
    devopsresume = "devopsresume"
    devresume   = "devresume"
    webresume   = "webresume"
    k8          = "k8"
    dashboard   = "dashboard"
    dataresume  = "dataresume"
    tsresume    = "tsresume"
    ahmed       = "ahmed"
    supper      = "supper"
    elk         = "elk"
    kibana      = "kibana"
    prom        = "prom"
    grafana     = "grafana"
    links       = "links"
    authsvc     = "authsvc"
    authtest    = "authtest"
  }
}

resource "google_dns_record_set" "subdomains" {
  for_each    = var.subdomains
  name        = "${each.value}.${var.dns_name}."
  managed_zone = google_dns_managed_zone.aamsdn.name
  type        = "A"
  ttl         = 300
  rrdatas     = [var.ingress_ip]
}

# Output the subdomain URLs
output "subdomains" {
  value = { for subdomain, name in var.subdomains : subdomain => "${name}.${var.dns_name}" }
}
