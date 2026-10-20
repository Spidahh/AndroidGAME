# Monetizzazione — come guadagna Holdout City

> **⚠ SUPERATO, in revisione (20/10/2026).** L'utente ha chiarito che gli acquisti devono essere pochi, migliorare le funzioni e mai servire a potenziarsi (GDD §0, R14). I pacchetti di risorse, il VIP con le risorse giornaliere e il pass con le risorse descritti qui **non valgono più**. Restano validi le ricerche di mercato, le regole legali e le fonti. La nuova strategia è in attesa di approvazione dell'utente.

Versione 3.0 · 20 ottobre 2026. Documento canonico di ricavi, negozio, pubblicità, prezzi, misure e regole legali.
Le cifre di mercato hanno la fonte e la data in §10. Le stime di ricavo sono **scenari con le ipotesi scritte**, non previsioni.

---

## 1. Strategia in sintesi

**Modello ibrido: pubblicità rewarded per chi non paga, acquisti per chi vuole andare più veloce o distinguersi, abbonamento e pass stagionale come ricavo ricorrente.** Tutto dentro la definizione di "non pay-to-win" di [GDD §0](GDD.md):

| Si vende | Non si vende mai |
|---|---|
| Tempo: risorse, Scorte, avanzamento | Potenza esclusiva: ogni eroe, edificio e upgrade si ottiene anche giocando |
| Comodità: abbonamento VIP, rewarded senza video | Estrazioni casuali (Segnali o Radio), né direttamente né dentro pacchetti |
| Estetica: skin, temi del Rifugio, effetti, emblemi | Vantaggi in classifiche o sfide (dotazioni normalizzate) |
| Pass stagionale (percorso premium) | Energia, tentativi, timer da accelerare |

**Perché questo mix:**
- **Gli acquisti in-app (IAP) portano il grosso dei ricavi nei giochi ibridi.** Nel mobile gaming del 2025 la pubblicità vale circa il 23% dei ricavi netti contro il 77% degli acquisti, e fra i giochi ibridi i più forti basati sugli acquisti incassano circa 4 volte quelli basati sulla pubblicità [S6]. Puntare solo sui rewarded (come nel piano v2) lascia sul tavolo la parte maggiore.
- **I rewarded fanno da porta d'ingresso agli acquisti:** chi guarda almeno un rewarded ha 4,5 volte più probabilità di fare un primo acquisto e una retention molto più alta [S7]. È una correlazione, ma conferma che i due sistemi si rafforzano invece di farsi concorrenza.
- **Abbonamenti e pass** danno ricavo prevedibile. Su Google Play gli abbonamenti hanno la commissione più bassa a qualunque fatturato (10% + 5%) [S12].

---

## 2. Mappa dei punti di ricavo nel gioco

```
Apertura app ─▶ Raccolta AFK ──────────────── [R3 Rifornimento AFK ×]   [VIP: +4 h di accumulo]
     │
     ▼
Preparazione ─▶ [R7 Torretta di rinforzo] (solo Barricata, non in sfide)
     │
     ▼
Missione ─────▶ sconfitta? ─▶ [R2 Seconda possibilità]  (il retry gratuito resta sempre disponibile)
     │
     ▼
Risultato ────▶ [R1 Raddoppia bottino] ─▶ obiettivo d'acquisto ─▶ manca poco? ─▶ Negozio (mai a comparsa)
     │
     ▼
Rifugio ──────▶ [R5 Lancio di rifornimenti ogni 4 h]  ·  Radio [R4 Segnale gratuito]  ·  Contratti [R6 Cambia]
     │
     ▼
Negozio ──────▶ Benvenuto · Pacchetti · VIP · Pass stagionale · Estetica · Sostenitore
```

---

## 3. Pubblicità

### 3.1 Rewarded (facoltativi, sempre con scelta esplicita)

