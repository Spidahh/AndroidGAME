# ANDROIDGAME — GAME DESIGN DOCUMENT MASTER
Versione 1.0 · 20 ottobre 2026 · Stato: concept completo per prototipo, **non gioco già sviluppato**

> Documento prevalente sulle bozze precedenti. **Requisiti** = richieste confermate dall'utente. **Scelte di design** = proposta organica per avere un gioco realizzabile; potranno cambiare dopo i test. **Numeri** = valori iniziali da bilanciare, non fatti dimostrati.

## 0. Prodotto in una frase
**Costruisci e specializza un insediamento giocando missioni arcade con eroi diversi, ottieni materiali, migliora la città immediatamente, produci anche AFK e affronta eventi ricorrenti.** Nessun timer di edificazione, nessun secondo gioco nascosto dietro la pubblicità.

### Valore al giocatore
- *Più giochi, più costruisci*: ricompensa sempre tangibile; nessun gate di tempo su edifici o missioni.
- *La tua città è tua*: quartieri, edifici, upgrade divergenti, eroi e approcci PvE/economia/PvP.
- *Gioco vero*: minigiochi interessanti e ripetibili, non cliccare sull'ennesimo pulsante +X.
- *Puoi anche staccare*: produzione AFK modesta, senza superare quella attiva.
- *Gratis ma sostenibile*: ads premiate volontarie, cosmetics/IAP e nessun eroe combattivamente esclusivo a pagamento.

### Piattaforma, scala e identità
- **Android portrait** prioritaria; Windows PC possibile dallo stesso progetto Godot, interfaccia responsive e mouse/tastiera. Lo sviluppo PC non significa pubblicazione Steam gratuita.
- **Scelta creativa consigliata**: insediamento di frontiera post-catastrofe **stilizzato e colorato**, non zombie horror realistico, per riutilizzare modelli e raccontare la ricostruzione. È una scelta progettuale, non una preferenza esplicita confermata; il core funziona anche con un altro tema.
- **Vista città** 3D isometrica con zoom/pan; **missioni** 3D dall'alto a camera fissa o inclinata, personaggio unico controllato con drag, auto-fire se in movimento; look coerente.
- NO multiplayer live, attacchi ad altri giocatori, commerci tra utenti, gilde o backend obbligatorio in V1. PvP come direzione di progressione futura, non promessa già presente.
- Audience proposta: giocatore adulto mobile che ama crescita insediamento e action immediato, sessioni brevi ma ripetute. Validare con tester; non assumere mercato garantito.

## 1. Un ciclo completo, con esempio concreto
1. All'apertura vedi la tua base incompleta; il deposito ha risorse AFK accumulate.
2. Raccogli gratis il bottino AFK; opzionalmente visualizzi un rewarded ad per un bonus chiaramente mostrato.
3. Clicchi su un edificio: manca ferro. Il pulsante «Ottieni ferro» elenca due attività realmente giocabili.
4. Scegli eroe e missione. In circa 2–4 minuti schivi e spari, scegli obiettivi sul percorso, apri un deposito opzionale rischioso e ottieni ferro/schemi.
5. Rientri in città, incassi SEMPRE la ricompensa base; rewarded facoltativa dà un extra limitato.
6. Migliori l'officina **subito**: ora puoi scegliere una delle due specializzazioni che cambia ciò che fabbrica.
7. Quel ramo sblocca un'attrezzatura giocabile per l'eroe e modifica ricompense/modalità disponibili.
8. Una sfida settimanale conteggia attività reali e dà un premio cosmetico o materiali moderati.
9. Torni più tardi: la fabbrica ha prodotto un po' di materiali anche a gioco chiuso. Il progresso principale resta nelle tue mani.

### Regole anti-frustrazione
- Mai timer per costruire, ricerca, attivare una missione o potenziare.
- Mai energia che impedisce di giocare. Fallire non toglie risorse già possedute.
- Ogni missione restituisce sempre almeno un premio base; abilità/difficoltà migliorano rendimento, non numero di ads viste.
- Minigiochi: NO porte matematiche +10/x4 come meccanica principale. Scelte contestuali comprensibili e visive.
- Pulsante «dove trovo questa risorsa?» su OGNI materiale; evitare grind cieco e valute ridondanti.

