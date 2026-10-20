// Resa di M1 con Babylon: legge lo stato di RunSim e lo disegna. Nessuna regola di gioco qui.
import {
  Scene, Engine, Color3, Color4, Vector3, FreeCamera, Camera, MeshBuilder, StandardMaterial, Mesh, InstancedMesh, TransformNode,
  ParticleSystem, Texture, AbstractMesh,
} from '@babylonjs/core';
import { Assets, Instance, play, fitHeight } from '../render/assets';
import { Crowd, CrowdItem } from '../render/crowd';
import { Environment } from '../render/env';
import { sparkTexture, smokeTexture, chunkTexture, crackTextures, powerIcon, makeBurst, burst, flatMaterial, laneDecal } from '../render/effects';
import { RunSim, WorldObject, LaneHazard, SimEvent } from './sim';
import { LANE_W, laneX, WeaponId, ZombieKind, PowerId, ObjectKind } from './defs';
import { audio } from '../audio';

const ZOMBIE_LOOK: Record<ZombieKind, { model: string; height: number; anims: string[]; tint?: Color3; moving: string }> = {
  walker: { model: 'zombie_chubby', height: 1.75, anims: ['Walk', 'Death'], moving: 'Walk' },
  runner: { model: 'zombie_chubby', height: 1.62, anims: ['Run', 'Death'], tint: new Color3(1.35, 0.8, 0.72), moving: 'Run' },
  brute: { model: 'zombie_arm', height: 2.7, anims: ['Walk', 'Death'], moving: 'Walk' },
  shield: { model: 'zombie_chubby', height: 1.8, anims: ['Walk', 'Death'], tint: new Color3(0.72, 0.82, 1.15), moving: 'Walk' },
  bloater: { model: 'zombie_basic', height: 1.85, anims: ['Walk', 'Death'], tint: new Color3(0.9, 1.25, 0.65), moving: 'Walk' },
  spitter: { model: 'zombie_chubby', height: 1.75, anims: ['Idle_Attack', 'Death'], tint: new Color3(1.25, 1.2, 0.5), moving: 'Idle_Attack' },
  crawler: { model: 'zombie_half', height: 0.9, anims: ['Crawl', 'Death'], moving: 'Crawl' },
  boss: { model: 'zombie_arm', height: 4.8, anims: ['Walk', 'Punch', 'Death'], tint: new Color3(1.35, 0.72, 0.68), moving: 'Walk' },
  thief: { model: 'zombie_chubby', height: 1.7, anims: ['Run', 'Death'], tint: new Color3(0.95, 0.95, 0.95), moving: 'Run' },
};

const GUN: Record<WeaponId, { model: string | null; length: number }> = {
  pistol: { model: null, length: 0 },
  smg: { model: 'gun_smg', length: 0.5 },
  shotgun: { model: 'gun_shotgun', length: 0.75 },
  rifle: { model: 'gun_rifle', length: 0.9 },
  flame: { model: 'gun_flame', length: 0.7 },
  grenade: { model: 'gun_grenade', length: 0.7 },
};

const TRACER: Record<WeaponId, { color: Color3; len: number; w: number }> = {
  pistol: { color: new Color3(1, 0.88, 0.45), len: 0.9, w: 0.09 },
  smg: { color: new Color3(1, 0.75, 0.3), len: 0.7, w: 0.07 },
  shotgun: { color: new Color3(1, 0.6, 0.25), len: 0.5, w: 0.12 },
  rifle: { color: new Color3(0.55, 0.92, 1), len: 2.6, w: 0.08 },
  flame: { color: new Color3(1, 0.5, 0.1), len: 0.6, w: 0.35 },
  grenade: { color: new Color3(0.4, 0.45, 0.3), len: 0.35, w: 0.3 },
};

const OBJECT_MODEL: Record<ObjectKind, { model: string; height: number; widthScale?: number }> = {
  chest: { model: 'chest', height: 1.05 },
  cage: { model: 'metal_fence', height: 1.6 },
  power: { model: 'crate', height: 1.0 },
  loot: { model: 'boxes2', height: 0.9 },
  safe: { model: 'chest_special', height: 1.45 },
  barrel: { model: 'barrel_red', height: 1.25 },
  barrier: { model: 'barrier_traffic', height: 1.1, widthScale: 1.5 },
  car: { model: 'broken_car', height: 1.5 },
  fence: { model: 'metal_fence', height: 1.7 },
  medicine: { model: 'pallet_toon', height: 0.35 },
  gate: { model: 'brick_wall', height: 2.8 },
};

function objKey(o: Partial<WorldObject>) {
  return `${o.kind}:${o.weapon ?? o.power ?? o.size ?? ''}`;
}

export const PRELOAD = [
  'hero_lis', 'hero_sam', 'hero_shaun', 'zombie_basic', 'zombie_chubby', 'zombie_arm', 'zombie_half',
  'gun_smg', 'gun_shotgun', 'gun_rifle', 'gun_flame', 'gun_grenade', 'gun_pistol',
  'street', 'street_crack1', 'street_crack2', 'crosswalk', 'chest', 'chest_special', 'crate', 'boxes', 'boxes2', 'container_small',
  'barrel_red', 'barrier_traffic', 'broken_car', 'metal_fence', 'pallet_toon', 'health', 'brick_wall', 'sack_trench', 'tank', 'barrier_single',
  'streetlight', 'dumpster', 'tree', 'tree2', 'trash_bags', 'container_red', 'container_green', 'hydrant', 'tires', 'pallet', 'couch', 'gas_tank',
];