| ID | Posizione | Cosa dà | Limite giornaliero | Note |
|---|---|---|---:|---|
| R1 | **Raddoppia bottino** sul risultato | +100% delle risorse ordinarie della missione (esclusi bonus e contratti) | 4 | Il posizionamento più forte nei casual. Il premio base viene accreditato **prima** dell'annuncio |
| R2 | **Seconda possibilità** alla sconfitta | Rientro con il 50% di integrità, nemici entro 4 m respinti | 1 per missione, 5 al giorno | Il retry gratuito resta visibile accanto; mai nelle sfide e nell'Assedio a classifica |
| R3 | **Rifornimento AFK** | 2 ore di produzione immediata ai tassi correnti | 2 | Utile solo con produttori costruiti; spiegato se non lo sono |
| R4 | **Segnale gratuito** | 1 Segnale (oggetto deterministico) | 1 | Ricompensa fissa, quindi nessun obbligo di dichiarare probabilità AdMob |
| R5 | **Lancio di rifornimenti** nel Rifugio (ogni 4 h) | Si raccoglie gratis 0,15 B, oppure ×3 con video | 3 | Motivo di ritorno durante la giornata |
| R6 | **Cambia contratto** | Sostituisce un contratto giornaliero | 1 | |
| R7 | **Torretta di rinforzo** | +1 torretta gratuita per la Barricata in preparazione | 3 | Esclusa da sfide e classifiche |

**Regole di accredito:**
- **Ordine:** premio base sempre prima; il bonus arriva solo dopo la callback di completamento valida, una sola volta per `operation_id`.
- **Verifica server:** sui premi di valore (R1, R4) la verifica lato server (SSV) passa da un'Edge Function Supabase.
- **Annuncio non disponibile:** il pulsante dice «Annuncio non disponibile» e il gioco continua normalmente.
- **Pubblicità durante l'azione:** mai, in nessun caso.

**Valore per il giocatore:** un giocatore che usa tutti i limiti ottiene circa +5–6 B al giorno, cioè il 40–60% di risorse in più rispetto a 8–10 missioni giornaliere. È una spinta forte e chiara, il che aumenta l'adesione, ma non sostituisce il gioco.

### 3.2 Interstitial — **spenti al lancio, esperimento controllato dopo**
I dati di settore mostrano circa +17% di ricavi a fronte di circa −2,5% di retention D7 [S8]. Google vieta gli interstitial inattesi o all'inizio di un livello [S9], e l'utente ha chiesto pubblicità facoltative.

**Decisione:** al lancio **nessun interstitial**. Dopo almeno 4 settimane di dati, un test A/B gestito dalla configurazione remota (Remote Config).

**Regole del test:**
- solo dopo la schermata risultato;
- solo dal giorno 3 del giocatore;
- mai a chi ha pagato o ha il VIP;
- al massimo uno ogni 3 missioni, almeno 4 minuti fra due, mai subito dopo un rewarded.

**Si adotta solo se** il gruppo di test ha ricavo per utente attivo (ARPDAU) netto almeno +8% e il calo della retention D7 resta sotto 1,5 punti. Altrimenti si spegne.

Se si adottano, compare il prodotto «Rimuovi pubblicità» (§4.7).

### 3.3 Banner — **no**
Rendono pochissimo (eCPM Europa circa 0,20 $ [S5]) e peggiorano la leggibilità dell'HUD.

### 3.4 Mediazione e rete
- **AdMob con bidding** e adapter di mediazione aggiunti nel progetto Android:
  - AppLovin, Unity, Liftoff, Mintegral, Pangle, Meta;
  - si aggiungono con una riga Gradle ciascuno [S13].

  I casi pubblicati riportano dal +7% al +42% di ricavo con il bidding [S14]; stima realistica: +7–30%.
- AppLovin MAX non ha un plugin Capacitor ufficiale, solo Cordova [S15]. Resta un'opzione di riserva se AdMob non rende.
- **Da verificare in T5:** il plugin `@capacitor-community/admob` non documenta la mediazione. Va dimostrata con una build di prova che mostri `networkName` diversi da AdMob.

### 3.5 eCPM di riferimento (rewarded, Android)
USA circa 16,5 $; UK circa 10,7 $; media Europa circa 5,1 $; LATAM circa 1,9 $ [S5]. Italia: nessun dato pubblico per paese; per i calcoli si usa 3–7 $.

