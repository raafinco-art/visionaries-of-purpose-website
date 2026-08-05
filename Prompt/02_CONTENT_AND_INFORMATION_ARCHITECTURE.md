# 02. Content and Information Architecture

## Purpose

This document is the content map for the public website. It turns the supplied folders into one consistent site structure without inventing missing facts, dates, prices, contact details, or claims.

## Source of truth and editorial rules

1. Use approved copy and factual details from the source folders listed below.
2. Use **Visionaries of Purpose** in live HTML. Several supplied images and older notes say **Vissionaries of Purpose**. Keep those image assets unchanged until the owner confirms whether the embedded artwork must be corrected. Where possible, use the symbol-only mark with accessible live text.
3. Never publish brackets, `TBC`, placeholder contact details, guessed artist counts, guessed event times, or buttons without a real destination.
4. Preserve the organisation's faith-led, purposeful and professional voice. Prefer short, direct sentences over advertising filler.
5. Do not use em dashes in visible website copy.
6. Every factual claim needs an owner-approved source. Revalidate event details immediately before launch.

## Top-level folder inventory

| Location | Audited content | Implementation role |
|---|---|---|
| Website root | Six brand/visual boards, typography direction, three font archives and a contact-information copy | Canonical brand and font reference; owner details still require verification |
| `ABOUT` | Hero, mission and vision, founder, 12 values, why-work-with-us and statistics | About-page copy and imagery |
| `ARTISTS` | Collective hero plus Divine Oracle, Given Mohlala, Tetelo M and Tshepiso SK profiles | Artist index and profile content |
| `Contact` | A duplicate contact-information Markdown file | Contact and privacy placeholders only until verified |
| `Events` | Featured-event rules, nine 2026 event sources/posters and a Gig Guide prototype | Home featured pair and full chronological Gig Guide |
| `HOME` | Seven ordered homepage section folders | Home-page copy, images, music, videos and event summaries |
| `Music` | Hero, latest release and discography copies/assets | Music route; duplicates the Home discography and should share canonical production assets |
| `News` | One complete outreach article with three photos and one seven-photo story without copy | Publish the first after final edit; hold the second as draft |
| `Prompt` | Legacy UI guide, old card/navigation snippets, social-link notes and this numbered set | Numbered set is the controlling implementation direction |
| `Services` | Hero, overview and eight service folders with copy, PNG masters and WebP delivery images | Services route and contextual enquiry paths |

Duplicate Markdown and text files were compared during the audit. They are not separate content items and should not produce duplicate pages or database rows.

## Route map

| Route | Purpose | Primary conversion | Main source folders |
|---|---|---|---|
| `/` | Introduce the brand and route visitors quickly | Explore artists or book services | `HOME`, `ARTISTS`, `Music`, `Events` |
| `/about/` | Establish purpose, leadership and credibility | Start an enquiry | `ABOUT` |
| `/artists/` | Present the collective and individual artists | Book an artist | `ARTISTS` |
| `/services/` | Explain the eight production and management services | Request a quote | `Services` |
| `/events/` | Show the complete 2026 gig guide | Get tickets or add to calendar | `Events` |
| `/music/` | Let visitors discover releases and videos | Listen on a chosen platform | `Music`, `HOME/DIV 4`, `HOME/DIV 6`, `HOME/DIV 7` |
| `/news/` | Publish approved stories and updates | Read a story | `News` |
| `/contact/` | Collect booking and general enquiries | Submit enquiry | `Contact` and owner-supplied details |
| `/privacy/` | Explain personal-information processing | Read or exercise a privacy right | `09_PRIVACY_POLICY.md` |
| `/cookies/` | Explain cookies and media-consent choices | Manage consent | `10_COOKIE_POLICY.md` |

The main navigation order is Home, About, Artists, Services, Events, Music, News, Contact. Privacy and Cookies belong in the footer and consent interface.

## Home page composition

Use this order. It intentionally alternates dark, image-led and warm-ivory surfaces to create rhythm.

1. **Hero**, sourced from `HOME/DIV 1`: headline **Where Purpose Meets the Stage.**, supporting copy, **Explore Our Artists** and **Book Our Services**.
2. **Artist collective introduction**, sourced from `HOME/DIV 2`.
3. **Featured artist profiles**, sourced from `HOME/DIV 3` and the `ARTISTS` folder. Use the supplied portrait assets for Divine Oracle, Given Mohlala, Tetelo M and Tshepiso SK.
4. **Latest release**, sourced from `HOME/DIV 4`. Use real album artwork and a platform link, not a fake player.
5. **Upcoming events**, sourced from `HOME/DIV 5` and `Events`. Show exactly two dynamically selected future events. See the event rules below.
6. **Video showcase**, sourced from `HOME/DIV 6`. Show exactly two user-controlled videos with YouTube IDs `IuD23IpalcY` and `xJkMyMZ4jLs`. Do not autoplay.
7. **Discography and streaming links**, sourced from `HOME/DIV 7` and `Music`.
8. **Newsletter invitation**, followed by the global footer.

## About page composition

1. Purpose-led hero.
2. Mission and vision as two complementary panels, not two identical cards.
3. Founder feature for Ronald Makua using the supplied founder imagery and biography.
4. Values: preserve all 12 supplied values, grouped into meaningful themes and presented with an accordion or indexed editorial layout. Do not produce a wall of 12 equal cards.
5. Why work with us.
6. Evidence strip. Proposed source figures include 12+ years, 20+ events and 3 albums. Every figure must be verified before publication. The fourth statistic must remain unpublished until supplied.
7. Contact call to action.

