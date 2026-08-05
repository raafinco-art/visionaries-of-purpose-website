# Vissionaries of Purpose — 2026 Gig Guide

## 1. Purpose

Create an interactive **2026 Gig Guide** that presents upcoming performances as a visual timeline.

The page must feel like a connected journey rather than a normal event grid:

- A main vertical line runs through the section.
- Smaller branch lines connect the main line to each event block.
- Event blocks alternate between the left and right sides.
- Every block displays the event date and event title/theme.
- Selecting a block opens a focused mini event page.
- The mini page includes event artwork, complete event details and the relevant actions.

Use **vanilla HTML, CSS and JavaScript**. Do not introduce React, GSAP or a framework unless the existing website already depends on one.

---

## 2. Main Page Structure

### Header label

At the top of the section, use a compact year label:

**UPCOMING GIGS · 2026**

Below it, place the main heading:

**Gig Guide**

Optional supporting copy:

> Follow the line through the performances ahead. Select an event to see its full details, save the date or secure your ticket.

### Timeline layout

The desktop layout follows the supplied wireframe:

1. One event block on the upper left.
2. One event block on the upper right.
3. One event block on the middle left.
4. One event block on the lower right.
5. Continue alternating for additional events.

Each event item contains:

- Date
- Event title or theme
- Artist name
- Optional location summary
- A subtle visual indicator showing that it is selectable

The blocks must not all be perfectly aligned. Use a staggered rhythm while preserving a clear chronological reading order.

### Responsive behaviour

On screens below approximately `760px`:

- Move the main timeline line to the left.
- Place every event block on the right of the line.
- Preserve the chronological order.
- Keep all touch targets at least `44px` high.
- Do not remove the branch-line concept.

---

## 3. Event Block Content

Each event block should use the following information:

```text
DATE
EVENT TITLE / THEME
ARTIST
SHORT LOCATION
```

Example structure:

```html
<button class="gig-card" data-event-id="event-01">
  <time class="gig-card__date">12 SEP 2026</time>
  <span class="gig-card__title">Event title</span>
  <span class="gig-card__artist">Artist name</span>
</button>
```

The full card must be clickable, not only the event title.

---

## 4. Mini Event Page

Selecting an event opens a mini page. It may be implemented as either:

- An accessible modal/drawer on the Gig Guide page, or
- A dedicated route such as `/events/event-name`.

For the current implementation, use a modal or full-screen drawer so visitors can return to the timeline without losing their position.

### Mini page content

The mini event page must show:

- Event artwork or poster
- Event title/theme
- Featured artist
- Full date
- Start and end time
- Venue name
- City or area
- Event description
- Ticket information, when applicable
- Directions/location action, when available
- Add to Calendar action
- Close/back action

---

## 5. Button Logic

### Add to Calendar

The **Add to Calendar** button must appear on every valid event.

When selected, it must generate and download an `.ics` calendar file containing:

- Event title
- Start date and time
- End date and time
- Venue
- Description
- Event page URL where available

This allows the event to be added to Apple Calendar, Outlook, Google Calendar and most mobile calendar applications.

### Get Tickets

Show **Get Tickets** only when the event has a working `ticketUrl`.

```js
if (event.ticketUrl) {
  showGetTicketsButton();
} else {
  hideGetTicketsButton();
}
```

Do not show a disabled or empty ticket button when tickets are unavailable.

### View Location

Show **View Location** when a map or directions link exists.

For free events or events without a ticket link, the main actions become:

1. Add to Calendar
2. View Location

---

## 6. Recommended Event Data Structure

All cards and mini pages should be generated from one event data array.

```js
const events = [
  {
    id: "event-01",
    slug: "event-title",
    title: "Event title",
    theme: "Optional event theme",
    artist: "Artist name",
    start: "2026-09-12T18:00:00+02:00",
    end: "2026-09-12T21:00:00+02:00",
    venue: "Venue name",
    city: "City, Province",
    description: "Full event description.",
    image: "/assets/events/event-title.webp",
    ticketUrl: "https://example.com/tickets",
    mapsUrl: "https://maps.google.com/?q=Venue",
    eventUrl: "https://website.co.za/events/event-title"
  }
];
```

Rules:

