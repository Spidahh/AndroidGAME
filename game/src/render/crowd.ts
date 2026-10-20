// Folla di zombie con Vertex Animation Texture: tutte le istanze di un tipo si disegnano
// con poche chiamate, e le animazioni sono calcolate dalla GPU (niente scheletri per istanza).
import {
  Scene, Mesh, Matrix, Quaternion, Vector3, BakedVertexAnimationManager, VertexAnimationBaker, AnimationGroup, TransformNode, Color3, PBRMaterial, StandardMaterial,
} from '@babylonjs/core';
import { Assets, fitHeight } from './assets';

const SAMPLE_FPS = 30;

export interface ClipInfo {
  start: number; // riga di partenza nella texture
  end: number;
  fps: number;
  duration: number;
}

export interface CrowdItem {
  x: number;
  y?: number;
  z: number;
  yaw: number;
  clip: string;
  /** tempo (s, orologio della folla) in cui la clip è iniziata: serve per le clip non cicliche */
  startedAt: number;
  loop: boolean;
  scale: number;
}

export class Crowd {
  private meshes: Mesh[] = [];
  private managers: BakedVertexAnimationManager[] = [];
  clips = new Map<string, ClipInfo>();
  private rest = Matrix.Identity();
  private restInv = Matrix.Identity();
  // capacità iniziale ampia: ricreare i buffer a metà partita provoca scatti
  private matrices = new Float32Array(16 * 160);
  private settings = new Float32Array(4 * 160);
  private capacity = 160;
  time = 0;
  private bound = false;

  constructor(private scene: Scene, private assets: Assets, private model: string, private height: number, private wanted: string[], private tint?: Color3) {}

  async init() {
    const inst = await this.assets.instance(this.model);
    fitHeight(inst, this.height);
    inst.root.position.setAll(0);
    inst.root.rotation.y = Math.PI; // guarda verso -Z (verso il giocatore)
    inst.root.computeWorldMatrix(true);
    inst.root.getDescendants(false).forEach((n) => (n as TransformNode).computeWorldMatrix?.(true));

    const skinned = inst.meshes.filter((m): m is Mesh => m instanceof Mesh && !!m.skeleton && m.getTotalVertices() > 0);
    // clip disponibili, nell'ordine richiesto
    const groups: [string, AnimationGroup][] = [];
    for (const name of this.wanted) {
      const g = inst.anims.get(name);
      if (g) groups.push([name, g]);
    }
    let row = 0;
    const frameLists: { name: string; frames: number[] }[] = [];
    for (const [name, g] of groups) {
      const frames: number[] = [];
      const step = 60 / SAMPLE_FPS; // il loader glTF usa 60 frame/s
      for (let f = g.from; f <= g.to + 0.001; f += step) frames.push(f);
      frameLists.push({ name, frames });
      this.clips.set(name, { start: row, end: row + frames.length - 1, fps: SAMPLE_FPS, duration: frames.length / SAMPLE_FPS });
      row += frames.length;
    }

    for (const mesh of skinned) {
      const skeleton = mesh.skeleton!;
      const floatsPerFrame = (skeleton.bones.length + 1) * 16;
      const data = new Float32Array(floatsPerFrame * row);
      let r = 0;
      for (const { name, frames } of frameLists) {
        const g = groups.find(([n]) => n === name)![1];
        g.start(false, 1, g.from, g.to);
        g.pause();
        for (const f of frames) {
          g.goToFrame(f);
          inst.root.getDescendants(false).forEach((n) => (n as TransformNode).computeWorldMatrix?.(true));
          skeleton.prepare(true);
          const mats = skeleton.getTransformMatrices(mesh);
          data.set(mats.subarray(0, floatsPerFrame), r * floatsPerFrame);
          r++;
        }
        g.stop();
      }
      const baker = new VertexAnimationBaker(this.scene, mesh);
      const manager = new BakedVertexAnimationManager(this.scene);
      manager.texture = baker.textureFromBakedVertexData(data);
      mesh.bakedVertexAnimationManager = manager;
      this.managers.push(manager);
    }

    // la matrice "a riposo" (scala, rotazione glTF) resta sulla mesh; le istanze la riusano
    for (const mesh of skinned) {
      mesh.computeWorldMatrix(true);
      const world = mesh.getWorldMatrix().clone();
      mesh.parent = null;
      mesh.freezeWorldMatrix(world);
      mesh.thinInstanceRegisterAttribute('bakedVertexAnimationSettingsInstanced', 4);
      mesh.alwaysSelectAsActiveMesh = true; // l'ingombro cambia con le istanze
      mesh.isPickable = false;
      this.meshes.push(mesh);
      this.rest = world;
    }
    this.rest.invertToRef(this.restInv);
    // colore distintivo del tipo di zombie (materiale proprio della folla)
    if (this.tint) {
      for (const mesh of this.meshes) {
        const mat = mesh.material?.clone(`${mesh.material.name}-${this.model}-tint`);
        if (mat instanceof PBRMaterial) mat.albedoColor = mat.albedoColor.multiply(this.tint);
        else if (mat instanceof StandardMaterial) mat.diffuseColor = mat.diffuseColor.multiply(this.tint);
        if (mat) mesh.material = mat;
      }
    }
    // il resto del modello originale (nodi, scheletri) non serve più
    for (const [, g] of inst.anims) g.dispose();
    inst.root.getChildMeshes(false).forEach((m) => {
      if (!this.meshes.includes(m as Mesh)) m.dispose();
    });
    this.update([]);
  }

