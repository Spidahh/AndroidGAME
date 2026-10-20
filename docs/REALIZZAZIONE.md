# Come lo realizziamo

20 ottobre 2026.
Legenda: ✅ = deciso da te · 🟦 = deciso dall'AI su tua delega (U14).

✅ **Niente codice finché non dai il via** (U8). ✅ Sviluppo fatto dall'AI, prove sul tuo Samsung S25 (U3, U6).

---

## 1. Nome

🟦 **Holdout City**. Nello store: **«Holdout City: Real Ad Games»**, 27 caratteri sui 30 ammessi. Il sottotitolo dice subito la promessa: i giochi delle pubblicità, veri.
- Nessun gioco omonimo trovato (RICERCA §9).
- Prima di aprire la scheda store serve una ricerca del marchio su EUIPO.
- Sottodominio: **holdout.magistaf.com**.
- Pacchetto Android: **com.magistaf.holdout**.

## 2. Tecnologia

| Parte | Scelta | Perché |
|---|---|---|
| Motore 3D | ✅ **Babylon.js 9** (web) | Scelto con te. L'AI lavora solo con codice; si prova da un link |
| App Android | ✅ **Capacitor 8** (target Android 16 / API 36, richiesto da Google) | RICERCA §5–6 |
| Fisica dei rompicapo (M3, M4) | 🟦 **Rapier 2D** (0.21) | Motore fisico veloce, regge centinaia di elementi (acqua, sabbia) sul telefono |
| M1, M2, città | 🟦 Movimento e collisioni scritti apposta, senza motore fisico | Più semplice, più veloce, risultati sempre uguali |
| Salvataggio online e classifiche | 🟦 **Supabase** (login anonimo automatico, poi collegamento Google) | Non esiste un plugin mantenuto per i salvataggi di Google Play Games (RICERCA §6) |
| Dati d'uso, crash, regolazioni a distanza | 🟦 **Firebase** | Gratuito |
| Pubblicità | 🟦 **AdMob** con consenso UMP | RICERCA §2 |
| Acquisti | 🟦 **RevenueCat** sopra Google Play | Gratuito fino a 2.500 $ al mese |
| Sito | 🟦 Cloudflare Pages su `holdout.magistaf.com` | Dominio già tuo |
| Orientamento | 🟦 **Verticale** per tutto il gioco | Come le pubblicità; si gioca con una mano. Sui tablet il gioco si adatta, perché Android 16 non permette di bloccare la rotazione (RICERCA §6) |

**Architettura in breve:**
- **Ogni minigioco è un modulo separato** con i suoi livelli in file di dati. Aggiungere M6 o M7 dopo il lancio non tocca gli altri.
- **La logica di gioco è separata dalla grafica:** si può far giocare un programma automatico a migliaia di livelli per verificare che siano tutti risolvibili e che le ricompense siano giuste.
- **Un solo punto** contiene indirizzi e chiavi pubbliche. Nessun segreto nel repository.

## 3. Grafica e suoni

- **Modelli 3D gratuiti, uso commerciale libero (CC0):**
  - Quaternius *Zombie Apocalypse Kit* (personaggi, zombie, veicoli);
  - *Downtown City MegaKit* (città);
  - *Universal Animation Library* (animazioni);
  - Kenney (barricate, torrette, effetti, interfaccia, suoni).

  Elenco completo e licenze in RICERCA §7.
- **Rompicapo:** usano gli stessi modelli visti di lato, così tutto il gioco ha un solo stile.
- **Personaggi:** 8 dal Zombie Kit (4) e dal Toon Shooter Kit (4), ritoccati per uniformarli. La resa va verificata affiancandoli.
- **Musica:** tracce con licenza libera o acquistate, registrate con la prova di licenza.
- **Attribuzioni** in un file e nella pagina crediti del sito.

## 4. Fasi di lavoro

Ogni fase finisce con **qualcosa che provi sul S25** (link o app) e con il tuo ok prima di passare alla successiva.