- Use ISO date values with the South African offset `+02:00`.
- Use `null` or an empty string when no ticket link exists.
- Do not duplicate event details inside the HTML.
- Sort events by the `start` value before rendering.

---

## 7. Calendar Script

Use the following logic to create a universal `.ics` file.

```js
function escapeICS(value = "") {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function toICSDate(isoDate) {
  return new Date(isoDate)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function downloadCalendarEvent(event) {
  const uid = `${event.id}-${Date.now()}@vissionariesofpurpose.co.za`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vissionaries of Purpose//Gig Guide//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(event.start)}`,
    `DTEND:${toICSDate(event.end)}`,
    `SUMMARY:${escapeICS(event.title)}`,
    `DESCRIPTION:${escapeICS(event.description)}`,
    `LOCATION:${escapeICS([event.venue, event.city].filter(Boolean).join(", "))}`,
    event.eventUrl ? `URL:${escapeICS(event.eventUrl)}` : "",
    "END:VEVENT",
    "END:VCALENDAR"
  ].filter(Boolean).join("\r\n");

  const blob = new Blob([ics], {
    type: "text/calendar;charset=utf-8"
  });

  const fileUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = fileUrl;
  link.download = `${event.slug || event.id}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(fileUrl);
}
```

Connect the function to the modal button:

```js
addToCalendarButton.addEventListener("click", () => {
  downloadCalendarEvent(activeEvent);
});
```

---

## 8. Interaction Flow

1. The page loads.
2. Event data is sorted chronologically.
3. JavaScript renders the alternating cards.
4. The connecting line and branches visually link the events.
5. A visitor selects an event block.
6. The mini event page opens.
7. The correct event poster and details are inserted.
8. The script checks whether a ticket URL exists.
9. If a ticket URL exists, **Get Tickets** appears.
10. If no ticket URL exists, **Get Tickets** is completely hidden.
11. **Add to Calendar** remains available.
12. **View Location** appears when a maps link exists.
13. Closing the mini page returns focus to the selected event card.

---

## 9. Visual Direction

Use the Vissionaries of Purpose visual system:

- Background: Stage Black `#050505`
- Primary surface: Executive Black `#0C0A0A`
- Main text: Soft White `#F4F1ED`
- Accent: Live Crimson `#D01F2E`
- Premium detail: Metallic Gold `#C59A3A`
- Supporting line: Steel Graphite `#343032`

Style principles:

- Minimalism
- Clean neomorphism
- Controlled Y2K geometry
- Thin technical timeline lines
- Strong condensed typography
- No unnecessary icons
- No particles, glow or visual clutter
- Use event artwork as the main visual expression inside the mini page

Recommended typography:

- Headings: Impact, Druk Condensed, Knockout or a similar bold condensed face
- Supporting text: a clean readable grotesk
- Dates: uppercase with clear letter spacing

---

## 10. Animation

Use CSS transitions and small JavaScript state changes only.

Recommended motion:

- Branch line grows from the central line as the card enters view.
- Event block rises by `4px` on hover.
- Mini page fades and slides upward.
- Event image reveals with a subtle scale from `1.03` to `1`.
- Respect `prefers-reduced-motion`.

Do not use dramatic cinematic effects.

---

## 11. Accessibility

- Use buttons for selectable event blocks.
- Every event poster must have meaningful alt text.
- Modal must use `role="dialog"` and `aria-modal="true"`.
- Trap focus inside the modal while open.
- Close on `Escape`.
- Restore focus to the selected event block after closing.
- Ensure keyboard users can activate every action.
- Do not rely on colour alone to communicate ticket availability.

---

## 12. Acceptance Checklist

The feature is complete when:

- [ ] Events are generated from one data source.
- [ ] Events are automatically sorted by date.
- [ ] Cards alternate left and right on desktop.
- [ ] A central line branches toward each event.
- [ ] The layout becomes one-column on mobile.
- [ ] Selecting a block opens the correct event details.
- [ ] Event artwork appears in the mini page.
- [ ] Add to Calendar creates a valid `.ics` file.
- [ ] Get Tickets is visible only when a ticket URL exists.
- [ ] View Location is visible only when a map URL exists.
- [ ] The modal is keyboard accessible.
- [ ] The section follows the Vissionaries of Purpose colour and typography direction.