## Artists page composition

Open with a collective statement, then create one substantial profile section per artist:

- Divine Oracle
- Given Mohlala
- Tetelo M
- Tshepiso SK

Each profile may contain an approved portrait, short biography, genres or ministry focus if supplied, selected release or video, social links and a booking call to action. Omit empty fields. Do not infer awards, follower counts, hometowns or discographies.

## Services page composition

Use the hero material in `Services/Div (9)`, followed by these eight services in the supplied order:

1. Event Management, `Services/Div`
2. Artist Bookings and Management, `Services/Div (2)`
3. Live Band Performance, `Services/Div (3)`
4. Sound Production, `Services/Div (4)`
5. Lighting Production, `Services/Div (5)`
6. Stage Supply, `Services/Div (6)`
7. LED Screens, `Services/Div (7)`
8. Backline and PA Hire, `Services/Div (8)`

Alternate image and text alignment on wide screens. On small screens keep the heading, description and call to action ahead of supporting imagery in DOM order. Every service ends in a contextual **Request a quote** action which preselects that service on the contact form.

## Events content model and current source register

This register reflects the supplied files as reviewed on 5 August 2026. It is not permission to invent missing values.

| Date | Event | Artist | Known time | Ticket or registration state |
|---|---|---|---|---|
| 9 Aug 2026 | My Hope Conference | Tshepiso SK | Sessions at 08:00 and 17:30; end times unknown | Free registration stated; URL missing |
| 24 Aug 2026 | Tetelo Worship Night, Venda | Tetelo M | Unknown | No link supplied |
| 28 Aug 2026 | Second Annual Charity Worship Night | Source artwork/copy | 18:00 until late | No link supplied |
| 26 Sep 2026 | Tshepiso Worship Night, Burgersfort | Tshepiso SK | Unknown | No link supplied |
| 3 Oct 2026 | Worship Therapy Season 3 | Given Mohlala | 17:00 | Computicket link and prices supplied |
| 14 Nov 2026 | Grace Renewed | Tshepiso SK | Unknown | Ticket link supplied |
| 28 Nov 2026 | Tetelo Gospel Concert, Rustenburg | Tetelo M | Unknown | No link supplied |
| 23 Dec 2026 | Tetelo M 21st Celebration, Burgersfort | Tetelo M | Unknown | No link supplied |
| 28 Dec 2026 | Tetelo Gospel Festival, Polokwane | Tetelo M | Unknown | No link supplied |

### Event behaviour

- The home page shows no more than two future events. Sort by the earliest valid start date. When equally suitable options exist, balance featured artists rather than repeating one artist.
- The events page shows the full gig guide as an alternating timeline on wide screens and a left-aligned timeline on narrow screens.
- Render **Tickets** or **Register** only when a valid URL exists. Never use `#` as a destination.
- Render **Directions** only when a venue or map URL is known.
- Render **Add to calendar** for every dated event. If time is unknown, generate an all-day calendar event. If an event has multiple known sessions, store each session separately.
- Past events move to an archive automatically and must not appear in the home-page pair.
- Event poster text is supporting information, not the sole source. Repeat the date, event name and location as accessible HTML.

## Music page composition

1. Music hero using real album art.
2. Featured releases.
3. Eight supplied Spotify tracks or albums, represented by cover art and click-to-load embeds or outbound links.
4. Exactly two videos using the IDs listed in the Home section.
5. Platform links for Spotify, Apple Music and YouTube where supplied.

Embedded media must be dormant until the visitor requests it and, where required, accepts media cookies. Always provide a privacy-friendly outbound link as a fallback.

## News content register

### Publishable after final edit

The community outreach story in `News/DIV 1/bLOG STORY 1` contains complete copy and three supplied photographs. Resolve its old broken Markdown paths to these actual files:

- Lead/crowd image: `News/DIV 1/bLOG STORY 1/blog story  (2).png`
- Donations detail: `News/DIV 1/bLOG STORY 1/blog story  (3).png`
- Team image: `News/DIV 1/bLOG STORY 1/blog story  (1).png`

### Hold as draft

`News/DIV 2` contains seven photographs of the family fun walk, medals, Miss Grand South Africa and a poster, but no approved article copy. Do not invent a story from the images. Keep this entry unpublished until headline, body, date, author and captions are approved.

## Contact content

The final public phone number, WhatsApp number, email address, physical or service address, office hours and social profile URLs are not consistently verified in the supplied content. Keep these as launch blockers. `info@visionariesofpurpose.co.za` appears as suggested copy only and must be confirmed before publication.

The form should collect name, email, optional phone, enquiry type, optional artist or service, message and consent acknowledgment. See `04_COMPONENTS_AND_FUNCTIONS.md` and `07_SUPABASE_BACKEND.md`.

## Global footer

Include the live-text organisation name, a brief purpose statement, main navigation, verified social links, confirmed contact details, newsletter form, Privacy Policy, Cookie Information, consent settings and copyright year. Do not show empty social icons.

## Content acceptance checklist

- [ ] Every page has one unique H1 and a useful browser title.
- [ ] All visible claims have an approved source.
- [ ] The organisation spelling is owner-confirmed.
- [ ] Event dates, session times, venue details, prices and ticket URLs are current.
- [ ] Contact and social details are verified.
- [ ] All imagery has contextual alt text or an empty alt attribute when decorative.
- [ ] No placeholder or draft news content is publicly queryable.
- [ ] Legal copy has passed the launch gates in documents 09 and 10.
