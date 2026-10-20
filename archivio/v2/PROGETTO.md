# AndroidGAME — Soluzione completa di design proposta

Revisione del 20 ottobre 2026. Documento canonico del progetto.

## 1. Che cosa è confermato e che cosa viene proposto

**Confermato dall'utente:** attività come quelle mostrate nelle finte ads, ma realmente giocabili, utili e divertenti, come attività principale; città come progressione permanente; risorse ottenute giocando; costruzioni e upgrade immediati; libertà di potenziare tutto con denaro e oggetti di gioco, nell'ordine preferito; nessuna specializzazione che escluda altri upgrade; personaggi controllabili e collezionabili; produzione passiva; Android prioritario e PC se sostenibile; rewarded facoltative; obiettivo commerciale senza trasformare il gioco in pay-to-win. Non sono richiesti minigiochi di sole operazioni matematiche. Il motore è stato delegato all'agente: Godot con GDScript.

**Ultimo incarico:** perfezionare il progetto per rendere le attività più divertenti, mantenendo progressione libera, intento commerciale e complessità contenuta. La revisione delle situazioni e delle scelte è nella sezione 20; il [PIANO-DI-LAVORO.md](PIANO-DI-LAVORO.md) conserva le consegne esecutive e la [SPECIFICA-ESECUTIVA.md](SPECIFICA-ESECUTIVA.md) ne definisce l'applicazione. Le sezioni successive costituiscono la soluzione che l'agente raccomanda, non decisioni già approvate dall'utente. In particolare, numero di modalità, controlli, roster, gacha e valori economici sono raccomandazioni esplicite. Non sono un gioco realizzato, risultati misurati o autorizzazione a programmare.

Il progetto usa il nome della repository, AndroidGAME. Non introduce come già scelti un titolo commerciale, una trama o un marchio. La direzione visiva raccomandata è una città di spedizione stilizzata, con edifici modulari, personaggi e attrezzi riconoscibili; i nomi seguenti sono funzionali.

Questa revisione sostituisce le precedenti liste di alternative e i numeri incoerenti. Eventuali correzioni dell'utente modificano questo documento e poi gli approfondimenti collegati, conservando il resto. La fase rimane documentale.

## 2. La soluzione in una frase

**Un gioco di attività action complete, collegate a una città costruibile liberamente: si combatte, recupera e difende per far crescere città, personaggi e attrezzature; la crescita restituisce effetti visibili nelle partite successive.**

La parte prevalente della sessione è giocata nelle attività. La città offre un progetto permanente e decisioni economiche, senza interrompere ogni partita con una lunga visita ai menu. Si può continuare a giocare senza spendere subito il bottino; si può fissare un obiettivo di acquisto e seguirne il progresso dal risultato.

Il catalogo principale raccomandato comprende tre attività disponibili fin dall'inizio: **Avanzata, Recupero operativo e Difesa mobile**. Non vengono esaurite dal tutorial o sostituite successivamente con un'altra struttura di gioco. Trasporto e scavo sono varianti interne, non due ulteriori giochi da produrre separatamente.

## 3. Comandi e personaggio durante le attività

Raccomandazione: un personaggio controllato direttamente, due supporti selezionati prima di partire, una sua abilità e uno strumento comune. I supporti applicano effetti limitati, senza aggiungere due personaggi autonomi da dirigere. Si possono possedere e migliorare tutti i personaggi; la formazione della missione non è una specializzazione permanente.

Su Android: schermo orizzontale, movimento con trascinamento sul lato sinistro, abilità e strumento sul lato destro. Attacco base automatico contro un bersaglio valido a portata; un tocco su un bersaglio ne cambia la priorità. Restano attive le decisioni di movimento, posizione, bersaglio, raccolta e uso degli effetti. Su PC gli stessi comandi logici usano tastiera e mouse.

Il personaggio raccoglie automaticamente gli oggetti a distanza ravvicinata. Non occorre tenere premuto un tasto davanti a ogni cassa. Le azioni interrompibili rispondono al movimento; il giocatore non rimane bloccato in animazioni decorative mentre arriva una minaccia.

## 4. Avanzata: il corridoio delle ads come gioco action

### Partita completa

Si attraversa un percorso con nemici, ostacoli mobili, casse e dispositivi. La camera segue l'avanzata; si può rallentare, fermarsi e cambiare posizione nello spazio visibile. Non si tratta di scegliere soltanto il numero più alto fra due porte.

La missione alterna ingresso leggibile, incontro, recupero, nuova combinazione di pericoli e obiettivo conclusivo. Il personaggio attacca mentre il giocatore si posiziona per evitare fuoco e ostacoli, intervenire sui bersagli importanti e raggiungere i recuperi.

Le casse della partita possono aggiungere effetti temporanei compatibili: colpo penetrante, esplosione, ampiezza del tiro o assistenza di un dispositivo. Gli effetti raccolti si cumulano; non cancellano i miglioramenti permanenti. La loro durata coincide con la partita, mentre tutto ciò che è acquistato nella progressione rimane posseduto.

### Esempio di situazione

Una fila di nemici copre il centro. Su un lato c'è una cassa; davanti a essa attraversa un ostacolo mobile. Colpire un elemento esplosivo libera spazio, permettendo di prendere la cassa. Il nuovo colpo penetrante aiuta contro la fila successiva, ma una minaccia laterale obbliga comunque a spostarsi. La potenza aumenta visibilmente e il movimento continua a contare.

### Profondità e varietà

Gli obiettivi possono essere sfondare una posizione, accompagnare un carico lungo un segmento o recuperare un dispositivo. I trasporti usano il movimento e gli incontri dell'Avanzata, senza un sistema di guida distinto.

La difficoltà cambia mediante combinazioni e tempi: chi insegue insieme a chi spara, un ostacolo che separa i bersagli, un nemico che protegge un altro. Nessun danno inevitabile viene inserito per vendere la cura. Un nemico resistente deve esporre un comportamento o una vulnerabilità leggibili.

## 5. Recupero operativo: raccogliere e trasformare l'area

### Partita completa

Si entra in un'area aperta con strutture recuperabili, detriti, depositi e minacce. L'attrezzo interviene sugli elementi vicini; posizione e movimento determinano cosa viene lavorato. Strutture e terreno recuperabile cambiano visivamente: si apre un varco, crolla una copertura, si libera un macchinario.

L'obiettivo principale consiste nel recuperare un apparato o una quantità dichiarata di carico. I depositi opzionali offrono altro bottino senza essere necessari al completamento. Una volta raggiunto l'obiettivo si può rientrare oppure continuare verso opportunità aggiuntive presenti nell'area.

### Esempio di situazione

Un deposito facile fornisce il primo carico. Una struttura ricca è protetta da detriti; aprirli direttamente lascia esposti al fuoco. Aggirare il blocco permette di spegnere una minaccia, utilizzare un macchinario locale e abbattere la struttura da un lato più favorevole. Un attrezzo cittadino migliorato riduce gli interventi necessari, ma non sostituisce la scelta della posizione.

