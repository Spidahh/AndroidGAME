# Ricerca tecnica, asset e pubblicazione — 19/10/2026

## Decisione raccomandata (non ancora implementata)
**Godot 4.x + Kenney Starter Kit City Builder** come prototipo di partenza. Godot è MIT, permette build Android e PC senza abbonamenti; verificare nella pratica export Android API 36, plugin ads, performance. Vantaggio principale: template Kenney già con piazzamento/rimozione edifici, camera, salvataggio e risorse edificio. I controlli attuali PC andranno rifatti per touch. NON presumere che il template includa economia, progressione, minigiochi o PvP.

Fonte: https://github.com/KenneyNL/Starter-Kit-City-Builder
Licenze template: codice MIT (preservare LICENSE e copyright nelle distribuzioni), asset inclusi CC0; verificare ogni dipendenza e font/suono aggiuntivo.

## Risorse esterne verificate
| Risorsa | URL | Cosa offre | Uso/licenza | Nota |
|---|---|---|---|---|
| Kenney Starter Kit City Builder | https://github.com/KenneyNL/Starter-Kit-City-Builder | City builder Godot 3D, piazzamento, camera, save/load | MIT codice + CC0 asset | Candidato n.1 per base |
| Unity City Builder | https://github.com/josipglavas/City-Builder | Semplice esempio Unity | MIT | Alternativa; va verificata qualità/compatibilità |
| KayKit City Builder Bits | https://github.com/KayKit-Game-Assets/KayKit-City-Builder-Bits-1.0 | 32+ edifici/props low poly con FBX/OBJ/GLTF | CC0, uso commerciale | Ideale prototipo città |
| KayKit Prototype Bits | https://github.com/KayKit-Game-Assets/KayKit-Prototype-Bits-1.0 | 64+ elementi 3D modulari | CC0 | Minigiochi |
| Kenney assets | https://kenney.nl/support | Asset e UI | CC0 sulle pagine ufficiali di asset | Verificare licenza inclusa a ogni download |
| Quaternius | https://quaternius.com/ | Personaggi, props, ambienti | Verificare licenza SPECIFICA, versione e data di download | Alcuni pack storici CC0; policy/licenza del sito potrebbe differire nel 2026, non assumere CC0 universale |
| Godot | https://godotengine.org/license/ | Motore free per Android e PC | MIT | Includere avviso di licenza |
| Poing Studios AdMob plugin Godot | https://store.godotengine.org/asset/poingstudios/admob/ | Rewarded ads + consenso GDPR/UMP | Plugin MIT, integrazione da testare | Non considerare pronta per release senza test Android API36/Google Ads SDK |

**Scartare per riuso diretto senza ulteriore esame legale:** DagobertDev/CityBuilder GPL-3.0; jmkekala/metrum_rise GPL-2.0 (e Rust/Linux, bug segnalati). La GPL non vieta vendere ma può imporre copyleft e sorgenti per una distribuzione derivata.

## Architettura minima per ridurre lavoro AI
- **City Core:** griglia, edifici, piazzamento, salvataggio (partire da Kenney).
- **GameData:** costi, risorse, upgrade e rami in dati JSON/Resources, no valori hardcoded in molti script.
- **Wallet & Crafting:** risorse finite, transazioni atomiche, nessun timer di edificazione.
- **Upgrade Graph:** rami opzionali PvE/PvP/industria, scelte reversibili tramite gioco secondo bilanciamento.
- **Minigame Interface:** ogni attività riceve configurazione e restituisce reward verificata all'economia; minigame separati dalla scena città.
- **Monetization Adapter:** reward normale sempre, reward pubblicitario opzionale extra e limitato; vietati bonus esclusivi PvP pay-to-win; confermare visualizzazione completata prima di concedere bonus.
- **Cross Platform UI:** touch/mobile prima, mouse/keyboard PC; save local-first, nessun multiplayer per V1.
- **Legal Ledger:** ogni asset/codice di terzi = autore, URL, download date, versione/commit, licenza, obblighi, prova licenza salvata, usi nel gioco.

