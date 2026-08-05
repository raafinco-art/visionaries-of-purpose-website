#!/usr/bin/env node
/**
 * Prefixes root-absolute URLs in the built HTML with a base path.
 *
 * The site is authored for a domain root, which is correct for production.
 * A preview served from a subpath (GitHub Pages) needs every URL rewritten.
 * Vite already handles the assets it resolves; this covers what it leaves
 * alone: navigation links, canonical and og:url values, and the manifest.
 *
 * Usage:  node scripts/apply-base-path.mjs /visionaries-of-purpose-website/
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const dist = join(root, 'dist');

let base = process.argv[2];
if (!base) {
  console.error('Usage: node scripts/apply-base-path.mjs /repo-name/');
  process.exit(1);
}

/*
 * Git Bash on Windows rewrites a leading-slash argument into a Windows path,
 * so `/preview/` arrives as `C:/Program Files/Git/preview/`. Refuse it rather
 * than silently rewriting every URL in the site to a local drive path.
 * Prefix the command with MSYS_NO_PATHCONV=1 to avoid the translation.
 */
if (/^[A-Za-z]:/.test(base) || base.includes('Program Files')) {
  console.error(
    `Refusing base "${base}": it looks like a translated Windows path.\n` +
    'Re-run with MSYS_NO_PATHCONV=1, or pass the base without a leading slash.',
  );
  process.exit(1);
}
if (!base.startsWith('/')) base = `/${base}`;
if (!base.endsWith('/')) base = `${base}/`;
if (base === '/') {
  console.log('Base is the domain root. Nothing to rewrite.');
  process.exit(0);
}

function htmlFiles(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, found);
    else if (entry.endsWith('.html')) found.push(full);
  }
  return found;
}

/** Rewrites one URL value, leaving anything already based or external alone. */
function rebase(url) {
  if (!url.startsWith('/')) return url;      // relative, hash, or protocol
  if (url.startsWith('//')) return url;      // protocol-relative
  if (url.startsWith(base)) return url;      // Vite already handled it
  return base + url.slice(1);
}

const ATTRS = /\s(href|src|content)="(\/[^"]*)"/g;
const SRCSET = /\ssrcset="([^"]*)"/g;

let changed = 0;
let rewrites = 0;

for (const file of htmlFiles(dist)) {
  const before = readFileSync(file, 'utf8');

  let after = before.replace(ATTRS, (match, attr, url) => {
    // `content` is only a URL on the og:url and og:image meta tags.
    if (attr === 'content' && !/og:(url|image)/.test(match)) return match;
    const next = rebase(url);
    if (next !== url) rewrites++;
    return ` ${attr}="${next}"`;
  });

  after = after.replace(SRCSET, (match, value) => {
    const next = value
      .split(',')
      .map((part) => {
        const trimmed = part.trim();
        if (!trimmed) return trimmed;
        const [url, ...descriptor] = trimmed.split(/\s+/);
        const rebased = rebase(url);
        if (rebased !== url) rewrites++;
        return [rebased, ...descriptor].join(' ');
      })
      .join(', ');
    return ` srcset="${next}"`;
  });

  if (after !== before) {
    writeFileSync(file, after, 'utf8');
    changed++;
    console.log(`  ${relative(dist, file)}`);
  }
}

console.log(`\nBase "${base}" applied: ${rewrites} URLs across ${changed} files.`);