### Ritmo e utilità

Non si ripete continuamente un lungo viaggio fra lo stesso deposito e la stessa cassa. Il recupero dell'obiettivo registra quote di risultato; l'inventario cittadino non limita ciò che può essere guadagnato giocando. Eventuali capacità di trasporto nella singola area servono a creare situazioni, non a vendere un magazzino obbligatorio.

Scavo e demolizione sono famiglie di interazione di questa attività. Non sono chiamati giochi diversi se richiedono esattamente le stesse azioni. La differenza utile è nel terreno, nelle reazioni e nei problemi, non nel nome del materiale.

## 6. Difesa mobile: intervenire durante la costruzione operativa

### Partita completa

Si protegge una posizione da attacchi successivi. Prima dell'inizio si dispongono due dispositivi di base; durante lo scontro si guida il personaggio, si affrontano le minacce e si recuperano rifornimenti locali per attivare o riparare presidi.

La missione comprende tre fasi, ciascuna con un cambiamento di situazione. Il materiale operativo appartiene alla partita: non viene prelevato dal saldo della città. La costruzione locale è immediata e lascia il giocatore libero di continuare ad agire.

### Esempio di situazione

Una barriera contiene una prima minaccia frontale. Nella fase seguente un avversario aggira il presidio, mentre una macchina lenta si dirige sull'obiettivo. Il giocatore può fermare l'aggiramento e usare una riparazione per guadagnare tempo, oppure occuparsi della macchina prima che arrivi. I dispositivi aiutano, ma non vincono da soli mentre si attende.

### Profondità e varietà

Si variano direzioni, coperture, posizione dell'obiettivo, composizione degli attacchi e opportunità ambientali. Le difese comprate nella progressione ampliano gli effetti disponibili. Dispositivi base e personaggio iniziale permettono di affrontare le situazioni ordinarie: nessun eroe esclusivo è la chiave di una missione.

Una sconfitta conclude la partita; non distrugge gli edifici cittadini o il patrimonio del giocatore. Il retry è gratuito e non richiede un annuncio.

## 7. Risultati, sconfitta e continuità

Ogni missione dichiara obiettivo, difficoltà e premio ordinario. Traguardi intermedi riconoscono fino al 60% del premio ordinario; il completamento assegna il restante 40%. Un rientro o una sconfitta conserva i traguardi effettivamente raggiunti. Il risultato concede solo la quota non ancora registrata, evitando doppie ricompense.

Gli obiettivi di abilità aggiungono fino al 20% del premio ordinario. Non sono condizioni per ricevere il premio base. Le regole specifiche vengono mostrate prima della partenza: proteggere un carico, evitare una trappola o recuperare un deposito sono risultati osservabili, non una valutazione segreta della spesa.

La sospensione salva posizione, fase, oggetti rimasti, effetti e premi registrati. Il ripristino riprende quella partita, senza rigenerare casse e senza considerare il riavvio una sconfitta. Si può abbandonare conservando le quote già guadagnate.

Non ci sono energia, tentativi giornalieri o attese per giocare le attività principali. Premi straordinari degli eventi possono avere limiti propri; le attività e le loro ricompense ordinarie restano disponibili.

## 8. Città: sviluppo libero e visibile

Centro, Deposito di livello 1 e spazio iniziale sono già presenti. Si piazzano edifici, abitazioni e arredi su una griglia espandibile con risorse. Strade e collegamenti visivi sono liberamente modificabili e non costituiscono un requisito di potenziamento. Una cella occupata impedisce quel piazzamento fisico, non l'acquisto di miglioramenti in altri ambiti.

Tutti i tipi di edificio sono nel catalogo dall'inizio. Possederne uno è necessario per migliorarne il livello, ma nessun edificio richiede il livello di un altro, una soglia di campagna o una specializzazione. Le nuove aree si acquistano con risorse, senza completare obbligatoriamente una modalità.

| Edificio raccomandato | Funzione |
|---|---|
| Centro iniziale | Gestione e rappresentazione della città, senza requisiti globali di livello |
| Officina | Miglioramenti comuni di strumenti e interazioni |
| Accademia | Bonus di addestramento, senza monopolizzare l'accesso agli upgrade dei personaggi |
| Deposito | Ampliamenti dell'accumulo passivo; non limita le risorse attive |
| Ricicleria | Produzione passiva di materiali |
| Fonderia | Produzione passiva di componenti |
| Mercato | Produzione di crediti, conversione e contratti |
| Bastione | Miglioramenti dei dispositivi di difesa |
| Centrale | Miglioramenti di impiego dei dispositivi comuni |
| Quartiere civico | Progetti estetici, abitazioni e trasformazione visiva |

La proposta comprende dieci livelli per ciascun edificio acquistabile. Un livello migliora la funzione già posseduta; effetti aggiuntivi si acquistano singolarmente. Tutti i livelli e tutti gli effetti possono essere ottenuti insieme. Il Centro non impone un tetto agli altri edifici.

Ogni tipo ha una sola funzione economica potenziabile. Eventuali copie decorative non duplicano produzione o bonus: il riferimento AFK comprende una Ricicleria, una Fonderia e un Mercato. Spostare o riorganizzare gli edifici conserva livelli e acquisti.

Esplorazione, Industria e Difesa sono etichette di ricerca del catalogo. Non danno una classe, punti limitati o rami esclusivi. Spendere prima in raccolta rinvia economicamente altri acquisti, ma non li blocca.

Le abitazioni non producono cittadini da consumare come valuta. Il quartiere cambia aspetto con gli investimenti; l'assenza del giocatore non provoca fame, manutenzioni o decadenza. Nessun timer di costruzione o coda di crafting viene venduto come problema da accelerare.

## 9. Personaggi, squadra e gacha raccomandato

La proposta comprende otto profili iniziali, tutti utilizzabili nelle tre attività e ottenibili giocando. Hanno differenze di comportamento, non rarità che garantiscono una superiorità numerica. Un personaggio iniziale è gratuito; il giocatore può sceglierlo dal catalogo.

Ciascuno ha trenta livelli e sei miglioramenti funzionali, tutti acquistabili con risorse, senza stelle da duplicati, classi esclusive o capitoli obbligatori. L'esperienza ottenuta giocando contribuisce all'addestramento ma non è una chiave obbligatoria: le risorse permettono di proseguire gli acquisti.

**Raccomandazione sul gacha, non decisione attribuita all'utente:** reclutamento casuale con crediti guadagnati giocando, affiancato da reclutamento diretto dello stesso catalogo. Non si esclude il gacha e non si rende obbligatorio affidarsi al caso. I dettagli completi sono in PERSONAGGI-E-SQUADRA.md.

Per conciliare questa proposta con il vincolo di non diventare pay-to-win, i crediti funzionali del reclutamento non sono venduti per denaro reale nel modello raccomandato. Gli acquisti reali sono trattati nella sezione 12. Una diversa proposta di gacha a pagamento richiederebbe un nuovo confronto esplicito: non è approvata né vietata per omissione.

