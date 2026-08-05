/**
 * Shared request handling for the public Edge Functions.
 *
 * These endpoints are called by unauthenticated visitors, so the function
 * enforces its own origin, method, size, schema, bot and rate-limit controls
 * rather than relying on JWT verification.
 *
 * Nothing here logs a raw email address, message body or Turnstile token.
 */

/** Origins allowed to call these functions. Set VOP_ALLOWED_ORIGINS in the
 *  Supabase secret store as a comma-separated list, for example:
 *  https://visionariesofpurpose.co.za,https://www.visionariesofpurpose.co.za  */
export function allowedOrigins(): string[] {
  return (Deno.env.get('VOP_ALLOWED_ORIGINS') ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

export function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = allowedOrigins();
  // CORS is only granted to an exact match. There is no wildcard.
  const match = origin && allowed.includes(origin) ? origin : '';
  return {
    'Access-Control-Allow-Origin': match,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

export function json(
  body: unknown,
  status: number,
  origin: string | null,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(origin),
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export interface GuardResult {
  ok: boolean;
  origin: string | null;
  response?: Response;
  body?: Record<string, unknown>;
  requestId: string;
}

const MAX_BODY_BYTES = 8 * 1024; // 8KB is generous for these payloads.

/**
 * Applies the shared boundary: preflight, method, origin, content type, body
 * size and JSON shape. Returns the parsed body when every check passes.
 */
export async function guard(request: Request): Promise<GuardResult> {
  const origin = request.headers.get('origin');
  const requestId = crypto.randomUUID();

  if (request.method === 'OPTIONS') {
    return {
      ok: false,
      origin,
      requestId,
      response: new Response(null, { status: 204, headers: corsHeaders(origin) }),
    };
  }

  if (request.method !== 'POST') {
    return {
      ok: false,
      origin,
      requestId,
      response: json({ ok: false }, 405, origin),
    };
  }

  const allowed = allowedOrigins();
  if (allowed.length === 0 || !origin || !allowed.includes(origin)) {
    // A wrong or absent origin is refused without explaining why.
    return { ok: false, origin, requestId, response: json({ ok: false }, 403, origin) };
  }

  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return { ok: false, origin, requestId, response: json({ ok: false }, 415, origin) };
  }

  const declared = Number(request.headers.get('content-length') ?? '0');
  if (declared > MAX_BODY_BYTES) {
    return { ok: false, origin, requestId, response: json({ ok: false }, 413, origin) };
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return { ok: false, origin, requestId, response: json({ ok: false }, 413, origin) };
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return { ok: false, origin, requestId, response: json({ ok: false }, 400, origin) };
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { ok: false, origin, requestId, response: json({ ok: false }, 400, origin) };
  }

  return { ok: true, origin, requestId, body: body as Record<string, unknown> };
}

/** Server-side Cloudflare Turnstile verification. */
export async function verifyTurnstile(token: unknown): Promise<boolean> {
  const secret = Deno.env.get('VOP_TURNSTILE_SECRET_KEY');
  // Turnstile stays optional until the owner supplies keys. When it is not
  // configured the other controls (origin, honeypot, rate limit) still apply.
  if (!secret) return true;

  if (typeof token !== 'string' || token.length === 0 || token.length > 2048) return false;

  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);

  try {
    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
    const outcome = await result.json();
    return outcome.success === true;
  } catch {
    return false;
  }
}

/**
 * Derives a rate-limit bucket key without storing a raw address.
 *
 * The address is combined with a server-only salt and truncated to 16 hex
 * characters. That is enough to count bursts and not enough to recover the
 * original value.
 */
export async function throttleKey(request: Request, scope: string): Promise<string> {
  const salt = Deno.env.get('VOP_THROTTLE_SALT') ?? 'vop-default-salt-change-me';
  const address =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';

  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${salt}:${scope}:${address}`),
  );
  const hex = [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return `${scope}:${hex.slice(0, 16)}`;
}

/** Structured log line. Carries an outcome category, never personal content. */
export function logOutcome(
  requestId: string,
  fn: string,
  outcome: string,
  extra: Record<string, string | number> = {},
): void {
  console.log(JSON.stringify({ requestId, fn, outcome, ...extra }));
}
