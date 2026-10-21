# CODEX 02 — COME SI DEVE GIOCARE (NON SOLO COSA ESISTE)
## Obiettivo di esperienza
Ogni minuto il player deve vedere un progresso, affrontare una scelta o agire; non una sequenza di tap automatici. Il mondo risponde alle azioni: ogni edificio cambia la scena, un superstite entra e lavora, una miniera funziona, un attacco produce hit reaction.

## Primo giocato city-first
1. Inquadratura iniziale su terreno abbandonato con dettagli d'ambiente (non una città già fatta); protagonista controllabile via tap/interazione contestuale. Recupera 3 punti macerie con ANIMAZIONI DIVERSE e feedback di raccolta; la raccolta iniziale è finita.
2. Piazzi falò e tenda con preview reale, snap e conferma. Il mondo diventa più accogliente, luce del fuoco e suono. Nessun timer costruttivo.
3. Il primo superstite SPAWNA FUORI DALLA CAMERA, entra dalla strada, cammina fino all'accampamento e reagisce; tap: accogli. Alloggio/limite chiaro. Non spunta istantaneamente dentro la tenda.
4. Costruisci banco recupero, assegni il superstite e lo vedi lavorare. Se cambia ruolo, cambia animazione e produzione (numeri reali).
5. Primo bivio: investire rottami in orto/altro recuperatore, non upgrade lineare obbligatorio. Entrambe le scelte hanno un effetto entro la sessione.
6. Primo ostacolo narrativo: area bloccata e due vie credibili per risolvere (lavoro urbano/missione esterna). Il minigioco di recupero ha premi utili al progetto seguito e ritorno in città.
**Gate city**: 5 tester devono riconoscere la differenza fra lavoratori, produzione e costruzioni, senza leggere manuale; almeno due decisioni vere nel primo incontro. Se si può soltanto premere l'icona evidenziata il gestionale non è pronto.

## Sistemi urbani veri
- Lavoratori: scarsità strategica, assegnazione gratuita/automatica, cinque ruoli leggibili, mancanza operatori NON può bloccare per sempre risorse iniziali.
- Produzione: giacimenti, cap magazzino, orti/miniere/officine; animazioni di lavoro; scelte di moduli funzionali. CRAFT istantaneo da input risorse corrette.
- Urbanistica: strade, miniera sul giacimento, bonus adiacenza modestamente comprensibili; preview output prima della conferma e gratis spostamento edifici. Evitare bonus occulti.
- Progetti cittadini: ristrutturazione di infrastruttura in più obiettivi (raccogli, assegna, missione, trasformazione visibile), senza contenuti di 20 secondi spacciati per giochi diversi.
- Sopravvissuti: comuni (manodopera) e eroi (abilità/corsa/difesa). Contratti per eroi deterministici, primo alternativo accessibile presto.

## Specifica M1 — obbligo di game feel
- **60–90 sec TOTALE**, niente 8 livelli dentro; inizio immediato con un solo personaggio ed effettiva arma base. Se UI mostra ×N deve corrispondere a N unità reali, non a moltiplicatore artificiale.
- Movimento laterale fluido/reattivo che modifica effettivamente la corsia di fuoco, la collisione, le casse ottenibili, e quale nemico minaccia il giocatore. La squadra reclutata sta NELLA stessa corsia e segue senza attraversarsi/teletrasportarsi.
- Fuoco automatico limitato a bersagli validi frontalmente, con linea di vista e cooldown, mai danno indiscriminato su tutti gli zombie. Attenzione: sistema di auto-target non deve saltare senza ragione fra zombie e casse ogni frame.
- Armi **alternative** con tradeoff misurabili: mitra fuoco sostenuto/apre casse, shotgun gruppi ravvicinati, perforante nemici allineati. Non upgrade lineare sempre fino a mitragliatrice ultima.
- **Ogni incontro ha scelta**: una cassa che richiede tempo di fuoco contro minacce in arrivo; percorso sicuro a costo di perdere bonus; spostarsi per allineare bersagli. Se le corsie hanno lo stesso risultato, redesign.
- Zombie reale: spawn davanti oltre margine camera, entra gradualmente, mantiene vita e persistenza, viene colpito con feedback, cade e viene rimosso solo per morte/uscita logica. No spawn under hero, no sparizioni in viewport.
- Varietà controllata: normale, veloce telegrafato, corazzato, ranged; combinare massimo 2–3 nella zona visibile in modo leggibile. Difficoltà = tempo di reazione + tradeoff, non HP gonfiati.
- Hit feedback: muzzle flash, suono diverso arma, impatto visibile, reazione nemico e feedback se mancato; indicatore di danno, invulnerabilità breve dopo colpo e non 12 VFX che coprono tutto.
- Fine: esito e materiali esatti, un tap a tornare città e usarli.
**QA M1**: stationary agent non triviale, bot esperto più efficace del random, differenze fra scelta shotgun/SMG, 0 unfair spawn nei semi testati, test HUMAN retry volontario.

## Specifica M2 Barricata
M2 deve essere diverso da M1: fase iniziale di posizionamento/disegno linee, 2–3 ondate continue, difese con ruoli complementari e un eroe attivo. Il posizionamento di una barricata deve CAMBIARE il percorso, non solo bloccare i nemici. Indicare perché una difesa va meglio contro un tipo e peggio contro un altro. Missione 90–150sec, ritorno al progetto cittadino. Non fare 3 min di autoplay.

## Minigame puzzle
M3 Tira perni: meccanica fisica chiara, risultato verificabile, riavvio immediato, ricompensa viveri/superstite quando giustificato dal luogo. M4 e M5 non vanno messi in una V1 mediocre solo per avere più card. Ogni puzzle deve essere solvibile e reattivo ai touch, senza fortuna o collisioni inconsistenti.

## Sistema condiviso necessario
Missioni danno risorse → filiere industriali le trasformano → edifici e research sbloccano strumenti e possibilità → nuova missione presenta scelta diversa. Senza cambiamento percepibile nella partita successiva, la progressione è finta.

## «ESEMPIO DI TASK VALIDABILE»
**«Scena accampamento n.1»**: non «aggiungi tende». Realizzare una camera zoomata che mostri terreno credibile + protagonista leggibile + 3 macerie animate + preview/tenda/falò GLB reale + luce e audio + NPC che entra fisicamente da fuori camera + funzione assegna al banco + produzione numericamente verificata + stato persistente dopo reload. Evidenze richieste: video reale 60–90sec, 5 screenshot, confronto reference/risultato, test persistenza. Non aggiungere un negozio, 5 puzzle o nuovi eroi a questo task.
