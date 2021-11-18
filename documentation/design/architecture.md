# Technical architecture

## Table of Contents
- [Technical architecture](#technical-architecture)
  - [Table of Contents](#table-of-contents)
  - [Client and server](#client-and-server)
    - [Client](#client)
    - [Server](#server)
    - [Infrastructure](#infrastructure)
  - [Constraints](#constraints)
    - [Flexibility in deployment](#flexibility-in-deployment)
    - [Cheapness of the solution](#cheapness-of-the-solution)
    - [Game data must be kept in another place than the client or backend hosts](#game-data-must-be-kept-in-another-place-than-the-client-or-backend-hosts)
    - [User data must belong to the end user](#user-data-must-belong-to-the-end-user)

## Client and server

A Bright Light game application is a client application that the user interacts with. It may interact with a backend 
server to fetch data, notably about game systems and in a future perhaps even user accounts if there are any.

### Client

The client will be web-based to reach the maximum number of platforms initially. In the future we may be interested in
creating more native experiences, but as declared in the goals, we want to deliver a product as fast as possible to get
feedback as earlier as possible. It also makes it easier to collaborate as there far more frontend developers that know
about web technologies than desktop/mobile technologies.

A website also makes distributing and updating the client very easy.

When we say web-based we mean a website, not an application built with web technologies but packaged as a desktop app,
like applications developed with Electron-like technology. There are two reasons for this:
- I greatly dislike unoptimised memory devourers and anything based on Chrome
- Electron apps cannot be packaged to mobile platforms

### Server

There may be a need to have some backend services that fetch data that is not possible to be fetched from the client
application, related to data catalogues for example. This will also allow to escape the same origin limitations for
web applications which prevent JS code from fetching resources from another domain.

This will later on allow to add more permanent features and customisations for the end-user.

The technology to serve as a backend does not matter much. The more currently popular so that collaboration is easier 
but keeping in mind that memory consumption must be low to fit inside a t4g.nano instance with 512MB of memory.

### Infrastructure

To be able to satisfy the constraints of the project, a very simple infrastructure is chosen:
A single instance in some cloud provider running a reverse proxy to front the static client files and the backend 
server.

A DNS domain will be created so that we can secure the connection with HTTPS. A DNS entry will point to the current
version of the client application. SSL certificates will be generated with [Let's Encrypt](https://letsencrypt.org).

Each version will be stored under a different path, with the current release being pointed by the `/_current` URL Path.

To avoid cluttering up the server, we will make a difference between deployed releases that can be deleted and permanent
releases, so that when developing we can do quick iterations that will be deleted at the end of the day, while permanent
releases are either to perform longer E2E tests or versions we want to keep in parallel for some time for compatibility
reasons.

Backend services will always be versioned, there won't be a `_current`. Each client will specify which version of the
backend it works with.

Since we will have a single instance, the deployments will be in place, with something like Ansible. A docker
container could be considered, but it will probably be more expensive to create and store the different versions of the
apps this way than to update in-place and make use of the disk to store those versions.

Versions of both backend and client will be deployed automatically from the code with a CI pipeline.

The initial cloud provider is AWS and the instance will be a T4g.nano, which should yield a low cost, at least until 
data transfer out becomes prohibitive.

## Constraints

### Flexibility in deployment

Since the legality of the project is contestable, we need to be able to deploy the backend and frontend easily to 
another platform or even be able to self host if need be.

My expertise for infrastructure is in AWS, so I would use something like S3 to host static files and Lambda to do the 
backend, but that's a pretty serious lock-in and would prevent the system to be easily deployable. So, it is actually
in the interest of this constraint and also surprisingly cheaper if we want https to be enabled to have a small server
with an nginx reverse proxy to serve both frontend and backend, a fixed public ip and a DNS entry pointing to it.

This approach allows to migrate the host to any other host provider since it is so basic. It also allows for easy 
testing.

### Cheapness of the solution

This is a non professional project with a no profit goal, so being cheap to maintain is important, since it is likely
to be paid by a single person.

For this reason hosting into a single instance with a fixed IP is chosen in AWS, T4g.nano instance type. We need an 
instance because there's no cheap way to have https with something like an S3 bucket and lambdas.
Everything that can be automated should be automated.

The backend solution must consume almost no memory. Both frontend and backend should consume less than 512MB. So, no 
explosive use of libraries. 

### Game data must be kept in another place than the client or backend hosts

The game data of the project cannot be hosted in the same place than the client, to reduce legal impact. Collaboration 
with the data teams is needed to sync both.

Data would be retrieved from the backend of the client.

### User data must belong to the end user

Bands generated by the user must be stored into their local machine and also be loaded from it. This accomplishes 
several goals:

- The end user owns its data
- the system is resilient to being brought down in one place and brought up in another
- The end user data can be used by different clients or migrated to other platforms