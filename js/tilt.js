/**
 * Optional editorial tilt.
 *
 * Opt-in per element, pointer devices only, capped at two degrees, updated
 * through requestAnimationFrame and disabled entirely under reduced motion.
 * Never applied to buttons, forms or ordinary cards.
 */

const MAX_DEGREES = 2;

export function initTilt(root = document) {
  const targets = root.querySelectorAll('.js-tilt');
  if (!targets.length) return;

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!fine.matches || reduced.matches) return;

  for (const element of targets) {
    let frame = null;

    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
      element.style.willChange = 'auto';
    };

    element.addEventListener('pointerenter', () => {
      element.style.willChange = 'transform';
    });

    element.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = null;
        const box = element.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        element.style.setProperty('--tilt-y', `${(x * MAX_DEGREES * 2).toFixed(2)}deg`);
        element.style.setProperty('--tilt-x', `${(-y * MAX_DEGREES * 2).toFixed(2)}deg`);
      });
    });

    element.addEventListener('pointerleave', reset);
    element.addEventListener('blur', reset, true);
  }
}