---

## 4. Negozio (acquisti in-app)

Gestiti con **RevenueCat** (gratis fino a 2.500 $ di ricavo tracciato al mese, poi 1% [S16]) sopra Google Play Billing.

**Regole di presentazione:**
- prezzi sempre localizzati dallo store;
- contenuto sempre esplicito e deterministico;
- per le risorse, valore in "missioni equivalenti" (es. «≈ 9 missioni di bottino»).

### 4.1 Pacchetto Benvenuto (una volta)
- **Prezzo indicativo:** **1,99 €**.
- **Quando compare:** dopo la prima ora di gioco o la terza missione, visibile nel negozio per 7 giorni, con badge. Nessun popup obbligatorio: un solo invito chiudibile sul risultato.
- **Contenuto:**
  - 5 B in risorse (mix a scelta del giocatore);
  - **Gettone eroe**: recluta subito un eroe a scelta, equivalente a 1.000 Scorte, deterministico;
  - skin esclusiva «Pioniere» per l'eroe iniziale.

  Vale molto più del prezzo: è il miglior convertitore verso il primo acquisto, poi trasformarsi in pagante ricorrente costa poco.

### 4.2 Abbonamento VIP «Tessera del Rifugio»
- **Prezzi:** **4,99 €/mese** o **1,99 €/settimana**.
- **Benefici:**
  - **rewarded senza guardare il video**: tutti i premi R1–R7 entro gli stessi limiti giornalieri, con un tocco;
  - **+0,5 B al giorno** da riscuotere nella cassetta posta (non si accumula oltre 7 giorni);
  - **+4 ore** al limite AFK del Magazzino;
  - nessun interstitial (se mai attivati);
  - cosmetico mensile esclusivo (cornice e colore del nome) e badge VIP.
- **Cosa non dà:** nessun Segnale, nessuna potenza diretta.
- **Prova:** gratuita di 3 giorni al primo abbonamento (configurabile su Play).

### 4.3 Pass stagionale «Pass del Rifugio» (ogni 6 settimane)

