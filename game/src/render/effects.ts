// Effetti grafici condivisi: texture disegnate al volo, particelle, segnali a terra.
import { Scene, DynamicTexture, Texture, ParticleSystem, Vector3, Color4, Color3, StandardMaterial, Mesh, MeshBuilder } from '@babylonjs/core';

export function canvasTexture(scene: Scene, name: string, size: number, draw: (ctx: CanvasRenderingContext2D, s: number) => void, alpha = true) {
  const t = new DynamicTexture(name, { width: size, height: size }, scene, true, Texture.TRILINEAR_SAMPLINGMODE);
  const ctx = t.getContext() as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, size, size);
  draw(ctx, size);
  t.update();
  t.hasAlpha = alpha;
  return t;
}

export function sparkTexture(scene: Scene) {
  return canvasTexture(scene, 'spark', 64, (c, s) => {
    const g = c.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,230,170,0.9)');
    g.addColorStop(1, 'rgba(255,140,40,0)');
    c.fillStyle = g;
    c.fillRect(0, 0, s, s);
  });
}

export function smokeTexture(scene: Scene) {
  return canvasTexture(scene, 'smoke', 64, (c, s) => {
    const g = c.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,255,255,0.8)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g;
    c.fillRect(0, 0, s, s);
  });
}

export function chunkTexture(scene: Scene) {
  return canvasTexture(scene, 'chunk', 32, (c, s) => {
    c.fillStyle = '#fff';
    c.beginPath();
    c.moveTo(s * 0.2, s * 0.1);
    c.lineTo(s * 0.9, s * 0.3);
    c.lineTo(s * 0.7, s * 0.9);
    c.lineTo(s * 0.1, s * 0.7);
    c.closePath();
    c.fill();
  });
}

/** Crepe che si allargano: 3 stadi disegnati una volta. */
export function crackTextures(scene: Scene) {
  const stages: Texture[] = [];
  for (let k = 1; k <= 3; k++) {
    stages.push(
      canvasTexture(scene, `crack${k}`, 256, (c, s) => {
        c.strokeStyle = 'rgba(20,14,8,0.95)';
        c.lineCap = 'round';
        let seed = 7;
        const r = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
        const branches = 3 + k * 4;
        for (let i = 0; i < branches; i++) {
          let x = s / 2 + (r() - 0.5) * s * 0.2;
          let y = s / 2 + (r() - 0.5) * s * 0.2;
          let ang = r() * Math.PI * 2;
          c.lineWidth = 2 + k * 1.6;
          c.beginPath();
          c.moveTo(x, y);
          const steps = 3 + k * 2;
          for (let j = 0; j < steps; j++) {
            ang += (r() - 0.5) * 1.1;
            x += Math.cos(ang) * s * 0.07;
            y += Math.sin(ang) * s * 0.07;
            c.lineTo(x, y);
          }
          c.stroke();
        }
      }),
    );
  }
  return stages;
}

