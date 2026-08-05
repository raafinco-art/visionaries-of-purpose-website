/**
 * One browser Supabase client, configured with the publishable key only.
 *
 * The publishable key begins with `sb_publishable_`. An `sb_secret_` key,
 * service_role JWT, database password or management token must never reach
 * the browser bundle, source maps or the repository.
 *
 * The client is created lazily so pages that never touch Supabase do not pay
 * for the module, and so a missing configuration degrades quietly instead of
 * throwing during page start-up.
 */

import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './config.js';

let clientPromise = null;

export function isConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);
}

export async function getSupabase() {
  if (!isConfigured()) return null;
  if (clientPromise) return clientPromise;

  clientPromise = import('@supabase/supabase-js')
    .then(({ createClient }) =>
      createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { headers: { 'x-application-name': 'vop-website' } },
      }),
    )
    .catch(() => null);

  return clientPromise;
}

/**
 * Invokes an Edge Function. Returns a plain result object so callers never
 * have to inspect a provider-specific error shape.
 *
 * @returns {Promise<{ok: boolean, status?: number, reason?: string}>}
 */
export async function invokeFunction(name, body, { signal } = {}) {
  const supabase = await getSupabase();

  if (!supabase) {
    return { ok: false, reason: 'unconfigured' };
  }

  try {
    const { error } = await supabase.functions.invoke(name, { body, signal });
    if (error) {
      const status = error.context?.status;
      if (status === 429) return { ok: false, status, reason: 'rate-limited' };
      if (status === 400 || status === 422) return { ok: false, status, reason: 'invalid' };
      return { ok: false, status, reason: 'server' };
    }
    return { ok: true };
  } catch (error) {
    if (error?.name === 'AbortError') return { ok: false, reason: 'aborted' };
    return { ok: false, reason: 'network' };
  }
}