| Fase | Cosa ottieni | Verifica |
|---|---|---|
| **0. Via** | Tu dici di partire | — |
| **1. Base e prova del telefono** | Link con una strada a 3 corsie, 40 zombie, armi che sparano | 60 fps sul S25; stile degli asset che sta bene insieme |
| **2. M1 completo, primi 10 livelli** | La Corsa vera: casse, armi, compagni, zombie, capo | Ti diverte? Le scelte contano? Si corregge finché la risposta è sì |
| **3. M2, primi 10 livelli** | La Barricata | Come sopra |
| **4. M3, M4, M5, primi 20 livelli ciascuno** | I tre rompicapo | Come sopra |
| **5. Città** | Edifici, quartieri, sopravvissuti, produzione, personaggi | Il ciclo minigiochi → città → minigiochi funziona |
| **6. Tutti i livelli** | 40 + 40 + 240 livelli, modalità infinite, incarichi, eventi | Programma automatico: tutti risolvibili. Tua prova a campione |
| **7. Rifinitura** | Grafica finale, suoni, musica, italiano e inglese, primo accesso, impostazioni | Prestazioni, leggibilità, 30 minuti di gioco senza problemi |
| **8. App e servizi** | App sul S25 con salvataggio online, pubblicità di prova, acquisti di prova | Acquisti e ricompense mai duplicati o persi |
| **9. Test chiuso** | 12 tester per 14 giorni, obbligatorio per Google (RICERCA §5) | Nessun crash grave, primo accesso chiaro |
| **10. Uscita di prova** | Pubblicazione in pochi paesi | Quanti tornano dopo 1, 7, 30 giorni; obiettivo almeno 35%, 12%, 4% (fascia alta del mercato, RICERCA §1) |
| **11. Uscita mondiale** | Pubblicazione ovunque, sito, portali web | — |
| **12. Dopo l'uscita** | Nuovi livelli ogni mese, M6 e M7, eventi | Dati di gioco |

**Stima di lavoro dell'AI dalla fase 1 alla 11: circa 450–750 ore.** Sono 5 minigiochi completi più città e servizi. La stima si corregge a ogni fase con le ore reali. Non hai fissato scadenze (U4).

## 5. Cosa devi fare tu

| Quando | Cosa |
|---|---|
| Ogni fase | Provare sul S25 e dire cosa va e cosa no |
| Prima della fase 8 | Creare l'account **Google Play Console** (25 $) e gli account **AdMob**, **Firebase**, **RevenueCat**, **Supabase**. Ti preparo le istruzioni passo-passo |
| Fase 8 | Dati fiscali e di pagamento negli account |
| Fase 9 | Trovare **12 tester** con un account Google |
| Fase 9 | Nome del titolare e contatto per la privacy |
| Fasi 9–11 | Approvare ogni pubblicazione |

## 6. Regole da rispettare

- **Pubblico 13+**, non rivolto ai bambini: si evitano le regole Famiglie (RICERCA §5).
- **Privacy:** pagina `holdout.magistaf.com/privacy`, modulo Data safety su Play, eliminazione account dall'app e dal sito.
- **Consenso** alla pubblicità per Europa e Regno Unito (RICERCA §2).
- **Classificazione dei contenuti:** questionario IARC (violenza cartoon).
- **Nessuna estrazione casuale né valuta acquistabile:** nessun rischio da leggi sulle loot box (RICERCA §4).
- **Requisiti tecnici Google:** Android 16 / API 36 (RICERCA §5).

## 7. Come lo facciamo conoscere

- **Clip brevi verticali** dei minigiochi veri su Shorts e TikTok, con il messaggio *«i giochi delle pubblicità, veri»*. È il gancio più forte che abbiamo.
- **Le pubblicità del gioco sono livelli veri:** il gioco è già web, quindi si possono creare **pubblicità giocabili** dai livelli stessi.
- **Versione web giocabile** dal link, per chi vuole provare senza installare.
- **Portali web** (Poki o CrazyGames) e Microsoft Store dopo l'uscita.