interface OView {
  key: string;
  root: TransformNode;
  kind: ObjectKind;
  bar?: { bg: Mesh; fill: Mesh; w: number };
  crack?: Mesh;
  extra?: TransformNode;
  survivor?: Instance;
  spark?: Mesh;
  sides?: TransformNode[];
}

export class RunView {
  scene: Scene;
  camera: FreeCamera;
  private assets: Assets;
  private env: Environment;
  private hero!: Instance;
  private heroPistol?: AbstractMesh;
  private gunAnchor?: TransformNode;
  private gun?: TransformNode;
  private gunId: WeaponId = 'pistol';
  private companions = new Map<number, Instance>();
  private companionPool: Instance[] = [];
  private crowds = {} as Record<ZombieKind, Crowd>;
  private crowdItems = {} as Record<ZombieKind, CrowdItem[]>;
  private deathAt = new Map<number, number>();
  private zombieWarn = new Map<number, Mesh>();
  private shieldProps: InstancedMesh[] = [];
  private shieldBase?: Mesh;
  private thiefLoad?: TransformNode;
  private thiefLoading = false;
  private objViews = new Map<number, OView>();
  private objPool = new Map<string, OView[]>();
  private warnPool: Mesh[] = [];
  private pendingObj = new Set<number>();
  private hazardViews = new Map<number, Mesh>();
  private tracerBases = {} as Record<WeaponId, Mesh>;
  private tracers = {} as Record<WeaponId, InstancedMesh[]>;
  private escort?: TransformNode;
  private escortLoading = false;
  private shake = 0;
  private fovKick = 0;
  private camX = 0;
  private ps!: Record<'spark' | 'muzzle' | 'boom' | 'smoke' | 'chunks' | 'gold' | 'goo' | 'flame', ParticleSystem>;
  private cracks: Texture[] = [];
  private crackMats: StandardMaterial[] = [];
  private icons = {} as Record<PowerId, Texture>;
  private iconMats = {} as Record<PowerId, StandardMaterial>;
  private mats!: Record<'warn' | 'barBg' | 'barFill' | 'barGold' | 'acidWarn' | 'acid' | 'slam' | 'shadow' | 'elec', StandardMaterial>;
  private lastShotSound = 0;
  private bossRoar = false;

  constructor(engine: Engine, private zone: string) {
    this.scene = new Scene(engine);
    this.scene.skipPointerMovePicking = true;
    this.assets = new Assets(this.scene);
    this.env = new Environment(this.scene, this.assets);
    this.camera = new FreeCamera('cam', new Vector3(0, 9, -8), this.scene);
    this.camera.fovMode = Camera.FOVMODE_HORIZONTAL_FIXED;
    this.camera.fov = 1.08;
    this.camera.minZ = 0.5;
    this.camera.maxZ = 140;
  }

  async load(onProgress?: (d: number, t: number) => void) {
    await this.assets.preload(PRELOAD, onProgress);
    await this.env.build(this.zone);
    this.makeMaterials();
    this.makeParticles();
    this.makeTracers();
    this.cracks = crackTextures(this.scene);
    this.crackMats = this.cracks.map((t, i) => {
      const cm = new StandardMaterial(`crack${i}`, this.scene);
      cm.diffuseTexture = t;
      cm.useAlphaFromDiffuseTexture = true;
      cm.disableLighting = true;
      cm.emissiveColor = new Color3(1, 1, 1);
      return cm;
    });
    for (const p of ['rapid', 'damage', 'shield', 'pierce'] as PowerId[]) {
      this.icons[p] = powerIcon(this.scene, p);
      const im = new StandardMaterial(`icon-${p}`, this.scene);
      im.diffuseTexture = this.icons[p];
      im.useAlphaFromDiffuseTexture = true;
      im.emissiveColor = Color3.White();
      im.disableLighting = true;
      this.iconMats[p] = im;
    }

    // eroe: Lince
    this.hero = await this.assets.instance('hero_lis');
    fitHeight(this.hero, 1.75);
    this.heroPistol = this.hero.meshes.find((m) => /pistol/i.test(m.name));
    this.gunAnchor = this.heroPistol?.parent as TransformNode | undefined;
    play(this.hero, 'Run_Gun');

    for (let i = 0; i < 2; i++) {
      const c = await this.assets.instance(i === 0 ? 'hero_sam' : 'hero_shaun');
      fitHeight(c, 1.7);
      c.meshes.filter((m) => /knife|pistol|bat|axe|spear|guitar/i.test(m.name)).forEach((m) => m.setEnabled(false));
      c.root.setEnabled(false);
      this.companionPool.push(c);
    }

    await Promise.all(
      (Object.keys(ZOMBIE_LOOK) as ZombieKind[]).map(async (k) => {
        const z = ZOMBIE_LOOK[k];
        const c = new Crowd(this.scene, this.assets, z.model, z.height, z.anims, z.tint);
        await c.init();
        this.crowds[k] = c;
        this.crowdItems[k] = [];
      }),
    );

    // scudo degli Scudati: geometria unica, istanziata
    const sh = await this.assets.instance('barrier_single');
    fitHeight(sh, 1.15);
    const shMesh = sh.meshes.find((m) => m.getTotalVertices() > 0) as Mesh | undefined;
    if (shMesh) {
      shMesh.computeWorldMatrix(true);
      const baked = shMesh.clone('shieldBase', null)!;
      baked.makeGeometryUnique();
      baked.bakeTransformIntoVertices(shMesh.getWorldMatrix());
      baked.parent = null;
      baked.position.setAll(0);
      baked.rotationQuaternion = null;
      baked.rotation.setAll(0);
      baked.scaling.setAll(1);
      baked.setEnabled(false);
      this.shieldBase = baked;
    }
    sh.root.dispose();
    await this.prewarm();
  }

