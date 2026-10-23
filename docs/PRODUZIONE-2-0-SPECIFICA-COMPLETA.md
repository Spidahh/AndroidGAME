# HOLDOUT CITY — PRODUZIONE 2.0: SPECIFICA VINCOLANTE
23/10/2026 • STATO: decisioni di design da sottoporre a verifica visiva e playtest; NON chiamare codice esistente approvato.

## 0. Il problema che questa versione risolve
Le versioni precedenti sono verbose, contraddittorie e **non traducono in elementi verificabili il risultato visivo e ludico voluto**. Documento nuovo = specifica di realizzazione + matrice prove. Lo stato della build NON è certificato: prima serve audit screenshot/video. Il prodotto deve assomigliare a un moderno city-builder mobile con vere attività, non a prototipo web, tessere CSS o scene fatte di primitive.

## 1. Visione irrevocabile (dall'utente)
Il giocatore ARRIVA IN UN TERRENO ABBANDONATO, senza una città e senza edificio costruito. Costruisce un piccolo accampamento, accoglie superstiti **visibili nel mondo**, organizza lavori/risorse, espande campi/miniere/officine/filiere, crea un avamposto, poi villaggio e città viva. Il gestionale urbano DEVE essere divertente e attivo da solo; M1 corsa, M2 barricata e puzzle reali/sempre giocabili alimentano l'economia e offrono varietà. Android portrait, asset professionali adatti e coerenti, no attese per costruire, no P2W, pubblicità premiate e facoltative.
**Posizionamento:** dalla desolazione a una città da gestire e difendere, guidata dalle proprie scelte. Visivamente aspirazionale: la crescita diventa più ricca e attraente. Niente grafica infantilizzante o piattume casuale.

## 2. Grammatica del divertimento: 4 momenti
1. **Scoperta:** un superstite compare fisicamente, un relitto mostra potenzialità, un nuovo giacimento viene rivelato.
2. **Decisione con costo-opportunità:** 2 addetti disponibili → orto o miniera? componenti → nuova trivella o torre? sbloccare una zona abitativa o produttiva?
3. **Azione visibile:** si vede persona lavorare, macchinario animarsi, operaio trasferirsi, edificio cambiare aspetto, strada popolarsi.
4. **Conseguenza in una sessione:** nuova risorsa o attività accessibile, migliore capacità, quartiere trasformato, eroe giocabile.
Ogni feature nuova DEVE coprire questi momenti oppure essere un mero strumento di supporto. No 'tocca per +5%' come contenuto.

## 3. Apertura completa (target di prova)
### Scena 0 — 0–45 sec
Terreno abbandonato, suolo dettagliato + rovina riconoscibile all'orizzonte; un protagonista con animazione idle. Camera bella e giocabile, nessun menu che copre il mondo. Tocca accumulo detriti → personaggio cammina, raccoglie, feedback materiale; **nessuna comparsa istantanea di numero senza animazione**.
### Scena 1 — 45–120 sec
Due interventi: liberare una piazzola, piazzare falò e tenda *con ghost 3D e conferma*. Il terreno assume identità di campo, suoni ambiente, illuminazione del falò, oggetti di contorno. Prima decisione di posizione almeno reversibile.
### Scena 2 — 120–210 sec
Superstite compare da punto di accesso fuori camera, percorre sentiero visibile, chiede ingresso; accoglienza, occupazione/abitazione. **Non spawn dentro la tenda**. Costruisci postazione recupero, assegni addetto e si vede lavorare, output/h reale in pannello.
### Scena 3 — 210–360 sec
Disponibili due azioni con risultati diversi: aumentare recupero o sviluppare orto; la scarsità di lavoratori e materiali è leggibile. Premiati cambiamento e strategia, non click. Mostrare preview produzione prima e dopo.
### Scena 4 — 360–600 sec
Nuovo superstite o segnale d'aiuto; strada bloccata o deposito da recuperare; scelta fra progetto urbano (più lento ma possibile) e minigioco M1 (più attivo e redditizio). Esito missione → componenti/cibo → primo vero upgrade visibile. Libertà di proseguire nel campo.
**Solo baseline**: obiettivi temporali e costi sono numeri da testare. Primo gioco punta a far riconoscere l'identità del prodotto entro un minuto, senza completare tutorial rigido obbligatorio.

