# HOLDOUT CITY — REVISIONE SISTEMICA 2.0
20 ottobre 2026 — ANALISI PROGETTUALE; non implica codice già cambiato. Integrativa a [PRODOTTO-UNIFICATO.md](PRODOTTO-UNIFICATO.md) e a [DECISIONI.md](DECISIONI.md). Le richieste esplicite dell'utente prevalgono. I valori qui indicati sono target di test, non misure osservate.

## 0. Idea guida che vincola tutte le decisioni
**Giochi davvero ai minigiochi delle ads, ottieni risorse, costruisci subito un rifugio visibilmente migliore, e le tue scelte di città ed eroi cambiano davvero le partite successive.**
La promessa richiede CONTEMPORANEAMENTE: (A) minigiochi eccellenti e brevi, (B) ricostruzione soddisfacente, (C) scelta fra percorsi, (D) assenza timer edificazione, (E) incentivo a tornare senza obblighi, (F) sostenibilità commerciale da solista.

**Anti-pattern globali:** città come menu per +5% danno; 300 livelli quasi identici; modalità pubblicitarie che non tornano; schermi pieni di valute/claim; ads obbligatorie; produzione passiva più efficace del giocare; inventario di personaggi che costringe a pagarli; risorse rare disponibili in un solo minigioco.

## 1. Una singola unità di piacere: 3 minuti completi
**Loop esperienziale da misurare**, NON tempo di gameplay obbligatorio:
- 0:00–0:10: il giocatore capisce immediatamente ricompensa e obiettivo, accesso alla missione in massimo due tocchi dalla città.
- 0:10–1:25: run M1 di 60–75s con decisioni ogni 8–15s; il tempo di caricamento va minimizzato.
- 1:25–1:40: riepilogo essenziale, oggetti ottenuti e bonus rewarded come singola scelta discreta.
- 1:40–2:20: upgrade immediato di città e trasformazione visibile; una conseguenza giocabile appare in UI.
- 2:20–3:00: preview del nuovo equip/missione, possibilità di entrare direttamente nella run successiva.
Target: a ogni tre cicli comparire **una nuova opzione qualitativa**, non solo numeri più alti. Se gameplay e città non si rinforzano reciprocamente, l'intero progetto fallisce.

## 2. UI / UX disegnata per telefono verticale
### Schermata Città (HUB; 4 zone senza clutter)
- Header piccolo fisso: Materiali, Viveri, pulsante raccolta AFK; pezzi personaggio solo nella scheda eroi. Tocca una risorsa => fonti disponibili e progresso verso prossimo upgrade.
- Centro: **città 3D isometrica interattiva**, edificio selezionato mostra scheda COMPATTA bottom sheet con aspetto prossimo livello, costo chiaro, funzione sbloccata e CTA «Costruisci» attiva se sufficiente. Zoom/pan sicuro; evitare tocchi accidentali in costruzione.
- Bottom nav con **4 voci**: Città, Gioca, Eroi, Incarichi. Store da settings/negozio discreto, NON tab centrale principale.
- Un solo obiettivo contestuale ("Ti mancano 35 Materiali per l'Armeria → recupero M1") con CTA «Gioca», mai 6 pop-up.
- Stato AFK: badge discreto sul Magazzino, bottone «Raccogli». Non mostrare timer di edificazione né decine di claim rosse.

### Schermata Gioca
- 5 card modalità permanenti; quelle non disponibili mostrano **come sbloccarle giocando**, non timer o pagamento.
- Ogni card: tipo action/puzzle, durata stimata, principali ricompense, difficoltà e record personale.
- Filtri «Mi servono materiali», «Voglio giocare action», «Sfida rapida», senza suggerimenti algoritmici invasivi.
- Prima del gioco: scegli eroe/loadout rapidamente; conserva ultima scelta. Mai quattro menu obbligatori.

### HUD M1
- Zona alta: distanza all'estrazione e massimo due indicatori (integrità squadra + abilità); non mostrare valuta città durante lo sparo.
- Centro: minaccia, pickup e traiettoria liberi da overlay. **Niente numeri ×N** su eroe se non corrispondono a effettive unità; non nascondere i modelli dietro un contatore.
- Zona bassa: area di trascinamento; input touch continuo, auto-fire, un'abilità opzionale con tap separato solo se test ergonomico la supporta.
- Icona/colore di arma raccolta e target chiaro per 0,5–1s, senza etichette che oscurano zombie.
- Target: interazioni e scelte leggibili sul S25 e su un dispositivo di fascia inferiore; testare schermi piccoli, accessibilità colore e feedback aptico discreto.

