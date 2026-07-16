# UI Template

Shared front-end starter for the team: **Vite + Pug + Tailwind CSS + SCSS**.

## Quick start

```bash
npm install
npm.cmd run dev      # or .\dev.cmd on Windows if PowerShell blocks npm
npm.cmd run build
npm.cmd run preview
```

### Routes

| Page | URL |
|------|-----|
| Home | http://localhost:5173/ |
| Typography / spacing | http://localhost:5173/typography |
| Components | http://localhost:5173/components |
| Fluid media | http://localhost:5173/media |
| Parallax variants | http://localhost:5173/parallax |
| Image inspector | http://localhost:5173/images |
| 404 | http://localhost:5173/404 |

## Project layout

```
public/                     # favicon, robots.txt
src/
  layouts/default.pug       # shared shell (SEO meta, skip link, header + footer)
  components/               # header, footer, button, field, picture, parallax, focal…
  lib/
    parallax.js             # initUiParallax() for +uiParallax
    focal.js                # initUiFocal() for +uiFocal
    forms.js                # initContactForms() — demo validation + submit state
  pages/                    # one .pug file → one HTML route
  styles/
    _tokens.scss            # CSS variables (colors, fonts)
    _typography.scss        # type scale + h1–h6 defaults
    _spacing.scss           # fluid padding / margin / gap / radius
    _components.scss        # buttons, fields, media frames
    _parallax.scss          # +uiParallax frames
    _focal.scss             # +uiFocal object-position
    _site.scss              # demo-site extras (skip link, nav lock)
```

## Pages & components

New page:

```pug
extends /layouts/default.pug

block vars
  - pageTitle = 'My page'
  - pageDescription = 'Short summary for SEO and social cards.'
  - activeNav = ''
  - scriptSrc = '/src/main.js'

block content
  main#main-content
    h1 Title
```

Include a component:

```pug
include /components/button.pug
+uiButton('Start', { variant: 'primary', href: '/contact' })
```

### Buttons

`+uiButton(label, { variant, size, href, type, disabled })`  
Variants: `primary` · `secondary` · `ghost` · `signal`  
Sizes: `sm` · `lg`

### Fields

`+uiField({ name, label, type, control: 'textarea', onDark, hint, error, invalid })`

### Contact forms

```pug
form.js-contact-form
  +uiField({ name: 'email', label: 'Email', type: 'email', required: true })
  +uiButton('Submit', { type: 'submit', variant: 'signal' })
```

```js
import { initContactForms } from './lib/forms.js';
initContactForms();
```

Demo submit simulates success — replace the timeout in `lib/forms.js` with `fetch()` to your API.

### Focal point (`+uiFocal`)

```pug
include /components/focal.pug
+uiFocal({
  alt: 'Workshop',
  src: '/img/hero.jpg',
  mobileSrc: '/img/hero-m.jpg',
  desktop: '62% 28%',
  mobile: '40% 55%',
  ratio: '16x9',
  fit: 'cover'
})
```

```js
import { initUiFocal } from './lib/focal.js';
initUiFocal();
```

### Parallax (`+uiParallax`)

Standalone component — does not change `+uiPicture`. Full variant sheet: `/parallax`.

```pug
include /components/parallax.pug
+uiParallax({
  alt: 'Description',
  src: '/img/hero.jpg',
  mobile: '/img/hero-m.jpg',
  tablet: '/img/hero-t.jpg',
  desktop: '/img/hero-d.jpg',
  variant: 'default',     // subtle | default | strong
  direction: 'y',         // y | x
  ratio: 'stage',
  bleed: false,
  className: 'rounded-sm'
})
```

```js
import { initUiParallax } from './lib/parallax.js';
initUiParallax();
```

Requires `showMotionLibs = true`.

### Responsive images

```pug
include /components/picture.pug
+uiPicture({
  alt: 'Description',
  src: '/img/hero.jpg',
  mobile: '/img/hero-m.jpg',
  tablet: '/img/hero-t.jpg',
  laptop: '/img/hero-laptop.jpg',
  desktop: '/img/hero-d.jpg',
  wide: '/img/hero-wide.jpg',
  ratio: 'stage',
  parallax: true,
  className: 'rounded-sm',
  loading: 'lazy'
})
```

Breakpoints: `mobile` ≤639 · `tablet` ≥640 · `laptop` ≥1024 · `desktop` ≥1440 (or ≥1024 without laptop) · `wide` ≥1536.

Full-bleed: place `.ui-media-bleed` outside any `max-w-*` wrapper. Demo: `/media`.

## Fluid spacing

Arbitrary min → max (plugin `tailwind.fluid.js`):

```html
<div class="ui-p-[20px,80px] ui-m-[8px,32px] ui-gap-[12px,40px] ui-r-[4px,24px]">
```

Presets: `ui-p-md`, `ui-m-lg`, `ui-gap-sm`, `ui-r-md`.

## SEO & accessibility

- Set `pageTitle` and `pageDescription` per page in `block vars`
- Favicon: `public/favicon.svg`
- Skip link → `#main-content` in layout
- Mobile nav: Escape closes menu, body scroll lock while open

## Tokens

Edit colors/fonts in `src/styles/_tokens.scss`. Tailwind maps to the same CSS variables in `tailwind.config.js`.

## Typography

- Bare `h1`–`h6` are styled after Tailwind Preflight.
- Utilities: `ui-h1`, `ui-body`, `ui-mono`, `ui-display-xl`, …

## Branding

Replace “Template” in `src/components/header.pug` and page titles/footers when starting a client project.

## Still optional for production

- ESLint / Prettier
- Local `/img/` assets (demos use picsum.photos)
- AVIF/WebP `<source type>` in picture mixins
- CI workflow
- Wire contact form to Formspree / your API
