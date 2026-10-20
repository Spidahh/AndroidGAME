# STUDIO MODALITÀ ESISTENTI — AndroidGAME
Data: 20 ottobre 2026
Stato: ricerca comparativa e specifiche proposte, non minigiochi già implementati.

## Regole metodologiche
**OSSERVATO** = documentato in guida/fonte consultata; **ADATTAMENTO** = meccanica proposta per AndroidGAME; **PARAMETRO TEST** = numero inventato per una prima simulazione, NON attribuito al concorrente. Non riprodurre nomi, livelli, grafica, animazioni o testi protetti di altri giochi. Si studiano meccaniche e si ricreano contenuti propri.

## 1. Last Z — Dodge & Shoot / Shooter Stages
Fonte https://lastzguides.com/shooter-stages.html e https://lastzguide.com/beginner-guide/
**OSSERVATO**: avanzamento verticale/automatico, movimenti laterali, fuoco, orde, ostacoli, barili/gate, fine livello con ricompensa XP eroi e altre risorse. Modalità collegata alla progressione di base.
**Regole recuperabili**: scorrimento automatico; posizione del giocatore cambia bersagli raggiungibili e collisioni; distruzione di barili/ostacoli per bonus; checkpoint finale; output missione collegato a crescita città.
**Non verificato**: durata esatta media, percentuali drop, danno, velocità e regole di targeting. Non spacciare per ufficiali.

### ADATTAMENTO AndroidGAME — A. Corsa di recupero
- Input: trascinamento orizzontale di un personaggio, auto-avanzamento, auto-fire verso minaccia davanti entro cono di tiro (per PC A/D o mouse).
- Spazio: 3 corsie logiche, movimento continuo fra corsie; 12 segmenti di una run. PARAMETRO TEST: 90–150 s.
- Spawn: 3 archetipi (lento, rapido, ranged) e 3 interazioni (cassa premio, barriera distruttibile, pericolo). Segmenti definiti con budget minaccia, no pura RNG ingestibile.
- Vittoria: arriva all'estrazione con almeno 1 HP. Sconfitta: salute 0.
- Scelta centrale: puntare la cassa (rischi nemico) oppure ripulire i nemici (rinunci al premio); attraversare una corsia più redditizia ma pericolosa.
- Ricompensa: rottami base per completamento + parti raccolte + piccolo bonus prestazione; niente reward derivato da upgrade matematici visibili. Anche fallimento assegna raccolto parziale.
- Skill eroi: Assaltatore migliore attacco, Tecnico interazione più efficace, Guardiano più margine su danni. Non garantire scelta dominante.
- Difficoltà: combinazione simultanea corsie/pericoli/timing, non solo moltiplicare HP.
- MVP: un solo personaggio, 3 segmenti, 2 nemici, una cassa e uscita. QA: evitare impossibilità di schivata, fuoco imprevedibile, hitbox poco chiare.
- Commerciale: gameplay visuale forte per ads REALI; reward video facoltativa sul ritorno, non sulla vittoria.

## 2. Last War — Frontline Breakthrough/Operation Falcon
Fonti https://www.virgovixen.info/events/frontline-breakthrough/ ; https://www.ldshop.gg/blog/last-war-survival/last-war-frontline-breakthrough-guide.html ; https://heaven-guardian.com/last-war-frontline-breakthrough-guide/ ; https://www.reddit.com/r/LastWarMobileGame/comments/1s68v67/the_secret_of_frontline_breaktrough/
**OSSERVATO**: formazione spostata lateralmente, sparo a barili che liberano soldati o armi, ostacoli e nemici, preservare unità a fine livello. Documentazione indica campagna permanente e anche un evento settimanale a cinque fasi in alcune versioni/coorti: NON fondere le regole. Alcune guide indicano unità residue come fattore della ricompensa/ranking. Segnalazioni giocatori lamentano livelli con curve di difficoltà incoerenti e video guida che non rispecchiano i danni effettivi.
**Regole recuperabili**: rischio di perdere elementi di formazione, ottenere nuove unità/upgrade durante il percorso, scegliere bersagli/ordine delle casse, ottimizzare superstiti.