  private tmpM = new Matrix();
  private tmpW = new Matrix();
  // oggetti temporanei riusati: niente allocazioni per istanza a ogni frame (meno raccolta della memoria)
  private tmpS = new Vector3();
  private tmpP = new Vector3();
  private tmpQ = new Quaternion();
  private lastCount = -1;

  /** Aggiorna tutte le istanze. Va chiamata ogni frame. */
  update(items: CrowdItem[], dt = 0) {
    this.time += dt;
    for (const m of this.managers) m.time = this.time;
    let grown = !this.bound;
    if (items.length > this.capacity) {
      while (this.capacity < items.length) this.capacity *= 2;
      this.matrices = new Float32Array(16 * this.capacity);
      this.settings = new Float32Array(4 * this.capacity);
      grown = true;
    }
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      // finale = rest × (R · S · T) espresso nello spazio locale della mesh: inst = rest⁻¹... (convenzione vettore-riga)
      this.tmpS.set(it.scale, it.scale, it.scale);
      this.tmpP.set(it.x, it.y ?? 0, it.z);
      Quaternion.FromEulerAnglesToRef(0, it.yaw, 0, this.tmpQ);
      Matrix.ComposeToRef(this.tmpS, this.tmpQ, this.tmpP, this.tmpW);
      // v·inst·rest = v·rest·W  →  inst = rest·W·rest⁻¹
      this.rest.multiplyToRef(this.tmpW, this.tmpM);
      this.tmpM.multiplyToRef(this.restInv, this.tmpM);
      this.tmpM.copyToArray(this.matrices, i * 16);
      const c = this.clips.get(it.clip) ?? this.clips.values().next().value!;
      const total = c.end - c.start + 1;
      let start = c.start;
      let end = c.end;
      let offset = 0;
      if (!it.loop) {
        const elapsed = this.time - it.startedAt;
        if (elapsed >= c.duration - 1 / c.fps) {
          start = end = c.end; // resta sull'ultimo fotogramma
        } else {
          // fa partire la clip dal primo fotogramma nel momento giusto
          const phase = ((this.time * c.fps) / total) % 1;
          offset = Math.floor(elapsed * c.fps) - phase * (total - 1);
        }
      } else {
        offset = (it.startedAt * 7.31) % total; // sfasamento per non far marciare tutti insieme
      }
      const o = i * 4;
      this.settings[o] = start;
      this.settings[o + 1] = end;
      this.settings[o + 2] = offset;
      this.settings[o + 3] = c.fps;
    }
    // folla vuota e già vuota: niente da caricare sulla scheda video
    if (!grown && items.length === 0 && this.lastCount === 0) return;
    this.lastCount = items.length;
    for (const mesh of this.meshes) {
      if (grown) {
        mesh.thinInstanceSetBuffer('matrix', this.matrices, 16, false);
        mesh.thinInstanceSetBuffer('bakedVertexAnimationSettingsInstanced', this.settings, 4, false);
      } else {
        mesh.thinInstanceBufferUpdated('matrix');
        mesh.thinInstanceBufferUpdated('bakedVertexAnimationSettingsInstanced');
      }
      mesh.thinInstanceCount = items.length;
      mesh.isVisible = items.length > 0;
    }
    this.bound = true;
  }
}
