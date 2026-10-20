# Roadmap — tappe, consegne, verifiche, stato

Versione 3.0 · 20 ottobre 2026. Documento canonico dell'ordine di lavoro e dello **stato**: ogni sessione AI lo legge per prima cosa e lo aggiorna nello stesso commit del lavoro fatto.

## 1. Principi

1. **Prima giocabile, poi completo.** La prima missione si gioca sul Samsung S25 dell'utente il prima possibile, e ogni tappa successiva aggiunge al gioco vero. Non sono prototipi da buttare: è il prodotto che cresce.
2. **Il divertimento si verifica presto** (T1–T2), prima di moltiplicare contenuti, arte e servizi.
3. **Il rischio tecnico si verifica per primo** (T0): prestazioni del 3D web su telefono e coerenza degli asset.
4. **Ogni tappa termina con una prova sul telefono** tramite link (`holdout.magistaf.com/beta`) e con i test automatici verdi.
5. **Lo sviluppo lo fa l'agente.** L'utente prova, commenta, decide le cose che solo lui può decidere, e crea gli account a suo nome (§4).

## 2. Tappe

| Tappa | Risultato visibile all'utente | Contenuto tecnico | Verifica di uscita | Ore agente stimate |
|---|---|---|---|---:|
| **T0 — Fondamenta** | Un link che apre sul telefono una scena 3D con 40 zombie in movimento e il contatore FPS; foglio di confronto degli asset | Progetto Vite + TS + Babylon; CI GitHub; deploy Cloudflare Pages su `holdout.magistaf.com` con `/beta`; `config.ts` centrale; pipeline asset (download, conversione, ottimizzazione); scena di prova prestazioni; scelta asset (ASSET §5); versioni bloccate | S25 a 60 fps in Alta; profilo medio emulato (CPU ×4) ≥30 fps in Bassa/Media; asset scelti e registrati in ATTRIBUTIONS | 12–20 |
| **T1 — Prima missione** | **AV01 giocabile dall'inizio alla fine** sul telefono: eroe, joystick, zombie Vaganti e Sputatori, barili, tre casse, risultato | Simulazione a passo fisso, collisioni XZ, griglia A*, eroe, attacco automatico, selezione bersaglio, N1/N2, interazioni base, effetti, HUD, quote 20/40, schermata risultato | Partita completa su S25 senza errori; durata 2–4 min; T19 (casse); prima osservazione di gioco dell'utente | 30–50 |
| **T2 — Le tre attività** | RE02 e DI03 giocabili; tutti e sei gli zombie; sospensione e ripresa | Saccheggio (raccordi, catene, macchine), Barricata (piazzole, ondate, rifornimenti, riparazioni), N3–N6, salvataggio della partita, ripresa | T04–T06, T20, T21; **controllo del divertimento**: le alternative di ogni missione cambiano davvero l'azione (GDD §§4–6). Se no, si corregge prima di procedere | 50–80 |
| **T3 — Ciclo completo** | Si gioca, si guadagna, si costruisce il Rifugio, si potenziano eroi e strumenti, si recluta via Radio | Catalogo dati + validatore; ProfileStore atomico; economia; Rifugio (griglia, piazzamento, 10 edifici, livelli, upgrade, decorazioni, ampliamenti); 8 eroi, abilità, supporti, upgrade; 5 strumenti; Radio con garanzia; esperienza; AFK; contratti; progetto settimanale | T01–T03, T07–T12, T22; bot di simulazione economica (T30 preliminare) | 60–100 |
| **T4 — Contenuto e presentazione** | Il gioco completo e bello, in italiano e inglese | 18 missioni V0 + 18 V1 generate e verificate; Assedio infinito; sfida settimanale; maestrie; arte finale (stati del Rifugio, skin, effetti), audio, UI completa, primo accesso, impostazioni, accessibilità, modalità foto, qualità grafica | T11, T15–T18, T23, T31, T32; nessun elemento provvisorio | 90–150 |
| **T5 — App Android e servizi** | **APK installato sul S25** con account, cloud save, negozio di test, rewarded di test | Capacitor 8 (target 36), icone e splash; Supabase (login anonimo + Google, cloud save, classifiche, Edge Function); Firebase (Analytics, Crashlytics, Remote Config); AdMob + UMP + mediazione + SSV; RevenueCat + prodotti; VIP, pass stagione 1, negozio, Benvenuto | T13, T14, T24–T29 con servizi di test; build release firmata senza flag di debug | 50–90 |
| **T6 — Test chiuso e soft launch** | Il gioco è sullo store nei paesi di test | Sito (privacy, eliminazione account, supporto, press); scheda store e materiali; classificazione; Data safety; closed test (12+ tester × 14 giorni); soft launch 4–6 settimane; analisi e correzioni | Soglie di MONETIZZAZIONE §9.3; crash-free ≥99% | 30–50 + correzioni |
| **T7 — Lancio globale** | Il gioco è disponibile ovunque | Pre-registrazione, lancio, sito `/play` con H5 Games Ads (se approvato), candidatura Poki o CrazyGames, Microsoft Store PWA, valutazione Google Play Games su PC | Pubblicazione completata; cruscotto attivo | 20–40 |
| **T8 — Gestione dal vivo** | Una stagione nuova ogni 6 settimane | Stagioni, eventi, sfide, A/B delle offerte, eventuale esperimento interstitial (MONETIZZAZIONE §3.2), Steam dopo 3 mesi di dati positivi | Rapporti mensili | §6 |

