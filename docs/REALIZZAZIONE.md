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
