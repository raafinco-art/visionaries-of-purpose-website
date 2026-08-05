/**
 * Consent state and click-to-load media.
 *
 * Nothing third-party is requested until the visitor asks for it. There is no
 * hidden iframe, no preconnect and no provider script before a choice exists.
 * Rejecting optional media never blocks page copy, event details or the
 * privacy-friendly outbound link.
 */

import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  CONSENT_MAX_AGE_DAYS,
  MEDIA_PROVIDERS,
} from './config.js';

const listeners = new Set();

/** @returns {{version:string, necessary:boolean, media:boolean, updatedAt:string}|null} */
export function readConsent() {
  let raw;
  try {
    raw = localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null; // storage blocked; treat as "no choice yet"
  }
  if (!raw) return null;

  let value;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!value || typeof value !== 'object') return null;

  // A changed consent version invalidates the previous decision.
  if (value.version !== CONSENT_VERSION) return null;

  const updated = Date.parse(value.updatedAt ?? '');
  if (Number.isFinite(updated)) {
    const ageDays = (Date.now() - updated) / 86_400_000;
    if (ageDays > CONSENT_MAX_AGE_DAYS) return null;
  }

  return {
    version: CONSENT_VERSION,
    necessary: true,
    media: value.media === true,
    updatedAt: value.updatedAt ?? new Date().toISOString(),
  };
}

export function hasMediaConsent() {
  return readConsent()?.media === true;
}

export function hasDecided() {
  return readConsent() !== null;
}

/** Stores only the minimum choice data. Never an address or identifier. */
export function writeConsent(media) {
  const value = {
    version: CONSENT_VERSION,
    necessary: true,
    media: media === true,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable; the choice applies to this page view only */
  }
  for (const fn of listeners) fn(value);
  return value;
}

export function onConsentChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* ------------------------------------------------------------------ */
/* Media gates                                                         */
/* ------------------------------------------------------------------ */

/**
 * Replaces a gate's placeholder with the provider iframe.
 * Only ever called after an explicit activation.
 */
function activateGate(gate) {
  const { provider, mediaId, mediaTitle } = gate.dataset;
  const config = MEDIA_PROVIDERS[provider];
  if (!config || !mediaId) return;

  const frame = gate.querySelector('[data-media-frame]');
  const prompt = gate.querySelector('[data-media-prompt]');
  if (!frame || gate.dataset.loaded === 'true') return;

  const iframe = document.createElement('iframe');
  iframe.src = config.embed(mediaId);
  iframe.title = mediaTitle || `${config.name} player`;
  iframe.loading = 'lazy';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

  prompt?.remove();
  frame.append(iframe);
  gate.dataset.loaded = 'true';
}

/** Removes a loaded embed, used when consent is withdrawn. */
function deactivateGate(gate) {
  if (gate.dataset.loaded !== 'true') return;
  gate.querySelector('[data-media-frame] iframe')?.remove();
  gate.dataset.loaded = 'false';
  const template = gate.querySelector('template[data-media-prompt-template]');
  if (template) {
    gate.querySelector('[data-media-frame]')?.append(template.content.cloneNode(true));
  }
}

export function initMediaGates(root = document) {
  const gates = root.querySelectorAll('[data-media-gate]');
  if (!gates.length) return;

  for (const gate of gates) {
    const activator = gate.querySelector('[data-media-activate]');
    if (!activator) continue;

    activator.addEventListener('click', () => {
      // Activating a specific item also records the media choice, because the
      // visitor has asked for third-party content in an informed way.
      if (!hasMediaConsent()) writeConsent(true);
      activateGate(gate);
    });

    // A visitor who already accepted media should not have to click twice.
    if (hasMediaConsent() && gate.dataset.autoload === 'true') {
      activateGate(gate);
    }
  }

  onConsentChange((value) => {
    for (const gate of gates) {
      if (!value.media) deactivateGate(gate);
      else if (gate.dataset.autoload === 'true') activateGate(gate);
    }
  });
}

/* ------------------------------------------------------------------ */
/* Banner and settings                                                 */
/* ------------------------------------------------------------------ */

export function initConsentBanner() {
  const banner = document.querySelector('[data-consent-banner]');
  if (!banner) return;

  const show = () => {
    banner.hidden = false;
  };
  const hide = () => {
    banner.hidden = true;
  };

  if (!hasDecided()) show();

  banner.querySelector('[data-consent-accept]')?.addEventListener('click', () => {
    writeConsent(true);
    hide();
  });

  banner.querySelector('[data-consent-reject]')?.addEventListener('click', () => {
    writeConsent(false);
    hide();
  });

  // "Cookie settings" in the footer reopens the choice at any time.
  for (const trigger of document.querySelectorAll('[data-consent-open]')) {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const settings = document.querySelector('[data-consent-settings]');
      if (settings) {
        settings.scrollIntoView({ block: 'start' });
        settings.querySelector('input')?.focus();
        return;
      }
      show();
      banner.querySelector('button')?.focus();
    });
  }
}

/** Granular switches on the cookie page. */
export function initConsentSettings() {
  const panel = document.querySelector('[data-consent-settings]');
  if (!panel) return;

  const mediaSwitch = panel.querySelector('[data-consent-media-switch]');
  const status = panel.querySelector('[data-consent-settings-status]');

  const render = () => {
    if (mediaSwitch) mediaSwitch.checked = hasMediaConsent();
  };
  render();

  mediaSwitch?.addEventListener('change', () => {
    writeConsent(mediaSwitch.checked);
    if (status) {
      status.textContent = mediaSwitch.checked
        ? 'Third-party media is now allowed. Videos and music players will load when you open them.'
        : 'Third-party media is now switched off. Existing players have been removed from this page.';
    }
    document.querySelector('[data-consent-banner]')?.setAttribute('hidden', '');
  });

  onConsentChange(render);
}
