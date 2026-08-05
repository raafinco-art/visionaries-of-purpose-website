# Vissionaries of Purpose Website Typography System

## 1. Purpose

This document defines how the official Vissionaries of Purpose typefaces must be used across the website.

The typography system must communicate:

- Premium music-industry positioning
- Artistic excellence
- Faith-led purpose
- Live-performance energy
- Technical professionalism
- Strong readability across desktop and mobile devices

Each typeface has a specific role and must not be applied randomly.

---

# 2. Official Website Typefaces

## 2.1 Cabinet Grotesk

**Primary website typeface**

Cabinet Grotesk is the main visual voice of Vissionaries of Purpose.

Use it for:

- Main website headings
- Navigation links
- Body copy
- Service titles
- Artist names
- Buttons
- Form labels
- Footer links
- Booking information
- Contact information
- Card headings
- General interface text

### Recommended weights

- Regular 400
- Medium 500
- Bold 700
- ExtraBold 800
- Black 900

### Font link

[Cabinet Grotesk on Fontshare](https://www.fontshare.com/fonts/cabinet-grotesk)

---

## 2.2 Bodoni Moda

**Editorial and prestige typeface**

Bodoni Moda should be reserved for premium, artistic and emotionally significant typography.

Use it for:

- Hero statements
- Featured artist names
- Album names
- Release titles
- Editorial quotations
- Artist campaign headlines
- Large decorative numbers
- Premium booking presentations
- Selected lyrical statements
- Important brand statements

### Recommended weights

- Regular 400
- Medium 500
- SemiBold 600
- Bold 700
- Italic

### Font link

[Bodoni Moda on Google Fonts](https://fonts.google.com/specimen/Bodoni+Moda)

---

## 2.3 Barlow Condensed

**Performance, event and utility typeface**

Barlow Condensed is the functional typeface for event information, dates, venues, technical details and compact information.

Use it for:

- Event dates
- Performance times
- Venue names
- Tour schedules
- Category labels
- Equipment specifications
- Stage measurements
- Production details
- Ticket information
- Poster-style event text
- Technical cards
- Image captions
- Metadata

### Recommended weights

- Medium 500
- SemiBold 600
- Bold 700
- ExtraBold 800
- Black 900

### Font link

[Barlow Condensed on Google Fonts](https://fonts.google.com/specimen/Barlow+Condensed)

---

# 3. Font Distribution

The website should approximately follow this distribution:

| Typeface | Percentage of Website Use |
|---|---:|
| Cabinet Grotesk | 65% |
| Barlow Condensed | 20% |
| Bodoni Moda | 15% |

Cabinet Grotesk must remain dominant. Bodoni Moda should feel special because it is used sparingly. Barlow Condensed should create rhythm and structure around dates, categories and technical information.

---

# 4. Font File Structure

The website should preferably self-host the font files.

```text
public/
└── fonts/
    ├── cabinet-grotesk/
    │   ├── CabinetGrotesk-Regular.woff2
    │   ├── CabinetGrotesk-Medium.woff2
    │   ├── CabinetGrotesk-Bold.woff2
    │   ├── CabinetGrotesk-Extrabold.woff2
    │   └── CabinetGrotesk-Black.woff2
    │
    ├── bodoni-moda/
    │   ├── BodoniModa-Regular.woff2
    │   ├── BodoniModa-Medium.woff2
    │   ├── BodoniModa-SemiBold.woff2
    │   ├── BodoniModa-Bold.woff2
    │   └── BodoniModa-Italic.woff2
    │
    └── barlow-condensed/
        ├── BarlowCondensed-Medium.woff2
        ├── BarlowCondensed-SemiBold.woff2
        ├── BarlowCondensed-Bold.woff2
        ├── BarlowCondensed-ExtraBold.woff2
        └── BarlowCondensed-Black.woff2
```

Use `woff2` files wherever possible.

---

# 5. Font Loading

## 5.1 Cabinet Grotesk

```css
@font-face {
  font-family: "Cabinet Grotesk";
  src: url("/fonts/cabinet-grotesk/CabinetGrotesk-Regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "Cabinet Grotesk";
  src: url("/fonts/cabinet-grotesk/CabinetGrotesk-Medium.woff2") format("woff2");
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: "Cabinet Grotesk";
  src: url("/fonts/cabinet-grotesk/CabinetGrotesk-Bold.woff2") format("woff2");
  font-style: normal;
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: "Cabinet Grotesk";
  src: url("/fonts/cabinet-grotesk/CabinetGrotesk-Extrabold.woff2") format("woff2");
  font-style: normal;
  font-weight: 800;
  font-display: swap;
}

@font-face {
  font-family: "Cabinet Grotesk";
  src: url("/fonts/cabinet-grotesk/CabinetGrotesk-Black.woff2") format("woff2");
  font-style: normal;
  font-weight: 900;
  font-display: swap;
}
```

## 5.2 Bodoni Moda

```css
@font-face {
  font-family: "Bodoni Moda";
  src: url("/fonts/bodoni-moda/BodoniModa-Regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "Bodoni Moda";
  src: url("/fonts/bodoni-moda/BodoniModa-Medium.woff2") format("woff2");
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: "Bodoni Moda";
  src: url("/fonts/bodoni-moda/BodoniModa-SemiBold.woff2") format("woff2");
  font-style: normal;
  font-weight: 600;
  font-display: swap;
}

@font-face {
  font-family: "Bodoni Moda";
  src: url("/fonts/bodoni-moda/BodoniModa-Bold.woff2") format("woff2");
  font-style: normal;
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: "Bodoni Moda";
  src: url("/fonts/bodoni-moda/BodoniModa-Italic.woff2") format("woff2");
  font-style: italic;
  font-weight: 400;
  font-display: swap;
}
```

## 5.3 Barlow Condensed

```css
@font-face {
  font-family: "Barlow Condensed";
  src: url("/fonts/barlow-condensed/BarlowCondensed-Medium.woff2") format("woff2");
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: "Barlow Condensed";
  src: url("/fonts/barlow-condensed/BarlowCondensed-SemiBold.woff2") format("woff2");
  font-style: normal;
  font-weight: 600;
  font-display: swap;
}

@font-face {
  font-family: "Barlow Condensed";
  src: url("/fonts/barlow-condensed/BarlowCondensed-Bold.woff2") format("woff2");
  font-style: normal;
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: "Barlow Condensed";
  src: url("/fonts/barlow-condensed/BarlowCondensed-ExtraBold.woff2") format("woff2");
  font-style: normal;
  font-weight: 800;
  font-display: swap;
}

@font-face {
  font-family: "Barlow Condensed";
  src: url("/fonts/barlow-condensed/BarlowCondensed-Black.woff2") format("woff2");
  font-style: normal;
  font-weight: 900;
  font-display: swap;
}
```

---

# 6. Global Font Variables

```css
:root {
  --font-brand: "Cabinet Grotesk", "Helvetica Neue", Arial, sans-serif;
  --font-editorial: "Bodoni Moda", Georgia, "Times New Roman", serif;
  --font-utility: "Barlow Condensed", "Arial Narrow", Arial, sans-serif;
}
```

---

# 7. Global Typography Reset

```css
html {
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  font-family: var(--font-brand);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-primary);
  background: var(--color-background);
}

button,
input,
textarea,
select {
  font: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin-top: 0;
}

strong,
b {
  font-weight: 700;
}
```

---

# 8. Responsive Type Scale

```css
:root {
  --text-hero: clamp(3.25rem, 8vw, 7.5rem);
  --text-display: clamp(2.75rem, 6vw, 5.5rem);
  --text-h1: clamp(2.25rem, 4.5vw, 4rem);
  --text-h2: clamp(1.75rem, 3vw, 3rem);
  --text-h3: clamp(1.35rem, 2vw, 2rem);
  --text-h4: clamp(1.125rem, 1.5vw, 1.5rem);
  --text-body-large: clamp(1.063rem, 1.3vw, 1.25rem);
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-label: 0.813rem;
}
```

Use `clamp()` so typography scales smoothly between mobile and desktop.

---

# 9. Website Typography Hierarchy

## 9.1 Hero Display

Use for:

- Homepage hero statement
- Featured artist campaign
- Major release introduction
- Premium label statement

```css
.type-hero {
  font-family: var(--font-editorial);
  font-size: var(--text-hero);
  font-weight: 500;
  line-height: 0.92;
  letter-spacing: -0.04em;
  max-width: 12ch;
}
```

Rules:

- Use Bodoni Moda.
- Keep the statement short.
- Maximum recommended length is 8 words.
- Use title case or sentence case.
- Do not use full uppercase.
- Do not add heavy shadows or glow effects.
- Do not place it over a busy section of an artist's face.

```html
<h1 class="type-hero">Where purpose meets artistry</h1>
```

---

## 9.2 Primary Website Heading

Use for main section headings, service introductions, artist sections and booking pages.

```css
.type-heading-primary {
  font-family: var(--font-brand);
  font-size: var(--text-display);
  font-weight: 900;
  line-height: 0.98;
  letter-spacing: -0.04em;
  max-width: 14ch;
}
```

```html
<h2 class="type-heading-primary">
  Artist management and live production
</h2>
```

---

## 9.3 Section Heading

```css
.type-heading-section {
  font-family: var(--font-brand);
  font-size: var(--text-h2);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.025em;
}
```

Use for:

- Featured artists
- Upcoming events
- Our services
- Latest releases
- Production services
- Contact and booking sections

---

## 9.4 Card Heading

```css
.type-heading-card {
  font-family: var(--font-brand);
  font-size: var(--text-h4);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
}
```

Use for artist cards, event cards, service cards, articles and booking packages.

---

## 9.5 Editorial Heading

```css
.type-heading-editorial {
  font-family: var(--font-editorial);
  font-size: var(--text-h1);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.03em;
}
```

Use only when a heading requires elegance, emotion or prestige.

---

## 9.6 Category Label

```css
.type-label {
  font-family: var(--font-utility);
  font-size: var(--text-label);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```

Use for labels such as:

- Featured artist
- Upcoming performance
- Live production
- New release
- Artist management
- Booking information
- Equipment specification

---

## 9.7 Body Copy

```css
.type-body {
  font-family: var(--font-brand);
  font-size: var(--text-body);
  font-weight: 400;
  line-height: 1.65;
  letter-spacing: 0;
  max-width: 68ch;
}
```

Rules:

- Keep line length between 55 and 72 characters.
- Use left alignment for long text.
- Do not justify paragraphs.
- Do not use Bodoni Moda for long paragraphs.
- Avoid text smaller than 16px for essential information.
- Use paragraph spacing rather than excessive line breaks.

---

## 9.8 Large Introductory Copy

```css
.type-intro {
  font-family: var(--font-brand);
  font-size: var(--text-body-large);
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.01em;
  max-width: 60ch;
}
```

Use for opening paragraphs, artist introductions and service summaries.

---

## 9.9 Event Information

```css
.type-event-meta {
  font-family: var(--font-utility);
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

```html
<p class="type-event-meta">
  31 JUL 2026 · POLOKWANE · 18:00
</p>
```

Use for dates, times, venues, ticket information and performance schedules.

---

## 9.10 Technical Specifications

```css
.type-specification {
  font-family: var(--font-utility);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.05em;
}
```

Use for stage size, sound equipment, lighting packages, backline quantities, in-ear specifications, LED dimensions and production requirements.

---

# 10. Navigation Typography

```css
.site-nav a {
  font-family: var(--font-brand);
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.01em;
  text-decoration: none;
}
```

Rules:

- Use Cabinet Grotesk Medium.
- Use sentence case.
- Do not write the entire navigation in uppercase.
- Keep labels short.
- Use visible hover and focus states.
- Do not use Bodoni Moda in navigation.

Recommended labels:

```text
Home
Artists
Services
Events
About
Contact
```

---

# 11. Button Typography

## 11.1 Primary Button

```css
.button-primary {
  font-family: var(--font-brand);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
}
```

Use for:

- Book an artist
- Contact the label
- Request production
- Get tickets
- Explore services

## 11.2 Secondary Utility Button

```css
.button-utility {
  font-family: var(--font-utility);
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

Use for:

- View details
- Add to calendar
- Download profile
- Event information

Rules:

- Do not use Bodoni Moda inside buttons.
- Keep wording direct.
- Do not invent unapproved slogans.
- Use strong contrast.
- Ensure focus states are visible.

---

# 12. Artist Cards

```css
.artist-card__name {
  font-family: var(--font-brand);
  font-size: clamp(1.5rem, 2vw, 2.25rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.025em;
}

.artist-card--featured .artist-card__name {
  font-family: var(--font-editorial);
  font-weight: 500;
}

.artist-card__role {
  font-family: var(--font-utility);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

```html
<article class="artist-card">
  <p class="artist-card__role">Worshiper · Composer</p>
  <h3 class="artist-card__name">Tshepiso SK</h3>
  <p class="type-body">
    Artist introduction or short profile copy.
  </p>
</article>
```

---

# 13. Event Cards

```css
.event-card__date {
  font-family: var(--font-utility);
  font-size: clamp(2rem, 4vw, 4.5rem);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.02em;
}

.event-card__title {
  font-family: var(--font-brand);
  font-size: var(--text-h3);
  font-weight: 800;
  line-height: 1.05;
}

.event-card__venue,
.event-card__time {
  font-family: var(--font-utility);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

Rules:

- The date should be visually dominant.
- Use Barlow Condensed for dates and times.
- Use Cabinet Grotesk for the event title.
- Use Bodoni Moda only for premium editorial treatment.
- Hide the ticket button when no ticket link is available.
- Keep add-to-calendar wording consistent.

---

# 14. Artist Biography Pages

Recommended hierarchy:

1. Category label in Barlow Condensed
2. Artist name in Bodoni Moda or Cabinet Grotesk
3. Artist role in Barlow Condensed
4. Introductory paragraph in Cabinet Grotesk Medium
5. Full biography in Cabinet Grotesk Regular
6. Important quotation in Bodoni Moda Italic

```html
<header class="artist-profile__header">
  <p class="type-label">Featured Artist</p>
  <h1 class="type-heading-editorial">Tshepiso SK</h1>
  <p class="type-event-meta">Singer · Worshiper · Composer</p>
</header>

<p class="type-intro">
  Introductory artist statement.
</p>

<div class="type-body">
  <p>Full biography content.</p>
</div>

<blockquote class="artist-quote">
  Where purpose meets artistry.
</blockquote>
```

```css
.artist-quote {
  font-family: var(--font-editorial);
  font-size: clamp(1.75rem, 4vw, 4rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.03em;
  max-width: 18ch;
}
```

---

# 15. Services Pages

Use this hierarchy:

- Category label: Barlow Condensed Bold
- Main heading: Cabinet Grotesk Black
- Supporting introduction: Cabinet Grotesk Medium
- Service-card title: Cabinet Grotesk Bold
- Specification list: Barlow Condensed SemiBold
- Body description: Cabinet Grotesk Regular
- Button: Cabinet Grotesk Bold

Example service headings:

```text
Artist Management
Artist Bookings
Live Sound
Stage Production
Lighting
LED Screens
Backline Supply
In-Ear Monitoring
Live Band Performances
```

---

# 16. Forms and Booking Interfaces

```css
.form-label {
  font-family: var(--font-brand);
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.2;
}

.form-help {
  font-family: var(--font-brand);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.45;
}

.form-error {
  font-family: var(--font-brand);
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.35;
}
```

Rules:

- Use Cabinet Grotesk throughout forms.
- Do not use condensed fonts inside input fields.
- Labels must remain visible.
- Do not depend only on placeholder text.
- Error messages must be direct and readable.
- Use a minimum input text size of 16px.

---

# 17. Footer Typography

```css
.site-footer__heading {
  font-family: var(--font-utility);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.site-footer__link,
.site-footer__text {
  font-family: var(--font-brand);
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.5;
}
```

Use Cabinet Grotesk for contact details and links. Use Barlow Condensed for footer category headings.

---

# 18. Typography Colour Rules

## Dark backgrounds

- Main headings: cream or soft white
- Body copy: warm off-white or light grey
- Editorial accents: metallic gold
- Category labels: signature red
- Secondary information: muted stone grey

## Light backgrounds

- Main headings: executive black
- Body copy: dark graphite
- Editorial headings: merlot or black
- Category labels: signature red
- Gold: limited to short accents and rules

## Gold restrictions

Gold may be used for:

- One important word
- Artist names
- Selected numbers
- Editorial titles
- Small premium labels
- Decorative initials

Gold must not be used for:

- Long paragraphs
- Form instructions
- Navigation
- Dense technical information
- Large body-copy blocks

---

# 19. Typography Over Images

```css
.media-overlay {
  background:
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.88) 0%,
      rgba(0, 0, 0, 0.55) 45%,
      rgba(0, 0, 0, 0.08) 100%
    );
}
```

Rules:

- Do not place text over an artist's eyes or face.
- Do not use thin weights over photographs.
- Do not use outline-only text for essential information.
- Do not use large glows.
- Do not place long paragraphs directly over images.
- Maintain readable contrast at every screen size.

---

# 20. Mobile Typography

```css
@media (max-width: 768px) {
  .type-hero {
    line-height: 0.96;
    letter-spacing: -0.025em;
    max-width: 10ch;
  }

  .type-heading-primary {
    line-height: 1;
    letter-spacing: -0.025em;
  }

  .type-body {
    line-height: 1.6;
  }

  .type-event-meta {
    letter-spacing: 0.06em;
  }
}
```

Mobile rules:

- Hero text must not clip.
- Large headings should use shorter line lengths.
- Body copy must remain at least 16px.
- Condensed event information may wrap into two lines.
- Avoid more than three font sizes inside one card.
- Reduce extreme letter spacing on smaller screens.

---

# 21. Accessibility Rules

- Essential body copy must not be smaller than 16px.
- Text must maintain strong contrast.
- Links must be identifiable beyond colour alone.
- Focus states must be visible.
- Headings must follow correct semantic order.
- Do not skip directly from `h1` to `h4`.
- Do not use uppercase for long paragraphs.
- Avoid condensed type for body copy.
- Avoid permanently embedding important text inside images.
- Important event information must also appear as webpage text.

---

# 22. Semantic HTML Structure

Typography classes should not replace semantic HTML.

Correct:

```html
<section>
  <p class="type-label">Featured Artists</p>
  <h2 class="type-heading-primary">Voices shaped by purpose</h2>
  <p class="type-intro">
    Supporting introduction text.
  </p>
</section>
```

Incorrect:

```html
<div class="type-heading-primary">Voices shaped by purpose</div>
```

Use:

- `h1` for the main page heading
- `h2` for major page sections
- `h3` for cards or subsections
- `p` for paragraphs
- `blockquote` for quotations
- `time` for dates
- `address` for suitable contact information

---

# 23. Utility Classes

```css
.font-brand {
  font-family: var(--font-brand);
}

.font-editorial {
  font-family: var(--font-editorial);
}

.font-utility {
  font-family: var(--font-utility);
}

.weight-regular {
  font-weight: 400;
}

.weight-medium {
  font-weight: 500;
}

.weight-semibold {
  font-weight: 600;
}

.weight-bold {
  font-weight: 700;
}

.weight-extrabold {
  font-weight: 800;
}

.weight-black {
  font-weight: 900;
}

.uppercase-label {
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

---

# 24. Anti-Template Typography Rules

Do not:

1. Centre every heading and paragraph.
2. Use gold gradients on every heading.
3. Apply glow effects to normal text.
4. Use uppercase for full paragraphs.
5. Use Bodoni Moda for navigation or buttons.
6. Use Barlow Condensed for body paragraphs.
7. Use thin font weights over photography.
8. Stretch, squash or distort the fonts.
9. Use more than three typefaces.
10. Use more than three font sizes inside one card.
11. Add unnecessary decorative words.
12. Invent new slogans without approval.
13. Place text over an artist's face.
14. Use fake embossed effects on body text.
15. Use excessive letter spacing on lowercase words.
16. Use unreadable outline text for important information.
17. Use the same hierarchy for every section.
18. Make all sections look like identical rounded cards.

---

# 25. Component Mapping

| Website Component | Typeface | Weight |
|---|---|---:|
| Homepage hero statement | Bodoni Moda | 500–600 |
| Main page heading | Cabinet Grotesk | 800–900 |
| Section heading | Cabinet Grotesk | 700–800 |
| Artist name | Cabinet Grotesk or Bodoni Moda | 500–800 |
| Artist role | Barlow Condensed | 700 |
| Navigation | Cabinet Grotesk | 500 |
| Body copy | Cabinet Grotesk | 400 |
| Introductory copy | Cabinet Grotesk | 500 |
| Button text | Cabinet Grotesk | 700 |
| Event date | Barlow Condensed | 800–900 |
| Event venue | Barlow Condensed | 700 |
| Event time | Barlow Condensed | 700 |
| Category label | Barlow Condensed | 700 |
| Equipment specification | Barlow Condensed | 600 |
| Editorial quote | Bodoni Moda Italic | 400 |
| Footer text | Cabinet Grotesk | 400 |
| Footer headings | Barlow Condensed | 700 |

---

# 26. Final Direction

## Cabinet Grotesk

Carries the majority of the website and creates the main brand voice.

## Bodoni Moda

Adds emotion, prestige and artistry to selected moments.

## Barlow Condensed

Organises dates, events, venues, categories and technical production information.

Together, these typefaces create a website that feels:

- Bold
- Premium
- Musical
- Editorial
- Purpose-driven
- Performance-ready
- Technically professional

The fonts must always be applied with hierarchy, restraint and clear visual intention.