  /** Crea una volta ogni tipo di oggetto e arma e disegna un frame: i materiali si preparano ora, non in partita. */
  private async prewarm() {
    const kinds: Partial<WorldObject>[] = [
      { kind: 'chest', weapon: 'smg' }, { kind: 'chest', weapon: 'shotgun' }, { kind: 'chest', weapon: 'rifle' }, { kind: 'chest', weapon: 'flame' }, { kind: 'chest', weapon: 'grenade' },
      { kind: 'cage' }, { kind: 'power', power: 'rapid' }, { kind: 'loot', size: 'S' }, { kind: 'loot', size: 'M' }, { kind: 'loot', size: 'L' }, { kind: 'safe' },
      { kind: 'barrel' }, { kind: 'barrier' }, { kind: 'car' }, { kind: 'fence', period: 2, phase: 0 }, { kind: 'medicine' }, { kind: 'gate' },
    ];
    const views: OView[] = [];
    for (const k of kinds) for (let i = 0; i < (k.kind === 'gate' || k.kind === 'medicine' ? 1 : 2); i++) views.push(await this.makeObject({ id: i, lane: 1, x: 0, z: 30, hp: 1, maxHp: 1, alive: true, hitAt: -1, switchAt: -1, switchTo: 1, period: 2, phase: 0, touched: false, ...k } as WorldObject));
    for (const v of views) {
      v.root.position.set(0, 0, this.camera.position.z + 15);
      if (v.crack) v.crack.isVisible = true;
    }
    for (const id of ['smg', 'shotgun', 'rifle', 'flame', 'grenade'] as WeaponId[]) {
      const g = GUN[id].model;
      if (g) (await this.assets.instance(g)).root.dispose();
    }
    const hz = [this.makeHazard({ id: 0, kind: 'acid', lane: 1, z: 20, len: 3, activeAt: 0, until: 1, hitPlayer: false }), this.makeHazard({ id: 0, kind: 'slam', lane: 1, z: 20, len: 6, activeAt: 0, until: 1, hitPlayer: false }), this.makeHazard({ id: 0, kind: 'shadow', lane: 1, z: 20, len: 1, activeAt: 0, until: 1, hitPlayer: false })];
    hz[0].material = this.mats.acid;
    await this.scene.whenReadyAsync();
    this.scene.render();
    views.forEach((v) => this.releaseView(v));
    hz.forEach((m) => m.dispose());
    for (let i = 0; i < 8; i++) {
      const w = MeshBuilder.CreateDisc('warn', { radius: 0.6, tessellation: 3 }, this.scene);
      w.material = this.mats.warn;
      w.isPickable = false;
      w.setEnabled(false);
      this.warnPool.push(w);
    }
  }

  private makeMaterials() {
    const s = this.scene;
    this.mats = {
      warn: flatMaterial(s, 'warn', new Color3(1, 0.45, 0.12), 0.9),
      barBg: flatMaterial(s, 'barbg', new Color3(0.07, 0.07, 0.08)),
      barFill: flatMaterial(s, 'barfill', new Color3(1, 0.82, 0.28)),
      barGold: flatMaterial(s, 'bargold', new Color3(1, 0.62, 0.15)),
      acidWarn: flatMaterial(s, 'acidwarn', new Color3(0.55, 1, 0.2), 0.35),
      acid: flatMaterial(s, 'acid', new Color3(0.4, 0.95, 0.15), 0.75),
      slam: flatMaterial(s, 'slam', new Color3(1, 0.15, 0.1), 0.45),
      shadow: flatMaterial(s, 'shadow', new Color3(0, 0, 0), 0.45),
      elec: flatMaterial(s, 'elec', new Color3(0.45, 0.8, 1), 0.85),
    };
  }

