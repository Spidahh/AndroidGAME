# AndroidGAME — Documento di progetto (19 ottobre 2026)

## 1. Visione CONFERMATA dall'utente
Gioco incentrato sulla **crescita di una città**, con costruzione, espansione e miglioramento degli edifici **attraverso risorse guadagnate giocando**, e **senza tempi di attesa artificiali per costruire**. Deve essere divertente, longevo, vendibile, e tecnicamente affrontabile da una sola persona che non programma e non possiede asset, con AI e budget minimo.

**Loop:** scegli attività -> giochi una modalità/minigioco -> ottieni risorse/materiali -> costruisci/espandi/potenzi immediatamente se possiedi i requisiti -> sblocchi attività, strategie e opportunità nuove -> scegli come specializzarti.

## 2. Gameplay CONFERMATO
- La città è il fulcro della progressione, non un menu decorativo.
- Raccolta attiva delle risorse tramite **più modalità** e minigiochi, inclusi gameplay **action simili alle pubblicità mobile** (ma realmente presenti nel gioco).
- Costruzione e upgrade basati su materiali/risorse, **mai su conto alla rovescia**.
- Crescita visibile della città, nuovi edifici e nuove aree.
- Tante opzioni di upgrade che danno **percorsi personalizzati**, non una progressione identica per tutti.
- Specializzazioni e stili di gioco orientati ad esempio a PvE, PvP e gestione/produzione/economia; possibilità di combinare scelte.
- La longevità deve dipendere da scelte, progressione, nuove modalità e combinazioni, non da tempi morti o grinding artificiale.
- Il PvP è desiderato come possibile direzione; implementazione, regole, server e tempi **da definire**, senza promettere multiplayer nella V1.
- Niente minigiochi di sole operazioni matematiche e niente surrogati ingannevoli di ads.

## 3. Monetizzazione CONFERMATA come principio
**Commerciale e free-to-play da valutare come modello principale.** L'utente approva:
- **Pubblicità premiate e completamente opzionali**, con ricompense aggiuntive se il giocatore sceglie di guardarle (risorse, premi extra, eventuale retry/bonus); senza costringerlo.
- Altri acquisti opzionali e forme di ricavo se commercialmente sensati e **senza rendere il gioco eccessivamente pay-to-win**.
- Nessun incentivo a introdurre attese per vendere accelerazioni.
- Se è previsto PvP, proteggere l'equilibrio: evitare vantaggi di combattimento esclusivi a pagamento; limiti e matchmaking da progettare.
- Le ricompense ads devono avere un bilanciamento sostenibile e non sostituire sistematicamente il gameplay: il giocatore gratuito deve progredire bene giocando.

**Ipotesi da testare, non decisioni irrevocabili:** rewarded dopo modalità attive; raddoppio ricompensa limitato; cosmetici della città/edifici; skin/unità; supporter pack; no-ads relativo a eventuali annunci non premiati; acquisti di comodità NON competitivi. Evitare obblighi di visualizzazione, energia, paywall di contenuto essenziale e timer.

## 4. Piattaforme e vincoli
- **Android è piattaforma primaria.**
- **PC è desiderato**, *se* la versione PC è semplice da produrre, mantenere e distribuire; progettare con input astratti touch/mouse/tastiera e risoluzioni adattive sin dall'inizio.
- Offline/local-first per ciò che non richiede online; account/backend solo per funzionalità che ne hanno davvero bisogno. Il PvP online non è gratis né banale.
- Un solo sviluppatore, nessuna competenza programmativa richiesta all'utente, nessun asset iniziale, budget molto ridotto.
- Utilizzare AI per codice, test, integrazioni, contenuti e strumenti; preferire asset gratuiti con licenza commerciale documentata.
- **Motore non deciso**: confrontare Unity (Android/PC/ads/IAP) e Godot (open source/Android/PC; monetizzazione via plugin) in base alla V1 reale.
- Il design deve permettere di aggiungere minigiochi separatamente senza riscrivere la città/economia.

