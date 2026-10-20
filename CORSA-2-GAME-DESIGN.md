# CORSA 2.0 — SPECIFICA DI GAME DESIGN
20 ottobre 2026 · Documento teorico per l'AI sviluppatrice. **Non implementato o playtestato**.

## Obiettivo
Sostituire la corsa attuale descritta dall'utente: otto livelli noiosi, zombie che spawnano sotto il player o scompaiono, scelta laterale irrilevante, nemici che non minacciano, triplo colpo iniziale ingiustificato, assenza di scelte arma. Minigioco di **una corsa compatta di circa 75 s**, ripetibile per materiali della città, con vera abilità.

## Riferimenti studiati, non da clonare
- Last Z Dodge & Shoot: https://lastzguides.com/shooter-stages.html — fuoco e schivate, barili, ostacoli, premio base.
- Last War Frontline: https://www.reddit.com/r/LastWarMobileGame/comments/1fmr3yz/ — importanza ordine bersagli, acquisizione armi e risparmio fuoco; https://www.reddit.com/r/LastWarMobileGame/comments/1s68v67/ — incoerenza danni e scorrimento; https://www.reddit.com/r/LastWarMobileGame/comments/1fsnz6o/ — percorsi obbligati frustranti.
Le regole numeriche sotto sono **nostra proposta di tuning**, non regole dei concorrenti.

## Pilastri (obbligatori)
1. **Finestra 60–90 sec**; baseline 75s; niente 8 livelli o menu intermedi.
2. **Controllo a un dito**: laterale continuo, senza auto-centering. Personaggio in zona bassa, camera 3D inclinata; avanti automatico.
3. **Fuoco limitato**: auto-fire su bersaglio prioritario *nella traiettoria*; il personaggio non colpisce tutti, non può simultaneamente distruggere casse e fermare orde.
4. **Scelte**: in ogni run almeno 3 momenti con alternative incompatibili (due armi, sicurezza vs premio, bersagli), mai una sola risposta matematicamente superiore.
5. **Minaccia**: nemici possono raggiungere e danneggiare il giocatore, e gli ostacoli costringono a deviare; niente percorsi con risultato identico se si resta fermi.
6. **Feedback**: i colpi fermano/feriscono visibilmente gli zombie; sparo, hit, collisione, morte leggibili. Non utilizzare VFX eccessivi che coprano minacce.
7. **Equità**: spawn mai su player, fuori da zone percorribili impossibili; zero scomparsa ingiustificata; le scelte sono leggibili prima che sia troppo tardi.

## Loop di una singola corsa
0–5s: posizionamento, primo incontro leggibile; arma base con colpo singolo e nessun x3.
5–15s: **bivio arma**: SMG (migliore sui bersagli sostenuti) o shotgun (forte sui gruppi, debole su cassa distante); un solo premio raggiungibile.
15–35s: 2 incontri dove spendere fuoco su nemico vs cassa/risorsa; introdurre ostacolo che costringe a cambiare corsia.
35–60s: pressione incrociata di melee veloce e ranged telegraphed; seconda opportunità arma o protezione, non entrambi; poi zona raccolta.
60–75s: finale di sopravvivenza con élite o formazione ostacoli (non boss enorme obbligatorio), estrazione. Payout e ritorno città con CTA edificio desiderato.
Micro-respiro 1–2s dopo i picchi per leggere ricompensa/nuova minaccia; nessuna schermata di pausa.

## Armi e targeting (prima ipotesi)
Pistola iniziale: una traiettoria frontale, cadenza normale, feedback chiaro.
SMG: alto rateo ma danno singolo e dispersione: ottimo sulle casse con HP sostenuti, scarso per orde trasversali.
Shotgun: corto raggio, cono, molti bersagli ravvicinati; inferiore su casse lontane.
Perforante: attraversa nemici allineati, finestra di fuoco minore; richiede allineamento.
3 armi totali per il test, compresa pistola, poi verificare 4ª. Niente powerup gratuiti x3; triplo sparo eventualmente pickup raro e temporaneo bilanciato.

Targeting: priorità fisica alla cosa più vicina dentro un cono frontale predeterminato; non sparare attraverso ostacoli; mai oscillare ogni frame tra bersagli; lock minimo 0,25–0,5s (PARAMETRO TEST), esclusione bersagli dietro al player. Segnale visivo del bersaglio attuale senza UI rumorosa. Movimento laterale deve cambiare realmente bersaglio raggiungibile.

