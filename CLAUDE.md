# Istruzioni per le sessioni AI — Holdout City

## Prima di iniziare
1. `git pull`, `git log --oneline -15`, `git status`, `git worktree list`.
2. Leggi [docs/ROADMAP.md](docs/ROADMAP.md) §8 (stato) e la tappa in corso.
3. Apri solo i documenti che servono alla tappa: GDD per le regole, TECNICA per l'implementazione, MONETIZZAZIONE per negozio e annunci, ASSET per i modelli, LANCIO per store e sito.

## Regole
- **Il design canonico è nei documenti `docs/`.** Non inventare regole nel codice. Se manca qualcosa, aggiorna prima il documento competente e poi il codice, nello stesso commit.
- **Requisiti dell'utente** (GDD §0) e **definizione di non pay-to-win** (GDD §0, MONETIZZAZIONE §1) sono vincolanti. In particolare:
  - nessun timer di costruzione;
  - nessun ramo esclusivo;
  - i Segnali e la Radio non sono mai acquistabili.
- **La simulazione (`game/src/sim`, `game/src/missions`) non importa Babylon.**
- **URL base, ID app e chiavi pubbliche** stanno solo in `game/src/config.ts` (variabili `VITE_*`). Dominio: `holdout.magistaf.com`. Mai `github.io`, mai segnaposti.
- **Nessun segreto nel repository:** keystore, chiavi private, token restano fuori.
- **Account, pagamenti, accettazione di termini, invio allo store e post pubblici** spettano all'utente (ROADMAP §4). Prepara le istruzioni, non agire al suo posto.
- **Commit su `main` appena un'operazione è finita**, piccoli, con la documentazione aggiornata nello stesso commit. Aggiorna ROADMAP §8 a ogni passo significativo.
- **Lavoro altrui a metà:** se trovi lavoro incompiuto di un'altra sessione, non sovrascriverlo; documenta il blocco in ROADMAP §8.
- **Testi del gioco** in `game/src/i18n/` (italiano e inglese). La lingua di lavoro con l'utente è l'italiano.
- **Qualità:** tutto completo, ricco e curato, mai versioni abbozzate.

## Verifica prima di chiudere una sessione
- `npm run check` (lint, tipi, test, validatore dei dati) verde.
- Build beta pubblicata, quando la tappa lo prevede, e link indicato all'utente.
- ROADMAP §8 aggiornato con ciò che è stato fatto, le verifiche e il prossimo passo.