## 10. Progressione principale e quantità di contenuto

Le attività restano al centro anche nella fase avanzata. Non si passa, dopo l'introduzione, a un gioco basato prevalentemente su incassi e menu. Si può continuare a giocare una modalità preferita; tutte forniscono le risorse ordinarie e offrono priorità di bottino equivalenti.

Catalogo esteso proposto: tre attività, sei schemi di livello per attività e quattro situazioni curate per schema, per **72 configurazioni di missione**. Una configurazione è una disposizione progettata di obiettivi, minacce e interazioni; non viene contata come mappa originale. Tre ambientazioni modulari cambiano terreno e presentazione, con geometrie riutilizzate quando sensato.

**Riesame di portata:** questo catalogo non è ancora dimostrato compatibile con la priorità di semplicità. Il piano §18.1 propone una prima uscita con 18 configurazioni e un'ambientazione modulare, conservando le tre attività. È una modifica proposta e motivata, non un taglio già approvato; le 72 configurazioni non sono un obbligo confermato dall'utente.

### I diciotto schemi raccomandati

| Attività | Schema | Situazione e decisione principale |
|---|---|---|
| Avanzata | Varco | Aprire una posizione scegliendo fra copertura da aggirare e elemento esplosivo esposto |
| Avanzata | Incrocio mobile | Attraversare ostacoli con tempi diversi, scegliendo quando fermarsi e quando avanzare |
| Avanzata | Scorta | Liberare il percorso di un carico e intervenire sulle minacce che lo raggiungono |
| Avanzata | Convoglio ostile | Fermare bersagli mobili, privilegiando protezioni o trasporto principale |
| Avanzata | Recupero laterale | Deviare verso un apparato mentre il percorso principale resta una via praticabile |
| Avanzata | Posizione fortificata | Disattivare protezioni leggibili per esporre l'obiettivo conclusivo |
| Recupero | Deposito sepolto | Aprire il terreno recuperabile decidendo quali passaggi rendere sicuri prima |
| Recupero | Demolizione controllata | Abbattere strutture usando direzione di accesso e reazioni ambientali |
| Recupero | Macchinario fermo | Recuperare elementi locali per riattivare una macchina e accedere al carico |
| Recupero | Area contesa | Raccogliere sotto minacce mobili, alternando messa in sicurezza e lavoro |
| Recupero | Carico disperso | Collegare gruppi di recuperi con un percorso scelto, evitando viaggi ripetitivi |
| Recupero | Estrazione | Recuperare l'apparato e aprire una via di uscita diversa da quella d'ingresso |
| Difesa | Due accessi | Spostarsi fra fronti alternati, distribuendo i dispositivi prima dell'attacco |
| Difesa | Aggiramento | Correggere una posizione efficace frontalmente quando si apre un passaggio laterale |
| Difesa | Assedio | Contenere gli inseguitori e fermare una minaccia lenta diretta all'obiettivo |
| Difesa | Rifornimento esposto | Scegliere quando lasciare la posizione per ottenere materiali operativi locali |
| Difesa | Presidi separati | Proteggere un obiettivo comune usando due postazioni con coperture differenti |
| Difesa | Perimetro variabile | Riutilizzare o riposizionare i dispositivi quando cambiano gli accessi fra le tre fasi |

Le quattro configurazioni di ciascuno schema cambiano rispettivamente disposizione e coperture, combinazione delle minacce, interazione ambientale decisiva e collocazione dell'obiettivo. Ogni configurazione conserva un ingresso leggibile, una situazione centrale e una conclusione. Non basta aumentare i punti vita o cambiare colore per contarne un'altra. Queste sono specifiche di situazioni da progettare, non livelli già costruiti.

Le missioni ordinarie durano indicativamente 2–4 minuti; questo è un parametro di design da verificare, non una durata misurata. Le 72 configurazioni non dimostrano mesi di contenuti: la rigiocabilità dipende da qualità degli incontri, personaggi, strumenti e varianti, non da una moltiplicazione teorica delle combinazioni.

Si propongono tre difficoltà selezionabili, tutte visibili: ordinaria, impegnativa e avanzata. Non richiedono un livello numerico di ingresso. La più impegnativa combina problemi e aumenta moderatamente le richieste; non corregge automaticamente ogni upgrade appena comprato per annullarne il beneficio.

Le maestrie premiano obiettivi di abilità e riconoscimenti estetici. I contratti danno una direzione facoltativa alle sessioni. Non servono per autorizzare gli upgrade e non monopolizzano materiali indispensabili. Non si azzerano città e roster per allungare la progressione.

Completato il catalogo permanente, rimangono sfide di prestazione, combinazioni di personaggi e strumenti, maestrie e progetti estetici; nessun reset obbliga a ricomprare gli stessi bonus. La proposta non promette una crescita numerica infinita: nuovi acquisti funzionali richiedono contenuti aggiuntivi effettivamente progettati. Il giocatore che ha completato tutto può fermarsi senza perdere il patrimonio accumulato.

## 11. Economia e AFK

Tre risorse: materiali, componenti e crediti. Si ottengono nelle attività; non esiste una quarta valuta premium necessaria a progredire. Tutti i costi sono visibili e fissi per l'acquisto scelto. Sono indipendenti dal giorno, dall'ordine degli altri acquisti e dai capitoli.

Il documento economico fornisce un modello numerico completo di partenza, con formule, esempi e controlli aritmetici. È una proposta di bilanciamento, non una promessa di rendimento. Gli oggetti specifici eventualmente aggiunti in futuro dovranno rispettare la stessa libertà di progresso, senza un unico percorso imposto non concordato.

AFK integra le sessioni attive. I produttori maturano risorse fino al cap del Deposito; i loro upgrade aumentano il tasso. Le risorse ottenute giocando non hanno quel cap. Raccogliere l'AFK non obbliga a guardare un annuncio e non serve per poter ripartire.

## 12. Monetizzazione completa raccomandata

Il modello propone gioco gratuito, bonus rewarded facoltativi e acquisti diretti di cosmetici: temi urbani, abiti, effetti visivi leggibili e pacchetto sostenitore. Non attribuisce all'utente l'approvazione di questo catalogo: è la raccomandazione commerciale della presente soluzione.

La sua sostenibilità viene esaminata prima della produzione nel piano §18.2: pubblico necessario, annunci effettivamente mostrati, acquisti e costi, incluso il lavoro ricorrente per nuovi cosmetici. Né il catalogo estetico né il limite pubblicitario dimostrano da soli un guadagno sufficiente.

Rewarded: +20% delle sole risorse ordinarie effettivamente guadagnate, su massimo tre risultati al giorno. Il premio base viene prima assegnato integralmente. I crediti extra possono finanziare anche il reclutamento, come gli altri crediti; il bonus non assegna estrazioni dirette e non modifica probabilità o garanzia. Non aumenta esperienza, maestrie, AFK o punteggi competitivi; nessun annuncio in mezzo all'attività. Se la pubblicità non è disponibile, il gioco e i risultati restano utilizzabili.

