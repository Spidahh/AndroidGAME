# AndroidGAME — Piano ufficiale completo di lavoro

Versione 2.1 — 20 ottobre 2026. Piano esecutivo e documento interno di avanzamento.

**Per lavorare al PC:** iniziare dalla sezione 20, seguire E01–E16 e tenere aperta la [SPECIFICA-ESECUTIVA.md](SPECIFICA-ESECUTIVA.md). Le sezioni 1–19 conservano requisiti, fasi, dipendenze e contesto; non sostituiscono le istruzioni operative della sezione 20.

## 1. Mandato e risultato finale

Fornire il piano già scritto con cui andare al PC e sviluppare il gioco: specifiche applicabili, file da realizzare, ordine di consegna, parametri iniziali, casi di errore, contenuti, verifiche, stime e distribuzione. La fase corrente produce questi documenti, non codice.

Il piano è il riferimento unico per ordine delle attività, dipendenze, avanzamento e criteri di completamento. [PROGETTO.md](PROGETTO.md) rimane il riferimento unico per le regole del gioco. L'inserimento di una proposta in questo piano non la trasforma in una decisione dell'utente. Le fasi produttive descrivono il lavoro futuro: la richiesta del piano non autorizza a iniziare codice, prototipi o pubblicazione.

Il risultato finale previsto, subordinato alle decisioni ancora aperte, è un gioco Android completo nel quale le attività giocabili alimentano città, personaggi e attrezzature. Tutti i miglioramenti permanenti rimangono ottenibili e cumulabili. Un'eventuale versione PC e il PvP hanno percorsi distinti, senza diventare prerequisiti del gioco Android.

**Priorità ribadita dall'utente:** attività divertenti come centro del gioco, guadagno e complessità contenuta. La revisione 2.1 migliora situazioni e feedback di PROGETTO §20, conserva il percorso esecutivo e aggiorna il carico stimato. Non certifica divertimento, risultati commerciali o prestazioni non misurati.

## 2. Fonti e stato di partenza

| Fonte | Autorità e uso |
|---|---|
| Istruzioni e correzioni dell'utente, riassunte in PROGETTO §1 | Vincoli e decisioni confermate; prevalgono sulle proposte |
| [PROGETTO.md](PROGETTO.md) | Design canonico, attività, città, contenuti e strategia proposti |
| [PERSONAGGI-E-SQUADRA.md](PERSONAGGI-E-SQUADRA.md) | Personaggi, formazione, strumenti e reclutamento proposti |
| [BENCHMARK-PROGRESSIONE-EVENTI.md](BENCHMARK-PROGRESSIONE-EVENTI.md) | Modello economico di partenza, eventi e fonti della ricerca |
| [RICERCA-TECNICA-LEGALE.md](RICERCA-TECNICA-LEGALE.md) | Ricerca tecnica, asset candidati e condizioni di distribuzione |
| [SPECIFICA-ESECUTIVA.md](SPECIFICA-ESECUTIVA.md) | Struttura Godot, dati, combattimento, stati, interfacce, servizi e casi di verifica |
| Questo documento | Piano operativo, stato delle attività e decisioni da chiudere |

**Stato alla revisione 2.1:** la repository contiene documenti di design e specifiche esecutive con parametri di partenza; non contiene un gioco implementato. Il pacchetto descrive missioni e varianti, combattimento, cataloghi, città, interfacce, persistenza, servizi e sequenza di realizzazione. Comprende ora collegamenti ambientali, emissioni di Difesa distinte e condizioni di abilità proprie di ogni missione. Non risultano misurati divertimento, prestazioni, tempi effettivi o ricavi. Una stima di impegno non è un tempo osservato.

| Elemento | Stato |
|---|---|
| Piano di lavoro, struttura e dipendenze | Redatti in questa revisione |
| Vincolo di progressione libera e cumulativa | Confermato |
| Attività delle ads realmente giocabili come attività principale | Confermato |
| Godot con GDScript | Scelta su delega registrata |
| Tre modalità, otto profili, formazione, controlli e quantità di contenuto | Proposta da valutare |
| Configurazione del gacha e modello commerciale | Proposta da valutare |
| Specifiche esecutive di dettaglio | Redatte come base proposta; riferimenti nella sezione 20 |
| Implementazione, integrazioni, collaudo e pubblicazione | Non avviati |

## 3. Regole di esecuzione e responsabilità

L'agente prepara analisi, specifiche, alternative motivate, verifiche e aggiornamenti documentali. Le decisioni di prodotto non delegate rimangono dell'utente; contatti esterni, acquisti, account, spese e pubblicazione richiedono la relativa autorizzazione. Non sono assegnati incarichi a collaboratori esterni non presenti.

Le dipendenze qui sotto riguardano l'ordine di produzione del software. Non introducono requisiti di capitolo, edifici o specializzazioni per il giocatore.

Si lavora per risultati verificabili. Per ogni attività si registrano stato, dipendenza, risultato prodotto ed evidenza della verifica. Gli stati ammessi sono **da fare, in corso, da decidere, completata, bloccata**. Una descrizione scritta non vale come funzione implementata; una funzione implementata non vale come funzione verificata.

Le correzioni aggiornano prima la fonte canonica competente e poi i riferimenti collegati. Non si creano documenti concorrenti con regole diverse. Una modifica di portata indica motivo, elementi coinvolti e conseguenze prima di sostituire la base di lavoro.

## 4. Decisioni e informazioni da chiudere

La preparazione delle specifiche può proseguire sulle proposte esplicitamente etichettate. Prima della produzione si chiudono le decisioni che incidono sul lavoro da realizzare, presentando risultati e conseguenze concreti, senza chiedere all'utente di progettare al posto dell'agente.

| ID | Punto da chiudere | Preparazione richiesta | Momento limite |
|---|---|---|---|
| D01 | Attività, controlli, visuale e formazione | Specifiche complete delle tre attività e confronto fra esigenze di gioco e complessità | Prima della fase 3 |
| D02 | Portata della prima uscita | Confronto della proposta contenuta §18.1 con il catalogo esteso; distinta di missioni, personaggi, edifici, ambienti e asset con carico di lavoro stimato | Prima della fase 3 |
| D03 | Reclutamento e monetizzazione | Regole complete, percorso gratuito, effetti dei bonus e catalogo commerciale proposto | Prima della fase 6; decisione di modello prima di produrre asset commerciali |
| D04 | Identità e presentazione | Direzione artistica, ambientazione, eventuale ruolo della narrazione, nomi e proposta di titolo | Direzione prima della produzione artistica; titolo prima dei materiali store |
| D05 | Dispositivi e requisiti tecnici | Disponibilità reale di telefoni, prestazioni attese e matrice di compatibilità | Prima di impegnare la produzione grafica |
| D06 | Tempo, budget e guadagno desiderato | Stima delle attività e delle spese; disponibilità del titolare, risultato economico desiderato e orizzonte di recupero ancora da acquisire | Prima di fissare calendario e spese |
| D07 | Mercati, lingue e account commerciali | Ricognizione delle esigenze effettive e dello stato degli account | Prima della fase 10 |
| D08 | PC e PvP | Valutazione separata di contenuti, servizi, manutenzione e costi aggiuntivi | Prima di includerli in una consegna |

