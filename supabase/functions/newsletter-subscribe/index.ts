/**
 * newsletter-subscribe
 *
 * Deploy with --no-verify-jwt because unauthenticated visitors call it. The
 * function therefore enforces origin, method, size, schema, honeypot, bot and
 * rate-limit controls itself.
 *
 * The response is identical whether the address is new or already eligible, so
 * the endpoint never reveals membership.
 */

import { guard, json, logOutcome, throttleKey, verifyTurnstile } from '../_shared/request.ts';
import { serviceClient, withinRateLimit } from '../_shared/db.ts';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Consent versions this deployment recognises. */
const CONSENT_VERSIONS = new Set(['privacy-2026-08-05']);

/** Routes the newsletter form may be submitted from. */
const SOURCE_PAGES = new Set([
  '/', '/about/', '/artists/', '/services/', '/events/',
  '/music/', '/news/', '/contact/', '/privacy/', '/cookies/',
]);

// One generic success message for every acceptable outcome.
const SUCCESS = { ok: true };

Deno.serve(async (request) => {
  const check = await guard(request);
  if (!check.ok) return check.response!;

  const { origin, requestId, body } = check;
  const payload = body!;

  // A filled honeypot gets the same shape of response as a success, so the
  // sender learns nothing, and nothing is written.
  const company = typeof payload.company === 'string' ? payload.company.trim() : '';
  if (company !== '') {
    logOutcome(requestId, 'newsletter-subscribe', 'honeypot');
    return json(SUCCESS, 200, origin);
  }

  const email = typeof payload.email === 'string'
    ? payload.email.trim().toLowerCase()
    : '';
  const consent = payload.marketingConsent === true;
  const consentVersion = typeof payload.consentVersion === 'string' ? payload.consentVersion : '';
  const sourcePage = typeof payload.sourcePage === 'string' ? payload.sourcePage : '';

  if (!EMAIL.test(email) || email.length > 254) {
    logOutcome(requestId, 'newsletter-subscribe', 'invalid_email');
    return json({ ok: false, error: 'invalid_email' }, 422, origin);
  }

  if (!consent) {
    logOutcome(requestId, 'newsletter-subscribe', 'consent_missing');
    return json({ ok: false, error: 'consent_required' }, 422, origin);
  }

  if (!CONSENT_VERSIONS.has(consentVersion)) {
    logOutcome(requestId, 'newsletter-subscribe', 'consent_version_unknown');
    return json({ ok: false, error: 'invalid_request' }, 422, origin);
  }

  if (!SOURCE_PAGES.has(sourcePage)) {
    logOutcome(requestId, 'newsletter-subscribe', 'source_unknown');
    return json({ ok: false, error: 'invalid_request' }, 422, origin);
  }

  if (!(await verifyTurnstile(payload.turnstileToken))) {
    logOutcome(requestId, 'newsletter-subscribe', 'turnstile_failed');
    return json({ ok: false, error: 'verification_failed' }, 422, origin);
  }

  const bucket = await throttleKey(request, 'newsletter');
  if (!(await withinRateLimit(bucket, 5, 600))) {
    logOutcome(requestId, 'newsletter-subscribe', 'rate_limited');
    return json({ ok: false, error: 'rate_limited' }, 429, origin);
  }

  try {
    const client = serviceClient();
    // One database function performs the upsert and appends the consent event
    // together, so a subscriber can never exist without its evidence.
    const { error } = await client.rpc('newsletter_subscribe', {
      p_email: email,
      p_consent_version: consentVersion,
      p_source_page: sourcePage,
    });

    if (error) {
      logOutcome(requestId, 'newsletter-subscribe', 'db_error', { code: error.code ?? '' });
      return json({ ok: false, error: 'server_error' }, 500, origin);
    }

    // TODO(owner): send the double opt-in confirmation through the approved
    // email provider once the sending domain is verified. Until then the
    // subscriber remains 'pending' and receives no marketing.
    logOutcome(requestId, 'newsletter-subscribe', 'accepted');
    return json(SUCCESS, 200, origin);
  } catch {
    logOutcome(requestId, 'newsletter-subscribe', 'unhandled');
    return json({ ok: false, error: 'server_error' }, 500, origin);
  }
});
