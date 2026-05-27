---
title: 'Building the Character Class'
date: 2026-05-11
description: >
  A technical walkthrough of the character class and its sub-classes PlayerCharacter and NonPlayerCharacter. I go through the way that I set up character atrributes and stats and why I chose to leverage Javascrpt's class structure over a more functional approach.
tags: ['Dungeon Delvers', 'TypeScript', 'Game Development', 'Architecture', 'Devlog']
---

## Delving Into the Heart of a Game Engine

![Gemini generated concept art of the coastal city of Westfall](/blog/building-the-character-class/Westfall_Concept_Gemini.png)

One of the first things that I wanted to work on in my game engine was fleshing out the system that is argueably one of the most important parts of any RPG and that of course is the character's code. One of the core goals of this project has not only been to create a minimum-viable product, but to also showcase a well thought out and cleanly architected codebase. I have been reading through [Hauberk](https://github.com/munificent/hauberk.git) as well as [Game Programming Patterns](https://gameprogrammingpatterns.com/) and I've been trying to create code that is easily read but that also allows for a lot of versatility.

I knew early on that I wanted to try to replicate some of the wonderful work that the team at Pillars of Eternity did with their Attribute and Stat system. I loved the concept of a "mighty mage" or a "perceptive fighter", and I loved how their stat system didn't seem to have a real case of "dump stats". It also helped that the wiki pages for Pillars of Eternity are an absolute treasure trove for how the character and combat system works. With that information in hand, I set out to work on the first major portion of the engine.

<figure>
  <img src="/blog/building-the-character-class/Attribute_Mapping.webp" />
  <figcaption>Figure 1: This image from the attributes <a href="https://pillarsofeternity.fandom.com/wiki/Attributes_">page</a> of the Pillars of Eternity Wiki was an absolute lifesaver when building out this code.</figcaption>
</figure>

## Attributes

Attributes are the main values that determine all other aspects of a character. _Might_ dictates how much damage or healing a character will inflict, _Perception_ will determine if an attack will land against an enemy or if a character will be able to dodge the result of a wall of fire being hurled in their vicinity. These atrributes shape how effective a character will be and also how a given character might play. There are six attributes that players will be able to tweak at player creation: _Constitution_, _Dexterity_, _Intellect_, _Might_, _Perception_, and _Resolve_. Each attribute is a small class itself:

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
```

If a character has 10 points of any attribute then that counts as a neutral value, any point above 10 is considered a positive value, any point below is considered a negative. Consider a chracter has 9 points of constitution, that would be cosidered one negative point of constitution, a value of 11 would be considered one positive point. Different races have different pre-defined values; Dwarves for example are more sturdy and robust giving them the highest constitution and resolve of all of the races, but their sturdy frames don't typically allow for as much grace and agility as say the more nimble and cunning Goblins. Non-player characters follow a more flexible creation process, not necessarily limiting specific monsters to specific attributes.

While the attribute class itself is small, it is constructed in such a way that all attributes share common logic. You can see this in the `calculateModifier` method where we utilize the attribute's `value`, apply a given modifier and then return the modified value. We will see this logic in action later when we discuss a character's stats.

Attributes are then accessible on the character class with the following `getter`:

```ts
get attributes() {
    const bonuses = this.#buffs.reduce(
      (acc, buff) => ({
        CON: acc.CON + (buff.attributes?.CON ?? 0),
        DEX: acc.DEX + (buff.attributes?.DEX ?? 0),
        INT: acc.INT + (buff.attributes?.INT ?? 0),
        MIG: acc.MIG + (buff.attributes?.MIG ?? 0),
        PER: acc.PER + (buff.attributes?.PER ?? 0),
        RES: acc.RES + (buff.attributes?.RES ?? 0),
      }),
      { CON: 0, DEX: 0, INT: 0, MIG: 0, PER: 0, RES: 0 },
    );
    return {
      CON: new Attribute(this.base.attributes.CON + bonuses.CON),
      DEX: new Attribute(this.base.attributes.DEX + bonuses.DEX),
      INT: new Attribute(this.base.attributes.INT + bonuses.INT),
      MIG: new Attribute(this.base.attributes.MIG + bonuses.MIG),
      PER: new Attribute(this.base.attributes.PER + bonuses.PER),
      RES: new Attribute(this.base.attributes.RES + bonuses.RES),
    };
  }
