// Resa di M1 con Babylon: legge lo stato di RunSim e lo disegna. Nessuna regola di gioco qui.
import {
  Scene, Engine, Color3, Color4, Vector3, HemisphericLight, DirectionalLight, FreeCamera, Camera,
  MeshBuilder, StandardMaterial, Mesh, InstancedMesh, TransformNode, ParticleSystem, DynamicTexture, Texture,
} from '@babylonjs/core';
import { Assets, Instance, play, fitHeight, findNode } from '../render/assets';
import { Crowd, CrowdItem } from '../render/crowd';
import { RunSim, WorldObject, ZombieKind, LANE_W, laneX, WeaponId } from './sim';

const ZOMBIE_MODEL: Record<ZombieKind, { model: string; height: number }> = {
  walker: { model: 'zombie_basic', height: 1.75 },
  runner: { model: 'zombie_chubby', height: 1.7 },
  brute: { model: 'zombie_arm', height: 2.6 },
  crawler: { model: 'zombie_half', height: 0.9 },
};
const GUN_MODEL: Record<WeaponId, string> = { pistol: 'gun_pistol', smg: 'gun_smg', shotgun: 'gun_shotgun', rifle: 'gun_rifle' };

export const PRELOAD = [
  'hero_matt', 'zombie_basic', 'zombie_chubby', 'zombie_arm', 'zombie_half', 'gun_pistol', 'gun_smg', 'gun_shotgun', 'gun_rifle',
  'street', 'street_crack1', 'street_crack2', 'barrel', 'chest', 'chest_special', 'barrier_plastic', 'barrier_traffic',
  'container_red', 'container_green', 'streetlight', 'trash_bags', 'pallet', 'wheels', 'cone', 'hydrant', 'couch', 'cinder',
];

interface OView { root: TransformNode; bar?: { bg: Mesh; fill: Mesh }; baseScale: number }

export class RunView {
  scene: Scene;
  camera: FreeCamera;
  private assets: Assets;
  private hero!: Instance;
  private gun?: TransformNode;
  private gunId?: WeaponId;
  private crowds = {} as Record<ZombieKind, Crowd>;
  private deathAt = new Map<number, number>();
  private warns = new Map<number, Mesh>();
  private crowdItems: Record<ZombieKind, CrowdItem[]> = { walker: [], runner: [], brute: [], crawler: [] };
  private objViews = new Map<number, OView>();
  private tracerBase!: Mesh;
  private tracers: InstancedMesh[] = [];
  private tiles: TransformNode[] = [];
  private tileLen = 4;
  private props: TransformNode[] = [];
  private shake = 0;
  private flashPS!: ParticleSystem;
  private boomPS!: ParticleSystem;
  private warnMat!: StandardMaterial;
  private barBgMat!: StandardMaterial;
  private barFillMat!: StandardMaterial;

  constructor(engine: Engine) {
    this.scene = new Scene(engine);
    this.scene.clearColor = new Color4(0.55, 0.68, 0.78, 1);
    this.scene.fogMode = Scene.FOGMODE_LINEAR;
    this.scene.fogColor = new Color3(0.55, 0.68, 0.78);
    this.scene.fogStart = 40;
    this.scene.fogEnd = 85;
    this.scene.skipPointerMovePicking = true;
    this.assets = new Assets(this.scene);

    this.camera = new FreeCamera('cam', new Vector3(0, 9, -8), this.scene);
    this.camera.fovMode = Camera.FOVMODE_HORIZONTAL_FIXED;
    this.camera.fov = 1.05;
    this.camera.minZ = 0.5;
    this.camera.maxZ = 120;

    const hemi = new HemisphericLight('hemi', new Vector3(0.2, 1, 0.1), this.scene);
    hemi.intensity = 0.75;
    hemi.groundColor = new Color3(0.35, 0.33, 0.3);
    const sun = new DirectionalLight('sun', new Vector3(-0.4, -1, 0.5), this.scene);
    sun.intensity = 1.1;
    sun.diffuse = new Color3(1, 0.95, 0.85);
  }

