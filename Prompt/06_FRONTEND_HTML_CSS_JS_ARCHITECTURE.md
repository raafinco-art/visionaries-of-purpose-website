# 06. Frontend HTML, CSS and JavaScript Architecture

## Technical boundary

The public frontend is standards-based HTML, CSS and JavaScript. A lightweight build tool may bundle modules, optimise assets and inject public environment values, but the delivered experience must not depend on a frontend framework.

Use progressive enhancement: navigation, content, links and policy pages remain useful when JavaScript fails. JavaScript adds drawers, filtering, consent-gated media, form submission and small motion effects.

## Proposed project structure

```text
WEBSITE/
├── index.html
├── about/index.html
├── artists/index.html
├── services/index.html
├── events/index.html
├── music/index.html
├── news/index.html
├── news/<story-slug>/index.html
├── contact/index.html
├── privacy/index.html
├── cookies/index.html
├── assets/
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   └── social/
├── css/
│   ├── tokens.css
│   ├── reset.css
│   ├── fonts.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── utilities.css
│   └── pages/
├── js/
│   ├── main.js
│   ├── config.js
│   ├── supabase-client.js
│   ├── navigation.js
│   ├── reveal.js
│   ├── carousel.js
│   ├── events.js
│   ├── calendar.js
│   ├── media-consent.js
│   ├── forms.js
│   ├── newsletter.js
│   └── contact.js
├── data/
│   └── fallback-content.json
├── supabase/
│   ├── config.toml
│   ├── migrations/
│   └── functions/
│       ├── newsletter-subscribe/
│       ├── newsletter-unsubscribe/
│       └── contact-submit/
└── Prompt/
```

The source folders currently contain reference copy and imagery. During implementation, copy approved assets into predictable production paths under `assets/`; do not make browsers depend on spaces, inconsistent casing or source-document folder names.

## HTML conventions

- Declare language with `<html lang="en-ZA">` unless a page has another approved language.
- Use one `<header>`, one `<main id="main-content">` and one `<footer>`.
- Use one page H1 and properly nested H2/H3 headings.
- Use `<button>` for actions and `<a>` for navigation.
- Use `<time datetime="2026-10-03T17:00:00+02:00">` for known times and date-only ISO values for all-day events.
- Use native `<form>`, `<label>`, `<fieldset>` and `<legend>` structures.
- Add width and height attributes to images to reserve layout space.
- Prefer `<picture>` with AVIF or WebP and an appropriate fallback.
- Load scripts as modules with `type="module"` and `defer` semantics.
- No inline event handlers and no `javascript:` links.

## CSS layers

Load CSS in an explicit order:

```css
@layer reset, tokens, base, layout, components, utilities, pages, overrides;
```

- `tokens.css`: colour, spacing, typography, radius, elevation and motion variables.
- `reset.css`: small modern reset that preserves useful native behaviour.
- `base.css`: document typography, links, media, focus and selection.
- `layout.css`: containers, grids, stack/cluster utilities and section rhythm.
- `components.css`: reusable controls and content components.
- `pages/`: only page-specific composition.
- `utilities.css`: a small, documented set such as visually hidden or flow spacing.

Avoid deeply nested selectors, ID selectors for presentation and `!important` except targeted accessibility overrides. Container queries may improve components, but baseline responsive behaviour must still work without them.

## Font loading

Self-host licensed WOFF2 files. Use `font-display: swap` and narrow unicode ranges only if correctly generated. Preload only the most important Cabinet Grotesk file used above the fold. Do not preload every weight.

```css
@font-face {
  font-family: "Cabinet Grotesk";
  src: url("/assets/fonts/cabinet-grotesk-variable.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

Convert or source licensed WOFF2 builds for Barlow Condensed and Bodoni Moda before launch. Keep fallbacks metric-compatible where practical to limit layout shift.

## JavaScript boundaries

- One entry module discovers components by `data-*` attributes.
- Modules export small initialisers and clean up observers or event listeners where necessary.
- Parse query parameters through allowlists before prefilling a form.
- Use `AbortController` for cancelable fetches and component teardown.
- Use `Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg' })` for display, while preserving source ISO values.
- Do not insert untrusted content with `innerHTML`. Prefer `textContent`, templates or a proven sanitizer when rich text is unavoidable.
- Do not store consent, contact data or newsletter email addresses in analytics events or browser logs.

## Supabase browser client

At the time of this audit, the current npm release of `@supabase/supabase-js` is `2.112.0`. Pin the exact version and commit the lockfile:

```powershell
npm install --save-exact @supabase/supabase-js@2.112.0
```

Recheck the current release and changelog at implementation time. Browser configuration contains only:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

The publishable key normally begins with `sb_publishable_`. Never expose an `sb_secret_` key, `service_role` JWT, database password or management token in HTML, JavaScript, source maps, deployment logs or the repository.

## Content loading strategy

Use server-rendered or build-time HTML for core page copy when possible. Supabase supplies frequently changing content such as future events, published news and releases. If a public content request fails:

- retain the page shell and navigation;
- show a clear, quiet unavailable state;
- do not silently show stale ticket prices;
- a controlled build-time fallback may be used only with its last-reviewed date.

## Media and privacy

YouTube, Spotify and Apple media must not initialise on initial page load. Render a local poster or album cover and an activation button. After optional media consent, replace the placeholder with the third-party iframe or open the platform link. See `10_COOKIE_POLICY.md`.

## Security headers

Configure these at the host and refine the Content Security Policy against the final integrations:

```text
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=()
Cross-Origin-Opener-Policy: same-origin
```

Add explicit `connect-src`, `frame-src`, `img-src`, `font-src` and `script-src` origins only when a verified feature requires them. Avoid `unsafe-inline`. If Turnstile or embeds require broader directives, document each exception.

## Search and sharing metadata

Every public route needs:

- unique title and meta description;
- canonical URL using the confirmed production domain;
- Open Graph title, description, image and URL;
- social image with readable safe-zone content;
- favicon and web manifest using the correct symbol mark;
- sitemap containing published routes only;
- `robots.txt` that does not expose private paths;
- `Organization`, `Event`, `MusicGroup`, `MusicAlbum` or `NewsArticle` structured data only when accurate.

Unpublished news and incomplete events must not appear in the sitemap or structured data.

## Image delivery

- Use AVIF or WebP where supported, with a high-quality fallback when necessary.
- Generate responsive widths such as 480, 768, 1024, 1440 and 1920 only when the source supports them.
- Use `sizes` that matches the actual layout.
- Eager-load the primary hero image only; lazy-load below-the-fold images.
- Use `fetchpriority="high"` on at most the single true Largest Contentful Paint image.
- Preserve subject focal points with deliberate `object-position` values.

## Build and deployment checks

Suggested scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest run",
    "test:a11y": "playwright test tests/accessibility.spec.js"
  }
}
```

The exact tooling can change, but the outcomes cannot: valid HTML, scoped CSS, testable modules, pinned dependencies, optimised assets, no secret in the bundle and repeatable production output.

