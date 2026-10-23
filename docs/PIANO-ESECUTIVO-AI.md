> **ARCHIVIATO COME STUDIO — NON ESEGUIRE QUESTO DOCUMENTO COME PIANO.** Dal 23/10/2026 la fonte operativa è [PRODUZIONE-2-0-SPECIFICA-COMPLETA.md](PRODUZIONE-2-0-SPECIFICA-COMPLETA.md). Le intestazioni storiche «definitivo» presenti sotto sono superate. Il gioco attuale è stato respinto: prima audit visivo e gameplay, poi un nuovo target approvato. Non generare nuove funzioni seguendo liste e numeri storici.

# HOLDOUT CITY — PIANO ESECUTIVO DEFINITIVO PER L'AI
Versione 1.0 · 20 ottobre 2026 · **UNICA FONTE DI VERITÀ OPERATIVA**.
Le decisioni esplicite dell'utente in docs/DECISIONI.md prevalgono. Questo documento chiude le alternative dei precedenti studi e sceglie un prodotto. I valori numerici sono impostazioni **iniziali da playtestare**, non risultati già dimostrati. Lo sviluppo va proposto/avviato solo quando autorizzato dall'utente; qui si definisce cosa realizzare.

## 00. Decisione: che gioco stiamo costruendo
**Holdout City: Real Ad Games**. City-builder/gestionale 3D mobile in verticale, scenario zombie stilizzato adulto, avviato da **terreno vuoto senza nessun edificio**. Il giocatore è il primo superstite. Recupera materiali, costruisce il primo accampamento, accoglie persone che entrano fisicamente dalla strada, assegna lavori, attiva miniere/orti/officine, crea filiere, sviluppa tecnologia, libera quartieri e costruisce una città viva. Per ottenere altre risorse, persone, chiavi, schemi e varietà gioca a **vere modalità ispirate alle ads** (corsa, barricata, puzzle), sempre disponibili e non semplici teaser. Tutto forma UN SOLO gioco. No costruzioni o ricerche con attese, no energia per accedere a giochi, no P2W, ads solo premiate e volontarie.

**Diversità rispetto a Frozen City/Whiteout/Last War:** city-management più attivo, urbanizzazione veramente visibile dalla prima tenda alla città, niente build timers e minigiochi pubblicitari completi e ripetibili. **Differenza commerciale verificabile**, non claim sulla qualità garantita.

**Il prodotto NON è**: M1 come schermata iniziale obbligatoria; una città già pronta; un city clicker; un puzzle pack senza relazione col territorio; un live-service PvP con server e gilde in V1; 320 livelli di riempitivo; vendita di forza.

## 01. I tre pilastri e il ciclo completo
P1 **Costruisci e gestisci**: selezione terreno, costruzioni, strade, lavoratori, filiere, posizione produttori, progetti cittadini, micro-eventi.
P2 **Esci e conquista**: M1 corsa 60–90s, M2 difesa 90–150s e brevi puzzle; premi trasformati in scelte città, eroi ed equip.
P3 **Vedi la crescita**: superstiti reali, tende -> capanne -> edifici, produzioni che si animano, nuove strade, quartieri aperti e luce/attività.

**Loop da 3–8 min**: città -> scegli bisogno (materiale/abitante/progetto) -> ottimizza/recupera in città o fai minigame -> incassi -> spendi istantaneamente -> trasformazione visiva -> nuovo obiettivo. Se uno di questi anelli non è percepibile, non aggiungere contenuto.

## 02. Primo accesso, SCRIPT GIOCABILE, nessuna corsa come intro
0–20s: terreno vuoto, protagonista, macerie e rovina deposito tram visibile sullo sfondo. Primo tap raccoglie rottami (nessuna schermata menu/negozio).
20–80s: recupera 25 rottami iniziali da 3 pile; scegli posizione, costruisci falò (5) e tenda (10), animation breve, non timer. Restano 10 per banco.
80–150s: **primo superstite garantito** entra dalla strada e si unisce, appare il bisogno di un posto lavoro; costruisci banco recupero (10), assegni persona, vedi output/ora aggiornato.
150–270s: due opzioni raggiungibili con raccolta manuale e lavoratore: Orto (viveri) oppure altra fonte Rottami. Spiega con preview che scegliere cambia produzione, ma puoi sbloccare entrambe.
270–450s: un blocco di strada permette primo incarico M1 di circa 75s O intervento diretto nel campo per materiali più modesti. Premi riportati al campo; non si può rimanere bloccati senza fare M1.
450–600s: arriva altro superstite da evento/missione, il giocatore amplia il campo, scopre il primo giacimento e preview miniera, armeria, radio. Da qui libertà progressiva. Testare il pacing, non forzare 10 min esatti.

**Il tutorial insegna** recuperare, costruire, assegnare, scegliere fra due usi materiali, giocare un'attività esterna e reinvestire. Max un suggerimento visibile alla volta, possibilità di ripristinare aiuti.

