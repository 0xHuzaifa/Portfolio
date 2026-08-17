# 0xHuzaifa — Design System

> **Business complexity becomes engineered clarity.**

An editorial, architectural, minimal portfolio design system. Premium, calm, confident — never flashy, never noisy. This document is the single-file reference: tokens, foundations, components, and usage.

- **Namespace (runtime):** `window.Ds0xHuzaifaDesignSystem_ca18bf`
- **Global stylesheet:** link `styles.css` (imports every token + font)
- **Fonts:** Geist (display + body), Geist Mono (labels/numerals), Inter fallback

---

## 1. Colour

| Token                                | Value     | Role                                      |
| ------------------------------------ | --------- | ----------------------------------------- |
| `--beige-1`                          | `#E3DCCE` | Primary background (warm editorial beige) |
| `--beige-2`                          | `#DBD3C2` | Layered panel surface                     |
| `--beige-3`                          | `#D2C9B5` | Deepest warm neutral / hairline fills     |
| `--ink-1`                            | `#111111` | Primary text (near-black)                 |
| `--ink-2`                            | `#555555` | Secondary text                            |
| `--ink-3`                            | `#8A8378` | Tertiary / muted labels                   |
| `--paper`                            | `#FFFFFF` | Behind glass + imagery                    |
| `--yellow` (`--accent`)              | `#F6F23C` | The one accent — premium yellow           |
| `--yellow-deep` (`--accent-pressed`) | `#DCD824` | Pressed / deepened accent                 |

**Glass & alpha:** `--glass-fill` `rgba(255,255,255,.25)`, `--glass-fill-strong` `rgba(255,255,255,.55)`, `--glass-border` `rgba(255,255,255,.35)`, `--bg-type` `rgba(17,17,17,.05)` (5% background words), ink hairlines `--ink-a04/06/08/12`.

**Rules:** max 1–2 background colours per view · yellow is an accent only, never a background field · text on yellow is always ink, never white.

---

## 2. Typography

One geometric sans (Geist) does everything; Geist Mono for labels, numerals, code detail.

| Token          | Size               | Use               |
| -------------- | ------------------ | ----------------- |
| `--fs-hero`    | `clamp(64–120px)`  | Hero              |
| `--fs-display` | `clamp(56–80px)`   | Section titles    |
| `--fs-numeral` | `clamp(120–300px)` | Large numerals    |
| `--fs-lead`    | `22px`             | Lead paragraph    |
| `--fs-body`    | `18px`             | Body              |
| `--fs-label`   | `13px`             | Small mono labels |

**Tracking:** big display tight (`--ls-display` `-0.02em`, `--ls-hero` `-0.03em`); mono labels wide + uppercase (`--ls-label` `0.18em`). **Line-heights:** `--lh-tight .98`, `--lh-snug 1.1`, `--lh-body 1.55`. Weights 300–800.

---

## 3. Spacing & layout

- Scale: `--sp-1` 4px → `--sp-12` 200px (4·8·12·16·24·32·48·64·96·128·160·200).
- Grid: 12 columns, `--container-max` 1600px, `--content-max` 1360px, `--page-pad-x` `clamp(24–80px)`.
- Every section ≥ 100vh (`--section-min-h`); whitespace is a component. Never cram.

---

## 4. Corners, shadow, motion

- **Radii:** cards `--r-card` 24px · glass `--r-glass` 28px · buttons/pills `--r-pill` 999px · images `--r-image` 20px.
- **Shadow — exactly one:** `--shadow` `0 30px 80px rgba(0,0,0,.08)`. Hover `--shadow-hover` (+5%). Never hard shadows, no inner shadows.
- **Glass blur:** `--glass-blur` `blur(22px) saturate(140%)`.
- **Motion:** one easing `--ease` `cubic-bezier(.22,.61,.36,1)`, no elastic/bounce. Durations `--dur-fast` 200ms · `--dur-normal` 400ms · `--dur-large` 800ms · `--dur-section` 1200ms. Never fade-only — always fade **+** movement / blur **+** scale / drawing. Hover lift `--lift` -3px; pointer parallax capped `--mouse-parallax` 3px.

---

## 5. Components

Import from `window.Ds0xHuzaifaDesignSystem_ca18bf`.

### Buttons — `components/buttons/`

- **`PrimaryCTA`** — the loudest action; solid yellow pill, ink label. One per section. Props: `children, icon, iconRight, size(sm|md|lg), onClick, disabled`.
- **`SecondaryCTA`** — quiet outlined pill, no fill. Same props.
- **`GlassButton`** — frosted pill for secondary emphasis; use sparingly.

### Cards — `components/cards/`

- **`GlassCard`** — primary elevated surface. Props: `padding, radius(card|glass), strong, hover`.
- **`MetricCard`** — one proof point; oversized numeral + mono label. Props: `value, label, prefix, suffix, align, glass`.
- **`EditorialImage`** — magazine image frame + optional caption. Props: `src, alt, caption, ratio, radius, develop`.

### Content — `components/content/`

- **`SectionLabel`** — mono eyebrow with accent tick + optional `index`.
- **`LargeQuote`** — editorial pull quote. Props: `cite, role, size(sm|lg|xl)`.
- **`FloatingPills`** (+ **`Pill`**) — wrapped capsule row. Variants `solid|glass|accent|ghost`.
- **`TrustStrip`** — quiet client/stack wordmark band. Props: `items, label, align`.

### Diagram — `components/diagram/`

- **`Node`** — labelled diagram point; `active`, `glass` states.
- **`ConnectionLine`** — self-drawing SVG connector; `points, animate, dashed, duration`.
- **`Timeline`** — vertical editorial timeline; `items:[{year,title,body}]`.

---

## 6. Usage

```html
<link rel="stylesheet" href="styles.css" />
<!-- React 18 + Babel, then: -->
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { PrimaryCTA, GlassCard, SectionLabel } =
    window.Ds0xHuzaifaDesignSystem_ca18bf;
  // <SectionLabel index="00">Software engineer</SectionLabel>
  // <PrimaryCTA size="lg">Let's build together</PrimaryCTA>
</script>
```

**UI kit reference:** `ui_kits/portfolio/` — a full editorial portfolio (Hero → Trust → Projects → How I Think → Capabilities → About → Final CTA) composed entirely from these components.

---

## 7. Content voice

Short, declarative, vertical lines — copy grows, never pads. Sentence case for reading; UPPERCASE + wide tracking for mono labels only. Confident and precise, never hyped. No emoji, no unicode-glyph icons. Icons are monoline outline (Lucide recommended), passed as props. Every section answers one question; every piece of copy serves: _"This is the person I trust to build our product."_

---

## 8. Caveats

- **No logo provided** — the `0xHuzaifa` wordmark (yellow `0x`) stands in wherever a mark would go.
- **Fonts substituted** — Geist/Geist Mono via Google Fonts (Satoshi / General Sans need licensed files).
- **Icons** — recommendation only (Lucide); components accept icons as props.
- **Imagery** — all `EditorialImage` are placeholders; supply real photography via `src`.
