import './styles-entry.js';

function formatPx(value) {
  return `${Math.round(parseFloat(value) * 10) / 10}px`;
}

function updateSamples() {
  const vw = document.getElementById('viewportW');
  if (vw) vw.textContent = String(window.innerWidth);

  document.querySelectorAll('[data-sample]').forEach((row) => {
    const sample = row.querySelector('.sample');
    const meta = row.querySelector('.meta');
    if (!sample || !meta) return;
    const styles = getComputedStyle(sample);
    meta.textContent = `${formatPx(styles.fontSize)} · ${styles.fontWeight} · lh ${styles.lineHeight === 'normal' ? 'normal' : formatPx(styles.lineHeight)}`;
  });
}

updateSamples();
window.addEventListener('resize', updateSamples);
