# Economia, progressione, eventi e ricerca

Modello numerico e analisi della soluzione proposta in [PROGETTO.md](PROGETTO.md), 20 ottobre 2026. Le cifre progettate qui non sono dati di mercato, risultati di test o valori approvati dall'utente. Servono a rendere la raccomandazione controllabile e sostituiscono le precedenti tabelle.

## 1. Priorità confermate

Le attività delle ads rese realmente giocabili sono l'attività principale. La città conserva i progressi. Tutti gli upgrade rimangono ottenibili e cumulativi con denaro e oggetti di gioco, senza percorsi esclusivi. Il progetto non deve diventare pay-to-win o povero di cose da fare.

Il modello raccomandato mantiene tre risorse spendibili: materiali M, componenti C e crediti K. Nessuna serve da energia per avviare le attività. Non si attribuisce all'utente l'approvazione di questi nomi o quantità.

## 2. Unità di riferimento e risultati

Una missione ordinaria completata assegna il paniere **B = 60 M / 30 C / 100 K**. È un riferimento di calcolo, non una nuova valuta mostrata al giocatore. Le tre attività hanno lo stesso riferimento iniziale; differenze reali di tempo e difficoltà richiederanno una taratura coerente.

Raccomandazione iniziale per le difficoltà: ordinaria ×1, impegnativa ×1,4, avanzata ×1,8. Le difficoltà sono selezionabili, senza requisiti di livello o capitolo. I fattori non dimostrano da soli una ricompensa equivalente per minuto: la durata effettiva deve essere osservata in seguito.

Il premio ordinario è diviso in traguardi intermedi, complessivamente fino al 60%, e completamento finale, 40%. Il risultato assegna soltanto ciò che non era già stato registrato. In Difesa la terza fase può contenere un traguardo intermedio prima della conclusione: non si confonde «tre fasi» con tre premi pieni.

Un bonus di abilità può aggiungere fino al 20% del paniere della difficoltà scelta. La sconfitta conserva i traguardi conclusi; non sottrae risorse cittadine. Il progresso viene ponderato sugli obiettivi svolti, senza regalare una grande quota per un ingresso e un abbandono immediati.

La revisione di PROGETTO §20 specifica una condizione di abilità propria della missione (+10%, con completamento) e una cassa opzionale (+10%, conservata se recuperata anche su rientro). Reazioni, raccordi e macchine non generano premi ordinari aggiuntivi. Le trasformazioni della Difesa mantengono il numero di attori del pacchetto, ma ne cambiano tipi e accessi; la milestone viene calcolata sul manifest risultante. I prezzi del catalogo e il limite totale del bonus restano quelli già definiti.

Si può ripetere una missione conosciuta per guadagnare. Non si riduce di nascosto il premio perché si è migliorati o si è scelto di potenziare altro. Una nuova partita genera un nuovo risultato; ricaricare la stessa partita non rigenera il bottino.

### Priorità del bottino senza obblighi di modalità

Prima di partire si sceglie la distribuzione, comune alle tre attività:

| Priorità | Materiali | Componenti | Crediti |
|---|---:|---:|---:|
| Bilanciata | 60 | 30 | 100 |
| Materiali | 96 | 21 | 70 |
| Componenti | 42 | 48 | 70 |
| Crediti | 42 | 21 | 160 |

Il valore equivalente di ogni riga è 3: M/60 + C/30 + K/100. Le priorità concentrano il premio, non aggiungono una risorsa esclusiva a una modalità. I fattori di difficoltà e bonus si applicano ai numeri mostrati, con arrotondamento per difetto solo al risultato.

## 3. Dotazione e acquisti liberi

Dotazione iniziale raccomandata: **120 M / 60 C / 200 K**, Centro, Deposito 1 e un personaggio gratuito scelto dal catalogo. Il tutorial facoltativo non aggiunge una seconda copia della dotazione a chi lo ripete.

Non è prescritto un primo acquisto: il giocatore può costruire, comprare strumenti, migliorare il personaggio o usare i crediti per il reclutamento. Le attività sono già accessibili senza spendere in un ramo specifico.

