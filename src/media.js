import './styles-entry.js';
import {
  initUiParallax,
  applyUiParallaxOptions,
  readUiParallaxOptions,
  VARIANT_SPEED,
} from './lib/parallax.js';
import { initUiFocal, applyFocalAttrs } from './lib/focal.js';

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

initUiParallax();
initParallaxPlayground();
initUiFocal();
initFocalLab();

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

function initFocalLab() {
  const lab = document.getElementById('focalLab');
  if (!lab) return;

  const deskFrame = document.getElementById('focalDesktopFrame');
  const mobFrame = document.getElementById('focalMobileFrame');
  const resultFrames = () => document.querySelectorAll('#focalResultWrap .ui-focal');
  const deskMark = document.getElementById('focalDesktopMark');
  const mobMark = document.getElementById('focalMobileMark');
  const deskX = document.getElementById('focalDeskX');
  const deskY = document.getElementById('focalDeskY');
  const mobX = document.getElementById('focalMobX');
  const mobY = document.getElementById('focalMobY');
  const deskXLabel = document.getElementById('focalDeskXLabel');
  const deskYLabel = document.getElementById('focalDeskYLabel');
  const mobXLabel = document.getElementById('focalMobXLabel');
  const mobYLabel = document.getElementById('focalMobYLabel');
  const fitSelect = document.getElementById('focalFit');
  const srcInput = document.getElementById('focalSrc');
  const readout = document.getElementById('focalReadout');
  const pugReadout = document.getElementById('focalPugReadout');
  const copyBtn = document.getElementById('focalCopy');

  const state = { desktop: { x: 50, y: 50 }, mobile: { x: 50, y: 50 }, fit: 'cover' };

  function syncAllFrames() {
    const desktop = `${state.desktop.x}% ${state.desktop.y}%`;
    const mobile = `${state.mobile.x}% ${state.mobile.y}%`;

    const targets = [deskFrame, mobFrame, ...resultFrames()].filter(Boolean);

    targets.forEach((frame) => {
      frame.setAttribute('data-focal-desktop', desktop);
      frame.setAttribute('data-focal-mobile', mobile);
      frame.setAttribute('data-focal-fit', state.fit);
      applyFocalAttrs(frame);
    });

    if (deskMark) {
      deskMark.style.left = `${state.desktop.x}%`;
      deskMark.style.top = `${state.desktop.y}%`;
    }
    if (mobMark) {
      mobMark.style.left = `${state.mobile.x}%`;
      mobMark.style.top = `${state.mobile.y}%`;
    }

    if (deskXLabel) deskXLabel.textContent = String(state.desktop.x);
    if (deskYLabel) deskYLabel.textContent = String(state.desktop.y);
    if (mobXLabel) mobXLabel.textContent = String(state.mobile.x);
    if (mobYLabel) mobYLabel.textContent = String(state.mobile.y);

    if (deskX) deskX.value = String(state.desktop.x);
    if (deskY) deskY.value = String(state.desktop.y);
    if (mobX) mobX.value = String(state.mobile.x);
    if (mobY) mobY.value = String(state.mobile.y);

    const src = (srcInput && srcInput.value) || '/img/hero.jpg';
    if (readout) {
      readout.textContent = [
        `data-focal-desktop="${desktop}"`,
        `data-focal-mobile="${mobile}"`,
        `data-focal-fit="${state.fit}"`,
        '',
        '/* CSS */',
        `--focal-desktop: ${desktop};`,
        `--focal-mobile: ${mobile};`,
        'object-position: var(--focal-pos);',
      ].join('\n');
    }
    if (pugReadout) {
      pugReadout.textContent = [
        '+uiFocal({',
        `  alt: 'Description',`,
        `  src: '${src}',`,
        `  desktop: '${desktop}',`,
        `  mobile: '${mobile}',`,
        `  fit: '${state.fit}',`,
        `  ratio: '16x9'`,
        '})',
      ].join('\n');
    }
  }

  function bindPointer(frame, device) {
    if (!frame) return;
    let dragging = false;

    function pointFromEvent(e) {
      const rect = frame.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      state[device].x = Math.round(Math.min(100, Math.max(0, x)));
      state[device].y = Math.round(Math.min(100, Math.max(0, y)));
      syncAllFrames();
    }

    frame.addEventListener('pointerdown', (e) => {
      dragging = true;
      frame.setPointerCapture?.(e.pointerId);
      pointFromEvent(e);
    });
    frame.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      pointFromEvent(e);
    });
    frame.addEventListener('pointerup', () => {
      dragging = false;
    });
    frame.addEventListener('pointercancel', () => {
      dragging = false;
    });
  }

  bindPointer(deskFrame, 'desktop');
  bindPointer(mobFrame, 'mobile');

  if (deskX) {
    deskX.addEventListener('input', () => {
      state.desktop.x = Number(deskX.value);
      syncAllFrames();
    });
  }
  if (deskY) {
    deskY.addEventListener('input', () => {
      state.desktop.y = Number(deskY.value);
      syncAllFrames();
    });
  }
  if (mobX) {
    mobX.addEventListener('input', () => {
      state.mobile.x = Number(mobX.value);
      syncAllFrames();
    });
  }
  if (mobY) {
    mobY.addEventListener('input', () => {
      state.mobile.y = Number(mobY.value);
      syncAllFrames();
    });
  }

  document.querySelectorAll('[data-focal-preset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const device = btn.getAttribute('data-focal-preset');
      state[device].x = Number(btn.getAttribute('data-x'));
      state[device].y = Number(btn.getAttribute('data-y'));
      syncAllFrames();
    });
  });

  if (fitSelect) {
    fitSelect.addEventListener('change', () => {
      state.fit = fitSelect.value;
      syncAllFrames();
    });
  }

  if (srcInput) {
    const applySrc = () => {
      const url = srcInput.value.trim();
      if (!url) return;
      lab.querySelectorAll('img').forEach((img) => {
        img.src = url;
      });
      syncAllFrames();
    };
    srcInput.addEventListener('change', applySrc);
    srcInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applySrc();
      }
    });
  }

  if (copyBtn && readout) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(readout.textContent);
        copyBtn.textContent = 'Copied';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
        }, 1200);
      } catch {
        copyBtn.textContent = 'Select & copy';
      }
    });
  }

  syncAllFrames();
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
