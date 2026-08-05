# Vissionaries of Purpose Website  
## Global Neomorphic, Skeuomorphic and Liquid-Glass Interface System

This document instructs the coding agent to apply a consistent, highly realistic neomorphic and skeuomorphic visual language across the entire **Vissionaries of Purpose** website.

The design must not imitate generic “glassmorphism” by simply placing transparent white boxes over a background. Every button, card, content panel, form field, navigation item, modal, event block, artist block, music block and interactive control must feel like a physical object with depth, material, lighting, pressure, reflection and movement.

The interface should feel premium, musical, tactile and futuristic, while still remaining clean, usable and responsive.

---

# 1. Core Design Direction

The entire website must combine:

- High-quality neomorphism
- Realistic skeuomorphism
- Liquid-glass material behavior
- Soft depth and believable shadows
- Subtle red, black, pearl-white and metallic highlights
- Premium music-industry visual language
- Clean geometry
- Minimal use of decorative icons
- Strong typography
- Responsive interaction
- Smooth, realistic movement

The interface should resemble a collection of premium physical music controls, studio equipment surfaces, vinyl-inspired objects, mixer controls, illuminated panels and sculpted glass.

The website must not look like a collection of flat rectangles.

Every component should visually communicate:

- What is clickable
- What is raised
- What is pressed
- What is selected
- What is disabled
- What is floating
- What is embedded into the surface
- What is made from glass
- What is made from metal, rubber, acrylic or soft-touch plastic

---

# 2. Important Visual Principle

## Do not use fake glass

Fake glass normally consists of:

```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
```

This is not enough.

Realistic liquid glass must also include:

- Variable transparency
- Internal highlights
- Edge refraction
- Layered borders
- Soft inner shadows
- Background distortion
- Directional light
- Slight colour separation
- Gloss movement
- Depth changes during interaction
- Surface response to pointer movement

The result should feel like a thick, polished glass object, not a transparent rectangle.

---

# 3. Global Colour System

Use the following CSS variables as the visual foundation.

```css
:root {
  --vp-black: #050505;
  --vp-black-soft: #0d0d0f;
  --vp-charcoal: #17171a;
  --vp-red: #d10a1b;
  --vp-red-dark: #74000d;
  --vp-red-bright: #ff1f36;
  --vp-white: #f7f5f2;
  --vp-pearl: #ddd8d2;
  --vp-silver: #b8bcc4;

  --vp-surface-1: #141416;
  --vp-surface-2: #1c1c20;
  --vp-surface-3: #24242a;

  --vp-text-primary: #f7f5f2;
  --vp-text-secondary: rgba(247, 245, 242, 0.72);
  --vp-text-muted: rgba(247, 245, 242, 0.48);

  --vp-shadow-dark:
    14px 14px 32px rgba(0, 0, 0, 0.62);

  --vp-shadow-light:
    -10px -10px 24px rgba(255, 255, 255, 0.035);

  --vp-shadow-raised:
    var(--vp-shadow-dark),
    var(--vp-shadow-light);

  --vp-shadow-inset:
    inset 7px 7px 16px rgba(0, 0, 0, 0.58),
    inset -5px -5px 14px rgba(255, 255, 255, 0.035);

  --vp-glass-border:
    rgba(255, 255, 255, 0.16);

  --vp-glass-highlight:
    rgba(255, 255, 255, 0.32);

  --vp-radius-small: 14px;
  --vp-radius-medium: 22px;
  --vp-radius-large: 34px;
  --vp-radius-pill: 999px;

  --vp-transition-fast: 180ms cubic-bezier(.2, .8, .2, 1);
  --vp-transition-medium: 380ms cubic-bezier(.16, 1, .3, 1);
  --vp-transition-slow: 700ms cubic-bezier(.16, 1, .3, 1);
}
```

---

# 4. Global Page Surface

The body should feel like a dark sculpted studio surface.

```css
html {
  color-scheme: dark;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  color: var(--vp-text-primary);
  background:
    radial-gradient(
      circle at 18% 12%,
      rgba(209, 10, 27, 0.18),
      transparent 34%
    ),
    radial-gradient(
      circle at 84% 20%,
      rgba(255, 255, 255, 0.05),
      transparent 28%
    ),
    linear-gradient(
      145deg,
      #050505 0%,
      #0b0b0d 48%,
      #160207 100%
    );
  font-family: "Arial", sans-serif;
  overflow-x: hidden;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.18;
  background:
    repeating-radial-gradient(
      circle at 50% 50%,
      rgba(255, 255, 255, 0.025) 0 1px,
      transparent 1px 5px
    );
  mix-blend-mode: soft-light;
}
```

