# 11. Asset and Image Direction

## Audit result

The supplied project already has a strong visual library: real artist portraits, founder images, event posters, album art, community-outreach photography, brand direction boards and dedicated service imagery. Use those assets before generating anything new.

One clear production gap was found: the 23 December 2026 Tetelo M 21st Celebration in Burgersfort had no poster. A new supporting poster was generated and saved in both archival PNG and web-ready WebP form.

## Canonical visual references

- Root brand boards: `ChatGPT Image Aug 5, 2026, 01_25_28 AM.png` through `ChatGPT Image Aug 5, 2026, 01_26_34 AM.png`
- Typography direction: `vissionaries-of-purpose-website-typography-system.md`
- Cabinet Grotesk source: `CabinetGrotesk_Complete.zip`
- Barlow Condensed and Bodoni Moda sources: `Barlow_Condensed,Bodoni_Moda.zip` and the duplicate `(1)` archive

Treat the root boards and page layout screenshots named `visionaries-of-purpose-...png` as internal design references, not as public page screenshots or content images.

## Page asset map

### Home

- Hero candidate: `HOME/DIV 1 HERO/hero Picture.png`
- Hero layout reference only: `HOME/DIV 1 HERO/Layout.png`
- Collective and artist imagery: `HOME/DIV 2/*.png` and `HOME/DIV 3/*.png`
- Latest release artwork: `HOME/DIV 4/My life depends on you Lord.png`
- Discography covers: `HOME/DIV 7/*.png`, excluding the layout reference

### About

- Hero candidates: `ABOUT/Div 1(Hero )/ChatGPT Image Aug 3, 2026, 06_19_34 PM.png`
- Founder imagery: the five `ChatGPT Image...png` files in `ABOUT/Div 3Founder`
- Mission, values, why-work-with-us and stats `visionaries-of-purpose-...png` files are layout references, not content photography.

### Artists

- Divine Oracle: `ARTISTS/Divine Oracle/c6c1e34a-b6fe-4038-bd33-03aeb6d49e7e.png`
- Given Mohlala: `ARTISTS/Given Mohlala/given mohlala.png`
- Tetelo M: `ARTISTS/Tetelo M/ChatGPT Image Aug 3, 2026, 11_58_21 PM.png`
- Tshepiso SK: `ARTISTS/Tshepiso Sk/ChatGPT Image Aug 4, 2026, 12_10_22 AM.png`

The `visionaries-of-purpose-...png` file in each artist folder is a composition reference.

### Services

Prefer the supplied `*-web.webp` files in these folders:

- Event Management: `Services/Div/generated-event-management-web.webp`
- Artist Bookings and Management: `Services/Div (2)/generated-artist-bookings-web.webp`
- Live Band Performance: the three contextual WebP files in `Services/Div (3)`
- Sound Production: `Services/Div (4)/generated-sound-production-web.webp`
- Lighting Production: `Services/Div (5)/generated-lighting-production-web.webp`
- Stage Supply: `Services/Div (6)/generated-stage-supply-web.webp`
- LED Screens: both contextual WebP files in `Services/Div (7)`
- Backline and PA Hire: `Services/Div (8)/generated-backline-pa-hire-web.webp`
- Services hero: `Services/Div (9)/generated-services-hero-web.webp`
- Overview fallback: `Services/generated-services-overview.jpg`

### Events

Use the supplied posters in `Events/Gig Guide 2026`. Keep event details as live HTML because poster text alone is not accessible.

Newly generated 23 December poster:

- Master PNG: `Events/Gig Guide 2026/tetelo-m-21st-celebration-burgersfort-2026.png`
- Web delivery: `Events/Gig Guide 2026/tetelo-m-21st-celebration-burgersfort-2026.webp`

The PNG is 1024 by 1536. The WebP was exported at quality 88. Preserve the portrait's identity and do not use image editing to alter the artist's face.

### Music

