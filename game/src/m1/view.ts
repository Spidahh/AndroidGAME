// Resa di M1 v2 con Babylon: legge lo stato di RunSim e lo disegna. Nessuna regola di gioco qui.
// La squadra è UN soldato con il numero "×N" sopra (richiesta dell'utente): leggero e chiaro.
import {
  Scene, Engine, Color3, Color4, Vector3, FreeCamera, Camera, MeshBuilder, StandardMaterial, Mesh, InstancedMesh, TransformNode,
  ParticleSystem, Node,
} from '@babylonjs/core';
import { Assets, Instance, play, fitHeight } from '../render/assets';
import { Crowd, CrowdItem } from '../render/crowd';
import { Environment } from '../render/env';
import { LabelLayer } from '../render/labels';
import { sparkTexture, smokeTexture, chunkTexture, makeBurst, burst, flatMaterial, laneDecal } from '../render/effects';
import { RunSim, WorldObject, Hazard, SimEvent } from './sim';
import { LANE_W, laneX, WeaponId, ZombieKind, ObjectKind, WEAPONS } from './defs';
import { audio } from '../audio';

const ZOMBIE_LOOK: Record<ZombieKind, { model: string; height: number; anims: string[]; tint?: Color3; moving: string }> = {
  walker: { model: 'zombie_chubby', height: 1.7, anims: ['Walk', 'Death'], moving: 'Walk' },
  runner: { model: 'zombie_chubby', height: 1.6, anims: ['Run', 'Death'], tint: new Color3(1.35, 0.8, 0.72), moving: 'Run' },
  dog: { model: 'dog', height: 0.85, anims: ['Run', 'Death'], tint: new Color3(0.7, 0.85, 0.6), moving: 'Run' },
  armored: { model: 'zombie_arm', height: 2.1, anims: ['Walk', 'Death'], tint: new Color3(0.75, 0.78, 0.85), moving: 'Walk' },
  giant: { model: 'zombie_arm', height: 3.4, anims: ['Walk', 'Death'], moving: 'Walk' },
  bloater: { model: 'zombie_basic', height: 1.9, anims: ['Walk', 'Death'], tint: new Color3(0.9, 1.25, 0.65), moving: 'Walk' },
  spitter: { model: 'zombie_chubby', height: 1.75, anims: ['Idle_Attack', 'Death'], tint: new Color3(1.25, 1.2, 0.5), moving: 'Idle_Attack' },
  shield: { model: 'zombie_chubby', height: 1.8, anims: ['Walk', 'Death'], tint: new Color3(0.72, 0.82, 1.15), moving: 'Walk' },
  boss: { model: 'zombie_arm', height: 5, anims: ['Walk', 'Punch', 'Death'], tint: new Color3(1.35, 0.72, 0.68), moving: 'Walk' },
};

const TRACER: Record<WeaponId, { color: Color3; len: number; w: number }> = {
  pistol: { color: new Color3(1, 0.88, 0.45), len: 0.8, w: 0.09 },
  smg: { color: new Color3(1, 0.75, 0.3), len: 0.7, w: 0.08 },
  rifle: { color: new Color3(1, 0.65, 0.25), len: 1.2, w: 0.1 },
  heavy: { color: new Color3(0.6, 0.95, 1), len: 1.8, w: 0.12 },
  flame: { color: new Color3(1, 0.5, 0.1), len: 0.6, w: 0.35 },
  grenade: { color: new Color3(0.4, 0.45, 0.3), len: 0.35, w: 0.3 },
};

const OBJECT_MODEL: Record<ObjectKind, { model: string; height: number }> = {
  troops: { model: 'barrel', height: 1.3 },
  weapon: { model: 'crate', height: 1.1 },
  freeze: { model: 'barrel', height: 1.3 },
  explosive: { model: 'barrel_red', height: 1.25 },
  gate: { model: 'brick_wall', height: 2.2 },
  safe: { model: 'chest_special', height: 1.45 },
  car: { model: 'broken_car', height: 1.5 },
  trap: { model: 'metal_fence', height: 1.7 },
  wall: { model: 'brick_wall', height: 3 },
};