The background texture must be extremely subtle. It may suggest vinyl grooves, brushed acrylic or a premium studio console, but it must not become noisy.

---

# 5. Universal Component Rules

Every interactive surface must use a consistent material system.

## Raised objects

Raised objects include:

- Primary buttons
- Artist cards
- Event blocks
- Music player controls
- Navigation buttons
- Booking buttons
- Call-to-action controls
- Social links
- Tabs
- Floating media controls

Raised objects should use:

```css
.vp-raised {
  background:
    linear-gradient(
      145deg,
      rgba(38, 38, 44, 0.96),
      rgba(15, 15, 18, 0.98)
    );
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: var(--vp-shadow-raised);
}
```

## Embedded objects

Embedded objects include:

- Search fields
- Form inputs
- Progress tracks
- Audio timelines
- Active navigation wells
- Filter containers
- Inset metadata areas

```css
.vp-inset {
  background:
    linear-gradient(
      145deg,
      rgba(6, 6, 7, 0.92),
      rgba(25, 25, 29, 0.9)
    );
  box-shadow: var(--vp-shadow-inset);
  border: 1px solid rgba(255, 255, 255, 0.035);
}
```

## Glass objects

Glass objects include:

- Floating information cards
- Modal windows
- Music preview overlays
- Artist profile overlays
- Event details panels
- Mobile menus
- Hero overlays

```css
.vp-liquid-glass {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.16),
      rgba(255, 255, 255, 0.035) 42%,
      rgba(209, 10, 27, 0.08) 100%
    );
  border: 1px solid rgba(255, 255, 255, 0.17);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.48),
    inset 0 1px 0 rgba(255, 255, 255, 0.32),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter:
    blur(24px)
    saturate(145%)
    contrast(108%);
  -webkit-backdrop-filter:
    blur(24px)
    saturate(145%)
    contrast(108%);
}

.vp-liquid-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(
      circle at var(--light-x, 30%) var(--light-y, 20%),
      rgba(255, 255, 255, 0.34),
      transparent 26%
    ),
    linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.15),
      transparent 35%
    );
  opacity: 0.7;
}

.vp-liquid-glass::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: -1;
  pointer-events: none;
  border-radius: inherit;
  box-shadow:
    inset 0 0 24px rgba(255, 255, 255, 0.035),
    inset 0 -18px 30px rgba(0, 0, 0, 0.2);
}
```

---

# 6. Universal Button System

Every website button must inherit from one global base class.

Do not create unrelated button styles for each page.

Use modifiers for different functions while preserving the same physical language.

## HTML

```html
<button class="vp-button vp-button--primary">
  <span class="vp-button__shine"></span>
  <span class="vp-button__label">Explore Artists</span>
</button>
```

## Base CSS