La scheda dell'acquisto mostra costo, saldo e risultato. Spostamenti urbani e cambi di formazione sono gratuiti. Non si distruggono upgrade per provarne altri. I soldi reali non acquistano queste risorse nel modello commerciale raccomandato.

## 4. Costi degli edifici

Per il livello n da acquistare, da 1 a 10, il costo di riferimento è:

**C(n) = B × [1 + 0,08 × (n − 1)²]**, arrotondato per eccesso per ciascuna risorsa.

| Livello acquistato | Fattore | M | C | K |
|---|---:|---:|---:|---:|
| 1 | 1,00 | 60 | 30 | 100 |
| 2 | 1,08 | 65 | 33 | 108 |
| 5 | 2,28 | 137 | 69 | 228 |
| 10 | 7,48 | 449 | 225 | 748 |

Il prezzo è fisso per quell'acquisto, indipendente dal giorno, dalla campagna e dall'ordine degli altri investimenti. Per alzare il livello dello stesso edificio si comprano i suoi livelli precedenti; non si richiedono altri edifici, categorie o capitoli.

La somma dei fattori dei dieci livelli è **32,8 B**, prima degli arrotondamenti. È un controllo di costo finito per completare un edificio, non una misura del tempo reale necessario. Il Deposito iniziale possiede già il livello 1: non viene fatto pagare di nuovo.

Gli effetti funzionali aggiuntivi hanno costo iniziale di **1 B ciascuno** e sono tutti acquistabili senza esclusioni fra loro. La progressione comprende quindi interventi riconoscibili accessibili senza attendere molti livelli di incremento numerico.

Raccomandazione degli effetti di livello:

- Officina e Bastione: +2% dell'efficacia di riferimento per livello oltre il primo, additivo rispetto alla base.
- Centrale: −1% del recupero operativo di riferimento per livello oltre il primo; il catalogo aggiuntivo viene dimensionato per mantenere recuperi positivi e tutti i bonus utili.
- Accademia: +10% del contributo base dell'esperienza per livello oltre il primo. Non diventa una chiave per comprare gli upgrade dei personaggi.
- Produttori: tasso definito nella sezione AFK.
- Deposito: cap definito nella stessa sezione.
- Quartiere civico: stati estetici e progetti urbani, senza bonus di combattimento legati alle decorazioni.

Funzioni iniziali del livello 1, per non vendere fondazioni prive di effetto: Officina +5% dell'efficacia base degli strumenti; Bastione +5% del danno delle torri e dell'integrità dei dispositivi; Centrale −2% del recupero base degli strumenti; Accademia +10% del contributo base di esperienza. Gli incrementi oltre il primo livello indicati sopra si aggiungono a questi valori. I produttori, il Mercato e il Deposito hanno già la funzione iniziale descritta nelle rispettive formule; il Quartiere civico introduce il primo stato estetico.

Costi e bonus sono parametri della raccomandazione, non prova che ogni prezzo sia già giusto. Un costo che rende poco utile il giocare viene corretto, senza vendere la scorciatoia al problema creato.

## 5. Livelli dei personaggi e strumenti

Per passare dal livello corrente l al successivo, con l da 1 a 29:

**T(l) = B × (0,10 + 0,02 × l)**, arrotondato per eccesso.

La somma dei fattori è **11,6 B** per portare un profilo da 1 a 30, prima degli arrotondamenti. I sei upgrade funzionali del profilo costano 1 B ciascuno e non richiedono di raggiungere prima un particolare livello. Un nuovo profilo non deve essere passato per una campagna obbligatoria.

L'esperienza di una missione completata paga inizialmente il 20% del costo del livello successivo dell'attivo; ogni supporto riceve metà di quel contributo. L'Accademia aumenta il contributo. Il progresso frazionario viene conservato senza perdita da arrotondamento; può coprire al massimo un livello per risultato. Si può sempre pagare subito il residuo con le risorse richieste.

L'esperienza non si converte in crediti spendibili per reclutare e non crea una quarta valuta commerciale. Se il livello viene comprato prima del completamento della quota di esperienza, la quota acquisita viene usata nel prezzo di quel livello, senza rimborso monetario.