## 2. Economia e città
### Risorse V1 (solo quattro)
1. **Rottami**: comuni; missioni e produzione AFK; costruzioni ordinarie.
2. **Componenti**: missioni più impegnative e officina; miglioramenti funzionali.
3. **Energia**: dal generatore e obiettivi; edifici specializzati e upgrade eroe.
4. **Schemi**: ricompensa per obiettivi e traguardi, usata per **sbloccare alternative**, mai acquistabile esclusivamente in shop.
Non aggiungere oro/gemme/legno/pietra/monete senza prova di necessità. Valuta premium cosmetica solo se semplifica l'offerta, non V1.

### Edifici V1 e ruolo
| Edificio | Ruolo | Scelta significativa |
|---|---|---|
| Municipio | livello insediamento, sblocca nuove celle/settori e obiettivi | ordine di ampliamento, non un timer |
| Deposito | cap AFK e inventario | cap vs bonus raccolta |
| Officina | converte risorse e crea equip | equip action vs componenti industriali |
| Generatore | energia AFK e funzioni cittadine | efficienza vs supporto missioni |
| Centro spedizioni | selezione attività e premi | raccolta vs rischi/bonus |
| Accademia | personaggi, talenti, preset | addestramento PvE vs utility |
Sei edifici riutilizzabili con dettagli visivi per upgrade, non 60 modelli individuali.

### Regole di progressione
- Posizionamento libero su **griglia di piccole dimensioni**; città visivamente viva man mano che cresce; espansione tramite materiali.
- Ogni edificio: 5 livelli base in V1, successivi sempre più costosi **ma senza tempi d'attesa**.
- A livello 3 scegli un ramo A/B. Questa scelta cambia una funzione e almeno un beneficio visibile, non solo +5% arbitrario.
- La specializzazione è **reversibile** pagando una quantità moderata di risorse di gioco; non vendere reset a pagamento.
- Alcuni rami diventano disponibili quando espandi il municipio o fai missioni speciali, senza bloccare la progressione ai non-PvP.
- Asset modesti: stessi modelli modulari, parti e colori che cambiano in base a livello/ramo.
- I costi aumentano con varietà di materiali e nuove attività, NON con attese o grind senza nuovi contenuti.

### Tabelle di economia indicative per prototipo (DA TESTARE)
Missione base 3 minuti: **40 rottami + 8 componenti**; prestazione eccellente: **+10 rottami/+3 componenti**. Edificio iniziale: **80 rottami**; upgrade primo: **120 rottami + 12 componenti**; ramo livello 3: **1 schema + 60 componenti**. Generatore L1: **6 energia/ora offline**, magazzino AFK massimo 8 ore (capacità espandibile). Questi valori NON sono promesse di produzione finale, ma baseline per misurare se la prima crescita avviene in circa 2-3 run.

### Bilanciamento
Il ruolo AFK è mantenere il ritorno piacevole; un giocatore attivo deve crescere sensibilmente di più. **Non fissare quote arbitrarie 70/20/10** come regola finale: simularle con playtest, tracciare «upgrade per ora», risorse bloccanti, lunghezza dei cicli, ad conversion.

## 3. Personaggi e squadre
- Un **eroe controllato alla volta** nelle missioni per semplificare input e animazioni. Ogni eroe ha skill/lavorazione differente, non solo statistiche.
- Roster V1 **3 eroi**, tutti ottenibili giocando: **Assaltatore** (fuoco rapido, fragile), **Tecnico** (droni o recupero), **Guardiano** (difesa ravvicinata). Nomi di ruolo provvisori.
- Due assi di progressione: esperienza e un piccolo albero di **abilità per eroe**; equip/preparazione sbloccati dalla città. Gli eroi restano utilizzabili senza grind separato eccessivo.
- Nessun eroe gacha o solo in vendita. Le skin possono essere acquistate. In futuro: aiutante automatico o squadra, **non incluso** V1.
- Talent reset mediante risorse normali; loadout per contenuto PvE/raccolta e, in futuro, PvP.
- La città è il metagioco: upgrade generatore/officina/accademia sbloccano vantaggi di scelta, non solo moltiplicatori.

## 4. Minigiochi integrati (due per V1)
**A. Corsa di recupero (action):** percorso breve segmentato. Personaggio si muove con un dito, fuoco automatico verso minaccia in traiettoria; schiva nemici/ostacoli, distrugge barriere, sceglie obiettivo (casse, materiali, rischi), miniboss finale. Non runner infinito, NO portali aritmetici. 2–4 minuti; 3 tipi nemici, 1 elite, 1 miniboss in V1.

