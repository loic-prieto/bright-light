# Infrastructure components

## Table of contents

- [Infrastructure components](#infrastructure-components)
  - [Overview](#overview)
  - [The host](#the-host)
  - [The backend server](#the-backend-server)
  - [The frontend app](#the-frontend-app)
  - [The reverse proxy](#the-reverse-proxy)
  - [Networking](#networking)
    - [DNS](#dns)
    - [Security](#security)
    - [VPC](#vpc)
  - [Implementation](#implementation)

## Overview

Both frontend and backend are hosted in a single instance, reverse proxied by a web server. The frontend assumes the
backend is in the same domain server, under a different path.

In theory anyone can host this application. It is mostly stateless for now, and user data is stored in the end user
local machine, so any server that deploys this application would act as a mirror for the same given version. That being
said, the end user has to trust a different server that the application is not malicious.

We're using AWS as a cloud provider for all infrastructure components as of this time.

## The host

As of this time, a T4g.nano EC2 type instance is chosen to be the host of our application. This instance has 2 shared
vCPUs and 512MB. The CPU architecture is ARM 64 bits.

The price for this instance, in the eu-west-1 (Ireland) region, is $0.0046/hour.

The host will be assigned both a fixed IP and a DNS domain with an entry will be created to point to that fixed IP.

## The backend server

Unless nodejs shows itself incapable of producing a web server that can fit under 400MB of memory, that will be the
chosen technology for the backend server.

A simple web server framework/library will be used to serve the backend http requests.

The nodejs runtime will have to be tuned to consume max 400MB memory between all backend processes.

The backend server will be reverse proxied by the same application that serves the static frontend files

There will be several backend servers running, one for each version that has to run concurrently.

The backend servers will be installed in the `/opt/bright-light/backend/<version>` folder, where `<version>` is the
release number for a version that must run.

## The frontend app

This will be a completely static website, either a SPA or whatever they are now called in the JS framework of the week.

The files will be served by a reverse proxy.

The frontend files will be installed in the `/opt/bright-light/frontend/<version>` folder, where `<version>` is a 
release number for the frontend.

## The reverse proxy

This will be a [Traefik proxy](https://doc.traefik.io/traefik/). It will be provided config files to establish the 
routes for the different frontend and backend versions as part of the deployment and update process that may be 
executed by CI pipelines.

The proxy will also take care of creating and renewing an SSL certificate so that it can serve the traffic with HTTPS. 
This will be done with the integration between Traefik and [Let's Encrypt](https://doc.traefik.io/traefik/https/acme/).

For each release of the backend and frontend a new route configuration file will be created in the Traefik configuration
folder. There will be a `_current` route that points to the current release of the frontend client. The backend API will
be always referenced by version.

The URL paths for frontend and backend are as follow:
- Frontend:  `https://host/<version>` , where `<version>` is either `_current` or a release number. 
- Backend: `https://host/api/<version>`, where `<version>` is the release number of the backend

## Networking

### DNS

A route53 public hosted zone will exist, with the FQDN `bright-light.org.`.

A DNS A-type entry will be created to point to the fixed IP assigned to the EC2 instance, with the FQDN 
`app.bright-light.org.`

### Security

Only the 22 port and 443 port will be open in the instance to the public.

SSH connectivity to the host will be secured by SSL keys pairs and the authorized_keys ssh config file. Private keys
will belong to each maintainer of the project and their public keys will be put and then fetched from S3 or put in the 
instance user data.

### VPC

We will be using the default VPC of the AWS account

## Implementation

The infrastructure will be implemented with Terraform and invoked during the CI pipeline. Great care must be taken so
that the instance does not get replaced at each invocation if it doesn't need to be.