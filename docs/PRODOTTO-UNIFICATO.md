> **AGGIORNAMENTO STRUTTURALE — CITY FIRST (20/10/2026).** La sequenza iniziale di questo documento («avvio diretto nel minigioco») è SUPERATA dalla decisione successiva dell'utente: **si parte con zero edifici e si costruisce l'accampamento prima di giocare M1**. Le regole aggiornate per città, superstiti, filiere, gestione attiva, sviluppo in insediamento e città sono in **[CITTA-DA-ZERO-MASTER.md](CITTA-DA-ZERO-MASTER.md)**. Questo documento rimane il riferimento per M1-M5, marketing, tecnica e monetizzazione non contraddittori.

# HOLDOUT CITY — PRODOTTO UNICO, SPECIFICA INTEGRATA
**Versione proposta 1.0 — 20 ottobre 2026**
**Questo è il riferimento per sviluppare, bilanciare e vendere il gioco.** Conserva lo storico in docs/ e archivio/. Eventuali decisioni esplicite future dell'utente prevalgono. I valori numerici qui sono PARAMETRI DI PROVA, non verifiche già superate.

## 1. COSA COMPRA/SCARICA IL GIOCATORE
**Holdout City: Real Ad Games** — free-to-play zombie-city-builder con *i veri minigiochi delle pubblicità* sempre disponibili: giochi brevi action e puzzle, guadagni materiali, ricostruisci una città senza tempi d'attesa per costruzioni o upgrade, ottieni nuovi personaggi e personalizzi il tuo percorso. Produzione AFK utile, ma il modo migliore di crescere è giocare. Android in primo luogo; web giocabile e PC possibili dallo stesso stack.

**Promessa non negoziabile:** il gameplay nelle ads è il gameplay giocabile, non uno specchietto per un 4X. Nessun calcolo +N/×N come gameplay, nessuna attesa per completare edifici, nessun energy gate che impedisca di giocare, nessuna arma/eroe venduto per denaro reale.

**Ambientazione/tecnologia già presente nella repo, da preservare:** città zombie con centro in deposito tram, Babylon.js + Capacitor, asset gratis con registro licenze, beta web esistente, S25 come device di test. NON migrare a Godot senza motivazione e decisione esplicita: c'è già codice esistente e test.

## 2. LOOP: INIZIO E RITORNO
1. Avvio -> accesso diretto a un minigioco reale (senza shop, login o costruzione preliminare).
2. 45–90 secondi di attività concentrata: controllo, rischio, scelte, obiettivo chiaro.
3. Ricompensa sempre leggibile; bonus volontario via ads se disponibile; fallimento dà premio parziale non nullo, ma la vittoria resta importante.
4. Ritorno alla città: il bottino evidenzia una costruzione/upgrade immediato. Si vede fisicamente ricostruire il quartiere.
5. L'edificio migliora una capacità economica **oppure abilita una scelta strategica concreta** (eroe, equip, varianti, difese, comodità). Nessun obbligo di maxare tutto nello stesso ordine.
6. L'AFK accumula risorse base fino a un cap; il giocatore può tornare anche dopo poco, senza obbligo di notifiche.
7. Contratti quotidiani e settimanali combinano le stesse attività, con premi aggiuntivi, senza nuovi minigiochi da produrre di continuo.
8. Il player torna per ottenere una nuova scelta, non per far finire un timer.

**Obiettivo onboarding (test):** entro 2 minuti il giocatore ha completato un minigioco e una costruzione; entro 10 minuti ha scelto un potenziamento e provato una modalità diversa.

## 3. MINIGIOCHI — CONTENUTO E PRIORITÀ DEL PRODOTTO
Conservare le cinque famiglie descritte in docs/M1, M2 e M3-M5; **non imporre subito centinaia di livelli**. Numero di livelli non è unità di qualità. Un minigioco si può rigiocare con seed controllati, obiettivi e modificatori.

