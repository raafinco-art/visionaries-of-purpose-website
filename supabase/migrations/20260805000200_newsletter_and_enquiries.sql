-- ============================================================================
-- Private operational data.
--
-- These tables are never readable or writable through the publishable key.
-- Only an Edge Function holding an sb_secret_ key writes to them, after
-- server-side validation. RLS is enabled and no anonymous policy is created,
-- so the tables are inaccessible through the Data API by default.
-- ============================================================================

-- --------------------------------------------------- newsletter subscribers --
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  status text not null default 'pending'
    check (status in ('pending', 'subscribed', 'unsubscribed', 'suppressed')),
  consent_version text not null,
  source_page text not null default 'website',
  confirmation_token_hash text,
  confirmation_expires_at timestamptz,
  consented_at timestamptz not null default now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint newsletter_email_canonical
    check (email = lower(btrim(email)) and char_length(email) <= 254)
);

create unique index newsletter_subscribers_email_key
  on public.newsletter_subscribers (email);

create trigger newsletter_subscribers_set_updated_at
  before update on public.newsletter_subscribers
  for each row execute function public.set_updated_at();

-- ------------------------------------------------ newsletter consent events --
-- Append-only evidence of subscribe, confirm and unsubscribe actions.
create table public.newsletter_consent_events (
  id bigint generated always as identity primary key,
  subscriber_id uuid not null
    references public.newsletter_subscribers(id) on delete cascade,
  event_type text not null
    check (event_type in ('consent_recorded', 'confirmation_sent', 'confirmed', 'unsubscribed')),
  consent_version text not null,
  source_page text not null,
  occurred_at timestamptz not null default now()
);

create index newsletter_consent_events_subscriber_occurred_idx
  on public.newsletter_consent_events (subscriber_id, occurred_at desc);

-- ---------------------------------------------------------- contact enquiries --
create table public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 1 and 120),
  email text not null check (char_length(email) <= 254),
  phone text check (phone is null or char_length(phone) <= 40),
  enquiry_type text not null
    check (enquiry_type in ('artist-booking', 'service', 'event-production',
                            'partnership', 'media', 'general')),
  artist_slug text,
  service_slug text,
  event_date date,
  message text not null check (char_length(message) between 1 and 4000),
  privacy_acknowledged boolean not null,
  consent_version text not null,
  status text not null default 'new'
    check (status in ('new', 'in_progress', 'answered', 'closed', 'spam')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contact_enquiries_privacy_required check (privacy_acknowledged = true)
);

create index contact_enquiries_created_idx
  on public.contact_enquiries (created_at desc);

create trigger contact_enquiries_set_updated_at
  before update on public.contact_enquiries
  for each row execute function public.set_updated_at();

-- --------------------------------------------------------------- rate limits --
-- Abuse counters keyed on a salted, truncated derivation, never a raw address.
create table public.request_throttle (
  bucket_key text not null,
  window_start timestamptz not null,
  request_count integer not null default 1,
  primary key (bucket_key, window_start)
);

create index request_throttle_window_idx on public.request_throttle (window_start);

-- ============================================================================
-- Lock everything down.
-- ============================================================================
alter table public.newsletter_subscribers enable row level security;
alter table public.newsletter_consent_events enable row level security;
alter table public.contact_enquiries enable row level security;
alter table public.request_throttle enable row level security;

revoke all on table public.newsletter_subscribers from anon, authenticated;
revoke all on table public.newsletter_consent_events from anon, authenticated;
revoke all on table public.contact_enquiries from anon, authenticated;
revoke all on table public.request_throttle from anon, authenticated;

-- No policy is created for anon or authenticated on purpose. With RLS enabled
-- and no policy, the Data API returns nothing for these tables.

-- ============================================================================
-- Subscribe in one transaction: upsert the subscriber and append the evidence.
-- SECURITY DEFINER so the Edge Function performs a single controlled operation
-- rather than several unconstrained writes.
-- ============================================================================
create or replace function public.newsletter_subscribe(
  p_email text,
  p_consent_version text,
  p_source_page text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text := lower(btrim(p_email));
  v_id uuid;
begin
  if v_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' or char_length(v_email) > 254 then
    raise exception 'invalid email' using errcode = '22023';
  end if;

  insert into public.newsletter_subscribers (email, status, consent_version, source_page)
  values (v_email, 'pending', p_consent_version, p_source_page)
  on conflict (email) do update
    set consent_version = excluded.consent_version,
        source_page     = excluded.source_page,
        consented_at    = now(),
        -- Re-subscribing after an opt-out returns the record to pending.
        status          = case
                            when public.newsletter_subscribers.status = 'suppressed'
                              then 'suppressed'
                            when public.newsletter_subscribers.status = 'unsubscribed'
                              then 'pending'
                            else public.newsletter_subscribers.status
                          end
  returning id into v_id;

  insert into public.newsletter_consent_events
    (subscriber_id, event_type, consent_version, source_page)
  values (v_id, 'consent_recorded', p_consent_version, p_source_page);
end;
$$;

revoke all on function public.newsletter_subscribe(text, text, text) from public, anon, authenticated;

-- ============================================================================
-- Unsubscribe immediately, and record the audit event.
-- ============================================================================
create or replace function public.newsletter_unsubscribe(p_email text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text := lower(btrim(p_email));
  v_id uuid;
  v_version text;
  v_source text;
begin
  select id, consent_version, source_page
    into v_id, v_version, v_source
    from public.newsletter_subscribers
   where email = v_email;

  if v_id is null then
    return; -- Nothing to do, and nothing revealed about membership.
  end if;

  update public.newsletter_subscribers
     set status = 'unsubscribed',
         unsubscribed_at = now()
   where id = v_id;

  insert into public.newsletter_consent_events
    (subscriber_id, event_type, consent_version, source_page)
  values (v_id, 'unsubscribed', v_version, v_source);
end;
$$;

revoke all on function public.newsletter_unsubscribe(text) from public, anon, authenticated;
