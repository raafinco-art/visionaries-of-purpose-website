/**
 * Contact and booking enquiries.
 *
 * The form prefills only from allowlisted query values, so a crafted link
 * cannot inject arbitrary content into the page. Submissions go to an Edge
 * Function, never directly to a table.
 */

import {
  ARTIST_SLUGS,
  ENQUIRY_TYPES,
  PRIVACY_CONSENT_VERSION,
  SERVICE_SLUGS,
} from './config.js';
import { invokeFunction } from './supabase-client.js';
import {
  createSubmitState,
  currentTurnstileToken,
  focusFirstInvalid,
  resetTurnstile,
  setStatus,
  validateForm,
  wireLiveValidation,
} from './forms.js';

/*
 * The approved error copy ends with "or contact us directly on WhatsApp".
 * That clause is held back until a verified WhatsApp number is published,
 * because pointing at a channel that does not exist yet is worse than saying
 * nothing. Restore it with the number. See LAUNCH-BLOCKERS.md section 2.
 */
const MESSAGES = {
  success: 'Thank you for contacting Visionaries of Purpose. Your enquiry has been received, and our team will respond shortly.',
  failure: 'Your message could not be sent. Please check your details and try again.',
  rateLimited: 'Please wait a moment before sending another enquiry.',
  unconfigured: 'The enquiry form is not accepting messages yet. Please try again shortly.',
};

/** Shows the artist or service selector only when the type calls for one. */
function syncConditionalFields(form) {
  const type = form.elements.enquiryType?.value ?? '';
  const artistField = form.querySelector('[data-field-artist]');
  const serviceField = form.querySelector('[data-field-service]');

  const showArtist = type === 'artist-booking';
  const showService = type === 'service' || type === 'event-production';

  if (artistField) {
    artistField.hidden = !showArtist;
    const select = artistField.querySelector('select');
    if (select) select.disabled = !showArtist;
  }

  if (serviceField) {
    serviceField.hidden = !showService;
    const select = serviceField.querySelector('select');
    if (select) select.disabled = !showService;
  }
}

/** Applies allowlisted query values to the form. */
function prefillFromQuery(form) {
  const params = new URLSearchParams(location.search);

  const type = params.get('type');
  if (type && ENQUIRY_TYPES.includes(type) && form.elements.enquiryType) {
    form.elements.enquiryType.value = type;
  }

  const artist = params.get('artist');
  if (artist && ARTIST_SLUGS.includes(artist) && form.elements.artist) {
    form.elements.artist.value = artist;
  }

  const service = params.get('service');
  if (service && SERVICE_SLUGS.includes(service) && form.elements.service) {
    form.elements.service.value = service;
  }

  syncConditionalFields(form);

  if (type || artist || service) {
    // Bring the visitor to the form they followed a link to reach.
    form.scrollIntoView({ block: 'start' });
  }
}

export function initContactForm(root = document) {
  const form = root.querySelector('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector('[data-contact-status]');
  const submitState = createSubmitState(form, 'Sending...');
  let controller = null;

  wireLiveValidation(form);
  form.elements.enquiryType?.addEventListener('change', () => syncConditionalFields(form));
  prefillFromQuery(form);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitState.busy) return;

    const firstInvalid = validateForm(form);
    if (firstInvalid) {
      setStatus(status, '');
      focusFirstInvalid(firstInvalid);
      return;
    }

    const data = new FormData(form);

    if (String(data.get('company') || '').trim() !== '') {
      setStatus(status, MESSAGES.success, 'success');
      form.reset();
      return;
    }

    const enquiryType = String(data.get('enquiryType') || '');
    const artist = String(data.get('artist') || '');
    const service = String(data.get('service') || '');

    const payload = {
      fullName: String(data.get('fullName') || '').trim().slice(0, 120),
      email: String(data.get('email') || '').trim().toLowerCase().slice(0, 254),
      phone: String(data.get('phone') || '').trim().slice(0, 40),
      enquiryType: ENQUIRY_TYPES.includes(enquiryType) ? enquiryType : 'general',
      artist: ARTIST_SLUGS.includes(artist) ? artist : '',
      service: SERVICE_SLUGS.includes(service) ? service : '',
      eventDate: String(data.get('eventDate') || ''),
      message: String(data.get('message') || '').trim().slice(0, 4000),
      privacyAcknowledged: data.get('privacyAcknowledged') === 'on',
      consentVersion: PRIVACY_CONSENT_VERSION,
      company: '',
      turnstileToken: currentTurnstileToken(form),
    };

    controller?.abort();
    controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);

    submitState.start();
    setStatus(status, '');

    const result = await invokeFunction('contact-submit', payload, {
      signal: controller.signal,
    });

    clearTimeout(timeout);
    submitState.stop();
    resetTurnstile(form);

    if (result.ok) {
      // Values are only cleared once the server has confirmed.
      form.reset();
      syncConditionalFields(form);
      setStatus(status, MESSAGES.success, 'success');
      status?.focus();
      return;
    }

    if (result.reason === 'aborted') return;

    const message =
      result.reason === 'rate-limited' ? MESSAGES.rateLimited
      : result.reason === 'unconfigured' ? MESSAGES.unconfigured
      : MESSAGES.failure;

    // Input is preserved so nothing typed is lost on a recoverable error.
    setStatus(status, message, 'error');
    status?.focus();
  });
}