## 03. Città: regole vere del gestionale
**Griglia**: celle modulari 3D (parametro mappa iniziale 24×24), edifici footprints 2×2, 2×3, 3×3 con preview, trasloco gratis, undo, no texture copiati dalle ads. Sblocchi settori aggiungono terra, giacimenti e landmark visibili.
**Tre leggi di layout**: miniere solo su giacimento; connessione stradale a deposito dà bonus logistica (+10% prova) ma non blocca se assente; adiacenza di deposito migliora capienza locale (+10% prova). No labirinti di pathfinding da correggere manualmente.
**Interazioni city ACTIVE** (non noiosi tap ripetuti): sgombera punti finiti per materiali/spazio; recluta/salva persone; assegna lavoratori; posiziona edifici/strade; seleziona moduli/ricette; progetti città (ripristina ponte/pompa acqua/deposito); scambia risorse; risolvi incidenti opzionali. Dopo le prime macerie la raccolta manuale non può battere in modo illimitato le filiere/missioni.
**Perdita**: zero raid distruttivi offline, nessuna morte per assenza, nessun esaurimento totale che impedisca continuare. Un incidente può offrire premio o piccola riduzione temporanea attività ma non sequestra l'accesso.
**Residenti**: primo garantito, altri da salvataggi, appelli radio e attrattività (posti letto, cibo, sicurezza). Competenze raccolta/agricoltura/miniera/tecnica/guardia, tratto semplice. Assegnazione libera, autoassegna GRATIS. Bisogni aggregati: riparo, viveri, sicurezza; influiscono su attrattività/efficienza, mai penalità irreversibili. Render solo NPC visibili necessari, simulare resto.
**Produzione per edificio**: se operatori insufficienti resa proporzionale; `ore = base * effetto_livello * clamp(lavoratori/slot,0,1) * (1 + competenza + ricerca + logistica)`. Bonus sommati entro limite per evitare moltiplicazione selvaggia. Produzione AFK con magazzino 8 ore baseline; resa offline calcolata all'apertura una sola volta e cap immutabile per blocco. Il cap è limite raccolta, NON tempo per costruire.

## 04. Evoluzione fisica e contenuto della città
- TERRA VUOTA: detriti, falò, tenda, banco; 1 superstite.
- CAMPO: tende, orto, recupero, barriera, 2–6 superstiti, prime scelte lavoro.
- AVAMPOSTO: giacimento/metallo, miniera, officina, magazzino, radio, 7–20 superstiti indicativi.
- INSEDIAMENTO: case, generatore, laboratorio, armeria, infrastrutture, primo quartiere liberato.
- CITTÀ: 9 quartieri obiettivo lungo termine, edifici civici, produzioni differenziate, personalizzazione e eventi.
Passaggi basati su progetti/azioni/risorse e non su timer o HQ al livello 30.
**Edifici definiti**: Falò/Piazza (attrattività), Tende/Case (capacità), Recupero (rottami), Orto (viveri), Miniera (metallo), Magazzino (cap), Officina (componenti/attrezzi), Radio (missioni reclutamento), Guardia (difese e sicurezza), Generatore (energia non stamina), Laboratorio (ricerca), Armeria (loadout armi), Mercato (scambi), Infermeria (abilità supporto). Non è necessario mostrare 14 strutture al primo minuto; funzioni disponibili con gli stadi.
**Modulo edificio**: 2–3 opzioni max con scelte intelligenti. Miniera: trivella = resa, carrelli = capacità, alloggiamento = più posti. Non 10 livelli che fanno solo +5%; ogni milestone cambia modello visivo o funzione. Rami NON esclusivi permanentemente.
**Quartieri**: ciascuno contiene problema locale, missione, nuova superficie, landmark o deposito; non solo paga monete->verde. Recupero tram come landmark, non edificio pronto.

## 05. Economia: otto categorie sufficienti, zero inutilità
**Base** Rottami e Viveri, dal primo minuto, fonti city/missioni; **intermedio** Metallo e Componenti, con miniera+officina; **avanzato** Energia (impianti/tecnologie, NON stamina) e Schemi (nuove funzioni); **progressione eroi** Chiavi e Frammenti (in roster).
Regola per aggiungere risorsa: >=2 fonti ripetibili, >=2 utilizzi significativi, nessun deadlock. Chiavi/frammenti sono token con percorso garantito, NON drop monetizzati misteriosi.
**Ricetta benchmark iniziale da test** 12 Rottami+8 Metallo -> 4 Componenti, immediata. Si spende per miniere/armi/difese o sviluppo civico. Mercato non deve creare arbitraggio positivo tramite cicli conversione. Non aggiungere 5 risorse alimentari intermedie finché i giocatori non le desiderano.
**Compatibilità playstyle** City-only progredisce tramite raccolta/produttori/progetti locali; Action-only ottiene materia e premi ma deve investire nella città; misto è più flessibile. Schemi/Chiavi disponibili da missioni e traguardi urbani, non una singola modalità obbligatoria.
**Equilibrio**: simulatore config in dati per 5/15/30/60 min giorno, 0/8/24h offline, 0/1/3 ads, city-only/action-only/misto, su 30 giorni. Output: tempo primo eroe/miniera/quartiere, risorsa limitante, missioni per upgrade, cap raggiunto, inflazione, materiali invendibili. Tuning prima del lancio.

