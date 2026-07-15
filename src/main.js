import './styles-entry.js';
import {
  initUiParallax,
  applyUiParallaxOptions,
  readUiParallaxOptions,
  VARIANT_SPEED,
} from './lib/parallax.js';

const { gsap, ScrollTrigger, Lenis } = window;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ---------- Lenis smooth scroll, wired to GSAP ScrollTrigger ----------
let lenis;
if (!reduceMotion && Lenis) {
  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

gsap.registerPlugin(ScrollTrigger);

initUiParallax();
initParallaxPlayground();

// ---------- Parallax lab: live class / attribute controls ----------
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

// Internal anchor links scroll via Lenis with a header offset
document.querySelectorAll('.nav-link[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -76 });
    else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});

// ---------- Nav: hide on scroll down, show on scroll up ----------
const nav = document.getElementById('siteNav');
let lastY = 0;
if (lenis) {
  lenis.on('scroll', (e) => {
    const y = e.scroll;
    if (y > lastY && y > 120) nav.style.transform = 'translateY(-100%)';
    else nav.style.transform = 'translateY(0)';
    lastY = y;
  });
}

// ---------- Hero intro timeline ----------
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
  .fromTo('.hero-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
  .fromTo('.hero-line', { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.12 }, '-=0.3')
  .fromTo('.hero-fade', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, '-=0.5')
  .fromTo('.hero-image', { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1 }, '-=0.8')
  .fromTo('.hero-block', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');

// ---------- Scroll reveals (cards, headings, form) ----------
gsap.utils.toArray('.js-reveal').forEach((el) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 28 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    }
  );
});

// ---------- Animated stat counters ----------
document.querySelectorAll('.js-counter').forEach((el) => {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  const obj = { val: 0 };
  ScrollTrigger.create({
    trigger: el,
    start: 'top 90%',
    once: true,
    onEnter: () =>
      gsap.to(obj, {
        val: target,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = obj.val.toFixed(decimals) + suffix;
        },
      }),
  });
});

// ---------- Magnetic buttons ----------
if (canHover && !reduceMotion) {
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.35, duration: 0.4, ease: 'power3.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

// ---------- Custom cursor ----------
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
if (canHover && !reduceMotion) {
  document.documentElement.classList.add('has-cursor');
  const dotX = gsap.quickTo(cursorDot, 'x', { duration: 0.12, ease: 'power3.out' });
  const dotY = gsap.quickTo(cursorDot, 'y', { duration: 0.12, ease: 'power3.out' });
  const ringX = gsap.quickTo(cursorRing, 'x', { duration: 0.35, ease: 'power3.out' });
  const ringY = gsap.quickTo(cursorRing, 'y', { duration: 0.35, ease: 'power3.out' });
  window.addEventListener('mousemove', (e) => {
    dotX(e.clientX);
    dotY(e.clientY);
    ringX(e.clientX);
    ringY(e.clientY);
  });
  document.querySelectorAll('a, button, input, textarea').forEach((el) => {
    el.addEventListener('mouseenter', () => gsap.to(cursorRing, { scale: 1.8, duration: 0.3 }));
    el.addEventListener('mouseleave', () => gsap.to(cursorRing, { scale: 1, duration: 0.3 }));
  });
} else {
  cursorDot.style.display = 'none';
  cursorRing.style.display = 'none';
}

// ---------- Horizontal pinned work showcase (desktop only) ----------
const mm = gsap.matchMedia();
mm.add('(min-width: 1024px)', () => {
  const track = document.querySelector('.horizontal-track');
  const wrapper = document.querySelector('.horizontal-wrapper');
  if (!track || !wrapper) return;
  const getDistance = () => track.scrollWidth - wrapper.clientWidth;
  const st = gsap.to(track, {
    x: () => -getDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: wrapper,
      pin: true,
      scrub: 1,
      start: 'top top',
      end: () => '+=' + getDistance(),
    },
  });
  return () => st.scrollTrigger && st.scrollTrigger.kill();
});
