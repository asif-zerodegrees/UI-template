/**
 * Fluid min/max utilities — Tailwind-style arbitrary values.
 *
 * Examples:
 *   ui-p-[20px,80px]     → padding: clamp(20px, …, 80px)
 *   ui-p-[20px_80px]     → same (underscore = Tailwind-safe separator)
 *   ui-m-[1rem,3rem]     → margin
 *   ui-r-[4px,24px]      → border-radius
 *   ui-px-[12px,40px]    → horizontal padding
 *   ui-mt-[8px,32px]     → margin-top
 *
 * First value = min, second = max. Same CSS unit recommended.
 */

const plugin = require('tailwindcss/plugin');

/** @param {string} value */
function parseMinMax(value) {
  const normalized = String(value)
    .trim()
    .replace(/_/g, ' ')
    .replace(/\s*,\s*/g, ',')
    .replace(/\s+/g, ',');

  const parts = normalized.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length !== 2) return null;

  const toCss = (part) => (/^-?\d+(\.\d+)?$/.test(part) ? `${part}px` : part);
  return { min: toCss(parts[0]), max: toCss(parts[1]) };
}

/** Fluid preferred between min → max across ~320px–1200px viewports */
function fluidClamp(min, max) {
  return `clamp(${min}, calc(${min} + (${max} - ${min}) * ((100vw - 20rem) / 55rem)), ${max})`;
}

function styleFromPair(value, props) {
  const pair = parseMinMax(value);
  if (!pair) return null;
  const clamp = fluidClamp(pair.min, pair.max);
  const out = {};
  for (const prop of props) out[prop] = clamp;
  return out;
}

module.exports = plugin(({ matchUtilities }) => {
  const defs = {
    'ui-p': ['padding'],
    'ui-px': ['padding-inline'],
    'ui-py': ['padding-block'],
    'ui-pt': ['padding-top'],
    'ui-pr': ['padding-right'],
    'ui-pb': ['padding-bottom'],
    'ui-pl': ['padding-left'],
    'ui-m': ['margin'],
    'ui-mx': ['margin-inline'],
    'ui-my': ['margin-block'],
    'ui-mt': ['margin-top'],
    'ui-mr': ['margin-right'],
    'ui-mb': ['margin-bottom'],
    'ui-ml': ['margin-left'],
    'ui-gap': ['gap'],
    'ui-gap-x': ['column-gap'],
    'ui-gap-y': ['row-gap'],
    'ui-r': ['border-radius'],
    'ui-rt': ['border-top-left-radius', 'border-top-right-radius'],
    'ui-rb': ['border-bottom-left-radius', 'border-bottom-right-radius'],
    'ui-rl': ['border-top-left-radius', 'border-bottom-left-radius'],
    'ui-rr': ['border-top-right-radius', 'border-bottom-right-radius'],
  };

  for (const [name, props] of Object.entries(defs)) {
    matchUtilities(
      {
        [name]: (value) => styleFromPair(value, props) || {},
      },
      {
        // Empty theme values → JIT only picks up arbitrary [min,max] usage
        values: {},
        supportsNegativeValues: name.startsWith('ui-m'),
      }
    );
  }
});
