/**
 * Public configuration. Only values that are safe in a browser bundle.
 *
 * Never place an sb_secret_ key, service_role JWT, database password or
 * management token in this file or anywhere else the browser can reach.
 */

const env = import.meta.env ?? {};

export const SUPABASE_URL = env.VITE_SUPABASE_URL ?? '';
export const SUPABASE_PUBLISHABLE_KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY ?? '';
export const TURNSTILE_SITE_KEY = env.VITE_TURNSTILE_SITE_KEY ?? '';

/** Set once the owner confirms the production domain. */
export const SITE_ORIGIN = env.VITE_SITE_ORIGIN ?? '';

export const TIMEZONE = 'Africa/Johannesburg';
export const LOCALE = 'en-ZA';

/** Bump when the purposes described in the privacy policy materially change. */
export const CONSENT_VERSION = 'cookies-2026-08-05';
export const PRIVACY_CONSENT_VERSION = 'privacy-2026-08-05';
export const CONSENT_STORAGE_KEY = 'vop.consent';

/** Consent lasts six months, then a fresh choice is requested. */
export const CONSENT_MAX_AGE_DAYS = 182;

/**
 * Routes allowed as a newsletter `sourcePage`. Generated from an allowlist
 * rather than an arbitrary referrer so the value cannot be poisoned.
 */
export const SOURCE_PAGE_ALLOWLIST = Object.freeze([
  '/',
  '/about/',
  '/artists/',
  '/services/',
  '/events/',
  '/music/',
  '/news/',
  '/contact/',
  '/privacy/',
  '/cookies/',
]);

/** Fixed enquiry types. The Edge Function validates against the same list. */
export const ENQUIRY_TYPES = Object.freeze([
  'artist-booking',
  'service',
  'event-production',
  'partnership',
  'media',
  'general',
]);

export const ARTIST_SLUGS = Object.freeze([
  'tshepiso-sk',
  'tetelo-m',
  'given-mohlala',
  'divine-oracle',
]);

export const SERVICE_SLUGS = Object.freeze([
  'event-management',
  'artist-bookings',
  'live-band-performance',
  'sound-production',
  'lighting-production',
  'stage-supply',
  'led-screens',
  'backline-pa-hire',
]);

/** Third-party media origins. Nothing here is contacted before consent. */
export const MEDIA_PROVIDERS = Object.freeze({
  youtube: {
    name: 'YouTube',
    embed: (id) => `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0`,
    watch: (id) => `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`,
  },
  spotify: {
    name: 'Spotify',
    embed: (id) => `https://open.spotify.com/embed/track/${encodeURIComponent(id)}`,
    watch: (id) => `https://open.spotify.com/track/${encodeURIComponent(id)}`,
  },
  apple: {
    name: 'Apple Music',
    embed: (id) => `https://embed.music.apple.com/us/song/${encodeURIComponent(id)}`,
    watch: (id) => `https://music.apple.com/us/song/${encodeURIComponent(id)}`,
  },
});

export const CALENDAR_PRODID = '-//Visionaries of Purpose//Gig Guide//EN';
export const CALENDAR_UID_DOMAIN = 'visionariesofpurpose.co.za';
