# Vissionaries of Purpose — Featured Upcoming Events  
## Two-Event Layout Specification

## 1. Important Layout Rule

This specific **Featured Upcoming Events** section must display **exactly two upcoming events**, not three.

This rule applies only to the featured-events layout shown in the supplied wireframe.

The coding agent must not:

- Render a third event.
- Create a hidden third slide.
- Reserve empty space for a third event.
- Load three events and only visually hide one.
- Add pagination for three or more featured events.

The section must receive and manage a maximum of **two event objects**.

---

## 2. Event Selection Rule

Select the **two nearest valid upcoming events** according to their starting date.

Recommended artist balance:

1. When both Tshepiso SK and Tetelo M have upcoming events, feature one event from each artist.
2. When only one artist has valid upcoming events, feature the two nearest events from that artist.
3. Do not include an event whose date has already passed.
4. Sort the two selected events from nearest to furthest.
5. Never add a third event to this layout.

Example:

```js
const featuredEvents = allEvents
  .filter((event) => new Date(event.start) >= new Date())
  .sort((a, b) => new Date(a.start) - new Date(b.start))
  .slice(0, 2);
```

Where artist balance is required, apply the balance before the final `.slice(0, 2)`.

---

## 3. Desktop Layout

The section follows the supplied wireframe.

### Outer section

The entire section is placed inside one large bordered or softly raised container.

It contains:

- A full-width heading block at the top.
- A large event-artwork block on the left.
- A details area on the right.
- Action buttons below the details.
- Navigation for switching between the two events.

### Header block

Use the heading:

**FEATURED UPCOMING EVENTS**

The header must span most of the section width and remain visually separate from the content below it.

### Left column

The left column displays the selected event's artwork.

It must include:

- Event poster or promotional image.
- Correct image alt text.
- Optional event number such as `01 / 02`.
- Optional subtle progress indicator.
- No text permanently baked over the image unless it is part of the supplied event poster.

The artwork must update when the visitor changes between Event 1 and Event 2.

### Right column

The right column contains the event information.

Display:

- Event title or theme.
- Featured artist.
- Full date.
- Start time.
- End time where known.
- Venue name.
- Town, city or province.
- A short promotional description.
- Ticket status.
- Event status where relevant.

The right-side content must always correspond to the artwork currently displayed on the left.

---

## 4. Exact Event Details to Display

Each featured event should support the following data:

```text
EVENT TITLE
EVENT THEME
ARTIST NAME
FULL DATE
START TIME
END TIME
VENUE
CITY / PROVINCE
SHORT DESCRIPTION
EVENT ARTWORK
TICKET LINK
MAP / DIRECTIONS LINK
EVENT PAGE LINK
```

Recommended layout:

```text
EVENT THEME OR CATEGORY

Event title
Artist name

Saturday, 12 September 2026
18:00–21:00
Venue name
City, Province

Short event description explaining what the event is,
who is performing and why visitors should attend.
```

Do not place incomplete labels such as `DATE:` or `VENUE:` when the corresponding value is missing.

---

## 5. Details Area Behaviour

The section does not need to open another page before basic information can be read.

The right column must already show the selected event's important information.

A **View Full Details** interaction may be used when the event contains additional information.

Selecting it may open:

- An accessible modal.
- A full-screen drawer.
- A dedicated event page.

The expanded event view may include:

- Full event poster.
- Longer event description.
- Full programme.
- Supporting performers.
- Entry requirements.
- Age restrictions.
- Parking information.
- Contact information.
- Ticket price.
- Ticket provider.
- Directions.
- Add to Calendar.
- Get Tickets where applicable.

---

## 6. Required Buttons

### Add to Calendar

The **Add to Calendar** button must appear for both featured events.

It must use the currently selected event's information.

It must generate a valid `.ics` calendar file containing:

- Event title.
- Start date and time.
- End date and time.
- Venue.
- City.
- Event description.
- Event URL where available.

The file must not contain information from the other featured event.

### Get Tickets / Book Tickets

Use one consistent button label across the section:

**GET TICKETS**

Display this button only when the selected event has a valid ticket link.

```js
ticketsButton.hidden = !activeEvent.ticketUrl;
```

When a ticket link is unavailable:

- Completely remove or hide the button.
- Do not display an inactive button.
- Do not display `Coming Soon` unless that status is confirmed in the event data.
- Do not create a fake ticket link.
- Keep the Add to Calendar button visible.

