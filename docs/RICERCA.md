# Ricerca — fatti verificati con fonte

Ricerca del 20 ottobre 2026. Qui ci sono solo fatti con la loro fonte.
- Le mie deduzioni hanno il segno **[deduzione]**.
- Le cose che non sono riuscito a verificare hanno il segno **[non verificato]**.

Nessuna di queste informazioni è una decisione sul gioco.

## 1. Mercato e risultati dei giochi mobili

- **Retention 2025** (GameAnalytics, oltre 16.000 giochi):
  - **mediana:** si ritrova circa il 22% dei giocatori dopo 1 giorno, il 4% dopo 7, lo 0,7% dopo 30;
  - **10% migliore:** 31–38% dopo 1 giorno, 11–12% dopo 7, circa 4% dopo 30.

  Fonte: https://gameindustrylibrary.com/documents/gameanalytics-mobile-retention-benchmarks-2026
- **Peso della pubblicità:** vale circa il 23% dei ricavi netti del mobile gaming (2025). Fra i giochi ibridi, i più grandi che vivono di acquisti incassano circa 4 volte quelli che vivono di pubblicità. Fonte: Deconstructor of Fun su dati Sensor Tower, ago 2026: https://www.deconstructoroffun.com/blog/5-numbers-hiding-in-plain-sight-sensor-towers-ad-monetization-report
- **Rewarded e acquisti:** chi guarda almeno una pubblicità facoltativa ha 4,5 volte più probabilità di fare un acquisto (Unity, 2022). È una correlazione, non una causa: https://unity.com/blog/understanding-the-impact-of-rewarded-ads-on-iap-retention-and-engagement
- **[non verificato]** Percentuale di paganti e incasso medio per giocatore: nessun dato pubblico affidabile 2025–2026.

## 2. Pubblicità

- **Guadagno ogni 1.000 video facoltativi su Android** (Appodeal Q4 2024): USA circa 16,5 $, UK circa 10,7 $, media Europa circa 5,1 $, America Latina circa 1,9 $. Fonte: https://business.mistplay.com/resources/mobile-ads-ecpm/
- **[non verificato]** Italia: nessun dato specifico per paese.
- **Annunci a schermo intero:** in un caso documentato +17% di ricavi e −2,5% di giocatori che tornano dopo 7 giorni. Fonte: https://unity.com/en/resources/zimad-dig-out
- **Policy Google Play:** vietati annunci inattesi o all'inizio di un livello; un annuncio deve potersi chiudere entro 15 secondi. Fonte: https://support.google.com/googleplay/android-developer/answer/9857753
- **Policy AdMob sui premi:** il giocatore deve scegliere esplicitamente di guardare e sapere prima cosa ottiene. Fonte: https://support.google.com/admob/answer/7313578
- **Mediazione:** usando più reti pubblicitarie insieme si riportano aumenti dal 7% al 42% (casi pubblicati dai venditori stessi). Fonte: https://developers.google.com/admob/android/choose-networks
- **Unione Europea e Regno Unito:** è obbligatoria una schermata di consenso certificata Google (UMP va bene). Fonte: https://sourcepoint.com/blog/google-to-require-that-publisher-partners-use-google-certified-cmp-for-eea-uk/

## 3. Acquisti e commissioni

- **Commissioni Google Play** in UE, USA e UK dal 30/06/2026:
  - primo milione di dollari all'anno: 10% + 5% di fatturazione;
  - abbonamenti: 10% + 5% a qualunque fatturato.

  Fonte: https://support.google.com/googleplay/android-developer/answer/16954621
- **RevenueCat** (gestione acquisti): gratis fino a 2.500 $ di ricavo al mese, poi 1%. Fonte: https://www.revenuecat.com/pricing

## 4. Regole su estrazioni casuali e valute

- **Belgio:** sono gioco d'azzardo le estrazioni casuali pagate con soldi veri o valuta acquistata, non quelle con valuta guadagnata giocando. Fonte: https://cms.law/en/bel/publication/loot-boxes-a-treasure-trove-of-gambling-regulatory-issues
- **Google Play:** chi vende oggetti casuali deve mostrarne le probabilità prima dell'acquisto. Fonte: https://support.google.com/googleplay/android-developer/answer/9858738
- **Unione Europea:** nel 2025 le autorità dei consumatori hanno fissato principi sulle valute di gioco (prezzi in euro, nessuna pressione). A ottobre 2026 sono partite azioni contro 9 aziende di videogiochi. Il Digital Fairness Act è atteso entro fine 2026. Fonti: https://connectontech.bakermckenzie.com/european-consumer-protection-network-issues-new-key-principles-on-in-game-virtual-currencies-impact-for-gaming-and-gambling-entities-in-belgium-the-eu-and-beyond/ · https://www.lewissilkin.com/insights/2026/10/15/eu-consumer-protection-network-launches-action-involving-nine-video-games-compani-102o5do
- **[deduzione]** Un gioco senza estrazioni casuali e senza valute acquistabili resta fuori da tutte queste regole.

