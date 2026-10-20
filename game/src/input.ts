// Scorrimento a destra/sinistra (touch e mouse) e frecce/A-D da tastiera.
export function bindLaneInput(el: HTMLElement, onMove: (dir: -1 | 1) => void, onUp?: () => void) {
  let startX = 0;
  let startY = 0;
  let active = false;
  let consumed = false;
  const THRESHOLD = 28;

  el.addEventListener('pointerdown', (e) => {
    active = true;
    consumed = false;
    startX = e.clientX;
    startY = e.clientY;
    el.setPointerCapture?.(e.pointerId);
  });
  el.addEventListener('pointermove', (e) => {
    if (!active) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    // ogni 'THRESHOLD' pixel di trascinamento orizzontale = una corsia: permette lo scorrimento doppio
    if (Math.abs(dx) > THRESHOLD && Math.abs(dx) > Math.abs(dy) * 0.8) {
      onMove(dx > 0 ? 1 : -1);
      startX = e.clientX;
      startY = e.clientY;
      consumed = true;
    } else if (onUp && dy < -THRESHOLD * 1.6 && Math.abs(dy) > Math.abs(dx) * 1.4 && !consumed) {
      onUp();
      consumed = true;
    }
  });
  const end = (e: PointerEvent) => {
    if (!active) return;
    active = false;
    // tocco breve senza trascinamento: lato dello schermo
    if (!consumed && Math.abs(e.clientX - startX) < 8 && Math.abs(e.clientY - startY) < 8) {
      onMove(e.clientX < el.clientWidth / 2 ? -1 : 1);
    }
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', () => (active = false));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') onMove(-1);
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') onMove(1);
    if ((e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w' || e.key === 'W') && onUp) onUp();
  });
}