### M1: CORSA DI SOPRAVVIVENZA (CORE TRAILER)
**Vedi docs/M1-CORSA.md per riferimenti. Questo documento prevale sui tempi e sulla struttura di rilascio.**
- Un singolo round **60–90 secondi** inclusi finale ed esito, nessun susseguirsi di 8 tappe/8 menu. La mappa è un unico flusso compatto, con **4–6 incontri significativi**. Non tutte le run obbligano al boss; boss/punteggio come finale alternativo.
- Drag laterale (tre corsie logiche) sposta la **squadra nella stessa corsia**, avanti e fuoco automatico; ogni corsia cambia linee di fuoco, copertura, rischio e premi. Fermarsi non deve essere la strategia più efficace.
- **Partenza pulita:** 1 protagonista e arma base; nessun «×3» gratis né bonus visivo arbitrario. Se si decide di usare un contatore di soldati iniziale, deve mostrare il numero **effettivo** di unità, non un moltiplicatore fittizio. Il giocatore può acquisire aiutanti durante la run, che aumentano la potenza senza minigame matematico.
- **Scelta arma vera nei primi 8–12 sec:** uno fra due pickup incompatibili: mitra continuo (casse/lungo fuoco), shotgun ad arco (orde vicine), successivamente perforante (fila). Armi NON solo scala automatica pistol->SMG->AR->heavy. Ogni pickup mostra icona arma, non numeri ambigui.
- **Oggetti da aprire sparando:** cassa ricompense, arma, recluta, utility; barra HP trasparente. Il costo è il tempo di fuoco dedicato mentre cresce la pressione avversaria. Non usare potenza infinita per aprirli automaticamente.
- **Difficoltà reale:** camminatori come carne da macello, corridori telegrafati, corazzati che bloccano fuoco, tiratori con colpi e segnali; in ogni incontro almeno una scelta a costo-opportunità. Nemici non devono comparire dal nulla alle spalle, sotto il giocatore o scomparire in visuale.
- **Esito:** estrazione raggiunta con almeno un membro vivo; fallimento a zero. Bonus per casse opzionali, persone salvate, HP/unità superstiti e obiettivi raggiunti.
- **Ricompensa città:** materiali + viveri, pezzi eroe solo da condizioni visibili e non acquistabili; popup offerte monetarie solo dopo esito, se previsto, e ads facoltative esplicite.

**Ritmo testabile (80 s):** 0–8 setup immediato/arma; 8–23 pickup rischioso vs nemici; 23–40 percorso minaccia + recluta; 40–60 mix melee/ranged e pericoli; 60–75 finale difficile; 75–80 esito. 1–3s di respiro distribuiti dentro, non pause.
**Matrice di tradeoff:** SMG eccelle su cassa ma soffre orde; shotgun eccelle orde ma non apre cassa lontana; perforante eccelle nemici allineati ma richiede mira tramite posizione. Ogni run include almeno 2 occasioni in cui lo stesso tracciato produce esiti diversi a seconda di scelta.
**Difficoltà:** non si risolve gonfiando salute; aumentare compresenza minacce e precisione del movimento senza introdurre danni inevitabili. Testare giocatore fermo, casuale, bravo, e tre eroi; una build iniziale deve poter vincere con abilità, senza upgrade obbligatori.
**Vincoli spawn:** generare ahead con anticipo visibile, mai in area di collisione o dietro giocatore; zero despawn nel viewport; ai bordi serve percorso raggiungibile e preavviso congruo. Misurare empiricamente su S25 e device più lento.
**Errori che bloccano il rilascio:** esiti uguali muovendosi/non muovendosi, spawn sotto player, zombie immortali o troppo facili, impossibilità di scegliere arma, bonus x3 preimpostato privo di origine, nessuna penalità per percorsi pericolosi, durata >90s mediana. I test automatici esistenti NON sostituiscono il test umano.

### M2: BARRICATA (seconda modalità CORE)
- Missione breve **90–150s**, difendi un varco che conduce al quartiere.
- **Fase preparazione 10–15s:** spendi rottami missione (budget iniziale limitato) per posizionare 2–3 difese (muro deviatore, mitragliatrice, trappola). Le scelte cambiano i percorsi nemici, non soltanto +% danno.
- **Assalto 60–110s:** 2–3 ondate senza attese, puoi spostare un eroe tra posti tattici per intervenire, riparare una breccia, usare abilità. Le difese hanno linea di tiro e collisioni visibili; il nemico deve poter realmente sfondare.
- Vittoria: base con integrità >0 dopo ultimo attacco. Sconfitta: integrità 0, ricompensa parziale.
- Riutilizza zombie, eroi e combat di M1, aggiunge placement e pathfinding semplice. **Non costruire un RTS pieno**.

### M3: TIRA IL PERNO (evento/puzzle)
- Un puzzle fisico 20–45s, 1–3 perni, liquidi/pericoli/forniture; vinci se salvi il bene bersaglio e fai arrivare risorsa a destinazione; perdi se distruggi/sacrifichi l'obiettivo.
- Ogni enigma ha almeno una soluzione simulata, indicazioni visibili senza dover indovinare. Non pay-to-win: suggerimento opzionale, normale percorso gratis.

