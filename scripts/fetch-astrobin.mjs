// Scarica i dati di acquisizione da AstroBin per ogni immagine del portfolio
// e li salva in un unico file JSON (src/data/astrobin.json).
//
// Come funziona:
// 1. Legge tutti i file .md in src/content/portfolio/**/*.md
// 2. Estrae il campo frontmatter `astrobinLink` (es. https://www.astrobin.com/f4cgvr/D/)
// 3. Apre ogni pagina con un browser headless (Playwright) e intercetta la
//    chiamata pubblica che l'app AstroBin stessa fa a
//    /api/v2/images/image/?hash=<id> (nessuna API key richiesta: e' la stessa
//    richiesta che fa il sito quando lo visiti tu).
// 4. Salva i campi utili (equipaggiamento, filtri, sessioni di acquisizione,
//    software) in src/data/astrobin.json, indicizzato per slug del file .md.
//
// Aggiornamento automatico: questo script viene gia' rilanciato da solo a
// ogni `astro dev`/`astro build` (vedi l'integrazione astrobinSync in
// astro.config.mjs). Ogni entry scade da sola dopo CACHE_TTL_MS (24 ore): al
// primo avvio successivo alla scadenza viene ri-scaricata in automatico, cosi'
// le modifiche fatte solo su AstroBin (senza cambiare l'astrobinLink) arrivano
// comunque sul sito entro un giorno, senza bisogno di comandi manuali.
//
// Uso:
//   node scripts/fetch-astrobin.mjs                 # tutte le immagini mancanti o scadute
//   node scripts/fetch-astrobin.mjs --slug cone      # solo un'entry, per test
//   node scripts/fetch-astrobin.mjs --force          # ri-scarica subito, ignorando cache/scadenza

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORTFOLIO_DIR = path.join(ROOT, "src", "content", "portfolio");
const OUTPUT_FILE = path.join(ROOT, "src", "data", "astrobin.json");

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const REQUEST_DELAY_MS = 1500;

// Ogni entry viene ri-scaricata da sola una volta scaduta (oltre al caso in
// cui l'astrobinLink cambia): cosi' i dati restano aggiornati nel tempo anche
// se su AstroBin si modifica solo l'equipaggiamento/le sessioni di una foto
// gia' pubblicata, senza bisogno di rilanciare lo script a mano.
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 ore

const args = process.argv.slice(2);
const onlySlug = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;
const force = args.includes("--force");

function extractFrontmatter(mdText) {
  if (!mdText.startsWith("---")) return {};
  const end = mdText.indexOf("\n---", 3);
  if (end === -1) return {};
  const raw = mdText.slice(3, end);
  const result = {};
  const linkMatch = raw.match(/astrobinLink:\s*"([^"]+)"/);
  if (linkMatch) result.astrobinLink = linkMatch[1];
  return result;
}

function findPortfolioEntries() {
  const entries = [];
  const categories = fs.readdirSync(PORTFOLIO_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const category of categories) {
    const catDir = path.join(PORTFOLIO_DIR, category.name);
    for (const file of fs.readdirSync(catDir)) {
      if (!file.endsWith(".md")) continue;
      const mdPath = path.join(catDir, file);
      const { astrobinLink } = extractFrontmatter(fs.readFileSync(mdPath, "utf-8"));
      if (!astrobinLink) {
        console.log(`  [skip] ${path.relative(ROOT, mdPath)}: nessun astrobinLink`);
        continue;
      }
      // Due formati di link supportati:
      //   https://www.astrobin.com/<hash>/          (link diretto all'immagine)
      //   https://app.astrobin.com/u/<user>?i=<hash> (link di condivisione dal profilo)
      const queryMatch = astrobinLink.match(/[?&]i=([A-Za-z0-9]+)/);
      const pathMatch = astrobinLink.match(/astrobin\.com\/(?!u\/)([A-Za-z0-9]+)\/?/);
      const hash = queryMatch ? queryMatch[1] : pathMatch ? pathMatch[1] : null;
      if (!hash) {
        console.log(`  [skip] ${path.relative(ROOT, mdPath)}: link non riconosciuto (${astrobinLink})`);
        continue;
      }
      const slug = path.basename(file, ".md");
      entries.push({ slug, hash, url: astrobinLink });
    }
  }
  return entries;
}