## 06. Eroi, reclutamento, equip e altri sblocchi
**Residenti ≠ Eroi**. Gli otto eroi progettati restano roster prospettico; per slice solo Lince e un secondo diverso, per V1 tre solidi poi espandere. Ogni eroe ha abilità M1/M2 (dash, precisione, granata, scudo, rallentamento ecc.) e possibile utilità cittadina non obbligatoria. Non 20 livelli +1% identici.
**Radio** offre contratti recluta e chiavi ottenibili giocando. **Regola definitva: reclutamento NON casuale** per V1: ogni chiave dà una unità di progresso eroe selezionato, 30 chiavi/frammenti per sbloccare nuovo eroe come parametro iniziale; alcuni traguardi danno pacchetti deterministici. Lo sblocco non richiede 30 sessioni: prime chiavi in milestone early, prima alternativa giocabile durante la prima settimana (target più presto nei test). Duplicati dopo max convertiti in universal shard 1:1. Non vendere chiavi.
**Equip**: 3 tipi funzionali di arma M1 (SMG sustained, shotgun gruppi, perforante allineamenti) e 3 difese M2 (mitragliatrice, area, barricata) nella prima versione. Progetti trovati in missioni/ricerca sbloccano varianti; craft immediato; equip non sostituisce abilità del giocatore.
**Oggetti collezionabili futuri**: moduli produzione/difese e decorazioni da quartieri. Non introdurre gacha arma + gacha eroe + gacha edificio insieme.

## 07. M1 LA CORSA — game design bloccato
**Run singola 60–90s**, non 8 livelli sequenziali. Avanti + fuoco automatici; trascinamento laterale a 3 corsie CONTROLLABILI con squadra sempre nella stessa corsia. Partenza un protagonista e arma base, **mai ×3 iniziale senza tre unità reali**.
- 0–10s: entra nel fuoco, SCELTA esclusiva fra SMG e shotgun o altro accoppiamento leggibile.
- 10–25s: target crate (recluta/equip) vs zombie che ti raggiungono.
- 25–45s: ostacolo da schivare + nemico corridore telegrafato, scelta posizione.
- 45–65s: armi, nemici corazzati/ranged combinati e barriera; un modo abile di ottenere bonus, uno più prudente.
- 65–85s: estrazione/mini-finale, non boss gigantesco sempre.
**Tradeoff** fuoco dedicato a casse sottrae difesa; pickup esclusivi; corsie cambiano bersagli e danni/guadagno; armi con match-up opposti; alleati conquistati forniscono vantaggio ma si possono perdere. Spawn solo davanti oltre margine telegraph, no spawn addosso/alle spalle, zero scomparsa in vista, corsia sicura raggiungibile. Menù risultati rapido, premio immediato.
**Test blocco** giocatore fermo deve perdere opportunità o subire danni; nessuna arma domina; 0 spawn ingiusti; 5 tester riconoscono cosa hanno scelto e vogliono rigiocare; anche il giocatore debole può vincere il primo run con comprensione, non fortuna.

## 08. M2 BARRICATA — diverso da M1
**90–150s**. 10–15s piano di difese su poche piazzole; 2–3 assalti con segnale di ingresso. Budget costruzione locale dentro missione, indipendente dai Rottami città. Scelta layout: barricata devia nemici (non blocco irreversibile), torre singolo vs area, intervento eroe con una abilità. Vince cancello con HP>0 dopo ultimo assalto; perde a 0. Ricompense Componenti, materiali difesa, progresso protezione quartiere. Una partita ripetuta può avere provenienza orde differente, mai RNG impossibile. Niente 5–8 ondate e 3–5 minuti come base.

## 09. M3–M5 puzzle brevi, ognuno ha funzione nel mondo
M3 Perno 20–45s: salvo superstite e faccio arrivare scorte, fisica verificata, restart immediato; produce persone/viveri.
M4 Disegno 20–40s: tratto protettivo a lunghezza limitata, simulazione 10s, touch tollerante/snap e soluzione verificabile; premi progetti/rescue.
M5 Via libera 30–60s: sblocco bus/corsia mediante mosse controllate, non cronometro reale, undo; apre area e materiali.
**Release scelta:** M1 e M2 + M3 come prime tre modalità forti. M4 e M5 **solo dopo** che la prima beta funziona e non a costo del gestionale. Tutte le modalità pubblicate restano sempre giocabili. 320 livelli NON sono criterio di lancio. Non vendere nei trailer M4/M5 finché assenti.

