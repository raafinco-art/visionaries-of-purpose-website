/**
 * Impact counters.
 *
 * The verified figure is authored in the HTML, so the statistic is correct
 * without JavaScript and correct for anyone who prefers reduced motion. The
 * count is a decoration applied on top of a value that is already true.
 */

const prefersReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

function animate(node, delay) {
  const target = Number(node.dataset.target ?? '0');
  const suffix = node.dataset.suffix ?? '';
  if (!Number.isFinite(target)) return;

  const duration = 1400;
  node.textContent = `0${suffix}`;

  setTimeout(() => {
    const started = performance.now();
    const step = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      const value = Math.round(target * easeOutCubic(progress));
      node.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
      else node.textContent = `${target}${suffix}`;
    };
    requestAnimationFrame(step);
  }, delay);
}

export function initCounters(root = document) {
  const panel = root.querySelector('[data-counter-panel]');
  if (!panel) return;

  const counters = [...panel.querySelectorAll('[data-target]')];
  if (!counters.length) return;

  // Reduced motion keeps the authored values exactly as they are.
  if (prefersReduced() || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.disconnect();
        counters.forEach((node, index) => animate(node, 140 + index * 100));
      }
    },
    { threshold: 0.35 },
  );

  observer.observe(panel);
}
