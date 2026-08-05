/**
 * Loads the Services page's background-image divs shortly before they enter
 * the viewport. This preserves the original responsive and lazy-loading
 * behaviour after moving the photography out of inline <img> elements.
 */

const serviceAssets = import.meta.glob('../assets/images/services/*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
});

const asset = (path) => serviceAssets[`../assets/images/services/${path}`];

const BACKGROUNDS = {
  'event-management': [
    { url: asset('event-management-480.webp'), width: 480 },
    { url: asset('event-management-800.webp'), width: 800 },
    { url: asset('event-management-1300.webp'), width: 1300 },
  ],
  'artist-bookings': [
    { url: asset('artist-bookings-640.webp'), width: 640 },
    { url: asset('artist-bookings-960.webp'), width: 960 },
    { url: asset('artist-bookings-1280.webp'), width: 1280 },
  ],
  'live-band-worship': [
    { url: asset('live-band-worship-400.webp'), width: 400 },
    { url: asset('live-band-worship-800.webp'), width: 800 },
    { url: asset('live-band-worship-1200.webp'), width: 1200 },
  ],
  'live-band-corporate': [
    { url: asset('live-band-corporate-400.webp'), width: 400 },
    { url: asset('live-band-corporate-800.webp'), width: 800 },
    { url: asset('live-band-corporate-1200.webp'), width: 1200 },
  ],
  'live-band-celebration': [
    { url: asset('live-band-celebration-400.webp'), width: 400 },
    { url: asset('live-band-celebration-800.webp'), width: 800 },
    { url: asset('live-band-celebration-1200.webp'), width: 1200 },
  ],
  'sound-production': [
    { url: asset('sound-production-480.webp'), width: 480 },
    { url: asset('sound-production-800.webp'), width: 800 },
    { url: asset('sound-production-1200.webp'), width: 1200 },
  ],
  'lighting-production': [
    { url: asset('lighting-production-560.webp'), width: 560 },
    { url: asset('lighting-production-960.webp'), width: 960 },
    { url: asset('lighting-production-1600.webp'), width: 1600 },
  ],
  'stage-supply': [
    { url: asset('stage-supply-480.webp'), width: 480 },
    { url: asset('stage-supply-900.webp'), width: 900 },
    { url: asset('stage-supply-1500.webp'), width: 1500 },
  ],
  'led-screens-live': [
    { url: asset('led-screens-live-400.webp'), width: 400 },
    { url: asset('led-screens-live-600.webp'), width: 600 },
    { url: asset('led-screens-live-800.webp'), width: 800 },
  ],
  'led-screens-corporate': [
    { url: asset('led-screens-corporate-400.webp'), width: 400 },
    { url: asset('led-screens-corporate-600.webp'), width: 600 },
    { url: asset('led-screens-corporate-800.webp'), width: 800 },
  ],
  'backline-pa-hire': [
    { url: asset('backline-pa-hire-560.webp'), width: 560 },
    { url: asset('backline-pa-hire-960.webp'), width: 960 },
    { url: asset('backline-pa-hire-1600.webp'), width: 1600 },
  ],
};

function selectCandidate(node) {
  const candidates = BACKGROUNDS[node.dataset.backgroundKey] || [];
  if (!candidates.length) return null;

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const targetWidth = Math.max(320, node.getBoundingClientRect().width * pixelRatio);

  return candidates.find((candidate) => candidate.width >= targetWidth) || candidates.at(-1);
}

function loadBackground(node) {
  if (node.classList.contains('is-background-loaded')) return;

  const candidate = selectCandidate(node);
  if (!candidate) return;

  node.style.setProperty('--service-image', `url(${JSON.stringify(candidate.url)})`);
  node.classList.add('is-background-loaded');
}

export function initServiceBackgrounds(root = document) {
  const backgrounds = [...root.querySelectorAll('[data-service-background]')];
  if (!backgrounds.length) return;

  if (!('IntersectionObserver' in window)) {
    backgrounds.forEach(loadBackground);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        loadBackground(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '320px 0px' },
  );

  backgrounds.forEach((background) => observer.observe(background));
}
