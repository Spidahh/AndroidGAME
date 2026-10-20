// Simulazione di M1 "La Corsa". TypeScript puro: nessuna dipendenza da Babylon.
// Spazio: corsie lungo Z (avanti), X laterale. 1 unità = 1 metro.

export const LANE_COUNT = 3;
export const LANE_W = 2.4;
export const laneX = (lane: number) => (lane - (LANE_COUNT - 1) / 2) * LANE_W;

export type WeaponId = 'pistol' | 'smg' | 'shotgun' | 'rifle';
export interface WeaponDef {
  id: WeaponId;
  name: string;
  rate: number; // colpi al secondo
  damage: number;
  lanes: number[]; // corsie colpite relative alla propria
  range: number;
  pierce: boolean;
  speed: number;
}
export const WEAPONS: Record<WeaponId, WeaponDef> = {
  pistol: { id: 'pistol', name: 'Pistola', rate: 4, damage: 10, lanes: [0], range: 32, pierce: false, speed: 42 },
  smg: { id: 'smg', name: 'Mitragliatrice', rate: 12, damage: 5, lanes: [0], range: 30, pierce: false, speed: 48 },
  shotgun: { id: 'shotgun', name: 'Fucile a pompa', rate: 1.6, damage: 16, lanes: [-1, 0, 1], range: 15, pierce: false, speed: 40 },
  rifle: { id: 'rifle', name: 'Precisione', rate: 1.2, damage: 45, lanes: [0], range: 60, pierce: true, speed: 80 },
};

export type ZombieKind = 'walker' | 'runner' | 'brute' | 'crawler';
export const ZOMBIES: Record<ZombieKind, { hp: number; speed: number; contact: number; radius: number }> = {
  walker: { hp: 30, speed: 1.3, contact: 18, radius: 0.45 },
  runner: { hp: 20, speed: 3.2, contact: 14, radius: 0.4 },
  brute: { hp: 220, speed: 0.9, contact: 40, radius: 0.8 },
  crawler: { hp: 15, speed: 0.8, contact: 10, radius: 0.35 },
};

export type ObjectKind = 'chest' | 'safe' | 'barrel' | 'barrier';
export const OBJECTS: Record<ObjectKind, { hp: number }> = {
  chest: { hp: 160 },
  safe: { hp: 520 },
  barrel: { hp: 20 },
  barrier: { hp: 90 },
};

export interface Zombie {
  id: number;
  kind: ZombieKind;
  lane: number;
  x: number;
  z: number;
  hp: number;
  maxHp: number;
  alive: boolean;
  deadAt: number;
  // cambio corsia annunciato (solo runner)
  switchAt: number;
  switchTo: number;
  hitAt: number;
}
export interface WorldObject {
  id: number;
  kind: ObjectKind;
  lane: number;
  z: number;
  hp: number;
  maxHp: number;
  alive: boolean;
  hitAt: number;
  reward?: WeaponId;
}
export interface Bullet {
  id: number;
  lane: number;
  x: number;
  z: number;
  zStart: number;
  weapon: WeaponId;
  pierced: Set<number>;
  alive: boolean;
}
export type SimEvent =
  | { type: 'shot'; weapon: WeaponId }
  | { type: 'hit'; target: 'zombie' | 'object'; id: number }
  | { type: 'zombieDied'; id: number }
  | { type: 'objectBroken'; id: number; kind: ObjectKind; reward?: WeaponId }
  | { type: 'explosion'; x: number; z: number }
  | { type: 'playerHurt'; amount: number }
  | { type: 'weapon'; weapon: WeaponId }
  | { type: 'gameOver' };

export interface SimOptions {
  targetZombies: number;
  seed: number;
  /** solo per prove di prestazioni: l'eroe non subisce danni */
  invulnerable?: boolean;
}