Nessuna data di uscita o soglia di ricavo viene dedotta dall'esistenza dei documenti. I punti D05–D07 richiedono dati reali; per gli altri il pacchetto esecutivo contiene la raccomandazione concreta, senza presumere l'approvazione.

## 5. Sequenza generale

| Fase | Risultato | Dipendenza principale | Stato iniziale |
|---|---|---|---|
| 0 | Piano ufficiale e fonti allineate | Documenti esistenti | Completata con questa revisione documentale |
| 1 | Specifiche di design esecutive | Fase 0 | Base proposta redatta; decisioni non attribuite all'utente |
| 2 | Piano tecnico, asset, stime e base di produzione definita | Fase 1; preparazione anticipabile | Istruzioni e stime redatte; ambiente e dati esterni da riscontrare |
| 3 | Fondamenta del prodotto e salvataggio | Fasi 1–2, decisioni pertinenti e autorizzazione allo sviluppo | Da fare |
| 4 | Tre attività complete sui sistemi comuni | Fase 3 e specifiche delle attività | Da fare |
| 5 | Città, economia e progressione integrate | Fase 3; integrazione con fase 4 | Da fare |
| 6 | Personaggi, strumenti e reclutamento completi | Fasi 3–5 e D03 pertinente | Da fare |
| 7 | Catalogo di contenuti completo e presentazione | Sistemi delle fasi 4–6 stabili | Da fare |
| 8 | Interfaccia finale, eventi e servizi commerciali | Fasi 4–7 e decisioni commerciali | Da fare |
| 9 | Versione candidata verificata | Fasi 3–8 | Da fare |
| 10 | Pacchetto e materiali pronti per distribuzione | Fase 9 e D07 | Da fare |
| 11 | Pubblicazione autorizzata e manutenzione | Fase 10; autorizzazione all'invio | Da fare |

Su una singola persona le attività condividono la stessa capacità: il lavoro sovrapponibile non viene contato come personale aggiuntivo. Arte, audio e interfaccia vengono specificati presto e integrati durante la produzione; la fase 7 ne completa il catalogo, non ne rinvia ogni valutazione alla fine.

## 6. Fase 1 — Chiusura del design esecutivo

Le specifiche si completano nei documenti esistenti, con identificativi stabili per contenuti e regole. Questa fase è lavoro di progettazione, senza realizzare prototipi.

Nella revisione 2.0 le specifiche sotto sono state redatte nei riferimenti della sezione 20. La tabella rimane la matrice di copertura; non indica che l'implementazione debba prima inventare nuovamente le regole.

| ID | Lavoro | Risultato e criterio di completamento |
|---|---|---|
| L01 | Verificare requisiti, proposte e contraddizioni | Ogni regola ha stato e fonte; nessun percorso permanente esclude altri upgrade |
| L02 | Dettagliare Avanzata, Recupero e Difesa | Per ogni attività: stato iniziale, azioni, obiettivo, progressi, vittoria, sconfitta, uscita, sospensione e ripresa |
| L03 | Specificare i diciotto schemi e le configurazioni | Schede con disposizione, sequenza degli incontri, interazioni, traguardi di premio e conclusione; elenco completo delle configurazioni della portata scelta |
| L04 | Completare combattimento e minacce | Comportamenti, segnali anticipatori, attacchi, danni, collisioni, portate, priorità dei bersagli e risposta possibile con ogni profilo |
| L05 | Completare personaggi, strumenti e dispositivi | Effetti di base, recuperi, cariche, supporti e singoli upgrade; interazioni e ordine di calcolo dei bonus definiti |
| L06 | Completare città e catalogo | Ingombri, piazzamento, spostamento, ampliamenti, prezzi delle aree, effetti di ogni livello e di ogni acquisto aggiuntivo |
| L07 | Chiudere economia e reclutamento | Tutte le fonti e spese elencate, arrotondamenti, esperienza, duplicati, garanzia, AFK e casi di saldo insufficiente; nessun oggetto richiesto senza una via di ottenimento |
| L08 | Definire ritmo e progressione nel tempo | Percorsi esemplificativi di spesa iniziale, intermedia e avanzata; acquisti funzionali confrontabili e attività significative anche a catalogo completato |
| L09 | Specificare interfaccia e presentazione | Flussi da apertura a partita, risultato, acquisto e nuova partita; accessibilità, impostazioni, informazioni e distinta degli elementi visivi e sonori |
| L10 | Chiudere identità, pubblico e strategia commerciale | Identità, destinatari, comunicazione e narrazione; modello di ricavo con scenari §18.2, carico di manutenzione e punti D01–D04 raccolti per decisione |

**Uscita di fase:** non rimangono regole necessarie all'implementazione espresse soltanto come «bonus», «piccolo aumento» o «da definire». I valori sono parametri di partenza identificati, non dichiarazioni di bilanciamento provato. Le decisioni irrisolte restano visibili con l'impatto sul lavoro dipendente.

## 7. Fase 2 — Preparazione della produzione

| ID | Lavoro | Risultato e criterio di completamento |
|---|---|---|
| L11 | Definire ambiente Godot e integrazioni | Versioni candidate, compatibilità Android, percorso di export e dipendenze documentati; verifiche pratiche rinviate allo sviluppo autorizzato |
| L12 | Specificare architettura e dati | Confini fra attività, cataloghi, economia, salvataggio e servizi; formato degli identificativi e regole di migrazione |
| L13 | Preparare distinta e provenienza degli asset | Modelli, animazioni, UI, font, effetti e audio elencati con disponibilità, licenze da verificare e lavoro mancante; nessun acquisto implicito |
| L14 | Definire criteri tecnici e matrice dispositivi | Risoluzioni, aree sicure, memoria, fluidità e tempi di caricamento attesi concordati rispetto a D05 |
| L15 | Stimare lavoro, costi e sostenibilità | Per attività: intervallo di impegno, assunzioni, dipendenze, rischio e spese; confronto portate §18.1 e pubblico necessario §18.2; calendario solo dopo D06 |
| L16 | Consolidare base di produzione | Riepilogo delle decisioni effettive, portata risultante e attività autorizzate; nessuna proposta promossa automaticamente a requisito |

