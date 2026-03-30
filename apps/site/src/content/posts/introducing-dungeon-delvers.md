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

The question I get most often when I tell people what I'm building: *why the browser?*

The honest answer is that I think the browser is the most overlooked gaming platform on the planet. Every device with a screen has one. There's no install, no launcher, no account wall between a player and the game — just a link. For a genre like the MMORPG, where getting friends in the same world is half the battle, that frictionlessness matters enormously.

The deeper answer is a bet. WebGL has matured to the point where genuinely impressive 3D experiences live in the browser. WebSockets give us the low-latency bidirectional channel that real-time multiplayer demands. The Web Audio API, the Gamepad API, WebAssembly for heavy computation — the primitives are all there. The gap between what a native client can do and what a browser can do has never been narrower, and it keeps closing.

I'm building Dungeon Delvers to prove that a real MMORPG — not a Flash throwback, not a stripped-down idle game — can be delivered at a URL.

---

## What Is Dungeon Delvers?

Dungeon Delvers is a fully 3D browser-based MMORPG. Players form parties to tackle procedurally generated dungeons packed with demons, cursed artifacts, and ancient evil. Combat is real-time. The world is persistent. Your character levels up, acquires gear, and becomes part of a living, breathing community — all without ever leaving the browser tab.

The core loop is deliberately classic MMORPG:

- **Explore** — enter a dungeon with your party, each run procedurally different
- **Fight** — real-time combat against enemies with distinct behaviors and attack patterns
- **Loot** — weapons, armor, consumables, and rare drops tied to enemy tiers
- **Grow** — character progression, skill trees, and a crafting system
- **Return** — a persistent world where your character, your guild, and your reputation carry over between sessions

The "descend together, die together" tagline isn't just flavor. Party synergy is a first-class design constraint. A solo player can push into the shallower floors, but the deeper dungeons are tuned for coordinated groups. The social fabric is load-bearing architecture.

---

## The Technology Stack

### BabylonJS — 3D Rendering

BabylonJS is the foundation. It's a mature, actively maintained 3D engine built specifically for the web, with a TypeScript-first API and a physics pipeline that integrates cleanly with real-time networking. The documentation is excellent and the community is large enough that edge cases are usually already answered.

The alternative I seriously considered was Three.js. Three.js gives you more raw control and has a larger ecosystem of community shaders and addons. But for a game — rather than a data visualization or a product demo — BabylonJS's built-in scene graph, input handling, animation system, and inspector tooling tilt the scales. You spend less time rebuilding game infrastructure and more time on the game itself.

The current proof of concept for BabylonJS rendering is actually Harlem Line Hustle, our interactive train experience. That project is where I've been stress-testing the engine, learning its scene management patterns, and proving out mobile WebGL performance. Everything learned there feeds directly into Dungeon Delvers.

### TypeScript — End to End

TypeScript runs the full stack. The client, the game server, and the studio website are all TypeScript. Shared types for game state, entity definitions, and network messages live in a shared package so the client and server literally cannot drift out of sync at the schema level. In a real-time multiplayer game, where a desync can corrupt session state, having the compiler enforce the contract between client and server is worth every extra minute of setup.

### WebSockets — Real-Time Multiplayer

The multiplayer layer is built on WebSockets rather than WebRTC. WebRTC's peer-to-peer model is appealing for latency, but its signaling complexity and NAT traversal headaches are hard to justify for a game where a central server is already required for authoritative state (cheat prevention, dungeon generation, persistence). WebSockets over a well-located server gives us reliable ordered delivery with latency that's acceptable for a dungeon crawler where the tick rate doesn't need to match a twitch shooter.

The server architecture is event-driven: the game loop runs at a fixed tick rate, collects input events from all connected clients for the current tick, resolves them against the authoritative world state, and broadcasts state diffs back out. Clients interpolate between received states to smooth over network jitter.

### The Studio Site — Astro + React

The site you're reading this on is built with Astro, with React islands where interactivity is needed (the contact form, the navigation). Astro's content collections drive the blog and project pages, meaning adding a new post or updating project details never requires touching component code. The component library (`@harlem-line-hustle/ui`) is a separate NPM workspace package — built with CSS Modules and Storybook — so the design system can be shared across the studio site and any future game UIs.

---

## What's Been Built So Far

The project is early. I'm not going to dress that up. But the foundational decisions are made and the first pieces are in place.

**The studio monorepo** is structured as an NPM workspace with `apps/` (the game, the site) and `packages/` (the shared UI library). Establishing this structure now, before either app is large, means we avoid the dependency hell and code duplication that plagues game studios who bolt on a website long after the game is already shipping.

**Harlem Line Hustle** — the interactive 3D train experience — is the first proof of concept for the BabylonJS + TypeScript pipeline. It runs in the browser, it works on mobile, and it handles the scene management, input system, and asset loading patterns that Dungeon Delvers will build on. Think of it as the engine test bed.

**The UI component library** is live with Storybook. Logo, navigation, buttons, cards, typography, form fields — all styled to the studio's design language and documented in isolation. When the game eventually needs web-based UI (character sheets, lobby screens, inventory overlays), the components and tokens are ready.

**The architecture for real-time multiplayer** is designed on paper: tick loop, event sourcing for game state, delta compression for state diffs, client-side interpolation. The next major milestone is getting the first two clients into the same dungeon room, seeing each other move in real time.

---

## What Comes Next

The immediate roadmap is:

1. **Dungeon renderer** — load a procedurally generated dungeon layout into BabylonJS, walk through it with a character controller
2. **Multiplayer foundation** — two clients, one room, real-time position sync
3. **Combat prototype** — one enemy type, basic attack and health system
4. **Devlog cadence** — I'll post here as each milestone lands

I'm building this in public. Every architectural decision, every wrong turn, every performance discovery will be written up here. If you're interested in browser game development, real-time systems, or just want to follow along, this is the place.

If you have questions, feedback, or you want to be an early tester when the prototype is playable — [get in touch](/contact).

*Descend together.*
