#!/usr/bin/env bash

# Basic update
apt-get update
apt-get upgrade -y

# Configure the floating IP
echo <<EOF > /etc/network/interfaces.d/60-bright-light-floating-ip.cfg
auto eth0:1
iface eth0:1 inet static
 address ${floating_ip}
 netmask 32
EOF

# Ensure python is installed so that Ansible can be used to provision this machine
apt-get install python3-pip -y

