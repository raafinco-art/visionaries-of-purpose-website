# Visionaries of Purpose Statistics Counter Section

## Purpose

This section appears near the top of the Visionaries of Purpose website and should communicate credibility, experience, reach, and measurable impact.

The section must feel premium, purposeful, modern, and highly polished. It should combine:

- Neomorphism
- Subtle skeuomorphic depth
- Clean geometric spacing
- Bold typography
- Smooth counter animations
- Responsive behaviour
- Accessible motion controls

The design must remain clean and restrained. Avoid excessive glow, particles, floating icons, or decorative clutter.

---

## Recommended Statistics

Use five statistic cards in this order:

1. **12+**  
   Years of Production Experience

2. **20+**  
   Events and Worship Experiences Delivered

3. **3**  
   Albums Recorded and Produced

4. **Verified Number+**  
   Artists and Worship Leaders Supported

5. **2**  
   Provinces Reached

The fourth statistic must only use a number that can be verified by Visionaries of Purpose.

---

## Section Caption

### Heading

**Purpose Measured Through Impact**

### Supporting Copy

Every number represents more than a milestone. It reflects an artist supported, a stage served, a sound strengthened, and a vision brought to life. Through faith, excellence, and purposeful production, Visionaries of Purpose continues to create experiences that reach people and carry meaningful sound beyond the stage.

---

## Layout Structure

The statistics section should have three visual levels:

1. Section heading and supporting paragraph
2. Large neomorphic container
3. Five individual statistic cards

### Desktop Layout

- Use a maximum content width between `1180px` and `1320px`.
- Centre the section horizontally.
- Place all five cards in one row.
- Keep equal spacing between cards.
- Each card should have equal height.
- Cards may use flexible width so the row fits naturally.
- Use generous outer padding around the full statistics container.
- The section must not feel cramped.

Recommended structure:

```html
<section class="impact-section" aria-labelledby="impact-title">
  <div class="impact-copy">
    <p class="impact-eyebrow">Our measurable journey</p>
    <h2 id="impact-title">Purpose Measured Through Impact</h2>
    <p class="impact-description">
      Every number represents more than a milestone. It reflects an artist
      supported, a stage served, a sound strengthened, and a vision brought
      to life.
    </p>
  </div>

  <div class="impact-panel">
    <article class="stat-card">
      <strong class="stat-number" data-target="12" data-suffix="+">0</strong>
      <span class="stat-label">Years of Production Experience</span>
    </article>

    <article class="stat-card">
      <strong class="stat-number" data-target="20" data-suffix="+">0</strong>
      <span class="stat-label">Events and Worship Experiences Delivered</span>
    </article>

    <article class="stat-card">
      <strong class="stat-number" data-target="3">0</strong>
      <span class="stat-label">Albums Recorded and Produced</span>
    </article>

    <article class="stat-card">
      <strong class="stat-number" data-target="8" data-suffix="+">0</strong>
      <span class="stat-label">Artists and Worship Leaders Supported</span>
    </article>

    <article class="stat-card">
      <strong class="stat-number" data-target="2">0</strong>
      <span class="stat-label">Provinces Reached</span>
    </article>
  </div>
</section>
```

Replace the example value `8` with the verified artist number.

---

## Responsive Layout

### Tablet

- Use a two-column or three-column grid.
- The final card may span two columns when this improves visual balance.
- Maintain equal card heights.
- Keep the heading and paragraph centred or left aligned according to the wider page system.

### Mobile

Use one of these approved options:

#### Option A: Two-Column Grid

- Two cards per row
- One final card spanning the full width
- Minimum card width of approximately `145px`
- Comfortable vertical spacing

#### Option B: Horizontal Scroll

- Display cards in a horizontal swipe track
- Each card should occupy approximately `78vw`
- Use `scroll-snap-type: x mandatory`
- Do not hide important content behind automatic movement
- Do not use autoplay

Preferred mobile solution: **Two-column grid with the final card spanning both columns.**

---

## Neomorphic Visual System

The section should use dark neomorphism rather than flat black boxes.

### Main Panel

The large outer panel should appear slightly raised from the background.

```css
.impact-panel {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 24px;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 22px;
  background:
    linear-gradient(
      145deg,
      rgba(24, 24, 24, 0.96),
      rgba(7, 7, 7, 0.98)
    );
  box-shadow:
    18px 18px 38px rgba(0, 0, 0, 0.72),
    -10px -10px 26px rgba(255, 255, 255, 0.035),
    inset 1px 1px 0 rgba(255, 255, 255, 0.08),
    inset -1px -1px 0 rgba(0, 0, 0, 0.85);
}
```