**Uscita di fase:** lavoro e risorse sono tracciabili; la portata ha una stima motivata. Prima della produzione devono essere espliciti costo iniziale, carico mensile, fonti di pubblico e condizioni economiche necessarie, anche se ancora ipotetiche. Se il piano dipende da ricavi o pubblico non motivati, la sostenibilità resta non dimostrata e si presenta la revisione concreta, conservando le priorità confermate. L'avvio della fase 3 resta distinto dalla consegna del piano.

## 8. Fase 3 — Fondamenta del prodotto

| ID | Lavoro futuro | Risultato e criterio di completamento |
|---|---|---|
| L17 | Configurare progetto e build Android | Progetto riproducibile, versioni registrate e avvio sul dispositivo disponibile |
| L18 | Implementare cataloghi e operazioni economiche | Acquisti e premi applicati una sola volta; dati separati dalla presentazione |
| L19 | Implementare salvataggio e recupero | Città, saldo, roster e missione persistenti; ripresa dopo chiusura e recupero da scrittura fallita verificati |
| L20 | Implementare movimento, camera e interazioni comuni | Comandi usabili sul dispositivo, bersagli selezionabili e segnali leggibili |
| L21 | Implementare stati di missione e risultato | Avvio, traguardi, conclusione, abbandono, sospensione e ripresa senza duplicare premi |

**Uscita di fase:** le fondamenta sono integrate nel prodotto destinato a crescere nelle fasi successive. Non si consegna una demo come sostituto del gioco pianificato.

## 9. Fase 4 — Attività principali

| ID | Lavoro futuro | Risultato e criterio di completamento |
|---|---|---|
| L22 | Realizzare Avanzata | Percorso, incontri, ostacoli, effetti temporanei e obiettivi completi; il movimento conserva utilità con gli upgrade |
| L23 | Realizzare Recupero operativo | Raccolta e demolizione modificano l'area; macchinari, carico e uscita funzionano con ricompense coerenti |
| L24 | Realizzare Difesa mobile | Preparazione, tre fasi, presidi e rifornimenti locali; sconfitta e ripetizione senza perdita della città |
| L25 | Integrare minacce e difficoltà | Combinazioni previste applicabili; risposte leggibili, nessun personaggio esclusivo necessario |
| L26 | Verificare una missione completa per attività | Partenza, azione, esito, salvataggio e nuova partita verificati per ciascuna; evidenze registrate prima di moltiplicare i contenuti |

**Uscita di fase:** esistono tutte le attività nella loro struttura completa. Le prime missioni integrate sono parti del prodotto finale; il catalogo complessivo rimane da completare nella fase 7.

## 10. Fase 5 — Città, economia e progressione

| ID | Lavoro futuro | Risultato e criterio di completamento |
|---|---|---|
| L27 | Realizzare griglia e sviluppo urbano | Piazzamento, spostamento, ampliamenti e stati visivi conservano gli acquisti |
| L28 | Realizzare edifici e upgrade | Catalogo della portata scelta completo; effetti acquistabili insieme e nessun requisito fra edifici introdotto dal codice |
| L29 | Integrare premi, priorità e conversioni | Saldi e riepiloghi coincidono; sconfitte e rientri pagano solo le quote maturate |
| L30 | Realizzare AFK ed esperienza | Frazioni conservate, vecchio tasso chiuso prima degli upgrade, cap applicato solo alla produzione passiva e addestramento non bloccato dall'esperienza |

**Uscita di fase:** il ciclo attività → risorse → acquisto → effetto nella partita successiva è verificato. Un percorso di spesa non elimina gli altri e non rende obbligatorio cambiare attività.

## 11. Fase 6 — Personaggi, strumenti e reclutamento

| ID | Lavoro futuro | Risultato e criterio di completamento |
|---|---|---|
| L31 | Realizzare roster e formazione | Ogni profilo utilizzabile nelle attività; supporti applicati solo dove pertinenti; possesso separato dalla selezione |
| L32 | Realizzare livelli e miglioramenti funzionali | Ogni upgrade previsto produce l'effetto specificato, anche insieme agli altri; nessuna dipendenza da duplicati non approvata |
| L33 | Realizzare strumenti e dispositivi comuni | Acquisto, utilizzi, ricariche e bonus coerenti con le specifiche; nessun consumo involontario di risorse cittadine |
| L34 | Realizzare reclutamento approvato | Acquisto diretto ed eventuali estrazioni con probabilità, garanzia, duplicati e completamento del catalogo conformi alla decisione D03 |

**Uscita di fase:** il catalogo scelto è completo e ogni profilo può progredire con le vie di ottenimento previste. Il codice non fissa un modello commerciale diverso dalla decisione registrata.

## 12. Fase 7 — Contenuti, arte e audio

| ID | Lavoro futuro | Risultato e criterio di completamento |
|---|---|---|
| L35 | Completare schemi e configurazioni | Tutte le missioni della portata scelta hanno obiettivi, disposizione, incontri e risultato verificati individualmente |
| L36 | Integrare ambienti, personaggi e città | Distinta degli asset completata; scale, sagome, animazioni e stati di upgrade coerenti |
| L37 | Integrare feedback e audio | Attacchi, danni, raccolta, obiettivi e acquisti riconoscibili; musica, effetti e controlli di volume funzionanti |
| L38 | Verificare varietà e leggibilità | Differenze fra configurazioni osservabili nel gioco; effetti visivi non nascondono minacce o informazioni essenziali |

**Uscita di fase:** conteggio dei contenuti confrontato con D02, assenza di elementi temporanei nella consegna prevista e provenienza degli asset registrata. Un cambio di colore non sostituisce una situazione distinta.

## 13. Fase 8 — Esperienza completa e servizi

| ID | Lavoro futuro | Risultato e criterio di completamento |
|---|---|---|
| L39 | Completare interfaccia e introduzione | Flussi completi, tutorial saltabile senza alterare la dotazione, impostazioni e adattamento agli schermi della matrice |
| L40 | Integrare contratti, eventi e maestrie | Obiettivi, rotazioni, premi e recupero degli incarichi coerenti; nessun requisito nascosto per comprare upgrade |
| L41 | Integrare servizi commerciali scelti | Acquisti, ripristino, rewarded e preferenze pertinenti verificati; indisponibilità del servizio non interrompe il PvE |
| L42 | Integrare testi e lingue concordate | Testi completi, leggibili, coerenti con le regole e separati dalle note di design |

