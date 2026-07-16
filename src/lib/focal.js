/**
 * +uiFocal — apply data-focal-desktop / data-focal-mobile as CSS vars + img object-position.
 *
 *   import { initUiFocal } from './lib/focal.js';
 *   initUiFocal();
 *
 * Frame attrs:
 *   data-focal-desktop="62% 28%"
 *   data-focal-mobile="40% 55%"
 *   data-focal-fit="cover" | "contain"
 */

function parsePos(value, fallback) {
  const fb = fallback || '50% 50%';
  if (!value || typeof value !== 'string') return fb;
  const parts = value.trim().split(/\s+/);
  if (parts.length >= 2) return parts[0] + ' ' + parts[1];
  if (parts.length === 1) return parts[0] + ' ' + parts[0];
  return fb;
}

export function splitPos(value) {
  const cleaned = parsePos(value).replace(/%/g, '');
  const parts = cleaned.split(/\s+/);
  return { x: Number(parts[0]) || 50, y: Number(parts[1]) || 50 };
}

function toPct(n) {
  const v = Math.round(Math.min(100, Math.max(0, Number(n) || 0)));
  return v + '%';
}

/**
 * Apply attrs → CSS vars on frame + object-position on the img
 * (direct img style makes the crop feel immediate in previews).
 */
export function applyFocalAttrs(frame) {
  if (!frame) return null;

  const desktop = parsePos(frame.getAttribute('data-focal-desktop'));
  const mobile = parsePos(frame.getAttribute('data-focal-mobile'));
  const fit = frame.getAttribute('data-focal-fit') || 'cover';
  const desk = splitPos(desktop);
  const mob = splitPos(mobile);

  frame.style.setProperty('--focal-desktop-x', toPct(desk.x));
  frame.style.setProperty('--focal-desktop-y', toPct(desk.y));
  frame.style.setProperty('--focal-mobile-x', toPct(mob.x));
  frame.style.setProperty('--focal-mobile-y', toPct(mob.y));
  frame.style.setProperty('--focal-desktop', desktop);
  frame.style.setProperty('--focal-mobile', mobile);

  const forceDesktop = frame.classList.contains('ui-focal--preview-desktop');
  const forceMobile = frame.classList.contains('ui-focal--preview-mobile');
  const useMobile =
    forceMobile || (!forceDesktop && window.matchMedia('(max-width: 639px)').matches);
  const active = useMobile ? mob : desk;
  const activePos = toPct(active.x) + ' ' + toPct(active.y);

  frame.style.setProperty('--focal-x', toPct(active.x));
  frame.style.setProperty('--focal-y', toPct(active.y));

  frame.classList.toggle('ui-focal--contain', fit === 'contain');
  frame.classList.toggle('ui-focal--cover', fit !== 'contain');

  const img = frame.querySelector('img');
  if (img) {
    img.style.objectFit = fit === 'contain' ? 'contain' : 'cover';
    img.style.objectPosition = activePos;
  }

  if (frame.classList.contains('ui-focal--bg')) {
    frame.style.backgroundPosition = activePos;
  }

  return { desktop, mobile, fit, active: activePos };
}

export function initUiFocal(root) {
  const scope = root || document;
  const frames = scope.querySelectorAll('[data-focal], .ui-focal');
  frames.forEach((frame) => applyFocalAttrs(frame));

  window.addEventListener('resize', () => {
    frames.forEach((frame) => applyFocalAttrs(frame));
  });

  return frames.length;
}

export function setFocalPosition(frame, device, xPct, yPct) {
  if (!frame) return null;
  const x = Math.round(Math.min(100, Math.max(0, xPct)));
  const y = Math.round(Math.min(100, Math.max(0, yPct)));
  const value = x + '% ' + y + '%';
  const attr = device === 'mobile' ? 'data-focal-mobile' : 'data-focal-desktop';
  frame.setAttribute(attr, value);
  return applyFocalAttrs(frame);
}

export function readFocalPosition(frame) {
  if (!frame) return null;
  return {
    desktop: parsePos(frame.getAttribute('data-focal-desktop')),
    mobile: parsePos(frame.getAttribute('data-focal-mobile')),
    fit: frame.getAttribute('data-focal-fit') || 'cover',
  };
}