/** mesh dell'arma nel modello del soldato, per ogni arma della squadra */
const WEAPON_MESHES = ['Pistol', 'SMG', 'AK', 'Sniper_2', 'ShortCannon', 'GrenadeLauncher', 'Revolver', 'Sniper', 'Revolver_Small', 'Shotgun', 'RocketLauncher', 'Shovel', 'Knife_1', 'Knife_2'];

export const PRELOAD = [
  'hero_soldier', 'zombie_basic', 'zombie_chubby', 'zombie_arm', 'dog',
  'street', 'street_crack1', 'street_crack2', 'crosswalk', 'chest_special', 'crate', 'barrel', 'barrel_red', 'broken_car', 'metal_fence', 'brick_wall', 'sack_trench',
  'barrier_single', 'gun_smg', 'gun_rifle', 'gun_grenade', 'gun_flame', 'gun_sniper', 'gun_pistol',
  'streetlight', 'dumpster', 'tree', 'tree2', 'trash_bags', 'container_red', 'container_green', 'hydrant', 'tires', 'pallet', 'couch', 'gas_tank',
];
const GUN_ICON_MODEL: Record<WeaponId, string> = { pistol: 'gun_pistol', smg: 'gun_smg', rifle: 'gun_rifle', heavy: 'gun_sniper', flame: 'gun_flame', grenade: 'gun_grenade' };

function objKey(o: Partial<WorldObject>) {
  return `${o.kind}:${o.weapon ?? ''}`;
}

interface OView {
  key: string;
  root: TransformNode;
  kind: ObjectKind;
  extra?: TransformNode;
  spark?: Mesh;
  sides?: TransformNode[];
}

export class RunView {
  scene: Scene;
  camera: FreeCamera;
  labels: LabelLayer;
  private assets: Assets;
  private env: Environment;
  private soldier!: Instance;
  private weaponMeshes = new Map<string, Node>();
  private shownWeapon = '';
  private crowds = {} as Record<ZombieKind, Crowd>;
  private crowdItems = {} as Record<ZombieKind, CrowdItem[]>;
  private deathAt = new Map<number, number>();
  private warnPool: Mesh[] = [];
  private zombieWarn = new Map<number, Mesh>();
  private shieldProps: InstancedMesh[] = [];
  private shieldBase?: Mesh;
  private objViews = new Map<number, OView>();
  private objPool = new Map<string, OView[]>();
  private pendingObj = new Set<number>();
  private hazardViews = new Map<number, Mesh>();
  private tracerBases = {} as Record<WeaponId, Mesh>;
  private tracers = {} as Record<WeaponId, InstancedMesh[]>;
  private shake = 0;
  private camX = 0;
  private squadPulse = 0;
  private floaters: { x: number; z: number; t: number; html: string; cls: string }[] = [];
  private ps!: Record<'spark' | 'muzzle' | 'boom' | 'smoke' | 'chunks' | 'gold' | 'goo' | 'flame' | 'frost', ParticleSystem>;
  private mats!: Record<'warn' | 'acidWarn' | 'acid' | 'slam' | 'shadow' | 'elec' | 'strike' | 'frost', StandardMaterial>;
  private lastShotSound = 0;

  constructor(engine: Engine, private zone: string) {
    this.scene = new Scene(engine);
    this.scene.skipPointerMovePicking = true;
    this.assets = new Assets(this.scene);
    this.env = new Environment(this.scene, this.assets);
    this.camera = new FreeCamera('cam', new Vector3(0, 9, -8), this.scene);
    this.camera.fovMode = Camera.FOVMODE_HORIZONTAL_FIXED;
    this.camera.fov = 1.12;
    this.camera.minZ = 0.5;
    this.camera.maxZ = 150;
    this.labels = new LabelLayer(this.scene, this.camera);
  }