### M4: DISEGNA LA DIFESA (evento/puzzle)
- 20–40s: un solo tratto continuo entro budget lunghezza, poi breve simulazione orde/gravità. Vinci proteggendo sopravvissuti per durata prestabilita.
- Fisica deterministica e livelli testati. Evitare linee con collisioni casuali e input troppo preciso su telefono.

### M5: LIBERA LA STRADA (evento/puzzle)
- 30–60s: trascini veicoli/ostacoli in direzioni consentite, liberando percorso di fuga con mosse; zombie in avvicinamento come pressione **di mosse**, non timer reale che rende difficile leggere.
- Obiettivo autobus libero, mosse possibili e stato ripristinabile; niente puzzle impossibili.

### Modalità e contenuti release
**Gate A: vertical slice** M1 una run ben funzionante + città 2 edifici + risorse; **Gate B: prima beta giocabile** M1 con varianti + M2 + città + 1 puzzle M3; **Gate C: rilascio 1.0** M1 + M2 + M3/M4/M5 con un **pacchetto ridotto ma curato** di livelli e variazioni, invece di 320 livelli di qualità mediocre. Target PRATICO da rivedere: M1 8 situazioni modulari/3 difficoltà, M2 6 mappe/3 difficoltà, M3 20 livelli, M4 20 livelli, M5 20 livelli. La modalità infinita viene dopo se diverte ed è bilanciata. **I 40+40+240 del vecchio piano restano backlog, NON impegno di lancio.**

## 4. CITTÀ ED ECONOMIA
**Base effettiva già definita:** deposito tram come rifugio, 9 quartieri, 12 edifici, materiali/viveri/pezzi eroi (docs/CITTA.md). Riutilizzare dati e asset già selezionati. Tutto comprabile con risorse di gioco; costruzione immediata e liberazione quartiere istantanea quando si hanno i requisiti. Niente timer edifici.
- Materiali: M1/M2, missioni e Sfasciacarrozze AFK.
- Viveri: missioni, puzzle, Orto AFK.
- Pezzi eroi: obiettivi speciali e ricorrenze, nessun gacha.
- Ogni edificio dà un beneficio reale: Armeria sblocca equip/scelte, Torre nuove opzioni barricata, Laboratorio opzioni puzzle, Radio progressione personaggi, ecc.
- Non aggiungere produzione tramite lunghe code temporizzate, **il tempo resta solo nella produzione AFK**, che è un extra.
- Differenziazione città: edifici costruibili in ordine libero, quartieri scelti liberamente, priorità di upgrade, eroi preferiti, composizione; **nessun ramo permanente obbligatorio** secondo docs/DECISIONI. Le specializzazioni sono opzioni equipaggiabili, non blocchi irreversibili.
- Evitare progressione identica: al terzo livello di Armeria scelta fra due bonus/preparazioni, poi poter sbloccare entrambi più avanti con gioco; allestimenti salvabili. Separare diversità della scelta dalla disparità punitiva del potere.
- Visuale giorno 1: città danneggiata -> edificio ripulito -> quartiere illuminato; la crescita deve essere percepibile senza asset unici a ogni upgrade.

**Bilanciamento, non ancora verificato:** prime costruzioni entro 2–3 run; entro 10 minuti nuova possibilità visibile; entro 30 minuti due strategie di sviluppo. Non fissare formule quadratiche a prescindere: simulare output/minuto per modalità e produzione AFK. Individuare il materiale bloccante e rendere sempre disponibili **almeno due fonti** per i materiali base.

## 5. PERSONAGGI
8 eroi progettati in docs/CITTA.md; non serve implementarli tutti contemporaneamente. Lince come starter e due altri nel beta, altri per release/aggiornamenti secondo test. Ogni eroe mantiene abilità riconoscibile in M1 e M2, evitando solo +% danno. Sblocchi deterministici con pezzi, niente gacha e nessun eroe premium. Statistiche normalizzate se arriva PvP.
Il giocatore controlla un eroe alla volta; alleati temporanei durante M1 stanno nella sua corsia. M2 utilizza eroe e difese. Variazione strategica = eroe x arma x edifici, non solo salire di livello.

