---
title: 'Introducing Dungeon Delvers: Building a Browser-Based MMORPG from Scratch'
date: 2026-03-29
description: >
  What I'm building, why I'm building it in the browser, and the technology
  decisions behind Dungeon Delvers — a fully 3D, real-time MMORPG that lives
  entirely at a URL.
tags: ['Dungeon Delvers', 'MMORPG', 'BabylonJS', 'WebSockets', 'TypeScript', 'Devlog']
---

## Why a Browser MMORPG?

The question I get most often when I tell people what I'm building: _why the browser?_

The honest answer is that I think the browser is the most overlooked gaming platform on the planet. Every device with a screen has one. There's no install, no launcher, no account wall between a player and the game — just a link. For a genre like the MMORPG, where getting friends in the same world is half the battle, that frictionlessness matters enormously. Another reason why I've continued to choose browser based development is simply due to the nature of my career experience. I've been a frontend web developer for the better part of a decade. I feel that I have a deep understanding of the technology that powers the web.

There are common jests online about using JavaScript on the backend. I've been closely following the developments of the UDP-like WebTransport Protocol support in Node.js and my genuine hope is that the "fire and forget" functionality it allows for will offer up the type of performance that I am looking for. I want to show folks just how much can be done leveraging JavaScript alone, both on the frontend and on the backend.

WebGL has matured to the point where genuinely impressive 3D experiences live in the browser. WebSockets give us the low-latency bidirectional channel that real-time multiplayer demands. The Web Audio API, the Gamepad API, WebAssembly for heavy computation — the primitives are all there. The gap between what a native client can do and what a browser can do has never been narrower, and it keeps closing.

I'm building Dungeon Delvers to prove that a real MMORPG — not a Flash throwback, not a stripped-down idle game — can be delivered at a URL.

---

## What Is Dungeon Delvers?

Dungeon Delvers is a fully 3D browser-based MMORPG set on the continent of Weathermoore — a war-scarred land of ancient kingdoms, flooded coastlines, and dungeons that haven't seen daylight in centuries. Players create a character, choose their archetype and race, and step into a persistent world shared with everyone else online. No download. No launcher. Just a URL.

Players form parties to tackle dungeons packed with monsters, cursed artifacts, and ancient evil. Combat is real-time. Your character levels up, acquires gear, and becomes part of a living, breathing community — all without ever leaving the browser tab.

The first milestone is a working prototype that allows multiple concurrent users to log onto a shared server and explore the world of Atla together. Given the massive scope of a project like this, I'm being deliberate about limiting what's in the MVP. The goals are:

- 4 Archetypes: Healer, Scout, Mage, and Fighter playable to level 10
- 4 Playable Races: Human, Dwarf, Orc, Goblin
- 1 Player City: Westfall — the western human capital city on the continent of Weathermoore
- 1 Overland Zone: Saltspray Bluffs
- 1 Dungeon: The Forsaken Cairn
- 10 Unique Monsters
- 10 Weapon Types

---

## The Technology Stack

### BabylonJS — 3D Rendering

BabylonJS is the foundation. It's a mature, actively maintained 3D engine built specifically for the web, with a TypeScript-first API and an incredibly supportive community. It ships with audio and GUI APIs on top of its 3D rendering capabilities, along with solid tooling for scene inspection and debugging. The library is extremely well documented and has the backing of Microsoft.

Importantly, this isn't a paper choice — I'm already using BabylonJS in Harlem Line Hustle, our interactive train experience. That project has been the real-world test bed for understanding the engine's scene management, input handling, and mobile WebGL performance. Everything learned there feeds directly into Dungeon Delvers.

### TypeScript — End to End

TypeScript runs the full stack. Client, authentication, game server, and chat servers all live in a monorepo with shared types. Shared type definitions for game state, entity definitions, and network messages mean the client and server literally cannot drift out of sync at the schema level. In a real-time multiplayer game, where a desync can corrupt session state, having the compiler enforce the contract between client and server is worth every extra minute of setup.

### Socket.io — Real-Time Multiplayer

The multiplayer layer is built on WebSockets rather than WebRTC. WebRTC's peer-to-peer model is appealing for latency, but its signaling complexity and NAT traversal headaches are hard to justify for a game where a central server is already required for authoritative state — cheat prevention, dungeon generation, persistence. WebSockets over a well-located server gives us reliable ordered delivery with latency that's perfectly acceptable for a dungeon crawler where the tick rate doesn't need to match a twitch shooter.

The server architecture is event-driven: the game loop runs at a fixed tick rate, collects input events from all connected clients for the current tick, resolves them against the authoritative world state, and broadcasts state diffs back out. Clients interpolate between received states to smooth over network jitter.

### The Studio Site — Astro + React

The site you're reading this on is built with Astro, with React islands where interactivity is needed (the contact form, the navigation). Astro's content collections drive the blog and project pages, meaning adding a new post or updating project details never requires touching component code. The component library (`@harlem-line-hustle/ui`) is a separate NPM workspace package — built with CSS Modules and Storybook — so the design system can be shared across the studio site and any future game UIs.

---

## What's Been Built So Far

A recent milestone worth celebrating: I loaded up the initial blockout of Westfall and navigated the zone in-engine for the first time. Seeing the landmarks I'd only had in my head — the Archetype guildhalls, the city gates, the market district — made material in 3D was genuinely exciting. Swapping one of the ground planes to use Babylon's water material was a small change that made the whole scene feel dramatically more alive.

<video controls>
  <source src="/blog/introducing-dungeon-delvers/westfall-exploration.mp4" type="video/mp4" />
</video>

_Early blockout of Westfall, the western human capital of Weathermoore._

Modeling, texturing, and animating have been the biggest time sinks so far. I've been incorporating generative AI tools into my process to help manage the sheer volume of content a game like this requires. I have real ambivalence about it — the quality of the assets still needs work, and I think honestly about the broader impact these tools have on artists and the profession. At the same time, as a solo developer staring down the content requirements of an MMORPG, the tools have made the road ahead feel navigable rather than impossible. I've modeled out several starter weapons, player character models, scene assets, and monsters so far, and the pipeline is getting faster.

---

## What Comes Next

The immediate roadmap is:

1. **Multiplayer foundation** — two clients, one room, real-time position sync
2. **Combat prototype** — one enemy type, basic attack and health system
3. **Archetype abilities** — identifying and implementing abilities that make each archetype feel distinct and balanced
4. **Devlog cadence** — I'll post here as each milestone lands

I'm building this in public. Every architectural decision, every wrong turn, every performance discovery will be written up here. If you're interested in browser game development, real-time systems, or just want to follow along, this is the place.

If you have questions, feedback, or you want to be an early tester when the prototype is playable — [get in touch](/contact).

_Descend together._