## 5. Pubblicazione su Google Play

- **Account personale nuovo:** obbligatorio un **test chiuso con almeno 12 tester per 14 giorni** prima della pubblicazione. Fonte: https://support.google.com/googleplay/android-developer/answer/14151465
- **Livello minimo:** dal 31/08/2026 app nuove e aggiornamenti devono essere fatti per **Android 16 (API 36)**. Fonte: https://developer.android.com/google/play/requirements/target-sdk
- **Pubblico sotto i 13 anni:** se è incluso valgono le regole "Famiglie", più restrittive su pubblicità e dati. Fonte: https://support.google.com/googleplay/android-developer/answer/9867159
- **Costo dell'account:** registrazione una tantum di 25 $. Fonte: https://support.google.com/googleplay/android-developer/answer/6112435

## 6. Tecnologia (versioni lette il 20/10/2026)

- **Babylon.js 9.31:**
  - nel motore è integrato il trasferimento delle animazioni fra personaggi diversi (dalla versione 9.7);
  - carica modelli compressi (meshopt, texture KTX2).

  Fonti: https://blogs.windows.com/windowsdeveloper/2026/03/26/announcing-babylon-js-9-0 · https://forum.babylonjs.com/t/introducing-animation-retargeting/62547
- **Capacitor 8.5:** produce app per Android 16 (API 36) richiesto da Google; minimo Android 7. La versione 9 non è ancora stabile. Fonte: https://capacitorjs.com/docs/android/setting-target-sdk
- **Plugin disponibili per Capacitor 8:**
  - AdMob: pubblicità facoltative e consenso;
  - RevenueCat: acquisti;
  - Firebase: dati d'uso, crash, configurazione remota.

  Fonti: https://github.com/capacitor-community/admob · https://github.com/RevenueCat/purchases-capacitor
- **Plugin mancanti:** non esiste un plugin mantenuto per i salvataggi di Google Play Games. **[deduzione]** Per il salvataggio online si usa Supabase.
- **Supabase gratuito:** fino a 50.000 utenti attivi al mese e 500 MB di database. Va in pausa dopo una settimana senza attività. Fonte: https://supabase.com/pricing
- **Schermi grandi:** con Android 16 su tablet e schermi grandi l'orientamento non si può bloccare. Il gioco deve funzionare anche in verticale su quei dispositivi. Fonte: https://capacitorjs.com/docs/android/setting-target-sdk
- **[non verificato]** WebGPU nel browser interno di Android: stato incerto. Si usa WebGL2.

## 7. Asset 3D gratuiti (licenza CC0: uso commerciale libero)

| Pacchetto | Contenuto | Fonte |
|---|---|---|
| Quaternius — Zombie Apocalypse Kit | 4 personaggi con 20 animazioni ciascuno, 4 zombie, 2 cani, veicoli e ambiente (60 modelli), gratuito | https://quaternius.com/packs/zombieapocalypsekit.html |
| Quaternius — Downtown City MegaKit | Oltre 300 pezzi di città modulare (60–70% gratuito) | https://quaternius.com/packs/downtowncitymegakit.html |
| Quaternius — Universal Animation Library | Oltre 120 animazioni umanoidi (60–70% gratuito) | https://quaternius.com/packs/universalanimationlibrary.html |
| Quaternius — Toon Shooter Game Kit | 74 modelli: personaggi con 17 animazioni, nemici, armi | https://quaternius.com/packs/toonshootergamekit.html |
| Quaternius — Sci-Fi Essentials, Animated Mech Pack | Armi, torrette, robot, mech | https://quaternius.com/packs/scifiessentialskit.html |
| KayKit — City Builder Bits, Adventurers | Edifici di città, personaggi animati | https://kaylousberg.itch.io/city-builder-bits |
| Kenney — Survival, City, Tower Defense, Particle, UI, Audio | Barricate, strade, torrette, effetti, interfaccia, suoni | https://kenney.nl/assets |

