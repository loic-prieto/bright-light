terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "1.33.1"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "3.63"
    }
  }
  backend "s3" {
    bucket = "bright-light-tf-state-euw1"
    region = "eu-west-1"
    key    = "main/bright-light"
  }
}

provider "hcloud" {
  token = var.hetzner_api_token
}

provider "aws" {
  # Doesn't matter too much as we're only managing DNS, which is global
  region = "eu-west-1"
  profile = var.aws_profile
  default_tags {
    tags = {
      project = "bright-light"
    }
  }
}