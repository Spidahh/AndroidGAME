# Specifica tecnica

Versione 3.0 · 20 ottobre 2026. Sostituisce SPECIFICA-ESECUTIVA v2 (Godot), di cui conserva le regole di simulazione, salvataggio e test, tradotte nello stack web.
Le versioni dei pacchetti sono quelle lette sul registry npm il 20/10/2026 e vanno **bloccate** (versione esatta in `package.json` + lockfile) alla tappa T0.

## 1. Perché questo stack

| Esigenza | Soluzione |
|---|---|
| Lo sviluppo lo fa l'AI, l'utente non usa editor | Tutto è codice e dati testuali (TypeScript, JSON). Livelli generati dai dati di missione, nessuna scena da comporre a mano |
| Provare spesso sul telefono senza installare | Build web pubblicata sul sottodominio: si apre un link dal Samsung S25 |
| Play Store, pubblicità, acquisti | Capacitor impacchetta la stessa build in un'app Android con plugin nativi (AdMob, RevenueCat, Firebase) |
| PC | La versione web gira già su PC. Google Play Games su PC e Steam sono canali successivi (LANCIO §6) |
| Playable ad e video promozionali | Il gioco è già HTML5: un *playable ad* è una sua build ridotta (LANCIO §3.3) |

Il piano v2 sceglieva Godot. La scelta è stata rivista d'accordo con l'utente il 20/10/2026, per i motivi elencati sopra.

## 2. Componenti e versioni

| Componente | Versione al 20/10/2026 | Ruolo |
|---|---|---|
| TypeScript | 7.0.x (in alternativa 5.9 se le tipizzazioni di Babylon o Vite non sono pronte; si decide in T0) | Linguaggio |
| Vite | 8.3.x | Build e server di sviluppo |
| Babylon.js (`@babylonjs/core`, `loaders`, `gui`, `addons`) | 9.31.x | Motore 3D, caricamento glTF, retargeting animazioni |
| Capacitor | 8.5.x (minSdk 24, **targetSdk 36**, AGP 8.13, Gradle 8.14.3, Node 22+) | App Android |
| `@capacitor-community/admob` | 8.2.x | Rewarded, consenso UMP, verifica lato server dei premi (SSV) |
| `@revenuecat/purchases-capacitor` | 13.7.x | Acquisti in-app e abbonamenti |
| `@capacitor-firebase/analytics`, `crashlytics`, `remote-config` | 8.5.x | Dati d'uso, crash, configurazione remota |
| `@supabase/supabase-js` | 2.118.x | Account, salvataggio cloud, classifiche |
| `@capgo/capacitor-social-login` | ultima stabile in T0 | Login Google nativo, poi passato a Supabase |
| `@capacitor/app`, `preferences`, `haptics`, `screen-orientation`; `@capacitor-community/keep-awake`, `in-app-review` | 8.x | Ciclo di vita, storage chiave/valore, vibrazione, schermo, recensioni |
| `zod` | ultima 3.x/4.x stabile | Validazione dei dati di catalogo e salvataggio |
| `vitest`, `@playwright/test` | ultime stabili | Test unitari e prove automatiche nel browser |
| `@gltf-transform/cli` 4.5.x, `gltfpack`, KTX-Software (`toktx`) | | Ottimizzazione degli asset |
| Blender 4.x (da riga di comando) | | Ritocchi automatici e render delle icone |

**Note importanti dalla ricerca:**
- Capacitor 9 non è ancora stabile (richiederà target 37): si resta su 8 e si aggiorna quando esce stabile, prima della scadenza Google del 2027.
- **Target API 36 sugli schermi grandi** (tablet, Chromebook, larghezza ≥600 dp): l'orientamento non si può bloccare. Il gioco deve quindi rendere bene anche in verticale. Soluzione: la vista orizzontale resta centrata con bande decorative e l'HUD si adatta, nessun blocco di rotazione.
- **WebGPU** nella WebView Android non ha uno stato confermato. Si usa **WebGL2 come motore principale**; WebGPU si attiva solo se `WebGPUEngine.IsSupportedAsync` lo conferma e dopo test sui dispositivi.
- Non esiste un plugin Capacitor mantenuto per Google Play Games Services (salvataggi e classifiche). Si usa **Supabase** per cloud save e classifiche. Un plugin Kotlin per PGS è opzionale, solo se servirà per Google Play Games su PC.