### View Location

Show **VIEW LOCATION** only when a valid map or directions URL is available.

### View Full Details

Show **VIEW FULL DETAILS** when the event has a dedicated detail page or when a modal is implemented.

---

## 7. Two-Event Navigation

The user must be able to switch between the two featured events.

Recommended options:

- Previous and next arrow buttons.
- Two labelled tabs.
- Two small number indicators: `01` and `02`.
- Swipe gesture on mobile, supported by visible buttons.

Do not use a long carousel for this section.

### Navigation rules

- Event 1 is shown on initial load.
- Selecting Event 2 updates the image, details and buttons together.
- Selecting Event 1 restores its own content.
- The ticket button must be recalculated after every change.
- The calendar button must always use the active event.
- Navigation must stop at two events or loop only between those two events.
- Display an active state so the visitor knows which event is selected.

Example structure:

```html
<div class="featured-event-switcher" aria-label="Choose featured event">
  <button type="button" data-event-index="0" aria-pressed="true">
    01
  </button>

  <button type="button" data-event-index="1" aria-pressed="false">
    02
  </button>
</div>
```

---

## 8. Recommended Data Structure

The featured-events array must contain no more than two objects.

```js
const featuredEvents = [
  {
    id: "featured-event-01",
    slug: "event-title-one",
    title: "Event title",
    theme: "Worship event",
    artist: "Tetelo M",
    start: "2026-09-12T18:00:00+02:00",
    end: "2026-09-12T21:00:00+02:00",
    venue: "Venue name",
    city: "City, Province",
    description: "Short natural promotional event copy.",
    longDescription: "Complete event information for the expanded details view.",
    image: "/assets/events/event-title-one.webp",
    imageAlt: "Promotional poster for Event title featuring Tetelo M",
    ticketUrl: "",
    mapsUrl: "",
    eventUrl: "/events/event-title-one",
    ticketPrice: "",
    ticketStatus: "No ticket link supplied",
    contactPhone: "",
    contactEmail: ""
  },
  {
    id: "featured-event-02",
    slug: "event-title-two",
    title: "Event title",
    theme: "Live gospel performance",
    artist: "Tshepiso SK",
    start: "2026-11-07T17:00:00+02:00",
    end: "2026-11-07T20:00:00+02:00",
    venue: "Venue name",
    city: "City, Province",
    description: "Short natural promotional event copy.",
    longDescription: "Complete event information for the expanded details view.",
    image: "/assets/events/event-title-two.webp",
    imageAlt: "Promotional poster for Event title featuring Tshepiso SK",
    ticketUrl: "https://example.com/tickets",
    mapsUrl: "https://maps.google.com/?q=Venue",
    eventUrl: "/events/event-title-two",
    ticketPrice: "",
    ticketStatus: "Tickets available",
    contactPhone: "",
    contactEmail: ""
  }
];
```

Validation:

```js
if (featuredEvents.length > 2) {
  featuredEvents.length = 2;
}
```

The better implementation is to select only two events before passing the data into the component.

---

## 9. Rendering Logic

Use one active event state.

```js
let activeEventIndex = 0;

function getActiveEvent() {
  return featuredEvents[activeEventIndex];
}

function renderFeaturedEvent() {
  const event = getActiveEvent();

  eventImage.src = event.image;
  eventImage.alt = event.imageAlt || `${event.title} event artwork`;

  eventTitle.textContent = event.title;
  eventTheme.textContent = event.theme || "";
  eventArtist.textContent = event.artist;
  eventDate.textContent = formatEventDate(event.start);
  eventTime.textContent = formatEventTime(event.start, event.end);
  eventVenue.textContent = [event.venue, event.city]
    .filter(Boolean)
    .join(", ");
  eventDescription.textContent = event.description;

  ticketsButton.hidden = !event.ticketUrl;
  locationButton.hidden = !event.mapsUrl;
  detailsButton.hidden = !event.eventUrl && !hasDetailsModal;

  if (event.ticketUrl) {
    ticketsButton.href = event.ticketUrl;
  }

  if (event.mapsUrl) {
    locationButton.href = event.mapsUrl;
  }

  updateActiveNavigation();
}
```

Every visible field and every action must be refreshed whenever the active event changes.

---