## 4. Design della mappa e crescita
- **Una stessa mappa persistente** che passa da area desolata a campo, avamposto, insediamento, città.
- Zona iniziale con POI leggibili: suolo edificabile, cumuli rottami, strada di accesso superstiti, rovina deposito tram/landmark, un giacimento ancora chiuso. Questi POI anticipano obiettivi a lungo termine.
- Composizione urbana: strade e piazze ricostruite, zone produttive, abitative, infrastrutture; quartieri NON identici per palette casuale.
- Regole di posizionamento: miniera su giacimento, accesso stradale per bonus leggibile, produttori vicini a magazzini per logistica; **spostamento gratuito, undo**, nessuna posizione irreparabile. Road snap e no sovrapposizioni.
- Ogni zona sbloccata richiede **un progetto completato o una missione pertinente**, NON solo tocco paga monete. Zona offre terreno + elemento nuovo (giacimento, landmark, incarico, funzione, residenti) + trasformazione visiva.
- Finché non c'è prova di fattibilità, in V1 bastano **zona iniziale + 2 espansioni differenziate**; 9 quartieri sono backlog, NON commitment del primo rilascio.

## 5. Sistemi: risorse, conversione, popolazione
RISORSE introduzione progressiva:
- Rottami = costruzioni base, riciclo; Viveri = ospitalità e civico; accessibili inizialmente.
- Metallo = giacimenti/miniere/recuperi; Componenti = officina da rottami + metallo.
- Energia = risorsa tecnica per ricerca NON stamina, da introdurre solo se crea decisioni interessanti; Schemi = sblocchi specifici, non «tassa su tutto».
- Chiavi / frammenti = reclutamento eroi, in inventario dedicato. **Non rendere entrambe obbligatorie per uno stesso premio**.
ECONOMIA: ogni risorsa almeno 2 fonti e 2 usi; fonte attiva sempre disponibile, niente ricette circolari o dipendenza da eroe premium; produzione offline **solo** in strutture con lavoratori e entro cap. Gli upgrade sono istantanei quando si possiedono materiali.
SOPRAVVISSUTI: tre vie distinte: arrivo narrativo iniziale, salvataggio nelle attività, attrattività del campo; un unico roster residenti con professione/competenza semplice e lavoro assegnato, indicatori aggregati posti letto / cibo / sicurezza. **Non morte da fame offline**. Assegnazione gratis e autoassegna gratis. Render agenti entro budget, resto economia simulata.
**No sistemi zombie invasivi nella città di continuo**: minacce come missioni e scelte, non sabotaggi offline.
CRAFT: immediato e con ricette dai materiali veri, senza timer; officina trasforma in componenti spendibili da più edifici. Research sblocca opzioni e produttività, non serie di +1% casuali. Registro per ogni ricetta: input, output, prerequisito, fonte, sink, grado, condizione economica.

