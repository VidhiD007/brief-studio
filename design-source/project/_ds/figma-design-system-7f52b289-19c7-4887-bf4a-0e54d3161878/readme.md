# Figma Design System

A design system capturing Figma's marketing visual language — the confident black-and-white editorial frame interrupted by oversized, hand-cut pastel color blocks.

## Source

Built from analysis at [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (`design-md/figma/` subtree). The original `DESIGN.md` was generated via design.md tooling from Figma's public marketing surfaces (figma.com home, /design/, /figjam/, /pricing/, /contact/). Explore that repository for the full raw analysis and additional context.

## Product Context

Figma is a collaborative design tool with several product surfaces:
- **Figma Design** — the core vector/UI design editor
- **FigJam** — a whiteboarding/brainstorming tool
- **Dev Mode** — a developer handoff surface
- **Figma Slides** — a presentation tool

This design system covers the **marketing website** — the public-facing figma.com pages that promote these products. It does not cover the in-product editor UI.

## Font Substitution Notice

⚠️ **figmaSans** and **figmaMono** are proprietary Figma typefaces not publicly available. This system substitutes:
- **Inter** (variable, Google Fonts) for figmaSans — closely matches the fine-grained weight axis (320–700)
- **JetBrains Mono** (Google Fonts) for figmaMono — matches the monospace character

Inter's x-height is slightly taller; line-heights have been kept as documented. If you have access to the original figmaSans/figmaMono files, replace them in `tokens/fonts.css`.

---

## CONTENT FUNDAMENTALS

### Tone & Voice
- **Confident but not aggressive.** Copy is declarative: "Design and prototype in the same tool" rather than "We help you design and prototype."
- **Second person sparingly.** Headlines address capability, not the reader: "Where teams design together" rather than "Where you design together." Body copy uses "you" when explaining benefits.
- **No exclamation marks** in headlines. Enthusiasm comes from the color blocks, not punctuation.
- **Short sentences.** Body paragraphs rarely exceed 2–3 sentences. The system prefers a headline + one supporting line over a paragraph.

### Casing
- **Sentence case everywhere.** Headlines, buttons, nav items, eyebrows — all sentence case. The only exception is the figmaMono eyebrow/caption role which is set in **uppercase** with positive letter-spacing.
- Button labels: "Get started for free", "Contact sales" — sentence case, action-first.

### Copy Patterns
- **Eyebrow → Headline → Body** is the recurring content block. The eyebrow (mono, uppercase, small) names the category; the headline (display, light weight) makes the claim; the body (18–20px, weight 320–330) supports it.
- Product names are always capitalized: Figma, FigJam, Dev Mode, Figma Slides.
- No emoji. No Unicode decorative characters. Icons are structural, not decorative.

### Vibe
Editorial, technical, joyful. The monochrome system reads like a well-set magazine; the color blocks inject playfulness without undermining credibility. The brand feels like "a tool for serious work, made by people who like color."

---

## VISUAL FOUNDATIONS

### Colors
The system is fundamentally **monochrome** — black ink on white canvas — with narrative color delivered through oversized pastel **color-block sections** that take over entire viewport regions.

- **Core pair:** Pure black (#000) primary + pure white (#fff) canvas. No grays for text — hierarchy is expressed through font weight, not color opacity.
- **Color blocks:** Lime (#dceeb1), Lilac (#c5b0f4), Cream (#f4ecd6), Pink (#efd4d4), Mint (#c8e6cd), Coral (#f3c9b6), Navy (#1f1d3d). These are surfaces, not accents — they fill entire sections.
- **Single accent:** Magenta (#ff3d8b) for promotional CTAs only. One per page maximum.
- **Surface soft:** Off-white (#f7f7f5) for cards/tiles sitting on white canvas.

### Typography
Single variable typeface (Inter, substituting for figmaSans) modulated at fine weight increments:
- Display: 86px and 64px at weight 340, tight negative tracking (-1.72px, -0.96px)
- Headlines: 26px at weight 540
- Body: 18–20px at weight 320–330
- Buttons/links: 20px at weight 480
- Mono (JetBrains Mono): reserved for eyebrows (18px) and captions (12px), always uppercase with positive tracking

### Spacing
8px base unit. Section gaps are 96px. Color-block interior padding is 48px. Card padding is 24px. The system is generous with whitespace — every color block is separated by a full white-canvas return.

### Backgrounds
- **White canvas** is the default surface — the majority of page area
- **Pastel color blocks** are full-width panels with 24px rounded corners, used as section containers
- **No gradients.** No background images. No textures or patterns. Color is flat and confident.
- The only dark surface above the footer is the navy color block (#1f1d3d)

### Borders & Shadows
- **Minimal shadows.** The system is shadow-light by design — color blocks substitute for elevation.
- Hairline borders (#e6e6e6, 1px) on form inputs, pricing cards, table dividers
- Soft shadow (0 4px 16px rgba(0,0,0,0.06)) only for floating elements like dropdown menus
- No borders on color-block sections — the color itself is the boundary

### Corner Radii
- Buttons: pill (50px) — the only button shape; no square buttons anywhere
- Icon buttons: full circle (9999px)
- Cards and color blocks: 24px
- Inputs and image frames: 8px
- Small chips: 6px

### Hover & Press States
- **Hover:** Subtle — no color change on primary buttons; cursor pointer is the primary signal
- **Press:** Micro-scale (slight shrink) rather than darkened fill on primary buttons
- **Links:** Weight 480 (heavier than body) is the resting state; underline on hover
- No opacity-based hover states. No color shifts on hover for buttons.

### Animation
- **Scroll-triggered reveals** for color-block sections and template grids
- **Marquee strip** auto-scrolls customer logos
- **No bounces, no elastic easing.** Transitions are smooth and editorial.
- Lazy-loaded template thumbnails animate in on scroll

### Layout
- Max content width ~1280px with responsive gutters
- Color-block sections break the column grid — full content width with generous interior margins (often >25% of block width on each side)
- 3- and 4-column grids for pricing and template galleries
- White canvas always separates color blocks — never stack two blocks adjacently

### Cards
- **Pricing cards:** White, hairline border (#e6e6e6), 24px radius, 24px padding. No shadow.
- **Template cards:** Off-white (#f7f7f5), 8px radius, 16px padding
- **Feature tiles:** Off-white, 8px radius, 24px padding, eyebrow label

### Transparency & Blur
- Overlay scrim: black at 60% opacity for modals/lightboxes
- Icon buttons on dark surfaces: white at ~16% opacity background
- No frosted-glass/blur effects on marketing surfaces

### Imagery
- Product UI mocks are shown as flat compositions on color blocks — no device frames
- No avatar circles — marketing avoids personification
- Image frames use 8px radius
- FigJam thumbnails have slight off-axis rotation (sticky-note collage style)

---

## ICONOGRAPHY

Figma's marketing surfaces use **minimal iconography**. The design relies on typography and color blocks rather than icons for visual communication.

- **No icon font** is used on the marketing site
- **Comparison checkmarks** use a simple green (#1ea64a) circle glyph in pricing tables
- **Navigation icons:** Hamburger menu on mobile, minimal chevrons for dropdowns
- **Social media icons** appear in the footer as simple SVG glyphs
- **No emoji** anywhere in marketing copy
- **No decorative icons** — the system prefers typographic hierarchy over icon-driven navigation

Since the source material contains no extractable icon assets, this design system does not bundle an icon set. For implementations, use a minimal icon library matching the stroke weight aesthetic — **Lucide** (1.5px stroke) is the closest match to Figma's thin, clean icon style.

```html
<!-- Recommended CDN for icons -->
<link rel="stylesheet" href="https://unpkg.com/lucide-static@latest/font/lucide.css">
```

⚠️ **No logo available.** The source analysis does not include Figma's logo or wordmark assets. The brand name "Figma" is rendered in plain type (Inter at display weight) wherever a logo would appear. If you have access to official logo files, add them to `assets/logo.svg`.

---

## FILES & STRUCTURE

```
styles.css                  — Root stylesheet (@import only)
tokens/
  fonts.css                 — Google Fonts imports (Inter, JetBrains Mono)
  colors.css                — Color custom properties
  typography.css            — Type scale custom properties
  spacing.css               — Spacing scale custom properties
  radii.css                 — Border radius custom properties
  elevation.css             — Shadow & scrim custom properties
guidelines/
  *.html                    — Foundation specimen cards (colors, type, spacing, etc.)
components/
  buttons/                  — Button, IconButton
  inputs/                   — TextInput
  cards/                    — Card, PricingCard, TemplateCard
  layout/                   — ColorBlock, MarqueeStrip
  navigation/               — TopNav
  feedback/                 — Badge, PromoBanner
ui_kits/
  marketing-site/           — Full Figma homepage recreation
assets/                     — Logos, icons (empty — see Iconography note above)
readme.md                   — This file
SKILL.md                    — Agent skill manifest
github.md                   — Source repo association
```

## Components

| Component | Path | Description |
|-----------|------|-------------|
| Button | `components/buttons/` | Primary, secondary, tertiary, magenta promo pills |
| IconButton | `components/buttons/` | Circular icon buttons (light + inverse) |
| TextInput | `components/inputs/` | Form text input with hairline border |
| Card | `components/cards/` | Generic content card |
| PricingCard | `components/cards/` | Pricing tier card with feature list |
| TemplateCard | `components/cards/` | Template thumbnail tile |
| ColorBlock | `components/layout/` | Full-width pastel section container |
| MarqueeStrip | `components/layout/` | Scrolling logo ribbon |
| TopNav | `components/navigation/` | Sticky navigation bar |
| Badge | `components/feedback/` | Small label badge |
| PromoBanner | `components/feedback/` | Inline promotional banner |

## UI Kits

| Kit | Path | Description |
|-----|------|-------------|
| Marketing Site | `ui_kits/marketing-site/` | Figma homepage hero + sections recreation |