## 10. Eventi/missioni/retention
- Giorno: 3 incarichi dinamici correlati a necessità reali della città (es. 2 viveri, salva una persona, ricostruisci un modulo), con alternative e nessun obbligo di ads.
- Settimana: progetto di quartiere multi-step e una modalità con modificatore, premio prima utilitario poi cosmetico; non bloccare modalità fuori evento.
- Mese: nuovo tema/progetto cittadino con asset riusati, premi collezionabili e un piccolo numero di contenuti nuovi sostenibili da solo.
- AFK restituisce materiale solo da edifici già operativi con cap, nessun «torna esattamente alle 03:00».
- Progressione: chi gioca 5 min vede un passo concreto, chi gioca 20 min diverse scelte, chi gioca 60 min non rompe economia in un giorno. Da verificare tramite simulatore.
- PvP, alleanze, server realtime e classifiche con premi = **non V1**.

## 11. UI/UX definita schermata per schermata
**Home sempre sulla città**, inizialmente vuota. Header adattivo: Rottami/Viveri poi Metallo; Energia/Schemi nel wallet esteso; chiavi solo tab Eroi. Niente 6 valute al primo minuto.
**Gestione**: tap maceria (raccogli), persona (assegna), edificio (bottom sheet con «produce X/h, operatori Y/Z, upgrade X→Y, costo, effetti»), terreno (costruisci), strada (espandi), deposito (raccogli).
**Bottom navigation quando sbloccata:** Città, Gioca, Eroi, Incarichi; shop non tab principale. CTA «Mi mancano 20 Metallo» → elenco fonti → missione o miniera.
**Cantiere:** modello ghost verde/rosso, rotazione/snap, conferma/annulla, spostamento gratuito.
**Missioni:** card con durata, obiettivo, premio base, premio speciale e personaggio selezionato; start in massimo 2 tocchi dalla città.
**HUD M1:** progress, armi riconoscibili, salute/alleati, un'abilità; il centro deve mostrare zombie, non numeri.
**HUD M2:** cancello HP, budget locale, mappa delle ondate, barra difese e abilità; non affollare controllo eroe.
**Eroi:** roster, skill anteprima, progress a recluta, chiavi, obiettivo «Dove ottenere», equip/loadout.
**Risultati:** ricompensa, pulsanti «Torna alla città»/«Rigioca», rewarded facoltativa discreta.
**Accessibilità:** dimensioni touch ~48dp, icona+colore, slider audio/musica, vibrazione disattivabile, pause, testi IT/EN, safe area/dynamic viewport e 30/60 fps option.

## 12. Arte, asset, sonoro, performance
**Direzione scelta:** post-apocalisse stilizzata semirealistica/low-poly pulita, colori spenti nel terreno desolato che diventano più caldi con crescita, personaggi adulti leggibili in 3D senza gore; camera inclinata città e camera corsa verticale; non stili diversi per ogni modalità.
**Pipeline** assets: Quaternius per città/sopravvissuti/zombie + Kenney per camping/props/UI/SFX dopo verifica LICENSE per file. Nessun screenshot o video concorrente usato come asset. Uniformare scala (metri), materiali, rig umanoide, palette, ombre, LOD e texture atlas. **Lista asset necessaria** 1 terreno modulare, 2 tende, 1 falò, 1 banco, 1 orto, 1 miniera, 1 officina, 1 magazzino, 1 radio, 1 casetta, strade, 3 eroi, 4 zombie, 3 armi, 3 torri, 5 props interattivi, 3 varianti edifici, circa 20 icone; prima persona tecnica fa audit licenze, non import massivo.
**Performance**: mantenere Babylon.js + Capacitor (codice esistente). Instancing/VAT per orde, render residenti vicini, economia a dati, pooling oggetti, compressione texture e profiling. Target S25 60 fps con opzione 30 fps per low-end, app stabile in background e recupero salvataggio.
**Audio**: loop campo discreto (falò, lavoratori) -> attività urbana; suoni miniera/officina distinti; armi hit e danno leggibili; no loop musicali pressanti. Font e musica con prova licenza.

## 13. Technical game architecture, AI contracts
**Repository non va riscritta**: riutilizzare beta M1, tool e asset attuali. Città come moduli: `WorldState/CityGrid/Residents/Production/Inventory/Unlocks/Crafting/Research/HeroRoster/Missions/Rewards/Save`. Una sola fonte dati per costi/produzioni/item/ricette/reward/missioni; separazione runtime logic-render; saves versionati con migrazioni e reward transaction ids per evitare doppio payout dopo crash.
`MissionResult = {missionId,runId,win,duration,rewards:{scrap,food,metal,components,energy,schematics,keys,shards},survivorsRescued,score}`.
Ogni ricompensa e costo con id tipizzato, test deterministic, no client trusting per future competitive.
Invariante: produzione offline delta clamp al cap, timestamp e migrazione; no reward ripetuti su ricarica app; input overlay non blocca gesture city.
No codice nuovo senza test automatico + prova sul telefono per ogni milestone. Le specifiche docs/CITTA-DA-ZERO-MASTER.md e docs/M1-CORSA.md sono evidenza di lavoro, ma **in caso di conflitto prevale questo piano operativo** (salvo decisioni utente).

