# HOLDOUT CITY — DIREZIONE PRODOTTO V4 / AUDIT COMPLETO
Data 20 ottobre 2026. **TEORIA E SPECIFICA PER PRODUZIONE**. La visione city-first in CITTA-DA-ZERO-MASTER.md e le decisioni dell'utente in DECISIONI.md prevalgono. Questo documento integra TUTTI i sistemi e sostituisce assunzioni obsolete dei documenti precedenti. Nessuna funzionalità qui è da considerarsi implementata solo perché documentata.

## 0. Definizione commerciale
**Holdout City**: inizi SOLO, in una zona abbandonata, e costruisci materialmente un accampamento; accogli superstiti che entrano nella mappa, assegni lavori, recuperi terreno e risorse, ricostruisci infrastrutture, sviluppi una città viva. Intervalli di azione attiva nella città, minigiochi delle ads sempre giocabili, puzzle, difese ed eroi completano e alimentano la stessa economia. Free-to-play Android, web condivisibile, PC eventuale.

**Promessa pubblicitaria vera:** «Non esiste la città. La costruisci da zero. E i giochi delle pubblicità sono davvero nel gioco.» Il trailer dovrà mostrare in sequenza realtà del gameplay, non scene concepite per far credere che un video sia giocabile.

Non fare diventare gioco né un 4X militare con timers, né un tap/clicker, né cinque arcade scollegati, né un simulatore di fame/stanchezza punitivo.

## 1. Esperienza: cosa il giocatore fa ogni minuto
Tre loop diversi, che si rafforzano:
- **Micro (20–90s):** recupero urbano, lavoratore in arrivo, upgrade immediato, un incontro M1, un puzzle o scelta di produzione.
- **Sessione (5–20min):** materiali e lavoratori -> avvia filiera -> missione su risorsa carente -> espande accampamento/nuovo modulo/eroe -> sistema una zona visibilmente.
- **Meta (giorni/settimane):** accampamento -> avamposto -> insediamento -> città, quartieri, reclute, officina, tecnologie, moduli difensivi, progetti cittadini ed eventi.
**Misura di qualità:** la progressione va resa tangibile ogni sessione breve; non basta numero +2%.

## 2. Sviluppo città a cinque stadi
**Terreno vuoto** (0 edifici): protagonista, detriti raccoglibili, fuoco spento, area edificabile; primo fuoco e tenda in pochi tocchi.
**Accampamento**: 2–6 residenti indicativi, banco recupero, orto, ripari, difesa grezza. La prima scelta è lavoro recupero vs cibo.
**Avamposto**: nuovi superstiti, primo giacimento di metallo e Miniera, Magazzino, Officina, Guardia, Radio.
**Insediamento**: case permanenti, energia, ricette, laboratorio, armeria, logistica, quartieri.
**Città**: più aree urbanizzate con strutture specializzate, attrattività cittadina, lavori, eventi e personalizzazione. Il deposito dei tram, già in vecchio piano, è una rovina visibile inizialmente e una futura conquista.
Numeri residenti sono checkpoint di design, non blocchi rigidi. Non introdurre obiettivo HQ livello N come unica via.

## 3. Il city builder è attivo, non un menu
Almeno cinque azioni utilizzabili direttamente nella mappa:
1. **Recupero su sito:** tocco su macerie -> recupero breve (iniziale), premio rottami, spazi liberati; poi l'azione evolve e non richiede 1000 tap.
2. **Accogli/assegna persone:** NPC entra sulla strada, tap -> ruolo lavorativo; assegnazione e riassegnazione immediate e gratuite, pulsante autoassegna disponibile a tutti.
3. **Piazza/sposta edifici:** preview area, strada, miniera su giacimento, magazzino vicino; bonus posizionali moderati e facili da capire; spostamento gratis e undo.
4. **Gestisci la filiera:** decisione fra costruire più produttori, aumentare capienza o trasformare metallo in componenti, crafting immediato.
5. **Decisioni sul territorio:** soccorrere persone, sgomberare vie, restaurare infrastrutture, scegliere un progetto civico. Eventi cittadini brevi, non distruzione offline.
Un giocatore deve poter passare 10 minuti solo nella città con decisioni nuove, non esclusivamente reclamare la produzione.

