---
title: 'Building the Character Class: One Abstract Class, Two Very Different Inheritors'
date: 2026-05-11
description: >
  A walkthrough of the abstract Character class powering Dungeon Delvers — how
  base stats, attribute modifiers, and buffs compose into computed values, how
  PlayerCharacter and MonsterCharacter extend it, and why I threw away every
  line of code that Cursor generated for me along the way.
tags: ['Dungeon Delvers', 'TypeScript', 'Game Development', 'Architecture', 'AI Tools', 'Devlog']
---

## Why Start with the Character Class?

Almost everything that happens in an MMORPG happens _to_ or _by_ a character. A goblin swings at you — both of you are characters. You heal a party member — two characters again. A boss hits the entire raid with a frost aura — every character in the AoE has to resolve the damage against their own defenses, their own resistances, their own active buffs.

If the data model for a "character" is wrong, _everything_ downstream of it is wrong. Combat, AI, abilities, party UI, the network protocol that syncs state between clients — they all sit on top of this one type. So before I let myself touch anything fun, I sat down and built the spine.

This post walks through the result: a single `abstract class Character` that defines how stats are computed, with `PlayerCharacter` and `MonsterCharacter` (a.k.a. `NonPlayerCharacter`) extending it to layer on the things that make a player a player and a monster a monster. It also covers a side experience I had on the way: handing the work to Cursor, watching it produce something plausible-looking, and ultimately throwing all of it out.

---

## The Core Idea: Base State In, Computed State Out

The Character class has a single underlying principle: store one canonical block of _base_ values, and expose every visible stat through a getter that recomputes from base + attribute modifiers + active buffs on every access.

In other words, you never mutate `character.accuracy` directly. You mutate inputs — the underlying base, the active buff list — and the value of `accuracy` reflects the truth at any given moment.

Here's the shape of the base state, lifted directly from the constructor:

```ts
this.base = {
  accuracy: args.accuracy,
  areaOfEffect: args.areaOfEffect,
  attackSpeed: {
    melee: args.attackSpeed?.melee ?? 1,
    ranged: args.attackSpeed?.ranged ?? 1,
  },
  attributes: args.attributes,
  concentration: args.concentration,
  damageModifier: args.damageModifier,
  damageReduction: {
    CORRODE: args.damageReduction?.CORRODE ?? 0,
    CRUSH:   args.damageReduction?.CRUSH   ?? 0,
    // ...one entry per damage type
  },
  defenses: args.defenses,
  duration: args.duration,
  healingModifier: args.healingModifier,
  health: {
    current: args.health?.current ?? args.health?.max,
    max: args.health.max,
    regen: args.health.regen,
  },
  interrupt: args.interrupt,
  movementSpeed: args.movementSpeed ?? 1,
};
```

That's the static layer. It rarely changes — a character's race and archetype give them a baseline; gaining a level or training a skill can nudge it. But it doesn't change on every tick.

The _dynamic_ layer is two things:

1. **Attribute-derived modifiers** — six attributes (CON, DEX, INT, MIG, PER, RES) each contribute, in a precisely calibrated way, to several stats.
2. **Buffs** — a `Map<string, Buff>` of currently-applied effects, each of which may carry deltas to any of the same stats.

Everything else is just composition. Let's look at how.

---

## The Attribute Class Hierarchy

Attributes live in `lib/engine/attribute.ts` and look like this:

```ts
export class Attribute {
  #value: number;
  constructor(value: number) {
    this.#value = value;
  }
  calculateModifier(modifier: number) {
    return (this.value - 10) * modifier;
  }
  get value(): number {
    return this.#value;
  }
}

export class Constitution extends Attribute {
  constructor(value: number) { super(value); }
}
export class Dexterity extends Attribute { /* ... */ }
export class Intellect  extends Attribute { /* ... */ }
export class Might      extends Attribute { /* ... */ }
export class Perception extends Attribute { /* ... */ }
export class Resolve    extends Attribute { /* ... */ }
```

