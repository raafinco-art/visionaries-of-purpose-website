# 03. UI/UX Material System

## Design intent

The interface should feel like a premium gospel performance environment translated into a physical control surface: deep lacquered blacks, burgundy enamel, restrained gold hardware, warm paper and carefully recessed controls. The target is **modern soft skeuomorphism**, not the low-contrast grey version commonly called neumorphism.

The system must remain legible, fast and keyboard accessible. Texture and shadow support hierarchy; they never replace borders, labels, focus states or contrast.

## Creative calibration

- Design variance: 7/10
- Motion intensity: 5/10
- Visual density: 4/10
- Brand character: purposeful, devotional, theatrical, assured, warm
- Layout character: editorial asymmetry with stable reading order

## Colour tokens

The root brand board is the canonical visual reference. Use semantic tokens so a component does not hard-code a named colour.

```css
:root {
  --brand-burgundy: #760d17;
  --brand-crimson: #b71927;
  --brand-obsidian: #090707;
  --brand-graphite: #211a1b;
  --brand-gold: #d1a33b;
  --brand-antique-gold: #9b6b1b;
  --brand-ivory: #f5efe4;

  --surface-stage: #050505;
  --surface-executive: #0c0a0a;
  --surface-raised: #211a1b;
  --surface-paper: #f7f1e6;
  --text-on-dark: #f4f1ed;
  --text-on-light: #211a1b;
  --text-muted-dark: #b6aca5;
  --action-primary: #b71927;
  --action-primary-hover: #d01f2e;
  --accent-metal: #c59a3a;
  --border-dark: rgba(245, 239, 228, 0.16);
  --border-light: rgba(33, 26, 27, 0.18);
  --focus-ring: #d1a33b;
  --status-success: #3f7d58;
  --status-warning: #a66b13;
  --status-error: #b71927;
}
```

Gold is an accent for focus, selected states, hairlines, dates and small typographic details. It is not a paragraph colour. Burgundy and crimson carry primary actions. Check every actual colour pairing with an automated contrast tool; normal text must meet WCAG AA.

## Typography

Use only the supplied brand families unless a safe system fallback is temporarily required:

| Role | Family | Approximate use |
|---|---|---|
| Primary headings, navigation, body and buttons | Cabinet Grotesk | 65% |
| Event dates, labels, utility metadata and compact counters | Barlow Condensed | 20% |
| Editorial pull quotes, selective display words and refined story accents | Bodoni Moda | 15% |

Cabinet Grotesk's supplied archive includes web-ready WOFF2 files. The supplied Barlow Condensed and Bodoni Moda archives contain TTF files; create or obtain properly licensed WOFF2 versions before production. Do not ship the whole ZIP archive to the browser. Preserve the font licences.

Suggested type scale:

```css
:root {
  --step--1: clamp(0.82rem, 0.79rem + 0.13vw, 0.9rem);
  --step-0: clamp(1rem, 0.95rem + 0.22vw, 1.12rem);
  --step-1: clamp(1.25rem, 1.12rem + 0.55vw, 1.56rem);
  --step-2: clamp(1.56rem, 1.32rem + 1vw, 2.13rem);
  --step-3: clamp(1.95rem, 1.52rem + 1.8vw, 3rem);
  --step-4: clamp(2.44rem, 1.72rem + 3vw, 4.2rem);
  --step-5: clamp(3.05rem, 1.85rem + 5vw, 6rem);
}
```

Use sentence case for headings and buttons. Do not substitute Impact, Druk, Arial or Inter for the supplied brand typography.

## Material vocabulary

### 1. Stage black

The default dark canvas. It may have a very subtle radial glow or fine noise, but not a busy pattern. Use for hero areas, event experiences and full-width transitions.

### 2. Burgundy enamel

Use for primary buttons, selected tabs and small sculpted controls. A highlight along the upper edge and a deeper lower shadow can suggest lacquered hardware.

### 3. Warm paper

Use ivory and cream for longer reading sections, policy pages and editorial news. Dark text and thin graphite rules keep it grounded.

### 4. Gold hardware