## 4. Superstiti: regole, morale, limiti
Due collezioni: **residenti** (popolazione e manodopera) e **eroi** (personaggi giocabili). I residenti provengono da primi eventi garantiti, incontri sulla mappa, missioni rescue e attrattività dell'accampamento. Non sono tutti ottenuti da chiavi.
Tre bisogni **aggregati**: Riparo, Rifornimenti, Sicurezza. Sono indicatori di efficienza/attrattività con bonus, non barre che uccidono/offline puniscono. Niente microgestione fame di 30 individui.
Cinque competenze iniziali: raccolta, agricoltura, estrazione, tecnica, guardia. Un tratto per persona e mansione cambia leggermente produttività (non servono 30 perk).
Formula candidata: `produzione_ora = resa_base * tier * (operatori/slot) * (1 + bonus_competenza + bonus_ricerca + bonus_logistica)`. Se operatori=0, produzione=0; raccolta cittadina manuale di base resta disponibile per evitare deadlock. Capienza AFK e output netto chiaramente visibili.
**Problema fattibilità:** NPC effettivamente animati pochi (5–12 vicini alla camera, LOD per altri); popolazione restante rappresentata come dato affidabile. Non promettere 300 NPC AI completi in scena.

## 5. Economia multilivello SENZA dieci valute ridondanti
TIER 0: Rottami (edifici, riparazioni), Viveri (residenti, sviluppo).
TIER 1: Metallo (miniera/missioni), Componenti (officina istantanea e recupero raro).
TIER 2: Energia **di città** (ricerca e dispositivi, non costo entrare nei giochi), Schemi (sblocchi tech).
PROGRESS: Chiavi reclutamento e Frammenti eroe (schermata eroi, non wallet principale). Progetti armi/strutture sono elementi collezione, non ulteriore moneta indistinta.
**Vincolo:** almeno due fonti per risorsa, almeno due usi utili; nessuna ricetta si autosblocca circolarmente; ricompense dei minigiochi e città hanno sovrapposizione sufficiente per non imporre un'attività odiata.
È giusto che la città dia principalmente basi (rottami/viveri/metallo) e le missioni contribuiscano anche a chiavi/schemi, ma devono esserci percorsi alternativi attivi in città.
La simulazione DEVE considerare 5/15/30/60 minuti giocati al giorno per 30 giorni, produzioni offline con cap, 0/1/3 ads/giorno, playstyle city-only/action-only/misto.

### Esempio di primo ciclo di materiali — SOLO PLAYTEST
Rottami 0 iniziali, 25 recuperabili sulla mappa; Falò 5, Tenda 10, Banco Recupero 10. Un superstite garantito consente generare altri rottami nel tempo. Il primo vero bivio economico tra Orto e una seconda postazione usa materiali ottenibili sia in città sia dalla prima M1. Non usare questi numeri come economy finale.

## 6. Edifici, miniere e filiere
**Accampamento:** Falò (attrattività/identità), Tenda (posti), Postazione Recupero (rottami), Orto (viveri), Recinzione (sicurezza).
**Avamposto:** Miniera su giacimento (metallo), Magazzino (cap AFK), Officina (componenti/ricette), Guardiola (difesa/missioni), Radio (contratti/eroi).
**Insediamento:** Case, Generatore (energia per tech), Laboratorio (albero ricerche), Armeria (scelte arma), Mercato (scambi senza arbitraggio), Infermeria (miglioramento capacità eroi).
**Città:** Quartieri, strutture civiche, centri specialistici e infrastrutture.
**Edificio utile, non livelli ornamentali:** ogni upgrade deve mostrare cambiamento: nuovo slot, nuovo modulo/ricetta, produzione percepibile, livello visivo dell'edificio. Moduli miniera: Trivella (resa), Carrelli (cap), Sicurezza (stabilità/attrattività), tutti accessibili con gioco e non ramificazioni irreversibili. Evitare 10 upgrade a vuoto per edificio.

