// Astro's content-collection `image()` schema helper (see content.config.ts)
// makes Vite import the *original* source photo as a plain asset module to
// read its metadata, and that import alone makes Vite copy the untouched
// original into dist/_astro/<hash>.<ext> — on top of (separately) the
// actually-used optimized derivatives that getImage()/<Image> generate.
// Nothing in the site ever links to that raw copy (every page goes through
// getImage/<Image>), so for ~38 portfolio photos at 5-28MB each, this was
// silently ~350MB of dead weight in every build, on top of the real ~90MB
// of optimized assets — the likely cause of slow/partial image loads once
// deployed to a shared host with limited space/bandwidth (Altervista).
//
// This prunes any file under dist/_astro that no built HTML/CSS/JS/XML file
// actually references by name, run automatically after `astro build` via
// the `postbuild` script in package.json.
import { readdirSync, readFileSync, statSync, unlinkSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = join(import.meta.dirname, '..', 'dist');
const ASSETS_DIR = join(DIST, '_astro');
const SCAN_EXTS = new Set(['.html', '.css', '.js', '.xml', '.json', '.txt']);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const allFiles = walk(DIST);
const assetFiles = allFiles.filter((f) => f.startsWith(ASSETS_DIR));
const scanFiles = allFiles.filter((f) => SCAN_EXTS.has(extname(f).toLowerCase()));

const haystack = scanFiles.map((f) => readFileSync(f, 'utf8')).join('\n');

let removed = 0;
let freedBytes = 0;
for (const file of assetFiles) {
  const name = file.slice(ASSETS_DIR.length + 1).replace(/\\/g, '/');
  // Filenames with spaces/parens (e.g. "Video Project (1).mp4") show up
  // percent-encoded in href/src attributes, so check both forms.
  if (haystack.includes(name) || haystack.includes(encodeURIComponent(name))) continue;
  freedBytes += statSync(file).size;
  unlinkSync(file);
  removed++;
}

const freedMB = (freedBytes / 1024 / 1024).toFixed(1);
console.log(`[prune-dist-assets] removed ${removed} unreferenced file(s), freed ${freedMB} MB`);