## Primo verticale di gioco (proposta di implementazione)
1. Fork/copia controllata del template Kenney con LICENSE.
2. Tocco su terreno per piazzare un edificio; gesture drag/zoom per città.
3. Risorse locali: legno, metallo, energia (nomi e quantità provvisori).
4. Un edificio potenziabile immediatamente se il wallet ha materiali, con rappresentazione visiva.
5. Una missione/minigioco breve REALMENTE GIOCABILE che dà materiali, non ads simulate.
6. Una biforcazione di upgrade che cambia la strategia.
7. Save/load tra sessioni su Android, e build Windows dal medesimo progetto.
8. Test e bilanciamento prima di AdMob e Google Billing.

## Pubblicazione Play Store: verifiche obbligatorie
- Dal 31 agosto 2026 nuovi invii Android richiedono target Android 16 / API 36 (salvo estensioni/deroghe ufficiali). Fonte https://support.google.com/googleplay/android-developer/answer/11926878?hl=it
- Developer Play Console: quota una tantum e requisiti test chiuso per alcuni account personali nuovi: verificare presso Google nel momento della registrazione.
- Android App Bundle .aab, firma e gestione sicura delle chiavi, Play App Signing, data safety e privacy policy.
- ADS: dichiarare pubblicità, implementare privacy/consent UMP ove richiesto, opzione di rivedere preferenze; non esibire premi prima di callback valido; rispettare policy ads e rewarded.
- IAP: verificare e integrare Play Billing aggiornato, prodotti in-app corretti, prezzi e diritti di consumo; no sistemi di pagamento esterni non consentiti.
- Store: screenshot REALI, descrizioni corrette, niente contenuti fuorvianti, privacy policy accessibile.
- Licenze: mantenere MIT notices, CC0 proofs, tracciabilità third-party; non copiare grafica, codice o nomi di altri giochi senza permesso. Ogni asset audio/font incluso deve avere una prova di licenza.
- Se AI genera musica/art/immagini, verificare termini commerciali del servizio e rischio somiglianze/trademark prima di usare il materiale; non presumere esclusività/protezione garantita.
- Considerare classificazione età, GDPR/UE, normativa italiana e aspetti fiscali per vendita/ads.
- Questo inventario serve a ridurre i rischi, non costituisce garanzia legale né revisione conclusiva di ogni file.

## Monetizzazione ipotizzata
Rewarded ads facoltative: bonus extra dopo missione, reroll/ricompensa alternativa; premi base soddisfacenti senza visualizzazione; tetto al vantaggio in economia e PvP. Possibili skin per città/edifici e pacchetti supporter. No timer di costruzione, energia obbligatoria o pay-to-win PvP. L'ad network ha bisogno di utenti reali; guadagni non garantiti.

## Piano di lavoro in ordine
**T1. Audit template:** verificare versione Godot, struttura, licenze di tutti i file, dipendenze e contenuto effettivamente funzionante; importarlo in branch test isolato.
**T2. Export PC e Android:** provare su dispositivo vero, target API 36, touch e performance.
**T3. Vertical slice economia:** città, minigioco, reward, building upgrade, save.
**T4. Test utenti:** capire se giocare->costruire invoglia a ripetere; migliorare combat/controlli.
**T5. Secondo minigioco e specializzazioni:** espandere soltanto dopo conferma di divertimento.
**T6. Compliance e revenue:** analytics, rewarded, IAP, privacy, store.
**T7. Acquisizione organica:** brevi clip veritiere dell'azione e costruzione, creator piccoli e community; misurare download e retention prima di spendere ads.

## Questioni aperte
Tema narrativo, stile visivo, tipo di minigiochi action, minime funzionalità PvP, infrastruttura per eventuali classifiche, target hardware, salvataggi multi-device e possibilità di Steam/itch.io PC. Non aggiungere come decise.
