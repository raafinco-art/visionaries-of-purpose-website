/**
 * RFC 5545 calendar export.
 *
 * Rules that matter here:
 *   - a known start time produces a timed event in Africa/Johannesburg;
 *   - an unknown time produces an all-day event using VALUE=DATE, never
 *     a fabricated midnight start;
 *   - an unknown end time is omitted rather than invented;
 *   - each confirmed session becomes its own VEVENT.
 */

import { CALENDAR_PRODID, CALENDAR_UID_DOMAIN } from './config.js';

/** Escapes the characters RFC 5545 reserves inside a TEXT value. */
function escapeText(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\r|\n/g, '\\n');
}

/** Folds a content line to 75 octets, continuing with a single space. */
function fold(line) {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;

  const out = [];
  let current = '';
  let bytes = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    // Continuation lines carry a leading space, so their budget is 74.
    const limit = out.length === 0 ? 75 : 74;
    if (bytes + size > limit) {
      out.push(current);
      current = char;
      bytes = size;
    } else {
      current += char;
      bytes += size;
    }
  }
  if (current) out.push(current);
  return out.map((part, index) => (index === 0 ? part : ` ${part}`)).join('\r\n');
}

function toUtcStamp(value) {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

/** `2026-11-24` -> `20261124` */
function toDateValue(isoDate) {
  return String(isoDate).slice(0, 10).replace(/-/g, '');
}

/** DTEND for an all-day event is exclusive, so it is the following day. */
function nextDateValue(isoDate) {
  const date = new Date(`${String(isoDate).slice(0, 10)}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10).replace(/-/g, '');
}

function locationOf(event) {
  return [event.venue, event.city].filter(Boolean).join(', ');
}

function descriptionOf(event, session) {
  const parts = [];
  if (Array.isArray(event.longDescription) && event.longDescription.length) {
    parts.push(event.longDescription.join('\n\n'));
  } else if (event.description) {
    parts.push(event.description);
  }
  if (session?.label) parts.push(`Session: ${session.label}`);
  if (event.endTimeLabel) parts.push(`Ends: ${event.endTimeLabel}`);
  else if (session && !session.end) parts.push('The end time has not been published.');
  if (event.admission) parts.push(event.admission);
  if (Array.isArray(event.entranceRequirements) && event.entranceRequirements.length) {
    parts.push(`Entrance contribution: ${event.entranceRequirements.join(', ')}`);
  }
  if (event.ticketUrl) parts.push(`Tickets: ${event.ticketUrl}`);
  return parts.join('\n\n');
}

function vevent({ uid, stamp, start, end, allDay, summary, description, location, url }) {
  const lines = [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
  ];

  if (allDay) {
    lines.push(`DTSTART;VALUE=DATE:${start}`);
    lines.push(`DTEND;VALUE=DATE:${end}`);
  } else {
    lines.push(`DTSTART:${start}`);
    // An unknown end time is left out rather than guessed.
    if (end) lines.push(`DTEND:${end}`);
  }

  lines.push(`SUMMARY:${escapeText(summary)}`);
  if (description) lines.push(`DESCRIPTION:${escapeText(description)}`);
  if (location) lines.push(`LOCATION:${escapeText(location)}`);
  if (url) lines.push(`URL:${escapeText(url)}`);
  lines.push('END:VEVENT');
  return lines;
}

/**
 * Builds the .ics text for one event. Multi-session events produce one
 * VEVENT per confirmed session inside a single calendar file.
 */
export function buildIcs(event, { eventUrl } = {}) {
  const stamp = toUtcStamp(new Date());
  const location = locationOf(event);
  const summaryBase = event.artists?.length
    ? `${event.title} - ${event.artists[0]}`
    : event.title;

  const body = [];
  const sessions = Array.isArray(event.sessions) ? event.sessions : [];

  if (!event.isAllDay && sessions.length) {
    sessions.forEach((session, index) => {
      body.push(...vevent({
        uid: `${event.slug}-${index + 1}@${CALENDAR_UID_DOMAIN}`,
        stamp,
        start: toUtcStamp(session.start),
        end: session.end ? toUtcStamp(session.end) : null,
        allDay: false,
        summary: session.label && sessions.length > 1
          ? `${summaryBase} (${session.label})`
          : summaryBase,
        description: descriptionOf(event, session),
        location,
        url: eventUrl,
      }));
    });
  } else {
    body.push(...vevent({
      uid: `${event.slug}@${CALENDAR_UID_DOMAIN}`,
      stamp,
      start: toDateValue(event.date),
      end: nextDateValue(event.date),
      allDay: true,
      summary: summaryBase,
      description: descriptionOf(event),
      location,
      url: eventUrl,
    }));
  }

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${CALENDAR_PRODID}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...body,
    'END:VCALENDAR',
  ];

  return `${lines.map(fold).join('\r\n')}\r\n`;
}

/** Generates and downloads the calendar file for one event. */
export function downloadIcs(event, options = {}) {
  const text = buildIcs(event, options);
  const blob = new Blob([text], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.slug || 'event'}.ics`;
  document.body.append(link);
  link.click();
  link.remove();
  // Give the browser a tick to start the download before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
