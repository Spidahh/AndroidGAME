// Schermate DOM: titolo, scelta livelli, HUD, pausa, risultato. Testi senza numeri da calcolare.
import { ICON, WEAPON_ICON } from './icons';
import { WEAPONS, AIRSTRIKE } from '../m1/defs';
import type { RunSim } from '../m1/sim';
import type { LevelDef } from '../m1/level';
import type { Profile } from '../profile';
import { audio } from '../audio';

const root = () => document.getElementById('hud')!;
const h = (html: string) => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild as HTMLElement;
};
const click = (el: HTMLElement | null, fn: () => void) =>
  el?.addEventListener('click', (e) => {
    e.stopPropagation();
    audio.play('ui_click', 0.6);
    fn();
  });

const PHASE_LABEL: Record<string, string> = { build: 'Costruisci la squadra', maintain: 'Tieni la squadra', precision: 'Scelte precise', pressure: 'Sotto pressione', wall: 'Prova finale' };

export function showLoading(text = 'Caricamento') {
  root().innerHTML = '';
  const el = h(`<div class="screen title"><div class="logo">HOLDOUT<span>CITY</span></div><div class="loading"><div class="loadbar"><i id="loadfill"></i></div><div id="loadtext">${text}</div></div></div>`);
  root().appendChild(el);
  return (f: number) => {
    const fill = document.getElementById('loadfill');
    if (fill) fill.style.width = `${Math.round(f * 100)}%`;
  };
}

export function showTitle(onPlay: () => void) {
  root().innerHTML = '';
  const el = h(`<div class="screen title">
    <div class="logo">HOLDOUT<span>CITY</span></div>
    <div class="tagline">I giochi delle pubblicità. Veri.</div>
    <button class="big" id="play">GIOCA</button>
    <div class="foot">Versione di prova · La Corsa</div>
  </div>`);
  root().appendChild(el);
  click(el.querySelector('#play'), onPlay);
}

export function showLevels(levels: LevelDef[], profile: Profile, onPick: (l: LevelDef) => void, onToggleSound: () => void) {
  root().innerHTML = '';
  const unlocked = (id: number) => id === 1 || (profile.levels[id - 1]?.completions ?? 0) > 0;
  const cards = levels
    .map((l) => {
      const rec = profile.levels[l.id];
      const open = unlocked(l.id);
      const stars = [0, 1, 2].map((i) => `<i class="st ${rec?.starFlags[i] ? 'on' : ''}">${ICON.star}</i>`).join('');
      return `<button class="lvl ${open ? '' : 'locked'} ${l.finale.kind === 'boss' ? 'boss' : ''}" data-id="${l.id}" ${open ? '' : 'disabled'}>
        <span class="num">${l.id}</span>
        <span class="lname">${l.name}</span>
        <span class="ltype">${l.finale.kind === 'boss' ? 'Capo' : PHASE_LABEL[l.phase]} · ${l.zone}</span>
        <span class="stars">${open ? stars : `<i class="lk">${ICON.lock}</i>`}</span>
      </button>`;
    })
    .join('');
  const el = h(`<div class="screen levels">
    <header><div class="ttl">La Corsa</div>
      <div class="res"><i>${ICON.materials}</i><b>${profile.materials}</b><i>${ICON.food}</i><b>${profile.food}</b></div>
      <button class="icon-btn ${profile.settings.sound ? '' : 'off'}" id="snd">${ICON.sound}</button></header>
    <div class="grid">${cards}</div>
  </div>`);
  root().appendChild(el);
  el.querySelectorAll<HTMLButtonElement>('.lvl:not(.locked)').forEach((b) => click(b, () => onPick(levels.find((l) => l.id === Number(b.dataset.id))!)));
  click(el.querySelector('#snd'), () => {
    onToggleSound();
    el.querySelector('#snd')!.classList.toggle('off');
  });
}

export class Hud {
  private el: HTMLElement;
  private prog: HTMLElement;
  private weapon: HTMLElement;
  private squad: HTMLElement;
  private strikeBtn: HTMLElement;
  private strikeFill: HTMLElement;
  private objective: HTMLElement;
  private objFill: HTMLElement;
  private objText: HTMLElement;
  private toastBox: HTMLElement;
  private lastWeapon = '';
  private lastSquad = -1;
  private lastObj = '';
  private lastReady = false;

