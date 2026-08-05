/**
 * Generates supabase/seed.sql from data/fallback-content.json.
 *
 * The JSON file is the reviewed record of what the site publishes. This turns
 * it into idempotent upserts so a development project can be brought to the
 * same state, and so the content tables and the rendered pages cannot drift.
 *
 * Nothing here invents a value: a field that is absent in the JSON is written
 * as NULL, and events without a confirmed time are seeded as all-day.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const content = JSON.parse(readFileSync(join(root, 'data/fallback-content.json'), 'utf8'));

/** Quotes a value as SQL, or NULL when it is absent. */
const q = (v) =>
  v === null || v === undefined || v === '' ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`;

/** text[] literal. */
const arr = (values) =>
  !values || values.length === 0
    ? "'{}'"
    : `ARRAY[${values.map((v) => q(v)).join(', ')}]::text[]`;

/** jsonb literal. */
const jsonb = (value) => `${q(JSON.stringify(value ?? []))}::jsonb`;

const bool = (v) => (v ? 'true' : 'false');

const lines = [
  '-- ============================================================================',
  '-- Content seed, generated from data/fallback-content.json.',
  '--',
  '-- Do not edit by hand. Change the JSON and run `node scripts/build-seed.mjs`.',
  '--',
  '-- Every statement is an upsert keyed on slug, so applying this repeatedly is',
  '-- safe. Values absent from the source are seeded as NULL rather than guessed.',
  `-- Source last reviewed: ${content._meta.lastReviewed}`,
  '-- ============================================================================',
  '',
  'begin;',
  '',
];

/* -------------------------------------------------------------- artists -- */
lines.push('-- Artists ------------------------------------------------------------------');
for (const [i, a] of content.artists.entries()) {
  lines.push(
    `insert into public.artists (slug, name, legal_name, role, short_bio, long_bio, portrait_path, portrait_alt, social_links, display_order, is_published) values (`,
    `  ${q(a.slug)}, ${q(a.name)}, ${q(a.legalName)}, ${q(a.role)},`,
    `  ${q(a.shortBio)}, ${arr(a.longBio)},`,
    `  ${q(a.portrait)}, ${q(a.portraitAlt)},`,
    `  ${jsonb(a.socialLinks)}, ${a.displayOrder ?? i + 1}, ${bool(a.isPublished)}`,
    `) on conflict (slug) do update set`,
    `  name = excluded.name, legal_name = excluded.legal_name, role = excluded.role,`,
    `  short_bio = excluded.short_bio, long_bio = excluded.long_bio,`,
    `  portrait_path = excluded.portrait_path, portrait_alt = excluded.portrait_alt,`,
    `  social_links = excluded.social_links, display_order = excluded.display_order,`,
    `  is_published = excluded.is_published;`,
    '',
  );
}

/* --------------------------------------------------------------- events -- */
lines.push('-- Events -------------------------------------------------------------------');
for (const e of content.events) {
  lines.push(
    `insert into public.events (slug, title, theme, event_type, host, organisers, artist_names,`,
    `  event_date, is_all_day, end_time_label, venue, city, description, long_description,`,
    `  admission, entrance_requirements, scripture, enquiry_numbers, poster_path, poster_alt,`,
    `  ticket_url, ticket_provider, prices, maps_url, is_published) values (`,
    `  ${q(e.slug)}, ${q(e.title)}, ${q(e.theme)}, ${q(e.eventType)}, ${q(e.host)},`,
    `  ${arr(e.organisers)}, ${arr(e.artists)},`,
    `  ${q(e.date)}, ${bool(e.isAllDay)}, ${q(e.endTimeLabel)},`,
    `  ${q(e.venue)}, ${q(e.city)},`,
    `  ${q(e.description)}, ${arr(e.longDescription)},`,
    `  ${q(e.admission)}, ${arr(e.entranceRequirements)}, ${q(e.scripture)},`,
    `  ${arr(e.enquiryNumbers)},`,
    `  ${q(e.poster)}, ${q(e.posterAlt)},`,
    `  ${q(e.ticketUrl)}, ${q(e.ticketProvider)}, ${jsonb(e.prices)}, ${q(e.mapsUrl)},`,
    `  ${bool(e.isPublished)}`,
    `) on conflict (slug) do update set`,
    `  title = excluded.title, theme = excluded.theme, event_type = excluded.event_type,`,
    `  host = excluded.host, organisers = excluded.organisers, artist_names = excluded.artist_names,`,
    `  event_date = excluded.event_date, is_all_day = excluded.is_all_day,`,
    `  end_time_label = excluded.end_time_label, venue = excluded.venue, city = excluded.city,`,
    `  description = excluded.description, long_description = excluded.long_description,`,
    `  admission = excluded.admission, entrance_requirements = excluded.entrance_requirements,`,
    `  scripture = excluded.scripture, enquiry_numbers = excluded.enquiry_numbers,`,
    `  poster_path = excluded.poster_path, poster_alt = excluded.poster_alt,`,
    `  ticket_url = excluded.ticket_url, ticket_provider = excluded.ticket_provider,`,
    `  prices = excluded.prices, maps_url = excluded.maps_url,`,
    `  is_published = excluded.is_published;`,
    '',
  );

  // Sessions are replaced wholesale so a corrected time never leaves a stale row.
  lines.push(`delete from public.event_sessions where event_id = (select id from public.events where slug = ${q(e.slug)});`);
  for (const [i, s] of (e.sessions ?? []).entries()) {
    lines.push(
      `insert into public.event_sessions (event_id, label, starts_at, ends_at, display_order)`,
      `  select id, ${q(s.label)}, ${q(s.start)}::timestamptz, ${s.end ? `${q(s.end)}::timestamptz` : 'NULL'}, ${i}`,
      `  from public.events where slug = ${q(e.slug)};`,
    );
  }
  lines.push('');
}

/* ------------------------------------------------------------- releases -- */
lines.push('-- Music releases -----------------------------------------------------------');
for (const [i, r] of content.releases.entries()) {
  lines.push(
    `insert into public.music_releases (slug, title, artist_display, artist_id, release_type,`,
    `  cover_path, cover_alt, spotify_track_id, apple_song_id, platform_links, is_latest,`,
    `  display_order, is_published) values (`,
    `  ${q(r.slug)}, ${q(r.title)}, ${q(r.artist)},`,
    `  (select id from public.artists where slug = ${q(r.artistSlug)}),`,
    `  ${q(r.type)}, ${q(r.cover)}, ${q(r.coverAlt)},`,
    `  ${q(r.spotifyTrackId)}, ${q(r.appleSongId)}, ${jsonb(r.links)},`,
    `  ${bool(r.isLatest)}, ${i + 1}, ${bool(r.isPublished)}`,
    `) on conflict (slug) do update set`,
    `  title = excluded.title, artist_display = excluded.artist_display,`,
    `  artist_id = excluded.artist_id, release_type = excluded.release_type,`,
    `  cover_path = excluded.cover_path, cover_alt = excluded.cover_alt,`,
    `  spotify_track_id = excluded.spotify_track_id, apple_song_id = excluded.apple_song_id,`,
    `  platform_links = excluded.platform_links, is_latest = excluded.is_latest,`,
    `  display_order = excluded.display_order, is_published = excluded.is_published;`,
    '',
  );
}

/* ----------------------------------------------------------------- news -- */
lines.push('-- News --------------------------------------------------------------------');
lines.push('-- The outreach story has no supplied publication date, and the table requires');
lines.push('-- one before a row may be published. It is seeded as a draft on purpose; set');
lines.push('-- published_at and is_published once the owner confirms the date.');
lines.push('');
for (const n of content.news) {
  lines.push(
    `insert into public.news_posts (slug, title, category, excerpt, lead_image_path,`,
    `  lead_image_alt, published_at, is_published) values (`,
    `  ${q(n.slug)}, ${q(n.title)}, ${q(n.category)}, ${q(n.excerpt)},`,
    `  ${q(n.leadImage)}, ${q(n.leadImageAlt)}, NULL, false`,
    `) on conflict (slug) do update set`,
    `  title = excluded.title, category = excluded.category, excerpt = excluded.excerpt,`,
    `  lead_image_path = excluded.lead_image_path, lead_image_alt = excluded.lead_image_alt;`,
    '',
  );
}

lines.push('commit;');
lines.push('');

writeFileSync(join(root, 'supabase/seed.sql'), lines.join('\n'), 'utf8');
console.log(
  `supabase/seed.sql written: ${content.artists.length} artists, ${content.events.length} events, ` +
  `${content.releases.length} releases, ${content.news.length} news drafts.`,
);
