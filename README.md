# Visionaries of Purpose website

Semantic multi-page HTML, modular CSS and vanilla JavaScript modules, with
Supabase for published content and form submissions. No frontend framework, no
carousel library, no analytics.

Read `LAUNCH-BLOCKERS.md` before deploying. The site is complete apart from the
owner-supplied details listed there.

## Quick start

```bash
npm install
npm run dev
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server on port 5173 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run build:pages` | Regenerate the HTML pages from `src/` |
| `npm run build:seed` | Regenerate `supabase/seed.sql` from `data/fallback-content.json` |
| `npm run images` | Regenerate `assets/images/` from `source-content/` |
| `npm run check:links` | Verify every internal link, asset and anchor resolves |
| `npm run set-domain -- https://domain.co.za` | Stamp the production domain into canonical, Open Graph and sitemap URLs |

## Structure

```text
index.html, about/, artists/, services/, events/,   generated public pages
music/, news/, contact/, privacy/, cookies/, 404.html
src/layout.html                shared head, header, footer and consent markup
src/pages/*.html               one body fragment per route, with a meta block
css/                           tokens, reset, base, layout, components, utilities, pages
js/                            ES modules, loaded per page by main.js
data/fallback-content.json     reviewed record of published content, dated
assets/                        fonts, icons, images, social card
supabase/                      migrations, Edge Functions, verification steps
scripts/                       build and check tooling
source-content/                owner-supplied copy, photography and posters, unchanged
Prompt/                        the numbered implementation specification
```

### Editing a page

Page bodies live in `src/pages/`. Each starts with a `<!--meta ... meta-->`
block holding its route, output path, navigation key, title and description.
Edit the body, then run `npm run build:pages`.

The header, footer, navigation and consent banner live only in
`src/layout.html`, so they cannot drift apart across pages.

### Do not edit the generated HTML directly

Files such as `about/index.html` are outputs. Changes there are overwritten by
the next `npm run build:pages`.

## Content

Page copy, event details and release data are rendered into the HTML at build
time, so every date, venue, session and ticket link is readable before any
script runs.

`data/fallback-content.json` is the reviewed record of what the site publishes.
It carries a `lastReviewed` date and feeds `supabase/seed.sql`, so the content
tables and the rendered pages cannot drift apart. Change the JSON, then run
`npm run build:seed`.

Supabase remains the source of truth for published content once connected.
Frequently changing data, principally future events, should be read from it at
runtime; the rendered HTML is the reviewed baseline underneath.

## Design system

- **Colour:** the master brand board palette in `css/tokens.css`. Components use
  semantic tokens, never a named brand colour.
- **Type:** Cabinet Grotesk for the brand voice, Barlow Condensed for dates,
  venues and technical metadata, Bodoni Moda for editorial moments. All
  self-hosted as subset WOFF2, licences in `assets/fonts/licences/`.
- **Material:** soft skeuomorphism. Burgundy enamel for primary actions, soft
  graphite for secondary, recessed inputs, warm paper for legal reading, and
  liquid glass restricted to the header, mobile sheet and drawers.
- **Elevation:** at most three levels on a screen. Every inset control keeps a
  visible border and a gold focus ring.

## Progressive enhancement

Core content, navigation, event details and legal text work with JavaScript
disabled:

- Each gig-guide event is a native `<details>` disclosure. JavaScript upgrades
  it into a focus-managed drawer and hides the inline copy only after it has
  successfully taken over.
- Reveal animations fail open: if `IntersectionObserver` never reports, content
  is shown rather than left hidden.
- The values accordion ships expanded and only collapses once it can expand
  again.
- Statistics are authored at their real values; the count is decoration.

## Privacy

No third-party request is made before the visitor asks for one. YouTube,
Spotify and Apple Music each render a local placeholder with an explanation, an
activation button and a plain outbound link. Consent is versioned, expires after
about six months, and is reversible from the footer on every page.

There is no analytics or advertising code anywhere in this repository.

## Environment

The browser receives only:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_TURNSTILE_SITE_KEY     optional
VITE_SITE_ORIGIN            optional
```

The publishable key begins with `sb_publishable_`. Never place an `sb_secret_`
key, `service_role` JWT, database password or management token in the frontend,
the repository or a source map. Server secrets belong in the Supabase secret
store; see `supabase/VERIFICATION.md`.

## Security headers

Configure at the host and tighten against the final integrations:

```text
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none';
  frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests;
  img-src 'self' data:; font-src 'self'; style-src 'self';
  script-src 'self'; connect-src 'self' https://<project>.supabase.co;
  frame-src https://www.youtube-nocookie.com https://open.spotify.com https://embed.music.apple.com
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=()
Cross-Origin-Opener-Policy: same-origin
```

`frame-src` is required only because media embeds load after consent. Add
Turnstile origins only if Turnstile is enabled.

## Source content

`source-content/` holds the owner's original copy, photography and posters
exactly as supplied. It was moved out of the project root because folder names
such as `Services` and `Events` collided with the published routes on
case-insensitive filesystems. No file was renamed, edited or deleted.

`assets/images/asset-manifest.json` records which source file produced each
delivered image.