## 6. Contenuti V1 con profondità invece di quantità
CAMP: Falò/Piazza, Tenda/Case, Postazione rottami, Orto, Miniera, Officina, Magazzino, Radio, Guardia, Armeria, Laboratorio, Generatore. **Non sono 12 icone ferme**: alcune evolvono di aspetto e funzione, alcune sono moduli interni. Abitanti che lavorano davvero, produzioni e layout cambiabili.
EROI: starter Lince + secondo eroe **garantito tramite missione** entro prima fase di crescita, terzo tramite radio/contratti; abilità diverse nella corsa e nella barricata; equip/loadout e sblocchi NON random monetizzati. Roster di 8 è backlog, non obbligo V1.
M1: corsa 60–90s, 3 corsie con **effetti diversi** su collisioni/bersagli/loot; scelta fra armi complementari all'inizio; alleati raccolti condividono corsia; zombie spawn davanti con anticipazione, nessun despawn visibile, fuoco con hitbox e feedback; rischio bottino vs sicurezza; 4–6 momenti tattici, non 8 livelli ripetitivi. Il gioco deve essere divertente con città base e senza reward.
M2: difesa 90–150s, 2–3 ondate significative, piazzamento barricate/torri, un eroe controllato; posizione cambia percorso e risultato.
M3: perni 20–45s, puzzle deterministici recupero civili/scorte e reset veloce. M4/M5 FUTURO, se M1/2/3 soddisfano qualità.
ALTRI INCARICHI: recuperi di infrastruttura in 2–3 step, contratti produttivi, rescue, spedizioni istantanee giocabili, progetti comunitari; niente sistemi che richiedono server PvP.
Obiettivo studio V1: **un prodotto completo con 3 modalità curate**, città vera e 2 espansioni, non una lista infinita di attività.

## 7. Interface contract: ogni vista deve avere funzione e composizione
CITY: mappa 3D = contenuto principale. Header solo risorse sbloccate; fondo 4 aree Città/Gioca/Eroi/Incarichi quando disponibili. Tocco terra/macerie/NPC/edificio = bottom sheet coerente, non finestra browser; mostra modello/effetto/produzione/costi e un solo CTA primario.
EDIFICIO: visualizzazione prima/dopo, lavoratori e output attuale, upgrade successivo reale, ingresso a moduli; NO «Upgrade» senza risultato visivo.
BUILD MODE: fantasma reale dell'edificio, footprint/range, snap, ruota, accetta/annulla, trasloco e undo.
PERSONAGGI: modello animato, abilità mostrata in una demo brevissima nel mondo, progress garantito, fonte chiavi, equip.
MISSIONE: vista del luogo vero, personaggio scelto, 1–2 obiettivi, premio base certo + obiettivi, parte in massimo due tocchi.
RISULTATO: vittoria/sconfitta, bottino, «Torna e costruisci», «Riprova»; rewarded SOLO elemento facoltativo secondario, niente offerte invasive.
UX generale: mobile portrait safe areas, DPI/scaling, controlli 44–48 dp, font leggibile, contrasto e forme, pulsanti reattivi/sonoro/touch, chiara gerarchia visiva, nessuno dei menu deve coprire gran parte di scena inutilmente.
**NON** Web CRUD dashboard, lista di bottoni, icone emoji, colori arbitrarî, modali grigie generiche.

## 8. ART DIRECTION DECISA per costruire un gioco moderno
- Stile 3D stilizzato adulto, industriale post-apocalittico e pulito, moderno; densità di dettagli e lighting da moderno casual midcore, non geometrie box primitive. Coerenza città/action/puzzle.
- Palette visiva ambientale: terreno/strade grigio sabbia e verde spento; costruzioni recuperate con accenti metallici/caldo lampade; segnali interazione ambra, pericoli rossi, selezione ciano desaturato. Colori sono DIREZIONE, non codici finali; definire art bible con palette esatta DOPO render campione.
- Silhouette di edificio riconoscibile e funzione leggibile. Falò ha brace/fumo e luce; Orto solchi e colture; Miniera argano, rotaie e detriti; Officina banco e macchinari; Radio antenna e banco; difese silhouette. Nessun edificio ottenuto da combinazione di cubi senza composizione artistica.
- Camera sperimentare due inclinazioni (40°,55°) e due zoom su **stessa scena e device**, scegliere da composizione reale, non fissare «un isometrico generico».
- Asset pipeline: `game/assets-src/polypizza/manifest.csv` è inventario licenze dichiarate, non prova import. Priorità asset pack modulari **Quaternius Downtown City MegaKit (CC0 Standard)** + pack zombie + Kenney Survival ove compatibili. Source tier Quaternius extra non è da assumere gratuito. Registrare ogni modello con local_path, licenza, screenshot, scala, rig e stato. Non sostituire i missing con primitive finali.
- SCENA VERTICALE CONTROLLO: terreno vuoto/dettagliato, prima tenda, fuoco, NPC che arriva e lavora, orto e miniera, in tre stadi. Approvazione prima di procedere a 12 edifici e missioni.
- Audio: ambiente locale, costruzione, lavoro/produzione, prima ricompensa, weapon hit/impact per armi; mix su telefono. No SFX tutti uguali.
- Ottimizzazione come vincolo di design: instancing per zombie e NPC visibili, pool, LOD, texture budget e no CPU pathfinding su centinaia di cittadini.

