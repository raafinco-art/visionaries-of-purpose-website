/**
 * Header surface state and the accessible mobile navigation sheet.
 *
 * The header gains a readable surface once the hero has left the viewport.
 * That is observed rather than measured on every scroll event, so there is
 * no global scroll listener doing visual work.
 */

export function initHeader() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  const sentinel = document.querySelector('[data-header-sentinel]');
  const setState = (scrolled) => {
    header.dataset.scrolled = scrolled ? 'true' : 'false';
  };

  if (!sentinel || !('IntersectionObserver' in window)) {
    setState(true);
    return;
  }

  setState(false);

  let reported = false;
  const observer = new IntersectionObserver(
    ([entry]) => {
      reported = true;
      setState(!entry.isIntersecting);
    },
    { rootMargin: '-64px 0px 0px 0px', threshold: 0 },
  );
  observer.observe(sentinel);

  // If the observer never reports, keep the readable surface rather than a
  // transparent header that could sit over page content unreadably.
  setTimeout(() => {
    if (!reported) {
      observer.disconnect();
      setState(true);
    }
  }, 1200);
}

export function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const sheet = document.querySelector('[data-nav-sheet]');
  if (!toggle || !sheet) return;

  const closers = sheet.querySelectorAll('[data-nav-close]');
  const supportsModal = typeof sheet.showModal === 'function';

  const open = () => {
    if (supportsModal) {
      sheet.showModal();
    } else {
      sheet.setAttribute('open', '');
    }
    toggle.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    // Move focus into the sheet without stealing it from the first link.
    sheet.querySelector('[data-nav-close]')?.focus();
  };

  const close = () => {
    if (supportsModal && sheet.open) sheet.close();
    else sheet.removeAttribute('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) close();
    else open();
  });

  for (const closer of closers) closer.addEventListener('click', close);

  // Selecting a destination dismisses the sheet.
  for (const link of sheet.querySelectorAll('a[href]')) {
    link.addEventListener('click', close);
  }

  // Native dialog handles Escape itself; restore focus and scrolling after.
  sheet.addEventListener('close', () => {
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    toggle.focus();
  });

  if (!supportsModal) {
    sheet.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        close();
        toggle.focus();
      }
    });
  }

  // Returning to a desktop width must not leave the sheet stranded open.
  const wide = window.matchMedia('(min-width: 76rem)');
  wide.addEventListener('change', (event) => {
    if (event.matches) close();
  });
}
