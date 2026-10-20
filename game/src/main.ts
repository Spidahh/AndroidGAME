import { Engine } from '@babylonjs/core';
import { RunSim, SimEvent } from './m1/sim';
import { RunView } from './m1/view';
import { LEVELS } from './m1/levels';
import { LevelDef, validateLevel } from './m1/level';
import { WEAPONS } from './m1/defs';
import { bindLaneInput } from './input';
import { runContactSheet } from './contact-sheet';
import { CONFIG } from './config';
import { audio } from './audio';
import { loadProfile, saveProfile, recordResult } from './profile';
import { showTitle, showLevels, showLoading, showPause, showResult, Hud } from './ui/screens';
import { WEAPON_ICON, ICON } from './ui/icons';

const params = new URLSearchParams(location.search);
const canvas = document.getElementById('game') as HTMLCanvasElement;
const profile = loadProfile();
audio.setEnabled(profile.settings.sound);

if (import.meta.env.DEV) for (const l of LEVELS) for (const err of validateLevel(l)) console.warn(err);

const QUALITY = { alta: 1, media: 0.75, bassa: 0.6 } as const;
type Quality = keyof typeof QUALITY;
const quality: Quality = (params.get('q') as Quality) in QUALITY ? (params.get('q') as Quality) : 'alta';
const engine = new Engine(canvas, true, { stencil: false, preserveDrawingBuffer: false, powerPreference: 'high-performance', adaptToDeviceRatio: false });
engine.setHardwareScalingLevel(1 / (Math.min(window.devicePixelRatio || 1, 2.5) * QUALITY[quality]));
window.addEventListener('resize', () => engine.resize());
document.addEventListener('pointerdown', () => void audio.unlock(), { passive: true });

// stato della partita in corso
let sim: RunSim | null = null;
let view: RunView | null = null;
let hud: Hud | null = null;
let paused = false;
let current: LevelDef | null = null;

bindLaneInput(
  canvas,
  (d) => {
    if (!paused) sim?.moveLane(d);
  },
  () => {
    if (!paused) sim?.airstrike();
  },
);
document.addEventListener('visibilitychange', () => {
  if (document.hidden && sim && !sim.over && !paused) pause();
});

engine.runRenderLoop(() => {
  if (view) view.scene.render();
});

if (params.get('view') === 'assets') {
  runContactSheet(engine, document.getElementById('hud')!);
} else if (params.get('level')) {
  void startLevel(LEVELS[Math.max(0, Math.min(LEVELS.length - 1, Number(params.get('level')) - 1))]);
} else {
  showTitle(() => menu());
}

function menu() {
  disposeRun();
  showLevels(
    LEVELS,
    profile,
    (l) => void startLevel(l),
    () => {
      profile.settings.sound = !profile.settings.sound;
      audio.setEnabled(profile.settings.sound);
      saveProfile(profile);
    },
  );
}

function disposeRun() {
  view?.dispose();
  view = null;
  sim = null;
  hud = null;
  paused = false;
}

async function startLevel(level: LevelDef) {
  disposeRun();
  current = level;
  const progress = showLoading(level.name);
  const v = new RunView(engine, level.zone);
  await v.load((d, t) => progress(d / t));
  const s = new RunSim(level, { seed: (Date.now() & 0xffff) + level.id, invulnerable: params.get('god') === '1', bonusSoldiers: Number(params.get('bonus') ?? 0) || undefined, startAt: import.meta.env.DEV ? Number(params.get('at') ?? 0) : 0 });
  view = v;
  sim = s;
  hud = new Hud(level, pause, () => sim?.airstrike());
  if (import.meta.env.DEV) Object.assign(window, { __scene: v.scene, __sim: () => sim });
  let dbg: HTMLElement | null = null;
  if (params.get('debug') === '1') {
    dbg = document.createElement('div');
    dbg.className = 'debug';
    document.getElementById('hud')!.appendChild(dbg);
  }

  const STEP = 1 / 60;
  let acc = 0;
  let frames = 0;
  let fpsAcc = 0;
  let worst = 0;
  let ended = false;
  v.scene.onBeforeRenderObservable.add(() => {
    if (sim !== s || view !== v) return;
    const dt = Math.min(engine.getDeltaTime() / 1000, 0.1);
    if (!paused) {
      acc += dt;
      while (acc >= STEP) {
        s.step(STEP);
        acc -= STEP;
      }
    }
    const events = s.drainEvents();
    v.sync(s, paused ? 0 : dt, events);
    hud?.update(s);
    for (const e of events) toastFor(e);
    if (s.over && !ended) {
      ended = true;
      setTimeout(() => {
        if (sim === s) finishLevel(level, s);
      }, s.status === 'won' ? 900 : 1300);
    }
    if (dbg) {
      frames++;
      fpsAcc += dt;
      worst = Math.max(worst, dt);
      if (fpsAcc >= 0.5) {
        dbg.textContent = `FPS ${Math.round(frames / fpsAcc)} (peggiore ${Math.round(worst * 1000)} ms)\nzombie ${s.zombies.filter((z) => z.alive).length}  squadra ${s.squad}  qualità ${quality}\nbuild ${CONFIG.build}`;
        frames = 0;
        fpsAcc = 0;
        worst = 0;
      }
    }
  });
}

function toastFor(e: SimEvent) {
  if (!hud) return;
  switch (e.type) {
    case 'weapon':
      hud.toast(WEAPONS[e.weapon].name, 'good', WEAPON_ICON[e.weapon]);
      break;
    case 'freeze':
      hud.toast('Orda congelata!', 'good');
      break;
    case 'airstrikeReady':
      hud.toast('Attacco aereo pronto', 'good', ICON.airstrike);
      break;
    case 'loot':
      hud.toast('Cassaforte aperta!', 'good', ICON.materials);
      break;
    case 'warn':
      if (e.kind === 'slam') hud.toast('Il capo colpisce! Cambia corsia', 'bad');
      break;
    case 'hint':
      hud.toast(e.text, 'info');
      break;
    case 'boss':
      hud.toast('Il capo dell’orda!', 'bad');
      break;
    default:
      break;
  }
}

function pause() {
  if (!sim || sim.over || paused) return;
  paused = true;
  showPause(
    () => (paused = false),
    () => {
      if (current) void startLevel(current);
    },
    () => menu(),
  );
}

function finishLevel(level: LevelDef, s: RunSim) {
  if (level.id === 0) return;
  const won = s.status === 'won';
  const previous = [...(profile.levels[level.id]?.starFlags ?? [false, false, false])] as [boolean, boolean, boolean];
  const flags = s.starFlags;
  const { reward } = recordResult(profile, level.id, won, flags, s.safeOpened ? 0.5 : 0);
  const idx = LEVELS.findIndex((l) => l.id === level.id);
  showResult({
    won,
    reason: s.endReason,
    flags,
    previous,
    reward,
    hasNext: idx < LEVELS.length - 1,
    onNext: () => void startLevel(LEVELS[idx + 1]),
    onRetry: () => void startLevel(level),
    onMenu: () => menu(),
  });
}
