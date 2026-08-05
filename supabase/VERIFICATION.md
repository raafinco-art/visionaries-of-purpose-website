# Supabase verification steps

Run every check in a development project before anything is applied to
production. Start with project-scoped, read-only MCP or CLI access and only
enable writes for a reviewed migration.

## 1. Link and inspect

```bash
supabase link --project-ref <DEVELOPMENT_PROJECT_REF>
supabase db pull
supabase migration list
```

## 2. Apply migrations locally first

```bash
supabase start
supabase db reset          # applies every migration from scratch
supabase db lint
```

## 3. Secrets

Set these in the Supabase secret store, never in the repository or the browser
bundle:

| Secret | Purpose |
|---|---|
| `VOP_SUPABASE_SECRET_KEY` | `sb_secret_...` key used only inside Edge Functions |
| `VOP_ALLOWED_ORIGINS` | Comma-separated exact origins permitted to call the functions |
| `VOP_THROTTLE_SALT` | Salt for the derived rate-limit key |
| `VOP_UNSUBSCRIBE_SALT` | Salt for hashing unsubscribe tokens |
| `VOP_TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret, if enabled |
| `VOP_ENQUIRY_WEBHOOK_URL` | Internal notification destination, if enabled |

```bash
supabase secrets set VOP_ALLOWED_ORIGINS="https://example.co.za"
```

The browser receives only `VITE_SUPABASE_URL` and
`VITE_SUPABASE_PUBLISHABLE_KEY`. The publishable key begins with
`sb_publishable_`.

## 4. Deploy functions

```bash
supabase functions deploy newsletter-subscribe --no-verify-jwt
supabase functions deploy newsletter-unsubscribe --no-verify-jwt
supabase functions deploy contact-submit --no-verify-jwt
```

## 5. Access checks

Run these as the anonymous role, using the publishable key.

```sql
-- Returns published rows only.
select slug, is_published from public.events;

-- Every one of these must fail or return zero rows.
select * from public.newsletter_subscribers;
select * from public.newsletter_consent_events;
select * from public.contact_enquiries;
select * from public.request_throttle;
insert into public.events (slug, title, event_date) values ('x', 'x', '2026-01-01');
update public.events set title = 'x';
delete from public.events;
```

Draft content must also stay hidden through joins and views:

```sql
update public.news_posts set is_published = false where slug = '<slug>';
-- An anonymous select must now return nothing for that slug.
```

## 6. Edge Function checks

Each of these must be refused:

- `GET` instead of `POST`
- an `Origin` header that is not in `VOP_ALLOWED_ORIGINS`
- a missing or non-JSON `Content-Type`
- a body larger than 8KB
- a malformed or oversized email address
- `marketingConsent` absent or not exactly `true`
- an unrecognised `consentVersion` or `sourcePage`
- an unrecognised enquiry type, artist slug or service slug
- a missing, expired or invalid Turnstile token, once Turnstile is enabled
- more than five submissions from one derived bucket inside the window

Each of these must succeed:

- a valid subscription, returning `{ "ok": true }`
- the same address submitted twice, creating no duplicate row
- a filled honeypot, returning a success-shaped response and writing nothing
- an unsubscribe, followed by a repeat unsubscribe

## 7. Log and secret review

```bash
supabase functions logs newsletter-subscribe
```

Confirm the logs contain a request id and an outcome category only. No raw
email address, message body or Turnstile token may appear. Run an independent
secret scan over the repository and the built bundle.

## 8. Advisors

```bash
supabase inspect db outliers
```

Run the database lint and security advisors. Resolve every finding, or record
the reason an exception is acceptable.

## 9. Backup and rollback

Export the current state before any material schema change, and test the
rollback path on a branch or disposable project before touching production.