  constructor(level: LevelDef, onPause: () => void, onStrike: () => void) {
    root().innerHTML = '';
    this.el = h(`<div class="hudwrap">
      <div class="hud-top">
        <button class="icon-btn" id="pause">${ICON.pause}</button>
        <div class="squadchip"><i>${ICON.soldier}</i><b id="squadn">3</b></div>
        <div class="bars"><div class="bar prog"><i></i><b class="flag"></b></div></div>
        <div class="weapon" id="weapon"></div>
      </div>
      <div class="objective" id="obj"><span id="objtext"></span><div class="bar small"><i id="objfill"></i></div></div>
      <div class="toasts" id="toasts"></div>
      <div class="intro" id="intro"><b>${level.name}</b><span>${level.intro}</span></div>
      <button class="dash strike" id="strike">${ICON.airstrike}<i id="strikefill"></i></button>
    </div>`);
    root().appendChild(this.el);
    this.prog = this.el.querySelector('.prog > i')!;
    this.weapon = this.el.querySelector('#weapon')!;
    this.squad = this.el.querySelector('#squadn')!;
    this.strikeBtn = this.el.querySelector('#strike')!;
    this.strikeFill = this.el.querySelector('#strikefill')!;
    this.objective = this.el.querySelector('#obj')!;
    this.objFill = this.el.querySelector('#objfill')!;
    this.objText = this.el.querySelector('#objtext')!;
    this.toastBox = this.el.querySelector('#toasts')!;
    click(this.el.querySelector('#pause'), onPause);
    this.strikeBtn.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      onStrike();
    });
    setTimeout(() => this.el.querySelector('#intro')?.classList.add('gone'), 3800);
  }

  toast(text: string, kind: 'good' | 'bad' | 'info' = 'info', icon = '') {
    const t = h(`<div class="toast ${kind}">${icon ? `<i>${icon}</i>` : ''}<span>${text}</span></div>`);
    this.toastBox.appendChild(t);
    setTimeout(() => t.classList.add('out'), 1700);
    setTimeout(() => t.remove(), 2200);
    while (this.toastBox.children.length > 3) this.toastBox.firstElementChild?.remove();
  }

  update(sim: RunSim) {
    this.prog.style.width = `${sim.progress * 100}%`;
    if (sim.squad !== this.lastSquad) {
      const up = sim.squad > this.lastSquad;
      this.lastSquad = sim.squad;
      this.squad.textContent = String(sim.squad);
      const chip = this.squad.parentElement!;
      chip.classList.remove('up', 'down');
      void chip.offsetWidth;
      chip.classList.add(up ? 'up' : 'down');
    }
    if (sim.weapon !== this.lastWeapon) {
      this.lastWeapon = sim.weapon;
      this.weapon.innerHTML = `<i>${WEAPON_ICON[sim.weapon]}</i><span>${WEAPONS[sim.weapon].name}</span>`;
      this.weapon.classList.remove('flash');
      void this.weapon.offsetWidth;
      this.weapon.classList.add('flash');
    }
    const ready = sim.strikeReady && sim.strikeLeft <= 0;
    if (ready !== this.lastReady) {
      this.lastReady = ready;
      this.strikeBtn.classList.toggle('ready', ready);
    }
    this.strikeFill.style.height = `${Math.min(1, sim.strikeCharge / AIRSTRIKE.killsToCharge) * 100}%`;
    // obiettivo del finale: muro da abbattere o capo
    let text = '';
    let frac = -1;
    if (sim.boss?.alive) {
      text = 'Capo dell’orda';
      frac = sim.boss.hp / sim.boss.maxHp;
    } else if (sim.wall?.alive && sim.wall.z - sim.playerZ < 40) {
      text = sim.stopped ? 'Abbatti il muro! L’orda arriva' : 'Il muro';
      frac = sim.wall.hp / sim.wall.maxHp;
    }
    if (text !== this.lastObj) {
      this.lastObj = text;
      this.objective.classList.toggle('show', !!text);
      this.objText.textContent = text;
    }
    if (frac >= 0) this.objFill.style.width = `${Math.max(0, frac) * 100}%`;
  }
}

export function showPause(onResume: () => void, onRetry: () => void, onQuit: () => void) {
  const el = h(`<div class="screen overlay"><div class="card"><h2>Pausa</h2>
    <button class="big" id="resume">Continua</button>
    <button class="sec" id="retry">Ricomincia</button>
    <button class="sec" id="quit">Esci</button></div></div>`);
  root().appendChild(el);
  click(el.querySelector('#resume'), () => {
    el.remove();
    onResume();
  });
  click(el.querySelector('#retry'), () => {
    el.remove();
    onRetry();
  });
  click(el.querySelector('#quit'), () => {
    el.remove();
    onQuit();
  });
}

export function showResult(opts: {
  won: boolean;
  reason: string;
  flags: [boolean, boolean, boolean];
  previous: [boolean, boolean, boolean];
  reward: { materials: number; food: number };
  hasNext: boolean;
  onNext: () => void;
  onRetry: () => void;
  onMenu: () => void;
}) {
  const labels = ['Arrivato', 'Cassaforte aperta', 'Almeno metà squadra salva'];
  const rows = labels
    .map((t, i) => `<div class="srow ${opts.flags[i] ? 'on' : ''} ${opts.flags[i] && !opts.previous[i] ? 'new' : ''}" style="--d:${0.35 + i * 0.35}s"><i>${ICON.star}</i><span>${t}</span></div>`)
    .join('');
  const el = h(`<div class="screen overlay result ${opts.won ? 'win' : 'lose'}"><div class="card">
    <h2>${opts.won ? 'Livello completato' : 'Sei caduto'}</h2>
    <div class="reason">${opts.reason}</div>
    ${opts.won ? `<div class="stars-big">${rows}</div>
      <div class="reward"><i>${ICON.materials}</i><b>+${opts.reward.materials}</b><i>${ICON.food}</i><b>+${opts.reward.food}</b></div>` : '<div class="tip">Riprovare è gratis. Prendi prima i barili soldati, evita quelli che non riesci ad abbattere.</div>'}
    ${opts.won && opts.hasNext ? '<button class="big" id="next">Avanti</button>' : ''}
    <button class="${opts.won ? 'sec' : 'big'}" id="retry">Riprova</button>
    <button class="sec" id="menu">Livelli</button>
  </div></div>`);
  root().appendChild(el);
  click(el.querySelector('#next'), opts.onNext);
  click(el.querySelector('#retry'), opts.onRetry);
  click(el.querySelector('#menu'), opts.onMenu);
  if (opts.won) {
    audio.play('win', 0.8);
    opts.flags.forEach((f, i) => f && setTimeout(() => audio.play('star', 0.6, 0), 400 + i * 350));
  } else audio.play('lose', 0.7);
}