Ogni strumento comune costa inizialmente 1 B. I miglioramenti dell'Officina si applicano a tutti quelli posseduti nel contesto pertinente. Nessun acquisto impone di rinunciare a un altro strumento in inventario.

## 6. Reclutamento e garanzia

Costi raccomandati: estrazione 100 K, reclutamento diretto 1.000 K. Catalogo uniforme di otto profili; duplicato 50 K; garanzia dell'obiettivo al massimo alla ventesima estrazione se non già ottenuto. Regole e probabilità complete sono in [PERSONAGGI-E-SQUADRA.md](PERSONAGGI-E-SQUADRA.md).

Con premi bilanciati di 100 K, destinando tutti quei crediti al reclutamento diretto, dieci missioni ordinarie completate forniscono 1.000 K. È un esempio aritmetico; non presume che il giocatore voglia rinunciare agli altri acquisti o ottenga sempre il completamento.

Una estrazione da 100 K che restituisce un duplicato da 50 K ha una perdita netta di 50 K: non genera credito infinito. Non è richiesto collezionare duplicati per migliorare un personaggio. Quando il catalogo è completo le estrazioni funzionali vengono sospese.

Il gacha è una raccomandazione della soluzione, non un'esclusione delle alternative decisa dall'utente. I crediti funzionali non si comprano con soldi reali nel modello qui proposto.

## 7. Conversione e oggetti

Il Mercato usa il rapporto 60 M = 30 C = 100 K. La conversione perde il 20% del valore equivalente al primo livello; ogni livello oltre il primo riduce la perdita di un punto percentuale, arrivando all'11% al livello 10. La perdita rimane positiva.

Esempio al livello 1: 60 M → 24 C → 38 M, arrotondando per difetto. Un ciclo di cambio non produce ricchezza. Il cambio corregge gli avanzi; scegliere la priorità prima di giocare è più efficiente.

La proposta non introduce oggetti essenziali esclusivi di eventi, acquisti o una singola modalità. Eventuali nuovi materiali specifici dovranno avere vie di gioco compatibili con la libertà di progresso. Non sono prerequisiti nascosti della soluzione attuale.

## 8. Produzione passiva

Ogni produttore genera solo la propria risorsa. Al livello 1 il tasso orario è un ottavo della componente del paniere B: **7,5 M**, **3,75 C**, **12,5 K**. In otto ore, con tutti e tre i produttori presenti, maturano **60/30/100**, cioè 1 B.

La produzione considera un solo edificio funzionale per tipo, come stabilito nel progetto canonico; le copie decorative non aggiungono altri flussi. I calcoli seguenti non presuppongono produttori illimitati.

Al livello n il tasso si moltiplica per **1 + 0,10 × (n − 1)**. Due miglioramenti di efficienza cumulativi per produttore aggiungono il 15% ciascuno del tasso di riferimento del livello: moltiplicatore finale 1,30, senza crescita composta fra le due carte.

Il Deposito al livello n accumula **8 + 0,5 × (n − 1) ore**: 8 ore iniziali, 12,5 al livello 10. Non esistono ulteriori carte di cap nella proposta di partenza. Questo evita di vendere livelli senza una funzione o di sovrapporre formule contraddittorie.

Con produttori 10 ed entrambe le efficienze, il tasso è 1,9 × 1,3 = 2,47 del riferimento. Un cap completo di 12,5 ore vale **3,859375 B** prima degli arrotondamenti. È più di una missione e resta limitato; il suo peso reale dipende dalle abitudini dei giocatori, non da una percentuale promessa.

Le frazioni maturate vengono conservate. Ogni modifica chiude il vecchio intervallo al vecchio tasso e applica il nuovo da quel momento. Raccogliere aggiunge le risorse al saldo; non taglia il saldo attivo al cap AFK. Nessun bonus pubblicitario è necessario per incassare.

## 9. Contratti, eventi e maestrie

Raccomandazione: tre contratti giornalieri disponibili, ciascuno con alternative pertinenti alle attività; completarne uno assegna il 10% di B alla difficoltà ordinaria. Non si consumano risorse della città per riscuotere. Un contratto accettato resta valido fino alla conclusione e occupa uno spazio; nuovi contratti non si accumulano senza limite.

