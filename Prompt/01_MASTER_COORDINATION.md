# Visionaries of Purpose Master Coordination

## Design read

Reading this as a mission-led gospel music, artist-management, and live-production website for worship audiences, artists, churches, event organisers, institutions, and brand partners. The visual language is premium, tactile, confident, and human, using controlled dark neumorphism and modern studio-inspired skeuomorphism.

## Design dials

- `DESIGN_VARIANCE: 7` - asymmetric and editorial, but never chaotic
- `MOTION_INTENSITY: 5` - tactile feedback and purposeful reveals, without cinematic delay
- `VISUAL_DENSITY: 4` - spacious marketing pages with compact event and technical metadata

## Product goals

The website must help a visitor do five things quickly:

1. Understand what Visionaries of Purpose does.
2. Discover its artists and music.
3. Find upcoming performances.
4. Enquire about bookings or production services.
5. Subscribe to updates with informed consent.

## Technology contract

- Semantic multi-page HTML
- CSS custom properties and modular style sheets
- Vanilla JavaScript using `type="module"`
- No React, Vue, GSAP, or carousel dependency
- Supabase Postgres for structured content and submissions
- Supabase Edge Functions for public form writes
- `@supabase/supabase-js` pinned to `2.112.0` with the lockfile committed
- Self-hosted fonts and responsive images
- Progressive enhancement: navigation, core copy, legal text, and essential links remain useful if JavaScript fails

## Experience principles

### Purpose before decoration

Every section has a job. Material effects communicate hierarchy, pressability, or containment. Do not place every paragraph in a card or apply glass to every surface.

### Physical, not theatrical

Buttons may look like red enamel or soft-touch studio controls. Inputs may appear recessed. Modals and the mobile menu may use thick liquid-glass treatment. Avoid machine panels, fake switches, excessive knobs, or visual effects that turn a service website into a simulator.

### Real people and real work

Use supplied artist photography, event posters, album art, founder portraits, service imagery, and community photos. Do not substitute generic stock portraits or synthetic artist identities.

### One brand system

Use the approved black, burgundy, crimson, gold, ivory, and graphite palette. Do not import the green card snippet, blue navigation snippet, AI-purple gradients, or unrelated component-library defaults.

### Trust through clarity

Contact details, dates, ticket availability, consent text, form errors, and privacy choices must be direct and easy to verify. Missing information is hidden or labelled as pending internally, never invented for the public page.

## Global information architecture

Primary routes:

| Route | Purpose |
|---|---|
| `/` | Brand proposition, artists, music, events, and conversion paths |
| `/artists/` | Artist roster |
| `/artists/divine-oracle/` | Divine Oracle profile |
| `/artists/given-mohlala/` | Given Mohlala profile |
| `/artists/tetelo-m/` | Tetelo M profile |
| `/artists/tshepiso-sk/` | Tshepiso SK profile |
| `/music/` | Latest releases, videos, and discography |
| `/services/` | Eight booking and production services |
| `/events/` | Two featured events plus the complete Gig Guide |
| `/news/` | Published community and organisation stories |
| `/news/tshepiso-sk-community-outreach/` | Completed outreach article |
| `/about/` | Mission, founder, values, reasons to work together, and verified impact |
| `/contact/` | Contact details, WhatsApp, enquiry form, and newsletter |
| `/privacy/` | Privacy policy |
| `/cookies/` | Cookie policy and consent settings |

Use lowercase, hyphenated file and URL names. Preserve a route once published.

## Primary navigation

Desktop order:

1. Home
2. About
3. Artists
4. Services
5. Events
6. Music
7. News
8. Contact

At widths where the eight-item navigation cannot remain on one line, switch to the mobile menu. Do not wrap the desktop navigation.

## Page composition rules

- Each page has one `h1`.
- The hero fits within the initial viewport on common laptop and mobile sizes.
- Hero copy contains at most: one optional label, headline, short supporting sentence, and one primary plus one secondary action.
- Use no more than one small uppercase eyebrow per three sections.
- Do not repeat the same layout family in consecutive sections more than twice.
- Use split layouts, editorial full-width sections, alternating media, timeline structures, and selective asymmetric grids to create rhythm.
- Use cards only where elevation clarifies a selectable or grouped object.
- Legal and long-form news pages prioritize reading measure over visual effects.

## Conversion hierarchy

Global primary actions:

- Explore Our Artists
- Book Our Services
- Send Enquiry
- Get Tickets, only when a verified ticket URL exists
- Subscribe

Use one label for each intent. Do not alternate between "Contact Us", "Let's Talk", "Start Something", and "Get in Touch" for the same action.

## Content governance

- Supabase is the source of truth for published artists, events, releases, services, and news metadata.
- Long editorial copy may begin in Markdown, but published records must carry a stable slug, status, updated timestamp, and source attribution.
- Every event action is data-driven. Ticket and location buttons are absent when their URLs are absent.
- Past events automatically leave upcoming views but remain available to an archive if approved.
- The website must never treat an image poster as the only source of event details. Dates, times, venue, price, and accessibility information also appear as HTML text.

## Delivery phases

### Phase 1: foundation

Resolve brand spelling and owner details. Extract fonts. Establish folders, tokens, global HTML, navigation, footer, consent manager, and Supabase development connection.

### Phase 2: core pages

Build Home, Artists, Music, Services, Events, About, and Contact using the supplied content and assets.

### Phase 3: backend and forms

Create migrations, RLS, content seed data, newsletter function, contact-enquiry function, validation, consent logging, and abuse protection.

### Phase 4: legal and privacy

Resolve policy placeholders, implement click-to-load third-party media, publish privacy and cookie pages, and verify withdrawal paths.

### Phase 5: verification

Run accessibility, responsive, performance, content, event-date, form, legal, and Supabase security checks. Use the final checklist as the launch gate.

## Non-goals

- No user accounts in the first release
- No public admin dashboard
- No custom audio streaming service
- No automatic event or video carousel
- No speculative ticketing integration
- No analytics or marketing trackers until the owner selects them and the cookie policy is updated
- No production database operations through an unscoped MCP connection
