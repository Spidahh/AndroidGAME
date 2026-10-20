// Ambiente della Corsa: strada infinita, marciapiedi, oggetti ai lati, palazzi sullo sfondo, luce della zona.
import {
  Scene, TransformNode, Vector3, Color3, Color4, MeshBuilder, StandardMaterial, Mesh, HemisphericLight, DirectionalLight, InstancedMesh,
} from '@babylonjs/core';
import { Assets, fitHeight } from './assets';
import { canvasTexture } from './effects';
import { LANE_W } from '../m1/defs';

export interface ZoneLook {
  sky: Color3;
  fog: [number, number];
  sun: Color3;
  sunIntensity: number;
  hemi: number;
  ground: Color3;
  building: Color3[];
}

export const ZONES: Record<string, ZoneLook> = {
  Periferia: { sky: new Color3(0.56, 0.7, 0.8), fog: [40, 95], sun: new Color3(1, 0.95, 0.85), sunIntensity: 1.15, hemi: 0.75, ground: new Color3(0.42, 0.5, 0.33), building: [new Color3(0.78, 0.66, 0.52), new Color3(0.62, 0.66, 0.7), new Color3(0.7, 0.5, 0.42)] },
  Centro: { sky: new Color3(0.6, 0.63, 0.66), fog: [35, 85], sun: new Color3(0.95, 0.93, 0.9), sunIntensity: 0.95, hemi: 0.8, ground: new Color3(0.4, 0.4, 0.4), building: [new Color3(0.55, 0.57, 0.62), new Color3(0.68, 0.62, 0.55), new Color3(0.45, 0.48, 0.52)] },
  Porto: { sky: new Color3(0.86, 0.6, 0.45), fog: [32, 80], sun: new Color3(1, 0.75, 0.55), sunIntensity: 1.05, hemi: 0.65, ground: new Color3(0.36, 0.38, 0.42), building: [new Color3(0.5, 0.44, 0.42), new Color3(0.36, 0.42, 0.5), new Color3(0.6, 0.38, 0.3)] },
};

const SEG = 6; // passo degli oggetti ai lati
const SEG_COUNT = 22;

export class Environment {
  private tiles: TransformNode[] = [];
  private tileLen = 11;
  private side: TransformNode[] = [];
  private buildings: InstancedMesh[] = [];
  private ground!: Mesh;
  private under!: Mesh;
  hemi!: HemisphericLight;
  sun!: DirectionalLight;

  constructor(private scene: Scene, private assets: Assets) {}

