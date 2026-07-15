import './styles-entry.js';

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

// Parallax: scrub image inside overflow frame (disabled for reduced motion)
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