You'll notice that the six concrete subclasses are functionally identical to the base — empty constructors, no overrides. That is _intentional_, and the reason is one I borrowed from Pillars of Eternity's design philosophy: attributes are nominal types because they participate in distinct game logic at every call site.

When I write `this.attributes.PER.calculateModifier(MOD_ACCURACY)`, I want the type system to slap me if I accidentally pass `MIG` to a perception-based calculation. The classes are empty today, but the type system is doing real work, and as the game systems mature each attribute is a natural home for behavior the others don't share — Constitution might gain a fatigue calculation, Resolve a fear-resistance one. The slots are already cut.

The `calculateModifier` formula itself is the workhorse: `(value - 10) * modifier`. A baseline character has 10 in every attribute, contributing zero to any modifier — they are the median, the average, the baseline. Every point above 10 adds the per-stat coefficient; every point below 10 subtracts it. So a Might of 16 with `MOD_DAMAGE_MODIFIER = 0.03` contributes `(16 - 10) * 0.03 = 0.18`, an 18% damage bonus. A Might of 8 contributes `-0.06`, a 6% damage penalty.

The MOD constants are kept at the top of `character.ts`:

```ts
const MOD_ACCURACY        = 1;
const MOD_AREA_OF_EFFECT  = 0.06;
const MOD_ATTACK_SPEED    = 0.03;
const MOD_CONCENTRATION   = 3;
const MOD_DAMAGE_MODIFIER = 0.03;
const MOD_DURATION        = 0.05;
const MOD_HEALING_MODIFIER= 0.03;
const MOD_HEALTH          = 0.05;
const MOD_INTERRUPT       = 3;
const MOD_WILL            = 2;
const MOD_DEF             = 1;
const MOD_REF             = 2;
const MOD_FOR             = 2;
```

These are the tuning knobs. They define how impactful a single attribute point is for every stat in the game. Pulling them out as named constants means I can rebalance the whole stat curve by editing a dozen numbers in one file rather than hunting down magic numbers scattered across every getter.

---

## Computed Stats: Three-Layer Composition

Let me show one getter in full to make the pattern concrete. Here's `accuracy`:

```ts
get accuracy() {
  let bonuses = 0;
  for (const [, buff] of this.#buffs) {
    bonuses += buff.accuracy ?? 0;
  }
  return (
    this.base.accuracy +
    this.attributes.PER.calculateModifier(MOD_ACCURACY) +
    bonuses
  );
}
```

Three pieces, summed:

1. `this.base.accuracy` — the constant baseline from the constructor.
2. `this.attributes.PER.calculateModifier(MOD_ACCURACY)` — the perception-derived contribution.
3. `bonuses` — the sum of `.accuracy` deltas across every active buff.

That's it. Every visible stat on the character follows this same template, with two variations: a few stats round their result with `Number(x.toFixed(2))` to keep floating-point noise out of the UI, and a few derive from _multiple_ attributes rather than one.

The "multiple attributes" case is most interesting in the defenses getter:

```ts
get defenses(): Defenses {
  return {
    DEF:
      this.base.defenses.DEF + this.attributes.RES.calculateModifier(MOD_DEF),
    FOR:
      this.base.defenses.FOR +
      this.attributes.CON.calculateModifier(MOD_FOR) +
      this.attributes.MIG.calculateModifier(MOD_FOR),
    REF:
      this.base.defenses.REF +
      this.attributes.DEX.calculateModifier(MOD_REF) +
      this.attributes.PER.calculateModifier(MOD_REF),
    WIL:
      this.base.defenses.WIL +
      this.attributes.INT.calculateModifier(MOD_WILL) +
      this.attributes.RES.calculateModifier(MOD_WILL),
  };
}
```

Four defenses, each fed by one or two attributes:

- **Deflection** (the main "did you get hit" stat) scales with Resolve.
- **Fortitude** (poison, disease, raw physical trauma) scales with Constitution and Might.
- **Reflex** (dodging, AoEs) scales with Dexterity and Perception.
- **Will** (mental effects, charm, fear) scales with Intellect and Resolve.