**B. Recupero tecnico (arcade diverso):** arena a tempo breve con materiali da raccogliere, ostacoli mobili e attrezzo/abilità temporanea. Decidi quali depositi svuotare e quando ritirarti; più rischio comporta più reward. 60–120 secondi. Riusa eroi, input, ambienti e collisioni; differisce davvero da A, non solo uno skin-swap.

**Riuso architetturale:** ogni modalità dichiara ID, difficoltà, eroe, costo zero di ingresso, ricompense base, modificatori, condizioni di risultato. Il wallet **non riceve reward raw dal client su un server competitivo**; per V1 offline save locale. L'economia shared riceve l'esito da una interfaccia uniforme `MissionResult`. Aggiungere un terzo minigioco NON deve obbligare a modificare ogni edificio.

### Sessione e pacing
Onboarding entro 2 minuti: prima missione e prima costruzione. Entro 10 minuti: un personaggio, 2–3 edifici, una scelta tra upgrade, AFK mostrato, secondo minigioco appena sbloccato. Zero popup acquisto/ads nella prima missione. Questa è una *design target*, da testare.

## 5. Longevità senza gonfiare lo sviluppo
- **Giornaliere:** 3 obiettivi adattabili (es. missione A, missione B, edificio/eroe), sempre fattibili giocando normalmente. Ricompense moderate; evitare streak punitive.
- **Settimanale:** una sfida a 5 traguardi basata su build/recovery, rigiocabile con varianti di difficoltà e premio cosmético/materiali. Niente contenuti programmati manualmente ogni settimana.
- **Mensile (4 settimane):** track evento composta da missioni generate da template e una skin/decoro finale; nuova regola/variante di missione ogni ciclo se sostenibile. Riutilizzare contenuti, non promettere 12 eventi artigianali all'anno.
- **Sempre:** sviluppo insediamento, farming mirato, approfondimento talenti, raccolta AFK, sfide ripetibili, personale ottimizzazione di città.
- **Difficoltà:** mutatori combinabili (nemici più veloci, ostacoli, premio diverso), NON soltanto nemici con HP moltiplicati.
- **Late game:** specializzazioni secondarie e traguardi di quartiere, sfide per build alternative; nuovi settori e personaggi solo se c'è retention.
- Eventi solo locali in V1 = semplici e falsificabili cambiando orologio. **Non promettere competizioni sicure, premi di valore, acquisti competitivi o classifiche senza server.**

## 6. Monetizzazione e integrità dell'economia
**Strategia per lancio Android:** free-to-play e rewarded facoltative; aggiungere IAP cosmetici/test supporter quando esiste pubblico.
- Rewarded dopo missione: esempio **+25% rottami/componenti base** (non schemi rari), massimo 3 bonus/giorno, *solo se* AdMob concede la conferma. A norma SDK/Google policy, mai premiare a priori.
- Rewarded AFK: esempio **+25% sui materiali base raccolti**, non energia per PvP; massimo 1/giorno. Il giocatore incassa comunque tutto il bottino normale.
- Ads mai obbligatorie; niente interstitial nella V1 proposta, niente banner. Se niente forced ads, non vendere “rimozione annunci obbligatori” inesistenti.
- IAP proposti: decorazioni/skin città (€1.99–€4.99), skin eroi (€2.99–€5.99), supporter cosmetico (€4.99–€7.99). **Prezzi ipotesi** soggetti a test e policy store.
- Vietato vendere personaggi più forti, schemi unici, materiali illimitati, ranking power, timer bypass o contenuto PvP vincente.
- Se il gioco avrà PvP, la normalizzazione degli equip e una economia competitiva separata sono precondizioni prima di estendere gli IAP.
- Il bonus ads accelera comunque la progressione: fissare caps moderati e misurare se penalizza chi non guarda annunci.

### Sostenibilità: numeri di esempio non previsionali
1000 DAU x 1 rewarded monetizzata/die x 30 gg = 30.000 impression. Con eCPM ipotetico **€5** = **€150 al mese lordi** di sole ads, prima di costi e fiscalità. Con 100 DAU, €15. Il costo di acquisizione può superare facilmente il ricavo; NON esiste un profitto automatico. LTV = (ricavo ads + IAP netto per cohort) / installazioni cohort; confrontare con CPI e margine di sicurezza, non usare solo download.