**Uscita di fase:** l'intero percorso utente funziona, incluse indisponibilità della rete e risposte dei servizi. I prodotti commerciali e le informazioni esposte corrispondono a D03 e D07.

## 14. Fase 9 — Collaudo e bilanciamento

| ID | Lavoro futuro | Risultato e criterio di completamento |
|---|---|---|
| L43 | Collaudare integrità dei progressi | Acquisti, ricompense, garanzia, sospensione, recupero e migrazione verificati nei casi normali e di interruzione |
| L44 | Verificare progressione completa | Percorsi di spesa differenti fino al catalogo completo; nessun blocco permanente, saldo errato o upgrade reso inutile da altri acquisti |
| L45 | Osservare gioco e tarare i parametri | Durata, leggibilità, sconfitte, utilità dei premi e peso dei menu osservati; correzioni motivate dalle evidenze |
| L46 | Misurare prestazioni e compatibilità | Dispositivi della matrice verificati rispetto ai criteri D05; consumi e sessioni prolungate inclusi nei limiti concordati |
| L47 | Preparare versione candidata | Difetti classificati; nessun difetto aperto che causi perdita di progressi, acquisti errati, mancato avvio sui dispositivi dichiarati o impedimento al ciclo principale |

I controlli aritmetici sui documenti restano distinti dai test di codice e dalle sessioni osservate. Le osservazioni sul divertimento non diventano automaticamente statistiche di pubblico. Si ripetono le verifiche interessate dalle modifiche, senza rifare indiscriminatamente ogni controllo.

**Uscita di fase:** evidenze associate alla versione candidata, problemi residui dichiarati e criteri funzionali e tecnici soddisfatti. Nessuna soglia numerica di retention o redditività viene inventata per dichiarare il successo.

## 15. Fase 10 — Preparazione alla distribuzione

| ID | Lavoro futuro | Risultato e criterio di completamento |
|---|---|---|
| L48 | Ricontrollare requisiti e account reali | Requisiti store aggiornati dalle fonti ufficiali; account, identità, mercati e percorsi di test applicabili verificati |
| L49 | Preparare pacchetto e informazioni commerciali | Versione firmata, impostazioni e prodotti coerenti; credenziali custodite fuori dalla repository |
| L50 | Completare documenti e provenienza | Licenze, avvisi, privacy, dati effettivamente trattati e classificazione coerenti con il prodotto reale |
| L51 | Preparare scheda store e materiali | Titolo concordato, descrizione, immagini e video del gameplay reale, lingue e indicazioni di supporto |
| L52 | Preparare consegna per invio | Pacchetto, esiti dei test applicabili, problemi residui e materiali accessibili per la decisione finale di pubblicazione |

**Uscita di fase:** consegna concreta e verificabile pronta all'invio. L'approvazione riguarda la versione e i materiali effettivi, non una promessa di completarli dopo.

## 16. Fase 11 — Pubblicazione e manutenzione

| ID | Lavoro futuro | Risultato e criterio di completamento |
|---|---|---|
| L53 | Eseguire l'invio autorizzato | Versione e mercati corrispondono alla consegna approvata; esito dello store registrato senza presumere accettazione |
| L54 | Gestire problemi del rilascio | Segnalazioni riproducibili, correzioni prioritarie e aggiornamenti che conservano i salvataggi |
| L55 | Valutare risultati reali | Dati disponibili di utilizzo, problemi, costi e ricavi distinti dalle ipotesi; nessuna raccolta dati aggiuntiva introdotta implicitamente |
| L56 | Pianificare aggiornamenti | Situazioni, contenuti e modifiche motivate; compatibilità dei progressi e carico di manutenzione considerati prima di ampliare la portata |

**Fine del progetto di prima uscita:** versione approvata disponibile, requisiti della consegna soddisfatti e manutenzione organizzata. Le espansioni hanno un nuovo perimetro; non mantengono indefinitamente incompleta la prima uscita.

## 17. Percorsi separati: PC e PvP

| Percorso | Prerequisiti | Lavoro da pianificare dopo la decisione D08 |
|---|---|---|
| PC | Ciclo principale stabile e sostenibilità valutata | Comandi e interfaccia dedicati, compatibilità, export, collaudo, distribuzione e supporto scelti |
| PvP proposto | Design competitivo deciso e risorse per i servizi | Autorità sui risultati, catalogo normalizzato, classifiche, verifica delle prestazioni, versioni compatibili e manutenzione dei servizi |

Questi percorsi non vengono contati come già finanziati o inclusi nella prima uscita Android. Un loro rinvio non autorizza a eliminare contenuti del perimetro principale.

## 18. Calendario, costi e controllo della portata

Il piano fissa l'ordine del lavoro; non fissa settimane o budget privi di dati. L15 produce stime per attività, distinguendo tempo di produzione, verifica e correzione. Il calendario usa disponibilità effettiva, dipendenze e intervalli di stima; viene aggiornato quando il lavoro eseguito fornisce dati migliori.

Le spese si distinguono in una tantum e ricorrenti: asset mancanti, eventuali integrazioni a pagamento, pubblicazione, servizi e manutenzione. Un prezzo sconosciuto rimane da acquisire, non viene sostituito con zero. Nessun acquisto parte dalla sola presenza di una voce nel piano.

| Rischio di lavoro | Attività che lo affronta | Conseguenza da esplicitare |
|---|---|---|
| Specifiche generiche trasferiscono le decisioni al codice | L02–L10 | Completare il dettaglio interessato prima dell'implementazione |
| Tre attività e catalogo troppo impegnativi | L15–L16 | Presentare stima e modifica di portata; nessun taglio silenzioso |
| Integrazioni Android incompatibili | L11, L17, L41 | Rivedere la soluzione tecnica con impatto documentato |
| Attività ripetitive o upgrade poco utili | L26, L38, L44–L45 | Correggere incontri, interazioni o parametri coinvolti |
| Corruzione o duplicazione dei progressi | L19, L21, L43 | Correggere prima di considerare verificata la versione |
| Monetizzazione insufficiente | L10, L15, L55 | Valutare costi e ricavi prima della produzione e aggiornarli con dati reali; nessun passaggio automatico alla vendita di potenza |

### 18.1 Proposta di prima uscita più contenuta

**C01 — raccomandazione da valutare in D02, non modifica già approvata.** Conservare le tre attività, ma ridurre il numero di configurazioni e ambienti prodotti per l'uscita. La profondità deriva da interazioni e incontri; duplicare contenuti prima di verificarne la qualità aumenta il lavoro senza provare il valore commerciale.

