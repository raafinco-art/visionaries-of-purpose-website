# 04. Components and Website Functions

## Component contract

Build components as semantic HTML fragments enhanced by CSS and JavaScript modules. Every component must work as readable content before JavaScript loads. Use `data-*` hooks for behaviour and classes for styling.

## Global components

| Component | Required behaviour | Accessibility contract |
|---|---|---|
| Skip link | Appears on keyboard focus and moves focus to `main` | First focusable element |
| Site header | Transparent over hero, gains solid surface after leaving hero | `nav` label, current-page state, no focus trap on desktop |
| Mobile navigation | Opens as a sheet, closes on Escape, close button and link selection | Modal focus management, restores focus to trigger |
| Button/link system | Primary, secondary, text and icon variants | Correct native element, 44px target, visible focus |
| Breadcrumbs | Used on articles and legal pages | Ordered list with `aria-label="Breadcrumb"` |
| Form field | Label, input, help, error and status | `aria-describedby`, `aria-invalid`, no placeholder-only labels |
| Modal/drawer | Event detail and consent settings | Native `dialog` where support is acceptable, focus contained while open |
| Status message | Reports async form result | `role="status"` for success, `role="alert"` for blocking errors |
| Footer | Navigation, verified contact, newsletter, policies | Clear headings and meaningful link labels |
| Consent banner | Necessary-only default with granular media choice | Keyboard accessible, equal visual access to accept and reject |

## Home components

### Hero

- One H1: **Where Purpose Meets the Stage.**
- Supporting paragraph and two actions.
- Real brand imagery with a deliberate focal point.
- No carousel, autoplay video or rotating slogan.
- A compact scroll cue is allowed but must stop under reduced motion.

### Artist roster

- The collective introduction is editorial copy, not a card.
- Artist previews show real portrait, name, short approved descriptor and profile link.
- Use one visually prominent lead profile and supporting entries rather than four identical tiles.

### Latest release

- Cover image, title, artist, release type/date only if supplied, and verified platform links.
- Do not simulate playback unless it controls a real accessible audio source.

### Featured events

- Exactly two future events.
- Selection: valid future dates, ascending, then editorial balance when dates are equally suitable.
- Date, event name and location must be live text.
- Ticket/register button is conditional on a valid URL.
- Add-to-calendar is available on every dated event.
- Empty states: **New dates are being prepared. Follow us or join the newsletter for updates.**

### Video showcase

- Exactly two slides or panels for YouTube IDs `IuD23IpalcY` and `xJkMyMZ4jLs`.
- Manual previous/next controls, slide count, keyboard support and swipe as optional enhancement.
- Load the YouTube iframe only after the visitor activates the video and any required media consent is granted.
- No autoplay and no infinite rotation.

### Discography

- Use supplied cover art and verified Spotify or Apple Music URLs.
- If embedded, use a click-to-load wrapper with a plain outbound-link fallback.

## About components

### Mission and vision

Two visually related but compositionally distinct blocks. Keep paragraphs short and do not split single sentences into decorative fragments.

### Founder feature

Use a real founder photograph, biography and an optional pull quote if it exists in the supplied copy. The portrait alt text names Ronald Makua and describes only relevant visible context.

### Values index

Group all 12 values into owner-approved themes. On narrow screens use an accordion built from buttons controlling labelled regions. On wide screens a vertical index may update an adjacent detail panel. All details remain reachable without pointer hover.

### Evidence strip

Counters may display only verified numbers. Store the full accessible text in HTML and treat animation as optional enhancement.

## Artist components

Each artist profile section supports:

- `name`
- `slug`
- `short_bio`
- `long_bio`
- `portrait`
- `portrait_alt`
- `featured_release_id`, optional
- `featured_video_url`, optional
- verified `social_links`, optional
- booking enquiry URL

The booking URL uses a query string such as `/contact/?type=artist-booking&artist=tetelo-m`. The contact form reads and safely maps only known values.

