/**
 * contact-submit
 *
 * Same boundary as the newsletter function. Validates fixed enquiry types and
 * known artist and service slugs, writes to contact_enquiries, then notifies an
 * approved internal destination.
 *
 * The raw message body is never logged and never placed in a URL.
 */

import { guard, json, logOutcome, throttleKey, verifyTurnstile } from '../_shared/request.ts';
import { serviceClient, withinRateLimit } from '../_shared/db.ts';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const CONSENT_VERSIONS = new Set(['privacy-2026-08-05']);

const ENQUIRY_TYPES = new Set([
  'artist-booking', 'service', 'event-production', 'partnership', 'media', 'general',
]);

const ARTIST_SLUGS = new Set([
  'tshepiso-sk', 'tetelo-m', 'given-mohlala', 'divine-oracle',
]);

const SERVICE_SLUGS = new Set([
  'event-management', 'artist-bookings', 'live-band-performance', 'sound-production',
  'lighting-production', 'stage-supply', 'led-screens', 'backline-pa-hire',
]);

function text(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/** Notifies the internal destination without exposing the enquiry contents. */
async function notifyInternally(reference: string, enquiryType: string): Promise<void> {
  const webhook = Deno.env.get('VOP_ENQUIRY_WEBHOOK_URL');
  if (!webhook) return;

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Only a reference and a category travel here. Staff open the enquiry in
      // the authorised dashboard to read it.
      body: JSON.stringify({
        message: `New ${enquiryType} enquiry received. Reference ${reference}.`,
      }),
    });
  } catch {
    // A notification failure must not fail the visitor's submission.
  }
}

Deno.serve(async (request) => {
  const check = await guard(request);
  if (!check.ok) return check.response!;

  const { origin, requestId, body } = check;
  const payload = body!;

  if (text(payload.company, 200) !== '') {
    logOutcome(requestId, 'contact-submit', 'honeypot');
    return json({ ok: true }, 200, origin);
  }

  const fullName = text(payload.fullName, 120);
  const email = text(payload.email, 254).toLowerCase();
  const phone = text(payload.phone, 40);
  const message = text(payload.message, 4000);
  const enquiryType = text(payload.enquiryType, 40);
  const artist = text(payload.artist, 60);
  const service = text(payload.service, 60);
  const eventDate = text(payload.eventDate, 10);
  const consentVersion = text(payload.consentVersion, 60);
  const acknowledged = payload.privacyAcknowledged === true;

  if (fullName.length === 0) {
    return json({ ok: false, error: 'invalid_name' }, 422, origin);
  }
  if (!EMAIL.test(email)) {
    return json({ ok: false, error: 'invalid_email' }, 422, origin);
  }
  if (message.length === 0) {
    return json({ ok: false, error: 'invalid_message' }, 422, origin);
  }
  if (!ENQUIRY_TYPES.has(enquiryType)) {
    return json({ ok: false, error: 'invalid_request' }, 422, origin);
  }
  if (!acknowledged || !CONSENT_VERSIONS.has(consentVersion)) {
    return json({ ok: false, error: 'consent_required' }, 422, origin);
  }
  if (artist && !ARTIST_SLUGS.has(artist)) {
    return json({ ok: false, error: 'invalid_request' }, 422, origin);
  }
  if (service && !SERVICE_SLUGS.has(service)) {
    return json({ ok: false, error: 'invalid_request' }, 422, origin);
  }
  if (eventDate && !ISO_DATE.test(eventDate)) {
    return json({ ok: false, error: 'invalid_request' }, 422, origin);
  }

  if (!(await verifyTurnstile(payload.turnstileToken))) {
    logOutcome(requestId, 'contact-submit', 'turnstile_failed');
    return json({ ok: false, error: 'verification_failed' }, 422, origin);
  }

  const bucket = await throttleKey(request, 'contact');
  if (!(await withinRateLimit(bucket, 5, 900))) {
    logOutcome(requestId, 'contact-submit', 'rate_limited');
    return json({ ok: false, error: 'rate_limited' }, 429, origin);
  }

  try {
    const client = serviceClient();
    const { data, error } = await client
      .from('contact_enquiries')
      .insert({
        full_name: fullName,
        email,
        phone: phone || null,
        enquiry_type: enquiryType,
        artist_slug: artist || null,
        service_slug: service || null,
        event_date: eventDate || null,
        message,
        privacy_acknowledged: true,
        consent_version: consentVersion,
      })
      .select('id')
      .single();

    if (error) {
      logOutcome(requestId, 'contact-submit', 'db_error', { code: error.code ?? '' });
      return json({ ok: false, error: 'server_error' }, 500, origin);
    }

    await notifyInternally(String(data.id).slice(0, 8), enquiryType);

    logOutcome(requestId, 'contact-submit', 'accepted', { enquiryType });
    return json({ ok: true }, 200, origin);
  } catch {
    logOutcome(requestId, 'contact-submit', 'unhandled');
    return json({ ok: false, error: 'server_error' }, 500, origin);
  }
});