Ogni pubblicazione su account social o campagna a pagamento parte solo con il tuo ok.

## 8. Stato del lavoro

| Data | Fase | Stato | Cosa è stato fatto | Prossimo passo |
|---|---|---|---|---|
| 2026-10-20 | 0 | ✅ Fatto | L'utente ha dato il via («via») | — |
| 2026-10-20 | 1 | ✅ Fatto | Vedi sotto. **Prova dell'utente sul Samsung S25: 60 FPS** | — |
| 2026-10-20 | 2 | ❌ Bocciato dall'utente (U15) | M1 completo con i primi 10 livelli: vedi «Fase 2, risultati» | L'utente gioca e dice se diverte; poi fase 3 (M2 La Barricata) |
| 2026-10-20 | 2 v2 | 🟡 Online, da provare sul S25 | M1 rifatto sul modello Last War / Last Z: vedi «Fase 2 v2, risultati» | Prova dell'utente; intanto M2, rompicapi e città |

**Fase 1, risultati:**
- **Link di prova:**
  - https://holdout.magistaf.com/beta/ — corsa giocabile;
  - `?z=40&god=1` — prova di carico con 40 zombie, eroe invulnerabile;
  - `?view=assets` — confronto degli asset.
- **Base di M1 funzionante:**
  - 3 corsie, scorrimento per cambiare corsia, fuoco automatico;
  - 4 armi ottenute aprendo casse con barra di resistenza;
  - barili che esplodono sulle corsie vicine, barricate;
  - 4 tipi di zombie, con il cambio di corsia dei corridori annunciato;
  - vita dell'eroe, sconfitta e riprova.
- **Prestazioni:**
  - le orde usano **Vertex Animation Texture**: animazioni calcolate dalla GPU, poche chiamate di disegno;
  - Chromium con CPU rallentata 4 volte (simulazione di un telefono medio): **60 fps con 34 zombie, 59 fps con 62**;
  - prima della VAT erano 23 fps con 31 zombie;
  - la GPU del telefono va verificata sul S25 reale.
- **Asset:** gli stili di Zombie Apocalypse Kit e Toon Shooter Kit sono coerenti nel foglio di confronto.
  - Google Drive di Quaternius blocca i download automatici, quindi i modelli vengono da Poly Pizza (stessi modelli, stesso autore). Elenco in `game/assets-src/polypizza/manifest.csv`.
  - Cinque file risultano marcati CC-BY su Poly Pizza: si accredita Quaternius (`game/public/models/ATTRIBUTIONS.md`).
- **Test:** 6 test automatici della simulazione superati (`npm run check`).

**Da sistemare nella fase 2:**
- arma in mano all'eroe (orientamento);
- scala del modello del cane e di `zombie_half`;
- peso del codice: 1,3 MB compressi, da ridurre importando solo le parti di Babylon usate;
- compagni, capo-zombie, livelli disegnati a mano, suoni.

**Fase 2, risultati (M1 La Corsa):**
- **Contenuto:** 10 livelli disegnati a scene (`game/src/m1/levels.ts`), con i 4 tipi di livello:
  - fuga, con portone finale o capo-zombie (L5, L10);
  - recupero, con il carrello delle medicine che cambia corsia (L4, L9);
  - scorta, con il blindato (L6);
  - inseguimento, con il ladro (L8).
- **Armi:** 6 (pistola, mitragliatrice, fucile a pompa, precisione, lanciafiamme, lanciagranate), ognuna con regole proprie:
  - la pompa colpisce le corsie vicine e prende di lato gli Scudati;
  - la precisione attraversa la fila;
  - il fuoco brucia nel tempo;
  - le granate esplodono ad area.