### ADATTAMENTO AndroidGAME — B. Convoglio
- Un eroe guidato con drag e fino a due aiutanti temporanei che si uniscono nella missione. Lo scopo non è moltiplicare numericamente soldati, ma proteggere un piccolo convoglio/trasporto.
- Vittoria: trasporto arriva con integrità >0; bonus per aiutanti sopravvissuti e materiale trasportato. Sconfitta: trasporto distrutto.
- Target choice: sparare alla cassa con strumento / nemico che minaccia il trasporto / barriera che impedisce il passaggio. Limite: 1 sola scelta difficile per segmento, telegraph pulito.
- Progressione: potenziamento officina cambia dotazioni iniziali, non numeri di soldati a moltiplicatore. No PvP in V1.
- PARAMETRI TEST: missione 90 sec, 4 settori, 3 classi di nemico, massimo 2 aiutanti, payout risorse con tetto.
- Confronto con A: condivide movimento e sparo, ma difesa obiettivo e salvaguardia risorse come condizione, non semplice survival.
- RISCHIO: se simile a mode A, non inserirla come modalità distinta V1; evolverla come variante di A.

## 3. Whiteout Survival — Snowbuster
Fonti https://centurygames.helpshift.com/hc/en/64-whiteout-survival/faq/8133-what-random-events-can-occur-in-a-stage/ ; https://wiki.wosforge.org/wiki/Snowbuster/it ; https://www.whiteoutsurvival-community.com/tools/wiki/events/snowbuster-wsco.html?lang=ur ; https://www.whiteoutsurvival.wiki/events/snowbusters/
**OSSERVATO**: ripulire la neve/esplorare area, consumo carburante, materiali sepolti, persone salvate temporaneamente, fuoco/carbone/salute, creature, strumenti a tempo, liberazione del 95% per completare area, evento ricorrente a 25 aree in guide community; la fonte ufficiale conferma eventi casuali come bestie, superstiti, casse, tempeste e utensili. **Da non importare**: carburante che si rigenera tramite attesa o acquisti per giocare.

### ADATTAMENTO AndroidGAME — C. Scavo/Recupero
- Mappa top-down a celle con ostacoli da rimuovere con un personaggio e attrezzo. Input: spostamento tramite drag; azione automatica quando sei vicino a una cella scavabile, o tap esplicito per priorità (da testare).
- Obiettivo: estrarre un numero fissato di casse o individuare l'uscita e tornare prima che integrità attrezzo/salute arrivi a zero. Alternativa: completamento percentuale, ma da confrontare con obiettivi mirati.
- Risorse: casse e giacimenti visibili/scoperti; parti rare nei settori rischiosi. Migliorare attrezzo tramite officina amplia area di scavo o modifica capacità.
- Criticità: senza limite di energia/tempo attesa, introdurre rischio spaziale, resistenza dello strumento *ripristinata automaticamente a fine partita*, senza attese. Non bloccare la ripetizione.
- PARAMETRI TEST: mappa 12x12, 3 depositi richiesti, 60–120 sec, 2 pericoli; 3 possibili layout. Reward legata a scavo utile e obiettivo, non solo completamento meccanico 95%.
- Questa è realmente diversa da A: navigazione, scoperta, scelta del rischio, non shooter.
- Riuso: stessa camera/render/eroe con attrezzo invece di arma; texture/tessere modulari.
- Marketing: prima/dopo mappa, scoperte, passaggio materiale->upgrade città.

## 4. Whiteout Survival — Treasure Hunter
Fonte https://www.whiteoutsurvival-community.com/tools/wiki/events/treasure-hunter-wsco.html
**OSSERVATO**: tavola 5x5, ogni casella scavata usa un piccone, scegli un tesoro obiettivo, il ritrovamento consente piano successivo, premio maggiore ogni quinto piano secondo community guide. Risorsa d'ingresso nel concorrente legata a missioni giornaliere.
### ADATTAMENTO D. Ricerca tesori (microevento)
- Tabellone 5x5 con segnali di prossimità/indizi leggibili, 6 mosse gratuite per round (PARAMETRO TEST). Invece di consumare ticket acquistabili, la sfida è il punteggio su pochi scavi; missioni sempre accessibili. 
- Per ora **NON per V1**: puzzle di probabilità rischia di somigliare a fortuna/ads reward e non basta come gioco action.
- Se usata in evento stagionale, premio materiale limitato e bonus cosmetico; evitare monetizzazione a biglietti.

