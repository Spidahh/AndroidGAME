// Foglio di confronto: tutti i modelli candidati affiancati, stessa luce e stessa scala.
// Serve a decidere se gli stili dei pacchetti stanno bene insieme. Aprire con ?view=assets
import { Engine, Scene, Matrix, ArcRotateCamera, Vector3, HemisphericLight, DirectionalLight, Color3, Color4, MeshBuilder, StandardMaterial } from '@babylonjs/core';
import { Assets, play, fitHeight } from './render/assets';

const GROUPS: { title: string; items: [string, number][] }[] = [
  { title: 'Eroi (Zombie Kit)', items: [['hero_matt', 1.8], ['hero_lis', 1.75], ['hero_sam', 1.8], ['hero_shaun', 1.8]] },
  { title: 'Eroi (Toon Shooter)', items: [['hero_soldier', 1.8], ['hero_hazmat', 1.8], ['hero_enemy', 1.8]] },
  { title: 'Zombie', items: [['zombie_basic', 1.75], ['zombie_chubby', 1.7], ['zombie_arm', 2.6], ['zombie_half', 0.9], ['dog', 0.8]] },
  { title: 'Oggetti', items: [['chest', 1.1], ['chest_special', 1.5], ['barrel', 1.2], ['barrier_traffic', 1.1], ['barrier_plastic', 1.1], ['cone', 0.7], ['trash_bags', 0.9], ['wheels', 0.9]] },
  { title: 'Strada', items: [['container_red', 2.6], ['container_green', 2.6], ['streetlight', 4.5], ['hydrant', 0.8], ['couch', 1], ['watertower', 5]] },
];

export async function runContactSheet(engine: Engine, hud: HTMLElement) {
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.55, 0.68, 0.78, 1);
  const cam = new ArcRotateCamera('c', -Math.PI / 2, 1.05, 30, new Vector3(9, 1, 10), scene);
  cam.attachControl(engine.getRenderingCanvas()!, true);
  cam.wheelPrecision = 20;
  cam.pinchPrecision = 30;
  new HemisphericLight('h', new Vector3(0.2, 1, 0.1), scene).intensity = 0.75;
  const sun = new DirectionalLight('s', new Vector3(-0.4, -1, 0.5), scene);
  sun.intensity = 1.1;
  const g = MeshBuilder.CreateGround('g', { width: 80, height: 60 }, scene);
  const gm = new StandardMaterial('gm', scene);
  gm.diffuseColor = new Color3(0.42, 0.42, 0.44);
  g.material = gm;
  g.position.set(9, 0, 10);

  hud.innerHTML = `<div class="hint">Confronto asset — trascina per ruotare, pizzica per zoomare</div>`;
  const assets = new Assets(scene);
  const labels: { el: HTMLElement; pos: Vector3 }[] = [];
  let row = 0;
  for (const grp of GROUPS) {
    let col = 0;
    for (const [name, h] of grp.items) {
      const inst = await assets.instance(name);
      fitHeight(inst, h);
      inst.root.position.set(col * 3, 0, row * 5);
      play(inst, inst.anims.has('Idle') ? 'Idle' : [...inst.anims.keys()][0] ?? '');
      const el = document.createElement('div');
      el.className = 'label';
      el.textContent = name;
      hud.appendChild(el);
      labels.push({ el, pos: new Vector3(col * 3, Math.max(h, 1) + 0.4, row * 5) });
      col++;
    }
    row++;
  }
  scene.onAfterRenderObservable.add(() => {
    const w = engine.getRenderWidth();
    const h = engine.getRenderHeight();
    const k = engine.getRenderingCanvas()!.clientWidth / w;
    const vp = cam.viewport.toGlobal(w, h);
    for (const l of labels) {
      const q = Vector3.Project(l.pos, Matrix.Identity(), scene.getTransformMatrix(), vp);
      l.el.style.left = `${q.x * k}px`;
      l.el.style.top = `${q.y * k}px`;
    }
  });
  engine.runRenderLoop(() => scene.render());
}