## 7. Marketing integrato nel prodotto
**Messaggio di lancio:** «Non aspettare per costruire: gioca, raccogli e fai crescere la TUA città». Mostrare sempre alternanza reale tra action e ampliamento insediamento; evitare promessa ingannevole di «solo shooter».
- **3 creatività verificabili:** (1) 15s missione -> reward -> upgrade città istantaneo; (2) 2 città visivamente diverse con specializzazioni opposte; (3) logout/rientro e AFK raccolto -> missione attiva.
- Canali iniziali senza advertising pagato: YouTube Shorts, TikTok, Reels, subreddit/community con regole favorevoli, piccoli creator, beta/tester. Non comprare traffico e recensioni; rispettare regole dei forum.
- Pagina Store localizzata almeno EN/IT, icona chiara, screenshot e breve video che mostrano gameplay reale, no foto generate che fingano schermate.
- **Prerequisito investimento ads:** retention misurata su coorti reali, funnel tutorial, sessioni, D1/D7, ad opt-in e perdita giocatori, primi IAP, costi; piccole campagne solo dopo risultato promettente.
- **KPI di test**, non garanzie: 15–25 tester qualitativi, >60% che chiede volontariamente altra sessione; dopo uscita su campioni maggiori, D1 target 30–35%, D7 8–10%; riesaminare segmenti e campioni, non scegliere per impression.
- Calendario promo **sostenibile per uno solo**: 2–3 clip vere a settimana, registrate dal gioco, non 20 ads nuove ogni giorno.
- PC distribuito gratuitamente in beta da itch.io o installazione diretta se licenza OK; scegliere Steam solo più avanti considerando fee per titolo.

## 8. Tecnologie e legalità
**Stack candidato prioritario:** Godot 4 + starter kit Kenney City Builder, asset CC0 Kenney/KayKit; export Android AAB e Windows, GitHub. Iniziare con audit reale file/commit/licenze; il template NON offre già economia, eroi o ads. PC/Android condividono dati e contenuti, UI/input separati.
- Catalogo asset: link originale, autore, versione/hash, testo della licenza salvato, uso effettivo, modifiche. MIT mantiene avvisi, CC0 con prova. Evitare qualsiasi asset senza fonte verificabile o estratto da giochi commerciali.
- Prima di inserire terze parti: controllare dipendenze, modelli, shader, audio, font e plugin, non solo licenza root repo.
- Ads Godot: plugin Poing Studios AdMob **da testare** per versione Godot, Android, consenso UMP, reward callback, privacy e policy.
- IAP: scegliere plugin Billing mantenuto, implementare restore/verifica acquisiti e casi offline, senza inventare API.
- Play Store: verificare target API corrente per data lancio, requisiti closed test, privacy policy, Data Safety, classificazione età, contenuti pubblicitari, consenso EEA, dati SDK, screenshot veri, firma AAB e gestione chiavi. Considerare obblighi fiscali italiani prima della monetizzazione.
- Un motore e un asset commercialmente utilizzabili NON certificano automaticamente conformità legale totale.
- **Security:** V1 single player offline, salvataggi locali manipolabili: OK per economia senza competizione. PvP/leaderboard e acquisti che trasferiscono valore richiedono autorità online e controlli.

## 9. Roadmap di produzione AI-first con criteri di accettazione
**Sprint 0 — audit foundation:** import Kenney; test versione, licenze, controlli camera, salvataggi. Export Windows + Android prova. Se template fallisce, ripiegare su griglia minimale Godot anziché inseguire ore di debug.
**Sprint 1 — loop base:** wallet risorse, piazzamento, costo e instant upgrade, bottone «gioca», una missione action che ritorna reward, save/load. **Done = 3 cicli completi senza bug su telefono reale**.
**Sprint 2 — valore a lungo termine:** tre eroi, primi rami edilizi, produzione AFK e secondo minigioco. **Done = almeno due stili e due modalità realmente differenti, sempre senza attese**.
**Sprint 3 — polish:** impatti/audio/effetti/animazioni, progressione primi 30 min, UI leggibile e performance medio gamma. **Done = tester capiscono autonomamente e tornano a giocare**.
**Sprint 4 — eventi:** 3 giornaliere, 1 settimanale, 1 ciclo mensile dati-driven, anti-exploit di base. **Done = replay eventi senza modifiche script ogni settimana**.
**Sprint 5 — commerciale Android:** rewarded opt-in, analytics/privacy, IAP cosmetici se utili, ad testing, AAB, test chiuso, store screenshots. **Done = requisiti Play verificati sulla build reale e performance misurata**.
**Sprint 6 — lancio e apprendimento:** soft launch, creator/promo organica, monitor KPI, patch. Nessun acquisto utenti significativo se ricavi/retention insufficienti.
**PC:** build di test in ogni sprint, rilascio pubblico PC soltanto quando UI e save compatibili; account cross-save non in V1.