## 14. Pricing, pubblicità, ricavi, costi — scelte chiuse
**Modelo F2P**: no forced interstitial/banner; **rewarded SOLO volontarie**, scelta informata e ricompensa certa dichiarata. Prima proposta: +30% MATERIALI comuni una volta dopo vittoria, max 3/die; +1 raccolta AFK opzionale limitata. Nessuna chiave eroe/schemi unici/revive necessario dietro ads. In caso di video assente si gioca senza interruzione.
**IAP al lancio**: tre offerte soltanto, per ridurre UX e manutenzione: Pass Comandante ONE-TIME €4,99 (preset città, statistiche avanzate, editor visivo di replay se fattibile; NO comodità basilari trattenute ai free), stile città €2,99, skin squadra €2,99. Altri cosmetici solo se acquistati davvero; no support tip ambiguo. No vendite di armi, risorse, eroi, chiavi, energia o acceleratori timer.
**Formula ricavi ADS**: `DAU * completed_rewarded_per_DAU * 30 * eCPM/1000`; usare tre ipotesi (eCPM €3/€6/€9, 0.3/1/1.5 video/DAU), NON forecasts. `IAP gross = buyers * prezzo_medio` meno imposte, commissione regione/programmi Play, rimborsi. **NON fissare il 15% universale**: Google ha cambi fee in 2026, rollout differenziato.
**Costi**: Play Console fee una tantum, hosting dominio/CDN, data analytics e crash (quote free non illimitate), backend cloud/identity, retention privacy, audiolibrary/font, eventuali assets premium, QA su dispositivi, tasse e commercialista, marketing. Budget minimo: riuso assets CC0, Cloudflare Pages, test gratis prima dei servizi cloud costosi; impostare budget cap/alert 5/20/50€ sulle integrazioni disponibili.
**Se 1000 utenti giocano ma guardano 0.4 rewarded/DAU a €4 eCPM => €48 lordi/mese**, quindi nessuna promessa «pubblica e guadagni». Profitto dipende da utenti che ritornano e costi.
**Marketing**: sito beta online + 3 clip REALI: terreno vuoto→campo; M1 scelte reali→bottino→miniera; quartiere distrutto→restaurato. Misurare visitatori→primo oggetto→prima tenda→prima missione→ritorno D1/D7. Shorts/Reels/creator/community prima di paid UA.

## 15. Norme e lancio: FATTI DA RICONTROLLARE
Nuove app Play, dal 31 agosto 2026: Android 16/API36 target, fonte ufficiale https://support.google.com/googleplay/android-developer/answer/11926878 .
Google AdMob: rewarded con opt-in esplicito, premio divulgato prima dell'ad, eventi earned reward e dedup https://support.google.com/admob/answer/7313578 .
Fee Google Play 2026 rollout https://support.google.com/googleplay/android-developer/answer/16954621 — valutare geografia, categorie, termini account. GDPR, CMP/UMP, Play Data Safety, privacy policy, cancellazione account, asset CC0/CC-BY, Play Billing, classificazione età, closed testing secondo tipo account, commercializzazione in Italia da verificare con professionista. Non fare affermazioni che un modello non ha requisiti legali solo perché non c'è gacha.

## 16. FASI PER L'AI — ORDINE NON NEGOZIABILE
**Fase 0 AUDIT REPO**: branch di lavoro; leggere docs/DECISIONI.md + questo file + CITTA-DA-ZERO-MASTER.md; inventario struttura game/src, beta, livelli M1, asset e licenze; test esistenti; report di elementi riusabili vs da rifare; backup prima di migrazioni.
**Fase 1 CITY VERTICAL SLICE**: scena vuota, drag camera, raccolta macerie, falò+tenda+posto lavoro, ingresso superstite, assegnazione, produzione dati+AFK, save/restart, progressione visiva. Demo web S25, senza ads.
**Fase 2 LOOP COLLEGATO**: M1 v3 75s corretto, reward transazionale, rientro campo, upgrade banco/orto che cambia un'azione, una persona recuperabile, screenshot/video 2–3 minuti di vero loop. Zero bug spawn invisibile; test umano.
**Fase 3 DEPTH**: miniera, magazzino, officina, filiera, edificio moduli, quartiere, radio, primo eroe sbloccabile via chiavi; simulatore economy 30gg.
**Fase 4 MODALITÀ**: M2 defense completa e una sola puzzle M3; due sistemi diversi già divertenti, altre puzzle solo dopo criterio qualità.
**Fase 5 PRODOTTO**: UI finalizzata, assets/art coherence, 3 eroi, incarichi giornalieri e settimana, eventi riutilizzabili, 2 quartieri giocabili (9 roadmap), tutorial di 10 minuti e localizzazione EN/IT, QA telefono low-end.
**Fase 6 COMMERCIALE**: analytics, consenso, AdMob rewarded test, billing, IAP definiti, salvataggio cloud se giustificato, store metadata, privacy, AAB API36, closed testing, soft launch e analisi retention.
**Fase 7 POST-LANCIO**: M4/M5, espansioni città, altri eroi, altri quartieri ed eventuale PC, solo sulla base dei dati. PvP/gilde non prima di revenue e retention sufficienti.

