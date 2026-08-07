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

## 2026-08-07 — Fix: colonna destra delle sezioni "Video & Utilities" e "About me" non entrava più da destra

Nelle due sezioni finali di `src/pages/index.astro` (Video & Utilities, About me) entrambe le colonne del grid a due colonne usavano `reveal-left`, quindi la colonna di destra scorreva da sinistra invece che da destra (a differenza delle sezioni Portfolio/Corsi più in alto, che usano correttamente `reveal-left` + `reveal-right`). L'utente se n'è accorto perché l'animazione a scorrimento laterale (sx→dx per i testi a sinistra, dx→sx per quelli a destra) sembrava sparita.

**Perché:** probabile refuso in fase di scrittura del markup: le colonne destre di quelle due sezioni non hanno `text-right`/`items-end` come le prime due (layout diverso, testo comunque allineato a sinistra), il che ha reso più facile copiare `reveal-left` per errore invece di `reveal-right`.

**Come si applica:** la direzione di `reveal-left`/`reveal-right` dipende da dove si trova la colonna nel grid (sinistra/destra), non dall'allineamento del testo al suo interno — non vanno confusi. Se in futuro l'animazione sembra "sparita" solo su alcune sezioni, controllare prima quale classe reveal è applicata a ciascuna colonna in `index.astro`.

## 2026-08-07 — `.reveal`/`.reveal-left`/`.reveal-right` resi ripetibili (replay ad ogni ingresso in viewport)

L'observer in `ScrollReveal.astro` faceva `unobserve` dopo il primo reveal (one-shot): una volta apparso, il testo restava visibile per sempre, anche scrollando via e tornando indietro. L'utente vuole invece che, scrollando verso l'alto (via dalla sezione), il testo si nasconda di nuovo (tornando alla posizione traslata sx/dx con opacity 0) e rianimi da capo quando si rientra nella sezione scrollando in basso.

Cambiato l'observer da "aggiungi `is-visible` una volta e unobserve" a un toggle: `entry.target.classList.toggle('is-visible', entry.isIntersecting)`, senza mai fare unobserve. Stesso pattern già usato per `.mosaic-reveal` (vedi voce sopra). Verificato con test Playwright headless (scroll giù → nascondi scroll su → rianima scroll giù) che il replay funziona.

**Perché:** richiesta esplicita dell'utente di comportamento ripetibile/scroll-driven, non one-shot, per `reveal-left`/`reveal-right` (e di conseguenza anche `.reveal`, condividono lo stesso observer e nessuna pagina usa ancora `.reveal` da sola).

**Come si applica:** questo è ora lo standard per tutte le classi `.reveal*` (tranne `.reveal-hero`, che resta one-shot al primo scroll perché gestisce la hero già visibile al load). Nuovi blocchi con `reveal-left`/`reveal-right` erediteranno automaticamente il comportamento ripetibile.
