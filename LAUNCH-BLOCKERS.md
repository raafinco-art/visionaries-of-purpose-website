# Launch blockers

Everything below is unresolved because the supplied material did not contain a
verified answer. Nothing here was guessed, and no placeholder was published in
its place. The site is complete and deployable apart from these items.

Each entry names the exact file to edit.

---

## 1. Organisation identity

| Item | Status | Where it goes |
|---|---|---|
| Legal or registered name | **Missing** | `src/pages/privacy.html` section 1 |
| Registration number, if applicable | **Missing** | `src/pages/privacy.html` section 1 |
| Physical or postal address | **Missing** | `src/pages/privacy.html` section 1 |
| Information Officer | **Missing** | `src/pages/privacy.html` section 1 |

### Brand spelling

Live HTML uses **Visionaries of Purpose**, single s, throughout.

Every supplied logo lockup and several posters read **VISSIONARIES of Purpose**,
double s. Because a logo must not be edited without approval, the header, footer
and Open Graph card use the **symbol-only VP mark** beside live text in the
correct spelling. The wordmark artwork is not used anywhere.

**Decision needed:** confirm the correct legal spelling. If it is the single s,
an approved master of the wordmark is required before the lockup can be used.

---

## 2. Contact details

None of these were verified, so the contact page publishes **no** phone number,
email address, WhatsApp number, address or office hours.

| Item | Status |
|---|---|
| Public phone number | **Missing** |
| WhatsApp number | **Missing** |
| Public email address | **Missing** |
| Privacy email address | **Missing** |
| Physical or service address | **Missing** |
| Office hours | **Missing** |

`info@visionariesofpurpose.co.za` appears in the supplied notes as *suggested
copy only*. It has not been treated as real.

Two numbers and an address appear on supplied artwork. They are recorded here as
candidates only, and were **not** published as organisation contact details:

- Tetelo M event posters: `072 924 5233`, `072 759 4504`, `makuoaronald@gmail.com`

Event-specific enquiry numbers printed on posters **are** published, attached to
their own event, because they are the organiser's published contact for that
event. None of the currently published events carry one, since the two that did
were removed with Given Mohlala.

**To publish:** open `src/pages/contact.html`, follow the instructions in the
`OWNER ACTION REQUIRED` comment, then run `npm run build:pages`.

---

## 3. Social profiles

| Profile | Status |
|---|---|
| Facebook (label) | Published: `facebook.com/profile.php?id=61572428274448` |
| TikTok (label) | **Withheld.** The supplied value `tiktok.com/@visionaries.of.pu` looks truncated and would be a broken link. Confirm the full handle. |
| Instagram, YouTube (label) | Not supplied |
| Artist profiles | Published for Tshepiso SK and Tetelo M. Divine Oracle has none supplied. |

---

## 4. Statistics

Published on `/about/`: **12+** years, **20+** events, **3** albums,
**2** provinces.

**Withheld:** *artists and worship leaders supported*. The source document says
the figure must be verified before publication and supplies no number.

Every published figure still needs owner sign-off with evidence.

---

## 5. Roster change

**Given Mohlala left the label on 5 August 2026** and was removed from the site:
his profile, portraits, social links, booking option, and his two solo live
singles (O Mogologolo, Ehh Kea Dumela).

Two events went with him: Worship Therapy Season 3 on 3 October, which had a
live Computicket link, and the Second Annual Charity Worship Night on 28 August,
where he was one of five artists on Phalane Legacy's poster. **If tickets were
already sold for 3 October, someone should tell the ticket holders**, since the
event is no longer listed here.

Retained on purpose:

- **Matthew 7:7 Kokota** stays, credited "Tetelo M ft Given Mohlala". It is
  Tetelo M's release and the feature credit is accurate on the published record.

**Still showing him:** the home-page collective montage and the artists roster
hero are group photographs that include him, top right in sunglasses. He sits
diagonally opposite Tshepiso SK, so the images cannot be cropped. They need
replacing or re-shooting. **This is unresolved.**

---

## 6. Event data

Recheck all seven events immediately before launch. Currently missing:

| Event | Missing |
|---|---|
| My Hope Conference, 9 Aug | Session end times; free-registration URL, so no register button is rendered |
| Worship Night, Venda, 24 Aug | Start time, venue |
| Worship Night, Burgersfort, 26 Sep | Start time, venue |
| Grace Renewed, 14 Nov | Start time, venue |
| Gospel Concert, Rustenburg, 28 Nov | Start time, venue |
| 21st Celebration, Burgersfort, 23 Dec | Start time, venue |
| Gospel Festival, Polokwane, 28 Dec | Start time, venue |

No map or directions URL exists for any event, so no directions button is
rendered anywhere. Events with an unknown time produce an **all-day** calendar
entry rather than a fabricated midnight start.

The 23 December poster was generated to fill the one genuine gap in the supplied
set. Confirm it is approved for publication.

---

## 7. Music

The supplied track list names **Ngcwelele**. The release artwork reads
**NGCWELE**. The site follows the artwork. Confirm the correct spelling.

Confirm that album artwork and platform screenshots may be used on the website.

---

## 8. News

- **Published:** the Tshepiso SK community outreach story. It carries **no
  publication date**, because none was supplied, and therefore has **no**
  `NewsArticle` structured data. Supply a date to complete both.
- **Held as draft:** the family fun walk story. Seven photographs exist in
  `source-content/News/DIV 1/bLOG STORY 2` with no approved copy. It is not
  published, not linked, and not in the sitemap.

Confirm publication rights and participant permission for every person shown,
with specific approval for any image involving children.

---

## 9. Values themes

The twelve supplied values are published in full, grouped into four themes:
purpose and vision, standard and discipline, faith and character, people and
creativity. The wording of each value is unchanged. **The grouping is a
proposal and needs owner approval.**

---

## 10. Technical configuration

| Item | Status |
|---|---|
| Production domain | **Missing.** Canonical, Open Graph and sitemap URLs are root-relative. Run `npm run set-domain -- https://your-domain.co.za` once confirmed. |
| Hosting provider | **Missing.** Security headers in `README.md` need applying at the host. |
| Supabase development `project_ref` | **Missing.** No Supabase project was contacted during this build. |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` | **Missing.** Forms show a clear unavailable state until set. |
| Email delivery provider and sending domain | **Missing** |
| Double opt-in decision | **Not made.** The success copy currently says "Check your inbox for the next step." If double opt-in is not used, change it to "Thank you. You are subscribed." in `js/newsletter.js`. |
| Cloudflare Turnstile keys | **Missing.** Turnstile is optional in code; origin, honeypot and rate limiting still apply without it. |
| Internal enquiry notification destination | **Missing** |
| Retention periods | **Not set** (privacy policy section 8) |

---

## 11. Legal review

`/privacy/` and `/cookies/` carry `noindex` and are listed in `robots.txt` as
disallowed until review is complete. Both pages display the outstanding items
inline.

Before launch:

1. Resolve every `owner-todo` block on both pages.
2. Obtain a South African privacy-law review.
3. Scan the production site in a clean browser profile and record the actual
   storage items each provider sets.
4. Remove the `noindex` metadata from `src/pages/privacy.html` and
   `src/pages/cookies.html`, delete the two `Disallow` lines from `robots.txt`,
   and rebuild.
