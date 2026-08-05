# 08. Newsletter Subscription Form

## Purpose

The newsletter form collects explicit consent for Visionaries of Purpose news, artist updates, event announcements and releases. It must be clear, minimal, accessible and resistant to automated abuse.

## Approved interface copy

### Heading

**Stay close to the purpose**

### Supporting copy

Get occasional artist news, event announcements and new releases from Visionaries of Purpose.

### Fields and action

- Email label: **Email address**
- Email help: **We will use this address only for the updates you agree to receive.**
- Consent checkbox: **Yes, I want to receive news, event updates and release announcements by email from Visionaries of Purpose.**
- Legal support: **You can unsubscribe at any time. Read our Privacy Policy and Cookie Information.**
- Button: **Subscribe**

The Privacy Policy and Cookie Information phrases are real links. The consent checkbox is required and never preselected.

## Semantic markup

```html
<form class="newsletter" data-newsletter-form novalidate>
  <div class="form-field">
    <label for="newsletter-email">Email address</label>
    <input
      id="newsletter-email"
      name="email"
      type="email"
      inputmode="email"
      autocomplete="email"
      maxlength="254"
      aria-describedby="newsletter-email-help newsletter-email-error"
      required
    >
    <p id="newsletter-email-help" class="field-help">
      We will use this address only for the updates you agree to receive.
    </p>
    <p id="newsletter-email-error" class="field-error" hidden></p>
  </div>

  <div class="form-check">
    <input
      id="newsletter-consent"
      name="marketingConsent"
      type="checkbox"
      aria-describedby="newsletter-consent-help newsletter-consent-error"
      required
    >
    <label for="newsletter-consent">
      Yes, I want to receive news, event updates and release announcements by email from Visionaries of Purpose.
    </label>
    <p id="newsletter-consent-help">
      You can unsubscribe at any time. Read our
      <a href="/privacy/">Privacy Policy</a> and
      <a href="/cookies/">Cookie Information</a>.
    </p>
    <p id="newsletter-consent-error" class="field-error" hidden></p>
  </div>

  <div class="form-trap" aria-hidden="true">
    <label for="newsletter-company">Leave this field empty</label>
    <input id="newsletter-company" name="company" type="text" tabindex="-1" autocomplete="off">
  </div>

  <div data-turnstile-slot></div>

  <button type="submit">Subscribe</button>
  <p class="form-status" data-newsletter-status role="status" tabindex="-1"></p>
</form>
```

Use JavaScript validation as enhancement only. Server validation is authoritative.

## Submitted payload

```json
{
  "email": "person@example.com",
  "marketingConsent": true,
  "consentVersion": "privacy-2026-08-05",
  "sourcePage": "/",
  "company": "",
  "turnstileToken": "token-from-widget"
}
```

Generate `sourcePage` from a small route allowlist, not an arbitrary referrer. Update `consentVersion` whenever the purposes or policy materially change.

## Client state handling

| Situation | Message |
|---|---|
| Empty or invalid email | **Enter a valid email address.** |
| Consent not selected | **Please confirm that you want to receive these emails.** |
| Bot verification incomplete | **Please complete the security check.** |
| Submitting | Button becomes **Subscribing...** |
| Generic success | **Thank you. Check your inbox for the next step.** |
| Network/server failure | **We could not complete your subscription. Please try again.** |
| Rate limited | **Please wait a moment before trying again.** |

Use the generic success message for new and existing eligible addresses. If double opt-in is not enabled, change the approved success copy to **Thank you. You are subscribed.** and record the owner's decision.

## JavaScript flow

```js
async function submitNewsletter(form) {
  const submitButton = form.querySelector('[type="submit"]');
  const status = form.querySelector('[data-newsletter-status]');
  const data = new FormData(form);

  const payload = {
    email: String(data.get('email') || '').trim(),
    marketingConsent: data.get('marketingConsent') === 'on',
    consentVersion: 'privacy-2026-08-05',
    sourcePage: allowedSourcePage(location.pathname),
    company: String(data.get('company') || ''),
    turnstileToken: currentTurnstileToken()
  };

  submitButton.disabled = true;
  submitButton.textContent = 'Subscribing...';
  status.textContent = '';

  try {
    const { error } = await supabase.functions.invoke('newsletter-subscribe', {
      body: payload
    });
    if (error) throw error;
    form.reset();
    status.textContent = 'Thank you. Check your inbox for the next step.';
    status.focus();
  } catch {
    status.textContent = 'We could not complete your subscription. Please try again.';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Subscribe';
    resetTurnstile();
  }
}
```

The production module must handle field errors, request timeout, Turnstile readiness and cleanup. Do not include the visitor's email in console output or analytics.

## Server contract

Endpoint: Supabase Edge Function `newsletter-subscribe`.

- Method: `POST`
- Content type: `application/json`
- Body limit: small and explicit, for example 8KB
- Origin: exact allowlist
- Email: trim, lower-case, validate, maximum 254 characters
- Consent: must be boolean `true`
- Consent version: must be a recognised server-side value
- Source: must be a recognised route
- Honeypot: must be empty
- Turnstile: verify server-side
- Storage: `newsletter_subscribers` plus `newsletter_consent_events`
- Response: minimal JSON such as `{ "ok": true }`

Do not let the browser insert directly into `newsletter_subscribers`. See `07_SUPABASE_BACKEND.md`.

## Double opt-in and unsubscribe

Double opt-in is recommended because it reduces mistyped addresses and strengthens evidence of consent. The confirmation link must be single-use, expire, avoid exposing the email in the URL and update both the subscriber status and consent event.

Every marketing email must clearly identify Visionaries of Purpose and contain a working one-click or equivalently simple unsubscribe link. Unsubscribe updates status immediately, records the event and suppresses future sends. Do not delete the minimum suppression record if deletion would cause accidental re-subscription; document the legal basis and retention decision in the privacy policy.

## Placement and styling

Use the same component in the home closing section and footer, but keep only one form in the active accessibility tree if both would otherwise appear in the same viewport or duplicated footer composition. On dark surfaces use ivory text, a clearly bordered inset email field and a burgundy raised action. The checkbox must remain native-looking enough to be recognisable and at least 44px in its combined label target.

## Test cases

- [ ] Empty, malformed, international and 254-character email cases
- [ ] Consent unchecked and checked
- [ ] Honeypot populated
- [ ] Missing, expired and invalid Turnstile token
- [ ] Wrong origin and wrong method
- [ ] Offline and request timeout
- [ ] Double click and repeated same-address submission
- [ ] Keyboard-only and screen-reader completion
- [ ] 200% zoom and 320px viewport
- [ ] Successful unsubscribe and repeat unsubscribe
- [ ] No raw email in browser console, function logs or analytics