  private makeParticles() {
    const s = this.scene;
    const spark = sparkTexture(s);
    const smoke = smokeTexture(s);
    const chunk = chunkTexture(s);
    this.ps = {
      spark: makeBurst(s, 'spark', spark, { capacity: 500, size: [0.1, 0.28], life: [0.08, 0.22], power: [2, 6] }),
      muzzle: makeBurst(s, 'muzzle', spark, { capacity: 200, size: [0.25, 0.5], life: [0.03, 0.07], power: [0.2, 0.8] }),
      boom: makeBurst(s, 'boom', spark, { capacity: 700, size: [0.6, 1.9], life: [0.25, 0.7], power: [4, 11], gravity: -6, c1: new Color4(1, 0.82, 0.3, 1), c2: new Color4(1, 0.35, 0.08, 1), dead: new Color4(0.2, 0.2, 0.2, 0) }),
      smoke: makeBurst(s, 'smoke', smoke, { capacity: 300, size: [1, 2.6], life: [0.6, 1.4], power: [0.5, 2], gravity: 1.2, c1: new Color4(0.35, 0.33, 0.3, 0.6), c2: new Color4(0.2, 0.2, 0.2, 0.5), dead: new Color4(0.2, 0.2, 0.2, 0), additive: false }),
      chunks: makeBurst(s, 'chunks', chunk, { capacity: 400, size: [0.1, 0.28], life: [0.5, 0.9], power: [3, 7], gravity: -14, c1: new Color4(0.62, 0.42, 0.24, 1), c2: new Color4(0.45, 0.3, 0.18, 1), dead: new Color4(0.4, 0.3, 0.2, 1), additive: false }),
      gold: makeBurst(s, 'gold', spark, { capacity: 300, size: [0.12, 0.3], life: [0.4, 0.9], power: [3, 7], gravity: -9, c1: new Color4(1, 0.9, 0.35, 1), c2: new Color4(1, 0.75, 0.2, 1) }),
      goo: makeBurst(s, 'goo', chunk, { capacity: 400, size: [0.1, 0.26], life: [0.3, 0.6], power: [2, 5], gravity: -12, c1: new Color4(0.45, 0.85, 0.25, 1), c2: new Color4(0.3, 0.6, 0.15, 1), dead: new Color4(0.3, 0.5, 0.1, 0), additive: false }),
      flame: makeBurst(s, 'flame', spark, { capacity: 600, size: [0.3, 0.8], life: [0.15, 0.32], power: [14, 20], c1: new Color4(1, 0.7, 0.2, 1), c2: new Color4(1, 0.3, 0.05, 1), dead: new Color4(0.3, 0.1, 0.05, 0), dir1: new Vector3(-0.08, 0.05, 1), dir2: new Vector3(0.08, 0.2, 1) }),
    };
  }

  private makeTracers() {
    for (const w of Object.keys(TRACER) as WeaponId[]) {
      const t = TRACER[w];
      const m = MeshBuilder.CreateBox(`tr-${w}`, { width: t.w, height: t.w, depth: t.len }, this.scene);
      m.material = flatMaterial(this.scene, `trm-${w}`, t.color);
      m.isPickable = false;
      m.setEnabled(false);
      this.tracerBases[w] = m;
      this.tracers[w] = [];
    }
  }

  // ---------- arma in mano ----------
  private async setGun(id: WeaponId) {
    if (this.gunId === id) return;
    this.gunId = id;
    this.gun?.dispose();
    this.gun = undefined;
    const g = GUN[id];
    this.heroPistol?.setEnabled(!g.model);
    if (!g.model || !this.heroPistol || !this.gunAnchor) return;
    const inst = await this.assets.instance(g.model);
    if (this.gunId !== id) {
      inst.root.dispose();
      return;
    }
    // stessa posizione e rotazione della pistola originale, lunghezza voluta nel mondo
    inst.root.computeWorldMatrix(true);
    const { min, max } = inst.root.getHierarchyBoundingVectors(true);
    const rawLen = Math.max(max.x - min.x, max.z - min.z, max.y - min.y) || 1;
    this.gunAnchor.computeWorldMatrix(true);
    const anchorScale = this.gunAnchor.absoluteScaling.x || 1;
    inst.root.parent = this.gunAnchor;
    inst.root.position.copyFrom(this.heroPistol.position);
    inst.root.rotationQuaternion = this.heroPistol.rotationQuaternion?.clone() ?? null;
    inst.root.scaling.setAll(g.length / rawLen / anchorScale);
    this.gun = inst.root;
  }

  // ---------- per frame ----------
  sync(sim: RunSim, dt: number, events: SimEvent[]) {
    const pz = sim.playerZ;
    this.env.update(pz);
    this.hero.root.position.set(sim.playerX, 0, pz);
    const lean = (laneX(sim.playerLane) - sim.playerX) * 0.12;
    this.hero.root.rotation.set(0, lean, -lean * 0.6);
    this.hero.root.setEnabled(sim.dashLeft <= 0 || Math.floor(sim.time * 20) % 2 === 0);
    void this.setGun(sim.weapon);
    const dead = sim.status === 'lost';
    play(this.hero, dead ? 'Death' : sim.speed < 0.5 ? 'Idle_Gun' : 'Run_Gun', !dead);

    this.shake = Math.max(0, this.shake - dt * 1.6);
    this.fovKick = Math.max(0, this.fovKick - dt * 2);
    this.camX += (sim.playerX * 0.4 - this.camX) * Math.min(1, dt * 6);
    const boss = sim.boss?.alive ? 1 : 0;
    const sx = (Math.random() - 0.5) * this.shake;
    const sy = (Math.random() - 0.5) * this.shake;
    this.camera.position.set(this.camX + sx, 8.6 + boss * 1.4 + sy, pz - 7.4 - boss * 1.5);
    this.camera.setTarget(new Vector3(this.camX * 0.6, 0, pz + 9 + boss * 2));
    this.camera.fov = 1.08 + this.fovKick * 0.12;

    this.syncCompanions(sim);
    this.syncZombies(sim, dt);
    this.syncObjects(sim);
    this.syncHazards(sim);
    this.syncBullets(sim);
    this.syncEscort(sim);
    if (sim.weapon === 'flame' && !sim.over) {
      burst(this.ps.flame, new Vector3(sim.playerX + 0.25, 1.05, pz + 0.9), 3);
      for (const c of sim.companions) if (c.alive && Math.random() < 0.5) burst(this.ps.flame, new Vector3(c.x, 1, pz + 0.7), 1);
    }
    for (const e of events) this.onEvent(e, sim);
  }

