# Holdout City

**Gioco free-to-play per Android, web e PC:** guida una squadra di sopravvissuti a riconquistare una città invasa dagli zombie. Sgombera le strade, saccheggia le rovine, tieni le barricate e trasforma il tuo rifugio in una città viva.

- **Stato:** piano v3.0 completato il 20/10/2026. Sviluppo dalla tappa T0 ([ROADMAP](docs/ROADMAP.md)).
- **Sito:** `holdout.magistaf.com` (attivo da T0).

## Il gioco in breve
- **Tre attività d'azione da 2–4 minuti**, tutte disponibili da subito: **Sgombero**, **Saccheggio**, **Barricata**. Sono le scene delle "finte ads" rese giocabili davvero.
- **Il Rifugio:** una città da costruire e potenziare liberamente, con costruzioni istantanee e senza rami esclusivi.
- **Otto eroi** collezionabili, strumenti, produzione passiva, contratti, sfide settimanali, stagioni ogni 6 settimane.
- **Monetizzazione ibrida senza pay-to-win:**
  - pubblicità rewarded facoltative;
  - abbonamento VIP;
  - pass stagionale;
  - pacchetti di risorse;
  - estetica.

  Tutto ciò che dà potenza si ottiene anche giocando; le estrazioni casuali non si vendono mai.

## Tecnologia
TypeScript + Babylon.js (3D web) impacchettato con Capacitor per Google Play; versione web su Cloudflare Pages; Supabase (account, cloud save, classifiche), Firebase (dati d'uso, crash, configurazione remota), AdMob, RevenueCat. Asset 3D CC0 (Quaternius, Kenney, KayKit).

## Documenti

| Documento | Contenuto |
|---|---|
| [docs/GDD.md](docs/GDD.md) | Design completo: requisiti, identità, attività, zombie, eroi, Rifugio, economia, contenuti, interfaccia |
| [docs/MONETIZZAZIONE.md](docs/MONETIZZAZIONE.md) | Tutti i sistemi di ricavo, negozio, prezzi, scenari, regole legali, fonti |
| [docs/TECNICA.md](docs/TECNICA.md) | Stack, architettura, dati, salvataggio e cloud, servizi, prestazioni, test |
| [docs/ASSET.md](docs/ASSET.md) | Pacchetti gratuiti, licenze, distinta per elemento di gioco |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Tappe T0–T8, verifiche, stime, azioni dell'utente, rischi, **stato del lavoro** |
| [docs/LANCIO.md](docs/LANCIO.md) | Nome, sito, store, conformità, marketing, canali, gestione dal vivo |
| [CLAUDE.md](CLAUDE.md) | Istruzioni per le sessioni AI che lavorano su questa repo |
| [archivio/v2/](archivio/v2/) | Piano v2 (Godot, design astratto): superato, consultabile per le tabelle delle missioni |
