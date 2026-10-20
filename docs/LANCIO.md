# Lancio, crescita e gestione dal vivo

Versione 3.0 · 20 ottobre 2026. Nome, sito, store, aspetti legali, marketing, canali e calendario dopo il lancio.

## 1. Nome e identità pubblica

- **Titolo:** **Holdout City**. Nello store: **«Holdout City: Zombie Rebuild»** (28 caratteri, entro il limite di 30 di Google Play).
- **Perché:**
  - "holdout" è il rifugio di chi resiste, cioè il Rifugio e la Barricata;
  - "City" è la città da ricostruire.

  È chiaro in inglese, il mercato principale, e funziona come marchio corto.
- **Verifica fatta (20/10/2026):** nessun gioco "Holdout City" sul web, su Play o su Steam. Esistono solo omonimi parziali, cioè "Holdout": un gioco da tavolo, una mappa di Halo, un gioco Roblox. Scartati perché già occupati o confondibili: Dead District, Outpost Zero, Reclaimers, Block Zero, Rebuild Z, Last Block, Survivor City.
- **Da fare prima della scheda store (T6):**
  - ricerca del marchio su EUIPO/TMview;
  - ricerca diretta nella Play Console.

  Riserve, nell'ordine: **Ashgrid**, **Rooftop Republic**.
- **Identificativi:**
  - pacchetto Android `com.magistaf.holdout` (definitivo, non si cambia dopo la pubblicazione);
  - sottodominio **`holdout.magistaf.com`**.

## 2. Sito `holdout.magistaf.com`

Pagine:
- **Home:** trailer, «Gioca ora nel browser», badge Google Play.
- **`/play`:** il gioco web completo, con cloud save condiviso con l'app.
- **`/beta`:** build di prova, aggiornata dalla CI.
- **`/privacy`:** informativa privacy, obbligatoria per Play Store, AdMob e Firebase.
- **`/delete-account`:** eliminazione account e dati, obbligatoria per Google Play quando c'è un account.
- **`/support`:** domande frequenti e contatto, da un modulo verso un indirizzo dell'utente da definire.
- **`/press`:** kit stampa (logo, screenshot, video, descrizione).
- **`/credits`:** attribuzioni degli asset e sostenitori.

Collegamento dall'hub **magistaf.com**, che è la vetrina di tutti i progetti, con una scheda del gioco. Ospitato su Cloudflare Pages con il DNS già su Cloudflare. L'URL base è scritto solo in `game/src/config.ts` e nella configurazione del sito.

## 3. Scheda Google Play e materiali

### 3.1 Scheda
- **Descrizione breve (80 caratteri):** «Clear the streets, scavenge the ruins, hold the barricade — rebuild your city.»
- **Descrizione lunga:** promessa (missioni brevi vere, città che cresce), tre attività, eroi, Rifugio, nessuna energia né attesa, progressione completamente libera. Versioni italiana e inglese.
- **Grafica:**
  - icona 512×512;
  - grafica in evidenza 1024×500;
  - **8 screenshot reali**: Sgombero con esplosione a catena, Saccheggio con gru, Barricata con il Colosso, Rifugio prima e dopo, eroi, Radio, pass;
  - video di 30 secondi di gameplay reale.
- **Categoria:** Gioco › Azione (alternativa: Strategia). Tag: zombie, sopravvivenza, costruzione città, offline.

### 3.2 Funzioni Play da usare
- **Pre-registrazione 4–6 settimane prima del lancio globale**, con ricompensa garantita (skin «Prima linea»). Se la ricompensa promessa non viene consegnata si rischia la rimozione [L1].
- **Esperimenti sulla scheda** (A/B su icona, screenshot, descrizione breve) dal soft launch.
- **Schede personalizzate per paese o campagna** (fino a 50) [L2].
- **In-app review:** la richiesta di recensione compare dopo una vittoria con un acquisto appena completato, al massimo una volta ogni 30 giorni.
- **Contenuti promozionali (LiveOps):** per eventi e stagioni, se l'account vi accede [L2].

