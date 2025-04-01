---
title: "Welcome To The Hustle: Dungeon Delvers"
date: 2025-03-14 15:37:58
description: A solo developer is embarking on the ambitious project of creating a 3D MMORPG, "Dungeon Delvers," inspired by classic MMOs and Dungeons & Dragons. The project aims to build a community-driven game, focusing on rich lore and engaging combat, rather than profit. The developer plans to leverage AI for asset creation, including enemy models and procedural world generation, to overcome the limitations of being a one-person team. The tech stack is JavaScript-centric, featuring Node.js/Express for server-side logic, Postgres for data storage, Socket.io for real-time communication, and BabylonJS for the 3D game client, all written in TypeScript and tested with Jest. The game will include unique races, character archetypes, and zones, with a focus on creating a dynamic and replayable world.
tags:
  - MMO
  - Javascript
  - BabylonJS
  - Express
  - SocketIO
---

I figured I’d just get into the nitty gritty for my first blog post and forgo the “Hello World” type post and instead work through some of the thoughts and ideas for the game I am attempting to build. Despite the large scope of the project, I have decided to begin development of a 3D MMORPG.. Inspired primarily by the folks building Project Lantern, Monsters & Memories, as well as Pantheon: Rise of the Fallen, I’ve decided to try and take a stab and lay another brick in the wall of fantasy MMOs that currently exist. The goal for the project is less to make a profit, but to see if I can push to create something that I’ve always wanted to do.

## The Idea:

Since I was in middle school I got absolutely lost in the worlds of Norrath in Ever Quest and Ever Quest II, much later in life with the release of Classic World of Warcraft I delved into the realm of Azeroth. I have always loved the sense of community, the lore, and the draw of battling mythical creatures in a 3D world that is shared. I got an absolute thrill a couple years back when I was the dungeon master for several Dungeons and Dragons and it was this spark that really got me chomping at the bit to share the stories and lands that I had envisioned in my mind’s eye.

When a friend of mine introduced me to a height map that was generated via BabylonJS, I was hooked. I have spent a bunch of time getting up to speed with the 3D Javascript framework, and I have been more recently trying to cut my teeth on 3D modeling in Blender. After years of just learning APIs and industry standards, as such I have several goals for this project:

- Set up a game server where multiple users can interact in a 3D space
- Leverage a real time combat system that draws on the stats from the Pillars of Eternity franchise (I love the idea that there are “mighty” warriors and wizards instead of your standard strength based fighter or intelligent wizard)
- Model both male and female models for the following races in Blender: Human, Dwarf, Orc, and Goblin
- Add four facial customizations for the races to allow for them to be more unique
- Create 20 unique enemies in blender
- Model and texture a set of cloth, leather, chain, and plate armor, as well as a robe for player characters.
- Model and texture at least 10 weapons for player characters and monsters to wield.
- Implement the four following player archetypes: Fighter, Scout, Healer, and Mage and add unique skills/abilities till level 10
- Create one city zone for players to train, sell/purchase goods, train, and gain quests
  -Create 4 unique zones for players to explore and battle in.

This list is already growing quite large and this doesn’t even include the main gameplay loop. Seeing as how I am only one man tasked with a slew of daunting tasks I am looking to leverage generation to help aid me where it can.

For the unique enemies that can be fought, I am looking to lean into image and model generation via AI to aid me. I wish I could say that I am more artistically inclined but I am more of a code slinger. A point of note, the models that AI generates don’t tend to produce clean meshes at all (at least with the process I use). So these models need to be brought into Blender and cleaned up with nicer topology. To aid in animation I am hoping to lean into the amazing work that has been done over at Mixamo.

For the zones, I am looking to again leverage procedural generation to help me create terrain, dungeons, and disperse assets to make a convincing area for players to explore. This also is one of the main areas that I am extremely excited to explore. Currently most MMO’s that I am aware of seem to offer a “theme park” sort of experience and I am hoping to break out of this and generate a unique world when a server is started up. This in turn will hopefully keep players coming back if a new server is simply started.

## Tech Stack:

As a seasoned web developer, I've opted for a JavaScript-centric tech stack for 'Dungeon Delvers.' This choice allows me to utilize my existing skills and leverage the flexibility of web technologies. Specifically, I'm using Node.js/Express for secure authentication, Postgres for reliable data storage, Node/Socket.io for real-time game server communication, and BabylonJS/Socket.io for the 3D game client. To ensure code quality and maintainability, the entire project is written in TypeScript and thoroughly tested with Jest
