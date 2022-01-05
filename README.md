# Bright Light

## Table of contents

- [Bright Light](#bright-light)
  - [Table of contents](#table-of-contents)
  - [About Bright Light](#about-bright-light)
    - [What is Bright Light ?](#what-is-bright-light-)
    - [Do we need yet another data specification to describe game rules ?](#do-we-need-yet-another-data-specification-to-describe-game-rules-)
    - [The collaborative effort](#the-collaborative-effort)
    - [The Bright Light community](#the-bright-light-community)
  - [The application](#the-application)
    - [Documentation](#documentation)
    - [Technology](#technology)
    - [Development collaboration](#development-collaboration)

## About Bright Light

### What is Bright Light ?

At its heart, Bright Light is a tool to help you manage your bands for different tabletop games, by the player community
for the player community. Many such tools exist, this one is born with the spirit of open source and collaboration, to
not try to profit from it, but rather give and take, everyone working together to enjoy games that are close to our
heart.

### Do we need yet another data specification to describe game rules ?

We may do, but we will start by working with the most currently accepted data format, honouring the incredible and massive
work done by the BattleScribe community. Long term, it would be great that this data specification is evolved to serve
the needs of those who write the information. We may even think of adopting another document language, although XML is
fine for this use case.

Bright Light aspires to be part of this community, to be open and collaborative with other applications that may serve
the same purpose in different ways.

### The collaborative effort

This application is open for all to participate in its development. A big effort will be made to try to listen to every
voice at the design level, at the data level, and user requests. Priority will be given to people that actively collaborate
in the different parts of the application (codification, translation, data) as they are the one with the most stakes on
the system.
Until such a time that there's more than one regular person working on Bright Light, I (the original author of this repo)
will reserve the capacity to take all the final decisions regarding this project as a benevolent dictator of sorts. But I 
fully embrace the free and open source spirit, so I fully support forks of this project and I will strive to keep 
communication channels open so that we can all collaborate effectively, specially on the data format which is the most
important piece of the system. We all win when we can work together, even if not in the same project. We all benefit from
redundancy and diversity.

### The Bright Light community

Above all, respect and kindness are the most important value of our community. There is nothing more important than for
everyone to feel welcome and in a secure, fun space. Nothing else matters, really. Not even this project. 

## The application

### Documentation

The `./documentation` folder contains all the documentation generated for the project, including design documents, technology choices
and explanation, project milestones and goals. This project will make use of the different features of github to provide
for issues reporting, but will try to keep documentation under version control as a single source of truth the closest
to its source.

### Technology

There are two pieces to the Bright Light application:
- A frontend
- A backend
The first one is implemented as an SPA in Angular, and the second one will probably be done as a very simple REST service
in Java.
Everything will be hosted in a cheap VPS provider.

### Development collaboration

Initially, all collaboration will be done under a Fork & Pull Requests system. Eventually, as other people become regular
collaborator, they will be added to the maintainers list of the project with the capacity to create branches and propose
PR from the branch instead of having to fork. When the community is bigger, there will be a higher pool of people that
can accept merges to the main branch.

All the code will be licensed under the GNU AFFERO GENERAL PUBLIC LICENSE v3, always. 