Progetto settimanale: cinque traguardi personali, ciascuno 20% di B, più un riconoscimento estetico alla conclusione. Il progetto accettato può essere concluso oltre la settimana; non si avviano più progetti arretrati in parallelo. Nessun requisito di accesso consecutivo o d'alleanza.

Le rotazioni introducono regole facoltative delle attività esistenti, non nuove valute indispensabili. Le maestrie riconoscono prestazioni differenti e non autorizzano acquisti che altrimenti sarebbero vietati.

Non si propone un reset stagionale di città e personaggi. Un futuro pass o ciclo di cosmetici non serve a rendere significativa la prima uscita. Limiti, calendario e premi sono parametri della raccomandazione, non decisioni già approvate.

## 10. Rewarded: impatto dichiarato

Bonus del 20% delle risorse ordinarie effettivamente riconosciute su massimo tre risultati al giorno, arrotondato per difetto per risorsa al momento dell'accredito. Con difficoltà ordinaria e priorità bilanciata, un risultato completo offre **12 M / 6 C / 20 K** extra; tre aggiungono **36/18/60**, cioè 0,6 B. Priorità e difficoltà diverse cambiano gli importi: con priorità crediti ordinaria il bonus è 8/4/32 per risultato. Bonus di abilità e altri premi non vengono moltiplicati.

I crediti extra entrano nel saldo ordinario e possono finanziare anche il reclutamento: i 60 K dell'esempio bilanciato sono il costo del 60% di un'estrazione. Non si afferma quindi che la pubblicità non abbia alcun impatto sull'acquisizione. Non cambia però probabilità, contatore di garanzia o potenza esclusiva, e i crediti non sono acquistabili con denaro reale nel modello raccomandato.

Nessuna pubblicità in mezzo alla partita, per ripartire dopo una sconfitta o per incassare il premio base. L'assenza di un annuncio disponibile non interrompe il gioco. Il limite giornaliero richiede una gestione coerente dei dati; un orologio locale non garantisce la resistenza alle manipolazioni.

## 11. Ricerca competitiva: fatti e inferenze

Fonti primarie consultate il 20/10/2026. Le descrizioni degli editori sono dichiarazioni del prodotto, non nostri playtest; le recensioni isolate non misurano la popolazione dei giocatori. Non si usano incassi o download altrui come previsione economica.

