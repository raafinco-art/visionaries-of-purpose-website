-- ============================================================================
-- Publicly readable content.
--
-- Every table enables Row Level Security immediately after creation and grants
-- only SELECT on published rows. There is no permissive catch-all policy: each
-- table is considered on its own.
--
-- Review in a development project before applying. No extension version is
-- pinned, because pinning is ignored from 5 August 2026.
-- ============================================================================

-- Keeps updated_at honest without depending on an extension.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ---------------------------------------------------------------- artists --
create table public.artists (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  legal_name text,
  role text,
  short_bio text,
  long_bio text[],
  portrait_path text,
  portrait_alt text,
  social_links jsonb not null default '[]'::jsonb,
  display_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint artists_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index artists_published_order_idx
  on public.artists (display_order) where is_published;

create trigger artists_set_updated_at
  before update on public.artists
  for each row execute function public.set_updated_at();

alter table public.artists enable row level security;

create policy "public can read published artists"
  on public.artists for select to anon, authenticated
  using (is_published = true);

grant select on table public.artists to anon, authenticated;
revoke insert, update, delete on table public.artists from anon, authenticated;

-- --------------------------------------------------------------- services --
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  eyebrow text,
  headline text,
  summary text,
  description text,
  highlights text[],
  image_path text,
  image_alt text,
  display_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint services_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index services_published_order_idx
  on public.services (display_order) where is_published;

create trigger services_set_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

alter table public.services enable row level security;

create policy "public can read published services"
  on public.services for select to anon, authenticated
  using (is_published = true);

grant select on table public.services to anon, authenticated;
revoke insert, update, delete on table public.services from anon, authenticated;

-- ----------------------------------------------------------------- events --
-- An unknown start time is never stored as a fabricated timestamp. The date
-- column plus is_all_day carries that state honestly, and event_sessions only
-- receives a row when an actual time is known.
create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  theme text,
  event_type text,
  host text,
  organisers text[],
  artist_names text[] not null default '{}',
  event_date date not null,
  is_all_day boolean not null default true,
  end_time_label text,
  venue text,
  city text,
  description text,
  long_description text[],
  admission text,
  entrance_requirements text[],
  scripture text,
  enquiry_numbers text[],
  poster_path text,
  poster_alt text,
  ticket_url text,
  ticket_provider text,
  prices jsonb not null default '[]'::jsonb,
  maps_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  -- A ticket or map link must be a real absolute URL or absent entirely.
  constraint events_ticket_url_shape check (ticket_url is null or ticket_url ~ '^https://'),
  constraint events_maps_url_shape check (maps_url is null or maps_url ~ '^https://')
);

create index events_published_date_idx
  on public.events (event_date) where is_published;

create trigger events_set_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

alter table public.events enable row level security;

create policy "public can read published events"
  on public.events for select to anon, authenticated
  using (is_published = true);

grant select on table public.events to anon, authenticated;
revoke insert, update, delete on table public.events from anon, authenticated;

-- --------------------------------------------------------- event sessions --
create table public.event_sessions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  label text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  timezone text not null default 'Africa/Johannesburg',
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint event_sessions_order check (ends_at is null or ends_at > starts_at)
);

create index event_sessions_event_idx
  on public.event_sessions (event_id, display_order);

alter table public.event_sessions enable row level security;

-- Sessions are only visible when their parent event is published.
create policy "public can read sessions of published events"
  on public.event_sessions for select to anon, authenticated
  using (
    exists (
      select 1 from public.events e
      where e.id = event_sessions.event_id and e.is_published = true
    )
  );

grant select on table public.event_sessions to anon, authenticated;
revoke insert, update, delete on table public.event_sessions from anon, authenticated;

-- --------------------------------------------------------- music releases --
create table public.music_releases (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  artist_display text not null,
  artist_id uuid references public.artists(id) on delete set null,
  release_type text,
  release_date date,
  cover_path text,
  cover_alt text,
  spotify_track_id text,
  apple_song_id text,
  platform_links jsonb not null default '[]'::jsonb,
  is_latest boolean not null default false,
  display_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint music_releases_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index music_releases_published_order_idx
  on public.music_releases (display_order) where is_published;

create trigger music_releases_set_updated_at
  before update on public.music_releases
  for each row execute function public.set_updated_at();

alter table public.music_releases enable row level security;

create policy "public can read published releases"
  on public.music_releases for select to anon, authenticated
  using (is_published = true);

grant select on table public.music_releases to anon, authenticated;
revoke insert, update, delete on table public.music_releases from anon, authenticated;

-- ------------------------------------------------------------- news posts --
create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text,
  excerpt text,
  body text[],
  lead_image_path text,
  lead_image_alt text,
  author text,
  published_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint news_posts_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  -- A published story must carry a publication timestamp.
  constraint news_posts_published_needs_date
    check (is_published = false or published_at is not null)
);

create index news_posts_published_idx
  on public.news_posts (published_at desc) where is_published;

create trigger news_posts_set_updated_at
  before update on public.news_posts
  for each row execute function public.set_updated_at();

alter table public.news_posts enable row level security;

-- Drafts are excluded even when a future published_at is set.
create policy "public can read published news"
  on public.news_posts for select to anon, authenticated
  using (is_published = true and published_at <= now());

grant select on table public.news_posts to anon, authenticated;
revoke insert, update, delete on table public.news_posts from anon, authenticated;