## 5. Township — Regatta / missioni collegate
Fonte ufficiale https://playrix.helpshift.com/hc/en/3-township/faq/16605-about-the-regatta-1765929812/ e https://playrix.helpshift.com/hc/en/3-township/faq/16608-chests-in-the-regatta-1765929815/
**OSSERVATO**: task cittadini + match-3, punteggio per compiti, casse premio ai traguardi, ricompense di evento e classifiche. Una versione della guida ufficiale menziona 12 task (6 + 6), aggiornamenti possono modificare regole.
### ADATTAMENTO E. Contratti città ed eventi
- Tabellone con 3 obiettivi giornalieri che coprono missioni, raccolta AFK e costruzioni; attività normale avanza il tabellone, premia risorse e cosmetici.
- Obiettivo settimanale generato da pool con 5 traguardi, mai obiettivi che obbligano PvP/acquisti/ads.
- Ciclo mensile di 4 settimane con traccia gratuita cosmetica; senza leaderboard online V1.
- Rewarded facoltativa per piccolo premio extra non esclusivo; progressione base indipendente.
- Quest cycle offline locale: manipolabile con data telefono; non vendere un battle pass premium o ranking in V1 senza tempo affidabile.

## 6. Whiteout/Last War — boss e ricorrenza
Fonti https://whiteoutsurvivalhandbook.com/guides/whiteoutsurvival-bear-hunt-guide-2026 ; https://www.lastwarvault.com/guides/general/wanted-boss-guide/
**OSSERVATO**: boss di danno/punteggio che ricorre con cadenza nota, premi per contributo o soglie; Bear Hunt richiede alleanza e coordinamento, Wanted Boss premia danni in 90 s secondo guida community.
### ADATTAMENTO F. Sfida settimanale del distretto
- Sfida single-player a punteggio contro nemico/obiettivo resistente, 60–90 sec, personale best score e 5 traguardi di premio. Usa sistema di fuoco e personaggio della modalità A.
- Non copiare club/alliance per un progetto solista; non introdurre rete per un evento settimanale.
- Non adottare P2W leaderboard: gara opzionale normalizzata, inizialmente punteggi locali senza premi competitivi.

## 7. Cosa va in V1 davvero
**Mini game giocabili**: A Corsa di recupero + C Scavo/Recupero. 
**Sistema eventi**: E Contratti + F sfida settimanale riusando A (solo quando il core diverte).
**Varianti future**: B Convoglio (solo se differisce davvero da A) e D ricerca tesori (solo evento, niente lotteria monetizzata).
Questo massimizza diversità gameplay con due sistemi base: action + raccolta/esplorazione, stessa città, stessi eroi e materiali.

## 8. Regole di progettazione comuni
- Per ogni minigame: input chiaro (touch e PC), obiettivo, ciclo, condizione vittoria/sconfitta, difficoltà, esito visivo, base reward e bonus skill, tempo missione, collegamento edifici/eroi, telemetria.
- Nessuna attività che richieda attesa/energia per essere ripetuta.
- Reward base non dipende da pubblicità, ads extra limitate e mai schemi unici o power PvP.
- Reward valuta comune/oggetti tramite `MissionResult`; evitare exploit reward duplicata quando si ricarica la scena o si interrompe app.
- Ogni attività deve restare utile nel mid-game. Materiali diversi da scelte diverse ma alternative ragionevoli per evitare costringere a una modalità non amata.
- Parametri playtest: tempo medio run, percentuale vittoria per esperienza, raccolta per minuto, tasso retry volontario, scelta modalità, percezione controllo. Non usare unicamente il click sulle ads come successo.

## 9. Difetti documentati dei concorrenti da evitare
- Last War: giocatori segnalano difficoltà incoerente/controlli imprecisi in Frontline e video guide non corrispondenti al comportamento reale: https://www.reddit.com/r/LastWarMobileGame/comments/1s68v67/the_secret_of_frontline_breaktrough/
- Last Z e Last War: loro loop comprende base e timer; non vendere advertised action come intero gioco se è solo un sottogioco: https://lastzguide.com/beginner-guide/ e https://fakeadgames.com/archive/last-war-survival
- Snowbuster: carburante rigenerato/consumabile limita partite anche se il minigame piace: https://www.whiteoutsurvival.wiki/events/snowbusters/ ; per AndroidGAME niente attesa.
- Township: missioni cittadine e match-3 spesso competono per il tempo; offrire ricompense trasversali e missioni coerenti con ogni stile.

## 10. Questioni che richiedono playtest, non congetture
La difficoltà ottimale, la velocità orizzontale, il targeting, la giusta scelta eroe/missione, ricompense per fallimento, il limite AFK, parametri delle mappe, il numero di risorse ed edifici: vengono definiti nel GDD come valori temporanei e cambiati sulla base di un test Android vero.

## 11. Diritto e riuso
È lecito studiare regole e convenzioni di genere, ma NON presumere di poter utilizzare senza licenza codice, video ads, UI, modelli, suoni, marchi, mappe e livelli appartenenti a concorrenti. Per il prodotto commercializzato usare asset CC0/MIT con relative verifiche e attribuzioni/licenze, design dei livelli e identità visiva originali.