### Statistic Cards

Each card should look like a physical recessed or softly raised module.

```css
.stat-card {
  position: relative;
  min-height: 150px;
  padding: 26px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  background:
    linear-gradient(
      145deg,
      rgba(18, 18, 18, 0.98),
      rgba(5, 5, 5, 0.98)
    );
  box-shadow:
    10px 10px 22px rgba(0, 0, 0, 0.68),
    -6px -6px 14px rgba(255, 255, 255, 0.035),
    inset 1px 1px 0 rgba(255, 255, 255, 0.075),
    inset -1px -1px 0 rgba(0, 0, 0, 0.9);
  overflow: hidden;
  transform: translateZ(0);
}
```

### Card Highlight

Add a restrained highlight at the top edge to suggest realistic material depth.

```css
.stat-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.055),
      transparent 35%
    );
}
```

### Hover Behaviour

The hover should feel tactile, not dramatic.

```css
.stat-card {
  transition:
    transform 280ms ease,
    box-shadow 280ms ease,
    border-color 280ms ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.55);
  box-shadow:
    14px 14px 30px rgba(0, 0, 0, 0.76),
    -7px -7px 18px rgba(255, 255, 255, 0.045),
    inset 1px 1px 0 rgba(255, 255, 255, 0.1);
}
```

Do not add strong glow or oversized movement.

---

## Typography

### Numbers

The number is the most dominant element.

Recommended type styles:

- Impact
- Druk Condensed
- Monument Extended
- Anton
- Archivo Black

```css
.stat-number {
  display: block;
  font-family: Impact, "Arial Narrow", sans-serif;
  font-size: clamp(2.8rem, 4vw, 5rem);
  line-height: 0.95;
  letter-spacing: -0.035em;
  color: #ffffff;
}
```

A restrained red-to-black vinyl effect may be applied to the number:

```css
.stat-number {
  background:
    linear-gradient(
      180deg,
      #f12626 0%,
      #a80909 45%,
      #210000 100%
    );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 5px 8px rgba(0, 0, 0, 0.55));
}
```

Do not make the texture noisy or difficult to read.

### Labels

```css
.stat-label {
  margin-top: 14px;
  max-width: 18ch;
  font-size: 0.78rem;
  line-height: 1.35;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.86);
}
```

Keep each label to a maximum of two or three short lines.

---

## Counter Animation Sequence

The counter animation begins only when the statistics section becomes visible.

### Sequence

1. The main panel fades in and rises slightly.
2. The five cards appear one after another.
3. Each counter starts shortly after its card appears.
4. Numbers count upward from zero.
5. The final number settles with a subtle scale pulse.
6. The animation runs only once per page load.

### Recommended Timing

| Animation | Duration | Delay |
|---|---:|---:|
| Main panel entrance | 700ms | 0ms |
| First card entrance | 500ms | 150ms |
| Card stagger | 500ms | 100ms between cards |
| Counter duration | 1200ms to 1600ms | Starts with each card |
| Final number settle | 220ms | After counter completes |

The counters should not all start at exactly the same moment. The stagger creates rhythm and directs the eye naturally from left to right.

### Counter Order

1. Years of Production Experience
2. Events and Worship Experiences Delivered
3. Albums Recorded and Produced
4. Artists and Worship Leaders Supported
5. Provinces Reached

---

## Entrance Animation CSS

```css
.impact-panel {
  opacity: 0;
  transform: translateY(24px) scale(0.985);
  transition:
    opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.stat-card {
  opacity: 0;
  transform: translateY(18px);
}

.impact-panel.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.impact-panel.is-visible .stat-card {
  animation: statCardReveal 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.impact-panel.is-visible .stat-card:nth-child(1) {
  animation-delay: 140ms;
}

.impact-panel.is-visible .stat-card:nth-child(2) {
  animation-delay: 240ms;
}

.impact-panel.is-visible .stat-card:nth-child(3) {
  animation-delay: 340ms;
}

.impact-panel.is-visible .stat-card:nth-child(4) {
  animation-delay: 440ms;
}

.impact-panel.is-visible .stat-card:nth-child(5) {
  animation-delay: 540ms;
}

@keyframes statCardReveal {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

---

## Counter JavaScript

Use standard JavaScript with `IntersectionObserver`.

```js
const impactPanel = document.querySelector(".impact-panel");
const counters = document.querySelectorAll(".stat-number");

