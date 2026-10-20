// Icone SVG semplici e riconoscibili per armi, potenziamenti e interfaccia. Nessun numero, solo forme.
import type { WeaponId } from '../m1/defs';

const svg = (body: string, vb = '0 0 64 32') => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;

export const WEAPON_ICON: Record<WeaponId, string> = {
  pistol: svg('<path d="M14 9h30l3 4H33v3l-5 1-3 9h-8l3-10h-6z" fill="currentColor"/>'),
  smg: svg('<path d="M8 10h40v6H36v4h-4l-1 9h-6l1-9h-4l-2 4h-6l2-8H8z" fill="currentColor"/><rect x="48" y="11" width="8" height="3" fill="currentColor"/>'),
  heavy: svg('<path d="M4 11h46l8 2v4H22l-6 9H6l5-9H4z" fill="currentColor"/><rect x="30" y="17" width="10" height="3" fill="currentColor"/>'),
  rifle: svg('<path d="M2 14h50l10 1v3H24l-8 8H6l6-8H2z" fill="currentColor"/><rect x="26" y="8" width="16" height="4" rx="2" fill="currentColor"/>'),
  flame: svg('<rect x="6" y="9" width="12" height="16" rx="5" fill="currentColor"/><path d="M18 14h24v5H18z" fill="currentColor"/><path d="M44 16c6-6 10-3 16-6-2 5-1 8-6 12-3 2-7 1-10-6z" fill="#ff7a2e"/>'),
  grenade: svg('<rect x="10" y="10" width="34" height="10" rx="5" fill="currentColor"/><path d="M16 20h8l-3 8h-7z" fill="currentColor"/><circle cx="52" cy="15" r="6" fill="currentColor"/>'),
};

export const ICON = {
  pause: svg('<rect x="18" y="12" width="9" height="40" rx="3" fill="currentColor"/><rect x="37" y="12" width="9" height="40" rx="3" fill="currentColor"/>', '0 0 64 64'),
  airstrike: svg('<path d="M30 4h4l3 18 21 10v6l-21-5-1 14 7 6v4l-11-3-11 3v-4l7-6-1-14-21 5v-6l21-10z" fill="currentColor"/>', '0 0 64 64'),
  soldier: svg('<circle cx="32" cy="14" r="9" fill="currentColor"/><path d="M18 60l4-26c1-6 5-9 10-9s9 3 10 9l4 26h-9l-2-16h-6l-2 16z" fill="currentColor"/><rect x="38" y="30" width="20" height="5" rx="2" fill="currentColor"/>', '0 0 64 64'),
  dash: svg('<path d="M8 32h22M14 22h18M14 42h18" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path d="M36 14l20 18-20 18z" fill="currentColor"/>', '0 0 64 64'),
  star: svg('<path d="M32 4l8 18 20 2-15 13 5 20-18-11-18 11 5-20L4 24l20-2z" fill="currentColor"/>', '0 0 64 64'),
  lock: svg('<rect x="14" y="28" width="36" height="28" rx="5" fill="currentColor"/><path d="M22 28V20a10 10 0 0 1 20 0v8" stroke="currentColor" stroke-width="6" fill="none"/>', '0 0 64 64'),
  survivor: svg('<circle cx="32" cy="16" r="10" fill="currentColor"/><path d="M14 58c0-16 8-24 18-24s18 8 18 24z" fill="currentColor"/>', '0 0 64 64'),
  materials: svg('<path d="M8 40 32 28l24 12-24 12z" fill="#c9a36b"/><path d="M8 40v8l24 12v-8z" fill="#8a6a3e"/><path d="M56 40v8L32 60v-8z" fill="#a8844f"/><path d="M14 30 32 20l18 10-18 9z" fill="#d9b880"/>', '0 0 64 64'),
  food: svg('<rect x="14" y="16" width="36" height="40" rx="6" fill="#d8573c"/><rect x="14" y="26" width="36" height="16" fill="#f2e3c6"/><rect x="18" y="10" width="28" height="8" rx="3" fill="#9aa3ad"/>', '0 0 64 64'),
  sound: svg('<path d="M10 24h10l14-12v40L20 40H10z" fill="currentColor"/><path d="M42 22c4 6 4 14 0 20M48 16c8 9 8 23 0 32" stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round"/>', '0 0 64 64'),
};
