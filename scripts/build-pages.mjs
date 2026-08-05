/**
 * Composes the public HTML pages from one shared layout plus a body fragment
 * per route.
 *
 * The site itself stays plain multi-page HTML with no framework and no client
 * runtime; this only removes the risk of the header, footer and consent banner
 * drifting apart across eleven files.
 *
 * Each page lives in src/pages/<name>.html and starts with a JSON block:
 *
 *   <!--meta
 *   { "route": "/about/", "out": "about/index.html", "nav": "about",
 *     "title": "...", "description": "..." }
 *   meta-->
 *
 * Run with:  node scripts/build-pages.mjs
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const layout = readFileSync(join(root, 'src/layout.html'), 'utf8');
const pagesDir = join(root, 'src/pages');

const NAV_KEYS = ['home', 'about', 'artists', 'services', 'events', 'music', 'news', 'contact'];

function parsePage(source) {
  const match = source.match(/^<!--meta\s*([\s\S]*?)\s*meta-->\s*/);
  if (!match) throw new Error('Page is missing its <!--meta ... meta--> block');
  const meta = JSON.parse(match[1]);
  return { meta, body: source.slice(match[0].length) };
}

function indent(html, spaces = 4) {
  const pad = ' '.repeat(spaces);
  return html
    .split('\n')
    .map((line) => (line.trim() ? pad + line : line))
    .join('\n')
    .replace(/\s+$/, '');
}

let built = 0;

for (const file of readdirSync(pagesDir).sort()) {
  if (!file.endsWith('.html')) continue;

  const { meta, body } = parsePage(readFileSync(join(pagesDir, file), 'utf8'));

  let html = layout
    .replaceAll('{{title}}', meta.title)
    .replaceAll('{{description}}', meta.description)
    .replaceAll('{{route}}', meta.route)
    .replaceAll('{{ogTitle}}', meta.ogTitle ?? meta.title)
    .replaceAll('{{ogType}}', meta.ogType ?? 'website')
    .replaceAll('{{bodyClass}}', meta.bodyClass ? ` class="${meta.bodyClass}"` : '')
    .replaceAll('{{robots}}', meta.noindex ? '  <meta name="robots" content="noindex, follow">\n' : '')
    .replaceAll(
      '{{structuredData}}',
      meta.structuredData
        ? `\n  <script type="application/ld+json">\n${JSON.stringify(meta.structuredData, null, 2)
            .split('\n')
            .map((l) => `  ${l}`)
            .join('\n')}\n  </script>\n`
        : '',
    )
    .replace('{{body}}', indent(body));

  for (const key of NAV_KEYS) {
    html = html.replaceAll(`{{current:${key}}}`, meta.nav === key ? ' aria-current="page"' : '');
  }

  const leftover = html.match(/\{\{[^}]+\}\}/);
  if (leftover) throw new Error(`${file}: unresolved placeholder ${leftover[0]}`);

  const out = join(root, meta.out);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html, 'utf8');
  built += 1;
  console.log(`  ${meta.out.padEnd(38)} ${meta.route}`);
}

console.log(`\n${built} pages built.`);
