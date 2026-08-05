/**
 * Entry module. Discovers components by their data-* hooks and loads the
 * heavier behaviour only on pages that actually use it.
 *
 * The `js` class is added first so the stylesheet knows enhancement has
 * started. Without it, reveal animations never hide content.
 */

import { initHeader, initMobileNav } from './navigation.js';
import { initConsentBanner, initConsentSettings, initMediaGates } from './media-consent.js';
import { applyStagger, initReveal } from './reveal.js';

document.documentElement.classList.add('js');

const has = (selector) => document.querySelector(selector) !== null;

function boot() {
  initHeader();
  initMobileNav();
  initConsentBanner();
  initMediaGates();
  applyStagger();
  initReveal();

  if (has('[data-consent-settings]')) {
    initConsentSettings();
  }

  if (has('[data-video-showcase]')) {
    import('./carousel.js').then((m) => m.initVideoShowcase());
  }

  if (has('[data-event]')) {
    import('./events.js').then((m) => {
      m.initCalendarButtons();
      m.initEventFilters();
      m.initEventDrawer();
    });
  }

  if (has('[data-counter-panel]')) {
    import('./counters.js').then((m) => m.initCounters());
  }

  if (has('[data-accordion]')) {
    import('./accordion.js').then((m) => m.initAccordions());
  }

  if (has('.js-tilt')) {
    import('./tilt.js').then((m) => m.initTilt());
  }

  if (has('[data-newsletter-form]')) {
    import('./newsletter.js').then((m) => m.initNewsletter());
  }

  if (has('[data-contact-form]')) {
    import('./contact.js').then((m) => m.initContactForm());
  }

  // Footer year, so the copyright line never goes stale.
  for (const node of document.querySelectorAll('[data-current-year]')) {
    node.textContent = String(new Date().getFullYear());
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
