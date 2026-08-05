# 05. Animation and Interaction Direction

## Principle

Motion should feel like stagecraft: a measured light cue, a curtain reveal, a physical button press. It should clarify state and hierarchy. It must not become constant spectacle.

## Motion tokens

```css
:root {
  --motion-instant: 100ms;
  --motion-fast: 180ms;
  --motion-standard: 260ms;
  --motion-emphasis: 420ms;
  --ease-out: cubic-bezier(.16, 1, .3, 1);
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);
}
```

Use `transform` and `opacity` for animated properties wherever possible. Avoid animating layout, large blurs or shadows continuously.

## Interaction choreography

| Element | Trigger | Motion | Duration |
|---|---|---|---|
| Primary button | Hover/focus | 1 to 2px lift, highlight strengthens | 180ms |
| Primary button | Press | Returns to surface and gains inset shadow | 100ms |
| Navigation surface | Hero leaves viewport | Background and border become opaque enough to read | 260ms |
| Section reveal | First viewport entry | 12 to 24px rise and fade, once only | 420ms |
| Event marker | Timeline entry | Scale from 0.85 to 1 with adjacent content reveal | 420ms |
| Video slide | Manual control | Crossfade with small horizontal offset | 260ms |
| Modal/drawer | Open | Backdrop fade and panel translate | 260ms |
| Accordion | Activate | Content grid-row expansion and opacity | 260ms |
| Form success | Response | Status fades in and focus moves to it | 180ms |
| Counter | First entry | Count once to verified value | Up to 900ms |

Do not stagger long lists by more than 40ms per item or more than six items. The user should never wait for an animation to finish before reading or acting.

## Hero motion

Choose one restrained signature effect:

- A very slow, one-time reveal of the image mask and headline; or
- A subtle light falloff that responds to entry, not continuously to pointer movement.

Do not autoplay video, rotate slogans or apply continuous parallax. The hero becomes fully legible within 600ms.

## Section reveals

Use `IntersectionObserver`, not a scroll-event loop. Add the enhanced state only after JavaScript starts so content is visible by default.

```js
const observer = new IntersectionObserver((entries, currentObserver) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.dataset.revealed = "true";
    currentObserver.unobserve(entry.target);
  }
}, { threshold: 0.15 });
```

## Optional portrait tilt

A very small tilt is permitted only on specifically marked editorial portraits or release artwork:

- Opt in with `.js-tilt`.
- Enable only for `(hover: hover) and (pointer: fine)`.
- Maximum rotation: 2 degrees.
- Update through `requestAnimationFrame`.
- Reset smoothly on pointer leave.
- Do not apply to buttons, forms, every card or touch devices.
- Disable completely when reduced motion is requested.

## Video carousel

- Exactly two panels.
- User controls every change.
- Previous and next buttons remain visible and labelled.
- Arrow keys work when the carousel has focus.
- Announce the active slide as **Video 1 of 2** or **Video 2 of 2** without repeatedly interrupting screen-reader users.
- Swipe may enhance touch interaction, but must not block vertical page scrolling.
- No autoplay, infinite looping or timer.

## Event timeline and drawer

Timeline items reveal once as they approach the viewport. Activating an event opens a drawer or dialog whose heading receives focus. Escape closes it, backdrop click may close it, and focus returns to the originating event button.

On small screens the drawer rises from the lower edge. On larger screens it may enter from the right. The same accessible content and focus order apply in both cases.

## Forms

- Validate on blur only after the visitor has interacted, and on submit.
- Do not shake fields.
- Scroll and focus the first invalid field after submit.
- Preserve input on recoverable errors.
- A submit button changes its label, for example **Subscribe** to **Subscribing...**.
- Prevent duplicate submissions while a request is active.
- Success confirmation receives programmatic focus only when it replaces the form or is otherwise easy to miss.

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .js-tilt,
  [data-reveal] {
    transform: none !important;
    opacity: 1 !important;
  }
}
```

Do not rely on this blanket rule alone. JavaScript should also check `matchMedia('(prefers-reduced-motion: reduce)')` and skip counters, tilts and ornamental sequences.

## Performance guardrails

- No global `scroll` listener for visual effects.
- No unbounded `requestAnimationFrame` loop.
- Pause or remove work when an element is off screen.
- Avoid continuous animated gradients, large blur filters and video backgrounds.
- Load animation code only on pages that use it.
- Test on a mid-range mobile device with CPU throttling.
- Interaction must remain usable before fonts and images finish loading.

## Acceptance tests

- [ ] Every action can be completed with motion disabled.
- [ ] Keyboard focus is never lost during a transition.
- [ ] No essential information appears only on hover.
- [ ] There is no autoplaying audio, video or carousel.
- [ ] A page remains stable while media and fonts load.
- [ ] Animations do not cause horizontal overflow at 320px.
- [ ] Long tasks show clear state without trapping navigation.