Il modello raccomandato non vende potenza, risorse funzionali o estrazioni di personaggi per denaro reale. La ragione è progettuale: con i tuoi vincoli è la separazione più chiara fra ricavo e vantaggio. Non è una garanzia che i cosmetici generino ricavi sufficienti. Se non li generano, si rivaluta il modello con dati, senza introdurre automaticamente ostacoli e vendita della soluzione.

Non si propone un prodotto rimozione annunci per eliminare interruzioni che il progetto non prevede. Un eventuale pass successivo è cosmetico e non azzera o blocca progressi; non è una dipendenza della prima uscita.

## 13. PvP e funzioni sociali

Raccomandazione: PvE e progresso locale nella prima uscita; PvP come espansione separata. Non si cambia il gioco principale in una guerra di alleanze.

La proposta competitiva è una sfida asincrona di prestazione su missioni equivalenti: stesso catalogo di personaggi, strumenti e livelli normalizzati, anche per chi non li possiede nel PvE. Nessuna razzia della città. Il risultato dipende dalla partita verificata, non dal saldo o dagli annunci.

Servono server autorevoli per risultati e classifiche. Chat, gilde, trading e guerra territoriale non sono implicitamente inclusi. Queste funzioni non vengono pubblicizzate prima di esistere.

## 14. Interfaccia e percorso iniziale

Accesso rapido alle tre attività, scheda città e catalogo con ricerca per effetto. Ogni miglioramento mostra costo, saldo mancante ed effetto. Nessun tasto seleziona una specializzazione al posto degli altri acquisti.

Introduzione breve facoltativa: mostra movimento, interazione e risultato. Si può saltarla ottenendo la stessa dotazione, senza doppio premio se la si completa in seguito. Poi il giocatore sceglie attività e primo acquisto. Non è obbligato a costruire l'Officina o a reclutare uno specifico personaggio.

Il risultato permette di continuare nella stessa attività, cambiare attività o andare in città. L'obiettivo di acquisto fissato resta visibile senza aprire molte finestre. Riscossione unica, riepilogo chiaro e ripresa della partita evitano che l'interfaccia sostituisca il gioco.

Comandi e testi rispettano area sicura, dimensioni leggibili e possibilità di ridurre vibrazioni ed effetti. I segnali importanti usano forma e animazione oltre al colore. Il gacha mostra probabilità, contatore di garanzia e alternativa diretta nello stesso contesto della scelta.

## 15. Strategia commerciale e di contenuto

La proposta di posizionamento è concreta: giocare davvero le attività visibili nelle creative e vedere la città crescere grazie ai risultati. Non è dimostrato che questo basti a trovare un pubblico o a rendere sostenibile l'acquisizione.

Pubblico progettuale proposto: persone che cercano azione mobile comprensibile, sessioni ripetibili e crescita visibile di città e personaggi. Non si presume una distribuzione per età, paese o capacità di spesa senza dati. La proposta si presenta attraverso ciò che si fa in missione, non attraverso il numero di menu o di valute.

Le creative future mostrano una situazione reale, il suo esito e un cambiamento ottenuto in città. Tre formati riutilizzabili: recupero che modifica l'area, crescita di potenza dentro una partita, difesa risolta intervenendo nel momento giusto. Non si producono scene promozionali di meccaniche assenti.

Canali raccomandati: video organici su un formato ripetibile, scheda store coerente e contatti mirati con piccoli creator. Nessun contatto, pubblicazione o spesa è autorizzato dal documento. Acquisizione a pagamento solo dopo dati del prodotto e budget concordato.

I dati utili devono spiegare problemi: persone che non capiscono le attività, ricompense insufficienti, morti poco leggibili, abbandono dei menu o scarso interesse per gli acquisti. Download e incassi lordi altrui non sono una previsione dei nostri ricavi.

Gli aggiornamenti aggiungono situazioni, interazioni, personaggi o elementi urbani coerenti. Non promettono mondi nuovi ogni settimana. La prima uscita deve offrire già le tre attività in profondità, senza dipendere da promesse di espansione.

## 16. Portata, limiti e stato finale della proposta

La soluzione estesa descrive tre attività complete, otto profili, nove tipi di edificio acquistabili più Centro, miglioramenti cumulativi, 72 configurazioni, economia comune, AFK, reclutamento casuale e diretto, rewarded limitate e acquisti estetici. Per contenere la prima uscita, la raccomandazione corrente è C01 con 18 configurazioni e un ambiente, da valutare come modifica esplicita di portata. Anche così il lavoro resta impegnativo per una persona: il riuso riduce alcuni costi, non dimostra che il progetto sia economico.

Restano esterni al design i dati che non si possono inventare: budget disponibile, tempo di produzione, dispositivi effettivi, performance, divertimento osservato, prezzi di vendita e ricavi. Il loro mancato riscontro non viene mascherato con una dichiarazione di perfezione.

Questa è una soluzione di design completa da valutare nel suo insieme, con raccomandazioni esplicite al posto di alternative lasciate sospese. Non è l'approvazione dell'utente, un gioco finito o l'autorizzazione a sviluppare.

## 17. Catalogo esecutivo delle missioni

Questa sezione traduce gli schemi in una base producibile. Coordinate in metri nel piano XZ, avanzamento lungo +Z; i valori sono proposte di partenza. La specifica esecutiva definisce attori N1–N6, combattimento, interazioni, tre milestone al 20% e finale al 40%. Ogni evento ha ID stabile composto da missione, variante e numero; attivarlo nuovamente dopo una ripresa non ripete spawn o premi.

### Pacchetti di incontro condivisi

| Pacchetto | Attori |
|---|---|
| W1 | 4 N1 e 1 N2 |
| W2 | 3 N1 e 2 N2 |
| W3 | 2 N1, 1 N2 e 1 N3 |
| W4 | 2 N1, 1 N2 e 1 N4 |
| W5 | 3 N1 e 1 N5 |
| W6 | 2 N1, 1 N2 e 1 N6 |

Spawn del pacchetto: ordine della tabella, un attore ogni 1,2 s. Usare tre posizioni attorno all'ancora con offset X −1/0/+1 m e Z 0/+1/+2 m, scegliendo la prima libera; se sono occupate attendere senza cancellare attori. Sui muri usare la posizione libera più vicina nella stessa area, mai dentro il personaggio. Nessun nemico compare entro 3 m dall'attivo senza avviso di 1 s. Un pacchetto viene completato quando tutti i suoi ID sono eliminati o resi definitivamente inoffensivi dal relativo obiettivo.

### Avanzata: layout A

