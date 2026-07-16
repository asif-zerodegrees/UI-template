import './styles-entry.js';
import {
  initUiParallax,
  applyUiParallaxOptions,
  readUiParallaxOptions,
  VARIANT_SPEED,
} from './lib/parallax.js';

const { gsap, ScrollTrigger, Lenis } = window;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis;
if (!reduceMotion && typeof Lenis === 'function') {
  lenis = new Lenis({ duration: 1.05, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

gsap.registerPlugin(ScrollTrigger);

function updateViewportLabel() {
  const el = document.getElementById('viewportW');
  if (!el) return;
  const w = window.innerWidth;
  let band = 'phone';
  if (w >= 1536) band = 'wide';
  else if (w >= 1440) band = 'desktop';
  else if (w >= 1024) band = 'laptop';
  else if (w >= 640) band = 'tablet';
  el.textContent = `${w}px · ${band}`;
}

updateViewportLabel();
window.addEventListener('resize', updateViewportLabel);

// +uiParallax (team component) + live guide controls
initUiParallax();
initParallaxPlayground();

// Legacy +uiPicture({ parallax: true }) path for any remaining .js-parallax frames
if (!reduceMotion) {
  gsap.utils.toArray('.js-parallax').forEach((img) => {
    const frame = img.closest('.ui-media');
    if (!frame) return;

    gsap.fromTo(
      img,
      { yPercent: -12 },
      {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: frame,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });
}

function initParallaxPlayground() {
  const frame = document.getElementById('pxPreviewFrame');
  if (!frame) return;

  const speedInput = document.getElementById('pxSpeed');
  const ratioSelect = document.getElementById('pxRatio');
  const readout = document.getElementById('pxAttrReadout');
  const labelSpeed = document.getElementById('pxLabelSpeed');
  const labelDir = document.getElementById('pxLabelDir');
  const labelVariant = document.getElementById('pxLabelVariant');
  const labelRatio = document.getElementById('pxLabelRatio');

  function syncReadout() {
    const state = readUiParallaxOptions(frame);
    if (!state) return;
    if (labelSpeed) labelSpeed.textContent = state.speed;
    if (labelDir) labelDir.textContent = state.direction;
    if (labelVariant) labelVariant.textContent = state.variant;
    if (labelRatio) labelRatio.textContent = state.ratio;
    if (readout) {
      readout.textContent = [
        `class="${state.className}"`,
        `data-ui-px="${state.attrs['data-ui-px']}"`,
        `data-ui-px-speed="${state.attrs['data-ui-px-speed']}"`,
        `data-ui-px-direction="${state.attrs['data-ui-px-direction']}"`,
        `data-ui-px-variant="${state.attrs['data-ui-px-variant'] || state.variant}"`,
        `data-ui-px-ratio="${state.attrs['data-ui-px-ratio'] || state.ratio}"`,
      ].join('\n');
    }
  }

  function apply(partial) {
    applyUiParallaxOptions(frame, partial);
    syncReadout();
  }

  document.querySelectorAll('[data-px-variant]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const variant = btn.getAttribute('data-px-variant');
      const speed = VARIANT_SPEED[variant];
      document.querySelectorAll('[data-px-variant]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      if (speedInput && speed != null) speedInput.value = String(speed);
      apply({ variant, speed });
    });
  });

  document.querySelectorAll('[data-px-direction]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const direction = btn.getAttribute('data-px-direction');
      document.querySelectorAll('[data-px-direction]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      apply({ direction });
    });
  });

  if (speedInput) {
    speedInput.addEventListener('input', () => {
      document.querySelectorAll('[data-px-variant]').forEach((b) => b.classList.remove('is-active'));
      apply({ speed: Number(speedInput.value) });
    });
  }

  if (ratioSelect) {
    ratioSelect.addEventListener('change', () => {
      apply({ ratio: ratioSelect.value });
    });
  }

  syncReadout();
}

// Soft reveal for media cards
gsap.utils.toArray('.js-media-reveal').forEach((el) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: reduceMotion ? 0.01 : 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    }
  );
});