**[non verificato]** Che gli stili dei diversi pacchetti stiano bene insieme: si verifica guardandoli affiancati (fase 2 del piano).

## 8. Canali oltre Google Play

- **Poki:** ammette lo stesso gioco anche su Google Play e Steam, ma chiede l'esclusiva sul web aperto. Fonte: https://developers.poki.com/guide/working-with-poki
- **CrazyGames:** download iniziale massimo 50 MB (20 MB per la home mobile). Fonte: https://docs.crazygames.com/requirements/technical
- **Pubblicità di Google per giochi web sul proprio sito** (AdSense H5): si accede su domanda. Fonte: https://developers.google.com/ad-placement/docs/signup
- **Steam:** 100 $ per gioco; ammette i free-to-play con acquisti Steam. Fonte: https://partner.steamgames.com/doc/store/freetoplay
- **Microsoft Store:** registrazione gratuita per i singoli sviluppatori dal 2025. Fonte: https://www.neowin.net/news/microsoft-store-now-lets-individual-developers-join-for-free/
- **Chiusi o non accessibili:**
  - YouTube Playables: solo partner selezionati. Fonte: https://developers.google.com/youtube/gaming/playables/reference/monetization
  - Facebook Web Games: chiusi il 30/09/2026. Fonte: https://developers.facebook.com/blog/post/2025/07/31/web-and-instant-games-changes/

## 10. Minigiochi delle pubblicità

- **"Tira il perno":** è il minigioco più tipico delle pubblicità ingannevoli (salvare un personaggio togliendo i perni); è nato per la pubblicità, non per un gioco vero. Penn State ha uno studio sulle pubblicità di giochi ingannevoli. Fonti: https://psu.edu/news/research/story/five-ways-fake-mobile-games-fail-meet-advertised-expectations · https://www.blog.udonis.co/mobile-marketing/mobile-games/fake-mobile-game-ads
- **Playrix:** vietate dall'autorità britannica sulla pubblicità (ASA) alcune sue pubblicità, ha dovuto aggiungere quei minigiochi nei giochi. Fonte: https://www.gamerefinery.com/struggling-with-ua-and-player-retention-in-a-post-idfa-world-minigames-are-the-answer
- **X-Hero:** il minigioco delle pubblicità "SaveDoge" (disegnare una protezione) è rimasto come **modalità fissa**, con livelli e premi. Dopo l'uscita (settembre 2022) il gioco è arrivato 1° per download negli USA su iOS e 17° per incassi. Stessa fonte.
- **King of Avalon:** le battaglie di difesa mostrate nelle pubblicità sono diventate una **campagna permanente** che dà premi al gioco principale. Stessa fonte.
- **Royal Match:** i livelli "King's Nightmare" delle pubblicità sono ricorrenti nel gioco. Stessa fonte.
- **Those Games (D3 Publisher, 2023) e Those Games 2:** raccolta dei minigiochi delle pubblicità (Color Lab, Pin Pull, Number Tower, Parking Lot, Cash Run nel primo; altri 4 nel secondo). Venduta a 9,99 $ su Switch e Steam, poi anche su PlayStation. Stile a omini stilizzati, nessuna versione mobile, nessuna città. Fonti: https://en.wikipedia.org/wiki/Those_Games · https://nichegamer.com/those-games-collection-out/
- **Those Games 2:** secondo la recensione di Siliconera, dopo i primi 10 livelli i livelli diventano davvero impegnativi. Fonte: https://siliconera.com/?p=1045165
- **Rapier 2D:** motore fisico 2D (versione 0.21.0 su npm il 20/10/2026). Alternativa: planck.js 1.5.1, pubblicato il 12/10/2026. Fonte: https://registry.npmjs.org/@dimforge/rapier2d-compat

## 9. Nomi controllati (ricerca web, non ricerca di marchi registrati)

- **Già usati o confondibili:** Dead District (Steam), Outpost Zero (Steam), Reclaimers (mobile), Block Zero (gioco zombie web/mobile), Rebuild Z (troppo simile a Rebuild), Last Block, Survivor City.
- **Nessun gioco omonimo trovato:** Holdout City, Ashgrid, Rooftop Republic, Reclaim Ward.
- **Prima di scegliere** serve la ricerca dei marchi registrati su EUIPO/TMview.