| Aspetto | Proposta estesa esistente | Proposta C01 |
|---|---|---|
| Attività principali | Tre | Le stesse tre, complete nelle regole |
| Missioni curate | 72 configurazioni: 18 schemi × 4 | 18 configurazioni: una per ciascuno dei 18 schemi |
| Ambientazioni | Tre modulari | Una modulare con percorsi e disposizioni differenti |
| Personaggi e città | Otto profili e nove tipi acquistabili più Centro | Cataloghi conservati nel confronto; loro costo va comunque stimato, non dichiarato trascurabile |
| Controllo e animazioni | Un attivo, supporti come effetti | Stessa struttura; rig e animazioni riutilizzabili fra i profili dove compatibili |
| Recupero e demolizione | Trasformazione dell'area | Stati e pezzi predefiniti che aprono passaggi; evitare una simulazione generale di terreno e distruzione fisica |
| Operatività | Eventi e rotazioni proposti | Obiettivi sui contenuti esistenti; nessuna promessa di nuovi livelli ogni settimana |

18 configurazioni sono un quarto di 72, ma questo **non significa un quarto del tempo o dei costi**: i sistemi comuni, la città, il roster e i servizi restano da realizzare. Un ambiente solo riduce il lavoro artistico ma anche la varietà visiva. La sufficienza di 18 missioni e la rigiocabilità non sono dimostrate dai numeri; se non bastano, si valuta il carico aggiuntivo invece di chiamare completo un gioco povero di attività.

Per entrambe le portate, la soluzione raccomandata usa gli stessi sistemi di personaggio, danno, raccolta e risultato. Le attività aggiungono regole di obiettivo e disposizione, evitando tre implementazioni indipendenti. Restano esclusi dalla prima uscita raccomandata i servizi già rinviati: PvP, chat, gilde e trading. Non viene aggiunto un server di gioco obbligatorio al PvE locale; pubblicità e acquisti conservano le proprie integrazioni reali.

### 18.2 Verifica commerciale prima della produzione

La proposta commerciale di partenza resta **rewarded facoltative e acquisti estetici diretti**, da decidere in D03. Per contenerne il lavoro, si raccomanda un piccolo catalogo permanente ottenuto dagli asset già prodotti e un pacchetto sostenitore chiaramente descritto. Un catalogo continuo di nuove skin, abbonamenti e pass non viene assunto necessario o finanziato. Non si modifica il gacha né si introduce vendita di potenza con questa revisione.