  private onEvent(e: SimEvent, sim: RunSim) {
    switch (e.type) {
      case 'shot': {
        if (e.weapon !== 'flame') burst(this.ps.muzzle, new Vector3(e.companion ? laneX(e.lane) : sim.playerX + 0.25, 1.1, sim.playerZ + 0.9), 2);
        const now = performance.now();
        if (!e.companion || now - this.lastShotSound > 60) {
          this.lastShotSound = now;
          audio.shot(e.weapon, e.companion);
        }
        break;
      }
      case 'hit':
        if (e.target === 'zombie') {
          burst(e.armored ? this.ps.spark : this.ps.goo, new Vector3(e.x, 1.1, e.z - 0.3), e.armored ? 5 : 3);
          if (Math.random() < 0.35) audio.play(e.armored ? 'metal_hit1' : (['flesh1', 'flesh2', 'flesh3'] as const)[Math.floor(Math.random() * 3)], e.armored ? 0.35 : 0.4);
        } else {
          const v = this.objViews.get(e.id);
          const metal = v && (v.kind === 'safe' || v.kind === 'gate' || v.kind === 'cage');
          burst(this.ps.chunks, new Vector3(e.x, 0.8, e.z - 0.5), 2);
          if (Math.random() < 0.5) audio.play(metal ? (Math.random() < 0.5 ? 'metal_hit1' : 'metal_hit2') : Math.random() < 0.5 ? 'crate_hit1' : 'crate_hit2', 0.45);
        }
        break;
      case 'zombieDied':
        burst(this.ps.goo, new Vector3(e.x, 1, e.z), 14);
        if (Math.random() < 0.5) audio.play('zombie_die', 0.35);
        if (e.kind === 'boss') {
          burst(this.ps.boom, new Vector3(e.x, 2, e.z), 120);
          this.shake = 0.6;
        }
        break;
      case 'objectBroken':
        if (e.opened) {
          const isMetal = e.kind === 'safe' || e.kind === 'gate' || e.kind === 'cage';
          burst(this.ps.chunks, new Vector3(e.x, 0.8, e.z), e.kind === 'gate' ? 90 : 26);
          burst(this.ps.smoke, new Vector3(e.x, 0.6, e.z), e.kind === 'gate' ? 30 : 6);
          audio.play(isMetal ? 'metal_break' : 'crate_break', 0.7);
          if (e.kind === 'safe' || e.kind === 'loot') burst(this.ps.gold, new Vector3(e.x, 1, e.z), e.kind === 'safe' ? 80 : 30);
        }
        break;
      case 'explosion':
        burst(this.ps.boom, new Vector3(e.x, 0.9, e.z), Math.round(70 * e.size));
        burst(this.ps.smoke, new Vector3(e.x, 0.8, e.z), Math.round(14 * e.size));
        this.shake = Math.min(0.45, this.shake + 0.22 * e.size);
        audio.play(Math.random() < 0.5 ? 'boom1' : 'boom2', 0.8);
        audio.vibrate(30);
        break;
      case 'playerHurt':
        this.shake = Math.min(0.45, this.shake + 0.22);
        audio.play('hurt', 0.8);
        audio.vibrate(60);
        break;
      case 'shieldBlock':
        burst(this.ps.spark, new Vector3(sim.playerX, 1.2, sim.playerZ + 0.5), 25);
        audio.play('metal_hit2', 0.8);
        break;
      case 'weapon':
        audio.play('pickup', 0.9);
        burst(this.ps.gold, new Vector3(sim.playerX, 1.4, sim.playerZ), 24);
        break;
      case 'power':
        audio.play('power', 0.8);
        break;
      case 'loot':
        audio.play('loot', e.size === 'safe' ? 0.9 : 0.6);
        break;
      case 'companionJoined':
        audio.play('companion', 0.9);
        break;
      case 'companionLost':
        audio.play('hurt', 0.6);
        break;
      case 'warn':
        audio.play(e.kind === 'acid' ? 'acid' : 'warn', 0.5);
        break;
      case 'slam':
        burst(this.ps.smoke, new Vector3(laneX(e.lane), 0.4, e.z), 25);
        this.shake = 0.5;
        audio.play('boom_big', 0.8);
        audio.vibrate(80);
        break;
      case 'dash':
        this.fovKick = 1;
        audio.play('power', 0.6, 0.2);
        break;
      case 'boss':
        if (!this.bossRoar) {
          this.bossRoar = true;
          audio.play('boom_big', 1);
          this.shake = 0.5;
        }
        break;
      default:
        break;
    }
  }

  private syncCompanions(sim: RunSim) {
    for (const c of sim.companions) {
      let inst = this.companions.get(c.id);
      if (!inst && c.alive) {
        inst = this.companionPool[c.model];
        if (inst && ![...this.companions.values()].includes(inst)) {
          this.companions.set(c.id, inst);
          inst.root.setEnabled(true);
          play(inst, 'Run_Gun');
        } else inst = undefined;
      }
      if (!inst) continue;
      if (c.alive) inst.root.position.set(c.x, 0, sim.playerZ - 0.6);
      else play(inst, 'Death', false);
    }
    for (const [id, inst] of this.companions) {
      const c = sim.companions.find((q) => q.id === id);
      if (!c || (!c.alive && inst.root.position.z < sim.playerZ - 6)) {
        inst.root.setEnabled(false);
        this.companions.delete(id);
      }
    }
  }