// RNG deterministico (mulberry32)
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class RunSim {
  time = 0;
  playerZ = 0;
  playerLane = 1;
  playerX = laneX(1);
  speed = 6;
  hp = 100;
  maxHp = 100;
  weapon: WeaponId = 'pistol';
  over = false;
  zombies: Zombie[] = [];
  objects: WorldObject[] = [];
  bullets: Bullet[] = [];
  events: SimEvent[] = [];
  kills = 0;
  private nextId = 1;
  private fireCooldown = 0;
  private spawnedToZ = 10;
  private rand: () => number;
  private weaponCycle: WeaponId[] = ['smg', 'shotgun', 'rifle'];
  private weaponIdx = 0;

  constructor(public opts: SimOptions) {
    this.rand = rng(opts.seed);
  }

  moveLane(dir: -1 | 1) {
    if (this.over) return;
    this.playerLane = Math.max(0, Math.min(LANE_COUNT - 1, this.playerLane + dir));
  }

  step(dt: number) {
    if (this.over) return;
    this.time += dt;
    this.speed = Math.min(9, 6 + this.time * 0.02);
    this.playerZ += this.speed * dt;
    // cambio corsia in ~0,15 s
    const tx = laneX(this.playerLane);
    const k = Math.min(1, dt / 0.05);
    this.playerX += (tx - this.playerX) * k;
    if (Math.abs(tx - this.playerX) < 0.01) this.playerX = tx;

    this.spawnAhead();
    this.fire(dt);
    this.updateBullets(dt);
    this.updateZombies(dt);
    this.collidePlayer();
    this.cleanup();
  }

  private currentLane() {
    // corsia effettiva in base alla posizione X (durante il cambio)
    return Math.round(this.playerX / LANE_W + (LANE_COUNT - 1) / 2);
  }

  private fire(dt: number) {
    const w = WEAPONS[this.weapon];
    this.fireCooldown -= dt;
    while (this.fireCooldown <= 0) {
      this.fireCooldown += 1 / w.rate;
      const lane = this.currentLane();
      for (const off of w.lanes) {
        const l = lane + off;
        if (l < 0 || l >= LANE_COUNT) continue;
        this.bullets.push({ id: this.nextId++, lane: l, x: laneX(l), z: this.playerZ + 0.8, zStart: this.playerZ + 0.8, weapon: w.id, pierced: new Set(), alive: true });
      }
      this.events.push({ type: 'shot', weapon: w.id });
    }
  }

  private updateBullets(dt: number) {
    for (const b of this.bullets) {
      if (!b.alive) continue;
      const w = WEAPONS[b.weapon];
      const z0 = b.z;
      b.z += w.speed * dt;
      if (b.z - b.zStart > w.range) {
        b.alive = false;
        continue;
      }
      // primo bersaglio colpito nel segmento [z0, b.z] della stessa corsia
      type Hit = { z: number; apply: () => void; id: number };
      const hits: Hit[] = [];
      for (const zb of this.zombies) {
        if (!zb.alive || zb.lane !== b.lane || b.pierced.has(zb.id)) continue;
        if (zb.z >= z0 - ZOMBIES[zb.kind].radius && zb.z <= b.z + ZOMBIES[zb.kind].radius)
          hits.push({ z: zb.z, id: zb.id, apply: () => this.damageZombie(zb, w.damage) });
      }
      for (const o of this.objects) {
        if (!o.alive || o.lane !== b.lane || b.pierced.has(o.id)) continue;
        if (o.z >= z0 - 0.6 && o.z <= b.z + 0.6) hits.push({ z: o.z, id: o.id, apply: () => this.damageObject(o, w.damage) });
      }
      hits.sort((a, c) => a.z - c.z);
      for (const h of hits) {
        h.apply();
        b.pierced.add(h.id);
        if (!w.pierce) {
          b.alive = false;
          break;
        }
      }
    }
  }

  private damageZombie(z: Zombie, dmg: number) {
    z.hp -= dmg;
    z.hitAt = this.time;
    this.events.push({ type: 'hit', target: 'zombie', id: z.id });
    if (z.hp <= 0 && z.alive) {
      z.alive = false;
      z.deadAt = this.time;
      this.kills++;
      this.events.push({ type: 'zombieDied', id: z.id });
    }
  }

  private damageObject(o: WorldObject, dmg: number) {
    o.hp -= dmg;
    o.hitAt = this.time;
    this.events.push({ type: 'hit', target: 'object', id: o.id });
    if (o.hp <= 0 && o.alive) {
      o.alive = false;
      this.events.push({ type: 'objectBroken', id: o.id, kind: o.kind, reward: o.reward });
      if (o.kind === 'barrel') this.explode(o.lane, o.z);
      if (o.reward) {
        this.weapon = o.reward;
        this.events.push({ type: 'weapon', weapon: o.reward });
      }
    }
  }

  private explode(lane: number, z: number) {
    this.events.push({ type: 'explosion', x: laneX(lane), z });
    for (const zb of this.zombies)
      if (zb.alive && Math.abs(zb.lane - lane) <= 1 && Math.abs(zb.z - z) < 3.2) this.damageZombie(zb, 90);
    for (const o of this.objects)
      if (o.alive && Math.abs(o.lane - lane) <= 1 && Math.abs(o.z - z) < 3.2 && o.kind !== 'barrel') this.damageObject(o, 120);
    // catena: altri barili vicini
    for (const o of this.objects)
      if (o.alive && o.kind === 'barrel' && Math.abs(o.lane - lane) <= 1 && Math.abs(o.z - z) < 3.2) this.damageObject(o, 999);
  }

  private updateZombies(dt: number) {
    for (const z of this.zombies) {
      if (!z.alive) continue;
      const d = ZOMBIES[z.kind];
      // vanno incontro al giocatore solo quando sono a portata visiva
      if (z.z - this.playerZ < 45) z.z -= d.speed * dt;
      if (z.kind === 'runner') {
        if (z.switchAt < 0 && z.z - this.playerZ < 22 && this.rand() < dt * 0.6) {
          const to = z.lane + (this.rand() < 0.5 ? -1 : 1);
          if (to >= 0 && to < LANE_COUNT) {
            z.switchTo = to;
            z.switchAt = this.time + 0.5; // segnale 0,5 s prima
          }
        }
        if (z.switchAt > 0 && this.time >= z.switchAt) {
          z.lane = z.switchTo;
          z.switchAt = -1;
        }
      }
      const tx = laneX(z.lane);
      z.x += (tx - z.x) * Math.min(1, dt * 8);
    }
  }

  private collidePlayer() {
    const lane = this.currentLane();
    for (const z of this.zombies) {
      if (!z.alive || z.lane !== lane) continue;
      if (Math.abs(z.z - this.playerZ) < 0.7 + ZOMBIES[z.kind].radius) {
        this.hurt(ZOMBIES[z.kind].contact);
        z.alive = false;
        z.deadAt = this.time;
        this.events.push({ type: 'zombieDied', id: z.id });
      }
    }
    for (const o of this.objects) {
      if (!o.alive || o.lane !== lane) continue;
      if (Math.abs(o.z - this.playerZ) < 0.9) {
        if (o.kind === 'barrel') {
          o.alive = false;
          this.events.push({ type: 'objectBroken', id: o.id, kind: o.kind });
          this.explode(o.lane, o.z);
          this.hurt(25);
        } else if (o.kind === 'barrier') {
          o.alive = false;
          this.events.push({ type: 'objectBroken', id: o.id, kind: o.kind });
          this.hurt(20);
        } else {
          o.alive = false; // cassa non aperta: persa
          this.events.push({ type: 'objectBroken', id: o.id, kind: o.kind });
        }
      }
    }
  }

  private hurt(amount: number) {
    if (this.opts.invulnerable) return;
    this.hp = Math.max(0, this.hp - amount);
    this.events.push({ type: 'playerHurt', amount });
    if (this.hp <= 0) {
      this.over = true;
      this.events.push({ type: 'gameOver' });
    }
  }

  private spawnAhead() {
    // Livello di prova: flusso continuo che mantiene ~targetZombies zombie davanti.
    const horizon = this.playerZ + 75;
    while (this.spawnedToZ < horizon) {
      const z = this.spawnedToZ;
      const alive = this.zombies.filter((q) => q.alive && q.z > this.playerZ).length;
      const deficit = this.opts.targetZombies - alive;
      const n = deficit > 0 ? Math.min(6, Math.ceil(deficit / 6)) : 0;
      for (let i = 0; i < n; i++) this.spawnZombie(z + this.rand() * 4);
      const r = this.rand();
      if (Math.floor(z) % 24 < 4 && r < 0.6) this.spawnObject('chest', z + 2);
      else if (r < 0.12) this.spawnObject('barrel', z + 1);
      else if (r < 0.18) this.spawnObject('barrier', z + 1);
      if (Math.floor(z) % 150 < 4 && this.rand() < 0.3) this.spawnObject('safe', z + 3);
      this.spawnedToZ += 4;
    }
  }

  private spawnZombie(z: number) {
    const r = this.rand();
    const kind: ZombieKind = r < 0.55 ? 'walker' : r < 0.8 ? 'runner' : r < 0.9 ? 'crawler' : 'brute';
    const lane = Math.floor(this.rand() * LANE_COUNT);
    const hp = ZOMBIES[kind].hp;
    this.zombies.push({ id: this.nextId++, kind, lane, x: laneX(lane), z, hp, maxHp: hp, alive: true, deadAt: 0, switchAt: -1, switchTo: lane, hitAt: -1 });
  }

  private spawnObject(kind: ObjectKind, z: number) {
    const lane = Math.floor(this.rand() * LANE_COUNT);
    if (this.objects.some((o) => o.alive && o.lane === lane && Math.abs(o.z - z) < 3)) return;
    const hp = OBJECTS[kind].hp;
    let reward: WeaponId | undefined;
    if (kind === 'chest' || kind === 'safe') {
      reward = this.weaponCycle[this.weaponIdx++ % this.weaponCycle.length];
    }
    this.objects.push({ id: this.nextId++, kind, lane, z, hp, maxHp: hp, alive: true, hitAt: -1, reward });
  }

  private cleanup() {
    const behind = this.playerZ - 6;
    this.zombies = this.zombies.filter((z) => (z.alive ? z.z > behind : this.time - z.deadAt < 1.5));
    this.objects = this.objects.filter((o) => o.alive && o.z > behind);
    this.bullets = this.bullets.filter((b) => b.alive);
  }

  drainEvents(): SimEvent[] {
    const e = this.events;
    this.events = [];
    return e;
  }
}