```

One thing that you might notice is that we have a concept of a character `base` as well `#buffs` each time an attribute is accessed we calculate the actual value of a character's attribute. I had considered breaking out the the buffs into a seperate property like we have done with the base values on the character which would then be updated when a buff was either applied or removed. On further consideration the computation to reduce buffs should be fairly minimal, and if the buff begin to conain more logic such as only increasing a player's might when their health is below 50%, then it might make more sense to calculate these values on the fly. If it ends up that this is a performance bottle neck then I might end up going for a caching strategy.

One other thing to call out are how I set up buffs on the character. Initially I was iterating over the Map of Buffs in each getter, but in an effort to make things more DRY, I updated the this.#buffs to be a custom Map which provides a reduce fuction just like we have available in Arrays, making the process of iterrating through all of the currently applied buffs much easier and consistent across the multiple getters. So buffs on the character class are actually a custom Map object with a reduce function declared on them. I am currently doing a simmilar reduce method on the `EquipmentMap` class, and one of the backlog items is to refacotr both custom maps to leverage a ReduceMap class, but here is what the current `BuffMap` looks like:

```ts
export class BuffMap extends Map<string, Buff> {
  reduce<T>(reducerFn: (accumulator: T, buff: Buff) => T, initialValue: T): T {
    let accumulator = initialValue;
    for (const buff of this.values()) {
      accumulator = reducerFn(accumulator, buff);
    }
    return accumulator;
  }
}
```

## Stat Calculation

With attributes out of the way, we can now calculate the stats that determine the outcome of actions. If we look back at the chart from before you might notice that all of the arrows to the stats lead away from a chracter's attributes. If you look at perception, the lines correlates with a chracters interrupt (+/-3) and accuracy (+/-1) as well as refex. If you also recalled we spoke about the `calculateModifier` method from the attribute class, the character's stats and defenses is where that logic comes into play. To see this in action let's take a look at the `acuracy` property of the chracter:

```ts
get accuracy() {
  return (
    this.base.accuracy +
    this.attributes.PER.calculateModifier(MOD_ACCURACY) +
    this.#buffs.reduce((acc, buff) => acc + (buff.accuracy ?? 0), 0)
  );
}
```

Again in this example you can see that when we try to access the stat `accuracy` we perform a very simmilar operation as we do with the `attributes`, the one caveat is that we are using the getter for a character's attribute to get the most up to date attribute value and we then leverage the `calculateModifier` to properly calculate the chracter's `accuracy` with the most up to date value of a chracter's attributes which in this case is perception. Again, following the logic of the `calculateModifier` method if a character's perception is 10, then there is no bonus to their accuracy. For each point of perception above 10, they recieve a point of accuracy, a value less than ten results in one less point of accuracy.

I mentioned the character's defence value of "reflex" is also calculated based on the character's perception attribute. Defenses work in a verry simmilar manner as stats with the exception that for all but one defense (deflection) are calculated based on two attrbutes:

