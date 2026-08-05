#!/usr/bin/env node
/**
 * Stamps the confirmed production domain into the canonical URLs, Open Graph
 * URLs, sitemap and robots file.
 *
 * Root-relative values are used until the domain is confirmed, because the
 * sitemap protocol and most social scrapers require absolute URLs and a
 * guessed domain would be worse than none.
 *
 * Usage:
 *   node scripts/set-domain.js https://visionariesofpurpose.co.za
 *   node scripts/set-domain.js https://example.co.za --check
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const [, , rawOrigin, ...flags] = process.argv;
const checkOnly = flags.includes('--check');

if (!rawOrigin) {
  console.error('Usage: node scripts/set-domain.js https://your-domain.co.za [--check]');
  process.exit(1);
}

let origin;
try {
  const url = new URL(rawOrigin);
  if (url.protocol !== 'https:') throw new Error('The production origin must use https.');
  origin = url.origin;
} catch (error) {
  console.error(`Invalid origin: ${error.message}`);
  process.exit(1);
}

const SKIP = new Set([
  'node_modules', 'dist', '.git', 'src', 'scripts', 'supabase', 'assets', 'css', 'js', 'data',
  'source-content', 'Prompt', '.claude',
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

let changed = 0;

function rewrite(file, transform) {
  const before = readFileSync(file, 'utf8');
  const after = transform(before);
  if (before === after) return;
  changed += 1;
  console.log(`  ${relative(root, file)}`);
  if (!checkOnly) writeFileSync(file, after, 'utf8');
}

console.log(`${checkOnly ? 'Would update' : 'Updating'} to ${origin}\n`);

for (const file of htmlFiles()) {
  rewrite(file, (html) =>
    html
      .replace(/(<link rel="canonical" href=")(\/[^"]*)"/g, `$1${origin}$2"`)
      .replace(/(<meta property="og:url" content=")(\/[^"]*)"/g, `$1${origin}$2"`)
      .replace(/(<meta property="og:image" content=")(\/[^"]*)"/g, `$1${origin}$2"`)
      .replace(/("logo":\s*")(\/[^"]*)"/g, `$1${origin}$2"`),
  );
}

// The layout is the source the pages are generated from, so keep it in step.
rewrite(join(root, 'src/layout.html'), (html) =>
  html
    .replace(/(<meta property="og:image" content=")(\/[^"]*)"/g, `$1${origin}$2"`),
);

rewrite(join(root, 'sitemap.xml'), (xml) =>
  xml.replace(/(<loc>)(\/[^<]*)(<\/loc>)/g, `$1${origin}$2$3`),
);

rewrite(join(root, 'robots.txt'), (txt) =>
  txt.replace(
    /# Sitemap: add the absolute URL once the production domain is confirmed\.\n# Run `npm run set-domain -- https:\/\/your-domain\.co\.za` to stamp it in\.\n/,
    `Sitemap: ${origin}/sitemap.xml\n`,
  ),
);

console.log(`\n${changed} file${changed === 1 ? '' : 's'} ${checkOnly ? 'would change' : 'updated'}.`);
if (changed === 0) console.log('Nothing to do. The domain may already be set.');