## 9. Economia — parametri iniziali e controlli eseguibili
Prima economia: il terreno iniziale contiene materiali esatti per falò, tenda, banco. Ogni attività urbana successiva deve permettere di iniziare una filiera anche se si sbaglia la prima scelta. Nessun blocco da 0 lavoratori o miniera non raggiungibile.
Modello di calcolo per simulazioni:
`stock[r,t+Δ] = clamp(stock[r,t] + Σproduction[r,Δ] + ΣmissionReward[r] - Σconstruction[r] - ΣcraftInput[r], 0, storageCap[r])`.
Test: 5,15,30,60 min al giorno; 0/8/24h offline; 0/1/3 rewarded; city-only/action-only/misto, 30 giorni. Output grafici/tracciati con tempo primo eroe, prima miniera, primo quartiere, costi, rendimenti, eventuali deadlock, risorse senza sink. **Senza simulazione, costi non possono essere definitivi**.
Reward per livello rigiocato sempre positivo; preferire bonus di prima vittoria, missioni varianti e contratti per creare varietà senza punitive diminishing returns nascoste.
Variazioni da paganti o da rewarded non devono spostare il player in un ritmo che rende la progressione gratuita frustrante.

## 10. Guadagno e marketing — decisione finale V1
Free-to-play Android: premi ad soltanto su scelta esplicita, no interstitial obbligatorie. Rewarded +30% materiali comuni dopo missione (baseline), max 3/dì. Nessuna chiave/eroe premium. IAP al lancio: cosmetica quartiere, cosmetica gruppo eroi, **Pass estetico/utility solo se ci sono funzioni vere già terminate**. Se Pass ha valore debole, rinviarlo; non rovinare UX free.
No paid ads prima di avere retention e tutorial misurati. Materiali marketing da gameplay vero in 15–20s: terreno vuoto→primo campo; rescue→missione→upgrade miniera; insediamento→quartiere vivo. Un utente deve riconoscere gioco in 3s.
Revenue example: 1000 DAU × 0.4 rewarded completate/DAU × eCPM €4 × 30/1000 = **€48 mensili lordi** pubblicità; NON promessa. Altri ricavi da IAP possibili, non garantiti. Costi: licenze/asset, Play Console, consensi/privacy, hosting, analytics, QA telefoni, commercialista/tributi, marketing, supporto; imporre soglie di spesa. Monitorare DAU, D1/D7, rewarded completion/eCPM, conversione, ARPDAU, margine. Google Play target API36 per nuove app nel 2026: https://support.google.com/googleplay/android-developer/answer/11926878; pack CC0 Quaternius https://quaternius.itch.io/downtown-city-megakit; benchmark retention GameAnalytics https://www.gameanalytics.com/reports/2025-mobile-gaming-benchmarks.