```css
.vp-button {
  --button-depth: 8px;
  --button-glow: rgba(209, 10, 27, 0.25);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  min-height: 54px;
  padding: 0.9rem 1.5rem;

  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: var(--vp-radius-pill);

  color: var(--vp-text-primary);
  font: inherit;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-decoration: none;

  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  overflow: hidden;
  isolation: isolate;

  background:
    linear-gradient(
      145deg,
      rgba(48, 48, 54, 0.98),
      rgba(15, 15, 18, 0.98)
    );

  box-shadow:
    var(--button-depth) var(--button-depth)
      18px rgba(0, 0, 0, 0.58),
    calc(var(--button-depth) * -0.7)
      calc(var(--button-depth) * -0.7)
      16px rgba(255, 255, 255, 0.045),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(0, 0, 0, 0.48);

  transform:
    perspective(900px)
    translate3d(0, 0, 0)
    rotateX(var(--tilt-x, 0deg))
    rotateY(var(--tilt-y, 0deg));

  transition:
    transform var(--vp-transition-fast),
    box-shadow var(--vp-transition-fast),
    border-color var(--vp-transition-fast),
    background var(--vp-transition-fast);
}

.vp-button::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  border-radius: inherit;
  background:
    radial-gradient(
      circle at var(--pointer-x, 50%) var(--pointer-y, 50%),
      rgba(255, 255, 255, 0.22),
      transparent 30%
    );
  opacity: 0;
  transition: opacity var(--vp-transition-fast);
}

.vp-button::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: -1;
  border-radius: inherit;
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.075),
      transparent 38%,
      rgba(0, 0, 0, 0.18)
    );
  pointer-events: none;
}

.vp-button__label {
  position: relative;
  z-index: 2;
}

.vp-button__shine {
  position: absolute;
  top: -80%;
  left: -30%;
  width: 42%;
  height: 250%;
  opacity: 0.32;
  transform: rotate(18deg) translateX(-180%);
  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.75),
      transparent
    );
  filter: blur(4px);
  transition: transform 700ms cubic-bezier(.16, 1, .3, 1);
}

.vp-button:hover {
  border-color: rgba(255, 255, 255, 0.18);
  transform:
    perspective(900px)
    translate3d(0, -3px, 0)
    rotateX(var(--tilt-x, 0deg))
    rotateY(var(--tilt-y, 0deg));

  box-shadow:
    12px 14px 26px rgba(0, 0, 0, 0.62),
    -7px -7px 18px rgba(255, 255, 255, 0.05),
    0 12px 38px var(--button-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    inset 0 -1px 0 rgba(0, 0, 0, 0.55);
}

.vp-button:hover::before {
  opacity: 1;
}

.vp-button:hover .vp-button__shine {
  transform: rotate(18deg) translateX(420%);
}

.vp-button:active {
  transform:
    perspective(900px)
    translate3d(0, 2px, 0)
    scale(0.985);

  box-shadow:
    inset 7px 7px 15px rgba(0, 0, 0, 0.58),
    inset -4px -4px 10px rgba(255, 255, 255, 0.035),
    0 6px 18px rgba(0, 0, 0, 0.38);
}

.vp-button:focus-visible {
  outline: 3px solid rgba(255, 31, 54, 0.55);
  outline-offset: 4px;
}

.vp-button:disabled,
.vp-button[aria-disabled="true"] {
  opacity: 0.42;
  cursor: not-allowed;
  transform: none;
  box-shadow:
    inset 3px 3px 8px rgba(0, 0, 0, 0.35),
    inset -2px -2px 7px rgba(255, 255, 255, 0.02);
}
```

---

# 7. Primary Red Button

Primary buttons are used for the most important actions:

- Book an Artist
- Get Tickets
- Contact Us
- Submit
- Listen Now
- View Event
- Request a Quote

```css
.vp-button--primary {
  --button-glow: rgba(255, 31, 54, 0.34);

  background:
    radial-gradient(
      circle at 30% 15%,
      rgba(255, 255, 255, 0.18),
      transparent 34%
    ),
    linear-gradient(
      145deg,
      #f11a31 0%,
      #b80719 48%,
      #71000d 100%
    );

  border-color: rgba(255, 255, 255, 0.16);

  box-shadow:
    8px 10px 22px rgba(0, 0, 0, 0.62),
    -5px -5px 15px rgba(255, 255, 255, 0.04),
    0 12px 32px rgba(209, 10, 27, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    inset 0 -2px 4px rgba(69, 0, 8, 0.55);
}
```

The red must feel embedded in the material. It must not look like a flat CSS fill.

---

# 8. Secondary Dark Button

Secondary buttons are used for:

- Learn More
- View Artist
- Explore Music
- Read More
- Back
- Close

```css
.vp-button--secondary {
  background:
    linear-gradient(
      145deg,
      rgba(39, 39, 45, 0.98),
      rgba(12, 12, 15, 0.98)
    );
}
```

---

# 9. Liquid-Glass Button

Use this for premium floating controls, music controls and hero CTAs.

```css
.vp-button--glass {
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.18),
      rgba(255, 255, 255, 0.045) 45%,
      rgba(209, 10, 27, 0.09)
    );

  backdrop-filter:
    blur(20px)
    saturate(150%)
    contrast(110%);

  -webkit-backdrop-filter:
    blur(20px)
    saturate(150%)
    contrast(110%);

  border-color: rgba(255, 255, 255, 0.19);

  box-shadow:
    0 20px 45px rgba(0, 0, 0, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.34),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05);
}
```

---

# 10. Icon Buttons

Icon buttons must look like real physical media controls.

```html
<button class="vp-icon-button" aria-label="Play">
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"></path>
  </svg>
</button>
```

