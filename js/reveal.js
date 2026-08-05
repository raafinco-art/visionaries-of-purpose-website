/**
 * One-time, reduced-motion-aware section reveals.
 *
 * Content is visible by default. The enhanced starting state is only applied
 * once this module runs, so a JavaScript failure can never hide the page.
 */

const prefersReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initReveal(root = document) {
  const targets = root.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (prefersReduced() || !('IntersectionObserver' in window)) {
    for (const target of targets) target.dataset.revealed = 'true';
    return;
  }

  let observerReported = false;

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      observerReported = true;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.dataset.revealed = 'true';
        currentObserver.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
  );

  const observed = [];

  for (const target of targets) {
    // Anything already on screen at load reveals immediately, so the first
    // viewport is never waiting on an animation.
    const box = target.getBoundingClientRect();
    if (box.top < window.innerHeight * 0.9) {
      target.dataset.revealed = 'true';
    } else {
      observer.observe(target);
      observed.push(target);
    }
  }

  if (!observed.length) return;

  /*
   * Fail open. Observing a target always produces an initial callback, so if
   * nothing has been reported shortly after start-up the observer is not
   * running in this environment. Content must never stay hidden because an
   * ornamental effect could not initialise.
   */
  setTimeout(() => {
    if (observerReported) return;
    observer.disconnect();
    for (const target of observed) target.dataset.revealed = 'true';
  }, 1200);
}

/**
 * Staggers a group of siblings. Capped at six items and 40ms apart so a long
 * list never makes the visitor wait.
 */
export function applyStagger(root = document) {
  for (const group of root.querySelectorAll('[data-reveal-group]')) {
    const items = [...group.querySelectorAll('[data-reveal]')].slice(0, 6);
    items.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${index * 40}ms`);
    });
  }
}
