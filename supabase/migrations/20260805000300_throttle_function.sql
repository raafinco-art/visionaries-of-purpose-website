-- ============================================================================
-- Atomic rate-limit counter.
--
-- Called only by an Edge Function holding the secret key. Returns the request
-- count for the current window so the caller can decide whether to proceed.
-- ============================================================================

create or replace function public.bump_request_throttle(
  p_bucket_key text,
  p_window_start timestamptz
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  insert into public.request_throttle (bucket_key, window_start, request_count)
  values (p_bucket_key, p_window_start, 1)
  on conflict (bucket_key, window_start) do update
    set request_count = public.request_throttle.request_count + 1
  returning request_count into v_count;

  return v_count;
end;
$$;

revoke all on function public.bump_request_throttle(text, timestamptz) from public, anon, authenticated;

-- Housekeeping: drop counters older than a day. Schedule with pg_cron once the
-- extension is enabled, or call it from a maintenance task.
create or replace function public.prune_request_throttle()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from public.request_throttle where window_start < now() - interval '1 day';
$$;

revoke all on function public.prune_request_throttle() from public, anon, authenticated;
