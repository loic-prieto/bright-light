variable "hetzner_api_token" {
  sensitive   = true
  type        = string
  description = "The API Token to interact with the Hetzner cloud API"
}

variable "home_ip" {
  type        = string
  description = "Ip to allow access to via ssh to the bright-light server"
}

variable "region" {
  type        = string
  description = "Hetzner cloud region into which to deploy the server"
  default     = "nbg1"
}

variable "ssh_key_name" {
  type        = string
  description = "Name of the SSH Key stored in Hetzner security vault"
  default     = "server"
}

variable "aws_profile" {
  type = string
  description = "The AWS profile to use to interact with route53 and the tf remote state in S3"
}