Area da X −8 a +8, Z −4 a 72; partenza (0,0), rientro finale (0,68). Tre settori: 0–18, 18–36, 36–54. Ancore incontri (0,12), (0,30), (0,48); spawn quando si entra rispettivamente a Z 4, 22 e 40. Una copertura 2×2 in (−3,10), (3,28), (−3,46), con cammino laterale libero; casse temporanee a (−5,12), (5,12), (5,50); barili a (−1,12), (1,30), (−1,48). Le due casse iniziali espongono effetti diversi: si decide da quale lato passare e quale ottenere prima, potendole recuperare entrambe. Un settore non viene chiuso da un muro invisibile: per ottenere la sua quota si deve completare l'azione dichiarata. L'uscita diventa utilizzabile dopo i tre traguardi e l'obiettivo finale.

| ID | Schema | Settore 1 → milestone 1 | Settore 2 → milestone 2 | Settore 3 → milestone 3 | Conclusione |
|---|---|---|---|---|---|
| AV01 | Varco | W1; distruggere una barriera recuperabile da 30 in (0,16) | W2; attivare leva (−5,34) per il cancello in (0,36) | W3; eliminare il prototipo di guardia N3 del pacchetto | Distruggere apparato da 100 integrità in (0,62), poi uscita |
| AV02 | Incrocio mobile | W1; superare Z18 dopo aver attivato il sensore in (5,16) | W5; attivare sensore (−5,34) | W2; attivare sensore (5,52) | Raggiungere uscita, con i tre sensori attivi |
| AV03 | Scorta | W1; carico fino a Z18 | W3; carico fino a Z36 | W4; carico fino a Z54 | Carico vivo a Z66; il personaggio può fermarne la marcia con interazione |
| AV04 | Convoglio ostile | W2; distruggere mezzo da 40 che va da (−4,8) a (−4,18) | W3; mezzo da 60 da (4,26) a (4,36) | W4; mezzo da 80 da (−4,44) a (−4,54) | Disattivare centrale convoglio da 100 in (0,62) e uscire |
| AV05 | Recupero laterale | W1; recuperare dispositivo (5,16) dietro detrito da 30 | W5; recuperare dispositivo (−5,34) dietro detrito da 30 | W3; recuperare dispositivo (5,52) dietro detrito da 60 | Installare i tre dispositivi nel terminale (0,62), poi uscita |
| AV06 | Posizione fortificata | W4; spegnere emettitore (−5,16) | W3; spegnere emettitore (5,34) | W6; spegnere emettitore (−5,52) | Distruggere nucleo da 180 in (0,62); gli emettitori spenti lo rendono attaccabile |

AV01/AV06: per ogni milestone eliminare anche il pacchetto del settore. AV02/AV05: si può evitare parte dello scontro, restando necessario completare l'interazione. AV03: carico velocità 1,2 m/s, integrità 200, percorso X=0; avanza solo con attivo entro 6 m e marcia abilitata, sosta al confine finché il pacchetto di settore non è risolto. AV04: mezzi velocità 0,6 m/s, si fermano al loro punto finale e sparano come N2; nessuna perdita automatica dell'obiettivo perché un mezzo è arrivato a destinazione.

AV02 aggiunge tre ostacoli mobili in (0,17), (0,35), (0,53): barriera larga 3 m che oscilla su X fra −4 e +4 con periodo 6 s, danno 10 se colpisce, preavviso di 1 s al cambio direzione; può essere aggirata e non occupa tutta la larghezza. Si salva la fase dell'oscillazione. Le altre missioni non ricevono questi ostacoli per semplice decorazione.

AV05 sposta il barile del settore B da (1,30) a (−3,34), entro il raggio utile del detrito in (−5,34). Il suo bonus ambientale è così una via realmente prevista dalla geometria, non una condizione impossibile.

### Recupero operativo: layout R

Area quadrata X/Z da −16 a +16. Partenza (0,−12), uscita (0,−14). Zone A=(−9,−5), B=(9,−2), C=(0,9). Coperture solide 3×2 a (−4,0) e (5,5), passaggi di almeno 2 m. Ogni zona attiva il proprio pacchetto quando l'attivo entra entro 7 m; non si attivano nuovamente i pacchetti già registrati. Depositare un recupero all'uscita non è necessario fra una zona e l'altra: il carico ordinario non impone viaggi ripetitivi.

| ID | Schema | Zona A → milestone 1 | Zona B → milestone 2 | Zona C → milestone 3 | Conclusione |
|---|---|---|---|---|---|
| RE01 | Deposito sepolto | W1; aprire 2 detriti da 30 e recuperare primo carico | W2; 2 detriti da 30 e secondo carico | W3; detrito da 60 e terzo carico | Recuperare apparato C, poi uscita |
| RE02 | Demolizione controllata | W1; demolire struttura da 60, barile a 2 m | W3; demolire struttura da 60 dietro copertura rimovibile | W4; demolire struttura da 90 con due lati accessibili | Portare i tre recuperi all'uscita |
| RE03 | Macchinario fermo | W1; recuperare alimentatore da cassa da 30 | W5; recuperare ingranaggio da cassa da 30 | W4; installarli sulla macchina, attivarla e aprire deposito da 60 | Recuperare apparato dal deposito e uscire |
| RE04 | Area contesa | W2; carico A da deposito da 30 | W5; carico B da deposito da 60 | W3; spegnere dispositivo ostile e aprire deposito da 60 | Recuperare apparato C e uscire |
| RE05 | Carico disperso | W1; 3 recuperi da 10 unità in raggio 3 m dalla zona A | W2; 3 recuperi analoghi in B | W5; 3 recuperi analoghi in C, uno dietro detrito da 30 | Totale 90 unità locali di carico, poi uscita |
| RE06 | Estrazione | W3; recuperare chiave macchina A, non valuta permanente | W4; attivare macchina B che apre passaggio laterale | W6; recuperare apparato C | Uscita alternativa (13,−10), accessibile dopo B; rientro iniziale disabilitato solo per la conclusione di questa missione |

Due detriti di una zona: posizioni relative (−1,−1) e (+1,+1). Deposito o apparato al centro. Leve/macchine a (+2,0), raggiungibili senza distruggere muri solidi. Recuperi RE05 a offset (−2,0), (0,+2), (+2,0). In RE06 il passaggio laterale occupa X 10–14, Z −10..8 e si apre con uno stato predefinito; non richiede generare un tunnel fisico.

### Difesa mobile: layout D

Area X da −18 a +18, Z da −14 a +18. Partenza (0,−4), obiettivo (0,0). Accessi N=(0,15), O=(−15,3), E=(15,3). Piazzole dei due dispositivi base (−4,−2) e (4,−2); piazzole aggiuntive (−6,4), (6,4), (0,7), (0,−6). Coperture 3×2 in (−8,0) e (8,0); nessun dispositivo può essere posto fuori dalle piazzole. La specifica esecutiva definisce rifornimenti, riparazioni e durata delle fasi.