## 11. Production schedule, CONSEGNE concrete
**P0 AUDIT BUILD** — INIZIO OBBLIGATORIO: screenshot da build desktop/Android e registrazione video; tabella sistemi attuali, punti critici, asset e provenienza, file che generano mesh, GUI e bug; segnare cosa è recuperabile/scartabile, NON aggiungere feature.
**P1 ART BIBLE E GAME FEEL**: 2 composizioni camera + 3 stadi città renderizzati con asset licenziati, screenshot comparativi, archetipi visuali NPC, UI città di riferimento, un singolo loop giocato; niente altri asset inventati. Richiede ACCETTAZIONE UTENTE.
**P2 CITY VERTICAL SLICE**: terreno→3 pile→fuoco+tenda→persona in scena→banco→assegnazione→produzione→bivio coltivazione/recupero; build web/android, save & load, tutorial con no confusione, clip 2–5min.
**P3 CITY ECONOMY CORE**: miniera, officina, magazzino, operai, traslochi strade, una ricetta, una ricerca, progetto zona, due fonti per materiale; simulatore economia reale.
**P4 M1 REWORK**: gioco completo breve 60–90s, linea di tiro real, hit, scelte armi, squad same lane, pickup significativo, zero unfair spawn, ricompensa city ed upgrade immediato.
**P5 PERSONAGGI/PROGRESSIONE**: 2–3 eroi, percorso chiavi/frammenti chiaro, un caso di equip, conseguenze reali in M1/M2.
**P6 M2 E M3**: barricata e primo puzzle completi e ben rifiniti, con rewards ed asset condivisi; teste play diverse.
**P7 PRODUZIONE**: 2 quartieri, eventi/contratti, UI finale, suoni, asset art polish, ottimizzazione, salvataggi e localizzazione.
**P8 BUSINESS/RELEASE**: conformità Play/privacy/consenso, billing, rewarded, analytics reali, closed test, store con video veri, soft launch. Ogni consegna è un ramo recuperabile, una prova video/screenshot e un audit; senza accettazione no fase successiva.

## 12. QA gate: "fatto" significa verificabile
SCREEN: città visivamente comparabile al target scelto e approvato; nessun prototipo procedurale/UI standard spacciati per finali, no scala assurda, logo/typography coerenti.
CITY: tre decisioni diverse nei primi 10 min, primo superstite entra dalla strada, lavori animati, cambio assegnazione varia la produzione, layout e edifici persistono, rientro dopo chiusura non duplica risorse.
M1: nessuna spawn o despawn ingiusti, le corsie modificano risultati, tre armi con utilità diversa, ogni danno spiegabile, non più di 90sec per run standard, tester rigioca spontaneamente.
REVENUE: rewarded concessa solo dopo completamento video e una sola volta, non disponibile non blocca; IAP non modifica danni/forza; salvataggi cloud/locali con test di corruzione.
CAMPAGNA: nessun marketing prima di contenuti reali, no promessa gameplay inesistente.
Ogni feature ha: [Spec] [Evidenza screenshot/video] [Test automatico] [Test su telefono] [Accettazione]. Un risultato manca di qualunque componente = ancora in lavoro.

## 13. Decisioni che REVOCO dai vecchi documenti
- «Definitivo» scritto in documenti prima di test: NON vero; il design è target, non qualità confermata.
- Primo gioco M1 prima di costruire: REVOCATO.
- Lista 40+40+240 livelli: REVOCATA da scope V1.
- 8 eroi al lancio per obbligo: REVOCATO; meglio roster piccolo e profondo.
- Un modello si considera valido perché in CSV: REVOCATO; serve verifica visiva e licenza originale.
- Grafica a box e HTML UI «temporanea» messa online come finale: VIETATA.
- Ogni parte fatta solo perché supera unit test: VIETATA.
- Contratto implementazione separato da giudizio visivo: VIETATO; devono passare insieme.
- Tre valute nuove introdotte per fare contenuto: VIETATO se prive di fonti e sink.
- Un solo percorso economico o personaggio premium necessario per produrre: VIETATO.