## 3. Struttura del repository

```
/                          documenti (README, CLAUDE.md, docs/, archivio/)
game/
  package.json, vite.config.ts, tsconfig.json, capacitor.config.ts
  index.html
  src/
    config.ts              UNICO punto per URL base, ID app, chiavi pubbliche (da variabili VITE_*)
    main.ts                avvio, rilevamento motore, scelta qualità
    core/                  loop a passo fisso, eventi, RNG con seed, tempo simulato
    sim/                   simulazione pura (senza Babylon): attori, combattimento, collisioni XZ, griglia A*, interazioni
    missions/              MissionDirector, regole Sgombero/Saccheggio/Barricata, varianti, eventi
    render/                scena Babylon, camera, istanze, effetti, materiali, qualità
    city/                  griglia del Rifugio, piazzamento, stati visivi
    ui/                    schermate (Babylon GUI per l'HUD, DOM/CSS per i menu)
    services/              Catalog, ProfileStore, Progression, Recruitment, MissionSession, Contracts, Season, Audio, Analytics
    platform/              PlatformServices: adattatori simulato / android / web per annunci, acquisti, login, cloud
    i18n/                  it.json, en.json
  data/                    JSON con ID stabili: heroes, tools, buildings, upgrades, enemies, missions/, economy, contracts, seasons/, shop
  assets/                  GLB ottimizzati, audio, icone + ATTRIBUTIONS.md
  assets-src/              originali scaricati con le loro licenze (ignorati da Git se troppo pesanti, solo manifest e checksum)
  tools/                   script: pipeline asset, validatore dati, render icone, generatore varianti missione, foglio di confronto asset
  tests/                   unit (vitest), e2e (playwright), simulazioni economiche
  android/                 progetto generato da Capacitor (versionato; segreti esclusi)
supabase/
  migrations/              schema SQL e regole RLS
  functions/               Edge Function (classifiche, verifica rewarded, webhook RevenueCat)
.github/workflows/         CI: lint, test, build, deploy web
```

**Regola d'oro:** la **simulazione (`sim/`, `missions/`) non importa Babylon**. È TypeScript puro, deterministico e testabile in Node. Il livello `render/` legge lo stato e lo disegna. Così:
- si possono simulare automaticamente migliaia di missioni per verificare economia e bilanciamento;
- salvataggio e ripresa sono esatti;
- un domani si può cambiare motore di resa senza riscrivere il gioco.

## 4. Simulazione

- **Passo fisso:** 60 tick/s con accumulatore; la resa interpola fra due tick. Il tempo simulato si ferma in pausa e quando l'app perde il focus.
- **Spazio:** piano XZ, 1 unità = 1 m. Gli attori sono cerchi (eroe 0,35 m; Bruto e Urlatore 0,5 m; Colosso 0,7 m); muri e strutture sono rettangoli.
- **Collisioni:** risolte in 2D con griglia spaziale. **Niente motore fisico** (Havok non serve): è più semplice, più veloce su mobile e deterministico.
- **Proiettili:** test sul segmento fra posizione precedente e successiva, così non attraversano bersagli sottili.
- **Navigazione:** griglia di celle da 1 m con A* (diagonali solo se entrambi i lati sono liberi), ricalcolo locale quando una struttura cambia stato, percorsi condivisi fra zombie dello stesso gruppo. Nessun navmesh.
- **RNG:** con seed per partita (`run_id`); lo stato del generatore va nel salvataggio.
- **Limiti:** al massimo 40 zombie attivi, 80 proiettili e 30 gruppi di oggetti raccoglibili. Oltre il limite, gli spawn restano in coda senza perdere minacce necessarie.
- **Regole di gioco:** quelle di GDD §§3–7. Valori di dettaglio di Barricata (ondate, rifornimenti), raccordi, catene e macchine invariati da [archivio/v2/SPECIFICA-ESECUTIVA §7](../archivio/v2/SPECIFICA-ESECUTIVA.md).

## 5. Dati

- **Formato e validazione:** file JSON validati con schemi zod all'avvio in sviluppo e in CI.
- **Catalogo non valido:**
  - in sviluppo: un **rapporto con ID e causa**, senza correzioni silenziose;
  - in produzione: blocca l'avvio di nuove partite, ma non tocca mai il profilo.