Use as a one-pixel rule, ring, icon detail, date marker or small inset edge. Never cover large backgrounds in a fake metallic gradient.

### 5. Liquid glass

Restrict translucent glass to the sticky navigation, mobile menu, modal/drawer and optional mini-player. A component must remain readable when `backdrop-filter` is unsupported.

## Elevation, radii and borders

```css
:root {
  --radius-control: 999px;
  --radius-input: 0.75rem;
  --radius-card: 1.25rem;
  --radius-panel: 1.75rem;

  --shadow-raised-dark:
    -10px -10px 24px rgba(63, 48, 50, 0.18),
    12px 14px 30px rgba(0, 0, 0, 0.48),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  --shadow-inset-dark:
    inset 5px 5px 12px rgba(0, 0, 0, 0.48),
    inset -4px -4px 10px rgba(255, 255, 255, 0.04);
  --shadow-paper:
    0 18px 45px rgba(33, 26, 27, 0.13),
    inset 0 1px 0 rgba(255, 255, 255, 0.72);
}
```

Use at most three simultaneous elevation levels on a screen. Every interactive inset control still needs a visible border or focus ring. Avoid nesting raised cards inside raised cards.

## Spacing and layout

- Base spacing unit: 4px, composed mainly in 8px increments.
- Content maximum: 1240px.
- Reading measure: 62 to 72 characters.
- Page gutters: `clamp(1rem, 4vw, 4rem)`.
- Section block spacing: `clamp(4.5rem, 9vw, 9rem)`.
- Test widths: 375, 768, 1024 and 1440px.
- No horizontal overflow at 320px.

Do not center every section. Use image-to-type counterpoint, offset metadata, cropped full-bleed imagery, selective vertical rules and alternating alignment. Keep DOM order logical when the wide layout is visually asymmetric.

## Component geometry

- Buttons: minimum 44 by 44px, pill-shaped, strong text label and optional SVG icon.
- Inputs: minimum 48px high, 12px radius, persistent label, strong focus ring.
- Cards: 20px radius for content cards, but use them selectively.
- Portraits and posters: preserve their natural visual identity. Do not mask every image into the same rounded rectangle.
- Icons: use a consistent SVG set. No emoji icons.

## Interaction states

Every control needs default, hover, focus-visible, active, disabled, loading, success and error treatment where applicable.

- Hover lifts a raised control by no more than 2px.
- Active states feel pressed using a small translation and inset shadow.
- Keyboard focus uses a visible 2px gold ring with at least 2px offset.
- Disabled controls retain readable text and use `cursor: not-allowed` only when appropriate.
- Error states include text and an icon, never colour alone.
- Loading labels describe the action, such as **Subscribing...**, rather than only showing a spinner.

## Accessibility baseline

- Provide a skip link, landmarks, logical headings and visible focus.
- Use semantic buttons and links. Do not make a `div` behave like a button.
- Use actual labels for form controls. Place help and error text next to the relevant field.
- Preserve 200% zoom, text reflow and browser font scaling.
- All hover information must also be available to touch and keyboard users.
- Respect `prefers-reduced-motion` and `prefers-contrast` where useful.
- Avoid text baked into promotional imagery as the only accessible event information.

## Responsive behaviour

| Region | Narrow screens | Wide screens |
|---|---|---|
| Navigation | Compact mark, menu button, full-height accessible sheet | Sticky horizontal navigation |
| Hero | Text first, controlled crop, actions stacked | Editorial split or layered composition |
| Service section | Text then image | Alternating 5/7 or 7/5 split |
| Artist profiles | Single reading column | Offset portrait and editorial copy |
| Events | Left-rail timeline | Alternating timeline around central rail |
| Footer | Stacked groups | Asymmetric multi-column layout |

## Prohibited patterns

- Low-contrast grey-on-grey soft UI
- Blue or green snippets from the older prompt experiments
- Repeated generic icon cards for every section
- Excessive gradients, glows, glass or gold
- Floating rounded containers around every block
- Fake dashboards, fabricated music players or invented platform metrics
- Text over a busy image without a robust contrast layer
- Tiny uppercase labels with wide letter spacing as decoration everywhere
- Arbitrary `z-index` values

