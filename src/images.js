import './styles-entry.js';

function formatPx(value) {
  return `${Math.round(parseFloat(value) * 10) / 10}px`;
}

function getFileName(url) {
  if (!url) return '—';
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split('/');
    // For picsum images, path might look like /id/65/1200/500
    if (parsed.hostname.includes('picsum.photos')) {
      return `picsum:${pathParts.slice(2).join('/')}`;
    }
    return pathParts[pathParts.length - 1];
  } catch (e) {
    return url;
  }
}

function updateViewportLabel() {
  const wEl = document.getElementById('viewportW');
  const dprEl = document.getElementById('deviceDPR');
  
  if (wEl) {
    const w = window.innerWidth;
    let band = 'phone';
    if (w >= 1536) band = 'wide';
    else if (w >= 1440) band = 'desktop';
    else if (w >= 1024) band = 'laptop';
    else if (w >= 640) band = 'tablet';
    wEl.textContent = `${w}px · ${band}`;
  }

  if (dprEl) {
    dprEl.textContent = `${window.devicePixelRatio}x`;
  }
}

function updateImageSpecs() {
  // 1. Live inspector image
  const inspectImg = document.getElementById('inspectImg');
  if (inspectImg) {
    const probeRendered = document.getElementById('probeRendered');
    const probeNatural = document.getElementById('probeNatural');
    const probeSrc = document.getElementById('probeSrc');
    const probeRatio = document.getElementById('probeRatio');

    if (probeRendered) {
      probeRendered.textContent = `${inspectImg.clientWidth} × ${inspectImg.clientHeight} px`;
    }
    if (probeNatural) {
      probeNatural.textContent = inspectImg.naturalWidth 
        ? `${inspectImg.naturalWidth} × ${inspectImg.naturalHeight} px`
        : 'loading...';
    }
    if (probeSrc) {
      probeSrc.textContent = getFileName(inspectImg.currentSrc);
    }
    if (probeRatio) {
      if (inspectImg.naturalWidth) {
        const renderRatio = (inspectImg.clientWidth / inspectImg.clientHeight).toFixed(2);
        const naturalRatio = (inspectImg.naturalWidth / inspectImg.naturalHeight).toFixed(2);
        probeRatio.textContent = `${renderRatio} (rendered) · ${naturalRatio} (natural)`;
      } else {
        probeRatio.textContent = '—';
      }
    }
  }

  // 2. Width switcher image
  const widthImg = document.getElementById('widthSwitchImg');
  if (widthImg) {
    const widthRendered = document.getElementById('widthRendered');
    const widthSrc = document.getElementById('widthSrc');

    if (widthRendered) {
      widthRendered.textContent = `${widthImg.clientWidth}px`;
    }
    if (widthSrc) {
      widthSrc.textContent = getFileName(widthImg.currentSrc);
    }
  }

  // 3. DPR switcher image
  const dprImg = document.getElementById('dprSwitchImg');
  if (dprImg) {
    const dprVal = document.getElementById('dprVal');
    const dprSrc = document.getElementById('dprSrc');

    if (dprVal) {
      dprVal.textContent = `${window.devicePixelRatio}x`;
    }
    if (dprSrc) {
      dprSrc.textContent = getFileName(dprImg.currentSrc);
    }
  }

  // 4. Art Direction crop switcher
  const artImg = document.getElementById('artImg');
  if (artImg) {
    const artMedia = document.getElementById('artMedia');
    const artAspect = document.getElementById('artAspect');

    const w = window.innerWidth;
    if (artMedia) {
      if (w <= 639) {
        artMedia.textContent = '(max-width: 639px) [Mobile]';
      } else if (w <= 1023) {
        artMedia.textContent = '(max-width: 1023px) [Tablet]';
      } else {
        artMedia.textContent = '(min-width: 1024px) [Desktop]';
      }
    }

    if (artAspect) {
      if (artImg.naturalWidth) {
        const ratio = (artImg.naturalWidth / artImg.naturalHeight).toFixed(2);
        let cropName = 'landscape (12:5)';
        if (w <= 639) cropName = 'portrait (5:7)';
        else if (w <= 1023) cropName = 'square (1:1)';
        artAspect.textContent = `${artImg.naturalWidth}×${artImg.naturalHeight} (${cropName})`;
      } else {
        artAspect.textContent = 'loading...';
      }
    }
  }
}

// Bind events
window.addEventListener('resize', () => {
  updateViewportLabel();
  updateImageSpecs();
});

window.addEventListener('DOMContentLoaded', () => {
  updateViewportLabel();
  updateImageSpecs();
});

// Setup load event listeners to update specs as soon as the images finish downloading
const imagesToTrack = ['inspectImg', 'widthSwitchImg', 'dprSwitchImg', 'artImg'];
imagesToTrack.forEach(id => {
  const img = document.getElementById(id);
  if (img) {
    img.addEventListener('load', updateImageSpecs);
    // If already loaded/cached
    if (img.complete) {
      updateImageSpecs();
    }
  }
});

// Run once immediately
updateViewportLabel();
updateImageSpecs();
// Run slightly delayed to ensure final rendering matches
setTimeout(updateImageSpecs, 200);
setTimeout(updateImageSpecs, 1000);
