/**
 * Server-side Supabase client and rate limiting.
 *
 * The secret key is read from the Supabase secret store and never leaves the
 * function. It must not appear in the browser bundle, source maps, deployment
 * logs or the repository.
 */

import { createClient, type SupabaseClient } from 'jsr:@supabase/supabase-js@2.112.0';

let cached: SupabaseClient | null = null;

export function serviceClient(): SupabaseClient {
  if (cached) return cached;

  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('VOP_SUPABASE_SECRET_KEY');

  if (!url || !key) {
    throw new Error('Server configuration is incomplete');
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

/**
 * Fixed-window counter. Returns true when the request is within the limit.
 *
 * The window start is truncated so concurrent requests share a row, and the
 * count is incremented atomically through an upsert plus a guarded read.
 */
export async function withinRateLimit(
  bucketKey: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const client = serviceClient();
  const now = Date.now();
  const windowStart = new Date(Math.floor(now / (windowSeconds * 1000)) * windowSeconds * 1000);

  const { data, error } = await client.rpc('bump_request_throttle', {
    p_bucket_key: bucketKey,
    p_window_start: windowStart.toISOString(),
  });

  if (error) {
    // Fail closed on a counter failure rather than allowing an unbounded burst.
    return false;
  }

  return typeof data === 'number' ? data <= limit : false;
}