This means investing in a single attribute always affects more than one stat, which is the kind of intentional, web-like dependency that makes character building interesting. A high-Might fighter isn't just "the damage one" — they're also the one who shrugs off poison. A high-Resolve paladin isn't just defensive — they're also mentally fortified. The attributes _braid_ into the stats, and the braid is the gameplay.

---

## Buffs: The Dynamic Layer

Buffs live in `lib/engine/buff.ts` and are intentionally lightweight:

```ts
export type Buff = AttributeStatModifier & {
  id: string;
  name: string;
  type: BuffType;
  duration?: number;
};
```

The interesting part is that `AttributeStatModifier` is _identical in shape_ to the stat block used to construct the character — except every field is optional. That symmetry is deliberate. A buff is just a partial overlay; you say "give this character +10 accuracy and +2 to Constitution for 30 seconds" by spreading the same field names you used to define the base values.

The Character class stores buffs in a `Map<string, Buff>` keyed by the buff id, exposed via `applyBuff` and `removeBuff`:

```ts
applyBuff(buff: Buff) {
  this.#buffs.set(buff.id, buff);
}

removeBuff(buffId: string): boolean {
  return this.#buffs.delete(buffId);
}
```

Every computed getter walks this map at access time and sums the relevant field. The buff map is private (`#buffs`), so external code can only mutate it through the two public methods. That keeps the buff lifecycle in one place and avoids the classic bug where someone forgets to remove a buff and the player permanently has +50 movement speed.

You can see the pattern recursing in any stat with structured data. Here's `attributes`, which has to fold bonuses into six separate fields:

```ts
get attributes() {
  const bonuses = { CON: 0, DEX: 0, INT: 0, MIG: 0, PER: 0, RES: 0 };
  for (const [, buff] of this.#buffs) {
    bonuses.CON += buff.attributes?.CON ?? 0;
    bonuses.DEX += buff.attributes?.DEX ?? 0;
    bonuses.INT += buff.attributes?.INT ?? 0;
    bonuses.MIG += buff.attributes?.MIG ?? 0;
    bonuses.PER += buff.attributes?.PER ?? 0;
    bonuses.RES += buff.attributes?.RES ?? 0;
  }
  return {
    CON: new Constitution(this.base.attributes.CON + bonuses.CON),
    DEX: new Dexterity   (this.base.attributes.DEX + bonuses.DEX),
    INT: new Intellect   (this.base.attributes.INT),
    MIG: new Might       (this.base.attributes.MIG + bonuses.MIG),
    PER: new Perception  (this.base.attributes.PER + bonuses.PER),
    RES: new Resolve     (this.base.attributes.RES + bonuses.RES),
  };
}
```

Yes, the iteration is verbose, and yes, you could DRY it out with `Object.entries` and a reducer. I went with the explicit version for now because the call site is hot — getters run on every render frame and every combat tick — and because explicit code is easier to debug than clever code. When the buff list is sparse (typical case: zero to four buffs), six tight `+=` lines walk the loop in microseconds. We can optimize when there's a measurable problem.

---

## Why `abstract`?

`Character` is declared `abstract`, which means you cannot instantiate it directly. You can only construct a subclass. There are two reasons for that:

**1. There is no such thing as "a character."** Every entity in the game world is _either_ a player-controlled character or a non-player one. Those two have meaningfully different state: a player has an archetype, an inventory, and equipped gear; a monster has a creature type, a threat table, and an AI strategy. Allowing direct instantiation of `Character` would invite someone to construct a half-baked entity that doesn't actually fit any role.

**2. It locks in the contract.** The shared logic — base + attribute mods + buffs → computed stats — is the part I want every entity to inherit identically. By living on the abstract class, that logic is _impossible_ to forget to implement. A subclass adds; it doesn't have to redefine the math.

The test file confirms this: to test the abstract class in isolation, I have to declare a minimal concrete subclass inside the test:

