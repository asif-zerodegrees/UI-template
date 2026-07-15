import './styles-entry.js';

function formatPx(value) {
  return `${Math.round(parseFloat(value) * 10) / 10}px`;
}

/** Label row is above the specimen; specimen is the next .ui-box in the same card. */
function specimenFor(meta) {
  const card = meta.parentElement?.parentElement;
  return card?.querySelector('.ui-box') || null;
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

  document.querySelectorAll('.box-meta').forEach((meta) => {
    const box = specimenFor(meta);
    if (!box) return;
    const styles = getComputedStyle(box);
    meta.textContent = `p ${formatPx(styles.paddingTop)}`;
  });

  document.querySelectorAll('.margin-meta').forEach((meta) => {
    const box = specimenFor(meta);
    if (!box) return;
    const styles = getComputedStyle(box);
    meta.textContent = `m ${formatPx(styles.marginTop)} / ${formatPx(styles.marginRight)}`;
  });

  document.querySelectorAll('.radius-meta').forEach((meta) => {
    const box = specimenFor(meta);
    if (!box) return;
    const styles = getComputedStyle(box);
    meta.textContent = `r ${formatPx(styles.borderTopLeftRadius)}`;
  });

  document.querySelectorAll('.combo-meta').forEach((meta) => {
    const box = specimenFor(meta);
    if (!box) return;
    const styles = getComputedStyle(box);
    meta.textContent = `p ${formatPx(styles.paddingTop)} · m ${formatPx(styles.marginTop)} · r ${formatPx(styles.borderTopLeftRadius)}`;
  });
}

updateSamples();
window.addEventListener('resize', updateSamples);