## 7. Sistema collezione e reclutamento
Le **chiavi** ottenute da missioni/contratti/eventi aprono Dossier, che assicurano frammenti dell'eroe selezionato o ricompense chiaramente dichiarate. Un percorso deterministico è preferibile a gacha casuale a pagamento: il giocatore può pianificare il prossimo personaggio. Frammenti duplicati convertibili in universali senza inutilità.
I personaggi in M1/M2 devono offrire AZIONI diverse (dash/scudo/granata/rallentamento/precisione) e utilità riconoscibile nella città quando sensato. EQUIP: arma cambia comportamento, modulo difensivo cambia strategia, talento cambia capacità; evitare soltanto rarità colorate con +10% DPS.
**Economia eroi** va progettata affinché i primi due differenti siano sbloccabili abbastanza presto da provare scelta, non settimane dopo. No vendita di potenza o loot box a pagamento.

## 8. Cinque minigiochi in economia unica
**M1 Corsa:** 60–90s totali, 3 corsie funzionalmente differenti, protagonista solo iniziale e alleati raccolti realmente; nessun ×3 senza origine. Scelta arma nei primi 10s, 4–6 incontri con rischio/premio; spawn davanti e fuori camera, nessuna sparizione visibile, pressione reale, niente percorsi obbligati a memoria. Rottami/metallo, recuperi di persone e chiavi a traguardi.
**M2 Barricata:** 90–150s, preparazione, 2–3 ondate, spostamento del player e difese con scelta percorso. Componenti e sicurezza zona, qualche schema.
**M3 Tira perni:** 20–45s, fisica deterministica e obiettivo logico; recupero provviste/superstiti.
**M4 Disegna difesa:** 20–40s, una linea e simulazione breve, input touch tollerante; salvataggi/progetti.
**M5 Libera strada:** 30–60s, puzzle di movimento basato su mosse (non countdown inutili), recupero territorio/metallo.
**Non 320 livelli al lancio:** capitoli brevi rifiniti, ripetibilità solo se davvero varia. Ogni modalità deve essere divertente anche con premio disattivato in test, altrimenti non chiamarla finita.

## 9. UI/UX e visual identity — contratto di produzione
**Visuale:** city builder 3D stilizzato adulto e leggibile, luce più calda a mano a mano che la città cresce, ambientazione post-catastrofe non horror gore. Un solo art direction e shader/materiali coerenti su tutti gli asset.
**Camera città:** isometrica inclinata, drag su spazio libero sposta mappa, pinch zoom, tap edificio seleziona; tap lungo attiva spostamento con preview e annulla; edifici grandi distinguibili dalla silhouette, strada e lavoratori visibili. Safe areas Android.
**Schermata città:**
- Top: SOLO risorse fondamentali Rottami/Viveri, poi espansione wallet quando sblocchi Metallo/Energia; chiavi dentro reclutamento.
- Centro: la città (NON una schermata menu).
- Bottom contestuale sul selezionato: nome, funzione attuale, prossimo bonus, prezzo e CTA istantanea + «Dove trovare» in caso di mancanza.
- Bottom navigation quando sbloccata: Città / Gioca / Eroi / Incarichi. Negozio NON tab primario; impostazioni con accessibilità, musica/effetti separati, vibrazione.
**M1 HUD:** posizione progress, arma visibile, salute/squadra, UNA abilità. Non coprire nemici e pickup con numeri. Touch bersagli larghi e camera telegraphed.
**Schermata risultati:** premio base certo, ulteriori bonus, «Torna al campo» e «Riprova». Ads premiata con offerta separata, senza nascondere tasto continua.
**Menu eroi:** volto, abilità, frammenti correnti/soglia, prossima fonte, upgrade/talenti/equip; visibile come quel personaggio cambia M1 o M2.
**Accessibilità:** testi non minuscoli, simboli oltre al colore, feedback al tocco, 30/60 fps selection, tutorial skippabile con obiettivi reintroducibili.
**Asset reali:** Quaternius Zombie Apocalypse Kit CC0 (60 modelli), Downtown City MegaKit CC0 (300+ pezzi; Standard gratis, Source a pagamento), Survival Pack Quaternius CC0; Kenney Survival Kit CC0 (70+ modelli), Kenney UI/SFX pack specifici da validare. Conservare LICENSE/ATTRIBUTIONS e fonte/versione di ogni file importato. Non mescolare asset realistici e toy-lowpoly senza uniformare dimensioni, palette, outline e illuminazione.
Fonti: https://quaternius.com/faq.html ; https://quaternius.itch.io/downtown-city-megakit ; https://kenney-assets.itch.io/survival-kit .