  async load(onProgress?: (d: number, t: number) => void) {
    await this.assets.preload(PRELOAD, onProgress);
    this.makeMaterials();
    this.hero = await this.assets.instance('hero_matt');
    fitHeight(this.hero, 1.8);
    // il modello ha un coltello incluso: in M1 l'arma è quella raccolta
    this.hero.meshes.filter((m) => /knife/i.test(m.name)).forEach((m) => m.setEnabled(false));
    this.hero.root.rotation.y = 0;
    play(this.hero, 'Run_Gun');
    await this.buildRoad();
    this.makeTracers();
    this.makeParticles();
    // folle di zombie: animazioni calcolate dalla GPU, poche chiamate di disegno
    await Promise.all(
      (Object.keys(ZOMBIE_MODEL) as ZombieKind[]).map(async (kind) => {
        const c = new Crowd(this.scene, this.assets, ZOMBIE_MODEL[kind].model, ZOMBIE_MODEL[kind].height, ['Walk', 'Run', 'Crawl', 'Death', 'HitReact']);
        await c.init();
        this.crowds[kind] = c;
      }),
    );
  }

  private makeMaterials() {
    this.warnMat = new StandardMaterial('warn', this.scene);
    this.warnMat.emissiveColor = new Color3(1, 0.42, 0.15);
    this.warnMat.disableLighting = true;
    this.warnMat.alpha = 0.85;
    this.barBgMat = new StandardMaterial('barbg', this.scene);
    this.barBgMat.emissiveColor = new Color3(0.08, 0.08, 0.08);
    this.barBgMat.disableLighting = true;
    this.barFillMat = new StandardMaterial('barfill', this.scene);
    this.barFillMat.emissiveColor = new Color3(1, 0.8, 0.25);
    this.barFillMat.disableLighting = true;
  }

  private async buildRoad() {
    const c = await this.assets.load('street');
    const probe = c.instantiateModelsToScene((n) => n, false, { doNotInstantiate: false });
    const tmp = new TransformNode('probe', this.scene);
    probe.rootNodes.forEach((r) => (r.parent = tmp));
    tmp.computeWorldMatrix(true);
    const { min, max } = tmp.getHierarchyBoundingVectors(true);
    tmp.dispose();
    const width = max.x - min.x || 1;
    const scale = 11 / width;
    this.tileLen = (max.z - min.z) * scale;
    const kinds = ['street', 'street', 'street_crack1', 'street', 'street_crack2'];
    const count = Math.ceil(110 / this.tileLen) + 2;
    for (let i = 0; i < count; i++) {
      const cc = await this.assets.load(kinds[i % kinds.length]);
      const inst = cc.instantiateModelsToScene((n) => n, false, { doNotInstantiate: false });
      const root = new TransformNode(`tile${i}`, this.scene);
      inst.rootNodes.forEach((r) => (r.parent = root));
      root.scaling.setAll(scale);
      root.position.z = i * this.tileLen;
      root.getChildMeshes().forEach((m) => { m.isPickable = false; m.freezeWorldMatrix(); m.doNotSyncBoundingInfo = true; });
      this.tiles.push(root);
    }
    // segni di corsia
    const lineMat = new StandardMaterial('lane', this.scene);
    lineMat.emissiveColor = new Color3(0.95, 0.92, 0.8);
    lineMat.disableLighting = true;
    lineMat.alpha = 0.55;
    for (const x of [-LANE_W / 2, LANE_W / 2]) {
      const line = MeshBuilder.CreateGround(`line${x}`, { width: 0.08, height: 400 }, this.scene);
      line.material = lineMat;
      line.position.set(x, 0.03, 180);
      line.isPickable = false;
    }
    // oggetti ai lati della strada
    const sideKinds = ['container_red', 'streetlight', 'trash_bags', 'wheels', 'container_green', 'streetlight', 'pallet', 'hydrant', 'couch', 'cinder', 'cone'];
    const sideInst = await Promise.all(Array.from({ length: 22 }, (_, i) => this.assets.instance(sideKinds[i % sideKinds.length])));
    for (let i = 0; i < 22; i++) {
      const k = sideKinds[i % sideKinds.length];
      const inst = sideInst[i];
      const isBig = k.startsWith('container');
      fitHeight(inst, isBig ? 2.6 : k === 'streetlight' ? 4.5 : 0.9);
      const side = i % 2 === 0 ? -1 : 1;
      inst.root.position.set(side * (isBig ? 8.2 : 6.2 + (i % 3) * 0.4), 0, i * 5.5);
      inst.root.rotation.y = side > 0 ? Math.PI : 0;
      this.props.push(inst.root);
    }
  }