### HUD M2
- Prima ondata: forecast corsie e tipi nemici, 2–3 piazzole evidenti, solo tre difese iniziali; scelta tattica rapida.
- Durante assalto: integrità cancello, rottami disponibili, tre difese, abilità personaggio; pulsante pausa. Cambiare target difese deve essere controllabile senza bloccare lo spostamento dell'eroe.
- Eliminare il miscuglio «tap target + drag hero + rotate build radial» se tester si confondono; testare priorità delle gesture.

### Schermata risultato
Un solo pannello: vittoria/sconfitta, risorse e cosa sblocchi nella città. **Due CTA:** «Torna e costruisci» (primaria) e «Riprova» (secondaria); rewarded opzionale sotto premi, descrizione esatta e possibilità di chiudere immediatamente. Niente carousel offerte automatiche.

### Store
Accesso deliberato; prezzi locali, preview skin completa, ripristino acquisti, niente finti sconti o conti alla rovescia. Pass Comandante solo funzioni convenience che non rovinano il free.

## 3. Regole di design per OGNI modalità
Ogni gioco ha **obiettivo, input, minaccia, scelta, feedback, vittoria, fallimento, ricompensa**. È un prodotto per sé, ma con economia comune. Il contenuto non viene duplicato per raggiungere il numero «80 livelli».
**M1 Corsa:** massimo 90s; 4–6 scelte; inizio senza bonus x3; armi non ordinate per sola potenza; tradeoff sparare a bottino vs salvarti; spawn solo davanti con segnale; 0 sparizioni in viewport; almeno due percorsi sostenibili; prova di divertimento con giocatori veri. La squadra raccolta resta nella stessa corsia.
**M2 Barricata:** ridurre 5–8 ondate e 3–5 minuti come default. Testare una versione da **2–3 attacchi, 90–150s** inclusa preparazione, con una scelta di percorso (barricata) e una di danno (torre/trappola), mentre il player interviene. Vietati tempi di attesa fittizi fra ondate; possibile sfida lunga opzionale solo se giocatori la richiedono.
**M3 Tira il perno:** introdurre meccaniche una alla volta; livello con soluzione verificata e preview interazioni; risorsa tematica recuperata. Se la simulazione acqua/fuoco è instabile sul dispositivo, usare quantità discrete/volumi a griglia invece di fingere fluidi complessi.
**M4 Disegna la difesa:** limitare tratto e garantire collisori ripetibili. Non punire un disegno efficace perché un singolo pixel non collima; snap tollerante. Testare che la sfida sia spaziale non fortuna.
**M5 Via libera:** condizioni basate su mosse e ingombri, non un orologio reale che obbliga a fare tap rapidi mentre ragioni; Undo/Restart veloci. Evitare auto che si muovono oltre lo spazio utile o bloccano senza segnali.
**Coerenza visuale:** minigiochi dovrebbero essere missioni nello stesso quartiere, con gli stessi props/sopravvissuti/zombie; dopo un successo cambia visivamente lo stesso luogo in città.

## 4. Sistema Città: conseguenze reali e libertà
- **Espansione:** 9 quartieri come piano di lungo termine, NON tutti da realizzare subito. Ognuno: un problema visivo, una missione associata, una trasformazione evidente e una nuova opportunità. Liberazione istantanea dopo aver pagato materiali.
- **Edifici:** 12 pianificati, ma raggrupparli in: Produzione (Orto/Sfasciacarrozze/Magazzino); Combat (Armeria/Torre/Infermeria); Personaggi (Addestramento/Radio); Utility (Mercato/Laboratorio/Case/QG).
- **Ogni livello edificio** deve soddisfare almeno 1 di 3 criteri: nuova opzione; miglioramento chiaramente percepibile; modifica estetica visibile. Altrimenti unire due livelli o eliminarne uno.
- **Progressione non lineare ma senza blocchi permanenti:** ordine libero investimenti; specializzazioni configurabili con preset, sbloccabili tutte giocando in tempi lunghi; evitare «scelta finta» di rami che arrivano sempre allo stesso risultato.
- **Città-personaggi-missioni**: un upgrade Armeria amplia dotazioni selezionabili, non forza danno base; la Torre aggiunge una strategia M2; Laboratorio migliora strumenti di ragionamento, senza rendere enigma autoplay.
- **Sopravvissuti:** quelli salvati diventano residenti immediatamente; arrivi AFK sono bonus, non gate per aprire un edificio. Duplicati? convertire a personale/generici, mai bloccare giocatore su alloggi «aspettane uno domani».
- **AFK:** produzione materiale e viveri entro storage; niente progressione passiva che sblocchi l'intero endgame. Se si resta online si raccolgono materiali giocando più rapidamente.