## 5. Vincoli commerciali / obiettivo prioritario
Il gioco serve **per essere pubblicato, acquisire giocatori e produrre ricavi**, non come hobby senza prospettiva.
Prima di realizzare sistemi enormi:
1. Ricerca reale dei concorrenti **city-building + attività attive + minigiochi pubblicitari + progression**; recensioni, ads, monetizzazione e differenze.
2. Progettare una **ragione forte per scegliere il nostro gioco**, non un clone reskinnato.
3. Validare un loop giocabile (città + 1 modalità attiva + una scelta di upgrade) con utenti esterni.
4. Studiare acquisizione utenti sostenibile per una persona senza pubblico e quasi senza budget: Shorts, TikTok, Reels, community pertinenti, store listing e creator piccoli; usare gameplay reale nelle creative.
5. Misurare: conversione store, onboarding, tutorial, ritorno D1/D7, numero di partite, progressione, annunci volontari visti, acquisti, LTV/CPI e recensioni.
6. Fare test marketing a pagamento solo **dopo** prove di retention e un budget limite concordato.
7. Prima del lancio: conformità Play Store, privacy, consenso ads, licenze asset, policy IAP, fiscalità da verificare.

**Nessuna garanzia di download o ricavi.** Distinguere dati verificati, benchmark, ipotesi e decisioni prese.

## 6. Decisioni architetturali PROPOSTE da validare
- Un sistema dati unico per materiali, ricette, costi, upgrade, abilità/specializzazioni, ricompense e sblocchi.
- Una API uniforme: ogni modalità fornisce risultati/risorse all'economia di città.
- Città espandibile a zone, edifici modulari potenziabili e alberi di scelta non identici per tutti.
- Bilanciamento: ogni stile deve avere progresso praticabile; no singolo percorso obbligatorio. Possibile respec/loadout con risorse di gioco.
- Progressione che apra contenuti e possibilità nuove, non solo aumenti percentuali.
- Salvare in modo robusto; online/anticheat in caso di economie condivise o PvP.
- Input UI scalabile per mobile e desktop.
- Non compromettere la portata della V1: multiplayer, PvP e trading online sono milestone future salvo nuova decisione.

## 7. Ambiti NON ancora decisi
- Tema/ambientazione della città (contemporanea, post-apocalittica, fantasy ecc.).
- Vista 2D/isometrica/3D, estetica, nome.
- Minigiochi specifici della V1 e sistema action esatto.
- Gestione produzione/logistica, crafting, risorse e struttura dei costi.
- Ramificazioni precise e quantità di upgrade.
- Tipo di PvP (asincrono/sincrono), eventuali server.
- Prezzi e premi pubblicitari finali.
- PC: build autonoma gratuita o distribuzione su store.
- Calendario di sviluppo, budget effettivo e metriche target.

## 8. Roadmap iniziale
**Fase A — Design e confronto competitivo:** selezionare ambientazione, loop, due modalità candidate, progressione ramificata e una monetizzazione ipotetica. Documentare concorrenti verificati.
**Fase B — Vertical slice:** una mini-città visibile, qualche edificio/upgrade, una modalità attiva che produce 2–3 risorse; upgrade immediati e una scelta di specializzazione. Build Android, eventualmente PC.
**Fase C — Test:** verificare se giocare per costruire risulta soddisfacente, se ci sono colli di bottiglia e se le modalità motivano a tornare.
**Fase D — Produzione graduale:** seconda modalità, ramificazioni più profonde, UI, audio, economia bilanciata.
**Fase E — Monetizzazione e acquisizione:** inserire rewarded opzionali, analytics e IAP non P2W, beta, asset promozionali reali, Play Store, misurazione.
**Fase F — Espansione:** PC se sostenibile, ulteriori modalità, PvP valutato separatamente.

## Regola di lavoro
**Non sostituire questa visione con shooter puro, puzzle generico, boss rush o idee casuali.** Tutte le proposte devono far progredire il modello *città + gameplay attivo + personalizzazione degli upgrade + monetizzazione leale + fattibilità commerciale da solista*.
