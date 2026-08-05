/**
 * Disclosure groups for the values index.
 *
 * Built from real buttons controlling labelled regions. Every panel is open
 * in the HTML, so all twelve values are readable without JavaScript; this
 * module collapses them only once it can also expand them again.
 */

export function initAccordions(root = document) {
  for (const accordion of root.querySelectorAll('[data-accordion]')) {
    const items = accordion.querySelectorAll('[data-accordion-item]');
    const single = accordion.dataset.accordion === 'single';

    items.forEach((item, index) => {
      const trigger = item.querySelector('[data-accordion-trigger]');
      const panel = item.querySelector('[data-accordion-panel]');
      if (!trigger || !panel) return;

      // The first item stays open so the section never reads as empty.
      const startOpen = index === 0;
      trigger.setAttribute('aria-expanded', String(startOpen));
      panel.dataset.open = String(startOpen);
      panel.hidden = false;

      trigger.addEventListener('click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';

        if (single && !isOpen) {
          for (const other of items) {
            if (other === item) continue;
            other.querySelector('[data-accordion-trigger]')?.setAttribute('aria-expanded', 'false');
            const otherPanel = other.querySelector('[data-accordion-panel]');
            if (otherPanel) otherPanel.dataset.open = 'false';
          }
        }

        trigger.setAttribute('aria-expanded', String(!isOpen));
        panel.dataset.open = String(!isOpen);
      });
    });
  }
}
