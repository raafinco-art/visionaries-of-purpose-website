/**
 * newsletter-unsubscribe
 *
 * Accepts a single-use token issued in a marketing email. The token is never
 * the email address itself, so opening the link does not expose the recipient
 * in a URL, a referrer header or a server log.
 *
 * Unsubscribing updates the status immediately, records the audit event and
 * suppresses future marketing. Repeating the action is safe.
 */

import { guard, json, logOutcome, throttleKey } from '../_shared/request.ts';
import { serviceClient, withinRateLimit } from '../_shared/db.ts';

/** Hashes the token so the stored value cannot be replayed from the database. */
async function hashToken(token: string): Promise<string> {
  const salt = Deno.env.get('VOP_UNSUBSCRIBE_SALT') ?? '';
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${salt}:${token}`),
  );
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

Deno.serve(async (request) => {
  const check = await guard(request);
  if (!check.ok) return check.response!;

  const { origin, requestId, body } = check;
  const token = typeof body!.token === 'string' ? body!.token.trim() : '';

  if (token.length < 20 || token.length > 200) {
    logOutcome(requestId, 'newsletter-unsubscribe', 'invalid_token_shape');
    return json({ ok: false, error: 'invalid_token' }, 422, origin);
  }

  const bucket = await throttleKey(request, 'unsubscribe');
  if (!(await withinRateLimit(bucket, 10, 600))) {
    logOutcome(requestId, 'newsletter-unsubscribe', 'rate_limited');
    return json({ ok: false, error: 'rate_limited' }, 429, origin);
  }

  try {
    const client = serviceClient();
    const tokenHash = await hashToken(token);

    const { data, error } = await client
      .from('newsletter_subscribers')
      .select('email')
      .eq('confirmation_token_hash', tokenHash)
      .maybeSingle();

    if (error) {
      logOutcome(requestId, 'newsletter-unsubscribe', 'db_error', { code: error.code ?? '' });
      return json({ ok: false, error: 'server_error' }, 500, origin);
    }

    // An unknown token returns the same response as a successful removal, so
    // the endpoint cannot be used to test whether an address is subscribed.
    if (!data) {
      logOutcome(requestId, 'newsletter-unsubscribe', 'token_not_found');
      return json({ ok: true }, 200, origin);
    }

    const { error: rpcError } = await client.rpc('newsletter_unsubscribe', {
      p_email: data.email,
    });

    if (rpcError) {
      logOutcome(requestId, 'newsletter-unsubscribe', 'db_error', { code: rpcError.code ?? '' });
      return json({ ok: false, error: 'server_error' }, 500, origin);
    }

    logOutcome(requestId, 'newsletter-unsubscribe', 'unsubscribed');
    return json({ ok: true }, 200, origin);
  } catch {
    logOutcome(requestId, 'newsletter-unsubscribe', 'unhandled');
    return json({ ok: false, error: 'server_error' }, 500, origin);
  }
});