## 10. Divertimento e retention: falsificazione, non fiducia
**Test A (city only):** 5 persone nuove, 10 minuti in città, annotare azioni spontanee, «perché hai assegnato quel lavoratore?», «quale struttura vuoi costruire dopo?».
**Test B (M1):** personaggio fermo/giocatore casual/bravo, almeno due armi, 0 spawn su personaggio, 0 nemici scomparsi in viewport, run sotto 90s. Il semplice completamento bot 8/8 non prova divertimento.
**Test C (loop):** terreno -> prima tenda -> primo superstite -> lavoro -> missione -> officina -> upgrade. Deve essere possibile senza pubblicità né accesso al negozio e con almeno una scelta significativa.
**Metriche da misurare, non benchmark garantiti:** prima azione <10s, prima costruzione <2m, primo superstite <4m, primo upgrade che cambia opzione <10m, replay spontaneo, task flow, D1/D7 e sessioni. D1 sopra 30% come aspirazione solo dopo avere coorti numerose, senza attribuirla a mercato come universalmente vera.
**Regole anti-grind:** dopo onboarding, 2–4 run circa per upgrade significativo, city-only più lenta ma vitale; nessun particolare mini-game come unico accesso a una risorsa fondamentale; produzione AFK non deve dominare gameplay attivo.

## 11. Economia commerciale (assunzioni trasparenti)
**Fonti di ricavo:** video rewarded facoltativi e pochi acquisti IAP non-power: Pass Comandante (€4,99 ipotesi), skin/cosmetici (€1,99–€3,99), sostegno opzionale. **Escludere** bundle di potenza, timer skip, pass stagionale paywall, pubblicità forzata e valuta premium opaca.
**AdMob policy:** utente opt-in e ricompensa chiaramente descritta prima di ogni rewarded; assegnare reward SOLO sul callback earned e deduplicare, non al close del video; test ads in sviluppo. Fonti: https://support.google.com/admob/answer/7313578 ; https://developers.google.com/admob/android/rewarded .
**Consenso EEA:** UMP/CMP secondo requisiti correnti; chiedere e rispettare permessi, privacy policy e Play Data Safety: https://developers.google.com/admob/android/privacy .
**Iniziale rewarded test:** +25–50% materiali comuni su un numero limitato di missioni/die; NON chiavi eroe esclusive o vantaggi per PvP. Rivedere il vecchio «raddoppia 5 volte» se gonfia troppo l'economia. Nessun annuncio durante la crescita della città.
**Esempio puramente aritmetico ADS (lordo, non previsione):**
- 500 DAU x 0,5 completamenti rewarded/DAU/giorno x 30 / 1000 x €4 eCPM = €30/mese;
- 2.000 DAU x 1 rewarded/DAU/giorno x 30 / 1000 x €6 = €360/mese;
- 10.000 DAU x 1,5 rewarded/DAU/giorno x 30 / 1000 x €8 = €3.600/mese.
Il payout pubblicitario dipende da fill, eCPM regionale, completion, utenti consenzienti, frodi e oscillazioni.
**IAP esempio separato:** 2.000 nuovi utenti mese x 1% buyers x €4,99 AOV = €99,80 LORDI transazioni prima di commissioni, tasse, rimborsi e altre spese. Sono 20 buyers, NON garanzia.
**COSTI:** Google Play console (costo una tantum da ricontrollare quando si apre), dominio/hosting (Cloudflare Pages fair use e cap), logging/auth/backend/Supabase/Firebase oltre quote free, storage/media, ads analytics, IVA/tasse e commercialista, traduzioni, eventuali asset audio, device test e marketing. Piano budget fisso minimo vs costi variabili per DAU; mai assumere hosting gratuito a scala infinita.
**Commissioni:** Google Play ha nuove strutture 2026 e rollout regionali: NON applicare rigidamente il 15% come aliquota universale. Fonte https://support.google.com/googleplay/android-developer/answer/16954621 ; verificare programma/area e payment fee del proprio account.
**Marketing:** test 3 video gameplay autentico 15s (terreno→campo, minigioco reale, villaggio→città). Shorts/Reels/TikTok/community/creator piccoli. Primo funnel web beta gratuito: visite→avvio→prima tenda→prima missione→return next day→installazione. Piccolo test paid SOLO dopo retention misurata; successo commerciale non garantito.