**Milestone indipendenti** ogni fase mostra demo e test sul S25, non una lista di file modificati. Non iniziare fase successiva con bug bloccanti nella precedente.

## 17. Acceptance tests quantitativi e decisionali
- Primo tap utile <10s, prima costruzione <2m, primo superstite <3m, nessun minigame obbligatorio prima del primo accampamento.
- 5 tester nuovi: almeno 3 scelgono volontariamente una seconda attività di città e almeno 3 rigiocano M1 senza premio aggiuntivo; obiettivi di prova, NON garanzia.
- Città 10m: almeno 3 decisioni differenti con tradeoff; se è solo raccolta e bottone upgrade bocciata.
- M1 60–90s, almeno 2 scelte realmente diverse, 0 spawn a contatto, 0 despawn visibile, armi funzionalmente differenti, se fermo esito peggiore.
- M2 almeno 2 configurazioni difesa valide contro stessa minaccia e intervento eroe che cambia esito.
- Economia 30gg: 0 deadlock con nessun lavoratore, 0 componenti senza sink, AFK non supera sempre progressione attiva, nessun eroe unicamente ottenibile ads/pagamento.
- Save/rientro: 0 perdite/duplicati inventario dopo crash; resistenza anche offline/chiusure.
- Store: gameplay mostrato davvero presente, performance e consensi validati, telemetria avviata dopo consenso applicabile.
- Revenue test: differenza giocatori con/senza rewarded, D1/D7, first-week retention, conversione IAP e per-paese eCPM; NO budget marketing prima della misurazione.

## 18. Prompt operativo per qualsiasi AI/Codex/Claude
Sei lead game developer e product owner tecnico del gioco Holdout City nel repository Spidahh/AndroidGAME.
1. Leggi docs/PIANO-ESECUTIVO-AI.md, docs/DECISIONI.md, docs/CITTA-DA-ZERO-MASTER.md, docs/MASTER-PRODOTTO-BUSINESS-V4.md. In caso di conflitto segui le decisioni esplicite dell'utente, poi PIANO-ESECUTIVO-AI; tratta i precedenti come ricerca storica.
2. Fai inventario del codice esistente. Non migrarlo a un altro engine, non riscrivere ciò che già funziona e non scambiare i test bot per divertimento umano.
3. Mantieni Babylon.js/Capacitor, una sola economia e dati condivisi per città/minigiochi/eroi, UI responsive mobile, save versionati.
4. Lavora nell'ordine delle fasi, producendone una build provabile e test verificabili prima della successiva. Mai implementare monetizzazione prima di aver validato il gameplay.
5. Per ogni modifica dichiara: obiettivo, file toccati, screenshot/build demo, test eseguiti, numeri misurati, bug non risolti, compatibilità con il progetto.
6. **Non aggiungere idee, risorse, valute, abilità o modalità fuori da questo piano** senza motivazione, impatto economico e verifica della decisione dell'utente. Non nascondere difetti dietro percentuali, difficoltà arbitraria o molti livelli.
7. Implementa una V1 DIVERTENTE e commerciante che rispetta i vincoli; qualità e giocabilità prima della quantità.


---

# REVISIONE CRITICA V1.1 — CONTRADDIZIONI RISOLTE E NUOVI COLLEGAMENTI
20 ottobre 2026. **Questa sezione modifica espressamente le parti precedenti quando contrastanti.** Le ragioni sono verificate contro il resto della documentazione e le lamentele documentate dei giocatori, non aggiunte decorative.

## R1. Grave: 30 chiavi per un nuovo eroe + nuove chiavi solo tramite modalità = progressione frustrante
**Precedente**: una chiave = un frammento e soglia 30, ma prima alternativa «durante la prima settimana». Non determina il ritmo e, se si guadagna 1 chiave/die, impone 30 giorni.
**Correzione DEFINITA**:
- Primo eroe giocabile: Lince. Un secondo eroe (Falco o Rocca, da scegliere mediante una missione narrativa) entra come **ricompensa garantita entro circa 20–30 minuti di gioco attivo cumulato**, non come gacha.
- Dal terzo eroe: contratto radio a obiettivi chiari + raccolta **frammenti dedicati o universali**, soglia proposta 12 per prova, non 30 chiavi separate e 30 frammenti. Le **chiavi non sono una seconda tassa**: ogni chiave è un credito di reclutamento convertibile direttamente in un frammento universale oppure in una scelta fra due dossier dal contenuto noto. No chiavi e frammenti obbligatori contemporaneamente per lo stesso sblocco.
- Gli eroi NON sbloccano la possibilità di assegnare più lavoratori a miniere/fonderie; questo dipende dagli edifici. Hero skill solo vantaggi attivi e piccole specialità, **nessun lock economico**.
- Test: senza Radio migliorata e senza acquisti è possibile sbloccare almeno 2 eroi e tutte le produzioni di base in tempi ragionevoli. Il ritmo dei successivi è tarato nel simulatore.
**Conferma esterna**: reclami Frozen City su miniere/fonderie rallentate dalla mancanza casuale di eroi https://apps.apple.com/gb/app/frozen-city/id1637040599?platform=iphone&see-all=reviews .