| ID | Schema | Fase 1 | Fase 2 | Fase 3 | Interazione caratteristica |
|---|---|---|---|---|---|
| DI01 | Due accessi | W1 da N | W2 da O | W3 da E | Riposizionare l'intervento fra i fronti |
| DI02 | Aggiramento | W2 da N | W3 da O | W4 da E | Cancello laterale in (10,3) si apre con avviso di 2 s prima della fase 3 |
| DI03 | Assedio | W1 da O | W4 da N | W6 da E | N6 punta all'obiettivo mentre gli altri possono prendere l'attivo |
| DI04 | Rifornimento esposto | W3 da N | W5 da E | W4 da O | Due casse da 20 rifornimenti in (−12,−8) e (12,−8), una raccolta ciascuna |
| DI05 | Presidi separati | W2 da O | W4 da E | W6 da N | Due terminali in (−6,4)/(6,4): 0,4 s di uso concede +20% danno alla torre più vicina per 10 s, recupero 20 s |
| DI06 | Perimetro variabile | W5 da N | W3 da O | W6 da E | Nelle pause i dispositivi base possono essere spostati gratuitamente fra le piazzole, conservando integrità |

Milestone 1 al termine fase 1, milestone 2 al termine fase 2, milestone 3 dopo la distruzione di almeno metà arrotondata per eccesso degli attori previsti della fase 3; finale quando fase 3 è conclusa e l'obiettivo è vivo. Non sono quattro premi pieni. Prima della fase 3 DI02, aprire il cancello senza generare minacce dentro i dispositivi. In DI05 si protegge sempre un solo patrimonio: i terminali non sono ulteriori obiettivi che causano sconfitta.

Ogni fase di Difesa usa il pacchetto indicato come base per tre emissioni diverse: lettura del fronte, aggiramento, pressione conclusiva, con composizione e accessi definiti nella specifica §7. La quota della fase 3 conta gli attori di tutte e tre le emissioni, non soltanto la prima. Minacce aggiunte da variante o difficoltà si applicano all'ultima emissione della fase interessata. La fase non prolunga una partita già risolta aspettando la scadenza di un timer.

### Bonus di abilità e rientro

Ogni missione ha un obiettivo di abilità specifico da +10%, definito nella sezione 20, e una cassa opzionale da +10%. Posizioni della cassa: layout A (6,26), R (−11,11), D (12,−10). In Avanzata la deviazione avviene prima della conclusione, mentre restano incontri in cui impiegare i propri effetti. La cassa ha 30 integrità, non è necessaria all'uscita e non produce un altro premio ordinario. Il bonus di abilità richiede anche il completamento; quello della cassa si conserva su rientro se recuperata. I bonus si calcolano una volta, senza duplicazione.

Le condizioni sono mostrate prima della partenza. Nessun profilo o strumento acquistabile è richiesto per ottenerle. Dove conta il danno, un colpo assorbito integralmente non viola la condizione: conta la perdita effettiva di integrità da quella causa.

## 18. Manifest del catalogo esteso

Per ogni ID base sopra creare suffissi `_V0`, `_V1`, `_V2`, `_V3`. C01 carica solo V0. ESTESO carica tutti, per 18×4=72. Nessun algoritmo sceglie varianti casuali non descritte; ogni ID prodotto va validato e provato.

| Variante | Trasformazione deterministica del layout | Cambiamento degli incontri e dell'obiettivo |
|---|---|---|
| V0 | Coordinate e regole delle tabelle | Nessuna modifica |
| V1 | Riflettere X di geometria, interazioni, ancore e percorsi | Scambiare i pacchetti degli incontri 1 e 2; nel terzo emettere N2 per ultimo e con avviso laterale, senza cambiare il bersaglio richiesto dalle milestone |
| V2 | Aggiungere detrito rimovibile da 30 a 2 m a sinistra del secondo obiettivo; barile 2 m a destra, mantenendo un passaggio di 2 m | Aggiungere un N3 all'incontro 2; un interruttore visibile vicino al barile interrompe per 2 s la prima carica di quel N3, una volta |
| V3 | Spostare di +4 m su X uscita finale in A/R, bersaglio finale in AV01/AV04/AV05/AV06, obiettivo e piazzole in D; apparati intermedi R invariati | Aggiungere un N5 all'incontro 3; spostare la cassa opzionale al lato opposto del layout e richiedere il suo recupero al posto del primo bonus di abilità; il secondo bonus diventa obiettivo concluso con almeno 50% integrità attivo |

Le modifiche si applicano alla configurazione base, non una dopo l'altra. In RE06 l'uscita alternativa di V3 viene spostata verso l'interno a X=9, anziché oltre il bordo; la macchina e il corridoio si aggiornano coerentemente. V3 di AV03 sposta l'ultimo segmento della scorta da (0,54) a (4,66), evitando teletrasporto del carico. V3 di AV04 non sposta i punti di arresto dei mezzi intermedi. V3 DI02 sposta obiettivo e piazzole, non l'accesso del cancello laterale.

V2 non sovrappone i nuovi elementi ai raccordi della revisione di gioco. In fase di costruzione del catalogo, per il detrito scegliere il primo offset libero fra (−2,0), (−3,+1), (0,−3), (+3,+1) rispetto al secondo obiettivo, mantenendo il passaggio di 2 m; salvare la posizione risolta nel MissionDef. Se il barile previsto a (+2,0) esiste già entro 0,5 m, riutilizzarne l'ID invece di crearne una seconda copia. Se nessuna posizione è valida, produrre un errore da correggere prima della build; non riposizionare casualmente durante la partita.

V3 sostituisce entrambe le condizioni del bonus, senza conteggiare due volte la stessa cassa. Negli altri casi il bonus è quello della sezione precedente. Le aggiunte di difficoltà si applicano dopo la variante; le loro minacce hanno ID propri per salvataggio e condizioni di completamento.

Ambientazioni ESTESO: cantiere urbano per V0/V1; deposito industriale per V2; cava di recupero per V3. È un tema visivo dei medesimi moduli, senza nuovi sistemi di simulazione. Prima di considerare ogni configurazione pronta, controllare raggiungibilità di spawn, interazioni e uscita con il layout trasformato; un manifesto generato non dimostra che il livello sia già verificato.

## 19. Criterio di utilizzo del pacchetto esecutivo

Per sviluppare si usano insieme: questo catalogo per le missioni, PERSONAGGI-E-SQUADRA §§8–10 per le abilità e gli upgrade, BENCHMARK-PROGRESSIONE-EVENTI §13 per città e calcoli, SPECIFICA-ESECUTIVA per struttura e stati, PIANO-DI-LAVORO §§20–21 per consegne e stime. Non si creano copie concorrenti dei parametri negli script dell'interfaccia.

Le tabelle descrivono la proposta pronta a essere tradotta in dati e codice. Approvazione delle scelte, implementazione, misure di prestazione e risultati commerciali sono stati distinti; nessun valore scritto viene presentato come già provato sul telefono.

