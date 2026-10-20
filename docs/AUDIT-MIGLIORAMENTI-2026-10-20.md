# AUDIT E MIGLIORAMENTI PRIORITARI — 20 OTTOBRE 2026

**Ambito:** revisione progettuale del prodotto esistente, non nuovo concept. Fonti aggiornate e problemi documentati, con regole testabili. PREVALE il registro delle decisioni esplicite dell'utente; questo documento è una proposta di miglioramento, non codice implementato.

## 1. Evidenze esterne (verificate)
- Last War Frontline: alcuni giocatori tornano espressamente la domenica per la modalità e chiedono livelli ripetibili e modalità integrata nelle attività normali: https://www.reddit.com/r/LastWarMobileGame/comments/1u6orgs/frontline_breakthrough/ (15/06/2026).
- Segnalazioni di vantaggio PC sul controllo e visibilità rispetto al touch: https://www.reddit.com/r/LastWarMobileGame/comments/1uia6bd/frontline_breakthrough_in_android/ (28/06/2026). **Implicazione:** nessuna classifica cross-platform senza normalizzare input, FOV e framerate.
- Segnalazioni di danno, fuoco e difficoltà incoerenti fra tutorial e partita: https://www.reddit.com/r/LastWarMobileGame/comments/1s68v67/the_secret_of_frontline_breaktrough/ (28/03/2026).
- Adjust, Gaming App Insights 2026: acquisizione più cara, centralità retention: https://www.adjust.com/blog/gaming-app-insights-2026/ .
- AppsFlyer, State of App Monetization 2026: modello ibrido IAA+IAP diffuso ma richiede confronto su dati reali: https://www.appsflyer.com/resources/reports/app-marketing-monetization-report/ .
- Google rewarded SDK: concedere ricompensa solo quando viene emesso l'evento di earned reward; usare test ads: https://developers.google.com/admob/android/rewarded .
- Target Android nuove app ottobre 2026: API36: https://support.google.com/googleplay/android-developer/answer/11926878?hl=it .

## 2. Diagnosi delle incoerenze interne da eliminare
1. **M1 già online non equivale a M1 divertente.** Bot 8/8 e 60 fps verificano tecnica, non game feel. Bloccare l'espansione di 40 livelli prima di test di abilità e divertimento.
2. **M1 v2 parla di una squadra rappresentata da 1 soldato con ×N;** l'utente ha rifiutato partenza arbitraria con ×3 e vuole niente matematica da ad. Nuova proposta: mostrare fisicamente protagonisti/alleati (con limite grafico) e quantità reale soltanto in HUD; partenza con eroe solo.
3. **M1 documenta 90–150 secondi e tappe ripetute;** il target richiesto è un MINIGIOCO, quindi 60–90s complessivi, senza 8 sottolivelli.
4. **Upgrade armi lineare pistol->SMG->AR->heavy** = non scegliere. Pickup mutuamente esclusivi tra profili funzionali.
5. **CITTA.md dichiara 2–3 mesi per maxare tutto** senza simulazione su reward/minuto e AFK: rimuovere l'affermazione come stima validata.
6. **5 minigiochi / 320 livelli subito** è troppo per la qualità e per uno sviluppatore senza asset: lancio progressivo e release gate, senza cancellare backlog.
7. **GUADAGNO.md richiede 2,5 ads per DAU e 3% paying rate come scenari**; vanno etichettati esperimenti, non previsioni. Le ads rewarded migliorano le risorse, dunque sono un vantaggio di progressione (limitato), non zero-vantaggi.
8. **No PvP ora**, poiché backend, bilanciamento anti-cheat e differenza PC/touch renderebbero la produzione e la monetizzazione più delicate.
9. **La scaletta costruzione impone upgrade istantanei**, ma l'arrivo automatico dei sopravvissuti ogni 30 minuti può trasformarsi in tempo bloccante: deve essere un bonus AFK, mai prerequisito per progredire.
10. **Vendere export clip nel Pass ostacola l'acquisizione organica:** condivisione clip di base gratis, editor premium opzionale solo se sostenibile.

## 3. M1: contratto di qualità
- Un round 60–90s con 4–6 incontri; *inizia subito*, niente livelli annidati. Incontro = scelta reale fra bersagli, rischio e ricompensa.
- Spawn e collisioni: nessuna spawn sotto/nel player; ingresso da distanza leggibile; nessun despawn nel viewport; niente corsie impossibili senza anticipo.
- Modalità **arma selezionabile**: nei primi 10s due alternative con utilità diversa; ogni arma ha almeno un match-up positivo e uno negativo.
- Aiutanti fisici raccolti e co-localizzati nella corsia; HUD mostra numero reale; nessun ×3 generato senza pickup. Limite fisico instancing per prestazioni.
- Ogni 10–15s almeno una decisione con tradeoff: se si rimane immobili, si perdono risorse o salute, non solo estetica.
- Nemici: camminatore (pressione), corridore (spostamento), corazzato (concentrazione o aggiramento), tiratore (schivata telegrafata). Incontri progettati e ricombinabili, no moltiplicatori HP come unico challenge.
- Focus primo prototipo: tre segmenti differenti con una cassa rischiosa, una scelta armi e un finale. Misurare frequenza cambio corsia, successi per build, cause morte, retry volontario.
- **Gate reale:** cinque tester che non hanno visto il gioco spiegano chiaramente almeno due decisioni fatte; nessuno lamenta colpi invisibili; replay volontario su più run. Solo dopo fare più contenuti.

