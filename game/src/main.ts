import { Engine } from '@babylonjs/core';
import { RunSim, WEAPONS } from './m1/sim';
import { RunView } from './m1/view';
import { bindLaneInput } from './input';
import { runContactSheet } from './contact-sheet';
import { CONFIG } from './config';

const params = new URLSearchParams(location.search);
const canvas = document.getElementById('game') as HTMLCanvasElement;
const hud = document.getElementById('hud')!;

// Qualità: scala di rendering rispetto ai pixel del dispositivo.
const QUALITY = { alta: 1, media: 0.75, bassa: 0.6 } as const;
type Quality = keyof typeof QUALITY;
let quality: Quality = (params.get('q') as Quality) in QUALITY ? (params.get('q') as Quality) : 'alta';

const engine = new Engine(canvas, true, { stencil: false, preserveDrawingBuffer: false, powerPreference: 'high-performance', adaptToDeviceRatio: false });
function applyQuality() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  engine.setHardwareScalingLevel(1 / (dpr * QUALITY[quality]));
}
applyQuality();
window.addEventListener('resize', () => engine.resize());

if (params.get('view') === 'assets') {
  runContactSheet(engine, hud);
} else {
  startRun();
}

async function startRun() {
  hud.innerHTML = `<div class="center"><h1>HOLDOUT CITY</h1><div id="load">Caricamento…</div></div>`;
  const view = new RunView(engine);
  await view.load((d, t) => {
    const el = document.getElementById('load');
    if (el) el.textContent = `Caricamento… ${Math.round((d / t) * 100)}%`;
  });

  let target = Number(params.get('z') ?? 25);
  const invulnerable = params.get('god') === '1';
  let sim = new RunSim({ targetZombies: target, seed: Date.now() & 0xffff, invulnerable });
  const debug = params.get('debug') !== '0';
  if (import.meta.env.DEV) Object.assign(window, { __scene: view.scene, __sim: () => sim });

  hud.innerHTML = `
    <div class="hud-top"><div class="bar" id="hp"><i></i></div><div class="weapon" id="weapon"></div></div>
    <div class="hint" id="hint">Scorri a destra o a sinistra per cambiare corsia</div>
    ${debug ? '<div class="debug" id="dbg"></div>' : ''}`;
  const hpEl = document.querySelector('#hp > i') as HTMLElement;
  const wEl = document.getElementById('weapon')!;
  const dbg = document.getElementById('dbg');
  const hint = document.getElementById('hint')!;
  setTimeout(() => (hint.style.opacity = '0'), 4000);

  if (dbg) {
    dbg.addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).dataset.act;
      if (b === 'z') {
        target = target >= 80 ? 20 : target + 20;
        sim.opts.targetZombies = target;
      }
      if (b === 'q') {
        quality = quality === 'alta' ? 'media' : quality === 'media' ? 'bassa' : 'alta';
        applyQuality();
      }
    });
  }

  bindLaneInput(canvas, (d) => sim.moveLane(d));

  const STEP = 1 / 60;
  let acc = 0;
  let lastWeapon = '';
  let fpsAcc = 0;
  let frames = 0;
  let fpsShown = 0;
  let worst = 0;

  view.scene.onBeforeRenderObservable.add(() => {
    const dt = Math.min(engine.getDeltaTime() / 1000, 0.1);
    acc += dt;
    while (acc >= STEP) {
      sim.step(STEP);
      acc -= STEP;
    }
    view.sync(sim, dt);

    hpEl.style.width = `${(sim.hp / sim.maxHp) * 100}%`;
    if (sim.weapon !== lastWeapon) {
      lastWeapon = sim.weapon;
      wEl.textContent = WEAPONS[sim.weapon].name;
      wEl.classList.remove('flash');
      void wEl.offsetWidth;
      wEl.classList.add('flash');
    }
    if (dbg) {
      frames++;
      fpsAcc += dt;
      worst = Math.max(worst, dt);
      if (fpsAcc >= 0.5) {
        fpsShown = Math.round(frames / fpsAcc);
        const zs = sim.zombies.filter((z) => z.alive).length;
        dbg.innerHTML = `FPS ${fpsShown}  (peggiore ${Math.round(worst * 1000)} ms)\nzombie ${zs}  proiettili ${sim.bullets.length}\nqualità ${quality}  build ${CONFIG.build}<button data-act="z">Zombie obiettivo: ${target}</button><button data-act="q">Qualità: ${quality}</button>`;
        frames = 0;
        fpsAcc = 0;
        worst = 0;
      }
    }
    if (sim.over && !document.getElementById('over')) {
      const el = document.createElement('div');
      el.className = 'center';
      el.id = 'over';
      el.innerHTML = `<h1>Sei caduto</h1><button id="again">Riprova</button>`;
      hud.appendChild(el);
      document.getElementById('again')!.onclick = () => {
        el.remove();
        view.reset();
        sim = new RunSim({ targetZombies: target, seed: Date.now() & 0xffff, invulnerable });
      };
    }
  });

  engine.runRenderLoop(() => view.scene.render());
}