## R2. Contraddizione: «5 modalità permanenti» vs «solo 3 al lancio» e shop promesso per 5
**Correzione DEFINITA**: la prima pubblicazione commerciale promette **M1 Corsa, M2 Barricata, M3 Tira il perno** e città. M4 e M5 restano roadmap pubblicamente annunciabile SOLO come «in sviluppo» con cautela, mai icone tappabili finte o screenshot nello store. In V1 le 3 modalità sono permanenti e ripetibili. Per il nome store «Real Ad Games» non promettere «tutti i giochi delle ads».
- Prima beta: città + M1. Release candidate: M1/M2/M3 divertenti + economia/eroi.
- M1 resta un minigioco di 60–90s; M2 90–150s; M3 20–45s.
- Non creare 40+40+240 livelli prima della verifica. Meglio 3 sistemi profondi e pochi incontri rifiniti.

## R3. Contraddizione: il city builder è attivo ma la raccolta manuale finisce presto, e si rischia l'autoplay
**Correzione DEFINITA**: tre famiglie di interazioni urbane sempre disponibili, con costi/opportunità:
A) **Progetti di recupero a tappe**: liberare strada, pozzo o giacimento ha 2–3 piccoli incarichi (reperire materiale, assegnare operatori, scelta intervento), dà un risultato permanente visibile; dopo aver finito un progetto ce n'è un altro in uno dei settori disponibili.
B) **Contratti di produzione**: consegna richiesta dai residenti (viveri, componenti, attrezzi) con scelta consegnare o spendere su potenziamento; consegna è sempre facoltativa, premio modesto + attrattività; non moneta aggiuntiva.
C) **Layout/assegnazione**: lavoratori, strade, spostamenti, moduli e ricette, effetti immediati. Non introdurre eventi casuali punitivi come unica attività cittadina.
**La raccolta iniziale delle macerie è finita**, perché non deve diventare un pulsante di risorse infinite. Progetti e contratti sostituiscono il loop tap-to-claim. Riutilizzano gli stessi asset e sistemi; non aggiungere 10 minigiochi in città.

## R4. Rischio: il mix sempre più efficiente forza chi ama solo city oppure solo arcade
**Decisione**: ogni materiale usato per progredire nella città ha due canali di acquisizione, almeno uno cittadino e uno missione/scambio. Le missioni possono premiare Schemi/Chiavi più velocemente, ma **nessun progetto essenziale deve esigere un drop casuale**.
- Il prodotto non deve imporre lo stesso numero di sessioni ad attività diverse; bilanciare per **tempo di attenzione attiva** e qualità, non per quantità di tocchi.
- Profilo city-only non deve avere softlock; può avere progressione più lenta e differenze di estetica/build, ma non essere penalizzato con ricerca impossibile.
- L'economia ha tre profili con report: city-only, arcade-only (che torna in città per spendere), misto. Nessun profilo scade in 30 giorni.

## R5. Problema della produzione AFK: persone e fabbriche senza operatore bloccano risorse anche a tutorial completato
**Correzione**:
- Primo superstite garantito, secondo guadagnabile con progetto cittadino anche senza M1. Una riserva di materiali base è recuperabile da contratti e sgombero, mai produzione +0 permanente senza soluzione.
- Edifici produttivi richiedono lavoratori; **il lavoro può essere riassegnato istantaneamente gratis**. In condizioni di carenza UI mostra «Sposta 1 addetto dall'Orto alla Miniera» come suggerimento facoltativo.
- Nessun personaggio eroico speciale per poter aprire uno slot operaio. Mai spopolamento durante offline.
- Se casa piena, nuova persona salvata va in **lista ospiti** senza perdita finché costruisci alloggio; nessun countdown.

## R6. M1 e città: upgrade armeria rende inutile scegliere le armi durante la corsa
**Soluzione**: l'Armeria sblocca il **pool delle opzioni offerte durante la run** e un loadout base selezionabile, ma la corsa continua a offrire pickup alternativi con svantaggi. L'upgrade non garantisce arma top in partenza e non raddoppia DPS senza limite.
- M1 calibra il budget nemici sulla difficoltà selezionata con range ragionevole, NON sul power score nascosto per penalizzare chi migliora.
- Vincere una run con un nuovo eroe può avere una variante obiettivo, non buff lineare che automatizza tutto.