- **Zombie:** 7 tipi più il capo (Vagante, Corridore, Bruto, Scudato, Gonfio, Sputatore, Strisciante, Ladro), ognuno riconoscibile e con un segnale prima di colpire.
- **Oggetti da conquistare sparando:**
  - casse arma, gabbie dei compagni, potenziamenti, bottino S/M/L, cassaforte;
  - barra di resistenza, crepe in 3 stadi, sobbalzo quando colpiti;
  - una cassa lasciata a metà resta danneggiata.
- **Pericoli:** barili a catena, auto, barricate, recinzioni elettriche a tempo, acido degli Sputatori, zombie dai tetti con ombra, colpi del capo annunciati.
- **Compagni:** fino a 2, corrono nelle corsie accanto e si possono perdere.
- **Abilità di Lince:** scatto invulnerabile (pulsante o scorrimento verso l'alto).
- **Stelle:** arrivato · cassaforte aperta · tutte le gabbie aperte senza perdere compagni.
- **Ricompense:** secondo CITTA §6, salvate in un profilo locale.
- **Interfaccia:** titolo, scelta livelli con stelle e lucchetti, HUD con vita, avanzamento, arma, potenziamenti, compagni, obiettivo speciale, pausa, risultato con stelle animate.
- **Audio:** effetti Kenney e spari sintetizzati diversi per arma.
- **Verifiche automatiche:**
  - 30 test superati, tra cui un giocatore automatico che completa tutti i 10 livelli partendo dalla pistola;
  - durate 82–129 s, nella fascia 1,5–2,5 min del progetto;
  - il giocatore automatico ha fatto emergere problemi di bilanciamento poi corretti: resistenza della cassaforte (da 650 a 300), portoni, medicine, ladro.
- **Prestazioni** con la CPU rallentata 6 volte e 52 zombie: **58,6 fps, frame peggiore 31 ms**. Ottenute preparando i materiali al caricamento e riusando gli oggetti (pool).

**Rimandato a fasi successive:**
- strade a 2 e 4 corsie;
- 30 livelli in più (40 al lancio);
- modalità infinita;
- scelta del personaggio (gli altri 7 arrivano con la città, fase 5);
- musica.

**Fase 2 v2, risultati (M1 La Corsa rifatta, docs/M1-CORSA.md v2):**
- **Link:** https://holdout.magistaf.com/beta/ (livello diretto: `?level=4`; strumenti: `?debug=1`, `?god=1`).
- **Squadra = un soldato con il numero «×N»** sopra (richiesta dell'utente), non tanti modelli. Il numero è vita e potenza di fuoco.
- **Barili e portoni con il numero che scende** mentre spari; sopra c'è cosa danno (+N soldati, arma, gelo). Se ci arrivi addosso intatti costano soldati.
- **Livelli generati con difficoltà calcolata** (`gen.ts`, §10 del documento): rapporto di pressione per fase, curva attesa del giocatore medio, taratura automatica (`tools/tune.ts` → `tuning.json`).
- **Misure con giocatori simulati** (`tools/measure.ts`, 8 semi per livello):
  - il bravo vince 8/8 in tutti i 10 livelli;
  - il medio vince il 50–87 %;
  - chi gioca a caso vince 0–2 su 8;
  - zombie visibili: in media 28–56, picchi 83–150; durata 60–110 s.
  - Limite noto: L5 e L10 (capo) sono al tetto della taratura (2,2): il medio vince più del previsto, L3 e L8 al minimo (0,6).
- **Prestazioni** (Chromium, CPU rallentata 4 volte, nel tratto più affollato con 140–200 zombie): 52–60 FPS.
  - Corretto: il soldato disegnava insieme tutte le 14 armi del modello (148 mesh attive invece di 195, tempo di disegno dimezzato).
  - Buffer delle folle preallocati, niente oggetti temporanei per zombie a ogni frame, etichette senza ricalcolo della pagina.
  - Strumenti: `tools/perf.mjs`, `tools/frame.mjs` (ripartizione per frame), `tools/profile.mjs` (profilo CPU), `tools/meshes.mjs`.
- **Test:** 20 test (regole, livelli validi, difficoltà misurata con i bot su tutti i livelli).