  private makeTracers() {
    const mat = new StandardMaterial('tracer', this.scene);
    mat.emissiveColor = new Color3(1, 0.85, 0.4);
    mat.disableLighting = true;
    this.tracerBase = MeshBuilder.CreateBox('tracer', { width: 0.09, height: 0.09, depth: 0.9 }, this.scene);
    this.tracerBase.material = mat;
    this.tracerBase.isPickable = false;
    this.tracerBase.setEnabled(false);
  }

  private particleTexture() {
    const t = new DynamicTexture('spark', { width: 64, height: 64 }, this.scene, false);
    const ctx = t.getContext() as CanvasRenderingContext2D;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.4, 'rgba(255,220,150,0.8)');
    g.addColorStop(1, 'rgba(255,120,40,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    t.update();
    t.hasAlpha = true;
    return t;
  }

  private makeParticles() {
    const tex = this.particleTexture();
    this.flashPS = new ParticleSystem('hits', 400, this.scene);
    this.flashPS.particleTexture = tex;
    this.flashPS.minSize = 0.12; this.flashPS.maxSize = 0.3;
    this.flashPS.minLifeTime = 0.08; this.flashPS.maxLifeTime = 0.22;
    this.flashPS.minEmitPower = 2; this.flashPS.maxEmitPower = 5;
    this.flashPS.direction1 = new Vector3(-1, 1, -1); this.flashPS.direction2 = new Vector3(1, 2, 0.3);
    this.flashPS.emitRate = 0;
    this.flashPS.blendMode = ParticleSystem.BLENDMODE_ADD;
    this.flashPS.start();

    this.boomPS = new ParticleSystem('boom', 600, this.scene);
    this.boomPS.particleTexture = tex;
    this.boomPS.minSize = 0.6; this.boomPS.maxSize = 1.8;
    this.boomPS.minLifeTime = 0.25; this.boomPS.maxLifeTime = 0.7;
    this.boomPS.minEmitPower = 4; this.boomPS.maxEmitPower = 10;
    this.boomPS.direction1 = new Vector3(-1, 0.6, -1); this.boomPS.direction2 = new Vector3(1, 2.2, 1);
    this.boomPS.gravity = new Vector3(0, -6, 0);
    this.boomPS.color1 = new Color4(1, 0.8, 0.3, 1); this.boomPS.color2 = new Color4(1, 0.35, 0.1, 1);
    this.boomPS.colorDead = new Color4(0.2, 0.2, 0.2, 0);
    this.boomPS.emitRate = 0;
    this.boomPS.blendMode = ParticleSystem.BLENDMODE_ADD;
    this.boomPS.start();
  }

  private burst(ps: ParticleSystem, pos: Vector3, count: number) {
    ps.emitter = pos.clone();
    ps.manualEmitCount = count;
  }

  private async setGun(id: WeaponId) {
    if (this.gunId === id) return;
    this.gunId = id;
    this.gun?.dispose();
    const g = await this.assets.instance(GUN_MODEL[id]);
    const hand = findNode(this.hero.root, /fist\.?r|hand\.?r|wrist\.?r|lowerarm\.?r/i);
    fitHeight(g, 0.28);
    if (hand) {
      // la scala del mondo dell'arma deve restare quella voluta, qualunque sia la scala delle ossa
      const wanted = g.root.scaling.x;
      hand.computeWorldMatrix(true);
      const hs = hand.absoluteScaling.x || 1;
      g.root.parent = hand;
      g.root.position.set(0, 0, 0);
      g.root.rotationQuaternion = null;
      g.root.rotation.set(0, Math.PI / 2, 0);
      g.root.scaling.setAll(wanted / hs);
    } else {
      g.root.parent = this.hero.root;
      g.root.position.set(0.3, 1.1, 0.4);
    }
    this.gun = g.root;
  }