  private syncZombies(sim: RunSim, dt: number) {
    for (const k of Object.keys(this.crowdItems) as ZombieKind[]) this.crowdItems[k].length = 0;
    const live = new Set<number>();
    let shields = 0;
    for (const z of sim.zombies) {
      live.add(z.id);
      const look = ZOMBIE_LOOK[z.kind];
      const crowd = this.crowds[z.kind];
      let clip = look.moving;
      let loop = true;
      let startedAt = z.id * 0.37;
      if (!z.alive) {
        if (!this.deathAt.has(z.id)) this.deathAt.set(z.id, crowd.time);
        clip = 'Death';
        loop = false;
        startedAt = this.deathAt.get(z.id)!;
      }
      const bump = z.alive && sim.time - z.hitAt < 0.07 ? 1.06 : 1;
      const y = z.dropFrom ? Math.max(0, (z.dropFrom - sim.time) * 14) : 0;
      this.crowdItems[z.kind].push({ x: z.x, y, z: z.z, yaw: 0, clip, loop, startedAt, scale: bump });
      if (z.kind === 'shield' && z.alive && this.shieldBase) {
        let p = this.shieldProps[shields];
        if (!p) {
          p = this.shieldBase.createInstance(`sh${shields}`);
          p.isPickable = false;
          this.shieldProps.push(p);
        }
        p.setEnabled(true);
        p.position.set(z.x, 0, z.z - 0.55);
        p.rotation.y = Math.PI;
        shields++;
      }
      const warning = z.alive && z.switchAt > 0 && z.switchAt > sim.time;
      let w = this.zombieWarn.get(z.id);
      if (warning && !w) {
        w = this.warnPool.pop() ?? MeshBuilder.CreateDisc('warn', { radius: 0.6, tessellation: 3 }, this.scene);
        w.material = this.mats.warn;
        w.isPickable = false;
        w.setEnabled(true);
        this.zombieWarn.set(z.id, w);
      }
      if (w) {
        if (!warning) {
          w.setEnabled(false);
          this.warnPool.push(w);
          this.zombieWarn.delete(z.id);
        } else {
          w.position.set(laneX(z.switchTo), 0.07, z.z);
          w.rotation.set(Math.PI / 2, 0, z.switchTo > z.lane ? -Math.PI / 2 : Math.PI / 2);
          w.scaling.setAll(0.85 + Math.sin(sim.time * 25) * 0.15);
        }
      }
    }
    for (let i = shields; i < this.shieldProps.length; i++) this.shieldProps[i].setEnabled(false);
    if (sim.thief) {
      if (!this.thiefLoad && !this.thiefLoading) {
        this.thiefLoading = true;
        void this.assets.instance('boxes').then((b) => {
          fitHeight(b, 0.7);
          this.thiefLoad = b.root;
        });
      } else if (this.thiefLoad) {
        this.thiefLoad.setEnabled(sim.thief.alive);
        this.thiefLoad.position.set(sim.thief.x, 1.75, sim.thief.z);
      }
    }
    for (const k of Object.keys(this.crowds) as ZombieKind[]) this.crowds[k].update(this.crowdItems[k], dt);
    for (const id of this.deathAt.keys()) if (!live.has(id)) this.deathAt.delete(id);
    for (const [id, w] of this.zombieWarn)
      if (!live.has(id)) {
        w.setEnabled(false);
        this.warnPool.push(w);
        this.zombieWarn.delete(id);
      }
  }

