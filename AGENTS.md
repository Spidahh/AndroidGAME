# AGENTS.md — ISTRUZIONI OBBLIGATORIE PER CODEX / AGENTI AI
## STATO DEL PROGETTO
L'utente HA RESPINTO il risultato attuale come esteticamente e ludicamente scadente. NON proseguire automaticamente l'implementazione del vecchio piano aggiungendo feature. **Prima audit reale e revisione artistica/ludica.**

## LEGGI NELL'ORDINE
1. `docs/DECISIONI.md` — vincoli dichiarati dall'utente.
2. `docs/CODEX-00-CONTRATTO-QUALITA.md` — cosa non inventare, stop e approvazione.
3. `docs/CODEX-01-ART-DIRECTION-ASSET-UI.md` — asset veri, art direction, camera, menu e rendering.
4. `docs/CODEX-02-GAMEPLAY-CITY-MINIGAME.md` — esattamente cosa deve fare il giocatore e cosa deve provare.
5. `docs/CODEX-03-VERIFICA-E-CONSEGNA.md` — screenshot, video, test e prove per dichiarare completato.
6. `docs/PIANO-ESECUTIVO-AI.md` e `docs/CITTA-DA-ZERO-MASTER.md` per il contesto della città, economia, sistemi e sequenza.

## NON FARE
- **NON** creare asset «finali» con primitive Babylon.js, semplici geometrie, SVG, emoji, CSS decorativo, generazione casuale di edifici. Greybox tecnico permesso solo se esplicitamente marcato NON FINALE e non mostrato come consegna artistica.
- **NON** inventare UI, poteri, costi, valute, personaggi, livelli o loop per riempire buchi.
- **NON** dichiarare «completato» se mancano prova su telefono e accettazione del risultato.
- **NON** procedere a monetizzazione, puzzle aggiuntivi, 9 quartieri e 300 livelli prima che la città e M1 soddisfino i gate.
- **NON** confondere un test unitario verde con gameplay divertente.
- **NON** sostituire asset mancanti senza spiegare provenienza/licenza e chiedere quando il cambio altera direzione artistica.
- **NON** modificare la branch principale massivamente senza una revisione e commit recuperabili.

## PRIMO COMPITO QUANDO SI RIPRENDE IL PROGETTO
**Esegui solo un audit della build e prepara il piano di rifacimento verificato**: mostra screenshot/video e quali sistemi esistenti sono da scartare, rielaborare o conservare. Prepara art bible e 3 reference composition compatibili con gli asset REALI identificati. Non procedere a codice nuovo o promettere ore/giorni futuri senza richiesta esplicita dell'utente.

## DEFINIZIONE DI «FATTO»
Implementato e funzionante, visivamente coerente, ludicamente testato, misurato su Android, visto e approvato dall'utente. Se una di queste manca, è «prototipo» o «in verifica».