## Service components

Each service section supports a name, slug, summary, longer description, benefit list, image, image alt and enquiry URL. The contextual action uses `/contact/?type=service&service=lighting-production` or an equivalent known slug.

Do not hide important service copy inside accordions on desktop. A short FAQ can use disclosure controls when supplied later.

## Event components

### Gig-guide timeline

- Group events by month.
- Wide layout alternates around one central rail.
- Narrow layout uses a left rail with content to its right.
- The source order in HTML is chronological in both layouts.
- The timeline marker contains a concise date; full date is also present in text.

### Event detail drawer

It may show poster, artist, title, date, individual sessions, venue, city, description, price, ticket/register action, directions and calendar action. Omit fields that are not supplied.

### Calendar export

- Generate RFC 5545-compatible `.ics` text.
- Timed event: use the event's confirmed timezone, `Africa/Johannesburg` for the supplied South African dates.
- Unknown time: emit an all-day event using `VALUE=DATE`; never default to midnight.
- Multiple sessions: offer one calendar item per session or a clearly labelled combined option.
- Escape commas, semicolons, backslashes and newlines in event text.

## News components

- News index: one featured story followed by a simple chronological list.
- Article: headline, date, author if supplied, lead image, body, inline images with captions and related story links.
- Never render an unpublished article through the public API, sitemap, structured data or preview list.
- Use `Article` or `NewsArticle` structured data only when every required field is accurate.

## Contact form

Fields:

1. Full name, required, maximum 120 characters
2. Email, required, maximum 254 characters
3. Phone, optional, maximum 40 characters
4. Enquiry type, required, from a fixed list
5. Artist or service, conditional and from a fixed list
6. Event date, optional
7. Message, required, maximum 4,000 characters
8. Privacy acknowledgment, required
9. Honeypot, visually hidden and removed from keyboard order
10. Cloudflare Turnstile token, when configured

Submit to a Supabase Edge Function, not directly to a public table. Return a generic reference-safe success message. Rate limit, validate again on the server and do not log raw message bodies.

## Newsletter form

Follow the complete contract in `08_NEWSLETTER_FORM.md`. The reusable component contains an email field, an unambiguous marketing-consent checkbox, links to Privacy and Cookies, honeypot, optional Turnstile and live status.

## Cookie and media components

- On first visit, load necessary functionality only.
- Banner actions: **Accept media**, **Reject optional**, **Manage choices**.
- A media placeholder explains that activating the video or music will contact a third party.
- **Cookie settings** in the footer reopens the choice at any time.
- Store a consent version so changed purposes can trigger a fresh choice.

## Shared state matrix

| State | UI | System behaviour |
|---|---|---|
| Idle | Normal control label | No request |
| Validating | Keep values visible | Client validation assists, server remains authoritative |
| Submitting | Action-specific loading label | Disable duplicate submit, preserve cancel/navigation safety |
| Success | Clear confirmation | Clear sensitive fields only after confirmed server response |
| Recoverable error | Field-level message | Keep valid data and focus first invalid field |
| Network error | Retry guidance | Do not claim success; avoid duplicate records with idempotent server logic |
| Empty content | Helpful editorial empty state | No broken card or blank skeleton |

## JavaScript enhancement map

| Module | Responsibility |
|---|---|
| `navigation.js` | Header surface state and accessible mobile sheet |
| `reveal.js` | One-time, reduced-motion-aware section reveals |
| `carousel.js` | Manual two-video navigation |
| `events.js` | Sorting, filtering and detail drawer |
| `calendar.js` | ICS generation and download |
| `media-consent.js` | Consent state and click-to-load embeds |
| `forms.js` | Shared accessible validation and state handling |
| `newsletter.js` | Newsletter Edge Function call |
| `contact.js` | Contact Edge Function call and safe query prefill |
| `supabase-client.js` | One browser client configured with publishable key only |

