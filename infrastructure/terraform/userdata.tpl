#cloud-config
# -*- YAML -*-
apt_upgrade: true
packages:
    - python3-pip
write_files:
    - path: /etc/network/interfaces.d/60-bright-light-floating-ip.cfg
      content: |
        auto eth0:1
        iface eth0:1 inet static
         address ${floating_ip}
         netmask 32
runcmd:
    - [ sh, -c, "systemctl restart networking" ]
