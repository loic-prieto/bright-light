resource "hcloud_server" "bright-light-server" {
  name        = "bright-light-server"
  image       = "debian-11"
  server_type = "cpx11"
  location = var.region
  ssh_keys = [var.ssh_key_name]

  firewall_ids = [hcloud_firewall.bright-light.id]
}