## R7. Economie e tecnologie: due bonus analoghi inutili o arbitraggio
**Decisione**: un registro di dipendenze centralizzato; ogni edificio/modulo/ricerca esplicita 1 funzione principale e al massimo 1 secondaria. Niente doppione «+5% raccolta» da 5 sistemi.
- Produrre energia NON drena risorsa per tenere accesi edifici di base: Energia è materiali tecnologici usati per sblocchi, non una barra che può spegnere la città.
- Ricette e Mercato devono rispettare `valore_output < valore_input` nella conversione reversibile, incluse ricerche e sconti. Test per cicli arbitraggio.
- Schemi sono progetti a traguardi, non risorsa richiesta da ogni micro-upgrade; altrimenti diventano un bottleneck universale.
- Ogni quartiere offre almeno un'opportunità nuova (giacimento, edificio, missione, miglioramento visivo), non solo 25 spazi vuoti.

## R8. Premi: ripetibilità vs economia infinita
**Scelta**: le modalità restano sempre rigiocabili senza energia, MA il payout per minuto deve rispettare la progressione.
- Ricompensa base per completamento e bonus per abilità, con curva di tier in base al progresso cittadino.
- La prima vittoria dà bonus di scoperta; le repliche non diventano inutili (non scendere a 0 o bloccare dopo 1 al giorno).
- Se i giocatori farmano sempre lo stesso livello più facile, un **sistema di contratti mirati** rende vantaggiosa la varietà senza azzerare i premi base. Nessuna penalità nascosta al ripetitore.
- Calcolare rendimento/minuto e includere tempi menu/transizioni. Verificare exploit restart, crash e back-button Android.

## R9. IAP/ADS: tre prodotti in V1 ma una delle feature premium richiede costosa registrazione video
**Correzione**: non vendere funzioni non implementate. Pass Comandante al lancio solo **preset layout città salvabili (3) + estetiche interfaccia e statistiche avanzate** se effettivamente finite. **Raccolta unica, spostamento strutture, fast-forward animazioni e condivisione screenshot restano free**. L'editor replay e clip non è promessa commerciale iniziale.
- Se il Pass è troppo debole per convertire, NON introdurre ritardi artificiali alla versione free: espandere solo con decorazioni premium o sospendere Pass, piuttosto che degradare UX.
- Rewarded +30% solo Rottami/Viveri/Metallo in una quantità chiara, max 3 al giorno, senza obbligo per sostenere gli upgrade.
- Regole Google rewarded e fiducia giocatori: https://admob.google.com/home/resources/rewarded-ads-playbook/ ; https://publishers.google.com/insights/quality-drives-value/ .

## R10. Tecnica e asset: limitare lo scope prima di comprare arte
**Decisione**: 1 kit centrale di edifici modulari, 1 pack superstiti/zombie compatibile, 1 palette e set shader per tutto il gioco. Un artista AI o developer deve prima produrre uno screenshot vero **falò+tenda+orto+miniera+officina con personaggi** coerente prima di importare 300 asset.
- Rig/animazioni compatibili e scala su Babylon verificate con una scena tecnica; audit licenze per ogni file, soprattutto componenti PolyPizza che possono essere CC-BY.
- Niente NPC con pathfinding infinito su tutta la mappa: solo nelle zone visibili, simulazione aggregata per le produzioni.
- Tablet e schermi diversi: camera zoom e safe area responsive, no UI pixel-specific.
- Stato progetto e bug legati a commit e prove reali: gli script bot non valutano divertimento.

## R11. Misure non arbitrarie da annotare
Strutturare dashboard QA con: tempo prima tenda; tempo primo abitante; completamento M1; 2ª run volontaria; cambio lavoratore volontario; costruzioni/minuto; fonti di Rottami; tempo sblocco secondo eroe; sessione; % utenti che fanno solo city, solo minigiochi, misto; ad opt-in; D1/D7. Ogni numero target è un **obiettivo di test, non un fatto**.
**Il problema più importante da misurare**: quanti utenti passano da «ho costruito una tenda» a «voglio tornare domani per il mio accampamento» senza essere spinti da timer.

## R12. Verifica incrociata con i concorrenti
- Frozen City: eroi casuali che bloccano l'estrazione sono lamentati negli store e recensioni https://apps.apple.com/gb/app/frozen-city/id1637040599?platform=iphone&see-all=reviews ; https://justuseapp.com/en/app/1637040599/frozen-city/reviews .
- Last War: giocatori vogliono poter rigiocare Frontline senza limitazioni https://www.reddit.com/r/LastWarMobileGame/comments/1u6orgs/frontline_breakthrough/ ; bug di corsie che infliggono danni inevitabili https://apps.apple.com/md/app/last-war-survival/id6448786147?platform=iphone&see-all=reviews .
- Il manuale Google Ads sottolinea il flusso richiesta -> visualizzazione -> ricompensa -> utilizzo: la nostra reward deve essere spendibile in un miglioramento visibile https://admob.google.com/home/resources/rewarded-ads-playbook/ .

## R13. Criterio di completamento revisione
Il progettista AI deve rispondere per ogni feature a quattro domande: «cosa decide l'utente?», «cosa rinuncia scegliendo?», «quale conseguenza vede subito?», «perché vuole tornarci?» Se non ci sono risposte concrete, la feature va tagliata, semplificata o collegata ad altri sistemi. Non aumentare numero risorse, tier, livelli o ads come sostituto.
