# Decisioni

Decisioni tecniche/architetturali prese nel tempo, con motivazione.

## 2026-08-07 — Introdotto il "second brain"
Creata la cartella `second-brain/` con file .md collegati tra loro per mantenere memoria persistente del lavoro su questo progetto, letta a inizio chat e aggiornata a fine chat.

**Perché:** l'utente vuole che io ricordi il contesto del lavoro fatto insieme in questa cartella, oltre alla memoria di sistema esterna al progetto.

**Come si applica:** vedi [index.md](index.md) per il funzionamento; questa istruzione è anche richiamata in `CLAUDE.md` per essere seguita automaticamente in ogni sessione futura.

## 2026-08-07 — Sistema di reveal-on-scroll con direzione orizzontale per il testo

Esisteva già un sistema `.reveal` (fade + slide verticale) gestito da `ScrollReveal.astro` via `IntersectionObserver`, applicato a sezioni sotto la hero. Aggiunte due nuove classi `.reveal-left`/`.reveal-right` in `src/styles/global.css` (slide orizzontale da sinistra o da destra) e usate al posto di `.reveal` su tutti i blocchi di testo allineati rispettivamente a sinistra/destra in `src/pages/index.astro`.

Il titolo hero ("Valerio Avitabile" / "Astrophotography") è già visibile nel viewport al caricamento della pagina, quindi l'`IntersectionObserver` standard lo avrebbe rivelato subito invece che al primo scroll. Per questo ha una classe extra `.reveal-hero`: `ScrollReveal.astro` la esclude dall'observer e la rivela invece al primo evento di `scroll` della pagina (listener one-shot).

**Perché:** l'utente vuole che il testo della hero sia invisibile all'apertura della pagina e appaia solo quando l'utente inizia a scrollare, con logica di entrata coerente con l'allineamento (testo a sinistra entra da sinistra, testo a destra entra da destra).

**Come si applica:** per nuovi blocchi di testo con animazione in ingresso, usare `reveal-left`/`reveal-right` invece di `reveal` in base all'allineamento; per elementi già visibili al load che devono aspettare il primo scroll, aggiungere anche `reveal-hero`.

**Aggiornamento 2026-08-07:** l'utente ha chiesto di NON applicare questa animazione al titolo hero della home ("Valerio Avitabile" / "Astrophotography"): rimosse le classi `reveal-hero reveal-left` da quell'h1/p in `src/pages/index.astro`, che restano sempre visibili come prima. Il meccanismo `.reveal-hero` in `ScrollReveal.astro` resta comunque disponibile per un eventuale uso futuro altrove.

## 2026-08-07 — Animazione mosaico del video "Customised online courses" resa più lenta e ripetibile

Il video hero della sezione corsi (`.mosaic-reveal` + `.mosaic-tiles` in `src/pages/index.astro`, logica in `setupMosaic()` dentro `ScrollReveal.astro`) usava tile che si scoprivano una tantum (via `IntersectionObserver` con `unobserve` dopo il primo reveal), transizione 0.5s e delay casuale fino a 550ms.

Cambiato:
- `.mosaic-tile` transition da `0.5s` a `1.2s` ([global.css](../src/styles/global.css)).
- `maxDelay` in `setupMosaic()` da 550ms a 900ms.
- L'observer non fa più `unobserve`: resta attivo e su ogni uscita dal viewport (`!entry.isIntersecting`) richiama `hide()`, che rimuove `is-visible`, rimette in pausa/reset il video e rigenera i delay casuali dei tile, cosicché rientrando in vista l'animazione riparte sempre da capo.

**Perché:** l'utente voleva l'effetto a mosaico più lento e scroll-driven (ripetibile ogni volta che si scrolla via e si torna sulla sezione), non più un reveal one-shot.

**Come si applica:** per altre sezioni con `.mosaic-reveal`, questo comportamento (replay ad ogni ingresso in viewport) è ora lo standard; se in futuro serve un reveal one-shot altrove, va gestito con una variante dedicata invece di modificare questo meccanismo condiviso.