- Hero candidate: `Music/Div 1 Hero/b82841df-f534-4f08-b141-8a5333623d60.png`
- Latest release art: `Music/Div2 Lattest Music Reslease/*.png`, excluding the layout reference
- Discography covers: `Music/Div 3 Discography/*.png`, excluding the layout reference

The Home and Music discography files are duplicates. Create one optimised canonical production asset for each release and reference it from both routes.

### News

For the community outreach article:

- Lead/crowd: `News/DIV 1/bLOG STORY 1/blog story  (2).png`
- Donations: `News/DIV 1/bLOG STORY 1/blog story  (3).png`
- Team: `News/DIV 1/bLOG STORY 1/blog story  (1).png`

The article's existing Markdown image paths are broken; use the mapping above.

The seven JPG files in `News/DIV 1/bLOG STORY 2` are reserved for a future family-fun-walk story. Do not publish them without approved copy, captions, image consent and a publication date.

## Generated-poster record

- Generation mode: built-in ImageGen
- Source references: the supplied Tetelo M portrait plus existing 2026 gospel-event poster references
- Purpose: fill the single missing 23 December 2026 gig-guide poster
- Final prompt direction: create a premium vertical South African gospel event poster in the established Visionaries of Purpose language; preserve Tetelo M's identity; use a black and oxblood stage atmosphere, warm gold hardware, sculpted dimensional typography and subtle worship-light details; include only the exact text **TETELO M**, **21ST CELEBRATION**, **23 DECEMBER 2026**, **BURGERSFORT**; no extra logos, sponsors, prices, contact details or invented venue.

## Production naming

Copy approved assets into `assets/images/` using lower-case kebab-case names:

```text
assets/images/<section>/<subject>-<context>-<width>.<format>
```

Examples:

```text
assets/images/artists/tetelo-m-portrait-960.webp
assets/images/events/worship-therapy-season-3-poster-768.webp
assets/images/services/lighting-production-1440.webp
```

Do not rename or delete the source files during initial implementation. Keep a mapping file or content record so provenance remains clear.

## Crops and ratios

| Use | Preferred ratio | Notes |
|---|---|---|
| Home hero | 16:10 or art-directed 4:5 mobile crop | Protect faces and text-safe area |
| Artist portrait | 4:5 | Avoid cutting hands or instruments when meaningful |
| Event poster | 2:3 | Preserve full poster; do not crop text |
| Release artwork | 1:1 | Preserve original square artwork |
| News lead | 16:9 or 3:2 | Documentary crop, no artificial background replacement |
| Service editorial image | 4:3 or 3:2 | Show real production context |
| Open Graph image | 1.91:1 | Create separate, minimal live-text-equivalent artwork |

## Alt-text rules

- Describe the image's purpose in context, not every visible detail.
- Name an artist when identity is relevant and confirmed.
- Do not repeat adjacent heading text verbatim.
- Use `alt=""` for decorative texture, shadow, duplicated marks or images already fully described next to them.
- For posters, provide a concise visual description while repeating all actionable details in live HTML.
- News captions should identify people only when names and permission are confirmed.

## Optimisation

- Keep a lossless or high-quality master outside the web delivery path.
- Export AVIF and WebP where visual testing confirms acceptable quality.
- Strip unnecessary metadata but preserve required rights information.
- Generate only widths smaller than or equal to the source.
- Set intrinsic dimensions and `srcset`/`sizes`.
- Lazy-load below-the-fold imagery; never lazy-load the LCP hero.
- Test dark skin tones, burgundy fabrics and stage blacks for banding or crushed detail after compression.

## Rights and brand checks

- [ ] Confirm publication rights and model consent for every artist, founder, attendee and child shown.
- [ ] Confirm the organisation spelling before editing or regenerating the embedded wordmark.
- [ ] Confirm album art and platform screenshots may be used on the website.
- [ ] Keep font licence/readme files with the source package.
- [ ] Do not use supplied wireframes as if they were photographs or final pages.
- [ ] Do not invent sponsors, venues, prices or artist credentials in generated artwork.

