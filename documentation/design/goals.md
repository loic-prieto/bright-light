# Design goals for the Bright Light application

## What is Bright Light ?

It is an application that allows to create and manage bands for different tabletop games. 

We will start with the grimdark setting that everyone loves, and it will be the main focus of Bright Light for a long 
time, although the design of the application should accommodate different settings in the way it handles data and 
validations.

## Data is King

Bright Light is a rules engines at its core, and the most important part of the system are the rules and data written
for the different games, everything should make it easy to write them and make life more enjoyable for the people that
do it. They are the main stakeholders of the project. 

There's a lot of work done in BattleScribe data catalogues. We should aim to directly being able to use that data format
for a long as possible and then coordinate with the teams that write them to evolve it to a data specification that is 
better for them, as the data format serves BattleScribe needs, which aims to be a more generic army builder than Bright
Light, which is mainly focused on the grimdark setting, so it has to make less compromises for other games...initially.

## Support for different games

At the outset, I think that the application should be very modular, delegating most of the rule writing to the settings
teams. 

It is almost impossible to write a single application that can be fluid and useful for more than one game. So, it 
is very possible that we will need a constellation of applications under the Bright Light brand that serve different 
games, with the same development philosophy and the same communities but different code repos.

This main repo should provide a unified framework to build these game-specific applications, so perhaps these will be
more like a framework or a library of UI and game-logic components, that different game repos use as a base to build 
their own application.

## Supported platforms

It is a non-goal of the project to support mobile platforms natively. It is a preference of the original author of this
repo, since he mainly uses a desktop environment to build bands.

Still, some support should be given if possible. Which is why, perhaps the easiest way to have a maximum number of 
platforms supported is to build a progressive web app with the latest JS framework-du-jour. 

Desktop will be given priority initially.

## The narrative experience

When we're talking about involved settings, usually it is much more rewarding to design a background history for the 
band and its different characters. Some game have a campaign mode, where the characters of the band evolve over a series
of games, both mechanically and history-wise. 

The application should place this at the forefront, help the end-user to write the lore of their band and see it. Bands
are not merely a collection of rules and equipment composition.

## MVP + iterative approach

It is  goal of the project to be usable as quickly as possible and have the community guide the development of the 
application. We do not aim to have a very polished product from the beginning. This may be frustrating for some, but it
encourages collaboration and fear to release that may paralyse a project like this one. 

To this end, a document detailing the milestones that we want to achieve short and long term will guide the development,
and set realistic goals that can be achieved and allow to then iterate and pivot based on the user feedback.

## The system should be as local as possible

The system should not force a user to register to any account to make use of the client application. User data should
be able to be stored in the user local machine and loaded from it. That's not to mean that rules and games system
should be stored in the user's system, but the bands themselves should be able to be saved and loaded locally, so that
the end-user's data is always in their 

## Non Profit

This system should never be done for profit. It is a community managed project to serve its own needs. So, no adds, no
donations aside from the strictly necessary to keep the service running (whose cost will be transparent), no corporate
backing (xDD, as if any corporation would back this). 