```ts
get defenses(): Defenses {
    const bonuses = this.#buffs.reduce(
      (acc, buff) => ({
        DEF: acc.DEF + (buff.defenses?.DEF ?? 0),
        FOR: acc.FOR + (buff.defenses?.FOR ?? 0),
        REF: acc.REF + (buff.defenses?.REF ?? 0),
        WIL: acc.WIL + (buff.defenses?.WIL ?? 0),
      }),
      {
        DEF: 0,
        FOR: 0,
        REF: 0,
        WIL: 0,
      },
    );
    return {
      DEF:
        this.base.defenses.DEF +
        this.attributes.RES.calculateModifier(MOD_DEF) +
        bonuses.DEF,
      FOR:
        this.base.defenses.FOR +
        this.attributes.CON.calculateModifier(MOD_FOR) +
        this.attributes.MIG.calculateModifier(MOD_FOR) +
        bonuses.FOR,
      REF:
        this.base.defenses.REF +
        this.attributes.DEX.calculateModifier(MOD_REF) +
        this.attributes.PER.calculateModifier(MOD_REF) +
        bonuses.REF,
      WIL:
        this.base.defenses.WIL +
        this.attributes.INT.calculateModifier(MOD_WILL) +
        this.attributes.RES.calculateModifier(MOD_WILL) +
        bonuses.WIL,
    };
  }
```

The core idea remains the same however, all attributes and stats on a character can be buffed or debuffed,and when we got to access the value, we need to ensure that we fetch the accurate version of not only a given stat, but the attribute that modfies it as well.

## Character as an Abstract

I've had experience using JavaScript for quite some time in my professional career, but I haven't had the opportunity to really leverage classes in a lot of my day to day programming. I wanted to try to leverage classes in my game engine in hopes that it would help portability and readability, but in my first couple of itterations of the `charachter.ts` I felt like I was architecting the code in such a way that wasn't properly leveraging what classes really had to offer. I ended up having a bunch of properties on a singular character class that was only being used in some cases and not in others until I finally laded on the seperation of concerns for the game: players and non-player characters should have common core logic, but the way that they are created, and what additional methods they require are their own seperate domains.

Once I finally realized this the code sort of fell into place. I knew that I wanted to leverage the underlying calculation logic for both player and non-player characters like Pillars of Eternity does, but I wanted AI logic to to live on the `NonPlayerCharacter` class and the equipment system to live in the `PlayerChracter` class as well as the archetype and race logic that is specific to player characters. Making the character class `abstract` allowed me to easily share logic bewteen these two classes, while also allowing me to override the existing logic from the underliying abstract class. You can see this in action when looking at the `accuracy` getter from the `PlayerCharacter` class:

```ts
  override get accuracy(): number {
    return (
      super.accuracy +
      this.equipment.equipped.reduce(
        (acc, item) => acc + (item?.stats?.accuracy ?? 0),
        0,
      )
    );
  }
```

With our `super` call I am calling the abstract classes' `accuracy` getter and we then do an additional reduce on a player's eqquipment to see if there are additional values to add or subtract from a character's equipped items.

The abstract class also has the added benefit of not allowing for the following: `const hero = new Character({...args})` abstract classes _only_ allow for classes to extend from them, but does not allow for instantiation. This is perfect in our use case as we had again defined the clear seperation of players and non-player characters.

## Putting the pieces together

With all the attribute, stat, and defense calculations in place I was able to also get `damage` and `heal` methods set up on the base character and I was also able to set up attack resolutions for actions:

```ts
export const attackResolution = (
  performer: Character,
  target: Character,
  defenseKey: DefenceKeys
): AttackActionResult => {
  const attackRoll = random(1, 100);
  const result = attackRoll + (performer.accuracy - target.defenses[defenseKey]);
  if (result < 25) {
    return { outcome: 'MISS', type: 'FAILURE' };
  } else if (result < 50) {
    return { outcome: 'GLANCE', type: 'SUCCESS' };
  } else if (result < 100) {
    return { outcome: 'HIT', type: 'SUCCESS' };
  } else {
    return { outcome: 'CRIT', type: 'SUCCESS' };
  }
};
```

## What's next

I am now starting to dig into [behavior trees](https://web.archive.org/web/20140722051511/http://www.gamasutra.com/blogs/ChrisSimpson/20140717/221339/Behavior_trees_for_AI_How_they_work.php) and trying to get some solid AI set up for the non-player characters in the game. Once that is done, I'd like to get the engine integrated into the 3D rendering of the project. I have also briefly skimmed creating navigation meshes and some existing work done regarding non-player navigation.

Untill then!
