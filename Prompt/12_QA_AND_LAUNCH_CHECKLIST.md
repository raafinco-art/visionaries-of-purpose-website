# 12. QA and Launch Checklist

## Launch rule

The site is ready only when every blocking item below passes in production-like staging. A visually complete page with a placeholder, broken consent flow or exposed Supabase table is not launch-ready.

## 1. Content and governance

- [ ] Live HTML uses the owner-confirmed spelling of Visionaries of Purpose.
- [ ] Embedded logo spelling has been explicitly accepted or corrected from an approved master.
- [ ] Phone, WhatsApp, email, address, hours and social URLs are verified.
- [ ] Mission, founder biography, values and service copy match the approved sources.
- [ ] Every public statistic has evidence and an owner sign-off.
- [ ] No `TBC`, placeholder, bracketed owner note, fake link or invented fact remains.
- [ ] The second news story remains unpublished until its full copy and permissions are approved.
- [ ] All visible dates use an unambiguous day-month-year format.

## 2. Events

- [ ] Event dates, names, artists, venues, sessions, prices and URLs were rechecked immediately before launch.
- [ ] Home shows no more than two future events in the specified order.
- [ ] Past events do not appear as upcoming.
- [ ] Ticket/register button is absent when its URL is absent.
- [ ] Directions button is absent when no useful location exists.
- [ ] Unknown-time events create all-day ICS files rather than midnight events.
- [ ] Multi-session events expose each confirmed session correctly.
- [ ] ICS files import correctly into Google Calendar, Apple Calendar and Outlook.
- [ ] Event posters have equivalent live-text details.

## 3. HTML and accessibility

- [ ] Each page has unique title, description, H1 and canonical URL.
- [ ] Page language, landmarks and heading order are correct.
- [ ] Skip link works and visible focus never disappears.
- [ ] All controls are native, named and keyboard operable.
- [ ] Target sizes are at least 44 by 44px where practical.
- [ ] Forms have persistent labels, field errors and a clear status.
- [ ] Dialog focus enters, remains within, closes on Escape and returns to its trigger.
- [ ] Images have suitable alt text or `alt=""`.
- [ ] Colour contrast passes WCAG AA in every state.
- [ ] Page reflows at 200% zoom and has no horizontal scroll at 320px.
- [ ] Screen-reader checks pass with at least NVDA plus Chromium and VoiceOver plus Safari where available.
- [ ] Automated axe checks have no serious or critical violations.

## 4. Visual system

- [ ] Only approved colour and type tokens are used.
- [ ] Cabinet Grotesk, Barlow Condensed and Bodoni Moda are self-hosted in licensed WOFF2 form.
- [ ] No legacy blue/green prompt styling, Impact, Druk, Arial or Inter appears as a design choice.
- [ ] Soft skeuomorphic surfaces retain readable borders and focus states.
- [ ] No screen contains more than three competing elevation levels.
- [ ] Gold and glass remain accents rather than full-page effects.
- [ ] Layouts are checked at 375, 768, 1024 and 1440px.
- [ ] Portraits and posters preserve their intended crops and facial detail.

## 5. Motion and interaction

- [ ] No autoplaying carousel, audio or video exists.
- [ ] Motion uses transform/opacity and remains responsive on mid-range mobile hardware.
- [ ] Reduced-motion preference disables ornamental reveal, counter and tilt effects.
- [ ] No information or action is available only on hover.
- [ ] Video navigation works by pointer, keyboard and touch.
- [ ] Form loading prevents accidental duplicate submission.
- [ ] Focus is not lost after async updates or transitions.

## 6. JavaScript resilience and security

- [ ] Core content and navigation remain useful when JavaScript is disabled or fails.
- [ ] No inline event handlers, `javascript:` links or unsanitised `innerHTML` exist.
- [ ] Query-string prefill accepts only known enquiry, artist and service values.
- [ ] Network errors have useful states and do not erase valid form input.
- [ ] Dependencies are exactly pinned and the lockfile is committed.
- [ ] Production source maps follow the hosting security decision.
- [ ] No secret, database password, raw personal information or management token appears in the repository or bundle.
- [ ] CSP, Referrer Policy, content-type, permissions and framing headers pass a production check.

## 7. Supabase database

