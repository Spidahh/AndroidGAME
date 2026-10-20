// Etichette DOM proiettate dal mondo 3D (numeri sopra squadra, barili, portoni, capo).
// Testo nitido a qualunque risoluzione, pochi elementi riutilizzati (pool).
import { Scene, Vector3, Matrix, Camera } from '@babylonjs/core';

export interface Label {
  el: HTMLDivElement;
  used: boolean;
}

export class LabelLayer {
  private root: HTMLDivElement;
  private pool: Label[] = [];
  private frameUsed = 0;
  private tmp = new Vector3();
  private pos = new Vector3();
  private identity = Matrix.Identity();

  constructor(private scene: Scene, private camera: Camera) {
    this.root = document.createElement('div');
    this.root.className = 'labels3d';
    document.body.appendChild(this.root);
  }

  private k = 1;
  private w = 1;
  private h = 1;

  begin() {
    this.frameUsed = 0;
    // misure lette una volta per frame: leggere clientWidth dopo aver scritto gli stili forza il ricalcolo della pagina
    const eng = this.scene.getEngine();
    this.w = eng.getRenderWidth();
    this.h = eng.getRenderHeight();
    this.k = (eng.getRenderingCanvas()?.clientWidth ?? this.w) / this.w;
  }

  /** mostra un'etichetta nella posizione del mondo; 'cls' sceglie lo stile */
  put(x: number, y: number, z: number, html: string, cls: string) {
    const p = Vector3.ProjectToRef(this.pos.set(x, y, z), this.identity, this.scene.getTransformMatrix(), this.camera.viewport.toGlobal(this.w, this.h), this.tmp);
    if (p.z < 0 || p.z > 1) return;
    const k = this.k;
    let l = this.pool[this.frameUsed];
    if (!l) {
      const el = document.createElement('div');
      this.root.appendChild(el);
      l = { el, used: false };
      this.pool.push(l);
    }
    this.frameUsed++;
    if (l.el.dataset.html !== html) {
      l.el.innerHTML = html;
      l.el.dataset.html = html;
    }
    if (l.el.className !== `lbl ${cls}`) l.el.className = `lbl ${cls}`;
    const tr = `translate(${Math.round(p.x * k)}px, ${Math.round(p.y * k)}px) translate(-50%, -100%)`;
    if (l.el.style.transform !== tr) l.el.style.transform = tr;
    if (l.el.style.display) l.el.style.display = '';
  }

  end() {
    for (let i = this.frameUsed; i < this.pool.length; i++) if (this.pool[i].el.style.display !== 'none') this.pool[i].el.style.display = 'none';
  }

  dispose() {
    this.root.remove();
  }
}
