---
title: 'Moving to Zig and Cutting Scope'
date: 2026-08-07
description: >
  A short post about why I have decided to move the game engine from JavaScript over to Zig.
tags: ['Dungeon Delvers', 'TypeScript', 'JavaScript', 'Game Development', 'Architecture', 'Devlog', 'Zig', 'Mach']
---

## Migrating to Zig

![Zig Logo](/blog/moving-to-zig/zig-logo.png)

So it's been a while since I last posted and I've made some changes with Dungeon Delvers. I've made a big decision and I have opted to move away from a fully JavaScript project and instead migrate the project over to the low level programming language `Zig`.

The reason for this is mainly personal. I've been already getting a bit outside of my comfort level by delving deeper into 3D modeling and backend JavaScript than I had done previously, but I wanted to step FURTHER outside of my comfort zone and dig into some lower level programming. I had been hearing about Zig a bunch from folks and I figured: "What better way to dip into something new than in my very own personal project?"

I found the open source game engine [Mach](https://machengine.org/) and I started the process of migrating my game over to the new game engine. Mach itself is still actively in development, as is Zig, which hasn't yet hit version 1.0. This allows me not only to learn a new language, but it can also offer the opportunity to help contribute to these two open source communities.

Another reason why I wanted to move to Zig was that I wanted a native game that could be built on multiple operating systems. One of Zig's biggest draws at the moment is how easy it is to cross compile projects across operating systems. While I initially was hoping to release a browser-based MMORPG on the web, I've noticed that browser games normally aren't received as well as native ones, and trying to integrate Electron to build a desktop version of my game seemed like a worse option than just going with a non-scripting language. Another draw from Zig is that it is able to seamlessly pull in C dependencies without much trouble. C has been around for longer than I've been alive and having that wealth of resources at my fingertips is exciting.

<video controls>
  <source src="/blog/moving-to-zig/skeleton.mp4" type="video/mp4" />
</video>

## Reducing Scope

Another decision that I've made is that I'd like to actually remove the "Massively Multiplayer Online" from the MMORPG. Interest in the project hasn't been insane at the moment, and some of the things that I've been hearing from big game companies that have been struggling recently is that long lived games have been struggling to gain the numbers that they require to keep going. People have so many competing demands on their attention. When I was considering this, I remembered what games I (in my admittedly limited amount of free time) have been able to play. I've played games like Hades, Darkest Dungeon, Baldur's Gate III, The Last of Us Part II. Having the ability to play a game and pick up progress where I last was has been the only thing that has allowed me to actually play a game. I was thinking back to games like Baldur's Gate and Star Wars: Knights of the Old Republic and I have started to feel more confidently that if I actually want to finish this game and potentially get better interest, that I should focus on the RPG elements of the game. If interest picks up in the future perhaps I'll consider making a MMO, but for now I think it's safer if I cut scope and make a game that I'll be proud to share with my kids.

Removing the MMO requirement from the project will mean I don't have to focus on a server/database to host players. I won't have to wait on UDP support to land for Node.js. I also won't have to worry about cheating and moderation as much as I would have to if I were trying to create an MMO.

<video controls>
  <source src="/blog/moving-to-zig/goblin_idle.mp4" type="video/mp4" />
</video>

## What's Next

I am now focusing my efforts on getting a playable demo out the door. The same goals from before:

- 4 Archetypes: Healer, Scout, Mage, and Fighter playable to level 10
- 4 Playable Races: Human, Dwarf, Orc, and Goblin
- 1 Player City: ~~Westfall~~ Queen's Port (after talking with a co-worker, I realized Westfall was a zone from World of Warcraft) — the western human capital city on the continent of Weathermoore
- 1 Overland Zone: Saltspray Bluffs
- 1 Dungeon: The Forsaken Cairn
- 10 Unique Monsters
- 10 Weapon Types

Till the next blog post, stay safe adventurer!