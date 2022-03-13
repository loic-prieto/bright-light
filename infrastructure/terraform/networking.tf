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
  name      = "bright-light-server"
  server_id = hcloud_server.bright-light-server.id
}

resource "aws_route53_record" "bright-light-server" {
  name    = "bright-light-server"
  type    = "A"
  zone_id = data.aws_route53_zone.root_zone.zone_id
  ttl     = "300"
  records = [hcloud_floating_ip.bright-light.ip_address]
}

data "aws_route53_zone" "root_zone" {
  name = "the-fire-archmage.ninja"
}