- **Identificativi stabili e mai riusati;** i testi visibili stanno in `i18n/`.

| Definizione | Campi principali |
|---|---|
| HeroDef | id, model, base_hp, base_damage, interval, range, ability_id, support_id, upgrade_ids[6], skins[] |
| UpgradeDef | id, target, cost{r,c,s}, attribute, value, unit |
| BuildingDef | id, footprint, levels[10]{cost, effect}, upgrade_ids, producer?, visual_states[3] |
| ToolDef | id, cost, effect, charges, cooldown, radius, duration |
| EnemyDef | id N1–N6, model, hp, speed, attack, windup, recovery, radius |
| MissionDef | id, mode, scheme, variant, bounds, spawn, obstacles, interactables, events[], milestones[3], final, skill_bonus, chest, theme |
| EventDef | id, trigger, condition, actions[], spawn_positions, actor_ids |
| InteractionGroupDef | id, weakpoint_id?, member_ids, transforms, damage?, area?, warning_s |
| ContractDef / SeasonDef / PassDef | id, condizioni, soglie, premi, finestre temporali |
| ShopDef | product_id, tipo (consumabile, permanente, abbonamento), contenuto deterministico, limiti, gruppo di offerta |
| CosmeticDef | id, slot, visual, fonte (gioco, pass, negozio); nessun campo funzionale ammesso dallo schema |

**Validazioni automatiche:**
- ID unici e riferimenti esistenti;
- quote delle milestone pari a 20+20+20+40;
- costi finiti e non negativi;
- ricariche positive con tutti gli upgrade insieme;
- raggiungibilità di spawn, interazioni e uscita su ogni variante;
- nessun prodotto del negozio contiene Segnali o estrazioni Radio;
- nessun cosmetico ha campi funzionali.

**Varianti V1–V3:** generate da `tools/variants.ts` a partire da V0 e salvate come file risolti. Sono validate e **provate in simulazione automatica** (un bot percorre gli obiettivi) prima di contarle come contenuto.

## 6. Salvataggio, account e cloud

### 6.1 Profilo (schema v1)
Campi:
- `identity`, `wallet` (r, c, s, segnali);
- `city`, `roster`, `loadout`, `recruitment`, `afk`;
- `objectives`, `season`, `active_run`, `results`;
- `commercial`, `settings`, `onboarding`, `revision`.

Struttura invariata dalla v2 §8, più `season` (pass, livello pass, premi riscossi) e `segnali`.

### 6.2 Scrittura locale atomica
- **App Android:** file JSON in `Directory.Data` tramite Filesystem, con scrittura su file temporaneo, verifica, backup del precedente e sostituzione.
- **Web:** IndexedDB con transazione unica e copia di backup.
- **Ogni operazione economica** (acquisto, premio, estrazione) è **una sola transazione** con `operation_id`: un doppio tocco restituisce il primo esito.

### 6.3 Cloud (Supabase)
- **Primo avvio:** `signInAnonymously()` in automatico, senza schermate di login. Il giocatore può collegare Google in un secondo momento (`linkIdentity`) per non perdere i progressi cambiando telefono.
- **Tabella `saves`:** `user_id` (PK, riferimento a auth.users), `data jsonb`, `revision int`, `updated_at`, `device_id`. RLS attiva, policy `auth.uid() = user_id` su select, insert e update; nessun accesso per `anon`.
- **Sincronizzazione:**
  - upload dopo ogni risultato e acquisto, raggruppato al massimo ogni 30 s;
  - download all'avvio;
  - **conflitto** (revisione remota più recente su un altro dispositivo): si mostrano i due profili (data, livello, eroi) e si sceglie. Niente fusioni automatiche che possano duplicare risorse.
- **Senza rete il gioco funziona interamente in locale**; il cloud si allinea al ritorno.
- **Eliminazione account** dalle impostazioni: cancella riga e utente (obbligo Google Play). Pagina web equivalente sul sito (LANCIO §4).
- **Piano Supabase:** il Free basta per sviluppo e soft launch (50.000 MAU, 500 MB). Il Free va in pausa dopo una settimana senza attività: in produzione si passa al piano Pro quando l'attività lo giustifica (costo in MONETIZZAZIONE §8).

