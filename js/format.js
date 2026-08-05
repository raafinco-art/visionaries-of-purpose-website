/**
 * Display formatting. Source ISO values are always preserved in the DOM
 * `datetime` attribute; these helpers only produce the visible label.
 */

import { LOCALE, TIMEZONE } from './config.js';

const fullDate = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIMEZONE,
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const shortDate = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIMEZONE,
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const monthYear = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIMEZONE,
  month: 'long',
  year: 'numeric',
});

const dayNumber = new Intl.DateTimeFormat(LOCALE, { timeZone: TIMEZONE, day: '2-digit' });
const monthShort = new Intl.DateTimeFormat(LOCALE, { timeZone: TIMEZONE, month: 'short' });
const yearOnly = new Intl.DateTimeFormat(LOCALE, { timeZone: TIMEZONE, year: 'numeric' });

const timeOnly = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIMEZONE,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

/** A date-only value is anchored at midday UTC so the SAST day never shifts. */
function asDate(value) {
  if (value instanceof Date) return value;
  const text = String(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? new Date(`${text}T12:00:00Z`) : new Date(text);
}

export const formatFullDate = (v) => fullDate.format(asDate(v));
export const formatDate = (v) => shortDate.format(asDate(v));
export const formatMonthYear = (v) => monthYear.format(asDate(v));
export const formatDay = (v) => dayNumber.format(asDate(v));
export const formatMonthShort = (v) => monthShort.format(asDate(v)).replace('.', '').toUpperCase();
export const formatYear = (v) => yearOnly.format(asDate(v));
export const formatTime = (v) => timeOnly.format(asDate(v));

/** `2026-10-03` -> a grouping key that sorts chronologically. */
export const monthKey = (v) => String(v).slice(0, 7);

/** Compares an event date against today in the Johannesburg timezone. */
export function isFuture(isoDate, now = new Date()) {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
  return String(isoDate).slice(0, 10) >= today;
}

/**
 * Builds a srcset from a base path and the widths that were actually
 * generated, so the browser never requests a rendition that does not exist.
 */
export function srcset(base, widths, ext = 'webp') {
  return widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ');
}

export function largest(base, widths, ext = 'webp') {
  return `${base}-${Math.max(...widths)}.${ext}`;
}