  sync(sim: RunSim, dt: number) {
    const pz = sim.playerZ;
    // eroe
    this.hero.root.position.set(sim.playerX, 0, pz);
    this.setGun(sim.weapon);
    // camera da dietro e dall'alto, segue con morbidezza
    const shakeX = (Math.random() - 0.5) * this.shake;
    const shakeY = (Math.random() - 0.5) * this.shake;
    this.shake = Math.max(0, this.shake - dt * 1.5);
    this.camera.position.set(sim.playerX * 0.35 + shakeX, 8.5 + shakeY, pz - 7.5);
    this.camera.setTarget(new Vector3(sim.playerX * 0.25, 0, pz + 9));

    // strada infinita: ricicla le piastrelle rimaste indietro
    for (const t of this.tiles) {
      if (t.position.z + this.tileLen < pz - 10) {
        t.position.z += this.tiles.length * this.tileLen;
        t.getChildMeshes().forEach((m) => { m.unfreezeWorldMatrix(); m.computeWorldMatrix(true); m.freezeWorldMatrix(); });
      }
    }
    for (const p of this.props) if (p.position.z < pz - 10) p.position.z += 22 * 5.5;

    this.syncZombies(sim, dt);
    this.syncObjects(sim);
    this.syncBullets(sim);

    for (const e of sim.drainEvents()) {
      if (e.type === 'explosion') {
        this.burst(this.boomPS, new Vector3(e.x, 0.8, e.z), 90);
        this.shake = Math.min(0.35, this.shake + 0.25);
      } else if (e.type === 'playerHurt') {
        this.shake = Math.min(0.4, this.shake + 0.2);
      } else if (e.type === 'zombieDied') {
        const z = sim.zombies.find((q) => q.id === e.id);
        if (z) this.burst(this.flashPS, new Vector3(z.x, 1, z.z), 14);
      }
    }
  }

  private syncZombies(sim: RunSim, dt: number) {
    for (const k of Object.keys(this.crowdItems) as ZombieKind[]) this.crowdItems[k].length = 0;
    const live = new Set<number>();
    for (const z of sim.zombies) {
      live.add(z.id);
      const crowd = this.crowds[z.kind];
      let clip = z.kind === 'crawler' ? 'Crawl' : z.kind === 'runner' ? 'Run' : 'Walk';
      let loop = true;
      let startedAt = z.id * 0.37;
      if (!z.alive) {
        if (!this.deathAt.has(z.id)) this.deathAt.set(z.id, crowd.time);
        clip = 'Death';
        loop = false;
        startedAt = this.deathAt.get(z.id)!;
      }
      // sobbalzo breve quando viene colpito
      const bump = z.alive && sim.time - z.hitAt < 0.07 ? 1.07 : 1;
      this.crowdItems[z.kind].push({ x: z.x, z: z.z, yaw: 0, clip, loop, startedAt, scale: bump });

      // segnale di cambio corsia (0,5 s prima)
      const warning = z.alive && z.switchAt > 0 && z.switchAt > sim.time;
      let w = this.warns.get(z.id);
      if (warning && !w) {
        w = MeshBuilder.CreateDisc('warn', { radius: 0.55, tessellation: 3 }, this.scene);
        w.material = this.warnMat;
        w.isPickable = false;
        this.warns.set(z.id, w);
      }
      if (w) {
        if (!warning) {
          w.dispose();
          this.warns.delete(z.id);
        } else {
          w.position.set(laneX(z.switchTo), 0.06, z.z);
          w.rotation.set(Math.PI / 2, z.switchTo > z.lane ? Math.PI / 2 : -Math.PI / 2, 0);
        }
      }
    }
    for (const k of Object.keys(this.crowds) as ZombieKind[]) this.crowds[k].update(this.crowdItems[k], dt);
    for (const id of this.deathAt.keys()) if (!live.has(id)) this.deathAt.delete(id);
    for (const [id, w] of this.warns) if (!live.has(id)) { w.dispose(); this.warns.delete(id); }
  }

