// Audio: effetti Kenney (CC0) + spari ed esplosioni sintetizzati con Web Audio.
import type { WeaponId } from './m1/defs';

const FILES = [
  'crate_hit1', 'crate_hit2', 'crate_break', 'metal_hit1', 'metal_hit2', 'metal_break', 'flesh1', 'flesh2', 'flesh3', 'hurt', 'zombie_die',
  'boom1', 'boom2', 'boom_big', 'pickup', 'power', 'loot', 'companion', 'ui_click', 'ui_select', 'ui_back', 'warn', 'win', 'lose', 'star', 'acid', 'flame',
] as const;
export type Sfx = (typeof FILES)[number];

class AudioManager {
  ctx?: AudioContext;
  private buffers = new Map<string, AudioBuffer>();
  private master?: GainNode;
  private sfxBus?: GainNode;
  private noise?: AudioBuffer;
  private playing = 0;
  enabled = true;

  /** Va chiamata al primo tocco (i browser bloccano l'audio prima di un gesto). */
  async unlock() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      return;
    }
    const ctx = new AudioContext();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0.9;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    this.master.connect(comp).connect(ctx.destination);
    this.sfxBus = ctx.createGain();
    this.sfxBus.gain.value = 0.8;
    this.sfxBus.connect(this.master);
    const n = ctx.createBuffer(1, ctx.sampleRate * 0.6, ctx.sampleRate);
    const d = n.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    this.noise = n;
    const base = `${import.meta.env.BASE_URL}audio/`;
    await Promise.all(
      FILES.map(async (f) => {
        try {
          const res = await fetch(`${base}${f}.ogg`);
          this.buffers.set(f, await ctx.decodeAudioData(await res.arrayBuffer()));
        } catch {
          /* un suono mancante non deve fermare il gioco */
        }
      }),
    );
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    if (this.master) this.master.gain.value = on ? 0.9 : 0;
  }

  play(name: Sfx, volume = 1, pitchVar = 0.06) {
    const ctx = this.ctx;
    const buf = this.buffers.get(name);
    if (!ctx || !buf || !this.enabled || this.playing > 14) return;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = 1 + (Math.random() * 2 - 1) * pitchVar;
    const g = ctx.createGain();
    g.gain.value = volume;
    src.connect(g).connect(this.sfxBus!);
    this.playing++;
    src.onended = () => this.playing--;
    src.start();
  }

  /** Sparo sintetizzato: rumore filtrato con inviluppo, diverso per arma. */
  shot(weapon: WeaponId, companion = false) {
    const ctx = this.ctx;
    if (!ctx || !this.noise || !this.enabled || this.playing > 14) return;
    const P: Record<WeaponId, { f: number; q: number; dur: number; vol: number; thump: number }> = {
      pistol: { f: 2400, q: 0.8, dur: 0.09, vol: 0.32, thump: 140 },
      smg: { f: 3200, q: 0.9, dur: 0.05, vol: 0.2, thump: 170 },
      shotgun: { f: 1200, q: 0.6, dur: 0.22, vol: 0.5, thump: 90 },
      rifle: { f: 1800, q: 1.2, dur: 0.28, vol: 0.45, thump: 75 },
      flame: { f: 700, q: 0.4, dur: 0.12, vol: 0.12, thump: 0 },
      grenade: { f: 600, q: 0.7, dur: 0.18, vol: 0.4, thump: 60 },
    };
    const p = P[weapon];
    const now = ctx.currentTime;
    const vol = p.vol * (companion ? 0.45 : 1);
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.playbackRate.value = 0.9 + Math.random() * 0.2;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = p.f * (0.92 + Math.random() * 0.16);
    bp.Q.value = p.q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + p.dur);
    src.connect(bp).connect(g).connect(this.sfxBus!);
    this.playing++;
    src.onended = () => this.playing--;
    src.start(now, Math.random() * 0.3, p.dur + 0.02);
    if (p.thump > 0) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(p.thump * 2, now);
      o.frequency.exponentialRampToValueAtTime(p.thump * 0.5, now + p.dur);
      const og = ctx.createGain();
      og.gain.setValueAtTime(vol * 0.8, now);
      og.gain.exponentialRampToValueAtTime(0.001, now + p.dur);
      o.connect(og).connect(this.sfxBus!);
      o.start(now);
      o.stop(now + p.dur + 0.02);
    }
  }

  vibrate(ms: number) {
    if (this.enabled && 'vibrate' in navigator) navigator.vibrate?.(ms);
  }
}

export const audio = new AudioManager();