  private async makeObject(o: WorldObject): Promise<OView> {
    const def = OBJECT_MODEL[o.kind];
    let model = def.model;
    let h = def.height;
    if (o.kind === 'loot') {
      model = o.size === 'S' ? 'boxes2' : o.size === 'M' ? 'boxes' : 'container_small';
      h = o.size === 'S' ? 0.8 : o.size === 'M' ? 1.1 : 1.7;
    }
    const inst = await this.assets.instance(model);
    fitHeight(inst, h);
    if (o.kind === 'car') inst.root.rotation.y = Math.PI / 2;
    if (o.kind === 'fence' || o.kind === 'cage' || o.kind === 'car' || (o.kind === 'loot' && o.size === 'L')) {
      inst.root.computeWorldMatrix(true);
      const { min, max } = inst.root.getHierarchyBoundingVectors(true);
      const w = max.x - min.x;
      if (w > LANE_W * 0.95) inst.root.scaling.scaleInPlace((LANE_W * 0.95) / w);
    }
    if (def.widthScale) inst.root.scaling.x *= def.widthScale;
    if (o.kind === 'gate') {
      inst.root.computeWorldMatrix(true);
      const { min, max } = inst.root.getHierarchyBoundingVectors(true);
      inst.root.scaling.x *= (LANE_W * 3.4) / Math.max(0.01, max.x - min.x);
    }
    const v: OView = { key: objKey(o), root: inst.root, kind: o.kind };
    inst.root.metadata = { sx: inst.root.scaling.x, sy: inst.root.scaling.y, sz: inst.root.scaling.z };

    if (o.kind !== 'barrel' && o.kind !== 'car' && o.kind !== 'fence') {
      const w = o.kind === 'gate' ? 5 : o.kind === 'safe' ? 1.9 : 1.5;
      const bg = MeshBuilder.CreatePlane('bbg', { width: w + 0.12, height: 0.24 }, this.scene);
      bg.material = this.mats.barBg;
      bg.billboardMode = Mesh.BILLBOARDMODE_ALL;
      const fill = MeshBuilder.CreatePlane('bfill', { width: w, height: 0.15 }, this.scene);
      fill.material = o.kind === 'safe' || o.kind === 'medicine' ? this.mats.barGold : this.mats.barFill;
      fill.parent = bg;
      fill.position.z = -0.01;
      bg.isPickable = fill.isPickable = false;
      v.bar = { bg, fill, w };
    }
    if (o.kind === 'chest' || o.kind === 'safe' || o.kind === 'power' || o.kind === 'loot' || o.kind === 'gate' || o.kind === 'medicine') {
      const size = o.kind === 'gate' ? 4 : 1.2;
      const crack = MeshBuilder.CreatePlane('crack', { size }, this.scene);
      crack.material = this.crackMats[0];
      crack.isVisible = false;
      crack.isPickable = false;
      v.crack = crack;
    }
    if (o.kind === 'chest' && o.weapon) {
      const g = await this.assets.instance(GUN[o.weapon].model ?? 'gun_pistol');
      g.root.computeWorldMatrix(true);
      const { min, max } = g.root.getHierarchyBoundingVectors(true);
      const len = Math.max(max.x - min.x, max.z - min.z, max.y - min.y);
      g.root.scaling.scaleInPlace(0.95 / Math.max(0.001, len));
      v.extra = g.root;
    } else if (o.kind === 'power' && o.power) {
      const icon = MeshBuilder.CreatePlane('icon', { size: 0.95 }, this.scene);
      icon.material = this.iconMats[o.power];
      icon.billboardMode = Mesh.BILLBOARDMODE_ALL;
      icon.isPickable = false;
      v.extra = icon;
    } else if (o.kind === 'cage') {
      const sv = await this.assets.instance(o.id % 2 ? 'hero_sam' : 'hero_shaun');
      fitHeight(sv, 1.5);
      sv.meshes.filter((m) => /knife|pistol|bat|axe|spear|guitar/i.test(m.name)).forEach((m) => m.setEnabled(false));
      sv.root.rotation.y = Math.PI;
      play(sv, 'Wave');
      v.survivor = sv;
    } else if (o.kind === 'medicine') {
      const hlt = await this.assets.instance('health');
      fitHeight(hlt, 1.1);
      v.extra = hlt.root;
    } else if (o.kind === 'fence') {
      const spark = MeshBuilder.CreatePlane('elec', { width: LANE_W * 0.9, height: 1.4 }, this.scene);
      spark.material = this.mats.elec;
      spark.isPickable = false;
      v.spark = spark;
    }
    if (o.kind === 'gate') {
      v.sides = [];
      for (const sx of [-1, 1]) {
        const sb = await this.assets.instance('sack_trench');
        fitHeight(sb, 1);
        sb.root.position.set(sx * LANE_W * 1.9, 0, o.z - 0.8);
        v.sides.push(sb.root);
      }
    }
    return v;
  }

  private syncObjects(sim: RunSim) {
    const seen = new Set<number>();
    for (const o of sim.objects) {
      seen.add(o.id);
      const v = this.objViews.get(o.id);
      if (!v) {
        const pooled = this.objPool.get(objKey(o))?.pop();
        if (pooled) {
          this.enableView(pooled, true);
          this.objViews.set(o.id, pooled);
        } else if (!this.pendingObj.has(o.id)) {
          this.pendingObj.add(o.id);
          void this.makeObject(o).then((view) => {
            this.pendingObj.delete(o.id);
            if (!sim.objects.some((q) => q.id === o.id && q.alive)) return this.releaseView(view);
            this.objViews.set(o.id, view);
          });
        }
        continue;
      }
      // gli oggetti in movimento scivolano verso la nuova corsia
      if (o.moving) o.x += (laneX(o.lane) - o.x) * 0.15;
      const x = o.kind === 'gate' ? 0 : o.x;
      v.root.position.set(x, 0, o.z);
      const since = sim.time - o.hitAt;
      const hit = since < 0.07;
      const m = v.root.metadata as { sx: number; sy: number; sz: number };
      v.root.scaling.set(m.sx * (hit ? 1.07 : 1), m.sy * (hit ? 0.94 : 1), m.sz * (hit ? 1.07 : 1));
      const frac = Math.max(0, o.hp / o.maxHp);
      const top = o.kind === 'gate' ? 3.4 : o.kind === 'safe' || o.kind === 'cage' ? 2.1 : o.kind === 'medicine' ? 2 : 1.75;
      if (v.bar) {
        v.bar.bg.position.set(x, top, o.z);
        v.bar.fill.scaling.x = Math.max(0.001, frac);
        v.bar.fill.position.x = -(1 - frac) * (v.bar.w / 2);
        v.bar.bg.setEnabled(Math.abs(o.z - sim.playerZ) < 40);
      }
      if (v.crack) {
        const dmg = 1 - frac;
        const stage = dmg > 0.66 ? 2 : dmg > 0.33 ? 1 : 0;
        v.crack.material = this.crackMats[stage];
        v.crack.isVisible = dmg >= 0.05;
        v.crack.position.set(x, o.kind === 'gate' ? 1.4 : 0.6, o.z - (o.kind === 'gate' ? 0.7 : 0.62));
      }
      if (v.extra) {
        const bob = Math.sin(sim.time * 3 + o.id) * 0.12;
        v.extra.position.set(x, o.kind === 'medicine' ? 0.35 : top + 0.5 + bob, o.z);
        if (o.kind === 'chest') v.extra.rotation.y = sim.time * 2;
      }
      if (v.survivor) v.survivor.root.position.set(x, 0, o.z + 0.15);
      if (v.spark) {
        const on = (sim.time + o.phase) % o.period < o.period / 2;
        v.spark.setEnabled(on && Math.random() > 0.15);
        v.spark.position.set(x, 0.85, o.z - 0.05);
      }
    }
    for (const [id, v] of this.objViews) {
      if (!seen.has(id)) {
        this.releaseView(v);
        this.objViews.delete(id);
      }
    }
  }