## 20. Revisione del gioco: decisioni, ritmo e soddisfazione

Questa revisione perfeziona la proposta nell'incarico attuale. Non aggiunge modalità, valute, classi esclusive, nuovi edifici o nuovi eroi. Usa movimento, bersagli, recuperi, stati ambientali e attrezzature già previsti. Le scelte riguardano come affrontare la situazione e l'ordine degli investimenti; tutti gli acquisti permanenti restano ottenibili insieme.

### 20.1 Che cosa deve valere la pena fare

Il centro della partita è **preparare una situazione e sfruttarla**: allineare più nemici per attraversarli, attirarli vicino a un elemento esplosivo, aprire il collegamento giusto invece di consumare un'intera struttura, allontanarsi dalla difesa quando il vantaggio giustifica il rischio. Il movimento serve a creare un'occasione, oltre che a evitare danni. La vittoria non deve ridursi a possedere un numero superiore.

| Attività | Decisione ricorrente | Risposta visibile |
|---|---|---|
| Avanzata | Ottenere prima penetrazione o esplosione, poi scegliere posizione e bersagli coerenti | La linea viene attraversata o il gruppo esplode; il nuovo effetto cambia ciò che il giocatore può fare |
| Recupero | Attaccare la massa da un lato sicuro oppure raggiungere il collegamento o la macchina esposta | Il blocco si apre, cade una copertura o si libera un intero gruppo di recuperi |
| Difesa | Fermare l'aggiramento, preparare il passaggio di una minaccia pesante oppure raccogliere rifornimenti | Cambia il fronte utile e il momento della riparazione; una torre non sostituisce l'intervento dell'attivo |

### 20.2 Avanzata: crescita dentro la partita

Tre effetti temporanei, tre casse, nessuna schermata che ferma l'azione per sceglierne uno. Le due casse del primo settore mostrano in anticipo simbolo ed effetto; si possono prendere entrambe. La terza completa una combinazione compatibile prima del finale. Non si sceglie una specializzazione e non si perde alcun acquisto permanente.

| Missioni | Cassa sinistra iniziale | Cassa destra iniziale | Cassa del terzo settore |
|---|---|---|---|
| AV01 / AV04 | Penetrazione | Esplosione | Ampiezza |
| AV02 / AV05 | Ampiezza | Penetrazione | Esplosione |
| AV03 / AV06 | Esplosione | Ampiezza | Penetrazione |

Penetrazione attraversa un nemico e può raggiungere il barile dietro; esplosione colpisce il gruppo che si avvicina; ampiezza facilita la traiettoria verso bersagli allineati. La combinazione viene mostrata dai colpi e dalle reazioni dell'area. L'ordine cambia per schema; le varianti riflettono o spostano le casse insieme al layout, senza sorteggiare un effetto nascosto.

Esempio AV01: si vede il barile dietro la fila; raggiungere la cassa di penetrazione permette di colpirlo attraversando il primo nemico. Passare poi dall'altro lato aggiunge l'esplosione e rende diverso l'incontro seguente. Restare sulla via più diretta permette comunque di completare la missione. Il gioco riconosce il risultato delle azioni, non un percorso obbligato.

AV01 predispone una catena nel secondo settore: barili in (1,30), (1,32), (1,34), con quello centrale indicato chiaramente dalla composizione dell'incontro. Si attivano con le normali regole della specifica; non si aggiunge un premio per ogni elemento distrutto. Il giocatore può usare subito il gruppo o aspettare un allineamento migliore.

### 20.3 Recupero: collegamenti, reazioni e macchine

Tre moduli riutilizzabili completano l'interazione ambientale. I loro parametri tecnici sono nella specifica §7. Non richiedono terreno deformabile o simulazione di edifici.

| Modulo | Cosa si vede e si può fare | Scambio pratico |
|---|---|---|
| Collegamento fragile | Un raccordo marcato collega più detriti; distruggerlo cambia insieme i loro stati | Raggiungere il lato esposto fa risparmiare interventi; il lato protetto resta una via più lunga ma valida |
| Reazione di barili | Più elementi esplosivi vicini possono attivarsi in sequenza, con avvisi e oggetti finiti | Aspettare che un gruppo entri nell'area può valere più che sparare subito al primo nemico |
| Macchina locale | Una leva mostra l'area che aprirà o colpirà; l'effetto è uno stato predefinito | Attivare al momento utile può aprire spazio e risolvere una minaccia contemporaneamente |

Applicazioni V0, che fanno parte dei livelli e non aggiungono nuovi premi:

| Missione | Modifica esecutiva |
|---|---|
| RE01 | In B, raccordo da 20 integrità a offset (−2,0) collegato ai due detriti; aprirlo libera entrambi, ma resta possibile romperli separatamente |
| RE02 | In C, struttura da 90 con corpo 3×3 e raccordo da 30 a offset (0,+2), sul retro rispetto all'arrivo da B; il raccordo espone il recupero con lo stesso risultato della demolizione diretta |
| RE03 | La macchina in C apre il deposito e colpisce una striscia 2×5 m rivolta a sud, dopo avviso di 1 s; il giocatore può attirare il gruppo su quella striscia prima dell'attivazione |
| RE04 | Il dispositivo ostile in C produce un'area N5 segnalata ogni 4 s; spegnerlo ferma quella fonte e rende diverso il recupero, senza attribuire più valuta |
| RE05 | In C, il detrito che protegge il terzo recupero è collegato a una copertura rimovibile larga 8 m e profonda 2, centro (0,4), che sostituisce quella in (5,5): aprirlo rende diretto il passaggio fra C e l'uscita |
| RE06 | La macchina in B apre il corridoio e colpisce un'area 2×5 m rivolta a nord, dichiarata prima dell'uso; l'apparato C non richiede di eliminare ogni inseguitore prima del rientro |

I collegamenti fragili e le macchine sono utilizzabili con l'attacco e le interazioni comuni. Officina e personaggi specializzati facilitano o ampliano gli interventi, senza renderli accessibili soltanto a chi ha scelto quel potenziamento.

In RE02 il corpo della struttura intercetta i colpi prima del raccordo finché non si raggiunge un fianco o il retro: la differenza di posizione è reale. RE01 presenta invece un collegamento facilmente visibile e raggiungibile per introdurre l'interazione. L'icona distingue il raccordo dalla massa, senza rendere invisibili ostacoli o sparare attraverso i muri.

RE05 registra il passaggio nell'area (0,4), raggio 1,5 m, dopo l'apertura del collegamento. La copertura larga è composta da quattro pezzi da 2×2 con gli ID dello stesso gruppo. Le macchine di RE03/RE06 e i raccordi vengono trasformati insieme al layout nelle varianti; un bonus mantiene i riferimenti agli stessi ID, non a coordinate vecchie.

RE02 predispone in A tre barili a offset (+2,0), (+2,+2), (+2,+4) dal centro della zona. Il deposito resta lo stesso: una reazione ben preparata può aprirlo e colpire gli inseguitori; la demolizione diretta resta praticabile. Gli altri barili eventuali dichiarati dai layout non vengono duplicati sul medesimo punto.

