# CODEX 00 — CONTRATTO DI PRODUZIONE E BLOCCO DELLE IMPROVVISAZIONI
**OBBLIGATORIO PER OGNI SESSIONE.** Questo file prevale sulle soluzioni di comodo e sui vecchi piani tecnici, salvo istruzioni esplicite più recenti dell'utente. Il piano strategico è docs/PIANO-ESECUTIVO-AI.md; il progetto può essere rimesso in discussione se il risultato non è di qualità.

## Il fallimento attuale
L'utente ha rifiutato l'intero risultato: non solo asset, ma sensazione di gioco, interazioni, visuale, città, design, menu e approssimazione generale. **Non è autorizzato dichiarare il progetto «quasi pronto», «funzionante» o aggiungere feature al prodotto scadente prima di una revisione profonda.** Un test che passa non equivale a qualità percepita.

## Regole STOP — non negoziabili
1. **STOP a feature creep e generazione procedurale di grafica finale.** Geometrie primitive, mesh assemblate via codice, forme CSS/SVG/emoji, pannelli HTML generici o shader casuali possono esistere SOLO come debug/greybox esplicitamente marcati, mai presentati come «grafica finale» o art direction approvata.
2. **STOP alle invenzioni:** nessun edificio, personaggio, risorsa, UI, formula, abilità, livello, premio o regola aggiunta senza essere descritta in documento di feature, collegata al loop e approvata nel suo contesto. In caso di ambiguità, NON inventare dettagli: registrare l'ambiguità, proporre opzioni visive/testabili e chiedere preferenza se sostanziale.
3. **Non sviluppare tutto contemporaneamente.** Non iniziare altre 4 modalità se la prima esperienza città e M1 sono state respinte.
4. **Non sacrificare l'estetica per test tecnici.** Esigere screenshot e video su device vero: panorama città, dettaglio edificio, personaggio, gameplay M1, schermata menu. FPS, unit test e percentuale bot NON certificano divertimento.
5. **Non passare al prossimo gate senza accettazione esplicita dell'utente.** Se un asset non è disponibile o la licenza è incerta, segnalare il blocco; non sostituire silenziosamente con un cubo e dichiarare finito.
6. **Non sovrascrivere lavoro verificato.** Ogni modifica deve essere su branch/task con commit isolati; conserva asset originali e log delle decisioni, non cancellare i vecchi documenti.
7. **Solo fonti/asset legali verificati:** mantenere URL fonte, autore, licenza e percorso interno. Un CSV con licenza dichiarata non significa che i modelli siano stati scaricati, integrati o visivamente compatibili.
8. **Non emulare gli screenshot del concorrente come texture o UI:** riferimenti per linguaggio visivo e sistemi, grafica originale con asset licenziati.

## Protocollo obbligatorio prima di scrivere codice
A. Leggi docs/DECISIONI.md, docs/PIANO-ESECUTIVO-AI.md, docs/CITTA-DA-ZERO-MASTER.md, CODEX-01, CODEX-02, CODEX-03.
B. Esegui audit **della build corrente**, non indovinare: elenca asset renderizzati con path; screenshot reali delle schermate; video di 2 minuti; test/input; descrivi precisamente 10 problemi VISIVI e 10 problemi di GAMEPLAY, con gravità e causa probabile.
C. Definisci una proposta di **vertical slice** con tre immagini di riferimento APPROVABILI: terreno vuoto, accampamento vivo con 3–5 abitanti, città con miniera e officina. La referenza non è un PNG generico generato da AI: è composizione/target realizzabile con gli asset licenziati identificati.
D. Presenta prima/dopo e asset list approvabile. Se la qualità non è sufficiente, non proseguire col resto.
E. Implementa un incremento, prova su device e registra: screenshot, video, FPS, interazioni reali, problemi rimasti.
F. La sessione termina con una tabella «Specificato / Implementato / Verificato su Android / Approvato» che non confonde i quattro stati.

## Gate di qualità
GATE 0: Audit e diagnosi della beta corrente completati con prove, non solo proposte. 
GATE 1: **Visual target** approvato: camera/proporzioni/luci/materiali/edifici/personaggi/UI coerenti.
GATE 2: **Core town interaction**: raccolta iniziale, posizionamento, superstite che arriva, assegnazione, produzione, trasformazione visiva, tutto intuitivo e soddisfacente.
GATE 3: **M1 veramente divertente**: video e playtest, scelte armi/corsie contano, spawn corretti, hit feedback, ritmo senza tedio.
GATE 4: Economia loop completo (città -> missione -> upgrade) senza deadlock né click farm.
GATE 5: Resto modalità, contenuti, monetizzazione e lancio.
L'utente deve poter fermare, criticare e cambiare una proposta a ciascun gate senza che Codex dichiari «completo».

## Report consegna obbligatorio (ogni task)
1. Cosa doveva diventare visivamente e ludicamente.
2. Quale riferimento e quali asset reali sono stati usati, con licenza.
3. Screenshot/video REALI (non mockup spacciati per build).
4. Cosa fa il giocatore, in 60 secondi di test concreto.
5. Fps/performance, crash e input test.
6. Cosa è ancora brutto/non funziona e perché; nessuna giustificazione generica.
7. Autovalutazione 0–5 separata per **visual art, UX, game feel, profondità, bug, business loop**, con prove; punteggi 4–5 senza comparatori/riscontri vietati.
8. Decisione: pronto per revisione utente / da rifare; mai dichiarare approvazione automaticamente.

## Decisione fondamentale
La prima richiesta all'AI non è «crea città e minigiochi»: **«Mostrami che hai capito quale gioco vogliamo, analizza cosa c'è, prepara un nuovo target visivo e giocabile realistico con asset e reference, senza ancora peggiorare il codice».**