  private enableView(v: OView, on: boolean) {
    v.root.setEnabled(on);
    v.bar?.bg.setEnabled(on);
    if (v.crack) {
      v.crack.setEnabled(on);
      v.crack.isVisible = false;
      v.crack.material = this.crackMats[0];
    }
    v.extra?.setEnabled(on);
    v.survivor?.root.setEnabled(on);
    v.spark?.setEnabled(on);
    v.sides?.forEach((s) => s.setEnabled(on));
  }

  /** rimette l'oggetto nel pool per riusarlo (niente creazione durante la partita) */
  private releaseView(v: OView) {
    this.enableView(v, false);
    let list = this.objPool.get(v.key);
    if (!list) this.objPool.set(v.key, (list = []));
    if (list.length < 6) list.push(v);
    else this.disposeView(v);
  }

  private disposeView(v: OView) {
    v.root.dispose();
    v.bar?.bg.dispose();
    v.crack?.dispose();
    v.extra?.dispose();
    v.survivor?.root.dispose();
    v.spark?.dispose();
    v.sides?.forEach((s) => s.dispose());
  }

  private syncHazards(sim: RunSim) {
    const seen = new Set<number>();
    for (const h of sim.hazards) {
      seen.add(h.id);
      let m = this.hazardViews.get(h.id);
      if (!m) {
        m = this.makeHazard(h);
        this.hazardViews.set(h.id, m);
      }
      const active = sim.time >= h.activeAt;
      if (h.kind === 'acid') {
        m.material = active ? this.mats.acid : this.mats.acidWarn;
        m.position.set(laneX(h.lane), 0.06, h.z);
        m.scaling.z = active ? 1 : 0.6 + 0.4 * Math.abs(Math.sin(sim.time * 10));
      } else if (h.kind === 'slam') {
        m.position.set(laneX(h.lane), 0.07, sim.playerZ + 3);
        (m.material as StandardMaterial).alpha = active ? 0.7 : 0.25 + 0.25 * Math.abs(Math.sin(sim.time * 14));
      } else {
        const t = h.activeAt === Infinity ? 0.3 : Math.min(1, 1 - (h.activeAt - sim.time) / 1.2);
        m.position.set(laneX(h.lane), 0.06, h.z);
        m.scaling.setAll(0.4 + 0.8 * t);
      }
    }
    for (const [id, m] of this.hazardViews) if (!seen.has(id)) { m.dispose(); this.hazardViews.delete(id); }
  }

  private makeHazard(h: LaneHazard): Mesh {
    if (h.kind === 'shadow') {
      const d = MeshBuilder.CreateDisc('shadow', { radius: 0.9, tessellation: 24 }, this.scene);
      d.rotation.x = Math.PI / 2;
      d.material = this.mats.shadow;
      d.isPickable = false;
      return d;
    }
    if (h.kind === 'slam') return laneDecal(this.scene, 'slam', LANE_W * 0.95, 14, this.mats.slam.clone('slam-i') as StandardMaterial);
    return laneDecal(this.scene, 'acid', LANE_W * 0.9, h.len, this.mats.acidWarn);
  }

  private syncBullets(sim: RunSim) {
    const used = {} as Record<WeaponId, number>;
    for (const w of Object.keys(this.tracers) as WeaponId[]) used[w] = 0;
    for (const b of sim.bullets) {
      if (b.weapon === 'flame') continue; // la fiamma è fatta di particelle
      const list = this.tracers[b.weapon];
      let t = list[used[b.weapon]];
      if (!t) {
        t = this.tracerBases[b.weapon].createInstance('t');
        t.isPickable = false;
        list.push(t);
      }
      t.setEnabled(true);
      const arc = b.weapon === 'grenade' ? Math.sin(Math.min(1, (b.z - b.zStart) / 24) * Math.PI) * 2.2 : 0;
      t.position.set(b.x, 1.05 + arc, b.z);
      used[b.weapon]++;
    }
    for (const w of Object.keys(this.tracers) as WeaponId[]) for (let i = used[w]; i < this.tracers[w].length; i++) this.tracers[w][i].setEnabled(false);
  }

  private syncEscort(sim: RunSim) {
    if (!sim.escort) return;
    if (!this.escort) {
      if (!this.escortLoading) {
        this.escortLoading = true;
        void this.assets.instance('tank').then((t) => {
          fitHeight(t, 2);
          this.escort = t.root;
        });
      }
      return;
    }
    this.escort.position.set(laneX(sim.escort.lane), 0, sim.escort.z);
    this.escort.setEnabled(sim.escort.hp > 0);
  }

  dispose() {
    this.scene.dispose();
  }
}