```css
.vp-icon-button {
  width: 52px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  color: white;
  cursor: pointer;

  background:
    radial-gradient(
      circle at 32% 25%,
      rgba(255, 255, 255, 0.13),
      transparent 32%
    ),
    linear-gradient(
      145deg,
      #242429,
      #0d0d10
    );

  box-shadow:
    8px 9px 18px rgba(0, 0, 0, 0.55),
    -5px -5px 14px rgba(255, 255, 255, 0.035),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);

  transition:
    transform var(--vp-transition-fast),
    box-shadow var(--vp-transition-fast);
}

.vp-icon-button svg {
  width: 22px;
  fill: currentColor;
}

.vp-icon-button:hover {
  transform: translateY(-2px) scale(1.03);
}

.vp-icon-button:active {
  transform: translateY(1px) scale(0.96);
  box-shadow: var(--vp-shadow-inset);
}
```

---

# 11. JavaScript Pointer Response

Buttons should react slightly to the pointer position to imitate physical depth and reflected light.

Use plain JavaScript.

```js
const interactiveButtons = document.querySelectorAll(
  ".vp-button, .vp-icon-button, .vp-card"
);

interactiveButtons.forEach((element) => {
  element.addEventListener("pointermove", (event) => {
    const rect = element.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const rotateY = ((x / rect.width) - 0.5) * 6;
    const rotateX = (((y / rect.height) - 0.5) * -6);

    element.style.setProperty("--pointer-x", `${xPercent}%`);
    element.style.setProperty("--pointer-y", `${yPercent}%`);
    element.style.setProperty("--light-x", `${xPercent}%`);
    element.style.setProperty("--light-y", `${yPercent}%`);
    element.style.setProperty("--tilt-x", `${rotateX}deg`);
    element.style.setProperty("--tilt-y", `${rotateY}deg`);
  });

  element.addEventListener("pointerleave", () => {
    element.style.setProperty("--pointer-x", "50%");
    element.style.setProperty("--pointer-y", "50%");
    element.style.setProperty("--light-x", "30%");
    element.style.setProperty("--light-y", "20%");
    element.style.setProperty("--tilt-x", "0deg");
    element.style.setProperty("--tilt-y", "0deg");
  });
});
```

The movement must remain subtle.

Do not make buttons rotate excessively. The goal is tactile realism, not a gaming effect.

---

# 12. Card and Layout Box System

All website blocks must have realistic depth.

This includes:

- Artist cards
- Upcoming event cards
- Discography cards
- About panels
- Statistics blocks
- Booking panels
- Service cards
- Testimonial blocks
- Footer sections
- Contact forms
- Navigation containers
- Media preview windows

## Base card

```css
.vp-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--vp-radius-large);
  padding: clamp(1.25rem, 2vw, 2.25rem);

  background:
    linear-gradient(
      145deg,
      rgba(35, 35, 41, 0.97),
      rgba(12, 12, 15, 0.98)
    );

  border: 1px solid rgba(255, 255, 255, 0.065);

  box-shadow:
    18px 20px 44px rgba(0, 0, 0, 0.48),
    -10px -10px 30px rgba(255, 255, 255, 0.028),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);

  transform:
    perspective(1200px)
    rotateX(var(--tilt-x, 0deg))
    rotateY(var(--tilt-y, 0deg));

  transition:
    transform var(--vp-transition-medium),
    box-shadow var(--vp-transition-medium),
    border-color var(--vp-transition-medium);
}

.vp-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(
      circle at var(--pointer-x, 20%) var(--pointer-y, 10%),
      rgba(255, 255, 255, 0.11),
      transparent 30%
    );
}

.vp-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow:
    22px 28px 58px rgba(0, 0, 0, 0.58),
    -10px -10px 30px rgba(255, 255, 255, 0.035),
    0 20px 60px rgba(209, 10, 27, 0.09),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

---

# 13. Artist Cards

Artist cards should feel like framed physical media objects.

Use:

- Deep layered card body
- Raised portrait area
- Inset metadata
- Physical CTA buttons
- Subtle red status light
- Clean typography
- No unnecessary decorative icons

```html
<article class="vp-card vp-artist-card">
  <div class="vp-artist-card__image">
    <img src="artist.jpg" alt="Artist name">
  </div>

  <div class="vp-artist-card__content">
    <span class="vp-status-light" aria-hidden="true"></span>
    <p class="vp-eyebrow">Vissionaries of Purpose Artist</p>
    <h3>Artist Name</h3>
    <p>Short artist introduction goes here.</p>

    <div class="vp-card__actions">
      <a class="vp-button vp-button--secondary" href="#">
        <span class="vp-button__label">View Artist</span>
      </a>

      <a class="vp-button vp-button--primary" href="#">
        <span class="vp-button__label">Book Artist</span>
      </a>
    </div>
  </div>