  async load(onProgress?: (d: number, t: number) => void) {
    await this.assets.preload(PRELOAD, onProgress);
    await this.env.build(this.zone);
    this.makeMaterials();
    this.makeParticles();
    this.makeTracers();

    // la squadra: un soldato con tutte le armi in mano, se ne mostra una
    this.soldier = await this.assets.instance('hero_soldier');
    fitHeight(this.soldier, 1.85);
    // le armi nel modello sono nodi con sotto-mesh: si accende solo quella in uso (le altre non si disegnano)
    for (const n of this.soldier.root.getDescendants(false)) if (WEAPON_MESHES.includes(n.name)) this.weaponMeshes.set(n.name, n);
    this.showWeapon('pistol');
    play(this.soldier, 'Run_Gun');

    await Promise.all(
      (Object.keys(ZOMBIE_LOOK) as ZombieKind[]).map(async (k) => {
        const z = ZOMBIE_LOOK[k];
        const c = new Crowd(this.scene, this.assets, z.model, z.height, z.anims, z.tint);
        await c.init();
        this.crowds[k] = c;
        this.crowdItems[k] = [];
      }),
    );
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

  private showWeapon(id: WeaponId) {
    if (this.shownWeapon === id) return;
    this.shownWeapon = id;
    const want = WEAPONS[id].mesh;
    for (const [name, m] of this.weaponMeshes) m.setEnabled(name === want);
  }

  private makeMaterials() {
    const s = this.scene;
    this.mats = {
      warn: flatMaterial(s, 'warn', new Color3(1, 0.45, 0.12), 0.9),
      acidWarn: flatMaterial(s, 'acidwarn', new Color3(0.55, 1, 0.2), 0.35),
      acid: flatMaterial(s, 'acid', new Color3(0.4, 0.95, 0.15), 0.75),
      slam: flatMaterial(s, 'slam', new Color3(1, 0.15, 0.1), 0.45),
      shadow: flatMaterial(s, 'shadow', new Color3(0, 0, 0), 0.45),
      elec: flatMaterial(s, 'elec', new Color3(0.45, 0.8, 1), 0.85),
      strike: flatMaterial(s, 'strike', new Color3(1, 0.55, 0.1), 0.4),
      frost: flatMaterial(s, 'frost', new Color3(0.55, 0.85, 1), 0.9),
    };
  }

  private makeParticles() {
    const s = this.scene;
    const spark = sparkTexture(s);
    const smoke = smokeTexture(s);
    const chunk = chunkTexture(s);
    this.ps = {
      spark: makeBurst(s, 'spark', spark, { capacity: 500, size: [0.1, 0.28], life: [0.08, 0.22], power: [2, 6] }),
      muzzle: makeBurst(s, 'muzzle', spark, { capacity: 200, size: [0.3, 0.6], life: [0.03, 0.07], power: [0.2, 0.8] }),
      boom: makeBurst(s, 'boom', spark, { capacity: 900, size: [0.6, 2], life: [0.25, 0.7], power: [4, 11], gravity: -6, c1: new Color4(1, 0.82, 0.3, 1), c2: new Color4(1, 0.35, 0.08, 1), dead: new Color4(0.2, 0.2, 0.2, 0) }),
      smoke: makeBurst(s, 'smoke', smoke, { capacity: 300, size: [1, 2.6], life: [0.6, 1.4], power: [0.5, 2], gravity: 1.2, c1: new Color4(0.35, 0.33, 0.3, 0.6), c2: new Color4(0.2, 0.2, 0.2, 0.5), dead: new Color4(0.2, 0.2, 0.2, 0), additive: false }),
      chunks: makeBurst(s, 'chunks', chunk, { capacity: 400, size: [0.1, 0.28], life: [0.5, 0.9], power: [3, 7], gravity: -14, c1: new Color4(0.62, 0.42, 0.24, 1), c2: new Color4(0.45, 0.3, 0.18, 1), dead: new Color4(0.4, 0.3, 0.2, 1), additive: false }),
      gold: makeBurst(s, 'gold', spark, { capacity: 300, size: [0.12, 0.3], life: [0.4, 0.9], power: [3, 7], gravity: -9, c1: new Color4(1, 0.9, 0.35, 1), c2: new Color4(1, 0.75, 0.2, 1) }),
      goo: makeBurst(s, 'goo', chunk, { capacity: 700, size: [0.1, 0.26], life: [0.3, 0.6], power: [2, 5], gravity: -12, c1: new Color4(0.45, 0.85, 0.25, 1), c2: new Color4(0.3, 0.6, 0.15, 1), dead: new Color4(0.3, 0.5, 0.1, 0), additive: false }),
      flame: makeBurst(s, 'flame', spark, { capacity: 600, size: [0.3, 0.8], life: [0.15, 0.32], power: [18, 26], c1: new Color4(1, 0.7, 0.2, 1), c2: new Color4(1, 0.3, 0.05, 1), dead: new Color4(0.3, 0.1, 0.05, 0), dir1: new Vector3(-0.08, 0.05, 1), dir2: new Vector3(0.08, 0.2, 1) }),
      frost: makeBurst(s, 'frost', spark, { capacity: 300, size: [0.2, 0.5], life: [0.4, 0.9], power: [4, 9], c1: new Color4(0.6, 0.9, 1, 1), c2: new Color4(0.85, 0.95, 1, 1), dead: new Color4(0.6, 0.8, 1, 0) }),
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

  /** crea una volta ogni oggetto e disegna un frame: i materiali si preparano al caricamento, non in partita */
  private async prewarm() {
    const kinds: Partial<WorldObject>[] = [
      { kind: 'troops' }, { kind: 'troops' }, { kind: 'troops' }, { kind: 'weapon', weapon: 'smg' }, { kind: 'weapon' }, { kind: 'weapon', weapon: 'flame' }, { kind: 'weapon', weapon: 'grenade' },
      { kind: 'freeze' }, { kind: 'explosive' }, { kind: 'explosive' }, { kind: 'gate' }, { kind: 'safe' }, { kind: 'car' }, { kind: 'car' }, { kind: 'trap', period: 2 }, { kind: 'wall' },
    ];
    const views: OView[] = [];
    for (const k of kinds) views.push(await this.makeObject({ id: 0, lane: 1, x: 0, z: 30, hp: 1, maxHp: 1, alive: true, hitAt: -1, troops: 0, period: 2, phase: 0, touched: false, ...k } as WorldObject));
    for (const v of views) v.root.position.set(0, 0, 15);
    const hz = ['acid', 'slam', 'shadow', 'strike'].map((k) => this.makeHazard({ id: 0, kind: k as Hazard['kind'], lane: 1, z: 20, len: 3, activeAt: 0, until: 1, done: false }));
    await this.scene.whenReadyAsync();
    this.scene.render();
    views.forEach((v) => this.releaseView(v));
    hz.forEach((m) => m.dispose());
    for (let i = 0; i < 10; i++) {
      const w = MeshBuilder.CreateDisc('warn', { radius: 0.6, tessellation: 3 }, this.scene);
      w.material = this.mats.warn;
      w.isPickable = false;
      w.setEnabled(false);
      this.warnPool.push(w);
    }
  }

  // ---------- per frame ----------
  sync(sim: RunSim, dt: number, events: SimEvent[]) {
    const pz = sim.playerZ;
    this.env.update(pz);
    this.labels.begin();

    // squadra
    this.soldier.root.position.set(sim.playerX, 0, pz);
    const lean = (laneX(sim.playerLane) - sim.playerX) * 0.12;
    this.soldier.root.rotation.set(0, lean, -lean * 0.6);
    this.showWeapon(sim.weapon);
    const dead = sim.status === 'lost';
    play(this.soldier, dead ? 'Death' : sim.speed < 0.5 ? 'Idle_Shoot' : 'Run_Gun', !dead);
    this.squadPulse = Math.max(0, this.squadPulse - dt * 3);
    const big = 1 + this.squadPulse * 0.35;
    this.labels.put(sim.playerX, 2.35, pz, `<b style="font-size:${Math.round(26 * big)}px">×${sim.squad}</b>`, 'squad');

    // camera
    this.shake = Math.max(0, this.shake - dt * 1.6);
    this.camX += (sim.playerX * 0.4 - this.camX) * Math.min(1, dt * 6);
    const boss = sim.boss?.alive ? 1 : 0;
    const sx = (Math.random() - 0.5) * this.shake;
    const sy = (Math.random() - 0.5) * this.shake;
    this.camera.position.set(this.camX + sx, 9 + boss * 1.4 + sy, pz - 7.6 - boss * 1.5);
    this.camera.setTarget(new Vector3(this.camX * 0.6, 0, pz + 10 + boss * 2));

    this.syncZombies(sim, dt);
    this.syncObjects(sim);
    this.syncHazards(sim);
    this.syncBullets(sim);
    if (sim.weapon === 'flame' && !sim.over) burst(this.ps.flame, new Vector3(sim.playerX + 0.2, 1.05, pz + 1), 4);
    if (sim.strikeLeft > 0 && Math.random() < 0.5) {
      const z = pz + 4 + Math.random() * 26;
      burst(this.ps.boom, new Vector3(laneX(sim.strikeLane) + (Math.random() - 0.5) * 2, 0.6, z), 18);
    }
    for (const e of events) this.onEvent(e, sim);
    // numeri che volano (+N soldati, −N soldati)
    this.floaters = this.floaters.filter((f) => (f.t -= dt) > 0);
    for (const f of this.floaters) this.labels.put(f.x, 2.6 + (1.2 - f.t) * 1.6, f.z, f.html, f.cls);
    this.labels.end();
  }

  private onEvent(e: SimEvent, sim: RunSim) {
    switch (e.type) {
      case 'shot': {
        if (e.weapon !== 'flame') burst(this.ps.muzzle, new Vector3(sim.playerX + 0.25, 1.15, sim.playerZ + 1), 2);
        const now = performance.now();
        if (now - this.lastShotSound > 45) {
          this.lastShotSound = now;
          audio.shot(e.weapon);
        }
        break;
      }
      case 'hit':
        if (e.target === 'zombie') {
          burst(e.armored ? this.ps.spark : this.ps.goo, new Vector3(e.x, 1.1, e.z - 0.3), e.armored ? 4 : 2);
          if (Math.random() < 0.2) audio.play(e.armored ? 'metal_hit1' : (['flesh1', 'flesh2', 'flesh3'] as const)[Math.floor(Math.random() * 3)], 0.35);
        } else {
          burst(this.ps.chunks, new Vector3(e.x, 0.8, e.z - 0.5), 2);
          if (Math.random() < 0.4) audio.play(Math.random() < 0.5 ? 'crate_hit1' : 'crate_hit2', 0.4);
        }
        break;
      case 'zombieDied':
        burst(this.ps.goo, new Vector3(e.x, 1, e.z), 8);
        if (Math.random() < 0.25) audio.play('zombie_die', 0.3);
        if (e.kind === 'boss') {
          burst(this.ps.boom, new Vector3(e.x, 2, e.z), 160);
          this.shake = 0.6;
        }
        break;
      case 'objectOpened':
        burst(this.ps.chunks, new Vector3(e.x, 0.8, e.z), e.kind === 'wall' || e.kind === 'gate' ? 80 : 24);
        burst(this.ps.smoke, new Vector3(e.x, 0.6, e.z), e.kind === 'wall' ? 30 : 6);
        audio.play(e.kind === 'safe' || e.kind === 'wall' || e.kind === 'gate' ? 'metal_break' : 'crate_break', 0.7);
        if (e.kind === 'safe') burst(this.ps.gold, new Vector3(e.x, 1, e.z), 80);
        if (e.kind === 'freeze') burst(this.ps.frost, new Vector3(e.x, 1, e.z), 120);
        break;
      case 'objectLost':
        this.floaters.push({ x: e.x, z: e.z, t: 1.1, html: '✕', cls: 'float bad' });
        break;
      case 'soldiersGained':
        this.squadPulse = 1;
        burst(this.ps.gold, new Vector3(sim.playerX, 1.5, sim.playerZ), 30);
        this.floaters.push({ x: e.x, z: e.z, t: 1.2, html: `+${e.count}`, cls: 'float good' });
        audio.play('companion', 0.8);
        break;
      case 'soldiersLost':
        this.floaters.push({ x: sim.playerX, z: sim.playerZ, t: 1.0, html: `−${e.count}`, cls: 'float bad' });
        this.shake = Math.min(0.4, this.shake + 0.08 * e.count);
        audio.play('hurt', Math.min(1, 0.3 + e.count * 0.1));
        audio.vibrate(30 + e.count * 10);
        break;
      case 'explosion':
        burst(this.ps.boom, new Vector3(e.x, 0.9, e.z), Math.round(70 * e.size));
        burst(this.ps.smoke, new Vector3(e.x, 0.8, e.z), Math.round(12 * e.size));
        this.shake = Math.min(0.45, this.shake + 0.2 * e.size);
        audio.play(Math.random() < 0.5 ? 'boom1' : 'boom2', 0.7);
        break;
      case 'weapon':
        audio.play('pickup', 0.9);
        burst(this.ps.gold, new Vector3(sim.playerX, 1.6, sim.playerZ), 30);
        break;
      case 'freeze':
        audio.play('power', 0.8);
        break;
      case 'loot':
        audio.play('loot', 0.9);
        break;
      case 'warn':
        audio.play(e.kind === 'acid' ? 'acid' : 'warn', 0.4);
        break;
      case 'slam':
        burst(this.ps.smoke, new Vector3(laneX(e.lane), 0.4, e.z), 25);
        this.shake = 0.5;
        audio.play('boom_big', 0.8);
        audio.vibrate(80);
        break;
      case 'airstrike':
        audio.play('boom_big', 1);
        this.shake = 0.5;
        break;
      case 'airstrikeReady':
        audio.play('power', 0.7);
        break;
      case 'boss':
        audio.play('boom_big', 1);
        this.shake = 0.5;
        break;
      default:
        break;
    }
  }

  private syncZombies(sim: RunSim, dt: number) {
    for (const k of Object.keys(this.crowdItems) as ZombieKind[]) this.crowdItems[k].length = 0;
    const live = new Set<number>();
    let shields = 0;
    const frozen = sim.time < sim.freezeUntil;
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
      const y = z.dropAt > sim.time ? (z.dropAt - sim.time) * 14 : 0;
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
      // barra della vita sopra i nemici grossi e il capo
      if (z.alive && (z.kind === 'giant' || z.kind === 'boss') && z.z - sim.playerZ < 45) {
        const pct = Math.max(0, z.hp / z.maxHp) * 100;
        this.labels.put(z.x, ZOMBIE_LOOK[z.kind].height + 0.5, z.z, `<i class="hpbar"><i style="width:${pct.toFixed(0)}%"></i></i><b>${Math.ceil(z.hp)}</b>`, z.kind === 'boss' ? 'boss' : 'giant');
      }
      if (frozen && z.alive && Math.random() < 0.02) burst(this.ps.frost, new Vector3(z.x, 1.2, z.z), 1);
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
    for (const k of Object.keys(this.crowds) as ZombieKind[]) this.crowds[k].update(this.crowdItems[k], frozen ? dt * 0.5 : dt);
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
    const inst = await this.assets.instance(def.model);
    fitHeight(inst, def.height);
    if (o.kind === 'car') inst.root.rotation.y = Math.PI / 2;
    if (o.kind === 'freeze' || o.kind === 'troops') {
      // colore del barile: blu soldati, ghiaccio gelo
      for (const m of inst.meshes) {
        const mat = m.material?.clone(`${m.material.name}-${o.kind}`);
        if (mat && 'albedoColor' in mat) (mat as unknown as { albedoColor: Color3 }).albedoColor = o.kind === 'freeze' ? new Color3(0.6, 0.9, 1.3) : new Color3(0.55, 0.8, 1.2);
        if (mat) m.material = mat;
      }
    }
    if (o.kind === 'car' || o.kind === 'trap' || o.kind === 'gate') {
      inst.root.computeWorldMatrix(true);
      const { min, max } = inst.root.getHierarchyBoundingVectors(true);
      const w = max.x - min.x;
      inst.root.scaling.x *= (LANE_W * 0.95) / Math.max(0.01, w);
    }
    if (o.kind === 'wall') {
      inst.root.computeWorldMatrix(true);
      const { min, max } = inst.root.getHierarchyBoundingVectors(true);
      inst.root.scaling.x *= (LANE_W * 3.4) / Math.max(0.01, max.x - min.x);
    }
    const v: OView = { key: objKey(o), root: inst.root, kind: o.kind };
    inst.root.metadata = { sx: inst.root.scaling.x, sy: inst.root.scaling.y, sz: inst.root.scaling.z };
    if (o.kind === 'weapon') {
      const g = await this.assets.instance(GUN_ICON_MODEL[o.weapon ?? 'smg']);
      g.root.computeWorldMatrix(true);
      const { min, max } = g.root.getHierarchyBoundingVectors(true);
      g.root.scaling.scaleInPlace(1 / Math.max(0.001, Math.max(max.x - min.x, max.z - min.z, max.y - min.y)));
      v.extra = g.root;
    } else if (o.kind === 'trap') {
      const spark = MeshBuilder.CreatePlane('elec', { width: LANE_W * 0.9, height: 1.4 }, this.scene);
      spark.material = this.mats.elec;
      spark.isPickable = false;
      v.spark = spark;
    } else if (o.kind === 'wall') {
      v.sides = [];
      for (const sx of [-1, 1]) {
        const sb = await this.assets.instance('sack_trench');
        fitHeight(sb, 1);
        sb.root.position.set(sx * LANE_W * 1.95, 0, 0);
        v.sides.push(sb.root);
      }
    }
    return v;
  }

  private syncObjects(sim: RunSim) {
    const seen = new Set<number>();
    for (const o of sim.objects) {
      seen.add(o.id);
      let v = this.objViews.get(o.id);
      if (!v) {
        const pooled = this.objPool.get(objKey(o))?.pop();
        if (pooled) {
          this.enableView(pooled, true);
          this.objViews.set(o.id, pooled);
          v = pooled;
        } else {
          if (!this.pendingObj.has(o.id)) {
            this.pendingObj.add(o.id);
            void this.makeObject(o).then((view) => {
              this.pendingObj.delete(o.id);
              if (!sim.objects.some((q) => q.id === o.id && q.alive)) return this.releaseView(view);
              this.objViews.set(o.id, view);
            });
          }
          continue;
        }
      }
      v.root.position.set(o.x, 0, o.z);
      const hit = sim.time - o.hitAt < 0.07;
      const m = v.root.metadata as { sx: number; sy: number; sz: number };
      v.root.scaling.set(m.sx * (hit ? 1.08 : 1), m.sy * (hit ? 0.92 : 1), m.sz * (hit ? 1.08 : 1));
      if (v.extra) {
        v.extra.position.set(o.x, OBJECT_MODEL[o.kind].height + 0.55 + Math.sin(sim.time * 3 + o.id) * 0.1, o.z);
        v.extra.rotation.y = sim.time * 2;
      }
      if (v.sides) v.sides.forEach((sd, i) => sd.position.set((i ? 1 : -1) * LANE_W * 1.95, 0, o.z - 0.6));
      if (v.spark) {
        const on = sim.trapOn(o);
        v.spark.setEnabled(on && Math.random() > 0.15);
        v.spark.position.set(o.x, 0.85, o.z - 0.05);
      }
      // numero che scende (Last War / Last Z): resistenza rimasta e cosa dà
      if (Math.abs(o.z - sim.playerZ) < 48 && Number.isFinite(o.hp) && o.kind !== 'explosive') {
        const hp = Math.max(0, Math.ceil(o.hp));
        const top = OBJECT_MODEL[o.kind].height + (o.kind === 'weapon' ? 1.3 : 0.45);
        let html = `<b>${hp}</b>`;
        let cls = 'obj';
        if (o.kind === 'troops' || o.kind === 'gate') {
          html = `<span class="gain">+${o.troops}</span><b>${hp}</b>`;
          cls = 'obj troops';
        } else if (o.kind === 'weapon') cls = 'obj weapon';
        else if (o.kind === 'freeze') {
          html = `<span class="gain">❄</span><b>${hp}</b>`;
          cls = 'obj freeze';
        } else if (o.kind === 'safe') cls = 'obj safe';
        else if (o.kind === 'wall') cls = 'obj wall';
        this.labels.put(o.x, top, o.z, html, cls);
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
    v.extra?.setEnabled(on);
    v.spark?.setEnabled(on);
    v.sides?.forEach((s) => s.setEnabled(on));
  }

  private releaseView(v: OView) {
    this.enableView(v, false);
    let list = this.objPool.get(v.key);
    if (!list) this.objPool.set(v.key, (list = []));
    if (list.length < 8) list.push(v);
    else {
      v.root.dispose();
      v.extra?.dispose();
      v.spark?.dispose();
      v.sides?.forEach((s) => s.dispose());
    }
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
      } else if (h.kind === 'strike') {
        m.position.set(laneX(h.lane), 0.08, sim.playerZ + 18);
      } else {
        const t = h.activeAt === Infinity ? 0.3 : Math.min(1, 1 - (h.activeAt - sim.time) / 1.2);
        m.position.set(laneX(h.lane), 0.06, h.z);
        m.scaling.setAll(0.4 + 0.8 * t);
      }
    }
    for (const [id, m] of this.hazardViews)
      if (!seen.has(id)) {
        m.dispose();
        this.hazardViews.delete(id);
      }
  }

  private makeHazard(h: Hazard): Mesh {
    if (h.kind === 'shadow') {
      const d = MeshBuilder.CreateDisc('shadow', { radius: 0.9, tessellation: 24 }, this.scene);
      d.rotation.x = Math.PI / 2;
      d.material = this.mats.shadow;
      d.isPickable = false;
      return d;
    }
    if (h.kind === 'slam') return laneDecal(this.scene, 'slam', LANE_W * 0.95, 14, this.mats.slam.clone('slam-i') as StandardMaterial);
    if (h.kind === 'strike') return laneDecal(this.scene, 'strike', LANE_W * 0.95, 30, this.mats.strike);
    return laneDecal(this.scene, 'acid', LANE_W * 0.9, h.len, this.mats.acidWarn);
  }

  private syncBullets(sim: RunSim) {
    const used = {} as Record<WeaponId, number>;
    for (const w of Object.keys(this.tracers) as WeaponId[]) used[w] = 0;
    for (const b of sim.bullets) {
      if (b.weapon === 'flame') continue;
      const list = this.tracers[b.weapon];
      let t = list[used[b.weapon]];
      if (!t) {
        t = this.tracerBases[b.weapon].createInstance('t');
        t.isPickable = false;
        list.push(t);
      }
      t.setEnabled(true);
      const arc = b.weapon === 'grenade' ? Math.sin(Math.min(1, (b.z - b.zStart) / 28) * Math.PI) * 2.4 : 0;
      t.position.set(b.x, 1.05 + arc, b.z);
      used[b.weapon]++;
    }
    for (const w of Object.keys(this.tracers) as WeaponId[]) for (let i = used[w]; i < this.tracers[w].length; i++) this.tracers[w][i].setEnabled(false);
  }

  dispose() {
    this.labels.dispose();
    this.scene.dispose();
  }
}
