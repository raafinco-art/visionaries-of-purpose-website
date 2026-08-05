import { defineConfig } from 'vite';
import { readdirSync, statSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

/**
 * Multi-page build. Every index.html under the project root becomes an entry,
 * so adding a route is a matter of adding a folder. Source content folders
 * supplied by the owner are never treated as routes.
 */
// Owner-supplied material lives in source-content/ and Prompt/. Neither is a
// route, and neither may collide with a published folder name.
const IGNORED = new Set([
  'node_modules', 'dist', 'assets', 'css', 'js', 'data', 'supabase', 'scripts',
  'src', 'source-content', 'Prompt',
]);

function findPages(dir = root, found = {}) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.') || IGNORED.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      findPages(full, found);
    } else if (entry.endsWith('.html')) {
      const rel = relative(root, full).replace(/\\/g, '/');
      const name = rel.replace(/\/?index\.html$/, '').replace(/\.html$/, '') || 'index';
      found[name] = full;
    }
  }
  return found;
}

/**
 * Canonical and og:url values are root-relative until the production domain is
 * confirmed, and several of them point at a directory such as `/about/`. Vite's
 * HTML pass would try to resolve those as assets and fail with EISDIR, so they
 * are hidden behind a placeholder attribute for the duration of the build and
 * restored afterwards. Run `npm run set-domain` to make them absolute.
 */
function preserveDocumentUrls() {
  const CANONICAL = /<link rel="canonical" href="(\/[^"]*)">/g;
  const OG_URL = /<meta property="og:url" content="(\/[^"]*)">/g;

  return {
    name: 'vop-preserve-document-urls',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replace(CANONICAL, '<link rel="canonical" data-vop-canonical="$1">')
          .replace(OG_URL, '<meta property="og:url" data-vop-url="$1">');
      },
    },
  };
}

function restoreDocumentUrls() {
  return {
    name: 'vop-restore-document-urls',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html
          .replace(/<link rel="canonical" data-vop-canonical="([^"]*)">/g, '<link rel="canonical" href="$1">')
          .replace(/<meta property="og:url" data-vop-url="([^"]*)">/g, '<meta property="og:url" content="$1">');
      },
    },
  };
}

export default defineConfig({
  appType: 'mpa',
  plugins: [preserveDocumentUrls(), restoreDocumentUrls()],
  build: {
    target: 'es2022',
    outDir: 'dist',
    emptyOutDir: true,
    // Source maps stay off in production unless the hosting security decision
    // says otherwise. See 12_QA_AND_LAUNCH_CHECKLIST.md section 6.
    sourcemap: false,
    rollupOptions: {
      input: findPages(),
    },
  },
  /*
   * The port is not fixed. Nothing here depends on a particular origin during
   * development: there is no OAuth callback, webhook or hard-coded CORS entry.
   * The Edge Function origin allowlist lives in the Supabase secret store, not
   * in this config. Honour PORT when the harness assigns one.
   */
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
    open: false,
  },
  preview: {
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
});