</article>
```

```css
.vp-artist-card__image {
  position: relative;
  overflow: hidden;
  border-radius: calc(var(--vp-radius-large) - 8px);
  background: #08080a;
  box-shadow:
    var(--vp-shadow-inset),
    0 16px 35px rgba(0, 0, 0, 0.36);
}

.vp-artist-card__image img {
  width: 100%;
  height: 100%;
  min-height: 340px;
  object-fit: cover;
  display: block;
  filter: contrast(1.03) saturate(0.96);
}

.vp-status-light {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 50%;
  background: var(--vp-red-bright);
  box-shadow:
    0 0 0 4px rgba(255, 31, 54, 0.08),
    0 0 18px rgba(255, 31, 54, 0.55),
    inset 0 1px 1px rgba(255, 255, 255, 0.55);
}
```

---

# 14. Event Blocks

Upcoming events should look like physical date modules connected to premium information panels.

The date can appear as an inset display, while the event information remains raised.

```css
.vp-event-card {
  display: grid;
  grid-template-columns: minmax(180px, 0.8fr) minmax(0, 1.6fr);
  gap: 1.25rem;
}

.vp-event-card__date {
  display: grid;
  place-items: center;
  min-height: 220px;
  border-radius: var(--vp-radius-medium);
  background:
    linear-gradient(
      145deg,
      #08080a,
      #1b1b1f
    );
  box-shadow: var(--vp-shadow-inset);
}

.vp-event-card__details {
  padding: 1.4rem;
  border-radius: var(--vp-radius-medium);
  background:
    linear-gradient(
      145deg,
      rgba(39, 39, 44, 0.92),
      rgba(15, 15, 18, 0.96)
    );
  box-shadow: var(--vp-shadow-raised);
}
```

When no ticket link exists, remove the ticket button from the rendered DOM. Do not leave a disabled or empty ticket control unless the design specifically needs to show that tickets are unavailable.

The “Add to Calendar” button should remain available for every valid event.

---

# 15. Navigation

The desktop navigation should feel like a floating sculpted control panel.

```css
.vp-nav {
  position: sticky;
  top: 1rem;
  z-index: 1000;

  width: min(1180px, calc(100% - 2rem));
  margin: 1rem auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 0.75rem 0.9rem;

  border-radius: var(--vp-radius-pill);

  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.13),
      rgba(255, 255, 255, 0.035)
    );

  border: 1px solid rgba(255, 255, 255, 0.14);

  backdrop-filter:
    blur(24px)
    saturate(145%);

  -webkit-backdrop-filter:
    blur(24px)
    saturate(145%);

  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.23);
}

.vp-nav__link {
  position: relative;
  padding: 0.75rem 1rem;
  border-radius: var(--vp-radius-pill);
  color: var(--vp-text-secondary);
  text-decoration: none;
  transition:
    color var(--vp-transition-fast),
    background var(--vp-transition-fast),
    box-shadow var(--vp-transition-fast);
}

.vp-nav__link:hover {
  color: var(--vp-text-primary);
  background: rgba(255, 255, 255, 0.055);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 8px 20px rgba(0, 0, 0, 0.24);
}

.vp-nav__link[aria-current="page"] {
  color: white;
  background:
    linear-gradient(
      145deg,
      rgba(209, 10, 27, 0.95),
      rgba(98, 0, 12, 0.95)
    );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 10px 24px rgba(209, 10, 27, 0.22);
}
```

---

# 16. Form Fields

Inputs must feel recessed into the interface.

```css
.vp-field {
  display: grid;
  gap: 0.55rem;
}

.vp-field label {
  color: var(--vp-text-secondary);
  font-size: 0.9rem;
}

.vp-input,
.vp-textarea,
.vp-select {
  width: 100%;
  box-sizing: border-box;
  color: var(--vp-text-primary);
  background:
    linear-gradient(
      145deg,
      rgba(8, 8, 10, 0.96),
      rgba(25, 25, 29, 0.94)
    );

  border: 1px solid rgba(255, 255, 255, 0.045);
  border-radius: var(--vp-radius-medium);
  padding: 1rem 1.1rem;

  box-shadow:
    inset 7px 7px 16px rgba(0, 0, 0, 0.6),
    inset -4px -4px 12px rgba(255, 255, 255, 0.025);

  transition:
    border-color var(--vp-transition-fast),
    box-shadow var(--vp-transition-fast);
}

