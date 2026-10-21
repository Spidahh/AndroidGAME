# CODEX 03 — TEST QUALITÀ E CONSEGNA
## Fase 0: documentare il fallimento attuale SENZA minimizzare
Produci `docs/AUDIT-BETA-REALE.md` con:
- URL/build/commit provati e device esatto.
- Screenshot desktop e Android: prima scena, selezione edificio, progresso, menu, M1, sconfitta/vittoria, reclutamento (se esiste).
- Lista file che renderizzano mesh e UI. Segna le geometrie create a codice, texture/immagini/emoji placeholder, modelli da file, attribuzioni.
- 10 problemi con priorità sul VISIVO, 10 sul GAMEPLAY, 10 sull'UX e 10 sull'ECONOMIA/PROGRESSIONE, solo se osservati; NON inventare risultati per arrivare a 10.
- Separare bug da scelte deliberatamente brutte/inadeguate.

## Verifica visiva
Per ogni schermata e meccanica allegare:
(1) reference visivo con fonte, (2) screenshot build stessa impostazione di camera, (3) differenze, (4) azioni di correzione, (5) data e chi ha approvato.
Una comparazione deve valutare COMPOSIZIONE, LUCI, PROPORZIONI, DENSITÀ VISIVA, COERENZA ASSET, QUALITÀ UI, ANIMAZIONI, LEGGIBILITÀ.
Renderizzare un cubo magazzino o una text label «miniera» = FAIL, indipendentemente dal fatto che il bottone funzioni.

## Verifica divertimento
Una funzionalità supera il gate solo se:
- Almeno 5 persone estranee al codice completano la prova senza istruzioni verbali.
- Le azioni sono comprensibili e non tutte obbligate da freccia tutorial.
- C'è una decisione con conseguenze diverse, non due bottoni identici.
- Il giocatore vede ciò che succede e può capire perché ha perso/guadagnato.
- Almeno 3/5 scelgono spontaneamente di fare ancora un'interazione/rigiocare (target di verifica, non prova statistica).
- Il report allega osservazioni e correzioni da fare: non conta solo pass/fail.

## Verifica economica e commerciale
Simulation 30 giorni su city-only/action-only/misto, con 5,15,30,60min al giorno, 0/1/3 rewarded, AFK 0/8/24h. Nessun softlock; ogni valuta ha fonti e usi; bottleneck visibile e non pagabile. Metriche commerciali DAU, D1/D7, rewarded opt-in, IAP, costi per 1000 sessioni, crash e performance.
Monetizzazione NON è parte del primo gate grafico/ludico.

## Formato di consegna
| Requisito | Stato SPEC | Stato CODICE | Verificato reale | Approvato utente | Prove |
|---|---|---|---|---|---|
| Falò come asset licenziato animato | ... | ... | ... | ... | screenshot/video |
| Superstite arriva dalla strada | ... | ... | ... | ... | video |
| Assegnazione cambia produzione | ... | ... | ... | ... | test/video |
| M1 scelta arma reale | ... | ... | ... | ... | confronto run |

Codex NON può scrivere «completato» se manca screenshot/prova. Report finale in linguaggio comprensibile, nessun log muro di testo; link precisi.
**FAIL LOCALE:** se manca un asset o l'input non funziona, fermare la consegna e segnare l'ostacolo; non attribuirsi un successo per test non realizzati.