## 6. AFK, GIORNALIERE, SETTIMANALI, STAGIONI
- Produzione AFK nei soli edifici dedicati, con deposito cap (8h baseline), si incassa al rientro. Potenziarli è immediato con risorse di gioco.
- Giorno: 3 incarichi generati fra modalità realmente disponibili, costruzione/raccolta/eroi; mai obbligare ads o minigioco non sbloccato.
- Settimana: una modalità sotto i riflettori, 4–5 traguardi ottenibili giocando normalmente, premio misto economia/cosmetica.
- Mese: riuso di combinazioni/varianti, ricompensa cosmetica finale, nessuna nuova modalità promessa ogni mese; no streak punitive.
- Stagioni e leaderboard affidabili richiedono tempo server/antiabuso; partire con eventi senza premi competitivi importanti.
- Se un evento richiede ripetere 20 volte contenuto facile, è fallito il design. Premiare miglioramento, varietà e obiettivi, non soltanto grind.

## 7. MONETIZZAZIONE E EQUITÀ
**Ads esclusivamente rewarded facoltative**: extra ricompensa dopo missione, bonus AFK, suggerimento puzzle, un revive nel combattimento (solo se tecnicamente chiaro). Niente banner o ads interstitial automatiche.
- Lo spettatore ads ottiene un vantaggio economico di progressione; **non chiamarlo «nessun vantaggio»**. Per proteggere il fair-play, cap giornalieri e niente risorse premium/forza competitiva diretta.
- IAP pochi: Pass Comandante per UX (batch placement, layout salvati, statistiche), skin città/eroi/armi, sostegno. Il Pass non può migliorare danno, drop o capacità competitive.
- Prezzi ipotetici: Pass €4,99, cosmetic €1,99–3,99, supporto €2,99–9,99. Da verificare policy e pubblico.
- Non mettere **clip sharing** essenziale dietro Pass: tutti devono poter condividere il gameplay, è la nostra acquisizione organica; nel Pass offrire semmai editor/overlay extra.
- Un Pass che salta semplicemente animazioni obbligatorie rischia «creo attrito per vendere comodità»: niente animazioni frustranti nemmeno free.
- La previsione guadagni precedente con 2,5 rewarded/DAU, 3% compratori **non è una previsione affidabile**. Ricavi monitorati come eCPM e fill × impressions + acquisti effettivi per coorte, senza aspettative di successo garantite.
- Se in futuro PvP: matchmaking stat normalizzate, niente elementi ottenibili solo guardando ads o pagando che migliorano vincita; backend e anti-cheat necessari prima di classifiche con premi.
- Prezzo PC e modello ads/web possono essere diversi per piattaforma, ma non promettere una portabilità «gratis» delle funzionalità Android.

## 8. REALIZZAZIONE, PRIORITÀ E LEGALITÀ
**Non ricominciare da zero:** repository attuale contiene codice M1 Babylon + Capacitor, tool simulazione, asset Quaternius/PolyPizza, sito beta. Mantenere stack salvo prova contraria. Audit licenze di ogni modello/CC-BY, fonts, audio, library; tenere credit e snapshot licenze. Nessuna copia di video, loghi, mappe e texture dei concorrenti; la meccanica come ispirazione è separata dai contenuti protetti.
- **Verifica gioco, non solo bot:** 5 tester provano M1 e devono spiegare perché hanno scelto una corsia/arma e perché sono morti. Il bot può vincere 8/8 anche se il gameplay resta noioso.
- Validazione loop: una partita M1, payout, potenziamento edificio e successiva run diversificata. Su S25 e un Android economico. Procedere a M2 soltanto dopo che questo risulta divertente.
- Analitiche importanti: retry volontario, scelta armi, corridoi, hit ingiusti, completamento, durata, risorse per minuto, conversione ad facoltativa, D1/D7, progresso nel primo giorno.
- Google Play: quota account, test chiuso se applicabile, target API corrente, Android App Bundle, Data Safety/privacy, consenso ads EU, Play Billing per IAP, legalità immagini/marchio, privacy policy e fiscalità italiana. Le verifiche vanno fatte sulla versione finale.
- Con versioni online/cloud e acquisti, decidere affidabilità dei salvataggi, anticheat ed eventuale cancellazione account.
- AI sviluppa con piccole modifiche testabili. Nessun «fase completata» se non c'è build e prova reale.