| Riferimento | Fatto sostenuto dalla fonte | Inferenza per questa proposta |
|---|---|---|
| [Last War, scheda e risposta dello sviluppatore](https://apps.apple.com/us/app/last-war-survival/id6448786147) | La scheda presenta corsie, riflessi e base; una risposta dello sviluppatore descrive il passaggio dalle missioni alla strategia più profonda | Mantenere le attività principali anche nella progressione avanzata; non cambiare promessa dopo l'introduzione |
| [Mob Control, descrizione ufficiale](https://play.google.com/store/apps/details?id=com.vincentb.MobControl&hl=en) | Descrive crescita della folla, elementi mobili, campioni e modalità, oltre a raccolta e upgrade | La semplicità del comando può essere accompagnata da composizione degli incontri e crescita visibile; non basta una porta con un numero |
| [Dreamdale, descrizione ufficiale](https://play.google.com/store/apps/details?id=com.dream.dale&hl=en) | Descrive raccolta, strumenti, edifici, espansione e combattimento | È sensato progettare insieme intervento sul campo e crescita urbana; il collegamento deve essere giocabile e non soltanto mostrato nel riepilogo |
| [Cup Heroes, scheda dell'editore](https://play.google.com/store/apps/details?id=com.studio501.cuphero&hl=en_US) | Presenta personaggi migliorabili, ostacoli, scontri e oggetti casuali nell'informativa dello store | Reclutamento e crescita possono accompagnare un'azione semplice, ma la scheda non dimostra equilibrio o assenza di pay-to-win |

I riferimenti storici Township, SimCity BuildIt, Whiteout Survival e Frozen City riguardavano soprattutto città ed eventi. Restano contesto, senza sostituire lo studio delle attività principali. Non vengono copiate regole numeriche non verificate.

La soluzione proposta non è dimostrata unica o vincente: la differenza progettata è mantenere attività giocabili profonde, progressione libera e monetizzazione separata dalla vendita di potenza. L'interesse effettivo del pubblico è ancora da misurare.

## 12. Verifiche sulla carta e limiti

Controlli richiesti al modello: stesso valore delle quattro priorità, costi finiti dei cataloghi, nessun ciclo di conversione redditizio, assenza di duplicazione dei premi, gacha con probabilità complete e garanzia, AFK che non taglia il saldo attivo, nessun requisito di acquisto incompatibile con la progressione libera.

Divertimento, tempi reali, prestazioni, retention e ricavi non possono essere dedotti dalle formule. La proposta rende questi aspetti affrontabili in modo coerente, senza dichiararli risolti da un foglio di numeri.

## 13. Specifiche economiche esecutive

I valori seguenti completano la base proposta per lo sviluppo. Non sono prezzi o ritmi di gioco approvati dall'utente. I cataloghi di upgrade sono in PERSONAGGI-E-SQUADRA §§8–10; la logica applicativa e il salvataggio sono nella [specifica esecutiva](SPECIFICA-ESECUTIVA.md).

### Spazio urbano e decorazioni

Griglia iniziale 12×12 celle da 1 m. Centro 3×3; Deposito 2×2; Officina, Accademia, Ricicleria, Fonderia, Mercato e Bastione 3×3; Centrale 2×2; Quartiere civico 4×4. Coordinate iniziali del vertice minimo: Centro (4,4), Deposito (8,4). Rotazione a quarti di giro, spostamento gratuito con conferma solo su celle libere; i due edifici iniziali sono spostabili.

Sei ampliamenti acquistabili in sequenza geometrica con sole risorse: 16×12, 16×16, 20×16, 20×20, 24×20, 24×24. Costo dell'ampliamento k, da 0 a 5: **B × (2+k)**, totale 27 B. La sequenza espande l'area, non impone di comprare edifici o cambiare attività. Nessun danno ai beni quando si annulla una preview.

Sei decorazioni base, ognuna sbloccabile per **6 M / 3 C / 10 K**: panchina 1×1, albero 1×1, lampione 1×1, cassa ornamentale 1×1, aiuola 2×1, statua 2×2. L'acquisto abilita copie decorative gratuite, senza bonus economici; il limite fisico è l'area disponibile. Copie decorative degli edifici posseduti usano la stessa regola e non duplicano la funzione. Rimuovere un arredo lo rimette nel catalogo senza perdere lo sblocco. La produzione continua anche mentre si sposta un edificio.

Quartiere civico: i suoi livelli aggiungono stati visivi cumulativi nel lotto, senza richiedere gli sblocchi separati delle decorazioni. Livello 1 pavimentazione; 2 due panchine; 3 due aiuole; 4 due lampioni; 5 due alberi; 6 statua centrale; 7 bordi rifiniti e due panchine ulteriori; 8 insegna luminosa; 9 due alberi ulteriori; 10 stemma e finitura della piazza. Il modello del lotto mantiene tre gruppi di complessità, mentre i props distinguono tutti i dieci livelli. Ogni costo produce un cambiamento identificato, senza bonus di combattimento.

### Livelli e acquisti: ordine di calcolo

- Officina livello n: efficacia strumenti +[5 + 2(n−1)]% della base; OFF_U1 aggiunge altri 25 punti percentuali della stessa base. Al livello 10 con carta: +48% complessivo.
- Bastione livello n: danno torri e integrità dei dispositivi +[5 + 2(n−1)]% della base; BAS_U1 aggiunge +25% al danno delle torri. BAS_U2 aggiunge +25% all'integrità delle barriere e all'obiettivo di Difesa, ma l'obiettivo non riceve il bonus di integrità ordinario dei dispositivi.
- Centrale livello n: recupero strumenti ×[1 − 0,02 − 0,01(n−1) − 0,10 se CEN_U1]. Al massimo: recupero 6 × 0,79 = 4,74 s; nessun tetto rende inutile una carta.
- Accademia livello n: contributo XP ×[1 + 0,10n]. Senza edificio il moltiplicatore è 1. Al livello 10, una vittoria copre il 40% del livello successivo dell'attivo e il 20% di ciascun supporto.
- CEN_U3: interazione 0,4 × 0,75 = 0,3 s. Non si applica al tempo di recupero degli attacchi.
- Bonus di portata o raggio provenienti da attributi compatibili si sommano rispetto alla base, poi si applicano i valori fissi. Nessuna moltiplicazione composta implicita.

Quota XP salvata come percentuale razionale del costo del livello attuale, massimo 100%. A ogni vittoria aggiungere il contributo; al 100% il costo residuo è zero ma il passaggio richiede la conferma gratuita, evitando acquisti automatici indesiderati. Una quota oltre 100% non si trasferisce al livello successivo. Se si paga prima, consumare la quota nel prezzo e azzerarla per il nuovo livello. Il costo residuo di ogni risorsa è `ceil(costo_intero × (1−quota))`. Non si aumenta il livello di un personaggio non posseduto.

### Percorsi di acquisto esemplificativi

Partenza 120/60/200; una vittoria ordinaria bilanciata aggiunge 60/30/100, per un saldo 180/90/300. Il giocatore può, per esempio, comprare uno strumento da 60/30/100 e un upgrade funzionale da 60/30/100, conservando 60/30/100; oppure due produttori e conservare lo stesso saldo; oppure non spendere nulla. Sono esempi, non un tutorial che impone questi acquisti.

Un livello da 1 a 2 costa 8/4/12 prima del contributo XP. Dopo una vittoria con il personaggio attivo e senza Accademia, quota 20%: costo residuo 7/4/10. La maggiore convenienza dei primi livelli è un parametro da osservare; non prova che gli upgrade funzionali siano già abbastanza desiderabili.

Completare un edificio da zero costa, dopo arrotondamenti, la somma delle dieci righe della formula; non si arrotonda soltanto il totale. Portare il roster al massimo richiede tutti i personaggi, tutti i livelli e tutti i 48 acquisti funzionali. Non occorre ottenere oggetti rari aggiuntivi o pagare duplicati. Anche i prezzi massimi sono finiti; completamento del catalogo e aggiornamenti successivi rimangono distinti.

Controllo aritmetico del catalogo permanente, con reclutamento diretto dei sette profili mancanti e senza sconti XP, AFK o bonus:

| Acquisti | M | C | K |
|---|---:|---:|---:|
| Un edificio dal livello 1 al 10, arrotondamenti inclusi | 1.972 | 988 | 3.280 |
| Un personaggio dal livello 1 al 30, senza sei carte | 708 | 360 | 1.160 |
| Nove edifici completi, sottraendo Deposito 1 già posseduto | 17.688 | 8.862 | 29.420 |
| Otto personaggi con livelli e 48 upgrade funzionali | 8.544 | 4.320 | 14.080 |
| Diciassette upgrade urbani | 1.020 | 510 | 1.700 |
| Cinque strumenti | 300 | 150 | 500 |
| Sei ampliamenti | 1.620 | 810 | 2.700 |
| Sei decorazioni riutilizzabili | 36 | 18 | 60 |
| Sette reclutamenti diretti | 0 | 0 | 7.000 |
| Totale catalogo, escluse le prime due righe illustrative | **29.208** | **14.670** | **55.460** |

La dotazione 120/60/200 si sottrae al fabbisogno, non ai prezzi. Aritmeticamente 553 vittorie ordinarie bilanciate coprirebbero il residuo di tutte le risorse in questo caso senza sconti; questo non misura durata, divertimento o necessità di giocare proprio 553 partite. Esperienza, priorità, AFK e scelte di reclutamento modificano il percorso. Il conteggio serve anche a individuare un eventuale eccesso di ripetizione, invece di chiamarlo automaticamente longevità.

### Impatto commerciale

L'economia di gioco non è il conto economico del prodotto. Stime di lavoro, recupero dei costi, esempi pubblicitari e catalogo commerciale sono nel piano §§18 e 21. Il modello proposto non vende M/C/K; modificare il modello richiede aggiornare reclutamento, bilanciamento e informazioni al giocatore insieme, non soltanto un pulsante di pagamento.