.vp-input:focus,
.vp-textarea:focus,
.vp-select:focus {
  outline: none;
  border-color: rgba(255, 31, 54, 0.42);
  box-shadow:
    inset 7px 7px 16px rgba(0, 0, 0, 0.6),
    inset -4px -4px 12px rgba(255, 255, 255, 0.025),
    0 0 0 4px rgba(255, 31, 54, 0.1);
}
```

---

# 17. Music Controls

Music-player interfaces should take inspiration from studio equipment, premium turntables and modern audio hardware.

Use:

- Round physical play button
- Inset progress track
- Raised album cover housing
- Soft red indicator
- Mechanical-looking volume control
- Strong focus states
- Real HTML audio underneath the visual interface

## Progress track

```css
.vp-progress {
  position: relative;
  height: 12px;
  border-radius: var(--vp-radius-pill);
  background:
    linear-gradient(
      180deg,
      #070708,
      #1a1a1e
    );
  box-shadow:
    inset 4px 4px 8px rgba(0, 0, 0, 0.7),
    inset -2px -2px 6px rgba(255, 255, 255, 0.025);
}

.vp-progress__fill {
  height: 100%;
  width: var(--progress, 35%);
  border-radius: inherit;
  background:
    linear-gradient(
      90deg,
      #7a000e,
      #e41129,
      #ff4357
    );
  box-shadow:
    0 0 16px rgba(255, 31, 54, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.32);
}
```

---

# 18. Modal and Mini-Window System

When a user clicks an album, artist, event or music card, the mini-window should appear as thick liquid glass.

```css
.vp-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.68);
  backdrop-filter: blur(12px);
}

