# Sostenibilità tecnica, contenuti e pubblicazione

Approfondimento della soluzione proposta in [PROGETTO.md](PROGETTO.md), 20 ottobre 2026. Questo documento descrive una raccomandazione; non autorizza installazioni, codice, prototipi, contatti esterni o pubblicazione.

Le istruzioni applicative sono ora nella [SPECIFICA-ESECUTIVA.md](SPECIFICA-ESECUTIVA.md): ambiente candidato e setup §2, struttura §3, dati e salvataggio §§5–8, integrazioni §13, distribuzione §15. Il [piano §§20–21](PIANO-DI-LAVORO.md) fissa consegne e stime. Questo approfondimento conserva ricerca e condizioni esterne, senza creare un secondo manuale tecnico concorrente.

## 1. Scelta tecnica e piattaforme

Godot con GDScript è la scelta su delega già registrata. La versione di produzione va selezionata per compatibilità effettiva con export Android, plugin pubblicitari e fatturazione. Non si dichiara che un plugin disponibile o un vecchio avvio del motore rendano queste integrazioni già pronte.

Raccomandazione grafica: 3D stilizzato, camera limitata, ambienti modulari e renderer Compatibility come candidato iniziale. Android è primario; mouse e tastiera sono gli input equivalenti per un eventuale PC. Non è richiesto un backend per giocare le attività PvE ordinarie.

Il modello esatto di telefono, la memoria e la prestazione minima accettabile non sono stati forniti. Non si attribuisce al progetto un supporto hardware già verificato. La proposta di grafica semplice riduce alcune esigenze, ma non prova fluidità, consumi o stabilità.