let hasAnimated = false;

function easeOutCubic(progress) {
  return 1 - Math.pow(1 - progress, 3);
}

function animateCounter(element, delay = 0) {
  const target = Number(element.dataset.target || 0);
  const suffix = element.dataset.suffix || "";
  const duration = 1400;

  window.setTimeout(() => {
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(rawProgress);
      const currentValue = Math.round(target * easedProgress);

      element.textContent = `${currentValue}${suffix}`;

      if (rawProgress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = `${target}${suffix}`;
        element.classList.add("is-complete");
      }
    }

    requestAnimationFrame(updateCounter);
  }, delay);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || hasAnimated) return;

      hasAnimated = true;
      impactPanel.classList.add("is-visible");

      counters.forEach((counter, index) => {
        animateCounter(counter, 180 + index * 100);
      });

      observer.unobserve(impactPanel);
    });
  },
  {
    threshold: 0.35,
  }
);

if (impactPanel) {
  observer.observe(impactPanel);
}
```

---

## Counter Completion Effect

Use a subtle settling effect when the counter reaches its target.

```css
.stat-number.is-complete {
  animation: counterSettle 220ms ease-out;
}

@keyframes counterSettle {
  0% {
    transform: scale(1);
  }

  55% {
    transform: scale(1.055);
  }

  100% {
    transform: scale(1);
  }
}
```

The scale should remain subtle. Avoid bouncing, spinning, flashing, or glowing.

---

## Reduced Motion

Respect users who prefer limited animation.

```css
@media (prefers-reduced-motion: reduce) {
  .impact-panel,
  .stat-card,
  .stat-number {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
```

JavaScript should also display the final values immediately for these users.

```js
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (reduceMotion) {
  counters.forEach((counter) => {
    const target = counter.dataset.target || "0";
    const suffix = counter.dataset.suffix || "";
    counter.textContent = `${target}${suffix}`;
  });

  impactPanel.classList.add("is-visible");
} else if (impactPanel) {
  observer.observe(impactPanel);
}
```

---

## Responsive CSS

```css
.impact-section {
  width: min(100% - 40px, 1280px);
  margin-inline: auto;
  padding-block: clamp(72px, 10vw, 140px);
}

.impact-copy {
  max-width: 760px;
  margin-bottom: 38px;
}

@media (max-width: 1050px) {
  .impact-panel {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .impact-section {
    width: min(100% - 24px, 1280px);
  }

  .impact-panel {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    padding: 16px;
    border-radius: 18px;
  }

  .stat-card {
    min-height: 142px;
    padding: 22px 14px;
  }

  .stat-card:last-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 420px) {
  .impact-panel {
    grid-template-columns: 1fr;
  }

  .stat-card:last-child {
    grid-column: auto;
  }
}
```

---

## Interaction Rules

- Do not replay the counter every time the user scrolls past the section.
- Do not begin the animation before the section enters the viewport.
- Do not use sound effects.
- Do not use constant floating movement.
- Do not make cards rotate in 3D.
- Do not use exaggerated glow.
- Do not add unnecessary icons.
- Do not place decorative objects over the numbers.
- Do not hide statistics behind sliders on desktop.
- Keep all numbers readable before and after animation.

---

## Accessibility Requirements

- Use real text rather than canvas-rendered numbers.
- Use semantic elements such as `<section>`, `<article>`, `<strong>`, and headings.
- Maintain strong contrast between the cards and text.
- Ensure the final values remain available when JavaScript is disabled.
- The animation must not prevent screen readers from understanding the statistic.
- Use `aria-labelledby` to connect the section to its heading.
- Avoid rapid flashes or abrupt scaling.
- Respect `prefers-reduced-motion`.

For improved no-JavaScript support, place the final number in the HTML and use JavaScript to temporarily replace it with zero only when animation is allowed.

---

## Final Visual Direction

The completed section should feel like a premium control panel built into the website.

The neomorphism must create realistic depth through:

- Soft raised surfaces
- Recessed inner shadows
- Controlled highlights
- Strong material contrast
- Rounded but structured geometry
- Minimal movement
- Precise spacing

The counters should communicate progress and credibility without becoming theatrical. The experience must feel confident, refined, purposeful, and aligned with the Visionaries of Purpose identity.