### 20.4 Difesa: leggere un attacco e cambiare priorità

Ogni fase introduce il proprio gruppo principale, poi un aggiramento e una conclusione combinata. Gli accessi sono annunciati prima degli spawn. Il pacchetto W6 contiene una sola macchina N6 nella conclusione della fase, invece di riproporre tre volte lo stesso bersaglio pesante. Composizione, numero degli attori previsti e segnali sono determinati dal manifest prima di partire.

La cassa facoltativa e i rifornimenti esposti servono a una decisione reale: abbandonare per un momento una posizione protetta, oppure rinunciare a quell'opportunità e continuare a intervenire sul fronte. La riparazione non è automatica; usare materiali per una torre aggiuntiva rinvia la possibilità di spenderli per recuperare integrità, senza toccare il patrimonio della città.

In DI03, per esempio, il primo fronte permette di capire le traiettorie; il protettore della seconda fase rende utile cambiare bersaglio; nell'ultima, una sola macchina pesante avanza mentre l'aggiramento richiede movimento. Barile, richiamo, blocco o danno concentrato sono facilitazioni diverse; non esiste un eroe obbligatorio.

DI03 contiene una catena di tre barili in (9,3), (7,3), (5,3), vicina al percorso della macchina verso l'obiettivo. Non ricompare a ogni fase: consumarla troppo presto rinuncia a un'opportunità successiva, senza perdere beni permanenti. La geometria mantiene una via di almeno 2 m verso l'obiettivo e i barili non sostituiscono l'uscita dei nemici.

### 20.5 Obiettivi di abilità specifici

Ogni riga sostituisce il precedente bonus generico di assenza di danni. Vale il 10% e richiede il completamento; la cassa rimane il secondo 10%. Sono obiettivi facoltativi, ripetibili, mai condizioni di sblocco. Le varianti V3 mantengono la loro sostituzione esplicita dei bonus.

| Missione | Condizione |
|---|---|
| AV01 | Un'esplosione ambientale colpisce almeno 2 nemici distinti |
| AV02 | Tutti i sensori attivi senza danni dagli ostacoli mobili |
| AV03 | Carico consegnato con almeno il 70% dell'integrità massima |
| AV04 | Almeno 2 mezzi distrutti prima di raggiungere il punto di arresto |
| AV05 | Recuperare il dispositivo B aprendo il suo detrito mediante il barile vicino, non solo con danno diretto |
| AV06 | La macchina N6 non infligge danno all'attivo |
| RE01 | Liberare i due detriti B tramite il loro raccordo |
| RE02 | Un barile colpisce almeno un nemico e una struttura recuperabile |
| RE03 | L'attivazione della macchina C colpisce almeno 2 nemici |
| RE04 | Spegnere il dispositivo C senza subirne il danno d'area |
| RE05 | Usare la scorciatoia aperta dal detrito C prima del rientro |
| RE06 | Estrarre l'apparato con almeno il 50% dell'integrità dell'attivo |
| DI01 | Obiettivo finale con almeno il 70% dell'integrità massima |
| DI02 | Nessun nemico entrato dal cancello della fase 3 infligge danno all'obiettivo |
| DI03 | Distruggere la macchina N6 prima che danneggi l'obiettivo |
| DI04 | Recuperare le due casse di rifornimenti esposte e spendere almeno 20 rifornimenti in un intervento |
| DI05 | Attivare entrambi i terminali con una torre alleata entro il relativo raggio utile |
| DI06 | Una torre base spostata nelle pause colpisce una minaccia della fase 3 |

I bersagli hanno ID, causa del danno e segnali già previsti; le condizioni usano questi eventi. Una condizione non viene assegnata contando due volte lo stesso bersaglio e non aggiunge punteggi o moltiplicatori economici segreti.

### 20.6 Prima sessione e desiderio di ripartire

L'ingresso propone tre pulsanti attività, una formazione iniziale valida e una missione rappresentativa per ciascuna. Il resto del catalogo è disponibile nello stesso pannello; non richiede tutorial, città o capitoli. Un nuovo giocatore può scegliere liberamente il personaggio gratuito; non deve studiare tutti i cataloghi prima di muoversi.

I primi suggerimenti sono brevi indicazioni contestuali su bersaglio, interazione ed effetto raccolto, chiudibili e senza fermare la simulazione. Non aggiungono una quarta attività di addestramento. Come obiettivi di ritmo progettuali, la prima occasione d'azione deve apparire entro circa 5 s dal controllo e il primo recupero utile entro circa 20 s: si adatta la disposizione, non si usa un timer per distribuire premi gratuiti.

Dal risultato si può fissare un acquisto, comprarlo se accessibile senza aprire una sequenza di menu e tornare alla partita. Si mostra l'effetto concreto: carica aggiuntiva, penetrazione, maggiore area o nuovo stato visivo dell'edificio, oltre alla percentuale. Per un edificio non ancora piazzato si apre direttamente la preview della città. Nessun primo acquisto viene imposto e nessun altro viene escluso.

La ripetizione ha tre motivi distinti: padroneggiare una situazione, provare effetti e personaggi diversi, finanziare il prossimo acquisto scelto. Giornalieri e annunci non sostituiscono questi motivi. Il controllo del ritmo non considera automaticamente 553 vittorie una quantità di divertimento: se la ripetizione necessaria supera l'interesse delle situazioni, si rivedono costi o contenuti prima di allungare il percorso.

### 20.7 Revisione limitata e verifica del risultato

Il miglioramento non aggiunge un direttore adattivo, nemici nuovi o una simulazione fisica complessa. La cadenza è definita nei dati e si conserva nel salvataggio. I feedback non fermano l'input; le animazioni di ricompensa non sono un requisito per continuare. I dettagli degli effetti audiovisivi e delle osservazioni sul gioco sono nella specifica §§16–17.

Questo è un miglioramento progettato, non un divertimento già osservato. Le prove previste riguardano il prodotto in sviluppo e non autorizzano la realizzazione di un prototipo diverso dal gioco richiesto.

## Documenti collegati

- [Piano ufficiale completo di lavoro](PIANO-DI-LAVORO.md).
- [Specifica esecutiva per lo sviluppo](SPECIFICA-ESECUTIVA.md).
- [Personaggi, reclutamento, gacha e miglioramenti](PERSONAGGI-E-SQUADRA.md).
- [Economia, AFK, eventi, ricerca competitiva e controlli](BENCHMARK-PROGRESSIONE-EVENTI.md).
- [Sostenibilità tecnica, asset, servizi e pubblicazione](RICERCA-TECNICA-LEGALE.md).

La fonte delle affermazioni esterne è negli approfondimenti. I contenuti del gioco qui progettati sono raccomandazioni dell'agente: non vengono presentati come fatti osservati o preferenze già espresse dall'utente.