| | Gratuito | Premium (**5,99 €**) | Premium+ (**12,99 €**) |
|---|---|---|---|
| Livelli | 30 | 30 | 30 + 10 livelli sbloccati subito |
| Risorse | circa 8 B | circa +35 B | come Premium |
| Segnali | 10 | **nessuno** (regola §1) | nessuno |
| Eroi | — | 1 Gettone eroe (anche per l'eroe nuovo della stagione) | come Premium |
| Estetica | 2 decorazioni, 1 emblema | 2 skin eroe, tema del Rifugio stagionale, 3 decorazioni | + skin animata esclusiva |

- **Avanzamento:** con punti stagione ottenuti dalle missioni (20 a missione + bonus contratti). Un giocatore attivo completa i 30 livelli in circa 4–5 settimane.
- **Acquisto a metà stagione:** assegna tutti i premi premium arretrati.
- **Fine stagione:** i premi riscattabili non riscossi vengono consegnati in automatico.

### 4.4 Pacchetti di risorse (consumabili)
Il giocatore sceglie il mix (Bilanciato, Rottami, Componenti, Scorte), come per la priorità di bottino.

| Pacchetto | Prezzo | Contenuto | Primo acquisto |
|---|---:|---:|---|
| Cassetta | 0,99 € | 1,5 B | ×2 |
| Cassa | 4,99 € | 9 B | ×2 |
| Container | 9,99 € | 20 B | ×2 |
| Convoglio | 19,99 € | 44 B | ×2 |
| Deposito | 49,99 € | 120 B | ×2 |

**Tetto naturale:** il catalogo permanente vale circa 553 B. Si spendono soldi per accorciare un percorso che resta interamente giocabile gratis.

### 4.5 Offerte mirate (Remote Config, A/B)
- **Ultimo pezzo:** il risultato mostra che mancano poche risorse all'obiettivo fissato; il negozio propone il pacchetto più piccolo che lo copre. Solo nel negozio o in un banner sul risultato, mai a comparsa.
- **Eroe di stagione:** Gettone per l'eroe nuovo a 4,99 €, sempre ottenibile anche con 1.000 Scorte o con la Radio.
- **Ritorno:** a chi rientra dopo 7 o più giorni, offerta equivalente al Benvenuto.
- **Limite:** al massimo **una** offerta evidenziata alla volta. Mai timer finti; le scadenze reali (fine stagione) si mostrano con la data.

### 4.6 Estetica diretta
- **Skin eroe:** 1,99–3,99 €; set di 4 a prezzo ridotto.
- **Temi del Rifugio** (lamiere, luci, insegne, piazza): 2,99–4,99 €.
- **Effetti:** scie dei colpi, esplosioni colorate entro la palette di sicurezza (GDD §14), emote di vittoria. 0,99–1,99 €.
- **Accesso gratuito:** ogni categoria ha anche oggetti ottenibili gratis (maestrie, pass gratuito, sfide), così l'estetica è anche uno scopo per chi non paga.

### 4.7 Altri prodotti
- **Pacchetto Sostenitore** (9,99 €, una volta): set estetico «Fondatore», badge, 20 B, nome nei crediti del sito.
- **Rimuovi pubblicità** (3,99 €): esiste solo se si attivano gli interstitial (§3.2).

### 4.8 Prodotti per tipo (su Google Play)
- **Consumabili:** pacchetti risorse, offerte.
- **Non consumabili:** Benvenuto, Sostenitore, estetica, Rimuovi pubblicità.
- **Abbonamenti:** VIP mensile e settimanale.
- **Pass stagionale:** non consumabile con ID per stagione (`pass_s01`, `pass_s01_plus`, …).

---

## 5. Altri canali di ricavo

| Canale | Come guadagna | Quando | Note |
|---|---|---|---|
| **Sito proprio** `holdout.magistaf.com` | AdSense **H5 Games Ads** (rewarded e interstitial fra le missioni, chiamata `adBreak`) | Dopo l'approvazione (si fa domanda; approvazione non garantita [S17]) | Giocabile su PC e telefono senza installare; cloud save condiviso con l'app; invita a scaricare l'app. Acquisti web con RevenueCat Web Billing (Stripe) in un secondo momento |
| **Portali web** | Quota sui ricavi pubblicitari dei portali | Dopo il lancio Android | **Poki** prima (selettivo, esclusiva sul web aperto, ma ammette Google Play e Steam [S18]); se rifiuta, **CrazyGames** + GameDistribution. Serve una build portale leggera (≤20 MB iniziali per la home mobile di CrazyGames [S19]) |
| **Microsoft Store** (PWA) | Commissione 12% sui giochi; registrazione gratuita per i singoli [S20] | Con la versione web stabile | Quasi a costo zero |
| **Steam** | F2P con acquisti Steam, **senza pubblicità** [S21] | Dopo 3 mesi con dati mobili positivi | 100 $ di quota d'ingresso (restituiti oltre 1.000 $ di ricavo); build Electron o Tauri |
| **Google Play Games su PC** | Stesso negozio Play | Da valutare in T7 | Ammette la WebView; requisiti di prestazioni e input da verificare [S22] |
| **Playable ad propri** | Acquisizione utenti più economica | Da T6 | Build HTML5 sotto 5 MB (AppLovin, Unity, Google) [S23] |
| **Hub magistaf.com** | Promozione incrociata gratuita | Dal lancio | Pagina del gioco sull'hub, link agli store |

**Esclusi dopo verifica:**
- **YouTube Playables:** solo partner selezionati [S24].
- **Facebook Web Games:** chiusi il 30/09/2026 [S25].
- **Play Pass:** su invito, richiede di togliere annunci e acquisti; incompatibile con il modello.
- **Programma Level Up (commissioni ridotte):** richiede Vulkan, prestazioni e servizi Play Games difficili da garantire nella WebView. Da rivalutare dopo il lancio.

---

## 6. Ritmo economico e impatto della spesa (obiettivi del test T30)

| Profilo | Comportamento | Ore stimate per completare il catalogo permanente al lancio |
|---|---|---:|
| Gratuito puro | 8–10 missioni al giorno, AFK, nessun video | 45–60 h |
| Gratuito con rewarded | come sopra + 5–8 video al giorno | 30–40 h |
| Pagante leggero | VIP + pass | 25–32 h |
| Pagante medio | VIP + pass + Benvenuto + 20 € di pacchetti | 15–22 h |
| Pagante forte | acquista quasi tutto | qualche ora per risorse; resta il gioco (maestrie, sfide, Assedio, estetica) |

**Regole di controllo:**
- **Gratuito:** se un giocatore gratuito attivo ha bisogno di più di 70 ore, si riducono i costi; non si aggiungono prodotti.
- **Pagante:** se un pagante leggero non sente differenza (meno del 20% di tempo risparmiato), si rivedono i contenuti di VIP e pass.
- **Stagioni:** ogni stagione aggiunge circa 30–40 B di contenuto permanente (eroe nuovo + livelli + missioni), così la progressione non si esaurisce.

---

## 7. Regole legali e di policy (da rispettare nel codice e nello store)

1. **Radio e loot box.**
   - In Belgio sono gioco d'azzardo le loot box pagate con soldi veri o con valuta acquistata; quelle con valuta guadagnata giocando sono escluse [S26].
   - Google chiede le probabilità per oggetti casuali "da un acquisto" [S27].
   - La rete europea di tutela dei consumatori definisce valuta virtuale quella acquistata con denaro [S28].

   **Quindi i Segnali non sono mai acquistabili, nemmeno indirettamente** (pass premium, pacchetti, VIP): il validatore del negozio blocca la build se succede (TECNICA T29). Probabilità e garanzia sono comunque sempre mostrate. *Non è parere legale; per mercati come Belgio e Brasile serve una verifica legale prima del lancio in quei paesi.*
2. **Prezzi trasparenti** (principi CPC UE 2025 [S28]):
   - prezzi in valuta reale;
   - nessuna valuta premium intermedia;
   - contenuto esplicito;
   - nessuna pressione con timer finti;
   - storico acquisti in Impostazioni.

   La rete CPC ha avviato azioni contro 9 aziende di videogiochi a ottobre 2026 [S29], e il Digital Fairness Act è atteso entro fine 2026 [S29]: **il modello senza valuta premium è già allineato** a quanto si prevede.
3. **Pubblico 13+, non rivolto ai bambini:**
   - si evitano le regole Famiglie e i loro limiti sugli SDK [S30];
   - grafica e testi dello store non devono puntare ai bambini;
   - classificazione IARC attesa intorno a PEGI 12.
4. **Consenso SEE e Regno Unito:** UMP di Google (piattaforma di consenso certificata) prima di qualunque annuncio [S31]; Analytics in Consent Mode.
5. **Policy annunci Google Play:** nessun interstitial inatteso o a inizio livello; chiusura entro 15 secondi [S9]; rewarded con scelta esplicita e premio dichiarato [S32].
6. **Rimborsi e abbonamenti:**
   - **rimborso:** RevenueCat notifica i rimborsi e le risorse consumabili rimborsate vengono sottratte solo dal saldo disponibile, senza mandarlo in negativo;
   - **abbonamento scaduto:** chi non lo rinnova conserva tutto ciò che ha già riscosso.

---

## 8. Costi ricorrenti e una tantum

| Voce | Costo | Quando |
|---|---|---|
| Registrazione Google Play Console | 25 $ una tantum | T5 (l'utente crea l'account) |
| Commissioni Google Play (SEE, USA, UK dal 30/06/2026) | **10% di servizio + 5% di fatturazione** sul primo milione annuo; abbonamenti 10% + 5% sempre [S12] | Sui ricavi |
| RevenueCat | 0 fino a 2.500 $ al mese, poi 1% [S16] | Sui ricavi |
| Supabase | Gratis in sviluppo e soft launch; piano Pro (circa 25 $/mese, da ricontrollare) quando l'attività lo richiede | Dal lancio globale |
| Firebase (Analytics, Crashlytics, Remote Config) | 0 (piano gratuito) | — |
| Cloudflare Pages e DNS | 0 (piano gratuito) | — |
| Dominio magistaf.com | già posseduto | — |
| Steam | 100 $ (restituiti oltre 1.000 $) | Opzionale, dopo il lancio |
| Musica, se acquistata | da definire | T4 |
| Acquisizione utenti a pagamento | **0 finché non ci sono dati** (LANCIO §5) | Solo se LTV > CPI |

---

## 9. Modello di ricavo e scenari

### 9.1 Formule
- **Ricavo pubblicitario mensile** = DAU × impression rewarded per DAU × eCPM medio ÷ 1.000 × 30.
- **Ricavo IAP netto mensile** = MAU × % paganti × spesa media per pagante (ARPPU) × (1 − commissione Play − commissione RevenueCat).
- **MAU ≈ DAU ÷ stickiness** (rapporto DAU/MAU; tipico 15–25%).

### 9.2 Scenari illustrativi (non previsioni)
Ipotesi comuni:
- mix di paesi con eCPM rewarded medio di **6 $** (Europa più una parte di USA e UK, meno tier-3);
- stickiness 20%;
- commissioni circa 15% + RevenueCat 0 sotto soglia.

| Scenario | Impression rewarded/DAU | % paganti mensili | ARPPU | ARPDAU risultante |
|---|---:|---:|---:|---:|
| Prudente | 1,5 | 1% | 8 $ | circa 0,02 $ (pubblicità 0,009 + acquisti 0,011) |
| Base | 3 | 2% | 12 $ | circa 0,05 $ (0,018 + 0,034) |
| Buono | 4 | 3% | 18 $ | circa 0,10 $ (0,024 + 0,077) |

Calcolo per lo scenario base: 3 × 6 $ / 1.000 = 0,018 $ al giorno di pubblicità per DAU. Per gli acquisti: MAU = 5 × DAU, quindi i paganti al mese sono 5 × 2% = 0,1 per DAU; × 12 $ × 0,85 = 1,02 $ al mese, cioè 0,034 $ al giorno.

| DAU medi | Prudente / mese | Base / mese | Buono / mese |
|---:|---:|---:|---:|
| 1.000 | circa 0,6 k$ | circa 1,6 k$ | circa 3,0 k$ |
| 5.000 | circa 3,0 k$ | circa 7,8 k$ | circa 15 k$ |
| 20.000 | circa 12 k$ | circa 31 k$ | circa 60 k$ |

**Come si leggono questi numeri:**
- **DAU** sono giocatori attivi ogni giorno, non download.
- **Il collo di bottiglia vero è raggiungere e trattenere i giocatori** (LANCIO §5).
- **I riferimenti di settore** per l'ARPDAU ibrido indicano 0,15–0,50 $, ma senza un dataset primario [S1]: per questo lo scenario base resta sotto.
- **Retention:** nel 2025 il 10% migliore dei giochi aveva D1 31–38%, D7 11–12%, D30 circa 4% [S2]; la mediana è molto più bassa (D1 circa 22%, D7 circa 4%). La qualità delle missioni decide in quale fascia si cade.

### 9.3 Soglie del soft launch (decidono se scalare)

| Metrica | Minimo per procedere al lancio globale | Obiettivo |
|---|---:|---:|
| Retention D1 | 32% | 40% |
| Retention D7 | 10% | 15% |
| Retention D30 | 3% | 6% |
| Minuti di gioco al giorno per DAU | 12 | 20 |
| DAU che guardano almeno un rewarded | 30% | 50% |
| Paganti entro 30 giorni | 1% | 2,5% |
| Crash-free users | 99% | 99,5% |

Sotto il minimo si corregge il gioco (missioni, primo accesso, ritmo) e si ripete il soft launch. Non si compensa spingendo di più la monetizzazione.

---

## 10. Fonti (consultate il 20/10/2026)

- [S1] Playio, benchmark ARPDAU (2026, non primario): https://blog.playio.co/arpdau-benchmarks-mobile-games
- [S2] GameAnalytics, benchmark 2026 su dati 2025: https://gameindustrylibrary.com/documents/gameanalytics-mobile-retention-benchmarks-2026
- [S3] Appodeal, Mobile Casual Benchmarks 2025: https://gameindustrylibrary.com/documents/mobile-casual-benchmarks-report-2025
- [S4] AppAgent, retention dei giochi promossi (2026): https://appagent.com/?p=61637
- [S5] Mistplay/Appodeal, eCPM Q4 2024: https://business.mistplay.com/resources/mobile-ads-ecpm/
- [S6] Deconstructor of Fun su dati Sensor Tower (ago 2026): https://www.deconstructoroffun.com/blog/5-numbers-hiding-in-plain-sight-sensor-towers-ad-monetization-report
- [S7] Unity, impatto dei rewarded su IAP e retention: https://unity.com/blog/understanding-the-impact-of-rewarded-ads-on-iap-retention-and-engagement
- [S8] Unity/ironSource, caso ZiMAD: https://unity.com/en/resources/zimad-dig-out
- [S9] Google Play, policy annunci: https://support.google.com/googleplay/android-developer/answer/9857753
- [S12] Google Play, commissioni 2026: https://support.google.com/googleplay/android-developer/answer/16954621 · https://support.google.com/googleplay/android-developer/answer/112622
- [S13] AdMob, reti di mediazione Android: https://developers.google.com/admob/android/choose-networks
- [S14] AdMob, caso StickyHands (bidding): https://admob.google.de/home/resources/stickyhands-earns-20-percent-more-ad-revenue-with-admob-bidding
- [S15] AppLovin MAX per Cordova: https://support.applovin.com/en/max/cordova/overview/integration
- [S16] RevenueCat, prezzi: https://www.revenuecat.com/pricing
- [S17] H5 Games Ads, iscrizione: https://developers.google.com/ad-placement/docs/signup
- [S18] Poki, lavorare con Poki: https://developers.poki.com/guide/working-with-poki
- [S19] CrazyGames, requisiti tecnici: https://docs.crazygames.com/requirements/technical
- [S20] Microsoft Store per sviluppatori singoli: https://www.neowin.net/news/microsoft-store-now-lets-individual-developers-join-for-free/
- [S21] Steamworks, free-to-play: https://partner.steamgames.com/doc/store/freetoplay
- [S22] Google Play Games su PC: https://developer.android.com/games/playgames/start
- [S23] Specifiche dei playable ad 2026: https://segwise.ai/blog/playable-ad-specs-by-network-2026 · https://docs.unity.com/grow/acquire/creatives/playable/specifications
- [S24] YouTube Playables, monetizzazione: https://developers.google.com/youtube/gaming/playables/reference/monetization
- [S25] Meta, chiusura dei Web Games: https://developers.facebook.com/blog/post/2025/07/31/web-and-instant-games-changes/
- [S26] CMS, loot box in Belgio: https://cms.law/en/bel/publication/loot-boxes-a-treasure-trove-of-gambling-regulatory-issues
- [S27] Google Play, policy pagamenti: https://support.google.com/googleplay/android-developer/answer/9858738
- [S28] Baker McKenzie, principi CPC sulle valute di gioco (2025): https://connectontech.bakermckenzie.com/european-consumer-protection-network-issues-new-key-principles-on-in-game-virtual-currencies-impact-for-gaming-and-gambling-entities-in-belgium-the-eu-and-beyond/
- [S29] Lewis Silkin, azione CPC (ott 2026): https://www.lewissilkin.com/insights/2026/10/15/eu-consumer-protection-network-launches-action-involving-nine-video-games-compani-102o5do
- [S30] Google Play, regole Famiglie: https://support.google.com/googleplay/android-developer/answer/9867159
- [S31] Sourcepoint, piattaforma di consenso certificata obbligatoria (SEE/UK): https://sourcepoint.com/blog/google-to-require-that-publisher-partners-use-google-certified-cmp-for-eea-uk/
- [S32] AdMob, policy rewarded: https://support.google.com/admob/answer/7313578