- [ ] Work was developed and tested outside production first.
- [ ] Every exposed table has RLS enabled.
- [ ] Anonymous users can read only published public content.
- [ ] Anonymous and authenticated browser roles cannot read or write subscriber and enquiry tables.
- [ ] Content policies omit drafts even through views and joins.
- [ ] Edge Functions use an `sb_secret_` key only from the secret store.
- [ ] Browser code uses only the project URL and `sb_publishable_` key.
- [ ] SQL changes exist as reviewed timestamped migrations.
- [ ] Database lint and security advisors are clean or every exception is documented.
- [ ] Backup and rollback have been tested for material schema changes.
- [ ] Extension migrations do not depend on ignored version pinning.

## 8. Newsletter and contact forms

- [ ] Required fields, maximum lengths and fixed values are enforced on client and server.
- [ ] Newsletter consent is explicit, separate and not preselected.
- [ ] Honeypot, Turnstile and rate limiting work without blocking legitimate use.
- [ ] Wrong origin, wrong method, bad content type and oversized requests are rejected.
- [ ] Repeated newsletter submissions do not create duplicates or reveal membership.
- [ ] Double opt-in matches the approved owner decision and public success copy.
- [ ] Every marketing email identifies the sender and has a working unsubscribe action.
- [ ] Unsubscribe immediately suppresses future marketing and records an audit event.
- [ ] Raw emails and messages are absent from logs and analytics.
- [ ] Contact notifications reach the verified internal recipient without exposing privileged credentials.

## 9. Privacy and cookies

- [ ] All OWNER MUST COMPLETE items in the privacy and cookie drafts are resolved.
- [ ] A qualified reviewer has checked the final notices and operational process.
- [ ] Public notices name the actual responsible party, providers, purposes, rights, transfers and retention.
- [ ] A clean-profile network scan shows no optional media request before consent.
- [ ] No analytics or advertising tracker exists unless it has been deliberately added to the register and consent model.
- [ ] Accept and reject choices have comparable access and prominence.
- [ ] Cookie settings can be reopened and withdrawal takes effect.
- [ ] Consent-version changes request a new choice.
- [ ] Data-access, correction, objection, deletion and complaint workflows have been tested.

## 10. Assets and performance

- [ ] Image publication rights and model permissions are recorded.
- [ ] News images involving community participants or children have specific approval.
- [ ] Production pages use optimised responsive assets, not design-board screenshots.
- [ ] Width, height, `srcset`, `sizes` and lazy-loading attributes match layout.
- [ ] One LCP image at most uses high fetch priority.
- [ ] Font files are subset or loaded economically without breaking language support.
- [ ] Compression preserves skin tone, stage shadow detail and typography.
- [ ] No duplicate discography asset is shipped twice under different URLs.

Suggested mobile performance targets at the 75th percentile:

- Largest Contentful Paint under 2.5 seconds
- Interaction to Next Paint under 200 milliseconds
- Cumulative Layout Shift under 0.1

Use these as diagnostic targets, not as permission to ignore real-device usability.

## 11. SEO and sharing

- [ ] Published routes only appear in the XML sitemap.
- [ ] Draft news and incomplete event records are excluded from search indexing and structured data.
- [ ] Open Graph imagery has safe zones and matches the actual page.
- [ ] Organization, event, artist, music and article structured data validates and contains no invented value.
- [ ] Redirects, trailing-slash convention and 404 page are tested.
- [ ] Social sharing previews are checked on the major platforms used by the organisation.

## 12. Final release procedure

1. Freeze copy and event data for the release candidate.
2. Export and back up the current production state.
3. Apply reviewed migrations to staging, then production through the recorded workflow.
4. Deploy the static frontend with production public configuration only.
5. Run smoke tests for every route, form, ticket link, media gate and calendar action.
6. Run an independent secret scan, accessibility scan, link check and storage/network scan.
7. Obtain content, technical, privacy and owner sign-off.
8. Monitor errors, form delivery and performance after launch without logging personal content.

## Blocking owner inputs

- [ ] Correct organisation/legal identity and brand spelling
- [ ] Verified contact and social details
- [ ] Supabase development project reference and authorised access
- [ ] Production domain and approved preview origins
- [ ] Email provider, sending domain and double opt-in decision
- [ ] Privacy contact, Information Officer, operator and retention decisions
- [ ] Missing event times, venues, registration/ticket links and approvals
- [ ] Final image and participant permissions

