# UI Template — Designer & Developer Spec

Shared front-end system for **0°** product work: **Vite + Pug + Tailwind CSS v3 + SCSS**, with a matching Figma file.

| Role | Start here |
|------|------------|
| **Designer** | [Figma — UI Template](https://www.figma.com/design/gTUJH3iRUxqBpAtNFwCEcS) · this doc §§ 1–6, 11 |
| **Developer** | `npm.cmd run dev` · this doc §§ 1–5, 7–12 · live style guide `/typography` |

**Source of truth for numbers:** code (`src/styles/_*`) wins over Figma if they ever drift.

---

## 1. Stack & conventions

| Item | Spec |
|------|------|
| Build | Vite 8 + Vituum (Pug) |
| CSS | Tailwind 3 + SCSS modules |
| Prefix | `ui-*` for template utilities (type, space, components) |
| Tokens | CSS variables in `src/styles/_tokens.scss` |
| Fluid formula | CSS `clamp(min, preferred, max)` |
| Root size | Assume **16px = 1rem** when converting for Figma |

### Local commands

```bash
npm install
npm.cmd run dev       # http://localhost:5173/
npm.cmd run build
npm.cmd run preview
```

### Style-guide routes

| Page | URL |
|------|-----|
| Home | `/` |
| Typography & spacing | `/typography` |
| Components | `/components` |
| Media | `/media` |
| Parallax | `/parallax` |
| Image / focal inspector | `/images` |
| 404 | `/404` |

---

## 2. How `clamp()` works (required reading)

```css
font-size: clamp(2.75rem, 2rem + 4vw, 6rem);
/*           ↑ min          ↑ scales with viewport   ↑ max  */
```

| Term | Meaning |
|------|---------|
| **min** | Floor — phone / narrow viewports |
| **preferred** | Grows with `vw` (and often a rem base) between min and max |
| **max** | Ceiling — large / desktop viewports |

**Designer note:** Figma cannot live-scale type while you drag a frame. Use **Phone / Tablet / Desktop** modes (or the Home **Breakpoint** property) to preview min ≈ mid ≈ max. The **browser** is where clamp is continuous — resize `/typography` to feel it.

**Developer note:** Prefer named presets (`ui-display-xl`, `ui-p-md`) or arbitrary fluid utilities (`ui-p-[20px,80px]`). Do not hard-code fixed `px` type for marketing surfaces unless intentionally locking a size.

---

## 3. Color tokens

**File:** `src/styles/_tokens.scss`  
**Tailwind:** `bg-paper`, `text-ink`, `border-line`, … (opacity: `bg-paper/90`)

| Token | Hex | CSS variable | Use |
|-------|-----|--------------|-----|
| paper | `#eae6dc` | `--color-paper` | Page background |
| paper2 | `#f4f2eb` | `--color-paper2` | Cards, raised surfaces |
| ink | `#1b1d1f` | `--color-ink` | Primary text, dark chrome |
| blueprint | `#2f4b7a` | `--color-blueprint` | Brand / primary actions |
| blueprint2 | `#4a6fa8` | `--color-blueprint2` | Lighter brand accent |
| steel | `#7a7f87` | `--color-steel` | Secondary text |
| signal | `#d9a62e` | `--color-signal` | Highlight / CTA emphasis |
| line | `#c7c2b5` | `--color-line` | Borders, rules |

Also defined: `--color-*-rgb` for Tailwind alpha, `--focus-ring`, `--shadow-card`, `--shadow-card-hover`.

---

## 4. Typography (font clamp)

**File:** `src/styles/_typography.scss`  
**Also mirrored in:** `tailwind.config.js` → `theme.extend.fontSize`

### Families (required)

| Role | Font | CSS variable | Tailwind |
|------|------|--------------|----------|
| Display / headings | **Big Shoulders Display** | `--font-display` | `font-display` |
| Body | **IBM Plex Sans** | `--font-body` | `font-body` / `font-sans` |
| Labels / mono | **IBM Plex Mono** | `--font-mono` | `font-mono` |

Load via Google Fonts in `src/layouts/default.pug` (weights used: Display 600–900, Sans 400–600, Mono 400–500).

### Fluid type scale

Values below are from `$scale`. **px** columns use **16px root**.

| Token | Class | Min | Preferred | Max | ≈ Phone px | ≈ Desktop px | Weight / notes |
|-------|-------|-----|-----------|-----|------------|--------------|----------------|
| display-xl | `.ui-display-xl` | `2.75rem` | `2rem + 4vw` | `6rem` | 44 | 96 | 800 · display · uppercase · lh 0.96 · tracking −0.02em |
| display-lg | `.ui-display-lg` | `2rem` | `1.5rem + 2.5vw` | `3.5rem` | 32 | 56 | 700 · display · uppercase |
| h1 | `.ui-h1` / `h1` | `1.75rem` | `1.5rem + 1.8vw` | `2.75rem` | 28 | 44 | 700 · display · uppercase |
| h2 | `.ui-h2` / `h2` | `1.5rem` | `1.25rem + 1.2vw` | `2.25rem` | 24 | 36 | 700 · display · uppercase |
| h3 | `.ui-h3` / `h3` | `1.125rem` | `1rem + 0.5vw` | `1.5rem` | 18 | 24 | 600 · body |
| h4 | `.ui-h4` / `h4` | `1rem` | `0.95rem + 0.35vw` | `1.25rem` | 16 | 20 | 600 · body |
| h5 | `.ui-h5` / `h5` | `0.9375rem` | `0.9rem + 0.2vw` | `1.0625rem` | 15 | 17 | 600 · body |
| h6 | `.ui-h6` / `h6` | `0.875rem` | `0.85rem + 0.15vw` | `1rem` | 14 | 16 | 600 · body · uppercase |
| body-lg | `.ui-body-lg` | `1.0625rem` | `1rem + 0.3vw` | `1.25rem` | 17 | 20 | 400 · lh 1.6 |
| body | `.ui-body` / `body` | `1rem` | `0.95rem + 0.2vw` | `1.125rem` | 16 | 18 | 400 · lh 1.65 |
| small | `.ui-small` | `0.8125rem` | `0.8rem + 0.1vw` | `0.9375rem` | 13 | 15 | 400 |
| mono | `.ui-mono` | `0.75rem` | `0.7rem + 0.1vw` | `0.875rem` | 12 | 14 | 500 · mono · uppercase · tracking 0.08em |

**Size-only utilities:** `.fs-display-xl`, `.fs-h2`, … (font-size only, no family/weight).

**Figma map:** collection **Type / Fluid** — modes **Phone** (min) · **Tablet** (≈ mid) · **Desktop** (max). Text styles `Display/XL` … `Mono/Label` bind to these variables.

### Example CSS (compiled intent)

```css
.ui-display-xl {
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 2rem + 4vw, 6rem);
  font-weight: 800;
  line-height: 0.96;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}
```

---

## 5. Spacing & radius (spacing clamp)

**File:** `src/styles/_spacing.scss`  
**Arbitrary fluid plugin:** `tailwind.fluid.js`  
**Viewport curve for arbitrary `[min,max]`:** ~**320px → 1200px** (`20rem` → `20rem + 55rem`)

### Space presets (`xs` → `xl`)

| Token | Min | Preferred | Max | ≈ Phone px | ≈ Desktop px | Classes |
|-------|-----|-----------|-----|------------|--------------|---------|
| xs | `0.5rem` | `0.4rem + 0.5vw` | `0.75rem` | 8 | 12 | `ui-p-xs`, `ui-m-xs`, `ui-gap-xs`, … |
| sm | `0.75rem` | `0.6rem + 0.8vw` | `1.25rem` | 12 | 20 | `ui-p-sm`, `ui-mx-sm`, `ui-gap-sm`, … |
| md | `1rem` | `0.75rem + 1.2vw` | `1.75rem` | 16 | 28 | `ui-p-md`, `ui-my-md`, `ui-gap-md`, … |
| lg | `1.5rem` | `1rem + 2vw` | `2.5rem` | 24 | 40 | `ui-p-lg`, `ui-mt-lg`, `ui-gap-lg`, … |
| xl | `2rem` | `1.25rem + 3vw` | `3.5rem` | 32 | 56 | `ui-p-xl`, `ui-mb-xl`, `ui-gap-xl`, … |

**Padding:** `ui-p-*`, `ui-px-*`, `ui-py-*`  
**Margin:** `ui-m-*`, `ui-mx-*`, `ui-my-*`, `ui-mt-*`, `ui-mb-*`  
**Gap:** `ui-gap-*`, `ui-gap-x-*`, `ui-gap-y-*`  
**Tailwind aliases:** `p-fluid-md`, `m-fluid-lg`, `gap-fluid-sm`, …

### Radius presets

| Token | Min | Preferred | Max | ≈ Phone px | ≈ Desktop px | Classes |
|-------|-----|-----------|-----|------------|--------------|---------|
| sm | `0.125rem` | `0.1rem + 0.3vw` | `0.375rem` | 2 | 6 | `ui-r-sm` |
| md | `0.25rem` | `0.15rem + 0.5vw` | `0.75rem` | 4 | 12 | `ui-r-md` |
| lg | `0.5rem` | `0.3rem + 0.8vw` | `1.25rem` | 8 | 20 | `ui-r-lg` |
| xl | `0.75rem` | `0.4rem + 1.2vw` | `1.75rem` | 12 | 28 | `ui-r-xl` |

Also: `ui-rt-*` (top corners), `ui-rb-*` (bottom corners).

### Arbitrary fluid (any min → max)

Preferred when a one-off range is needed (section padding, hero inset, etc.):

```html
class="ui-p-[20px,80px] ui-m-[1rem,3rem] ui-gap-[12px,40px] ui-r-[4px,24px]"
```

| Utility family | Properties |
|----------------|------------|
| `ui-p` / `ui-px` / `ui-py` / `ui-pt`… | padding |
| `ui-m` / `ui-mx` / `ui-my` / `ui-mt`… | margin (supports negative) |
| `ui-gap` / `ui-gap-x` / `ui-gap-y` | gap |
| `ui-r` / `ui-rt` / `ui-rb` / `ui-rl` / `ui-rr` | border-radius |

**Formula** (plugin):

```text
clamp(min, calc(min + (max - min) * ((100vw - 20rem) / 55rem)), max)
```

Underscore is allowed instead of comma for Tailwind parsing: `ui-p-[20px_80px]`.

**Figma map:** collection **Spacing** — modes **Phone** / **Desktop**; **Radius** — same.

---

## 6. Breakpoints & layout

Aligned with Tailwind defaults + picture sources:

| Name | Width | Typical use |
|------|-------|-------------|
| Mobile | ≤639px | Default / `mobile` image source |
| `sm` | ≥640px | Tablet start · `tablet` images |
| `md` | ≥768px | Mid layout |
| `lg` | ≥1024px | Laptop · `laptop` images |
| `xl` | ≥1280px | Wide content |
| Desktop band | ≥1440px | `desktop` images (when `laptop` is set) |
| Wide | ≥1536px | `wide` images / ultra-wide stage |

Content width on marketing pages often uses `max-w-7xl` + horizontal padding `px-5 sm:px-8 lg:px-12`.

---

## 7. Media ratios

**Mixin:** `+uiPicture` · **Classes:** `.ui-media--*` in `_components.scss`

| Ratio key | Behavior |
|-----------|----------|
| `1x1` | 1 / 1 |
| `4x3` | 4 / 3 |
| `16x9` | 16 / 9 |
| `16x11` | 16 / 11 |
| `3x2` | 3 / 2 |
| `hero` | 4/3 → 16/11 from `sm` |
| `card` | 1/1 → 16/10 from `lg` |
| `stage` | 4/3 → 16/10 → 16/9 → 2.2/1 → 2.4/1 (escalating) |
| `billboard` | 3/2 → 16/9 → 21/9 → 2.75/1 |

**Image sources (largest match wins):**

| Prop | Media query |
|------|-------------|
| `wide` | `min-width: 1536px` |
| `desktop` | `1440px+` if `laptop` set, else `1024px+` |
| `laptop` | `min-width: 1024px` |
| `tablet` | `min-width: 640px` |
| `mobile` | `max-width: 639px` |
| `src` | fallback `<img>` |

Full-bleed: wrap with `.ui-media-bleed` outside `max-w-*`. Demo: `/media`.

---

## 8. Components (developer API)

### Button — `+uiButton`

```pug
include /components/button.pug
+uiButton('Start a project', { variant: 'primary', size: 'lg', href: '/#contact' })
+uiButton('Submit', { type: 'submit', variant: 'signal', disabled: false })
```

| Option | Values | Default |
|--------|--------|---------|
| `variant` | `primary` · `secondary` · `ghost` · `signal` | `primary` |
| `size` | `sm` · `lg` · *(empty = md)* | — |
| `href` | URL → renders `<a>` | — |
| `type` | button type when not link | `button` |
| `disabled` | boolean | `false` |

### Field — `+uiField`

```pug
include /components/field.pug
+uiField({ name: 'email', label: 'Email', type: 'email', required: true, hint: '…' })
+uiField({ name: 'brief', label: 'Brief', control: 'textarea', rows: 4, onDark: true })
+uiField({ name: 'bad', label: 'Error', invalid: true, error: 'Required.' })
```

| Option | Notes |
|--------|--------|
| `control` | `input` (default) or `textarea` |
| `onDark` | light text/borders on ink surfaces |
| `hint` / `error` | helper or error message (`aria-describedby`) |
| `invalid` | sets `aria-invalid` |

### Contact form

```pug
form.js-contact-form
  +uiField({ name: 'email', label: 'Email', type: 'email', required: true })
  +uiButton('Submit', { type: 'submit', variant: 'signal' })
```

```js
import { initContactForms } from './lib/forms.js';
initContactForms();
```

Demo success is simulated — replace with your API in `src/lib/forms.js`.

### Picture — `+uiPicture`

See §7. Optional `parallax: true` adds tall crop + `.js-parallax` (prefer dedicated `+uiParallax` for variants).

### Parallax — `+uiParallax`

| Option | Values |
|--------|--------|
| `variant` | `subtle` · `default` · `strong` |
| `direction` | `y` · `x` |
| `ratio` | same keys as picture |
| `bleed` | boolean |

Requires `showMotionLibs = true` (Lenis + GSAP + ScrollTrigger) and `initUiParallax()`.

### Focal — `+uiFocal`

Object-position per breakpoint (`mobile`, `desktop`, …). Init with `initUiFocal()`. Demo: `/images`.

### Chrome

| Piece | File | Notes |
|-------|------|--------|
| Header | `header.pug` | Fixed option via `headerFixed`; mobile nav a11y |
| Footer | `footer.pug` | `footerDark`, `footerLabel`, `footerMeta` |
| Layout | `default.pug` | SEO meta, skip link, fonts, scripts |

---

## 9. Motion & a11y (required behaviors)

| Requirement | Spec |
|-------------|------|
| Reduced motion | Honor `prefers-reduced-motion: reduce` — skip Lenis / heavy GSAP where guarded |
| Focus | `--focus-ring` on interactive controls |
| Skip link | First focusable → `#main-content` |
| Forms | Labels associated; errors via `aria-invalid` + `aria-describedby` |
| Images | Meaningful `alt`; decorative → empty `alt` |
| SEO | Set `pageTitle` + `pageDescription` per page in `block vars` |

---

## 10. Project map

```
src/
  layouts/default.pug       # shell: meta, fonts, header/footer hooks
  components/               # button, field, picture, parallax, focal, header, footer
  lib/                      # parallax.js, focal.js, forms.js
  pages/                    # one .pug → one route
  styles/
    _tokens.scss            # colors, fonts, shadows
    _typography.scss        # type clamp scale
    _spacing.scss           # space + radius clamp
    _components.scss        # btn, field, media
    _parallax.scss
    _focal.scss
    _site.scss
tailwind.config.js          # mirrors tokens + type + fluid space
tailwind.fluid.js           # ui-p-[min,max] plugin
```

---

## 11. Designer workflow (Figma)

**File:** [UI Template](https://www.figma.com/design/gTUJH3iRUxqBpAtNFwCEcS) (team **0°**)  
UI Template **is** the design system — one file.

| Page | Contents |
|------|----------|
| Cover | Index |
| Screens / Home | Home component — **Breakpoint** Desktop / Tablet / Phone |
| Components / Elements | Full gallery |
| Components / Button · Field · Media · Chrome | Specimens + usage |
| Foundations / Color · Typography · Spacing | Tokens + clamp education |

### Variables to use

| Collection | Modes | Maps to code |
|------------|-------|--------------|
| Color | Default | `_tokens.scss` |
| Spacing | Phone / Desktop | `_spacing.scss` `$space` |
| Radius | Phone / Desktop | `_spacing.scss` `$radius` |
| Type / Fluid | Phone / Tablet / Desktop | `_typography.scss` `$scale` |

### Previewing fluid type

1. Select **Home** instance (or a foundation frame).
2. Change **Breakpoint** (or **Type / Fluid** mode) — do **not** expect fonts to shrink when dragging width.
3. Confirm sizes against the tables in §§ 4–5.
4. Cross-check continuous clamp in the browser at `/typography`.

### Handoff checklist

- [ ] Colors only from Color variables (no one-off hex)
- [ ] Type from text styles bound to Type / Fluid
- [ ] Spacing from Spacing / Radius variables or documented arbitrary ranges
- [ ] Components match Elements gallery + code mixins
- [ ] Image ratios use named keys (`hero`, `stage`, …)
- [ ] Spec any custom `ui-p-[min,max]` ranges in the ticket

---

## 12. Developer workflow

1. Extend `layouts/default.pug`; set `pageTitle` / `pageDescription`.
2. Prefer mixins (`+uiButton`, `+uiField`, `+uiPicture`) over one-off markup.
3. Prefer `ui-*` type/space utilities over raw Tailwind type sizes for brand surfaces.
4. For custom fluid ranges, use `ui-p-[20px,80px]` (same unit on both ends).
5. Change tokens in `_tokens.scss` / `_typography.scss` / `_spacing.scss` — then update Figma variables to match.
6. Run `/typography` and `/components` before shipping UI changes.

### New page skeleton

```pug
extends /layouts/default.pug

block vars
  - pageTitle = 'Page — Studio'
  - pageDescription = 'One-line summary for SEO.'
  - activeNav = ''
  - scriptSrc = '/src/main.js'

block content
  main#main-content
    h1.ui-h1 Title
    p.ui-body-lg.text-steel Supporting copy.
```

---

## 13. Quick reference card

| Need | Use |
|------|-----|
| Hero title | `.ui-display-xl` |
| Section title | `.ui-h2` |
| Body | `.ui-body` / `.ui-body-lg` |
| Label / eyebrow | `.ui-mono` |
| Section padding | `ui-p-lg` or `ui-p-[24px,80px]` |
| Card gap | `ui-gap-md` |
| Soft corner | `ui-r-sm` / `ui-r-md` |
| Primary button | `+uiButton(…, { variant: 'primary' })` |
| Signal CTA | `variant: 'signal'` |
| Hero image | `+uiPicture({ ratio: 'hero', … })` |
| Brand blue | `blueprint` / `--color-blueprint` |

---

*Generated from the UI Template codebase. When specs change, update this file and the Figma Type / Fluid + Spacing collections together.*