## 10. Add-to-Calendar Script

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
  if (!event?.start || !event?.end) return;

  const location = [event.venue, event.city]
    .filter(Boolean)
    .join(", ");

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vissionaries of Purpose//Featured Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@vissionariesofpurpose.co.za`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(event.start)}`,
    `DTEND:${toICSDate(event.end)}`,
    `SUMMARY:${escapeICS(event.title)}`,
    `DESCRIPTION:${escapeICS(event.longDescription || event.description)}`,
    `LOCATION:${escapeICS(location)}`,
    event.eventUrl ? `URL:${escapeICS(event.eventUrl)}` : "",
    "END:VEVENT",
    "END:VCALENDAR"
  ].filter(Boolean).join("\r\n");

  const blob = new Blob([icsContent], {
    type: "text/calendar;charset=utf-8"
  });

  const objectUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");

  downloadLink.href = objectUrl;
  downloadLink.download = `${event.slug || event.id}.ics`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();

  URL.revokeObjectURL(objectUrl);
}

calendarButton.addEventListener("click", () => {
  downloadCalendarEvent(getActiveEvent());
});
```

---

## 11. Image Behaviour

Each of the two events must have its own image.

When switching events:

1. Fade the current image out.
2. Replace the source and alt text.
3. Replace all right-column information.
4. Update the action links.
5. Fade the new image and information in.

Use a restrained transition between `180ms` and `350ms`.

Do not use heavy cinematic animation, excessive zooming or an automatic fast-moving carousel.

The section may auto-rotate only when:

- The visitor has not interacted with the section.
- The delay is at least six seconds.
- Rotation stops when the section is hovered or focused.
- `prefers-reduced-motion` is respected.

Manual navigation is preferred.

---

## 12. Mobile Layout

On smaller screens:

1. Keep the heading at the top.
2. Place the event image first.
3. Place the details below the image.
4. Place navigation below the image or details.
5. Stack action buttons vertically or allow them to wrap.
6. Keep buttons at least `44px` high.
7. Preserve both featured events.
8. Do not turn the section into three cards.
9. Do not hide either event permanently.

---

## 13. Visual Direction

Follow the Vissionaries of Purpose identity:

- Stage Black: `#050505`
- Executive Black: `#0C0A0A`
- Soft White: `#F4F1ED`
- Live Crimson: `#D01F2E`
- Metallic Gold: `#C59A3A`
- Steel Graphite: `#343032`

Design principles:

- Premium minimalism.
- Clean neomorphism.
- Controlled Y2K geometry.
- Strong borders and structured spacing.
- Large event artwork.
- Bold condensed headings.
- Readable supporting type.
- No unnecessary icons.
- No particles.
- No glow effects.
- No visual clutter.

---

## 14. Accessibility

- Navigation controls must be real buttons.
- Use `aria-pressed` or an equivalent active-state attribute.
- Event images require meaningful alt text.
- Ticket links must open safely with `rel="noopener noreferrer"`.
- Keyboard users must be able to switch between both events.
- Visible focus states are required.
- Do not communicate active state through colour alone.
- Expanded event details must be keyboard accessible.
- Modals must close with the `Escape` key and restore focus.

---

## 15. Empty and Partial Data States

### No upcoming events

Hide the complete section or show:

**New event dates will be announced here.**

### Only one valid event

Display the one event without creating a blank second slide.

Hide the two-event navigation.

### Two valid events

Display exactly two events and activate the switching controls.

### More than two valid events

Only the two selected featured events appear in this section.

The remaining events must remain available in the complete Gig Guide or Events page.

---

## 16. Final Acceptance Checklist

- [ ] The section displays a maximum of two featured events.
- [ ] No third featured event is rendered or preloaded.
- [ ] The two events are selected from valid future dates.
- [ ] The nearest event appears first.
- [ ] Event artwork is displayed on the left on desktop.
- [ ] Complete selected-event details appear on the right.
- [ ] Image, text and buttons change together.
- [ ] Add to Calendar works for both events.
- [ ] Get Tickets appears only when a valid ticket link exists.
- [ ] View Location appears only when a valid map link exists.
- [ ] Full details can open in a modal or dedicated page.
- [ ] The layout stacks correctly on mobile.
- [ ] Keyboard and screen-reader behaviour is supported.
- [ ] All other upcoming events remain available on the full Gig Guide page.
