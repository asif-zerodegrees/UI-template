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

  document.querySelectorAll('[data-box]').forEach((box) => {
    const meta = box.querySelector('.box-meta');
    if (!meta) return;
    const styles = getComputedStyle(box);
    meta.textContent = `p ${formatPx(styles.paddingTop)}`;
  });

  document.querySelectorAll('[data-margin]').forEach((box) => {
    const meta = box.querySelector('.margin-meta');
    if (!meta) return;
    const styles = getComputedStyle(box);
    meta.textContent = `m ${formatPx(styles.marginTop)} / ${formatPx(styles.marginRight)}`;
  });

  document.querySelectorAll('[data-radius]').forEach((row) => {
    const box = row.querySelector('.ui-box') || row;
    const meta = row.querySelector('.radius-meta');
    if (!meta) return;
    const styles = getComputedStyle(box);
    meta.textContent = `r ${formatPx(styles.borderTopLeftRadius)}`;
  });

  document.querySelectorAll('[data-combo]').forEach((box) => {
    const meta = box.querySelector('.combo-meta');
    if (!meta) return;
    const styles = getComputedStyle(box);
    meta.textContent = `p ${formatPx(styles.paddingTop)} · m ${formatPx(styles.marginTop)} · r ${formatPx(styles.borderTopLeftRadius)}`;
  });
}

updateSamples();
window.addEventListener('resize', updateSamples);