## 4. CITTÀ E PROGRESSIONE: cambiamenti verificabili
- Nella città, **prima di fare una missione, il giocatore vede un obiettivo raggiungibile** (es. mancano 40 materiali per l'Armeria); una volta conclusa, un pulsante porta all'upgrade corrispondente in 1 tap.
- Ogni potenziamento non può essere soltanto +5% se non è visibile nella sessione successiva: sblocca nuova scelta attiva, variante arma, fabbricazione o layout.
- Preparazioni e percorsi alternativi sbloccabili con attività, cambiabili gratuitamente o con modesti materiali: differenze senza errori permanenti.
- Per materiali base almeno 2 attività equivalenti; la missione più efficace può cambiare a seconda di eroe/build. Nessun singolo minigioco deve diventare obbligatorio.
- AFK non blocca la progressione: bonus/passivo con magazzino; nessun survivor timer come gate. Controllare progresso attivo vs passivo simulando giocatori da 5, 15, 30 min giornalieri.
- Prima di fissare 9 quartieri/12 edifici livello 10, modellare quante **ore reali** servono con ciascuno stile e quando si sbloccano elementi nuovi.
- Nuovi eroi: differiscono per abilità nelle modalità, non solo durata/cooldown. Primo roster giocabile ridotto per polish, otto come visione finale.

## 5. M2 E TRE PUZZLE: regole di inclusione
- Barricata deve testare pianificazione (preparazione di 10–15s) e risposta attiva (difendere un punto con eroe), non un TD automatico di 3 min.
- Tira perno / disegna difesa / libera strada: ogni puzzle deve avere regola vittoria e sconfitta, soluzione verificata e checkpoint reset immediato. Il pezzo di città ottenuto deve essere motivato dal tema (salvataggio, strada liberata, risorsa recuperata).
- Se un puzzle è più faticoso da mantenere che divertente: rimandarlo e non pubblicare una versione scadente.
- Non aggiungere automaticamente 80 livelli a ogni modalità. Obiettivo 10 livelli memorabili con varianti, replay se davvero utile.

## 6. Eventi e economia
- 3 incarichi giornalieri con scelta multipla fra modalità, non «ripeti 10 volte lo stesso minigioco». 
- Un evento settimanale riusa una modalità con modificatore e sfida, ricompensa solo moderata. Se le persone tornano solo domenica, rendere la modalità giocabile SEMPRE, evento solo bonus.
- Eventi mensili fatti con asset riciclati e cosmetici; evitare calendario che richieda produzione manuale quotidiana.
- Modello economico in foglio/tabella data-driven con: valori base/rerun, costo upgrades, materiali e AFK, rewarded cap, tempo prima scelta, ore per quartiere, costo allineato al premio. Testare tre archetipi: giocatore casual, regolare e intenso.
- Un reward ad non deve dare pezzi eroe unici che creino inequità; eventuale doppia ricompensa solo se simulazione dimostra che non annulla pacing.

## 7. Marketing e guadagni — piano di test senza budget
- Promessa **doppia e veritiera** nelle video ads: corsa realmente giocabile + città che cambia immediatamente dopo.
- A/B concept creativo 1: scelta arma e recupero; 2: crescita città prima/dopo; 3: evento/minigioco puzzle, tutti su vero gameplay.
- Misurare funnel: video view -> link click -> beta web -> completamento run -> ritorno -> eventuale install. Interviste tester su *perché* tornano.
- Eventuale test ads pagato (€50–100 max come prima ipotesi) solo dopo replay e retention di test. Valutare CPI e LTV, non basarsi su view virali.
- Rewarded dopo missione o AFK e pochi IAP UX/cosmetici. In nessun caso vendere «No ads» se non ci sono interstitial; non vendere clip sharing base.
- Ricalcolare revenue con *DAU x rewarded realmente completate x fill x eCPM*, segmentate per geografia. Le precedenti tabelle Reddit/benchmark non sono forecast.

## 8. Lista unica dei rischi in ordine
**P0** M1 poco divertente e ingiusta; **P1** la città non influenza attività; **P2** piano troppo grande; **P3** ads/pacing inflazionano economia; **P4** ottimizzazione Android medio gamma; **P5** conformità Play/privacy/IAP; **P6** pochi giocatori acquisiti senza marketing. Ogni rischio necessita test e criterio stop prima del prossimo investimento.

## 9. Checklist per l'AI che implementa
- Non segnare «funziona» in base a script o bot: test e video su telefono e prova umana.
- Fare audit esistente (Babylon + Capacitor), NON migrare engine.
- Implementare spawn invariants e QA automatici prima di aggiungere contenuto.
- Creare file dati versione, seed ripetibili, log score/reward/damage, test dedup payout.
- Report per feature: cosa è cambiato, come riprodurre, prove build/device, bug rimasti, licenze interessate.
- La prossima milestone è solo una **corsa buona + un upgrade cittadino che la modifica concretamente**.
