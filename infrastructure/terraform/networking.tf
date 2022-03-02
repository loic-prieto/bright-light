resource "hcloud_firewall" "bright-light" {
  name = "bright-light-server"

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "443"
    source_ips = [
      "0.0.0.0/0",
      "::/0"
    ]
  }

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "22"
    source_ips = [
      var.home_ip
    ]
  }
}

resource "hcloud_floating_ip" "bright-light" {
  type      = "ipv4"
  name = "bright-light-server"
  server_id = hcloud_server.bright-light-server.id
}