/**
 * Standalone init for +uiParallax (`.js-ui-px` / `[data-ui-px]`).
 * Does not touch `.js-parallax` used by the older +uiPicture media demo.
 *
 *   import { initUiParallax, refreshUiParallax, applyUiParallaxOptions } from './lib/parallax.js';
 *   initUiParallax();
 *
 * Frame attrs (what controls the effect):
 *   data-ui-px-speed      — ± percent travel (default 12)
 *   data-ui-px-direction  — "y" | "x"
 *
 * Classes that shape the frame:
 *   .ui-px--subtle | .ui-px--default | .ui-px--strong
 *   .ui-px--dir-y | .ui-px--dir-x
 *   .ui-px--{ratio}
 */

const VARIANT_SPEED = { subtle: 8, default: 12, strong: 18 };
const RATIO_CLASSES = [
  'ui-px--1x1',
  'ui-px--4x3',
  'ui-px--16x9',
  'ui-px--16x11',
  'ui-px--3x2',
  'ui-px--hero',
  'ui-px--card',
  'ui-px--stage',
  'ui-px--billboard',
];
const VARIANT_CLASSES = ['ui-px--subtle', 'ui-px--default', 'ui-px--strong'];
const DIR_CLASSES = ['ui-px--dir-y', 'ui-px--dir-x'];

const tweenByFrame = new WeakMap();

function canAnimate() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) {
    console.warn('[uiParallax] GSAP ScrollTrigger missing — set showMotionLibs = true');
    return false;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  gsap.registerPlugin(ScrollTrigger);
  return true;
}

function killFrameTween(frame) {
  const { gsap } = window;
  const existing = tweenByFrame.get(frame);
  if (!existing) return;
  if (existing.scrollTrigger) existing.scrollTrigger.kill();
  existing.kill();
  tweenByFrame.delete(frame);
  const layer = frame.querySelector('.js-ui-px, .ui-px__layer');
  if (layer && gsap) gsap.set(layer, { clearProps: 'transform,xPercent,yPercent' });
}

function createFrameTween(frame, options = {}) {
  const { gsap } = window;
  const layer = frame.querySelector(options.selector || '.js-ui-px, .ui-px__layer');
  if (!layer) return null;

  const defaultSpeed = options.defaultSpeed != null ? options.defaultSpeed : 12;
  const rawSpeed = frame.getAttribute('data-ui-px-speed');
  const speed =
    rawSpeed != null && rawSpeed !== '' ? parseFloat(rawSpeed) : defaultSpeed;
  if (!Number.isFinite(speed) || speed === 0) return null;

  const direction = (frame.getAttribute('data-ui-px-direction') || 'y').toLowerCase();
  const axis = direction === 'x' ? 'xPercent' : 'yPercent';

  const tween = gsap.fromTo(
    layer,
    { [axis]: -speed },
    {
      [axis]: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: frame,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );

  tweenByFrame.set(frame, tween);
  return tween;
}

/** Bind every `.js-ui-px` on the page. Returns the tween list. */
export function initUiParallax(options = {}) {
  if (!canAnimate()) return [];

  const { gsap } = window;
  const selector = options.selector || '.js-ui-px';
  const tweens = [];

  gsap.utils.toArray(selector).forEach((layer) => {
    const frame = layer.closest('[data-ui-px]') || layer.closest('.ui-px');
    if (!frame) return;
    killFrameTween(frame);
    const tween = createFrameTween(frame, options);
    if (tween) tweens.push(tween);
  });

  return tweens;
}

/** Re-read attrs/classes on a frame and rebuild its ScrollTrigger. */
export function refreshUiParallax(frame, options = {}) {
  if (!frame || !canAnimate()) return null;
  killFrameTween(frame);
  return createFrameTween(frame, options);
}

/**
 * Apply live options onto a frame (attrs + classes), then refresh the tween.
 * Used by the home playground controls.
 */
export function applyUiParallaxOptions(frame, opts = {}) {
  if (!frame) return null;

  let variant = opts.variant;
  let speed = opts.speed;
  const direction = opts.direction === 'x' ? 'x' : opts.direction === 'y' ? 'y' : null;
  const ratio = opts.ratio || null;

  if (variant && VARIANT_SPEED[variant] != null && (speed == null || speed === '')) {
    speed = VARIANT_SPEED[variant];
  }

  if (speed != null && speed !== '') {
    frame.setAttribute('data-ui-px-speed', String(speed));
  }

  if (direction) {
    frame.setAttribute('data-ui-px-direction', direction);
    DIR_CLASSES.forEach((c) => frame.classList.remove(c));
    frame.classList.add(`ui-px--dir-${direction}`);
  }

  if (variant) {
    VARIANT_CLASSES.forEach((c) => frame.classList.remove(c));
    frame.classList.add(`ui-px--${variant}`);
    frame.setAttribute('data-ui-px-variant', variant);
  }

  if (ratio) {
    RATIO_CLASSES.forEach((c) => frame.classList.remove(c));
    frame.classList.add(`ui-px--${ratio}`);
    frame.setAttribute('data-ui-px-ratio', ratio);
  }

  if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  return refreshUiParallax(frame);
}

/** Read current controlling attrs/classes for UI readouts. */
export function readUiParallaxOptions(frame) {
  if (!frame) return null;
  const classList = [...frame.classList];
  const variantClass = classList.find((c) => VARIANT_CLASSES.includes(c));
  const ratioClass = classList.find((c) => RATIO_CLASSES.includes(c));
  return {
    speed: frame.getAttribute('data-ui-px-speed') || '12',
    direction: frame.getAttribute('data-ui-px-direction') || 'y',
    variant:
      frame.getAttribute('data-ui-px-variant') ||
      (variantClass ? variantClass.replace('ui-px--', '') : 'default'),
    ratio:
      frame.getAttribute('data-ui-px-ratio') ||
      (ratioClass ? ratioClass.replace('ui-px--', '') : '16x9'),
    className: classList.join(' '),
    attrs: {
      'data-ui-px': frame.getAttribute('data-ui-px'),
      'data-ui-px-speed': frame.getAttribute('data-ui-px-speed'),
      'data-ui-px-direction': frame.getAttribute('data-ui-px-direction'),
      'data-ui-px-variant': frame.getAttribute('data-ui-px-variant'),
      'data-ui-px-ratio': frame.getAttribute('data-ui-px-ratio'),
    },
  };
}

export { VARIANT_SPEED };

/** @deprecated Use initUiParallax */
export const initParallax = initUiParallax;