### 6.4 Sicurezza ragionevole
- **Economia locale:** è un gioco PvE, quindi si accetta che un utente esperto possa manomettere il proprio salvataggio locale.
- **Ciò che tocca altri giocatori o il denaro è verificato dal server:**
  - **Classifiche:** l'Edge Function accetta solo punteggi plausibili (durata della partita, uccisioni compatibili con le ondate), legati a seed e versione.
  - **Rewarded:** callback SSV di AdMob verso un'Edge Function per i premi di valore (raddoppio, Segnale).
  - **Acquisti:** stato degli abbonamenti e dei pacchetti da RevenueCat (verifica sui server Google) e webhook verso Supabase.

## 7. Pipeline degli asset

1. `tools/fetch-assets`: scarica i pacchetti elencati in ASSET §2, salva licenza e checksum.
2. `tools/convert`: FBX/glTF → GLB e normalizzazione di scala e assi (Blender da riga di comando dove serve).
3. `tools/retarget`: retargeting delle animazioni Universal Animation Library con `AnimatorAvatar.retargetAnimationGroup()` di Babylon (serve la 9.7 o successiva), oppure offline in Blender. Il risultato va in cache come GLB.
4. `tools/optimize`: `gltf-transform` (dedup, prune, weld, resize) + meshopt + texture KTX2 (ETC1S per i colori). Babylon supporta meshopt e KTX2 senza configurazione.
5. `tools/icons`: render 3D automatici dei modelli per icone UI e store.
6. `tools/contact-sheet`: scena di confronto degli asset (ASSET §5).

**Budget per dispositivo medio:**
- fino a circa 120 draw call in missione, grazie a istanze e materiali condivisi;
- texture totali sotto 64 MB in memoria GPU;
- primo download web sotto 25 MB, con il resto in streaming per attività;
- APK/AAB sotto 150 MB.

## 8. Resa grafica, prestazioni, qualità

- **Camera:** ortografica 55°; una luce direzionale con ombre disattivabili; ambiente con luce emisferica; nessuna luce dinamica per proiettile.
- **Istanze:**
  - zombie e oggetti ripetuti come `InstancedMesh`, con animazioni condivise per tipo;
  - decorazioni statiche come thin instance;
  - materiali congelati (`freeze`) e matrici statiche congelate.
- **Qualità** scelta automaticamente al primo avvio con una prova di 3 secondi, sempre modificabile:
  - **Alta:** scala nativa fino a DPR 2, ombre, particelle piene, 60 fps;
  - **Media:** scala 0,75, ombre semplici;
  - **Bassa:** scala 0,6, niente ombre, particelle ridotte, 30 fps.
- **Obiettivi da misurare:**
  - Samsung S25 in Alta a 60 fps stabili;
  - telefono di fascia media emulato e su Firebase Test Lab (quota gratuita da verificare) in Media a 30 fps o più;
  - nessun blocco oltre 0,25 s;
  - missione pronta entro 5 s.
- **Feedback** (GDD §14): impatto con particelle e reazione del modello di 80 ms; distruzione in 180 ms; shake massimo di 0,06 m disattivabile; nessuno hit-stop globale.

## 9. Servizi: dati, configurazione remota, crash

- **Firebase Analytics** (app e web). Un solo modulo `Analytics` con eventi tipizzati.

  | Evento | Parametri principali |
  |---|---|
  | `tutorial_step` | passo |
  | `mission_start`, `mission_end` | mode, id, difficoltà, esito, durata, quota, morte_causa |
  | `purchase_catalog` | id, costo |
  | `recruit` | tipo, risultato |
  | `ad_offer_shown`, `ad_offer_accepted`, `ad_reward_granted` | placement |
  | `shop_view`, `iap_start`, `iap_success` | prodotto, prezzo |
  | `pass_level` | livello |
  | `session_start` | — |
  | `afk_collect` | — |
  | `contract_complete` | — |
  | `weekly_challenge_submit` | — |