## Nemici: ruoli e contromisure
- Camminatore: avanza costante, minaccia basale, muore facilmente.
- Corridore: telegraph di accelerazione prima di carica in corsia; forza cambio posizione.
- Corazzato: resiste frontalmente, apre finestra sul fianco oppure necessita di fuoco sostenuto.
- Tiratore: proiettile con indicazione traiettoria e tempo di reazione; evitare corsia.
Max 2 archetipi contemporanei nei primi 20s, max 3 nella seconda metà. Non usare aumento HP indiscriminato. Le armi hanno tradeoff sui ruoli; mai introdurre un tipo che richieda obbligatoriamente un'arma non ottenuta.

## Matrice di incontri preautoriali
E1 Scelta SMG vs shotgun con barriera temporanea fra le corsie: entrambi accessibili, solo uno raccoglibile.
E2 Corridore centrale + cassa sinistra + percorso sicuro destra: cassa richiede dedicare fuoco; destra consente sopravvivenza.
E3 Orda orizzontale + barile esplosivo sul bordo: posizionamento e tempismo per farlo esplodere quando serve.
E4 Tiratore laterale + riparo distruttibile + premio incustodito opposto: priorità threat vs reward.
E5 Zona finale: corridori sui lati + corazzato al centro + percorso libero ma senza premio; almeno due percorsi fattibili con equip iniziale.
Ogni pattern deve essere validato con simulazione per «possibile evitare danni», «sufficiente tempo per ottenere premio se giocato bene», «nessuno spawn ingiusto».

## Spawn e persistenza — criteri non negoziabili
- Spawning a partire da una **soglia mondo ahead** fuori dal limite visivo superiore + margine, mai su o dietro giocatore. Apparizione naturale a ingresso campo visivo.
- Spawning precomputato da segmenti o director che controlla distanza minima, corsie occupate e possibili traiettorie di attraversamento; ogni ostacolo pericoloso deve lasciare almeno una traiettoria schivabile con il massimo tempo di reazione.
- Evitare despan temporizzati nel viewport. Rimuovere solo quando morto, arriva logicamente a fine percorso, oppure supera culling dietro camera dopo essere uscito dalla schermata; se colliderebbe, risolvere danno prima di rimozione.
- Hitbox corpo coerenti con grafica, invulnerabilità brevissima dopo colpo, indicatori prima di cariche/proiettili. Non spawnare zombie sotto player. Evitare teletrasporti.
- Test automatico 1000 semi: zero spawn nel player, zero corsie totalmente bloccate senza via di uscita, zero reward irraggiungibili per bug; test visivi su Android 30/60fps.

## Difficoltà dinamica *leggibile*
Definire difficoltà per numero di minacce simultanee, traiettorie, opportunità di fuoco, preavviso e combinazioni; non raddoppiare solo HP.
- Beginner: 1 decisione alla volta, >=1s telegraph, ampio corridoio libero; possibilità di perdita ma no difficoltà cieca.
- Standard: max 2 minacce concomitanti, premi rischiosi, 0,8–1,0s telegraph.
- Challenge: 2–3 minacce con combinazioni precise, 0,7–0,9s telegraph, nessun colpo inevitabile.
*(Valori solo da tarare con input latency, geometria, velocità e dimensioni reali del device.)*
Difficoltà adattiva SOLO fra run (o blocchi) e mai nerf nascosti al danno del giocatore in base alla monetizzazione. Evitare dead-end fissi e seed punitivi.

## Ricompense e città
Base payout alla fine e parziale se si muore, bonus per casse rischiose e precisione/HP finale. Premiare abilità senza obbligare a fare 20 run per un singolo upgrade. Materiali utili all'edificio che il giocatore sta cercando di potenziare, selezione missione guidata dal fabbisogno. Pubblicità premiata dopo payout, bonus su risorse comuni limitato. Nessun annuncio nel mezzo della corsa.

## Criteri QA / playtest
- Su device reale, partita mediana 60–90s; nessuna schermata intermedia.
- Test input: giocare totalmente immobili deve risultare svantaggioso e spesso non garantire completamento.
- Test equivalenza: almeno due traiettorie differenti per seed producono esiti/ricompense diversi, entrambe praticabili.
- Test armi: 3 configurazioni creano vantaggi/difetti misurabili; non una dominante.
- Test spawn: 0 apparizioni sotto o addosso player; 0 sparizioni premature nel viewport.
- Test difficoltà: il 60–80% dei nuovi giocatori supera il primo run (TARGET DA TESTARE, non benchmark) e una seconda run resta da giocare per migliorare punteggio/reward.
- Sondaggio tester: «hai capito perché hai subito danni?», «potevi evitare il colpo?», «quale scelta arma ha cambiato la run?». Se no, cambiare design, non aumentare HP.
- Telemetria: path/lane heatmap, cause morte, casse attaccate/non aperte, arma scelta, danno subito, spawn bug, tempo run, retry spontaneo, ricompensa/min.