### AI workflow
- L'AI può scrivere codice e strumenti, ma deve sempre fornire file testabili, istruzioni riproducibili ed evidenza dei test; non dare per svolti test che non sono stati effettuati.
- Ogni modifica: issue/obiettivo -> piccola implementazione -> test unitari/e2e e device -> commit. Non aggiungere meccaniche non approvate.
- Dati gioco centralizzati: JSON/Godot Resources per costi, upgrade graph, mission rewards, events; test che proibisce costi negativi, reward duplicati e rami irraggiungibili.
- Gli asset non approvati legalmente NON entrano nella distribuzione.

## 10. Contenuti della prima release e limiti espliciti
**Target contenuto V1:** 1 bioma/città, 6 edifici (5 livelli e scelta A/B), 3 eroi, 2 modalità giocabili, 4 risorse, 1 miniboss, 3 tipi nemici, AFK, 3 giornaliere, una sfida settimanale generica, una traccia mensile leggera, rewarded opzionali e salvataggio offline. Il volume potrà ridursi in base a test e qualità; NON promettere mesi di contenuti al lancio se inesistenti.
**Escluso dalla V1:** PvP online, gilde, raid cooperative, trading, 10 minigiochi, gacha, battle pass premium, sistema energetico, timer di costruzione, server obbligatorio, campagne paid massicce.

## 11. Rischi e mitigazioni
1. **Troppi sistemi per solista** -> fermarsi alla vertical slice prima di eventi e monetizzazione.
2. **Due minigiochi superficiali** -> test divertimento di ognuno; meglio uno eccellente che cinque mediocri.
3. **AFK troppo remunerativo** -> risorse base e cap limitato; misurare progressione passiva/attiva.
4. **Specializzazioni cosmetiche** -> ogni ramo modifica almeno una decisione/azione concreta.
5. **Dati economici manipolabili offline** -> evitare classifiche e trading competitivi; futura migrazione server autorevole.
6. **Rewarded SDK rotto o policy** -> modulo isolato e test su dispositivo con consensi.
7. **Nessun download** -> marketing mentre si testa il prototipo, non dopo sei mesi; misurare risposta video e wishlist/beta.
8. **Licenze** -> third-party ledger e audit prima di pubblicare.
9. **Confusione brand e tema** -> testare 2–3 key visual/title quando esiste vero gameplay, non fabbricare identità prima.

## 12. Misure di successo e decisioni aperte
**Successo di gameplay**: test esterni vogliono giocare ancora per espandere la città; chi preferisce PvE e chi costruzione trovano percorsi validi. **Successo commerciale**: arrivano installazioni, ritorno, rewarded opt-in e ricavo per utente senza retention compromessa; costo UA inferiore al LTV con margine.
**Da confermare con test:** ambientazione, visuale esatta della modalità action, durata sessioni, 2° minigioco, eroi e bilanciamento, prezzi IAP, modalità futura PvP e online. Queste non sono scelte esplicite dell'utente; questa GDD le rende **proposte operative**, non certezze.

## 13. Fonti/progetti di partenza
- Starter Kenney: https://github.com/KenneyNL/Starter-Kit-City-Builder
- Asset KayKit: https://github.com/KayKit-Game-Assets/KayKit-City-Builder-Bits-1.0
- Asset Kenney: https://kenney.nl/assets
- Godot: https://godotengine.org/license/
- Benchmark dettagli: [BENCHMARK-PROGRESSIONE-EVENTI.md](BENCHMARK-PROGRESSIONE-EVENTI.md)
- Compliance e fonti: [RICERCA-TECNICA-LEGALE.md](RICERCA-TECNICA-LEGALE.md)

## 14. Gerarchia documentale
Questo è il **documento master operativo**. I documenti preesistenti sono fonti e ricerche storiche, non specifiche concorrenti. In caso di conflitto vale questo master per le **scelte proposte**, mentre i requisiti espliciti dell'utente hanno sempre priorità. Aggiornare il master e la decision log ad ogni cambiamento; non lasciare decisioni divergenti fra file.