- **Firebase Remote Config:** prezzi delle offerte di negozio, limiti dei rewarded, eventi del weekend, flag delle funzioni ed esperimenti A/B. I valori economici del catalogo **non** cambiano da remoto senza una nuova versione dei dati, per non alterare acquisti già fatti.
- **Crashlytics** per i crash nativi. Gli errori JavaScript vanno inviati come eventi non fatali dal gestore globale degli errori.
- **Consenso:** il modulo UMP di AdMob si mostra prima di richiedere annunci nello Spazio Economico Europeo e nel Regno Unito. La raccolta di Analytics rispetta lo stato del consenso (Consent Mode).

## 10. Strumenti di sviluppo interni (esclusi dalla release)

- **Pannello debug** (solo build dev): aggiungi risorse, salta a una missione, rallenta il tempo, mostra collisioni e griglia, FPS e draw call.
- **Modalità foto** per screenshot e video: nasconde l'HUD, camera libera, rallentatore.
- **Bot di simulazione:** gioca le missioni in Node a velocità massima; serve a verificare raggiungibilità ed economia (es. «ore di gioco per completare il catalogo» con diverse strategie di spesa).
- **Controllo alla release:** la build release si rifiuta di partire se trova flag di debug o adattatori simulati attivi.

## 11. Build, distribuzione, ambienti

- **Configurazione centrale:** `game/src/config.ts` legge da variabili `VITE_*`:
  - URL base `https://holdout.magistaf.com`;
  - ID app Android;
  - chiavi pubbliche di Supabase e RevenueCat, ID AdMob.

  **Nessun URL o chiave scritto altrove.** I segreti (keystore, service account, chiavi API private) stanno fuori dal repository, nella configurazione locale o nei segreti di GitHub e Cloudflare.
- **Web** su Cloudflare Pages:
  - produzione su `holdout.magistaf.com`;
  - build di prova su `holdout.magistaf.com/beta/`, aggiornata dalla CI a ogni push su `main`: è il link da aprire sul telefono.
- **Android:** `npx cap sync android` e Gradle per APK debug (sideload sul S25) o AAB release firmato. Play App Signing di Google; chiave di upload conservata con backup fuori dal repository.
- **CI (GitHub Actions):** lint, typecheck, vitest, validatore dati, simulazioni economiche, build web, prove Playwright su Chromium in viewport mobile, deploy della beta. La build Android si fa in locale finché non serve automatizzarla.
- **Versioni:** `versionName` SemVer, `versionCode` crescente; schema del salvataggio con migrazioni testate.

## 12. Test (da v2 T01–T23 + nuovi)

I casi T01–T23 della v2 ([archivio/v2/SPECIFICA-ESECUTIVA §14](../archivio/v2/SPECIFICA-ESECUTIVA.md)) restano tutti validi. Si aggiungono:

| ID | Caso | Esito atteso |
|---|---|---|
| T24 | Raddoppio rewarded: annullato, completato, callback doppia, riavvio a metà | Premio base sempre conservato; raddoppio al massimo una volta; limiti giornalieri rispettati |
| T25 | Acquisto pacchetto: pending, annullato, completato, rimborso, ripristino su un altro dispositivo | Nessuna risorsa in pending; consegna una sola volta; i permanenti si ripristinano |
| T26 | Abbonamento VIP: attivazione, rinnovo, scadenza, periodo di grazia | Benefici attivi solo con diritto valido; scadenza senza perdita di ciò che è già posseduto |
| T27 | Pass stagionale: avanzamento, premium acquistato a metà stagione, fine stagione | Premi premium arretrati assegnati; nessun premio perso o duplicato |
| T28 | Cloud: due dispositivi, conflitto, nessuna rete, collegamento Google dopo partite anonime | Nessuna perdita; nessuna duplicazione; profilo anonimo conservato dopo il collegamento |
| T29 | Validatore del negozio | Nessun prodotto contiene Segnali o estrazioni; build bloccata se succede |
| T30 | Simulazione economica: giocatore gratuito, con rewarded, pagante leggero | Ore per completare il catalogo dentro gli obiettivi di MONETIZZAZIONE §6 |
| T31 | Schermi: 16:9, 20:9, tablet verticale e orizzontale, finestra PC 1280×720 e 1920×1080 | HUD raggiungibile, nessun taglio, nessun blocco di rotazione su schermi grandi |
| T32 | Prestazioni: S25 Alta, profilo medio, 30 minuti continui | Obiettivi §8; nessuna crescita incontrollata della memoria |