**Totale fino al lancio globale (T0–T7): circa 340–580 ore di lavoro dell'agente.** Restano fuori i tempi d'attesa esterni: 14 giorni di closed test, 4–6 settimane di soft launch, revisioni di Google. L'utente non ha fissato scadenze. Le stime si aggiornano a ogni tappa con le ore reali.

**Primo traguardo che conta:** fine di T1, cioè la prima missione giocabile sul telefono. Stima: 40–70 ore di lavoro dall'avvio.

## 3. Dipendenze e parallelismo

```
T0 ──▶ T1 ──▶ T2 ──▶ T3 ──▶ T4 ──▶ T6 ──▶ T7 ──▶ T8
                      │            ▲
                      └──▶ T5 ─────┘   (T5 può iniziare a metà di T3)
```

Lavori indipendenti eseguibili in parallelo da sessioni AI separate, su file diversi:
- pipeline asset ed effetti;
- sito `holdout.magistaf.com`;
- privacy e testi legali;
- clip promozionali;
- trascrizione delle 18 missioni in JSON;
- integrazione dei servizi Android.

## 4. Azioni che solo l'utente può fare

| Quando | Azione | Perché solo l'utente |
|---|---|---|
| Ogni tappa | Aprire il link beta sul S25, giocare, dire cosa piace e cosa no | È il giudizio sul divertimento |
| Prima di T5 | Creare l'**account Google Play Console** (25 $, verifica identità) | Account, pagamento, identità |
| Prima di T5 | Creare o confermare gli account **AdMob**, **Firebase**, **RevenueCat**, **Supabase** e fornire l'accesso | Account e accettazione di termini |
| T5 | Dati fiscali e di pagamento in Play Console e AdMob (eventualmente con il commercialista) | Dati personali e fiscali |
| T6 | **Trovare 12 tester** con account Google per 14 giorni (amici o famiglia) | Requisito Google per account nuovi |
| T6 | Fornire **nome del titolare e contatto** per privacy e store | Dati personali |
| T6 | Approvare l'invio al closed test e al soft launch | Pubblicazione |
| T7 | Approvare il lancio globale ed eventuali campagne o post sui propri social | Pubblicazione e spesa |

Per ciascuna azione l'agente prepara una guida passo-passo con i valori esatti da inserire.

## 5. Rischi principali

| Rischio | Segnale | Risposta pronta |
|---|---|---|
| 3D web troppo lento sui telefoni medi | T0: <30 fps in Bassa con CPU ×4 | Ridurre il budget (zombie, ombre, scala); se insufficiente, valutare la build nativa Godot del piano v2 (archivio) prima di T1 |
| Asset di stili incompatibili | Foglio di confronto T0 | Usare le riserve di ASSET §2 o le varianti dei 4 sopravvissuti |
| Le missioni non divertono | T1–T2: l'utente non vuole rigiocare; scelte senza effetto | Correggere le situazioni prima di T3; meglio meno missioni migliori |
| Mediazione AdMob in Capacitor non funziona | T5 | Solo AdMob con bidding al lancio; AppLovin MAX via plugin Cordova come alternativa |
| Retention sotto soglia nel soft launch | T6 | Iterare su primo accesso, ritmo e premi; nessun lancio globale finché non si supera la soglia |
| Rifiuto o ritardo dello store | T6 | Checklist di conformità (LANCIO §4) completata prima dell'invio |
| Lavoro dal vivo insostenibile | T8 | Stagioni costruite con varianti e modificatori; eroi come varianti di asset esistenti |

## 6. Costo di una stagione (T8)

| Voce | Ore agente |
|---|---:|
| 6 missioni (V2/V3 di uno o due schemi) + test | 12–20 |
| Eroe nuovo (asset variante, abilità, 6 upgrade, bilanciamento) | 10–16 |
| Pass (30 livelli, premi), estetica (2–4 skin, tema del Rifugio) | 10–18 |
| Eventi, sfide, offerte, testi, clip promozionali | 6–12 |
| Analisi dei dati e correzioni | 4–6 |
| **Totale per stagione** | **42–72** |

## 7. Possibili espansioni (solo con dati)

PvP asincrono con dotazioni normalizzate, gilde o cooperativo, nuove attività, nuove città. Ciascuna richiede una proposta separata con costi e ricavi attesi.

## 8. Stato del lavoro

Formato: `data · tappa · stato · cosa è stato fatto · verifiche · prossimo passo`.

| Data | Tappa | Stato | Note |
|---|---|---|---|
| 2026-10-20 | Piano v3.0 | Completato | Ambientazione zombie (Holdout City), stack web (Babylon.js + Capacitor), monetizzazione ibrida, roadmap. Documenti v2 in `archivio/v2` |
| — | T0 | Da fare | Prossimo passo: creare `game/`, CI, deploy beta, scena di prova prestazioni, foglio asset |