```ts
class ConcreteCharacter extends Character {
  constructor(args: CharacterArgs) {
    super(args);
  }
}
```

That ceremony is a feature, not a bug. It means the production code never accidentally produces a generic Character — only the test scaffolding does, and only for the explicit purpose of exercising the base class.

---

## PlayerCharacter: Adding Equipment, Inventory, Archetype

`PlayerCharacter` extends `Character` and adds the three things that make a player a player:

```ts
export class PlayerCharacter extends Character {
  #archetype: Archetype;
  #inventory: Inventory;
  #equipped: Equipment;

  constructor(args: PlayerCharacterArgs) {
    super(args);
    this.#archetype = args.archtype;
    this.#inventory = new Inventory();
    this.#equipped = new Equipment(args.equipment);
  }

  override get accuracy(): number {
    let equipmentBonuses = 0;
    for (const [, item] of this.#equipped.equipment) {
      equipmentBonuses += item?.stats?.accuracy ?? 0;
    }
    return super.accuracy + equipmentBonuses;
  }

  get archtype(): Archetype {
    return this.#archetype;
  }
}
```

Two things to call out here:

**The `override` keyword on `accuracy`.** This is TypeScript telling us that we're _intentionally_ replacing the base class implementation. If `Character.accuracy` ever gets renamed or removed, the compiler will scream at this site. That's the safety net you want when you're extending a complex base class.

**`super.accuracy + equipmentBonuses`.** This is the prettiest line in the whole module to me. We don't reimplement the base + attribute + buff math; we _delegate_ to the parent class via `super`, and then layer equipment bonuses on top. The three-layer composition (base + attributes + buffs) now becomes four (+ equipment) for players, and it's expressed as one extra line. That's exactly the leverage I wanted from the inheritance hierarchy.

Equipment itself is a thin wrapper around a `Map<EquipmentSlot, Item | null>` with twenty fixed slots (head, chest, primary weapon, two ring slots, etc.). When the player equips a new item, we set the slot. The next time a stat getter runs, the new bonus is reflected. No cache invalidation, no dirty flag, no recompute queue. The pull-based architecture means the truth is always fresh.

This same pattern will extend to every other player-affecting stat — `damageModifier`, `defenses`, `attackSpeed` — as I wire equipment up across the board. The override only needs to fold in the equipment contribution; the parent class handles everything else.

---

## MonsterCharacter: Adding Threat and Creature Type

The non-player side of the inheritance is `MonsterCharacter`, aliased as `NonPlayerCharacter` for use sites where the contrast with player characters reads more naturally:

```ts
export class MonsterCharacter extends Character {
  creatureType: MonsterType;
  types: CharacterType[];
  #threatByCharacterId = new Map<string, number>();

  // ...

  getThreat(characterId: string): number { /* ... */ }
  addThreat(characterId: string, amount: number): void { /* ... */ }
  taunt(characterId: string): void { /* ... */ }
  primaryThreatTargetId(): string | undefined { /* ... */ }
  clearThreat(): void { /* ... */ }
}
```

`creatureType` is a tag (`BEAST`, `UNDEAD`, `DRAGON`, etc.) that gameplay systems can read to apply type-specific behavior — a Ranger's "Favored Enemy: Beasts" passive needs to know if its target is a `BEAST`, a Cleric's "Turn Undead" needs to filter by `UNDEAD`. `types` lets a single monster wear multiple functional hats — a `BOSS` who is also a `QUEST_GIVER`, for instance.

The most interesting addition is the threat table. Anyone who's played an MMO knows the mechanic: tanks generate threat to keep monsters glued to them, damage dealers manage their threat to avoid pulling, healers _definitely_ avoid threat because a heal generates a lot of it. The threat table here is a `Map<string, number>` keyed by character id (i.e. who the monster is angry at) and storing how much hate has been accumulated.