### 3.3 Creatività pubblicitarie e playable
- **Il gioco è HTML5**, quindi un **playable** (30–60 s) è una build ridotta: una missione AV01 accorciata, CTA verso lo store.
- **Limiti:** 5 MB per AppLovin, Unity, Google e TikTok, 2 MB in HTML singolo per Meta [L3].
- **Build dedicata:** `tools/playable`, con moduli Babylon importati singolarmente, asset in base64 e adattatori CTA per MRAID, ExitApi e window.install.
- **Video:** catturati con la modalità foto. Formati:
  - verticale 9:16 da 7–15 s con aggancio nel primo secondo;
  - orizzontale 16:9 per lo store.
- **Regola:** mai mostrare meccaniche che il gioco non ha. È la promessa del progetto ed evita recensioni negative.

## 4. Aspetti legali e conformità

| Voce | Cosa serve | Chi |
|---|---|---|
| Account Google Play personale | Registrazione (25 $), verifica identità, **closed test con almeno 12 tester per 14 giorni** prima della produzione [L4] | **Utente** (crea l'account e invita i tester); l'agente prepara tutto il resto |
| Account AdMob, Firebase, RevenueCat, Supabase, AdSense | Creazione e collegamento al pagamento | **Utente** (account e dati fiscali); l'agente configura app, unità e chiavi |
| Classificazione contenuti | Questionario IARC: violenza cartoon, nessun sangue realistico, acquisti in-app, annunci | Agente compila, utente invia |
| Pubblico target | **13+, non rivolto ai bambini** [L5] | Dichiarato nella Console |
| Data safety | Dati raccolti: ID dispositivo/annunci (AdMob), analytics (Firebase), crash, ID account (Supabase, Google), acquisti (RevenueCat). Crittografia in transito, eliminazione su richiesta | Agente prepara, utente invia |
| Privacy policy | Su `holdout.magistaf.com/privacy`: titolare, dati, finalità, SDK di terze parti, conservazione, diritti GDPR, contatto | Agente redige; utente fornisce nome del titolare e contatto |
| Consenso SEE/UK | UMP di AdMob configurato nella console AdMob, con "messaggi GDPR" | Agente |
| Eliminazione account | In app + pagina web | Agente |
| Loot box e valute | Regole di MONETIZZAZIONE §7 | Agente (validatore) |
| Fiscalità dei ricavi | Profilo pagamenti Play e AdMob, partita IVA o regime: **decisione e dati dell'utente** | Utente, con il commercialista |

**Regola di sicurezza operativa:** l'agente non crea account, non inserisce dati di pagamento o fiscali e non accetta termini al posto dell'utente. Prepara gli elenchi passo-passo con i valori da inserire (ROADMAP §4).

## 5. Crescita

### 5.1 Fasi

| Fase | Paesi | Obiettivo | Durata |
|---|---|---|---|
| Closed test | Tester invitati (almeno 12, requisito Google) | Stabilità, primo accesso, crash | 14+ giorni |
| **Soft launch** (open testing o produzione limitata) | Paesi con costo d'acquisizione basso e pubblico inglese o simile: Filippine, Malaysia, Polonia, Paesi Bassi | Misurare retention e monetizzazione con le soglie di MONETIZZAZIONE §9.3 | 4–6 settimane |
| **Lancio globale** | Tutti i paesi, con Italia e mercati Tier-1 | Scala | — |

La scelta dei paesi del soft launch è una proposta: si conferma in T6 con i dati della Console. Il Belgio resta incluso, perché il modello è compatibile (MONETIZZAZIONE §7).

### 5.2 Marketing organico (budget zero, ore dell'agente)

1. **Shorts e TikTok** (2–3 a settimana), a partire da T2. La viralità da sola non garantisce download, quindi ogni clip porta al gioco web o allo store [L6]. Formati che si ripetono:
   - «Prima e dopo» del Rifugio;
   - «Catena perfetta» con i barili;
   - «Colosso alla barricata»;
   - sfida settimanale: «riesci a fare meglio di questo punteggio?».
2. **Link al gioco web in un tocco:** dal video si arriva al gioco senza installare. Pochi giochi mobili possono farlo.
3. **Reddit** con clip di gameplay e devlog nei subreddit di nicchia (r/WebGames, r/zombies, r/IndieGaming, r/AndroidGaming, comunità citybuilder) [L7], rispettando le regole di ciascun subreddit.
4. **Creator mobili piccoli:** codice per una skin esclusiva gratuita per la loro community. Ogni contatto lo autorizza l'utente.
5. **Hub magistaf.com** e gli altri progetti dell'utente.

L'agente produce clip, testi e post; **la pubblicazione sugli account social dell'utente avviene solo con il suo ok** per ciascuna campagna.

### 5.3 Acquisizione a pagamento (solo con dati)
- **Si attiva** solo dopo il soft launch e solo se il LTV a 30 giorni stimato supera il costo per installazione (CPI) della campagna.
- **Si parte con budget piccoli**, da decidere con l'utente: Google App Campaigns + playable su AppLovin o Unity.
- **Si misura il ROAS a 7 e 30 giorni;** si scala solo se è positivo.

## 6. Canali aggiuntivi (dopo il lancio Android)

In ordine di convenienza:
1. **Sito proprio** (`/play`) con AdSense H5 Games Ads, previa domanda [L8].
2. **Poki** (candidatura); se rifiutato, **CrazyGames + GameDistribution**. Serve una build portale con il loro SDK di annunci [L9][L10].
3. **Microsoft Store** come PWA: registrazione gratuita, commissione 12% [L11].
4. **Steam** come F2P senza annunci, con acquisti Steam [L12], dopo 3 mesi di dati positivi.
5. **Google Play Games su PC:** verificare requisiti e ammissione in T7 [L13].

## 7. Dopo il lancio: calendario dal vivo

| Cadenza | Contenuto | Lavoro |
|---|---|---|
| Ogni giorno | Contratti, lanci di rifornimenti | Automatico |
| Ogni settimana | Sfida settimanale con modificatore e classifica; progetto settimanale | Automatico, da una tabella di 12 modificatori a rotazione |
| Weekend (2 al mese) | Evento breve con Remote Config | Configurazione |
| Ogni 6 settimane | **Stagione**: tema, 6 missioni (varianti V2/V3), eroe nuovo, pass, estetica | 40–70 ore stimate (ROADMAP §6) |
| Ogni mese | Analisi dei dati e regolazione delle offerte con A/B | 3–5 ore |

### 7.1 Cruscotto
Firebase e Play Console, più un riepilogo settimanale generato dall'agente:
- **utenti:** DAU, MAU, retention D1/D7/D30 per coorte;
- **gioco:** missioni per sessione, attività preferite, cause di sconfitta, abbandoni nel primo accesso;
- **rewarded:** adesione per posizionamento, eCPM per paese;
- **acquisti:** conversione, ARPPU, abbonamenti attivi e cancellazioni, adesione al pass;
- **stabilità:** crash, recensioni.

## 8. Fonti (consultate il 20/10/2026)

- [L1] Google Play, pre-registrazione: https://google.play/business/pre-registration/
- [L2] Google Play, schede personalizzate e Partner Program: https://play.google.com/console/about/customstorelistings/ · https://play.google.com/console/about/partnerprogram
- [L3] Specifiche dei playable 2026: https://segwise.ai/blog/playable-ad-specs-by-network-2026
- [L4] Google Play, requisiti per i nuovi account personali (12 tester per 14 giorni): https://support.google.com/googleplay/android-developer/answer/14151465
- [L5] Google Play, pubblico target e regole Famiglie: https://support.google.com/googleplay/android-developer/answer/9867159
- [L6] GameDiscoverCo, TikTok e scoperta dei giochi: https://newsletter.gamediscover.co/p/tiktok-practical-advice-for-big-discovery
- [L7] Presskit.gg, Reddit per giochi indie: https://presskit.gg/field-guides/reddit-marketing-indie-games
- [L8] AdSense H5 Games Ads: https://adsense.google.com/start/h5-games-ads/
- [L9] Poki per sviluppatori: https://developers.poki.com/guide/working-with-poki
- [L10] CrazyGames, requisiti: https://docs.crazygames.com/requirements/intro/
- [L11] Microsoft Store per singoli (giugno 2025): https://www.neowin.net/news/microsoft-store-now-lets-individual-developers-join-for-free/
- [L12] Steamworks F2P: https://partner.steamgames.com/doc/store/freetoplay
- [L13] Google Play Games su PC: https://developer.android.com/games/playgames/start