## 9. MARKETING E TEST COMMERCIALE
**Due messaggi complementari:** «Il gioco delle ads è davvero il gioco» + «Non aspetti per costruire la città: giochi per crescere». La pagina Play Store mostra ENTRAMBE le esperienze: corsa/puzzle veri e costruzione città; mai nascondere la città come fanno i 4X che promettono solo runner.
- Creatività da 10–20s: 0–5s corsa con scelta arma e quasi sconfitta, 5–10s reward, 10–15s città trasformata; altra creatività M2 e costruzione strategica; terza confronto due città differenti.
- Web beta già disponibile per condivisione senza installazione, poi invito alla closed beta Android. Pubblicare clip reali, non storyboard cinematici non corrispondenti.
- Priorità zero budget: Shorts/TikTok/Reels, community e piccoli creator pertinenti; tracciare clip -> visita -> prova -> install -> ritorno.
- KPI di gioco: capire obiettivo entro 10s, terminare una corsa in <90s, 2 upgrade visibili nei primi 10min, player torna volontariamente; coorti D1/D7. Non investire in paid install prima di test.
- Una volta confermata retention e LTV plausibile, test paid contenuto (ad es. max €100–200) per misurare CPI, NON comprarsi milioni di scaricamenti.
- Risultato «buona idea» non significa automaticamente monetizzabile: senza utenti attivi ricavi minimi.

## 10. PRIORITÀ DI IMPLEMENTAZIONE (UNA SOLA LISTA)
P0: M1 niente spawn o despawn scorretti, vera scelta arma, pressione/difficoltà, un solo round corto; test su telefono con persone reali.
P1: città già prevista con 2 edifici funzionanti e payout M1; upgrade istantaneo + salvataggio; clip in cui si vede città cambiare.
P2: espandere città e primi due/tre eroi; M2 con posizionamento e un eroe; test del loop multigioco.
P3: M3/M4/M5 uno alla volta solo se mantengono qualità; giornaliere, produzione AFK, eventi settimanali.
P4: polish Android, ads/IAP, conformità Play, analytics, closed testing e contenuti store; poi lancio e marketing.
P5: PC, classifiche affidabili e PvP come espansioni da calcolare, non prerequisiti.

## 11. CRITERI DI STOP (RILASCIO BLOCCATO)
- Più corsie ma esito sostanzialmente identico, nessuna scelta vera; oppure armi solo cosmetiche.
- Zombie e ostacoli che entrano nella hitbox senza avvertimento, spariscono in viewport o non possono fare danno.
- Lo stesso minigioco si trascina oltre 90s senza ragione, ripetizione di 8 livelli in un'unica sessione.
- Video pubblicitario ritrae modalità assenti o travisa la quota action/città.
- Un acquisto offre più potenza competitiva, oppure ads necessarie a sbloccare gioco essenziale.
- Crescita città richiede aspettare un timer o pagare per giocare.
- Software senza audit licenze o requisiti legali non testati.

## 12. Cosa rimane realmente da validare
- Tuning spawn/danno/input M1 su S25 e device economico, contenuto M2, puzzle fisici, curva economica, scelta estetica finale, tenuta liveops di un solo sviluppatore, pricing, conversione install, retention, LTV e costo di acquisizione. **Questo documento completa la progettazione operativa, non dimostra che le metriche commerciali siano già raggiunte.**


## Revisione critica del 20/10/2026
Le priorità e i test correttivi per M1, crescita città, economia, eventi, ads e marketing sono dettagliati in [AUDIT-MIGLIORAMENTI-2026-10-20.md](AUDIT-MIGLIORAMENTI-2026-10-20.md). Le osservazioni esterne vengono tenute separate dalle ipotesi di design: non considerare superati i criteri prima di prove reali.


## Revisione di prodotto v2.0
**[REVISIONE-SISTEMICA-2.md](REVISIONE-SISTEMICA-2.md)**: UX mobile per ogni schermata, loop di 3 minuti, equilibrio ricompense attive/AFK, specializzazioni, modalità, eventi, monetizzazione, acquisizione e gate di qualità. Parametri da testare, non implementazione completata.


## Revisione V3 — economia interconnessa, miniere, chiavi e personaggi
**[ECONOMIA-MINIERE-EROI-CHIAVI-V3.md](ECONOMIA-MINIERE-EROI-CHIAVI-V3.md)**: benchmark Last War / Whiteout / Last Z, struttura delle fonti e degli usi di ogni risorsa, miniera, generatore, officina, ricerca, reclutamento con chiavi/frammenti, progressione dei quartieri e simulazioni economiche da eseguire. **Sono proposte progettuali:** non sono già funzionalità del gioco.


## MASTER V4 — Fonte aggiornata trasversale
**[MASTER-PRODOTTO-BUSINESS-V4.md](MASTER-PRODOTTO-BUSINESS-V4.md)** è il riferimento più recente per divertimento, UI, asset, filiere, minigiochi, economia, monetizzazione, costi e verifiche. In caso di conflitto sul primo accesso prevale [CITTA-DA-ZERO-MASTER.md](CITTA-DA-ZERO-MASTER.md): si comincia da terreno senza edifici.