## 5. Economia formalizzabile (prima di inventare prezzi)
Definire per ogni fonte i parametri: **tempo mediano, successo, reward win, reward fail, valore marginale per abilità, costo di ripetizione (zero), reward ads, resource sink**.
Formula payout atteso per minuto: `E = [p_win * win_reward + (1-p_win)*fail_reward] / (durata_min + tempo_menus)`. Per reward in due valute, calcolare VETTORE (Materiali, Viveri), non sommarle arbitrariamente.
**Vincoli di bilanciamento iniziali** (da testare):
- Dopo onboarding, prossimo upgrade raggiungibile con circa **2–4 partite** di una modalità scelta; senza costringere a fare 1 tipo specifico per ogni risorsa.
- Nessuna modalità principale rende sempre >1,5x per minuto rispetto a tutte le altre a pari abilità; se così, i giocatori farmano solo quella più redditizia. La specializzazione può dare vantaggio misurabile senza invalidare le altre.
- Il giocatore che gioca 20 minuti al giorno progredisce sensibilmente più in fretta di chi entra solo a reclamare AFK; simulare almeno profili 5/15/30/60 min al giorno per 30 giorni.
- Costi upgrade di città NON fissati in progressione quadratica cieca: ogni nuovi tier richiede nuova decisione/opportunità e non soltanto più round identiche.
- Pezzi eroe deterministici, obiettivi pubblici e progressi visibili; limite alla crescita per potere non deve rendere M1 troppo facile per i veterani: varianti di difficoltà e reward cosmetiche.
**Problema di incentivo ads:** +100% ricompensa per 5 video al giorno equivale a diversi round gratis e rischia di fare dei video la strategia ottimale; primo esperimento +25–50% su materiali comuni con limiti, NON pezzi eroe competitivi. Testare retention dei non-viewer.

## 6. Eroi: roster diverso senza centinaia di asset
Il tema «8 eroi al lancio» non deve costringere produzione scadente: target contenuti progressivo.
- Ogni abilità modifica un'AZIONE: dash -> attraversamento pericolo; precisione -> bersaglio remoto; esplosivo -> cassa + area; rallentamento -> recupera finestra; scudo -> passaggio rischioso; riparazione -> recupero difesa.
- Tre categorie utili ai test: offensivo, difensivo, utilità. Nessun eroe è il più efficace in tutte le modalità.
- Nessuna livellazione dei singoli eroi così lunga da scoraggiare la sperimentazione: vantaggi importanti condivisi dagli edifici, upgrade individuali orientati a nuove opzioni.
- Ricompense «eroe nuovo» a traguardi visibili; UI mostra origine pezzi e prossima opportunità.

## 7. Calendario live-ops realizzabile da una sola persona
- Sempre aperti: tutte le modalità base; «evento della settimana» è un modificatore, non la sola finestra di accesso.
- Giorno: 3 missioni brevi **ottenute facendo normale gameplay**, senza obbligo di ads o login a ore. Se un task richiede una modalità non ancora sbloccata, sostituirlo.
- Settimana: 1 sfida con 4–5 traguardi, non classifica obbligatoria; reward una decorazione o frammento da attività non monetaria. Compete con se stessi, non con whale.
- Mensile: piccola campagna di ricostruzione basata su 2–3 obiettivi narrativi riusando contenuti e mutatori già disponibili. Produzione nuova massima sostenibile: 1 asset di premio/tema se possibile, non nuovi 50 livelli.
- Calendario generato da file dati, check duplicazioni e date; **i client offline non possono garantire eventi competitivi inviolabili**.

## 8. Monetizzazione, misurazione e rischio reale
Rapporto AppsFlyer 2026 distingue IAA, IAP, hybrid: https://www.appsflyer.com/resources/reports/app-marketing-monetization-report/ . È un trend del settore, NON previsione per Holdout.
- Rewarded volontarie dopo partita e raccolta AFK, bonus piccolo e limitato. Evitare offerte durante morte se fermano flusso; testare revive separatamente.
- Vendere convenienze **senza degradare intenzionalmente UX gratuita**: Pass Comandante solo batch editing e report avanzati, non pulsanti di base che servono a tutti; share clip di base gratuito perché è marketing.
- Ads completed, rewarded accepted, ads shown, IAP conversion e impatto su retention devono essere misurati per coorte e paese. Non attribuire rendimenti ipotetici a un numero di install.
- Rifiutare monetizzazione capace di comprare danno, difese, premi PvP. Se in futuro PvP, separare competitive loadout dalla economia ads.