  private async makeObject(o: WorldObject): Promise<OView> {
    const model = o.kind === 'chest' ? 'chest' : o.kind === 'safe' ? 'chest_special' : o.kind === 'barrel' ? 'barrel' : 'barrier_traffic';
    const inst = await this.assets.instance(model);
    const h = o.kind === 'safe' ? 1.5 : o.kind === 'chest' ? 1.1 : o.kind === 'barrel' ? 1.2 : 1.1;
    fitHeight(inst, h);
    if (o.kind === 'barrier') inst.root.scaling.x *= 1.6;
    const view: OView = { root: inst.root, baseScale: inst.root.scaling.x };
    if (o.kind === 'chest' || o.kind === 'safe' || o.kind === 'barrier') {
      const bg = MeshBuilder.CreatePlane('bbg', { width: 1.6, height: 0.2 }, this.scene);
      bg.material = this.barBgMat;
      bg.billboardMode = Mesh.BILLBOARDMODE_ALL;
      const fill = MeshBuilder.CreatePlane('bfill', { width: 1.5, height: 0.13 }, this.scene);
      fill.material = this.barFillMat;
      fill.parent = bg;
      fill.position.z = -0.01;
      bg.isPickable = fill.isPickable = false;
      view.bar = { bg, fill };
    }
    return view;
  }

  private pendingObj = new Set<number>();
  private syncObjects(sim: RunSim) {
    const seen = new Set<number>();
    for (const o of sim.objects) {
      seen.add(o.id);
      const v = this.objViews.get(o.id);
      if (!v) {
        if (!this.pendingObj.has(o.id)) {
          this.pendingObj.add(o.id);
          this.makeObject(o).then((view) => {
            this.pendingObj.delete(o.id);
            if (!sim.objects.some((q) => q.id === o.id)) {
              view.root.dispose();
              view.bar?.bg.dispose();
              return;
            }
            this.objViews.set(o.id, view);
          });
        }
        continue;
      }
      v.root.position.set(laneX(o.lane), 0, o.z);
      // sobbalzo quando viene colpito
      const since = sim.time - o.hitAt;
      const bump = since < 0.08 ? 1.08 : 1;
      v.root.scaling.setAll(v.baseScale * bump);
      if (v.bar) {
        const top = o.kind === 'safe' ? 2.1 : 1.7;
        v.bar.bg.position.set(laneX(o.lane), top, o.z);
        const f = Math.max(0, o.hp / o.maxHp);
        v.bar.fill.scaling.x = Math.max(0.001, f);
        v.bar.fill.position.x = -(1 - f) * 0.75;
        v.bar.bg.setEnabled(o.hp < o.maxHp || o.kind !== 'barrier');
      }
      if (since < 0.05) this.burst(this.flashPS, new Vector3(laneX(o.lane), 0.8, o.z - 0.4), 3);
    }
    for (const [id, v] of this.objViews) {
      if (!seen.has(id)) {
        this.burst(this.boomPS, v.root.position.add(new Vector3(0, 0.7, 0)), 30);
        v.root.dispose();
        v.bar?.bg.dispose();
        this.objViews.delete(id);
      }
    }
  }

  private syncBullets(sim: RunSim) {
    let i = 0;
    for (const b of sim.bullets) {
      let t = this.tracers[i];
      if (!t) {
        t = this.tracerBase.createInstance(`t${i}`);
        t.isPickable = false;
        this.tracers.push(t);
      }
      t.setEnabled(true);
      t.position.set(b.x, 1.05, b.z);
      t.scaling.z = b.weapon === 'rifle' ? 2.2 : 1;
      i++;
    }
    for (; i < this.tracers.length; i++) this.tracers[i].setEnabled(false);
  }

  /** Svuota la scena dagli oggetti della partita precedente (nuova partita). */
  reset() {
    this.deathAt.clear();
    for (const w of this.warns.values()) w.dispose();
    this.warns.clear();
    for (const [id, v] of this.objViews) {
      v.root.dispose();
      v.bar?.bg.dispose();
      this.objViews.delete(id);
    }
    this.pendingObj.clear();
    this.shake = 0;
  }

  dispose() {
    this.scene.dispose();
  }
}

export function textureFromCanvas(scene: Scene, draw: (ctx: CanvasRenderingContext2D) => void, size = 128) {
  const t = new DynamicTexture('dt', { width: size, height: size }, scene, false, Texture.TRILINEAR_SAMPLINGMODE);
  draw(t.getContext() as CanvasRenderingContext2D);
  t.update();
  return t;
}