The `taunt` method is the one I had the most fun writing. Taunting forces a tank to the top of the threat list, but it shouldn't zero out the other players' threat — ongoing damage should still be tracked, and a tank who taunts but then stops dealing damage should eventually lose the monster's attention. The implementation walks the existing table, finds the highest value held by anyone _other than_ the tanking character, and bumps the tank's threat to that value plus a small margin (`TAUNT_TOP_MARGIN = 1`).

```ts
taunt(characterId: string): void {
  let maxOther = 0;
  for (const [id, value] of this.#threatByCharacterId) {
    if (id !== characterId && value > maxOther) {
      maxOther = value;
    }
  }
  const current = this.#threatByCharacterId.get(characterId) ?? 0;
  const next = Math.max(current, maxOther + TAUNT_TOP_MARGIN);
  this.#threatByCharacterId.set(characterId, next);
}
```

The `Math.max(current, ...)` is the safeguard: if the tank already has more threat than anyone else, taunt doesn't _lower_ their threat — that would be a bizarre regression. It only ever raises.

---

## A Side Quest: Letting Cursor Take a Swing

This is the part of the post I knew I'd write before I started writing it, because the experience surprised me.

At several points during this work, I opened Cursor's agent panel and asked it to take a pass at the stat composition logic. The prompts were specific — "implement the accuracy getter that folds base accuracy, the perception attribute modifier, and any active buff contributions, returning the rounded number." On the first attempt, Cursor produced something that compiled and was, on its face, plausible. The code looked like the code I would have written. It used `for...of` on the buff map. It pulled in `MOD_ACCURACY`. It returned a number.

But the more I read it, the more I realized I was being asked to verify, not to delegate. Was the modifier formula `(value - 10) * mod` or `value * mod`? Was the rounding correct? Did the buff iteration handle the empty case? Each of these is a thirty-second check, but there are fourteen computed getters in this class, and each one had its own little chain of decisions. The cost of validating Cursor's output across all of them was higher than the cost of just writing them myself.

Then there was a second, bigger problem: the functionality had become _scattered_. The Attribute class lives in one file, the Character class in another, the buff types in a third, the constructor argument shape in a fourth. Cursor would propose a change in `character.ts` that subtly required a change in `characterAttributeArgs.ts`, but the proposal wouldn't include the second change — or worse, would include a change that broke the contract elsewhere. I'd accept the diff and watch TypeScript light up in three other files I hadn't been looking at.

The honest reflection is this: AI tools today are best when the task is _local_ and the context is _self-contained_. "Write a function that does X" is a great prompt. "Modify a class that participates in a four-file inheritance hierarchy and is referenced by a dozen tests" is a prompt where the AI doesn't have the context, and giving it the context is itself most of the work.

I'm not anti-AI tools — they're already a huge part of my asset pipeline, as I wrote about in the introductory post. But for systems code with this much cross-file coupling, I found that I was happier reading the code I'd written, not the code I'd reviewed. Every line in `character.ts` today is a line I _decided on_, not a line I _accepted_, and that turns out to be a difference I can feel when I'm debugging at midnight.

There's a corollary that I want to be honest about, too: I will absolutely revisit this. As the codebase stabilizes and the patterns become more visible, the surface area where an AI tool can make accurate proposals will grow. The Character class _today_ is too tangled for the tools _today_. That ratio will change in both directions over time.

---

## What's Next

Now that the spine is in, the things hanging off it become tractable:

1. **Equipment bonuses across all stats** — `PlayerCharacter` currently only overrides `accuracy`. Every other stat needs the same equipment-fold treatment.
2. **Resource systems** — Mana for the Mage, Opportunity for the Scout, Focus for the Fighter. Each archetype has its own resource model, and that lives on the player character.
3. **The action resolution pipeline** — when a Mage casts Fireball, the engine needs to compute accuracy vs. reflex, scale damage by the modifier, apply the duration to the burn DoT — all of which now have a clear, single source of truth.
4. **Multiplayer sync** — the character state is exactly what needs to flow over the WebSocket. Designing the diff protocol on top of this state shape is the next networking problem.

I'll write more as each piece lands.

_Descend together._