.vp-modal {
  width: min(680px, 100%);
  max-height: min(760px, calc(100vh - 2rem));
  overflow: auto;
  border-radius: 36px;
  padding: clamp(1.25rem, 4vw, 2.5rem);
}
```

The modal should use the `.vp-liquid-glass` class.

Opening motion:

```css
@keyframes vp-modal-enter {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
    filter: blur(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.vp-modal {
  animation: vp-modal-enter 520ms cubic-bezier(.16, 1, .3, 1);
}
```

---

# 19. Section Containers

Large page sections should not all use the same card.

Alternate between:

- Open background sections
- Raised stage-like platforms
- Liquid-glass sections
- Inset editorial sections
- Dark sculpted sections with red accent lighting

```css
.vp-section-shell {
  width: min(1240px, calc(100% - 2rem));
  margin-inline: auto;
  padding: clamp(1.25rem, 4vw, 3rem);
  border-radius: clamp(28px, 4vw, 52px);

  background:
    linear-gradient(
      145deg,
      rgba(31, 31, 36, 0.92),
      rgba(9, 9, 11, 0.96)
    );

  border: 1px solid rgba(255, 255, 255, 0.055);

  box-shadow:
    24px 28px 70px rgba(0, 0, 0, 0.52),
    -14px -14px 38px rgba(255, 255, 255, 0.025),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);
}
```

Do not place every section inside a floating box. Use visual hierarchy.

The most important sections may be raised. Supporting content may remain open on the page background.

---

# 20. Skeuomorphic Material Variants

The coding agent should use a limited set of believable materials.

## Soft-touch black

Use for primary card bodies and navigation.

```css
.vp-material-soft-black {
  background:
    linear-gradient(
      145deg,
      #242429,
      #0b0b0d
    );
}
```

## Red enamel

Use for primary buttons and status controls.

```css
.vp-material-red-enamel {
  background:
    radial-gradient(
      circle at 30% 20%,
      rgba(255, 255, 255, 0.22),
      transparent 28%
    ),
    linear-gradient(
      145deg,
      #ff2039,
      #b40518 52%,
      #650009
    );
}
```

## Pearl acrylic

Use sparingly for light-themed details.

```css
.vp-material-pearl {
  color: #151519;
  background:
    linear-gradient(
      145deg,
      #ffffff,
      #d4cfc8
    );
  box-shadow:
    10px 12px 28px rgba(0, 0, 0, 0.32),
    -6px -6px 18px rgba(255, 255, 255, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}
```

## Brushed metal

Use for small borders, knobs and icon housings.

```css
.vp-material-metal {
  background:
    repeating-linear-gradient(
      90deg,
      #777b83 0,
      #aeb2ba 1px,
      #777b83 2px,
      #5b5f66 4px
    );
}
```

Use brushed metal sparingly. It should support the music-equipment feeling without turning the website into a dashboard full of unnecessary controls.

---

# 21. Hover, Press and Selected States

Every interactive component must have at least four states:

1. Resting
2. Hovered
3. Pressed
4. Focused

Selected controls should look physically engaged.

```css
.vp-toggle[aria-pressed="true"] {
  color: white;
  background:
    linear-gradient(
      145deg,
      #7a000e,
      #d10a1b
    );
  box-shadow:
    inset 6px 6px 14px rgba(65, 0, 8, 0.54),
    inset -3px -3px 10px rgba(255, 255, 255, 0.08),
    0 0 22px rgba(209, 10, 27, 0.18);
}
```

A pressed state must not simply become darker. The shadow direction must change to make the control look physically pushed into the surface.

---

# 22. Mobile Behavior

On mobile devices:

- Reduce large shadows
- Reduce blur strength
- Disable 3D tilt where it affects performance
- Keep touch targets at least 44px high
- Preserve pressed-state feedback
- Stack event cards vertically
- Keep cards readable
- Avoid excessive glass layering
- Keep the navigation practical

```css
@media (max-width: 768px) {
  .vp-event-card {
    grid-template-columns: 1fr;
  }

  .vp-card,
  .vp-section-shell {
    box-shadow:
      12px 16px 34px rgba(0, 0, 0, 0.46),
      -6px -6px 18px rgba(255, 255, 255, 0.02),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .vp-button {
    min-height: 50px;
  }
}

@media (hover: none) {
  .vp-button,
  .vp-card {
    transform: none !important;
  }

  .vp-button::before,
  .vp-card::before {
    display: none;
  }
}
```

---

# 23. Reduced Motion

Respect user accessibility preferences.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Do not remove all visual hierarchy when reduced motion is active. Keep shadows, borders and contrast.

---

# 24. Accessibility Requirements

The visual design must not reduce usability.

The coding agent must ensure:

- Text contrast remains readable
- Buttons use semantic `<button>` or `<a>` elements
- All icon-only buttons have `aria-label`
- Visible focus rings are always present
- Touch targets are at least 44 by 44 pixels
- Disabled controls remain understandable
- Hover is never the only way to reveal information
- Modal focus is trapped correctly
- Escape closes modals
- Buttons work with keyboard controls
- Form inputs have real labels
- Decorative graphics use `aria-hidden="true"`

Do not use a `<div>` as a button.

---

# 25. Performance Rules

Realistic design must remain fast.

The coding agent must:

- Avoid applying `backdrop-filter` to every element
- Use glass only for important floating layers
- Keep blur values below approximately 30px
- Avoid animating large blur values
- Animate `transform` and `opacity`
- Avoid constantly animating large box shadows
- Disable pointer tilt on touch devices
- Use `will-change` only while interacting
- Avoid excessive nested translucent layers
- Lazy-load non-critical images
- Compress artist and event images
- Test on mid-range Android phones

Example interaction performance helper:

```js
const hoverObjects = document.querySelectorAll(
  ".vp-button, .vp-card"
);

hoverObjects.forEach((element) => {
  element.addEventListener("pointerenter", () => {
    element.style.willChange = "transform";
  });

  element.addEventListener("pointerleave", () => {
    element.style.willChange = "auto";
  });
});
```

---

# 26. Required Component Coverage

The design system must be applied to every page and every applicable component.

## Home page

Apply the system to:

- Header
- Hero buttons
- Artist section
- Artist cards
- Latest releases
- Music embeds
- Discography preview
- Upcoming events
- About section
- Contact CTA
- Footer controls

## Artist pages

Apply the system to:

- Artist hero buttons
- Biography panels
- Music links
- Booking buttons
- Event cards
- Gallery controls
- Embedded music players
- Social buttons

## Events page

Apply the system to:

- Event filters
- Event cards
- Date modules
- Add to Calendar buttons
- Ticket buttons
- Event information modal
- Navigation between events

## Music and discography pages

Apply the system to:

- Album covers
- Track cards
- Play controls
- Music-store buttons
- Embedded Spotify and Apple Music containers
- Audio progress controls
- Album mini-windows

## Booking and contact pages

Apply the system to:

- Form fields
- Select boxes
- Date controls
- Upload controls
- Submit buttons
- Confirmation cards
- Error messages
- Success messages

---

# 27. Things the Coding Agent Must Avoid

Do not use:

- Flat buttons
- Generic white glass cards
- Random gradients
- Excessive glowing effects
- Neon outlines on every component
- Excessive red
- Cartoon-like depth
- Overly soft unreadable contrast
- Large amounts of blur
- Unnecessary floating icons
- Generic AI-generated visual clutter
- Different button systems on every page
- Excessive 3D rotation
- Heavy animations that delay interaction
- Glass surfaces directly over busy images without a readable backing layer
- Thin borders that disappear on dark backgrounds
- Unlabelled icon buttons
- Decorative skeuomorphism that interferes with function

The interface must remain elegant and controlled.

---

# 28. Recommended HTML Structure

```html
<section class="vp-section-shell">
  <div class="vp-section-heading">
    <p class="vp-eyebrow">Vissionaries of Purpose</p>
    <h2>Featured Artists</h2>
    <p>
      Discover artists shaped by purpose, excellence and faith.
    </p>
  </div>

  <div class="vp-grid">
    <article class="vp-card vp-artist-card">
      <div class="vp-artist-card__image">
        <img src="/images/artist.jpg" alt="Artist name">
      </div>

      <div class="vp-artist-card__content">
        <h3>Artist Name</h3>
        <p>Artist introduction.</p>

        <div class="vp-card__actions">
          <a href="/artists/artist-name"
             class="vp-button vp-button--secondary">
            <span class="vp-button__shine"></span>
            <span class="vp-button__label">View Artist</span>
          </a>

          <a href="/book"
             class="vp-button vp-button--primary">
            <span class="vp-button__shine"></span>
            <span class="vp-button__label">Book Artist</span>
          </a>
        </div>
      </div>
    </article>
  </div>
</section>
```

---

# 29. Recommended Grid

```css
.vp-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: clamp(1rem, 2vw, 1.75rem);
}

.vp-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.25rem;
}
```

---

# 30. Design Consistency Rules

The coding agent must create a shared CSS file such as:

```text
/styles/vp-material-system.css
```

It should contain:

- Colour tokens
- Shadow tokens
- Radius tokens
- Motion tokens
- Button classes
- Card classes
- Form classes
- Glass classes
- Utility material classes
- Accessibility states
- Responsive behavior

Do not duplicate the same button CSS across multiple page files.

Use reusable classes or component functions.

Suggested files:

```text
/styles/vp-material-system.css
/scripts/vp-interactions.js
/components/Button.js
/components/Card.js
/components/LiquidGlassPanel.js
/components/EventCard.js
/components/ArtistCard.js
```

The implementation may use plain JavaScript modules. TypeScript is not required.

---

# 31. Final Visual Standard

The completed Vissionaries of Purpose website should feel like a premium physical music interface.

The user should feel that:

- Buttons can be pressed
- Cards have weight
- Panels have thickness
- Glass bends light
- Red enamel reflects light
- Dark surfaces absorb light
- Music controls resemble high-end studio equipment
- Navigation floats naturally above the page
- Forms are carved into the interface
- Selected states feel mechanically engaged
- Every interaction responds smoothly

The final design must balance realism and restraint.

The goal is not to make the website look like an old machine.

The goal is to use realistic material behavior to create a modern, premium, worship-led music brand experience that feels tactile, intentional and visually unforgettable.

---

# 32. Completion Checklist

Before considering the implementation complete, confirm that:

- [ ] Every button uses the shared button system
- [ ] Every button has hover, pressed, focus and disabled states
- [ ] Primary actions use red enamel treatment
- [ ] Secondary actions use dark raised treatment
- [ ] Glass controls use layered liquid-glass treatment
- [ ] Cards have realistic raised or inset depth
- [ ] Inputs look embedded into the surface
- [ ] Modals use thick liquid-glass styling
- [ ] Event cards have correct ticket-button behavior
- [ ] Add to Calendar is available for all valid events
- [ ] Navigation has clear active states
- [ ] Mobile layouts remain usable
- [ ] Touch targets are large enough
- [ ] Reduced-motion preferences are respected
- [ ] Text contrast passes accessibility checks
- [ ] Pointer tilt is subtle
- [ ] No unnecessary icons are added
- [ ] No flat generic buttons remain
- [ ] No fake glass panels remain
- [ ] All pages use the same visual language
- [ ] Performance is tested on desktop and mobile