function simplify(raw) {
  return {
    title: raw.title,
    imagingTelescopes: (raw.imagingTelescopes2 || []).map((t) => `${t.brandName} ${t.name}`),
    imagingCameras: (raw.imagingCameras2 || []).map((c) => `${c.brandName} ${c.name}`),
    mounts: (raw.mounts2 || []).map((m) => `${m.brandName} ${m.name}`),
    accessories: (raw.accessories2 || []).map((a) => `${a.brandName} ${a.name}`),
    software: (raw.software2 || []).map((s) => `${s.brandName} ${s.name}`),
    filters: (raw.filters2 || []).map((f) => `${f.brandName} ${f.name}`),
    guidingTelescopes: (raw.guidingTelescopes2 || []).map((t) => `${t.brandName} ${t.name}`),
    guidingCameras: (raw.guidingCameras2 || []).map((c) => `${c.brandName} ${c.name}`),
    locations: (raw.locationObjects || []).map((l) => ({
      name: l.name,
      city: l.city,
      state: l.state,
      country: l.country,
      latDeg: l.latDeg,
      latSide: l.latSide,
      lonDeg: l.lonDeg,
      lonSide: l.lonSide,
    })),
    solution: raw.solution
      ? {
          ra: raw.solution.ra ? Number(raw.solution.ra) : null,
          dec: raw.solution.dec ? Number(raw.solution.dec) : null,
          pixscale: raw.solution.pixscale ? Number(raw.solution.pixscale) : null,
          radiusDeg: raw.solution.radius ? Number(raw.solution.radius) : null,
        }
      : null,
    deepSkyAcquisitions: (raw.deepSkyAcquisitions || []).map((a) => ({
      filter: a.filter2Brand && a.filter2Name ? `${a.filter2Brand} ${a.filter2Name}` : null,
      date: a.date,
      number: a.number,
      durationSeconds: a.duration ? Number(a.duration) : null,
      gain: a.gain,
      sensorCooling: a.sensorCooling,
      bortle: a.bortle,
    })),
    totalIntegrationSeconds: (raw.deepSkyAcquisitions || []).reduce(
      (sum, a) => sum + (Number(a.duration) || 0) * (a.number || 0),
      0
    ),
    published: raw.published,
    constellation: raw.constellation,
    viewCount: raw.viewCount,
    likeCount: raw.likeCount,
  };
}

// L'entry in cache va ri-scaricata se: non esiste, l'astrobinLink nel .md e'
// cambiato, oppure e' passato piu' di CACHE_TTL_MS dall'ultimo fetch (cache
// senza _fetchedAt, formato vecchio, e' trattata come scaduta).
function isStale(cachedEntry, url) {
  if (!cachedEntry || cachedEntry._sourceUrl !== url) return true;
  if (!cachedEntry._fetchedAt) return true;
  return Date.now() - new Date(cachedEntry._fetchedAt).getTime() > CACHE_TTL_MS;
}

async function fetchImageData(browser, hash, sourceUrl) {
  const page = await browser.newPage({ userAgent: USER_AGENT });
  let apiResult = null;
  page.on("response", async (response) => {
    if (response.url().includes("/api/v2/images/image/") && response.url().includes(`hash=${hash}`)) {
      try {
        const body = await response.json();
        apiResult = body.results ? body.results[0] : body;
      } catch {
        /* not json, ignore */
      }
    }
  });
  try {
    await page.goto(sourceUrl, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(1000);
  } finally {
    await page.close();
  }
  return apiResult;
}

async function main() {
  console.log("Cerco i file portfolio con astrobinLink...");
  let entries = findPortfolioEntries();
  if (onlySlug) {
    entries = entries.filter((e) => e.slug === onlySlug);
    if (entries.length === 0) {
      console.error(`Nessuna entry trovata con slug '${onlySlug}'`);
      process.exit(1);
    }
  }

  // --force forza il ri-scaricamento (vedi sotto), ma la cache esistente va comunque
  // caricata sempre, altrimenti le entry non toccate da questa run andrebbero perse.
  let existing = {};
  if (fs.existsSync(OUTPUT_FILE)) {
    existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf-8"));
  }

  const result = { ...existing };
  const browser = await chromium.launch();

  for (let i = 0; i < entries.length; i++) {
    const { slug, hash, url } = entries[i];
    if (!force && !isStale(existing[slug], url)) {
      console.log(`  [${i + 1}/${entries.length}] ${slug}: gia' in cache e link invariato, salto`);
      continue;
    }
    process.stdout.write(`  [${i + 1}/${entries.length}] ${slug} (${hash})... `);
    try {
      const raw = await fetchImageData(browser, hash, url);
      if (!raw) {
        console.log("ERRORE: nessuna risposta API intercettata");
        continue;
      }
      result[slug] = { ...simplify(raw), _sourceUrl: url, _fetchedAt: new Date().toISOString() };
      console.log("ok");
    } catch (err) {
      console.log(`ERRORE: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, REQUEST_DELAY_MS));
  }

  await browser.close();

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), "utf-8");
  console.log(`\nSalvato ${Object.keys(result).length} entry in ${path.relative(ROOT, OUTPUT_FILE)}`);
}

main();