## 12. Piano di contenuto commerciabile, con limiti
**Milestone 1 (vertical slice):** 1 area vuota→accampamento, 3 edifici, 2 sopravvissuti, 1 lavoratore, raccolta, M1 breve e corretto, ritorno/upgrade visibile. NIENTE ads/IAP reali.
**Milestone 2 (gioco vero):** miniera, orto, officina, 2 eroi giocabili, chiavi/frammenti, M2 barricata, un puzzle, 1 espansione quartiere. Test di 30 minuti continuativi.
**Milestone 3 (release candidate):** filiere, research, città più ampia, varianti M1/M2, M3/4/5 solo se completi, economie simulate e verificate, giornaliere e settimanali, salvataggio robusto, analitiche, ads e IAP, privacy e legal QA.
**Milestone 4 (dopo validazione):** quartieri aggiuntivi, eroi, nuovi puzzle, eventi e PC secondo dati e capacità. Non promettere 8 eroi/320 livelli se la qualità è inferiore.

## 13. Lista rischio/problema/criterio stop
P0 **Noioso** -> test play spontaneità e azioni significative per minuto; se giocatore non vuole riprovare M1 o non vuole continuare città, STOP altri sistemi.
P1 **City solo tap-to-claim** -> almeno 3 decisioni differenti per 10m con conseguenze visibili, STOP altri edifici.
P2 **Economia inceppata** -> simulazioni city-only/action-only/misto per 30gg con zero deadlock, e reward spendibili, STOP prezzi finali.
P3 **Troppe valute/menù** -> prime 10m max due valute economiche, progress token contestuali, STOP nuovi token.
P4 **Gacha/monetizzazione ingiusta** -> no potere IAP, rewarded proporzionate e volontarie, STOP pubblicazione SDK.
P5 **Asset incoerenti** -> palette, rig, proporzioni, LOD/texture atlas comuni; asset license proof per ognuno, STOP build store.
P6 **Costi/server e retention** -> report costi mensili/crescita, funnel e coorti; STOP campagne paid.
P7 **Inaccessibilità Android** -> test S25 e low-end, frame e leggibilità, touch gesture risolte, STOP go-live.

## 14. Contratti interni obbligatori per l'AI sviluppatrice
Mantenere Babylon.js + Capacitor già presenti e separare data gameplay da rendering. Un'unica tabella configurabile per item, fonti, sinks, recipe, livelli, reward missione, requisiti e unlocks. Validatore verifica grafo dipendenze senza cicli morti, premio duplicato, risorsa senza uso, edificio senza effetti nuovi, eventi accessibili solo pagando, reward ad duplicate. Snapshot e migrazione salvataggi, test offline e recovery.
La qualità non si certifica dai soli test automatici: player test osservato, video del device, bug triage e correzioni prima di produzione contenuti.

## 15. Decisioni operative di prodotto
- **Source of truth:** CITTA-DA-ZERO-MASTER.md per l'onboarding city-first e popolazione, questo V4 per l'insieme UX/fun/economia/asset/commerciale, docs/M1 etc come approfondimento storico solo dove compatibili.
- **Success metric:** volontà di ritornare per vedere e migliorare la città; monetizzazione è successiva al divertimento, non il contrario.
- **Non considerare completata** alcuna funzionalità documentata finché build/test reali non ne dimostrano funzionamento.