I cosmetici richiedono domanda e contenuti; non sono ricavo automatico. Gli annunci richiedono persone che giochino e scelgano di vederli. La documentazione AdMob collega i ricavi a modello commerciale, diffusione e coinvolgimento: [fonte ufficiale](https://admob.google.com/home/resources/how-much-revenue-can-you-earn-from-admob/), consultata il 20/10/2026. I suoi casi di successo non vengono usati come previsione per AndroidGAME.

Per la sola pubblicità, con popolazione e tassi medi costanti:

**Ricavo su 30 giorni = 30 × utenti attivi giornalieri medi × impressioni medie per utente attivo al giorno × eCPM / 1.000.**

L'eCPM esprime il ricavo stimato per mille impressioni: [definizione ufficiale AdMob](https://support.google.com/admob/answer/15337570?hl=en). Le impressioni sono quelle effettivamente registrate, non richieste di annunci o pressioni sul pulsante. La media comprende chi non guarda annunci: il massimo proposto di tre non implica una media di tre.

Esempi puramente aritmetici con 1.000 utenti attivi al giorno, non download complessivi. **Tutti i tassi seguenti sono ipotesi illustrative, non valori di mercato, obiettivi approvati o previsioni.**

| Impressioni medie per attivo/giorno | eCPM ipotetico | Ricavo pubblicitario/giorno | Ricavo su 30 giorni |
|---:|---:|---:|---:|
| 0,5 | 3 € | 1,50 € | 45 € |
| 1 | 8 € | 8 € | 240 € |
| 2 | 15 € | 30 € | 900 € |

Sono ricavi pubblicitari stimati, prima dei costi del progetto e della fiscalità, senza acquisti estetici. Nessuno dei tre casi è designato come «realistico». Con zero impressioni il ricavo pubblicitario è zero. Nell'ipotesi intermedia, ottenere 1.000 € al mese dalla sola pubblicità richiederebbe circa **4.167 attivi giornalieri medi**: non è una stima del pubblico ottenibile e 1.000 € non è un obiettivo attribuito all'utente.

Il limite di tre rewarded rimane un parametro proposto da valutare insieme a utilizzo e ricavi; non è un vincolo commerciale approvato. Aumentarlo non garantisce più incassi e non sostituisce qualità delle attività, pubblico e ritorno al gioco.

Per il risultato del progetto si distinguono:

- ricavi pubblicitari e proventi degli acquisti effettivamente riconosciuti, tenendo separati stime e importi definitivi;
- costi di produzione, asset, integrazioni e distribuzione;
- costi ricorrenti e acquisizione di utenti;
- ore di lavoro iniziali e mensili, anche quando non comportano un esborso;
- risultato commerciale prima della fiscalità e compenso desiderato dal titolare, ancora sconosciuto.

Per stimare gli acquisti si usano acquirenti, frequenza e provento unitario coerenti, sottraendo commissioni e rimborsi applicabili senza contarli due volte. Non si moltiplicano tutti i giocatori per un prezzo come se comprassero tutti. Il tempo iniziale viene anche valorizzato separatamente: coprire i soli esborsi non equivale a remunerare il lavoro.

**Condizione di preparazione alla produzione:** L10 e L15 comprendono il confronto fra portate e scenari economici, con assunzioni visibili e sensibilità a pubblico e acquisti bassi o nulli. Il confronto e le stime di impegno sono ora nelle sezioni 18.1 e 21. Non servono ricavi reali prima che esista il prodotto; serve evitare un piano che chiama sostenibile qualunque risultato. Disponibilità di lavoro e risultato economico desiderato restano dati personali non forniti; la verifica commerciale non viene dichiarata conclusa da una tabella ipotetica.

### 18.3 Pubblico, misurazione e lavoro mensile

L10 comprende come raggiungere il pubblico: promessa riconoscibile, video di situazioni reali e scheda store corrispondente. Il piano organico ha un costo in ore; non presume utenti gratuiti o una diffusione spontanea. Contatti con creator e campagne rimangono azioni da autorizzare, non attività già eseguite.

L15 comprende anche manutenzione degli export e delle integrazioni, problemi dei dispositivi, aggiornamenti delle policy, assistenza e produzione di contenuti. Si preferiscono missioni e contratti riutilizzabili rispetto a un calendario che richiede interventi quotidiani. La semplicità viene valutata anche sul lavoro dopo l'uscita.

L55 confronterà utenti che tornano, sessioni, uso delle attività, impressioni, ricavi, acquisti, rimborsi e ore di manutenzione usando i dati realmente disponibili. Play Console offre report di crescita, coinvolgimento e monetizzazione: [fonte ufficiale](https://google.play/business/stats/). La consultazione dei report non implica aggiungere automaticamente nuovi strumenti di tracciamento.

Le campagne a pagamento richiedono un budget e un ritorno per utente compatibile con costo di acquisizione, costi variabili e incertezza. Non si acquistano installazioni sulla base dei soli download o dell'esempio pubblicitario sopra. Il risultato economico necessario dipende da D06; finché manca, non si dichiara raggiunta la sostenibilità.

## 19. Aggiornamento dell'avanzamento

Le tabelle delle fasi contengono il lavoro previsto. Quando inizia una fase, si aggiorna qui la scheda delle sole attività attive, usando gli ID già assegnati; le evidenze restano nei file o nei risultati pertinenti.

| ID o fase | Stato al 20/10/2026 | Evidenza / prossimo risultato |
|---|---|---|
| Fase 0 | Completata | Piano redatto e collegato alle fonti di progetto |
| L01–L10 | Specifiche proposte redatte; revisione di gioco 2.1 | Missioni PROGETTO §§17–20, personaggi §§8–10, economia §13, SPECIFICA-ESECUTIVA e piano §§20–21 |
| L11–L16 | Preparazione documentale redatta; riscontri esterni da eseguire | Ambiente candidato, distinta asset, requisiti e stime; account, telefono e disponibilità restano dati reali |
| L17–L56 | Da fare | Implementazione e attività successive non avviate |
| D01–D08 | Da decidere o acquisire | Preparazione dei materiali e dei dati descritti nella sezione 4 |
| Riesame semplicità e ricavi | Analisi iniziale completata; sostenibilità da dimostrare | Proposta C01 e scenari §18; L10 e L15 comprendono ora la verifica prima della produzione |

**Primo passaggio tecnico previsto: E01.** Le specifiche sono già scritte; la partenza effettiva dello sviluppo rimane un'attività distinta dall'incarico documentale corrente. I dati commerciali mancanti non obbligano a inventare account o fermare le funzioni locali: gli adattatori simulati permettono di svilupparle sul PC.

## 20. Sequenza esecutiva da seguire sul PC

### 20.1 Documenti da aprire e parametri da usare

| Argomento | Fonte operativa esatta |
|---|---|
| Setup, struttura dei file, scene e autoload | SPECIFICA-ESECUTIVA §§2–3 |
| Input, camera, attacco, danni e sei minacce | SPECIFICA-ESECUTIVA §4 |
| Contratti dei dati e validazioni | SPECIFICA-ESECUTIVA §5 |
| Partite, quote di risultato, ripresa e dispositivi | SPECIFICA-ESECUTIVA §§6–7 |
| Persistenza, transazioni, XP, AFK e reclutamento | SPECIFICA-ESECUTIVA §8; BENCHMARK §13 per formule |
| Missioni, coordinate, incontri, eventi e varianti | PROGETTO §§17–18 |
| Otto profili, cinque strumenti e diciassette upgrade urbani | PERSONAGGI-E-SQUADRA §§8–10 |
| Costi, livelli, griglia, ampliamenti e decorazioni | BENCHMARK-PROGRESSIONE-EVENTI §§2–8 e 13 |
| Contratti, maestrie, asset, audio e schermate | SPECIFICA-ESECUTIVA §§9–11 |
| Prestazioni, servizi, errori, test e distribuzione | SPECIFICA-ESECUTIVA §§12–15 |
| Situazioni, interazioni, feedback e osservazione del divertimento | PROGETTO §20; SPECIFICA-ESECUTIVA §§7 e 16–17 |
| Stime e scenari di ricavo | Piano §§18 e 21 |

Il profilo C01 raccomandato carica 18 missioni V0 e un ambiente; ESTESO carica anche V1–V3 e tre temi ambientali. La scelta della quantità non modifica tutte le architetture. Non si programma una schermata «scegli specializzazione», non si aggiungono timer di costruzione e non si inventano requisiti di capitolo.

### 20.2 Consegne in ordine di implementazione

Ogni E produce una parte del prodotto finale, con dati e salvataggi compatibili con le consegne successive. Nessuna E autorizza un prototipo diverso dal progetto. Terminare una consegna significa aver eseguito la verifica indicata e annotato il risultato; la presente redazione non dichiara eseguito nessuno di questi test.

| E / dipendenza | File e sistemi da lavorare | Operazioni già definite | Consegna verificabile |
|---|---|---|---|
| E01 / nessuna | `game/project.godot`, Main, preset e InputMap | Creare il progetto in sottocartella, fissare versione/template, impostare viewport e azioni, collegare menu di avvio e uscita | F5 apre il menu; nessun errore del debugger; modifiche non sovrascrivono i documenti |
| E02 / E01 | Resource dei cataloghi, Catalog, `data/` | Trascrivere le tabelle in dati con ID stabili; validare prezzi, riferimenti, probabilità e recuperi; emettere rapporto degli errori | Catalogo valido e rapporto riproducibile; dato invalido identificato con ID e causa |
| E03 / E02 | ProfileStore, Progression, formato profilo | Implementare transazione atomica, backup, dotazione, acquisto e ripristino; aggiungere saldo insufficiente e fallimento di scrittura | T01–T03 e T07; chiusura e riapertura conservano esattamente il profilo |
| E04 / E01–E03 | Player, camera, HUD provvisorio del prodotto | Movimento e touch a due dita, selezione bersaglio, attacco comune, danno e raccolta; usare valori della specifica §4 | Bersaglio e collisioni coerenti, input PC/touch equivalenti, T16 sui layout disponibili |
| E05 / E04 | Enemy, Interactable, navigazione e dispositivi | Sei comportamenti, griglia A*, raccordi con member_ids, catene finite di barili, macchine e aggiornamento collisioni | Ogni attore ha una risposta leggibile; diverse vie per aprire lo stesso recupero, senza simulazione di edifici |
| E06 / E03–E05 | MissionSession, MissionDirector, risultato | Stati, event_id, run_id, quote, bonus con causa, snapshot di collegamenti e avvisi; nessun premio da moltiplicazione degli eventi | T04–T06 e T21; 20/40/60/100% e nessuna seconda riscossione |
| E07 / E06 | AdvanceRules, RecoveryRules, DefenseRules | Implementare layout A/R/D usando AV01, RE02, DI03; ordine di raccolta sul campo, demolizione alternativa ed emissioni diverse come regole configurabili | Tre missioni complete; osservare differenze fra le scelte secondo la specifica §17 prima di produrre il resto |
| E08 / E03, E07 | City, BuildingDef, editor di piazzamento | Griglia 12×12, ingombri, sei ampliamenti, catalogo, livelli, upgrade, produzione e conversione; preview senza addebito | T02/T03/T08; attività → risorse → upgrade → effetto nella missione successiva |
| E09 / E04–E08 | CharacterDef, ability/support, ToolDef | Otto abilità, sei upgrade per profilo, cinque strumenti, cariche e bonus urbani; fotografia della formazione a partenza | T11/T12; tutte le interazioni essenziali disponibili con ogni profilo |
| E10 / E02–E03, E09 | Recruitment, XP e pannelli roster | Diretto, estrazione, garanzia, duplicati, scelta obiettivo, quota XP e pagamento residuo atomici | T09/T10; simulazione di sequenze limite senza crediti infiniti o acquisti obbligati |
| E11 / E07–E10 | MissionDef e livelli del manifest scelto | Completare le restanti 15 missioni con coordinate, moduli e bonus specifici di PROGETTO §20; se ESTESO, applicare le trasformazioni | T15/T19–T21 su ogni ID pertinente; nessuna configurazione contata solo perché esiste una riga |
| E12 / E04–E11 | Modelli, materiali, animazioni, effetti, audio | Integrare distinta §10, stati urbani, rig comune, segnali oltre al colore e mix con opzioni di riduzione | Nessun elemento temporaneo nella consegna finale; provenienza registrata; non nascondere gli avvisi |
| E13 / E08–E12 | Scene UI, contratti, maestrie, testi | Realizzare tutte le schermate §11, introduzione saltabile, obiettivi §9, italiano/inglese e accessibilità | Nuovo profilo e profilo avanzato percorrono l'intero gioco senza finestre bloccanti; T01/T16 |
| E14 / E03, E06, E13 | PlatformServices, plugin scelti, preset Android | Prima adattatori simulati, poi unità di test e billing di test; prezzi da store, ripristino, pending, doppio callback, preferenze e rete assente | T13/T14 su integrazioni reali oltre alle simulazioni; export sul dispositivo; nessun segreto nel repository |
| E15 / E01–E14 | Versione candidata e verifiche | Eseguire T01–T23, misurare prestazioni, osservare decisioni e ripetizione, tarare dati e ripetere i casi coinvolti | Evidenze per build, dispositivo e situazione; zero difetti bloccanti e nessun divertimento dichiarato senza osservazione |
| E16 / E15 | Release, licenze, scheda store e consegna | Identità definitiva, versione, firma, AAB, test applicabili all'account, privacy e materiali reali; nessuna simulazione commerciale in release | Pacchetto completo pronto all'invio, con materiali e problemi residui leggibili; invio solo autorizzato |

E01/E04 permettono di lavorare sul PC prima del collegamento del telefono. L'export minimo Android si verifica entro E07 e si ripete in E14 dopo i plugin: un problema di piattaforma non viene scoperto soltanto a catalogo finito. Le lavorazioni artistiche possono procedere sugli elementi stabilizzati, senza contare la stessa persona come due risorse simultanee.

### 20.3 Procedura di ogni sessione di lavoro

1. Leggere ultima consegna completata, regole coinvolte e correzioni dell'utente. Aprire soltanto i file dell'E attuale e le dipendenze necessarie.
2. Formulare l'esito osservabile della sessione, per esempio «comprare OFF_U4, ricaricare e partire con tre cariche». Il dato è già nel catalogo, non viene scelto dall'implementazione.
3. Realizzare una parte coerente; verificare prima comportamento locale, poi passaggio completo da UI a salvataggio. Non modificare insieme sistemi estranei per comodità.
4. Annotare file toccati, controllo eseguito, risultato ed eventuale difetto riproducibile. Lasciare nel piano l'ultima E terminata e la successiva; non segnare completata una E sulla sola base dei file creati.
5. Se un'integrazione non funziona, conservare l'adattatore simulato e isolare il problema di versione/API. Rimuovere la simulazione dalla release solo dopo verifica reale; non presentare il servizio come operativo prima di quel punto.

Formato del registro: `E / stato / build o revisione / risultato osservato / verifiche / problema aperto / prossimo passo`. Le evidenze possono stare nei risultati dei test e nei file pertinenti; questo piano rimane lo stato canonico.

### 20.4 Istruzione di ripresa pronta da usare

> Riprendi AndroidGAME dal piano ufficiale, sezione 20. Leggi lo stato dell'ultima consegna e la specifica esecutiva; esegui la prima E non completata nel perimetro autorizzato. Usa i parametri documentati e conserva progressione libera e cumulativa. Non creare regole di prodotto per colmare errori di implementazione. Concludi con risultato osservabile, verifiche eseguite e aggiornamento dello stato; non con una nuova lista di cose da progettare.

Questa istruzione serve per la futura sessione di sviluppo; il suo inserimento nel documento non avvia codice nell'incarico attuale.

## 21. Stima di lavoro, costi e controllo economico

### 21.1 Impegno di pianificazione per C01

**Stime dell'agente, non tempi misurati o preventivi professionali.** Ipotesi: una persona lavora con assistenza AI, usa asset modulari già compatibili quando disponibili, non sviluppa un motore, non include PC commerciale/PvP o un backend di verifica degli acquisti. Le ore sono di lavoro e verifica, non comprendono attese dello store. Apprendimento del motore, incompatibilità e contenuti artistici mancanti possono aumentare l'impegno; la prima differenza fra stima e lavoro reale aggiorna la previsione.

| Consegna | Ore iniziali stimate |
|---|---:|
| E01 | 4–8 |
| E02 | 12–20 |
| E03 | 16–28 |
| E04 | 20–36 |
| E05 | 22–40 |
| E06 | 16–28 |
| E07 | 24–44 |
| E08 | 20–36 |
| E09 | 20–36 |
| E10 | 12–22 |
| E11 | 28–52 |
| E12 | 24–44 |
| E13 | 20–36 |
| E14 | 24–48 |
| E15 | 32–60 |
| E16 | 16–28 |
| Totale | **310–566** |

Una riserva di pianificazione del 30% porta a **403–736 ore**, arrotondando per eccesso. Il 30% è una convenzione prudenziale del piano, non una probabilità statistica. A 10 ore settimanali: circa 41–74 settimane; a 20 ore: 21–37. Sono scenari condizionati, non calendario attribuito all'utente. Se occorre un tempo molto minore, la portata va modificata esplicitamente: questo piano non chiama «semplice» una produzione di pochi giorni.

La revisione 2.1 aggiunge una stima di **8–16 ore** rispetto alla precedente base per moduli ambientali e revisione delle situazioni E05/E11. Feedback, interfaccia e osservazione erano già previsti nelle rispettive consegne; non si aggiungono modalità o cataloghi artistici separati. Le stime restano da confrontare con il lavoro reale.

ESTESO: prevedere separatamente altre **80–160 ore** per configurazioni, temi e relativa verifica, più la stessa riserva; il totale base diverrebbe 390–726 ore. È un ordine di grandezza progettuale da aggiornare, non dimostrazione che 54 configurazioni richiedano sempre quel tempo. Un backend commerciale autorevole ha un preventivo separato, non è incluso negli intervalli.

### 21.2 Spese e manutenzione

| Voce | Soluzione di partenza e criterio economico |
|---|---|
| Motore e strumenti | Godot/GDScript; nessuna royalty del motore, secondo la licenza già ricercata; hardware posseduto non presunto |
| Assistenza AI | Eventuali licenze o consumi del piano effettivamente usato; nessun costo presunto nullo e nessun abbonamento nuovo incluso automaticamente |
| Asset | Prima pacchetti compatibili con licenza, poi produzione degli elementi mancanti; ogni eventuale acquisto ha prezzo effettivo e autorizzazione separata |
| Store e account | Google indica 25 USD una tantum per la registrazione Play Console; verificare importo e condizioni nell'account reale prima di iscrizione/invio; non è una spesa già sostenuta |
| Pubblicità e acquisti | Integrazioni candidate, test e configurazioni inclusi nel lavoro; canoni eventuali da verificare sul servizio effettivo |
| Server | Nessun server di gioco nel PvE locale; protezione autorevole degli acquisti e PvP richiedono servizi e costi distinti |
| Promozione | Ore di produzione di video e scheda store; nessuna spesa pubblicitaria o contatto già autorizzati |
| Manutenzione | Ipotesi iniziale 4–8 ore/mese senza nuovi contenuti; assistenza, regressioni gravi o cambi di SDK possono superarla |
| Nuove missioni | Stima 2–4 ore per configurazione su sistemi stabili, più verifica; non è un impegno a pubblicarne ogni settimana |

Il costo del lavoro può essere valorizzato con una tariffa scelta dal titolare, senza presumere che le ore assistite da AI siano gratuite. Per esempio puramente contabile: 400 ore × 10 €/ora = 4.000 € di lavoro; non è una tariffa dell'utente né una spesa già sostenuta. Ridurre gli esborsi non elimina questo valore.

Fonte della quota: [registrazione Play Console](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en), consultata il 20/10/2026. Le commissioni sui prodotti dipendono dalle condizioni e dai programmi applicabili: [service fees Google Play](https://support.google.com/googleplay/android-developer/answer/112622?hl=en). Nel conto economico si inserisce il provento effettivo del prodotto, senza presumere un'aliquota unica o sommare due volte le trattenute.

### 21.3 Modello di recupero e remunerazione

Per un mese di 30 giorni:

**Margine operativo prima della fiscalità = ricavi pubblicitari riconosciuti + proventi acquisti dopo trattenute e rimborsi − costi operativi − promozione.**

Separare da questo margine sia la quota desiderata di recupero del lavoro/costi iniziali sia la remunerazione del titolare. La sostenibilità non viene dichiarata soltanto perché il margine è positivo di pochi euro.

Per il solo ricavo pubblicitario, usando la media per utente della sezione 18.2:

**Attivi giornalieri necessari = arrotonda per eccesso {1.000 × max[0, costi mensili + recupero mensile + remunerazione desiderata − proventi acquisti] / (30 × impressioni medie giornaliere × eCPM)}.**

Se impressioni o eCPM sono zero, la pubblicità non copre alcun importo positivo e non si divide per zero. Il calcolo usa ricavi e costi nello stesso periodo e valuta. Gli acquisti non si stimano contando ogni attivo quotidiano come una nuova persona che paga ogni giorno.

Esempio esclusivamente aritmetico: 100 € di costi mensili, 100 € di recupero e 500 € di remunerazione desiderata, acquisti zero, media di un'impressione per attivo/giorno ed eCPM ipotetico di 8 € richiedono circa **2.917 attivi giornalieri**. Questi importi non sono budget, obiettivo o rendimenti attribuiti all'utente. Con domanda bassa o nulla il progetto può non recuperare il lavoro: il piano non lo nasconde aumentando automaticamente pubblicità o vendita di potenza.

Prima della produzione si sostituiscono le ipotesi personali disponibili; quelle di mercato rimangono scenari finché non esistono dati. Dopo l'uscita si confrontano quantità reali, ritorno dei giocatori, ricavi e ore necessarie. D06 determina quali risultati economici siano sufficienti, senza impedire la lettura e l'esecuzione tecnica delle specifiche.

### 21.4 Consegna documentale e incognite esterne

Il pacchetto contiene ora percorso esecutivo, parametri, manifest dei contenuti, cataloghi, struttura tecnica, interfacce, errori, prove, stime e procedura di distribuzione. Restano da riscontrare nel mondo reale telefono e account, compatibilità dei plugin installati, disponibilità di lavoro, prezzi dei beni eventualmente acquistati, domanda e risultati del gioco. Queste informazioni hanno punti di ingresso nel piano; non sono sezioni di design lasciate da inventare al PC.

## 22. Criterio di qualità della revisione 2.1

La situazione rappresentativa deve offrire almeno due azioni con conseguenze differenti usando i sistemi esistenti. In Avanzata si confrontano ordini di raccolta e uso della traiettoria; nel Recupero l'accesso sicuro e quello al raccordo; in Difesa l'intervento sul fronte e sulla minaccia prioritaria. Se queste alternative non cambiano l'azione, si corregge la situazione prima di aggiungere configurazioni.

Il risultato deve lasciare al giocatore un prossimo acquisto scelto e un modo rapido di tornare a giocare; non deve richiedere pubblicità, spesa reale o visita obbligatoria della città. Casse, combinazioni e feedback non aggiungono valute o moltiplicatori nascosti. Le verifiche economiche rimangono valide durante le revisioni degli incontri.

Le osservazioni future sono annotate in T19–T23; in questa revisione sono stati controllati dati e coerenza documentale, non eseguite partite. Migliorare il progetto non equivale a dichiarare già dimostrato che il gioco diverte o guadagna.