/** Icone dei potenziamenti, disegnate con forme semplici (riconoscibili anche senza colore). */
export function powerIcon(scene: Scene, kind: 'rapid' | 'damage' | 'shield' | 'pierce') {
  const color = { rapid: '#ffd34d', damage: '#ff6b3d', shield: '#4dc3ff', pierce: '#b48cff' }[kind];
  return canvasTexture(scene, `pw-${kind}`, 128, (c, s) => {
    c.fillStyle = 'rgba(15,18,22,0.85)';
    c.beginPath();
    c.arc(s / 2, s / 2, s * 0.46, 0, Math.PI * 2);
    c.fill();
    c.lineWidth = 8;
    c.strokeStyle = color;
    c.stroke();
    c.fillStyle = color;
    c.strokeStyle = color;
    c.lineWidth = 10;
    c.lineJoin = 'round';
    if (kind === 'rapid') {
      // fulmine
      c.beginPath();
      c.moveTo(s * 0.56, s * 0.18);
      c.lineTo(s * 0.32, s * 0.55);
      c.lineTo(s * 0.5, s * 0.55);
      c.lineTo(s * 0.42, s * 0.84);
      c.lineTo(s * 0.7, s * 0.43);
      c.lineTo(s * 0.52, s * 0.43);
      c.closePath();
      c.fill();
    } else if (kind === 'damage') {
      // proiettile grosso
      c.beginPath();
      c.roundRect(s * 0.38, s * 0.38, s * 0.24, s * 0.4, 6);
      c.fill();
      c.beginPath();
      c.ellipse(s * 0.5, s * 0.36, s * 0.12, s * 0.16, 0, Math.PI, 0);
      c.fill();
    } else if (kind === 'shield') {
      c.beginPath();
      c.moveTo(s * 0.5, s * 0.2);
      c.lineTo(s * 0.76, s * 0.3);
      c.quadraticCurveTo(s * 0.74, s * 0.66, s * 0.5, s * 0.82);
      c.quadraticCurveTo(s * 0.26, s * 0.66, s * 0.24, s * 0.3);
      c.closePath();
      c.fill();
    } else {
      // freccia che attraversa
      c.beginPath();
      c.moveTo(s * 0.2, s * 0.5);
      c.lineTo(s * 0.78, s * 0.5);
      c.stroke();
      c.beginPath();
      c.moveTo(s * 0.82, s * 0.5);
      c.lineTo(s * 0.62, s * 0.34);
      c.lineTo(s * 0.62, s * 0.66);
      c.closePath();
      c.fill();
      c.fillRect(s * 0.42, s * 0.3, 8, s * 0.4);
    }
  });
}

export function makeBurst(scene: Scene, name: string, tex: Texture, opts: Partial<{ capacity: number; size: [number, number]; life: [number, number]; power: [number, number]; gravity: number; c1: Color4; c2: Color4; dead: Color4; additive: boolean; dir1: Vector3; dir2: Vector3 }>) {
  const ps = new ParticleSystem(name, opts.capacity ?? 300, scene);
  ps.particleTexture = tex;
  ps.minSize = opts.size?.[0] ?? 0.1;
  ps.maxSize = opts.size?.[1] ?? 0.3;
  ps.minLifeTime = opts.life?.[0] ?? 0.1;
  ps.maxLifeTime = opts.life?.[1] ?? 0.3;
  ps.minEmitPower = opts.power?.[0] ?? 2;
  ps.maxEmitPower = opts.power?.[1] ?? 5;
  ps.direction1 = opts.dir1 ?? new Vector3(-1, 0.8, -1);
  ps.direction2 = opts.dir2 ?? new Vector3(1, 2, 1);
  ps.gravity = new Vector3(0, opts.gravity ?? 0, 0);
  if (opts.c1) ps.color1 = opts.c1;
  if (opts.c2) ps.color2 = opts.c2;
  if (opts.dead) ps.colorDead = opts.dead;
  ps.emitRate = 0;
  ps.blendMode = opts.additive === false ? ParticleSystem.BLENDMODE_STANDARD : ParticleSystem.BLENDMODE_ADD;
  ps.emitter = Vector3.Zero();
  ps.start();
  return ps;
}

export function burst(ps: ParticleSystem, pos: Vector3, count: number) {
  ps.emitter = pos.clone();
  ps.manualEmitCount = (ps.manualEmitCount > 0 ? ps.manualEmitCount : 0) + count;
}

export function flatMaterial(scene: Scene, name: string, color: Color3, alpha = 1) {
  const m = new StandardMaterial(name, scene);
  m.emissiveColor = color;
  m.disableLighting = true;
  m.alpha = alpha;
  m.backFaceCulling = false;
  return m;
}

/** Striscia a terra lunga una corsia (segnali di acido, colpi del capo, ombre). */
export function laneDecal(scene: Scene, name: string, width: number, length: number, mat: StandardMaterial): Mesh {
  const m = MeshBuilder.CreateGround(name, { width, height: length }, scene);
  m.material = mat;
  m.isPickable = false;
  return m;
}