Godot è MIT e permette una licenza separata per i contenuti originali; gli avvisi del motore distribuito vanno conservati secondo la [fonte ufficiale](https://godotengine.org/license/). Questo non autorizza a usare senza verifica qualunque asset trovato in rete.

## 2. Struttura comune alle tre attività

Avanzata, Recupero operativo e Difesa mobile condividono personaggi, attacchi, strumenti, interazioni, risorse e risultati. Avanzata usa una camera che segue il percorso; le altre attività usano aree più aperte. Il riuso riguarda regole e contenuti, senza fingere che tre esperienze complete siano tre schermate da collegare.

| Sistema | Responsabilità | Condizione di coerenza |
|---|---|---|
| Catalogo | Personaggi, edifici, strumenti e costi | Identificativi stabili; tutti i miglioramenti previsti sono ottenibili |
| Attività | Obiettivi, minacce, interazioni e risultati | Nessuna modifica diretta e non registrata del saldo |
| Progressione | Acquisti, formazione e proprietà permanenti | Nessuna esclusione fra categorie o tetto imposto dai capitoli |
| Economia | Premi, costi, conversioni e AFK | Operazioni uniche e risultati riprendibili |
| Reclutamento | Possesso, estrazioni, contatore e acquisto diretto | Nessun duplicato richiesto per ottenere potenza esclusiva |
| Città | Piazzamento e rappresentazione degli investimenti | Non diventa il permesso globale per comprare in altri ambiti |
| Interfaccia | Comandi e informazioni | Pochi passaggi fra attività e risultato |
| Servizi | Acquisti, rewarded ed eventuale competizione | L'indisponibilità non interrompe il PvE normale |

Livelli e miglioramenti devono essere descritti da dati leggibili, senza riscrivere le stesse regole in ogni attività. Acquistare un upgrade non rimuove il possesso di un altro; selezionare la formazione modifica solo la missione in preparazione.

## 3. Catalogo di contenuti esteso

La tabella descrive il profilo ESTESO. C01 conserva le tre attività, il roster e la città, con una sola configurazione per schema (18 totali) e un ambiente modulare. La raccomandazione di prima uscita è C01, come proposta ancora da valutare; il piano §21 stima separatamente il lavoro aggiuntivo del catalogo esteso.

| Contenuto | Quantità proposta | Lavoro effettivo da considerare |
|---|---:|---|
| Attività principali | 3 | Regole, interfaccia e situazioni complete per ciascuna |
| Personaggi | 8 profili | Un rig comune dove possibile, attrezzi e abilità riconoscibili |
| Tipi urbani acquistabili | 9, oltre al Centro | Modelli con stati visivi, funzioni e miglioramenti |
| Schemi di missione | 6 per attività | Geometria e ritmo, non sole immagini diverse |
| Configurazioni curate | 4 per schema, 72 complessive | Obiettivi e incontri verificati individualmente |
| Ambientazioni modulari | 3 | Componenti riutilizzabili e differenze leggibili |
| Famiglie di minaccia | 6 condivise | Inseguimento, tiro, carica, protezione, disturbo e obiettivo prioritario |

Le 72 configurazioni non sono 72 ambienti costruiti da zero. Non sono neppure 72 missioni interessanti garantite dalla combinazione di pochi interruttori. Serve progettare come gli elementi si incontrano e come l'obiettivo si distingue.

Non si aggiunge una guida di veicoli separata: la scorta è una variante dell'Avanzata. Scavo e demolizione sono interazioni del Recupero. I supporti non sono altre due intelligenze artificiali complete. Queste sono le principali semplificazioni della proposta.

Non sono necessarie nella prima uscita simulazione dettagliata di cittadini, doppiaggio, dialoghi ramificati, chat, gilde, commercio online o guerre territoriali. Un loro inserimento successivo è una modifica esplicita della portata, non una funzione nascosta nel costo attuale.

## 4. Salvataggio, risultati e offline

Campagna o catalogo di missioni, città, personaggi, strumenti, premi e reclutamento sono dati persistenti. Il formato ha una versione. Scrittura temporanea, controllo dell'esito e copia precedente proteggono il recupero; un fallimento non viene presentato come acquisto riuscito.

La missione sospesa conserva obiettivo, fase, posizione, integrità, oggetti rimasti, effetti temporanei e identificativi delle quote già assegnate. Riprendere non deve rigenerare i premi o far ripartire la missione come un nuovo tentativo.

Ogni acquisto o ricompensa ha un esito unico. La città riceve risultati validati; non viene modificata da ogni animazione di raccolta indipendentemente dal salvataggio. Una conversione non può essere eseguita due volte per il doppio tocco sul pulsante.

L'AFK chiude l'intervallo trascorso al tasso precedente prima di applicare un upgrade. Il saldo delle attività non viene tagliato al cap del deposito. Le frazioni produttive vengono conservate, senza perdere una parte del rendimento a ogni apertura.

L'orologio e i salvataggi locali sono manipolabili: non si dichiarano sicuri per una classifica competitiva. Per il PvE locale il progetto accetta questo limite senza aggiungere un server obbligatorio a tutte le azioni.

## 5. Reclutamento e servizi commerciali

Il gacha funzionale raccomandato usa crediti di gioco e garanzia permanente. Quando si cambia obiettivo, probabilità e contatore devono corrispondere alle regole mostrate. Per il risultato di garanzia la probabilità esposta è diversa da quella delle estrazioni ordinarie.

Nel modello proposto il denaro reale compra prodotti estetici diretti. L'eventuale introduzione di un gacha a pagamento non è una semplice modifica di prezzo: cambia equilibrio, verifica degli esiti e obblighi di presentazione, e richiede una nuova decisione.

Google richiede di rendere note le probabilità dei meccanismi che assegnano oggetti virtuali casuali a seguito di acquisto, vicino al contesto dell'acquisto. Fonte ricontrollata il 20/10/2026: [Payments, punto 7](https://support.google.com/googleplay/android-developer/answer/9858738?hl=en). Questa regola non certifica da sola legalità o appropriatezza di ogni gacha in tutti i paesi. La proposta mostra comunque le probabilità anche per il reclutamento con soli crediti guadagnati.

Gli acquisti estetici non consumabili devono poter essere ripristinati. Firma, prodotti, ricevute e verifica degli esiti dipendono dai servizi reali. Non si memorizzano credenziali o chiavi commerciali nei documenti pubblici del progetto.

Il premio base viene assegnato senza dipendere dal servizio pubblicitario. Il bonus rewarded si attribuisce soltanto dopo l'esito valido e una volta per risultato. Se l'annuncio non è disponibile o viene interrotto, si può tornare a giocare. La gestione delle preferenze segue i servizi effettivi; riferimento ufficiale: [Google UMP](https://developers.google.com/admob/android/privacy).

## 6. Asset e direzione artistica

La città e il gameplay richiedono materiali coerenti: dimensioni degli edifici, sagome, palette, effetti e animazioni. Non si sceglie la forma del gioco soltanto per adattarla al primo pacchetto gratuito disponibile.

Fonti candidate della ricerca precedente:

| Fonte | Utilità | Stato |
|---|---|---|
| [Kenney Starter Kit City Builder](https://github.com/KenneyNL/Starter-Kit-City-Builder) | Riferimento di griglia e asset urbani | Non include l'intero gameplay progettato |
| [Kenney](https://kenney.nl/assets) | Modelli, UI ed effetti | Singoli pacchetti da selezionare, non importazione autorizzata |
| [KayKit City Builder Bits](https://github.com/KayKit-Game-Assets/KayKit-City-Builder-Bits-1.0) | Edifici e oggetti | Candidato, da confrontare con la direzione scelta |
| [Quaternius](https://quaternius.com/) | Personaggi, ambienti e animazioni | Licenza del pacchetto concreto da verificare |

Nel candidato Kenney codice e asset non vanno registrati con un'unica licenza generica. Il font Lilita incluso nella revisione esaminata ha una SIL Open Font License propria: [prova nel sorgente](https://github.com/KenneyNL/Starter-Kit-City-Builder/blob/4535092b740b378b700efd9df9e27a631815b84a/fonts/license.txt). Non è corretto dedurre che ogni file del kit sia CC0 dalla sola dichiarazione sui modelli.

Quando sarà autorizzato l'uso, il registro di ciascun elemento conterrà autore, URL, data, revisione, licenza, prova e obblighi. Una risorsa considerata non è una risorsa già utilizzata. Per elementi generati con AI valgono i termini concreti del servizio e dell'impiego; non si presume esclusività.

## 7. Condizioni di pubblicazione

Per nuove app e aggiornamenti per telefoni la fonte Google indica dal 31 agosto 2026 Android 16 / API 36 o superiore, con eccezioni ed estensioni descritte a parte: [requisiti target API](https://support.google.com/googleplay/android-developer/answer/11926878?hl=it), ricontrollati il 20/10/2026. Il target richiesto non è la versione minima dei dispositivi supportati.

La [guida all'export Android Godot](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_android.html), consultata nella stessa data, descrive JDK, SDK ed export. Un esempio della guida che usa pacchetti SDK precedenti non prova conformità al requisito Google attuale: motore, preset e plugin vanno verificati insieme.

L'account Play Console reale non è stato esaminato. Quota di registrazione, verifica dell'identità ed eventuali requisiti di test dipendono dalle condizioni applicabili: [requisiti ufficiali per nuovi account personali](https://support.google.com/googleplay/android-developer/answer/14151465?hl=it). Non si attribuiscono all'utente iscrizioni o procedure già completate.

Prima di un invio occorreranno pacchetto e firma validi, privacy e dichiarazioni dei dati effettivi, classificazione dei contenuti, licenze e scheda store coerente. Sono condizioni di distribuzione da soddisfare in seguito, non una certificazione già ottenuta. Aspetti fiscali e commerciali dipendono dal titolare e dai mercati reali.

## 8. Strategia operativa e rischio economico

La proposta raccomanda ricavi da estetiche dirette e rewarded limitate perché separano chiaramente denaro reale e potenza funzionale. La ricerca non dimostra che questa combinazione basti a finanziare il progetto. Non si inventano prezzi, tassi di acquisto o incassi per far tornare il piano.

Il [piano ufficiale, §18](PIANO-DI-LAVORO.md) anticipa la verifica economica rispetto alla produzione: confronto di portate, ricavo pubblicitario per utenti effettivamente attivi, acquisti, costi e lavoro di manutenzione. Contiene una proposta di catalogo ridotto ancora da valutare; il catalogo esteso resta una proposta non dimostrata sostenibile. Gli esempi numerici del piano sono ipotesi aritmetiche, non benchmark di mercato.

Le spese da stimare con dati reali sono produzione dei contenuti, asset mancanti, integrazioni, pubblicazione e manutenzione. Il PvP aggiungerebbe servizi autorevoli, moderazione delle classifiche e gestione delle versioni. I costi non si riducono alla licenza gratuita del motore.

Il ciclo di contenuto sostenibile raccomandato riusa interazioni e ambienti per aggiungere situazioni curate; non richiede un minigioco nuovo a ogni evento. Le tre attività devono rimanere complete, invece di distribuire il lavoro fra numerosi titoli superficiali.

Per una persona il catalogo proposto resta impegnativo. Se risorse e tempo non bastano, occorre una decisione esplicita sulla portata. Non si sostituisce silenziosamente il progetto con una demo, né si passa automaticamente alla programmazione perché i documenti sono completi.

## 9. Cosa è concluso nella proposta e cosa richiede prove reali

La soluzione definisce attività, collegamenti, catalogo raccomandato, controllo, proprietà degli upgrade, reclutamento, economia, servizi e monetizzazione. Le scelte nuove restano raccomandazioni da valutare con l'utente.

Non sono conclusi da una descrizione: divertimento, prestazioni sul telefono, adeguatezza dei numeri, interesse del pubblico, ricavi, budget o tempi. La richiesta attuale è lo studio e la soluzione di design; nessun codice o prototipo è stato autorizzato.

## 10. Ricerca sul ritmo e applicazione limitata

Nella presentazione primaria di Michael Booth, Valve distingue variazioni del ritmo da aumento della difficoltà e descrive alternanza di pressione e decompressione: [The AI Systems of Left 4 Dead, pp. 77–91](https://cdn.akamai.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf), consultata il 20/10/2026. È un caso di progettazione del suo autore, non una prova di successo per AndroidGAME.

L'inferenza adottata qui è limitata: variare problema e fronte fra gli incontri, dare spazio a leggere l'esito delle azioni ed evitare lunghe attese dopo una vittoria. Non si importa il direttore adattivo o il sistema cooperativo di quel gioco. La cadenza rimane in dati finiti, preservando salvataggi e costi del perimetro proposto. La revisione esecutiva è in PROGETTO §20 e SPECIFICA-ESECUTIVA §§7 e 16–17.
