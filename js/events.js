/**
 * Gig-guide behaviour: artist filtering, the event drawer and calendar export.
 *
 * Progressive enhancement contract: each event is authored as a native
 * <details> disclosure, so every date, venue, session and ticket link is
 * reachable with JavaScript disabled. This module upgrades that disclosure
 * into a focus-managed drawer and hides the inline copy only once it has
 * successfully taken over.
 */

import { downloadIcs } from './calendar.js';

/** Reads the JSON payload an event carries for calendar export. */
function readEventData(scope) {
  const node = scope.querySelector('script[type="application/json"][data-event-data]');
  if (!node) return null;
  try {
    return JSON.parse(node.textContent);
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Calendar buttons                                                    */
/* ------------------------------------------------------------------ */

export function initCalendarButtons(root = document) {
  for (const button of root.querySelectorAll('[data-add-to-calendar]')) {
    if (button.dataset.calendarReady === 'true') continue;
    button.dataset.calendarReady = 'true';

    button.addEventListener('click', () => {
      const scope = button.closest('[data-event]') ?? root;
      const data = readEventData(scope);
      if (!data) return;

      const original = button.textContent;
      downloadIcs(data, {
        eventUrl: `${location.origin}/events/#event-${data.slug}`,
      });
      button.textContent = 'Calendar file saved';
      setTimeout(() => {
        button.textContent = original;
      }, 2600);
    });
  }
}

/* ------------------------------------------------------------------ */
/* Filters                                                             */
/* ------------------------------------------------------------------ */

export function initEventFilters(root = document) {
  const bar = root.querySelector('[data-event-filters]');
  if (!bar) return;

  const toggles = [...bar.querySelectorAll('[data-filter-artist]')];
  const items = [...root.querySelectorAll('[data-event]')];
  const empty = root.querySelector('[data-events-empty]');
  const status = root.querySelector('[data-events-status]');
  if (!toggles.length || !items.length) return;

  const apply = (artist) => {
    let visible = 0;
    for (const item of items) {
      const artists = (item.dataset.eventArtists ?? '').split(' ').filter(Boolean);
      const match = artist === 'all' || artists.includes(artist);
      item.hidden = !match;
      if (match) visible += 1;
    }

    // Month headings with nothing under them are hidden too.
    for (const group of root.querySelectorAll('[data-event-month]')) {
      const anyVisible = [...group.querySelectorAll('[data-event]')].some((el) => !el.hidden);
      group.hidden = !anyVisible;
    }

    if (empty) empty.hidden = visible > 0;
    if (status) {
      status.textContent = visible === 1
        ? '1 event shown.'
        : `${visible} events shown.`;
    }

    for (const toggle of toggles) {
      toggle.setAttribute(
        'aria-pressed',
        toggle.dataset.filterArtist === artist ? 'true' : 'false',
      );
    }
  };

  for (const toggle of toggles) {
    toggle.addEventListener('click', () => apply(toggle.dataset.filterArtist));
  }

  bar.hidden = false;
  apply('all');
}

/* ------------------------------------------------------------------ */
/* Drawer                                                              */
/* ------------------------------------------------------------------ */

export function initEventDrawer(root = document) {
  const drawer = document.querySelector('[data-event-drawer]');
  if (!drawer) return;

  const title = drawer.querySelector('[data-drawer-title]');
  const body = drawer.querySelector('[data-drawer-body]');
  const closeButton = drawer.querySelector('[data-drawer-close]');
  if (!title || !body) return;

  const supportsModal = typeof drawer.showModal === 'function';
  let opener = null;

  const close = () => {
    if (supportsModal && drawer.open) drawer.close();
    else drawer.removeAttribute('open');
    document.documentElement.style.overflow = '';
    opener?.focus();
    opener = null;
  };

  const open = (details, trigger) => {
    const source = details.querySelector('[data-event-detail]');
    if (!source) return;

    opener = trigger;
    title.textContent = details.dataset.eventTitle ?? 'Event details';

    body.replaceChildren(source.cloneNode(true));
    // The clone carries the wiring flag from the original, so clear it before
    // re-initialising or the cloned buttons would never receive a handler.
    for (const button of body.querySelectorAll('[data-add-to-calendar]')) {
      delete button.dataset.calendarReady;
    }
    initCalendarButtons(body);

    if (supportsModal) drawer.showModal();
    else drawer.setAttribute('open', '');
    document.documentElement.style.overflow = 'hidden';

    // Focus lands on the drawer heading so screen readers announce context.
    title.focus();
  };

  closeButton?.addEventListener('click', close);

  drawer.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    opener?.focus();
    opener = null;
  });

  // Backdrop click closes; clicks inside the panel must not.
  drawer.addEventListener('click', (event) => {
    if (event.target === drawer) close();
  });

  if (!supportsModal) {
    drawer.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
  }

  for (const details of root.querySelectorAll('details[data-event]')) {
    const summary = details.querySelector('summary');
    if (!summary) continue;

    summary.addEventListener('click', (event) => {
      event.preventDefault();
      open(details, summary);
    });

    summary.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(details, summary);
      }
    });

    // Only now is it safe to hide the inline copy.
    details.dataset.enhanced = 'true';
    details.open = false;
  }
}
