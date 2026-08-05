/**
 * Manual two-panel video navigation.
 *
 * Every change is driven by the visitor. There is no autoplay, no timer and
 * no infinite rotation. Switching panels tears down the previous iframe so
 * audio never continues in the background.
 */

export function initVideoShowcase(root = document) {
  for (const showcase of root.querySelectorAll('[data-video-showcase]')) {
    setup(showcase);
  }
}

function setup(showcase) {
  const panels = [...showcase.querySelectorAll('[data-video-panel]')];
  if (panels.length < 2) return;

  const previous = showcase.querySelector('[data-video-prev]');
  const next = showcase.querySelector('[data-video-next]');
  const count = showcase.querySelector('[data-video-count]');
  const dots = [...showcase.querySelectorAll('[data-video-dot]')];
  const live = showcase.querySelector('[data-video-live]');

  let index = 0;

  const render = (announce) => {
    panels.forEach((panel, i) => {
      const active = i === index;
      panel.hidden = !active;
      // Stop the previous video by removing its iframe entirely.
      if (!active) {
        const gate = panel.querySelector('[data-media-gate]');
        const iframe = gate?.querySelector('iframe');
        if (iframe) {
          iframe.remove();
          gate.dataset.loaded = 'false';
          const template = gate.querySelector('template[data-media-prompt-template]');
          if (template) {
            gate.querySelector('[data-media-frame]')?.append(template.content.cloneNode(true));
          }
        }
      }
    });

    dots.forEach((dot, i) => {
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });

    const label = `Video ${index + 1} of ${panels.length}`;
    if (count) count.textContent = label;
    // Only announce on an explicit change, not on first render.
    if (announce && live) live.textContent = label;

    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index === panels.length - 1;
  };

  const go = (target) => {
    const clamped = Math.max(0, Math.min(panels.length - 1, target));
    if (clamped === index) return;
    index = clamped;
    render(true);
  };

  previous?.addEventListener('click', () => go(index - 1));
  next?.addEventListener('click', () => go(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));

  // Arrow keys work when the showcase has focus.
  showcase.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(index + 1);
    }
  });

  // Horizontal swipe as an enhancement. Vertical scrolling is never blocked.
  let startX = null;
  let startY = null;
  const viewport = showcase.querySelector('[data-video-viewport]') ?? showcase;

  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    startX = event.clientX;
    startY = event.clientY;
  }, { passive: true });

  viewport.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    startX = null;
    startY = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? index + 1 : index - 1);
  }, { passive: true });

  render(false);
}
