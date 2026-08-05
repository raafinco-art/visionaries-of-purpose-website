# 10. Cookie Information and Consent Specification

> **Draft for owner and legal review. Do not publish until the actual production site has been scanned and every provider is confirmed.** This document describes the intended privacy-first implementation.

**Proposed effective date:** 5 August 2026  
**Proposed consent version:** `cookies-2026-08-05`

## Cookie Information for Visionaries of Purpose

This website uses limited browser storage and similar technologies to provide essential functions, remember your choices and, only when you choose, load media from third-party platforms.

Cookies are small text files stored by a website or service. Similar technologies include local storage, pixels and identifiers used by embedded services. Some related data may be personal information under South Africa's Protection of Personal Information Act.

## Our default position

- Necessary website functions may operate without optional consent.
- No analytics or advertising tracker is planned for the initial launch.
- YouTube, Spotify and Apple media remains a local placeholder until you activate it and the required media choice is present.
- Rejecting optional media must not block access to page copy, event details, artist information, contact information or external privacy-friendly links.
- Consent is granular, reversible and versioned.

## Intended categories

| Category | Purpose | Default | Examples |
|---|---|---|---|
| Strictly necessary | Security, form delivery, load balancing and remembering the consent choice | Active where genuinely required | Consent preference; short-lived security or session controls used by the host |
| Form security | Reduce automated abuse when a person uses a protected form | Load at form interaction where feasible | Cloudflare Turnstile signals and storage, if enabled |
| Optional media | Load video, music or other third-party embedded experiences | Off until chosen | YouTube, Spotify or Apple embedded media |
| Analytics | Measure aggregate website use | Not implemented at launch | None planned |
| Advertising/marketing trackers | Cross-site measurement or targeted advertising | Not implemented | None planned |

Do not hard-code third-party cookie names or expiry periods into the public policy before the production build is scanned. Providers can change their technology. The final register must name the actual provider, purpose, storage item, duration and first- or third-party status.

## Consent interface

The first-visit banner says:

**Your media choices**  
We use necessary technology to run this site. With your permission, we also load music and video from third-party platforms, which may collect information about your visit.

Actions:

- **Accept media**
- **Reject optional**
- **Manage choices**

Accept and reject must have comparable prominence and be keyboard accessible. The settings panel provides one optional **Third-party media** switch and explains each provider. Analytics and advertising switches must not appear unless those categories actually exist.

The footer includes **Cookie settings** so a visitor can change the choice at any time.

## Consent storage

Store only the minimum choice data, for example:

```json
{
  "version": "cookies-2026-08-05",
  "necessary": true,
  "media": false,
  "updatedAt": "2026-08-05T12:00:00.000Z"
}
```

Do not put an email address, contact details or a cross-site identifier in the preference. Use a reasonable expiry chosen after legal review, proposed at six months, and request a fresh choice if purposes or providers materially change.

## Third-party media

Before activation, show local cover art or a local video poster, a short explanation and two options:

- **Load this video/music**, which records or uses the media choice and then contacts the provider; and
- **Open on YouTube/Spotify/Apple Music**, which leaves this website and is governed by that provider.

Do not create a hidden iframe, preconnect, DNS-prefetch or provider JavaScript request before the relevant choice. Use the most privacy-protective embed mode offered by the provider, but do not claim that it eliminates all processing.

## Form security

Cloudflare Turnstile may process limited technical information to distinguish people from automated abuse. Where practical, load it only when a protected form becomes active rather than on every page. Classify it according to the final legal and technical assessment, document it here, and provide an alternative contact route if the security check cannot be completed.

## Changing or clearing a choice

Visitors can reopen **Cookie settings** in the footer. Turning optional media off prevents new third-party embeds from loading and removes locally stored optional consent where practical. A previously loaded provider may have already placed its own storage; visitors can clear site data through browser settings and consult the provider's privacy controls.

## Browser signals

The site should respond consistently to explicit consent controls. If support for recognised browser privacy signals is added, describe the exact behaviour here and test it. Do not claim support for a signal that the implementation does not read.

## Changes and contact

Update this information when a provider, purpose or retention period changes. If the change is material, reset the consent version and request a fresh decision.

Privacy and cookie questions can be sent to: **[OWNER MUST COMPLETE PRIVACY EMAIL]**.

## Implementation checks

- [ ] Run a fresh network and storage scan on every page in a clean browser profile.
- [ ] Confirm no YouTube, Spotify or Apple request occurs before media choice.
- [ ] Confirm no analytics or advertising code is present.
- [ ] Verify banner and settings with keyboard, screen reader, zoom and small screens.
- [ ] Verify rejection is as easy as acceptance and does not block core content.
- [ ] Verify withdrawal prevents future optional loads.
- [ ] Verify consent version changes trigger a new decision.
- [ ] Record actual host, Turnstile and embed storage items and retention.
- [ ] Keep the policy aligned with the data described in `09_PRIVACY_POLICY.md`.
- [ ] Obtain legal review before publication.

## Primary references

- [Protection of Personal Information Act 4 of 2013, South African Government](https://www.gov.za/documents/protection-personal-information-act)
- [Official POPIA Act PDF](https://www.justice.gov.za/legislation/acts/2013-004.pdf)
- [Information Regulator guidance notes](https://inforegulator.org.za/guidance-notes/)