  async build(zone: string) {
    const look = ZONES[zone] ?? ZONES.Periferia;
    const s = this.scene;
    s.clearColor = new Color4(look.sky.r, look.sky.g, look.sky.b, 1);
    s.fogMode = Scene.FOGMODE_LINEAR;
    s.fogColor = look.sky.clone();
    s.fogStart = look.fog[0];
    s.fogEnd = look.fog[1];
    this.hemi = new HemisphericLight('hemi', new Vector3(0.2, 1, 0.1), s);
    this.hemi.intensity = look.hemi;
    this.hemi.groundColor = new Color3(0.35, 0.33, 0.3);
    this.sun = new DirectionalLight('sun', new Vector3(-0.4, -1, 0.5), s);
    this.sun.intensity = look.sunIntensity;
    this.sun.diffuse = look.sun;

    // terreno oltre i marciapiedi
    const gm = new StandardMaterial('ground', s);
    gm.diffuseColor = look.ground;
    gm.specularColor = Color3.Black();
    this.ground = MeshBuilder.CreateGround('ground', { width: 140, height: 260 }, s);
    this.ground.material = gm;
    this.ground.position.y = -0.05;
    this.ground.isPickable = false;

    // fondo scuro sotto la strada: le crepe dell'asfalto non devono mostrare il prato
    const under = MeshBuilder.CreateGround('under', { width: 11, height: 260 }, s);
    const um = new StandardMaterial('under', s);
    um.diffuseColor = new Color3(0.13, 0.13, 0.14);
    um.specularColor = Color3.Black();
    under.material = um;
    under.position.y = -0.04; // sopra il prato (-0.05), sotto l'asfalto
    under.isPickable = false;
    this.under = under;

    // strada
    const c = await this.assets.load('street');
    const probe = c.instantiateModelsToScene((n) => n, false, { doNotInstantiate: false });
    const tmp = new TransformNode('probe', s);
    probe.rootNodes.forEach((r) => (r.parent = tmp));
    tmp.computeWorldMatrix(true);
    const { min, max } = tmp.getHierarchyBoundingVectors(true);
    tmp.dispose();
    const scale = 11 / (max.x - min.x || 1);
    this.tileLen = (max.z - min.z) * scale;
    const kinds = ['street', 'street', 'street_crack1', 'street', 'crosswalk', 'street_crack2'];
    const count = Math.ceil(120 / this.tileLen) + 2;
    for (let i = 0; i < count; i++) {
      const cc = await this.assets.load(kinds[i % kinds.length]);
      const inst = cc.instantiateModelsToScene((n) => n, false, { doNotInstantiate: true });
      const root = new TransformNode(`tile${i}`, s);
      inst.rootNodes.forEach((r) => (r.parent = root));
      root.scaling.setAll(scale);
      root.position.z = i * this.tileLen;
      root.getChildMeshes().forEach((m) => {
        m.isPickable = false;
        m.receiveShadows = false;
      });
      this.tiles.push(root);
    }
    // linee di corsia tratteggiate
    const lineMat = new StandardMaterial('lane', s);
    lineMat.emissiveColor = new Color3(0.95, 0.92, 0.8);
    lineMat.disableLighting = true;
    lineMat.alpha = 0.6;
    for (const x of [-LANE_W / 2, LANE_W / 2]) {
      const line = MeshBuilder.CreateGround(`line${x}`, { width: 0.09, height: 600 }, s);
      line.material = lineMat;
      line.position.set(x, 0.035, 260);
      line.isPickable = false;
    }

    // oggetti ai lati, ripetuti
    const sideKinds: [string, number, number][] = [
      ['streetlight', 4.4, 6.0], ['dumpster', 1.3, 6.5], ['tree', 4, 8.5], ['trash_bags', 0.8, 6.2], ['container_red', 2.6, 8.8], ['hydrant', 0.8, 6.0],
      ['streetlight', 4.4, 6.0], ['tires', 0.9, 6.6], ['tree2', 4.2, 8.2], ['pallet', 0.5, 6.4], ['container_green', 2.6, 8.8], ['couch', 1, 6.6], ['gas_tank', 1.6, 7.6],
    ];
    const insts = await Promise.all(Array.from({ length: SEG_COUNT }, (_, i) => this.assets.instance(sideKinds[i % sideKinds.length][0])));
    insts.forEach((inst, i) => {
      const [, h, x] = sideKinds[i % sideKinds.length];
      fitHeight(inst, h);
      const sideSign = i % 2 === 0 ? -1 : 1;
      inst.root.position.set(sideSign * x, 0, i * SEG);
      inst.root.rotation.y = sideSign > 0 ? -Math.PI / 2 : Math.PI / 2;
      this.side.push(inst.root);
    });

    // palazzi semplici sullo sfondo, con finestre
    const winTex = canvasTexture(s, 'windows', 128, (ctx, size) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = 'rgba(40,50,60,0.75)';
      for (let y = 10; y < size; y += 32) for (let x = 10; x < size; x += 30) ctx.fillRect(x, y, 16, 20);
    }, false);
    look.building.forEach((col, k) => {
      const mat = new StandardMaterial(`bld${k}`, s);
      mat.diffuseTexture = winTex;
      mat.diffuseColor = col;
      mat.specularColor = Color3.Black();
      const base = MeshBuilder.CreateBox(`bldBase${k}`, { size: 1 }, s);
      base.material = mat;
      base.isPickable = false;
      base.setEnabled(false);
      for (let i = 0; i < 12; i++) {
        const b = base.createInstance(`bld${k}-${i}`);
        const sideSign = (i + k) % 2 === 0 ? -1 : 1;
        const w = 7 + ((i * 37 + k * 13) % 6);
        const h = 7 + ((i * 53 + k * 29) % 14);
        b.scaling.set(w, h, 8);
        b.position.set(sideSign * (15 + ((i * 7) % 5)), h / 2, (i * 3 + k) * 7);
        this.buildings.push(b);
      }
    });
  }

  update(pz: number) {
    for (const t of this.tiles) if (t.position.z + this.tileLen < pz - 12) t.position.z += this.tiles.length * this.tileLen;
    for (const p of this.side) if (p.position.z < pz - 12) p.position.z += SEG_COUNT * SEG;
    for (const b of this.buildings) if (b.position.z < pz - 20) b.position.z += 36 * 7;
    this.ground.position.z = pz + 60;
    this.under.position.z = pz + 60;
  }
}