## 9. Produzione, QA, legalità
**Stack esistente Babylon.js + Capacitor** — niente migrazione Godot; il repo contiene una beta web e script M1. UI e motore restano condivisi Android/web/PC quando appropriato.
- UI responsive con safe areas, font leggibili, controlli grandi (obiettivo 44–48 dp minimo), modalità daltonismo per informazioni essenziali (forma+colore), vibrazione disattivabile, audio/music independent slider.
- Test RAM/termica e fps su S25 + fascia media economica, pacchetto Android API36, offline network failure, save dopo crash, restore acquisti, replay premi non duplicabili.
- Audit asset CC0/CC-BY con attribuzioni dove necessarie; stessi requisiti per musiche/font/plugin. Zero immagini o screenshot pubblicitari che fingono minigiochi assenti.
- Google Android 16 target API36 per nuove app dal 31/08/2026: https://developer.android.com/google/play/requirements/target-sdk
- Privacy policy/Data Safety/consenso advertising EEA e trattamento dei dati necessari a analytics; no configurazione errata di età target.

## 10. Marketing senza capitale: esperimento reale
**Non vendere «solo shooter»:** due promesse insieme: minigiochi delle ads REALI + città che cresce giocando.
- Prima prova in web beta: 3 video 12–20s REALI: (a) M1 scelta arma e quasi morte; (b) missione->upgrade città; (c) differenze fra città di due build.
- Link test pubblico semplice -> conta apertura, run completate, click Play Store / iscrizione alla closed beta. Per traffico organico, un creator piccolo che mostra il vero loop è più coerente di una ad costosa.
- Testare onboarding «ads gameplay» vs «city-building first» come percorsi misurabili ma tenere la promessa store veritiera.
- Solo dopo D1/D7 e LTV reali considerare spendere (ad es. €50–100 per misurare CPI); se retention scarsa, investire nel gioco invece che nella promozione.
- Report settimanale semplice: visitatori, start game, run complete, ritorni, sessione media, rewarded opt-in, ricavo reale, bug; DAU non equivale a install.

## 11. Analisi rischi risolta con gate verificabili
**G0 M1**: 5+ tester non autori, almeno 3 rigiocano spontaneamente, tutti identificano cosa ha causato danni e scelte; 0 spawn/collisioni non spiegabili. Se fallisce correggere prima di aggiungere livelli.
**G1 Core economy**: 5 partite->almeno una scelta cittadina percepibile, tre strategie di upgrade praticabili, niente risorsa unica obbligatoria.
**G2 M2**: due diverse difese valide sullo stesso scenario, una scelta di posizionamento decisiva, gameplay breve. Se sembra autoplay non pubblicarlo.
**G3 Release**: modello economico 30 giorni simula sessioni corte/intense senza esaurire tutto o creare muri; almeno 2 modalità profondamente diverse; no contenuto seriale creato solo per raggiungere numero livelli.
**G4 Play compliance**: build AAB e ogni asset/SKD tracciato, privacy e consensi reali, tutte le funzionalità testate.
**G5 Mercato**: visualizzazioni + click + test + retention + reddito netto; non comprare utenti finché LTV non è plausibile.

## 12. Sequenza prossimi interventi di design
1. Rifinire M1 e M2 con fogli encounter/decisioni e test device, **non nuovi livelli**.
2. UI city/hub con prototipo di flusso utente e tasti contestuali, non menu gratuiti.
3. Simulatore economia per 30 giorni con scenari 5/15/30/60m e rewarded 0/1/3.
4. Design matrice edifici x eroi x modalità (sinergie e alternative): individuare build dominate.
5. Packaging early marketing (solo gameplay reale) e beta web, metriche reali.
6. Qualità giuridica e pubblicazione prima della monetizzazione reale.

## Distinzione tra evidenza e design
Queste sono correzioni ragionate a Holdout City, non risultati di playtest. Fonti principali: AppsFlyer 2026 https://www.appsflyer.com/resources/reports/app-marketing-monetization-report/ ; Adjust 2026 https://www.adjust.com/blog/gaming-app-insights-2026/ ; Google Play https://developer.android.com/google/play/requirements/target-sdk .
