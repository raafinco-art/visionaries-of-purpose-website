#!/usr/bin/env node
/**
 * Verifies that every internal link, image, stylesheet and script resolves to a
 * file that exists, and that no in-page anchor points at a missing id.
 *
 * Deliberately offline: external URLs are listed for a manual check rather than
 * requested, so running this never contacts a third party.
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, relative, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

const SKIP = new Set([
  'node_modules', 'dist', '.git', 'src', 'scripts', 'supabase', '.claude',
  'source-content', 'Prompt',
]);

function htmlFiles(dir = root, found = []) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.') || SKIP.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, found);
    else if (entry.endsWith('.html')) found.push(full);
  }
  return found;
}

/** Maps a site path to the file that would serve it. */
function resolvePath(sitePath) {
  const clean = decodeURIComponent(sitePath.split('?')[0]);
  const candidates = clean.endsWith('/')
    ? [join(root, clean, 'index.html')]
    : [join(root, clean), join(root, `${clean}.html`), join(root, clean, 'index.html')];
  return candidates.find((candidate) => existsSync(candidate));
}

const pages = htmlFiles();
const problems = [];
const external = new Set();

// Collect the ids each page defines so cross-page anchors can be checked.
const idsByPage = new Map();
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const route = `/${relative(root, file).replace(/\\/g, '/')}`.replace(/index\.html$/, '');
  idsByPage.set(route, ids);
}

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const label = relative(root, file).replace(/\\/g, '/');

  const refs = [
    ...[...html.matchAll(/\shref="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrc="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/srcset="([^"]+)"/g)]
      .flatMap((m) => m[1].split(',').map((part) => part.trim().split(/\s+/)[0])),
  ].filter(Boolean);

  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) {
      if (ref.startsWith('http')) external.add(ref);
      continue;
    }

    if (ref.startsWith('#')) {
      const ids = idsByPage.get(`/${label}`.replace(/index\.html$/, '')) ?? new Set();
      if (ref.length > 1 && !ids.has(ref.slice(1))) {
        problems.push(`${label}: missing anchor target ${ref}`);
      }
      continue;
    }

    if (!ref.startsWith('/')) {
      problems.push(`${label}: relative reference is not root-anchored: ${ref}`);
      continue;
    }

    const [pathPart, hash] = ref.split('#');
    const target = resolvePath(pathPart);
    if (!target) {
      problems.push(`${label}: missing target ${pathPart}`);
      continue;
    }

    if (hash) {
      const route = `/${relative(root, target).replace(/\\/g, '/')}`.replace(/index\.html$/, '');
      const ids = idsByPage.get(route);
      if (ids && !ids.has(hash)) {
        problems.push(`${label}: ${pathPart} has no anchor #${hash}`);
      }
    }
  }
}

console.log(`Checked ${pages.length} pages.`);

if (problems.length) {
  console.error(`\n${problems.length} problem${problems.length === 1 ? '' : 's'}:\n`);
  for (const problem of problems) console.error(`  ${problem}`);
} else {
  console.log('All internal references resolve.');
}

console.log(`\n${external.size} external destinations to verify manually before launch:`);
for (const url of [...external].sort()) console.log(`  ${url}`);

process.exit(problems.length ? 1 : 0);
