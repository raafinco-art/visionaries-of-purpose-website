/**
 * Newsletter subscription.
 *
 * Consent is explicit, separate and never preselected. The success message is
 * identical for a new and an already-subscribed address so the endpoint does
 * not reveal membership. The email address is never logged.
 */

import { PRIVACY_CONSENT_VERSION, SOURCE_PAGE_ALLOWLIST } from './config.js';
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

const MESSAGES = {
  // Double opt-in is the recommended default. If the owner decides against
  // it, change this to 'Thank you. You are subscribed.' and record the
  // decision alongside the privacy policy.
  success: 'Thank you. Check your inbox for the next step.',
  rateLimited: 'Please wait a moment before trying again.',
  failure: 'We could not complete your subscription. Please try again.',
  unconfigured: 'The newsletter is not accepting subscriptions yet. Please try again soon.',
};

/** Normalises the current route against the allowlist. */
function allowedSourcePage(pathname) {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return SOURCE_PAGE_ALLOWLIST.includes(path) ? path : '/';
}

export function initNewsletter(root = document) {
  for (const form of root.querySelectorAll('[data-newsletter-form]')) {
    setup(form);
  }
}

function setup(form) {
  const status = form.querySelector('[data-newsletter-status]');
  const submitState = createSubmitState(form, 'Subscribing...');
  let controller = null;

  wireLiveValidation(form);

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

    // A filled honeypot is treated as a submission that quietly goes nowhere.
    if (String(data.get('company') || '').trim() !== '') {
      setStatus(status, MESSAGES.success, 'success');
      form.reset();
      return;
    }

    const payload = {
      email: String(data.get('email') || '').trim().toLowerCase(),
      marketingConsent: data.get('marketingConsent') === 'on',
      consentVersion: PRIVACY_CONSENT_VERSION,
      sourcePage: allowedSourcePage(location.pathname),
      company: '',
      turnstileToken: currentTurnstileToken(form),
    };

    controller?.abort();
    controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    submitState.start();
    setStatus(status, '');

    const result = await invokeFunction('newsletter-subscribe', payload, {
      signal: controller.signal,
    });

    clearTimeout(timeout);
    submitState.stop();
    resetTurnstile(form);

    if (result.ok) {
      form.reset();
      setStatus(status, MESSAGES.success, 'success');
      status?.focus();
      return;
    }

    if (result.reason === 'aborted') return;

    const message =
      result.reason === 'rate-limited' ? MESSAGES.rateLimited
      : result.reason === 'unconfigured' ? MESSAGES.unconfigured
      : MESSAGES.failure;

    setStatus(status, message, 'error');
    status?.focus();
  });
}
