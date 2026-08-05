# Visionaries of Purpose Website Prompt Set

## Purpose

This folder is the ordered implementation contract for the Visionaries of Purpose website. It consolidates the supplied copy, wireframes, brand boards, images, fonts, event rules, UI references, and the existing Gig Guide prototype into one build direction.

The intended frontend is semantic HTML, modular CSS, and vanilla JavaScript using ES modules. Supabase is the backend for published content and form submissions.

## Read and build in this order

1. `00_IMPLEMENTATION_ORDER.md` - precedence, decisions, and reading order
2. `01_MASTER_COORDINATION.md` - global product and build direction
3. `02_CONTENT_AND_INFORMATION_ARCHITECTURE.md` - routes and source-content mapping
4. `03_UI_UX_MATERIAL_SYSTEM.md` - neumorphic and skeuomorphic design system
5. `04_COMPONENTS_AND_FUNCTIONS.md` - component contracts and behavior
6. `05_ANIMATION_AND_INTERACTION.md` - motion rules and reduced-motion behavior
7. `06_FRONTEND_HTML_CSS_JS_ARCHITECTURE.md` - file structure and frontend engineering rules
8. `07_SUPABASE_BACKEND.md` - database, RLS, Edge Functions, and MCP workflow
9. `08_NEWSLETTER_FORM.md` - newsletter markup, validation, consent, and submission states
10. `09_PRIVACY_POLICY.md` - publishable privacy-policy draft
11. `10_COOKIE_POLICY.md` - cookie and third-party-media consent draft
12. `11_ASSET_AND_IMAGE_DIRECTION.md` - exact asset usage, optimization, and missing-image decisions
13. `12_QA_AND_LAUNCH_CHECKLIST.md` - final acceptance gates

## Precedence

When two source documents conflict, use this order:

1. The numbered files in this prompt set
2. Verified business facts supplied by the owner
3. The master colour and typography boards in the website root
4. `Vissionaries_of_Purpose_Neomorphic_Skeuomorphic_UI_Guide.md`
5. Page-specific Markdown and text files
6. Layout wireframe images
7. The Gig Guide prototype
8. Old CSS snippets in `cards.txt` and `navigation.txt`

The old Uiverse snippets are references only. Do not copy them into production because their green and blue palette, extreme 3D rotation, invalid transforms, and inconsistent component rules conflict with the brand system.

## Audit summary

- 171 original files were inspected.
- All 16 Markdown files were read. Duplicate copies were identified by hash.
- All 29 text files were read. Duplicate discography and event files were identified.
- The Gig Guide HTML prototype was reviewed in full.
- All 122 original images were visually reviewed and their dimensions catalogued.
- All three font archives were inspected.
- One genuinely missing event poster was generated and saved as:
  - `Events/Gig Guide 2026/tetelo-m-21st-celebration-burgersfort-2026.png`
  - `Events/Gig Guide 2026/tetelo-m-21st-celebration-burgersfort-2026.webp`

## Canonical assumptions

- Use **Visionaries of Purpose** in live HTML text because this is the spelling in the project name and the current user instruction.
- Existing artwork frequently contains **Vissionaries of Purpose**. Use the mark-only logo where possible until the owner confirms whether the double-s spelling is intentional.
- Do not edit a logo, poster, or artist identity without approval.
- Use South African English and the `Africa/Johannesburg` timezone.
- Do not invent contact details, event times, registration URLs, ticket URLs, venue details, statistics, biographies, or testimonials.

## Required owner confirmations before launch

1. Final legal spelling of the business name and domain.
2. Official phone, WhatsApp number, public email, privacy email, and physical or postal address.
3. Legal entity name and registration number, if applicable.
4. Information Officer or privacy contact.
5. The fourth About-page statistic and verification of every published statistic.
6. Missing event times, end times, venue details, registration links, and map links.
7. Whether the News folder's second photo story is approved for publication and its final article copy.
8. Newsletter sender address, sending provider, and retention periods.
9. Supabase development-project reference.
10. Hosting provider and final production domain.

## Supabase MCP status

No Supabase MCP tools were exposed in this task session, and no project-scoped `.mcp.json` exists in the workspace. No unknown or production Supabase project was modified.

Before implementation, connect the MCP server to a non-production development project using a project-scoped URL. Start in read-only mode, authenticate through OAuth, and only enable database or function writes after reviewing each action. See `07_SUPABASE_BACKEND.md`.

## Definition of done

The website is not complete until every item in `12_QA_AND_LAUNCH_CHECKLIST.md` passes and every bracketed placeholder in the legal, contact, event, and backend documents is resolved.
