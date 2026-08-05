# 07. Supabase Backend Architecture

## Status and safety boundary

No Supabase project was changed during this planning audit. A Supabase MCP server was not available in the active tool set, no project-scoped MCP configuration was found in the workspace, and no `project_ref` was supplied. This document therefore defines the implementation and verification contract without guessing a project or touching production.

When access is configured, begin in a development project with project-scoped, read-only MCP access. Apply writes only after the migration has been reviewed.

## Current platform decisions

These decisions were checked against official Supabase documentation on 5 August 2026:

- Use the new `sb_publishable_...` key in the browser and `sb_secret_...` only in trusted server-side environments. Supabase states that legacy `anon` and `service_role` keys are being replaced and describes a transition through the end of 2026. See [API keys](https://supabase.com/docs/guides/getting-started/api-keys).
- Enable Row Level Security on every table, view or function exposed through the Data API. With RLS enabled, data is not accessible through the public key until policies permit it. See [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).
- Put public form validation, bot checks, rate limiting and privileged writes in Edge Functions. See [Securing your data](https://supabase.com/docs/guides/database/secure-data) and [Edge Functions](https://supabase.com/docs/guides/functions).
- Verify the [Supabase breaking-change changelog](https://supabase.com/changelog?types=breaking-change) before implementation. A current change states that extension version pinning is ignored from 5 August 2026, so migrations in this project should not depend on an extension version pin.

## MCP setup workflow

Follow the official [Supabase MCP guide](https://supabase.com/docs/guides/ai-tools/mcp). A project-scoped starting configuration is conceptually:

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=PROJECT_REF&read_only=true&features=docs,database,debugging,development,functions"
    }
  }
}
```

Do not commit this placeholder or a token. Replace `PROJECT_REF` with the development project's exact reference through the user's secure configuration flow. Keep `read_only=true` for inspection. Remove read-only mode only for a reviewed migration step. Do not connect an AI tool directly to production data.

## System map

```text
Browser
  ├── published content reads ──> Supabase Data API ──> RLS-protected content tables
  ├── newsletter POST ─────────> Edge Function ──────> private subscriber tables
  ├── contact POST ────────────> Edge Function ──────> private enquiry table
  └── media activation ────────> consent gate ───────> YouTube / Spotify / Apple
```

The frontend uses only the project URL and publishable key. Edge Functions read `VOP_SUPABASE_SECRET_KEY` or another clearly scoped secret name from the Supabase secret store. Never use a privileged key in browser code.

## Proposed schemas

### Publicly readable content

| Table | Essential fields |
|---|---|
| `artists` | `id`, `slug`, `name`, bios, image paths, `display_order`, `is_published`, timestamps |
| `services` | `id`, `slug`, `name`, descriptions, image paths, `display_order`, `is_published` |
| `events` | `id`, `slug`, name, artist relation, dates, venue, city, description, poster, ticket/map URLs, `is_published` |
| `event_sessions` | `id`, `event_id`, start/end timestamptz, label, timezone |
| `music_releases` | `id`, artist relation, title, cover, release date, platform URLs, `is_published` |
| `news_posts` | `id`, `slug`, title, excerpt, body, lead image, author, published timestamp, `is_published` |

Unknown event times should not be stored as fabricated timestamps. Use a date field and `is_all_day`, or session rows only when an actual time is known.

### Private operational data

| Table | Purpose |
|---|---|
| `newsletter_subscribers` | Current subscription status and minimum required contact information |
| `newsletter_consent_events` | Append-only evidence of subscribe, confirm and unsubscribe actions |
| `contact_enquiries` | Booking and general enquiry submissions |

Keep operational tables out of public read paths. A secret-bearing Edge Function may write them after server-side validation. Dashboard access should be limited to authorised staff.

## Newsletter migration baseline

Review this SQL in the development project before applying it. It uses no extension dependency.

```sql
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  status text not null default 'pending'
    check (status in ('pending', 'subscribed', 'unsubscribed', 'suppressed')),
  consent_version text not null,
  source_page text not null default 'website',
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

alter table public.newsletter_subscribers enable row level security;
alter table public.newsletter_consent_events enable row level security;

revoke all on table public.newsletter_subscribers from anon, authenticated;
revoke all on table public.newsletter_consent_events from anon, authenticated;
```

Do not add anonymous insert or select policies to these tables. The Edge Function uses a server-only secret and performs the controlled operation.

Add an `updated_at` trigger through a small project-owned function, or update it explicitly in the Edge Function. Do not collect IP address or user agent by default. If abuse prevention later requires either value, document the purpose, retention and access before collection.

## Published-content RLS baseline

Enable RLS immediately after creating each content table, grant only required columns/operations, and permit public reads only for published rows:

```sql
alter table public.events enable row level security;

create policy "public can read published events"
on public.events
for select
to anon, authenticated
using (is_published = true);

grant select on public.events to anon, authenticated;
revoke insert, update, delete on public.events from anon, authenticated;
```

Repeat deliberately for each content table. Do not use one permissive policy as a shortcut. Check views for `security_invoker` behaviour and do not expose private columns through joins.

## Newsletter Edge Function flow

1. Accept `POST` only and enforce a small request-size limit.
2. Validate the `Origin` against the production and approved preview origin allowlist.
3. Apply CORS only to allowed origins.
4. Parse JSON safely.
5. Reject a filled honeypot with a generic response.
6. Verify Cloudflare Turnstile server-side, following Supabase's [Turnstile Edge Function example](https://supabase.com/docs/guides/functions/examples/cloudflare-turnstile).
7. Normalise with `email.trim().toLowerCase()`, validate syntax and maximum length, and require `marketingConsent === true`.
8. Rate limit on a privacy-conscious derived key. Do not expose the algorithm or store a raw address indefinitely.
9. Upsert the subscriber safely and append a consent event in one database function or transaction.
10. Send double opt-in mail if the selected email provider and owner workflow support it.
11. Return the same success message whether the address is new or already eligible, so the endpoint does not reveal membership.
12. Log a request ID and outcome category, never the raw email or Turnstile token.

The new publishable keys are not JWTs. If the function is invoked by unauthenticated visitors, deployment may require `--no-verify-jwt`; the function must then enforce origin, bot, schema and rate-limit controls itself.

## Contact Edge Function flow

Use the same boundary as the newsletter function. Validate fixed enquiry types and known artist/service slugs, sanitise lengths, verify Turnstile, write to `contact_enquiries`, then notify an approved internal destination. Never return internal routing details or log raw messages.

Suggested retention is in `09_PRIVACY_POLICY.md` and remains an owner/legal decision.

## Migration workflow

1. Link the Supabase CLI to the development project.
2. Inspect existing schemas, policies, functions and extensions through read-only MCP or CLI.
3. Create timestamped migrations in `supabase/migrations/`.
4. Run locally or in a disposable branch/project.
5. Test as `anon`, `authenticated` and privileged server contexts.
6. Run database lint/security advisors and resolve findings.
7. Review the diff and backup/rollback approach.
8. Apply to staging, run frontend integration tests, then approve production separately.

Never repair production interactively without recording the equivalent migration.

## Verification queries and tests

- An anonymous select returns only rows where `is_published = true`.
- An anonymous insert/select/update against newsletter and contact tables fails.
- The publishable key cannot query subscriber emails.
- Edge Functions reject wrong origin, wrong method, oversized body, bad email, absent consent, invalid Turnstile and abuse bursts.
- Duplicate newsletter requests do not create duplicate rows.
- Unsubscribe is auditable and prevents future marketing sends.
- Function logs contain no raw personal content.
- Database advisors report no exposed tables without RLS and no unsafe function search paths.
- Secrets are present only in the Supabase secret store and deployment environment.

## Required owner inputs

- Development Supabase `project_ref`
- Confirmed production and preview origins
- Approved email-delivery provider and verified sending domain
- Subscriber administrator roles
- Double opt-in decision
- Retention decisions
- Responsible-party privacy contact

