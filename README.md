# UI Template

Shared front-end starter for the team: **Vite + Pug + Tailwind CSS + SCSS**.

## Quick start

```bash
npm install
npm.cmd run dev      # or .\dev.cmd on Windows if PowerShell blocks npm
npm.cmd run build
npm.cmd run preview
```

- Home: http://localhost:5173/
- Typography / spacing: http://localhost:5173/typography
- Components: http://localhost:5173/components
- Fluid media / parallax: http://localhost:5173/media

## Project layout

```
src/
  layouts/default.pug       # shared shell (header + footer)
  components/               # header, footer, button, field, picture…
  pages/                    # one .pug file → one HTML route
  styles/
    _tokens.scss            # CSS variables (colors, fonts)
    _typography.scss        # type scale + h1–h6 defaults
    _spacing.scss           # fluid padding / margin / gap / radius
    _components.scss        # buttons, fields, media frames
    _site.scss              # demo-site extras
```

## Pages & components

New page:

```pug
extends /layouts/default.pug

block vars
  - pageTitle = 'My page'
  - activeNav = ''
  - scriptSrc = '/src/main.js'

block content
  main
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
  ratio: 'stage',         // also: hero | card | billboard | 16x9…
  parallax: true,         // ScrollTrigger (needs showMotionLibs + media.js)
  className: 'rounded-sm',
  loading: 'lazy'
})
```

Breakpoints: `mobile` ≤639 · `tablet` ≥640 · `laptop` ≥1024 · `desktop` ≥1440 (or ≥1024 without laptop) · `wide` ≥1536.

`hero` = 4:3 → 16:11 · `card` = 1:1 → 16:10 · `stage` / `billboard` = fluid frames for laptop → large. Full-bleed: place `.ui-media-bleed` outside any `max-w-*` wrapper (not via `100vw`). Demo: `/media`.

## Fluid spacing

Arbitrary min → max (plugin `tailwind.fluid.js`):

```html
<div class="ui-p-[20px,80px] ui-m-[8px,32px] ui-gap-[12px,40px] ui-r-[4px,24px]">
```

Presets: `ui-p-md`, `ui-m-lg`, `ui-gap-sm`, `ui-r-md`.

Underscore form if commas are awkward: `ui-p-[20px_80px]`.

## Tokens

Edit colors/fonts in `src/styles/_tokens.scss`. Tailwind maps to the same CSS variables in `tailwind.config.js`.

## Typography

- Bare `h1`–`h6` are styled after Tailwind Preflight.
- Utilities: `ui-h1`, `ui-body`, `ui-mono`, `ui-display-xl`, …
- Size tokens: `text-h1`, `font-display`, …

## Branding

Replace “Template” in `src/components/header.pug` and page titles/footers when starting a client project.
