# Log delle sessioni

Cronologia sintetica, una riga (o poche) per sessione. Dettagli vanno negli altri file collegati.

- **2026-08-07**: Creato il second brain ([index.md](index.md), [progetto.md](progetto.md), [decisioni.md](decisioni.md), [preferenze.md](preferenze.md)). Nessun altro lavoro svolto in questa sessione.
- **2026-08-07**: Implementata animazione reveal-on-scroll orizzontale per i testi della homepage (hero nascosta finché non si scrolla, testo a sinistra entra da sinistra, testo a destra entra da destra). Vedi [decisioni.md](decisioni.md).
- **2026-08-07**: Rallentata l'animazione a mosaico del video "Customised online courses" e resa scroll-driven/ripetibile (riparte ogni volta che si esce e si rientra nel viewport). Vedi [decisioni.md](decisioni.md).
- **2026-08-07**: Fixato bug in `index.astro`: le colonne destre delle sezioni "Video & Utilities" e "About me" avevano `reveal-left` invece di `reveal-right`, per cui l'animazione dx→sx era sparita solo lì. Vedi [decisioni.md](decisioni.md).
- **2026-08-07**: Resa ripetibile l'animazione `.reveal-left`/`.reveal-right` (e `.reveal`): non più one-shot, ora si nasconde scrollando via e rianima ogni volta che rientra in viewport. Verificato con test Playwright headless. Vedi [decisioni.md](decisioni.md).
