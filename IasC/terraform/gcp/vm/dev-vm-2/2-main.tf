resource "google_compute_instance" "default" {
  name         = var.instance_name
  machine_type = var.machine_type
  #zone         = var.location_a

  boot_disk {
    initialize_params {
      image = "projects/ubuntu-os-cloud/global/images/family/ubuntu-2004-lts"
    }
  }

  network_interface {
    network = "default"
    access_config {
      // Ephemeral IP
    }
  }

  metadata = {
    # ssh-keys = "user:${file("~/.ssh/id_rsa.pub")}"
    ssh-keys = "user:${var.avr_mac_ssh_key}"
  }
}

