# Asset — distinta, fonti e licenze

Versione 3.0 · 20 ottobre 2026. Cataloghi e licenze verificati sulle pagine ufficiali in questa data; **nessun asset è ancora scaricato o importato**.

## 1. Criteri

1. **Licenza CC0** come prima scelta: uso commerciale libero, senza obbligo di attribuzione. Le attribuzioni si registrano comunque, per correttezza e tracciabilità.
2. **Una famiglia di stile:** la base è Quaternius (low-poly cartoon). Pacchetti di altri autori entrano solo dopo il confronto visivo (§5).
3. **Formato glTF/GLB** per Babylon.js, ottimizzato con la pipeline di TECNICA §7.
4. **Ogni file usato** viene registrato in `game/assets/ATTRIBUTIONS.md` con file, autore, URL, data di download, licenza e modifiche.
5. **Le regole non cambiano** per adattarsi a un pacchetto: se manca qualcosa si modifica un asset esistente (colore, scala, accessori) o lo si modella.

## 2. Pacchetti principali

| Pacchetto | Autore | Licenza | Contenuto rilevante | Uso nel gioco |
|---|---|---|---|---|
| [Zombie Apocalypse Kit](https://quaternius.com/packs/zombieapocalypsekit.html) | Quaternius, 2024 | CC0, gratuito | 4 personaggi giocabili con 20 animazioni ciascuno, 4 zombie, 2 cani, veicoli e ambiente (60 modelli) | **Nucleo**: 4 eroi, base dei 6 zombie, veicoli, oggetti di strada |
| [Downtown City MegaKit](https://quaternius.com/packs/downtowncitymegakit.html) | Quaternius | CC0; versione Standard gratuita pari al 60–70% | Oltre 300 pezzi modulari di città, 7 edifici d'esempio | Strade, facciate, rovine di Sgombero e Saccheggio |
| [Universal Animation Library](https://quaternius.com/packs/universalanimationlibrary.html) | Quaternius | CC0; Standard gratuita | Oltre 120 animazioni su rig umanoide universale (locomozione a 8 direzioni, armi, morte, emote) | Animazioni extra degli eroi e pose dello store, se il retargeting riesce (§5) |
| [Toon Shooter Game Kit](https://quaternius.com/packs/toonshootergamekit.html) | Quaternius, 2022 | CC0, gratuito | 74 modelli: personaggi con 17 animazioni, nemici, armi, ambienti | Eroi 5–8 (se lo stile combacia), armi, casse |
| [Sci-Fi Essentials Kit](https://quaternius.com/packs/scifiessentialskit.html) | Quaternius, 2024 | CC0; Standard e Pro gratuite | Armi texturizzate, schermi animati, casse, oggetti | Torrette, terminali, macchine, Generatore |
| [Animated Mech Pack](https://quaternius.com/packs/animatedmech.html) | Quaternius, 2021 | CC0 | 4 mech animati | Riserva per i mezzi del convoglio (AV04) |
| [Stylized Nature MegaKit](https://quaternius.com/) | Quaternius | CC0 | Alberi, cespugli, rocce | Decorazioni del Rifugio, vegetazione nelle rovine |
| [KayKit City Builder Bits](https://kaylousberg.itch.io/city-builder-bits) | Kay Lousberg | CC0, gratuito (Extra da 3,95 $) | Oltre 32 modelli di città su un solo atlante a gradiente | Riserva per il Rifugio (§5) |
| [Kenney Survival Kit](https://kenney.nl/assets) | Kenney | CC0 | Barricate, attrezzi, tende, recinzioni | Barriere della Barricata, lamiere del Rifugio livelli 1–3 |
| [Kenney City Kit: Roads, Industrial, Commercial](https://kenney.nl/assets) | Kenney | CC0 | Strade modulari, capannoni | Riserva per strade e zona industriale |
| [Kenney Tower Defense Kit](https://kenney.nl/assets) | Kenney | CC0 | Torrette e piazzole | Riserva per le torrette |
| [Kenney Particle Pack](https://kenney.nl/assets) | Kenney | CC0 | Sprite di particelle | Fumo, scintille, esplosioni, nube tossica |
| [Kenney UI Pack + Input Prompts](https://kenney.nl/assets) | Kenney | CC0 | Pannelli, pulsanti, icone dei comandi | Base dell'interfaccia, rifinita su misura |
| [Kenney Audio: Impact, Interface, Sci-fi Sounds, Music Jingles](https://kenney.nl/assets) | Kenney | CC0 | Effetti sonori e jingle | Colpi, UI, vittoria e sconfitta |

## 3. Distinta per elemento di gioco

### 3.1 Personaggi

| Elemento | Fonte primaria | Lavoro |
|---|---|---|
| H01–H04 (Lince, Falco, Miccia, Volt) | Zombie Apocalypse Kit, 4 sopravvissuti | Assegnazione per sagoma, arma agganciata, colore distintivo |
| H05–H08 (Rocca, Aurora, Gancio, Eco) | Toon Shooter Game Kit | Ritocco materiali per uniformarli allo stile; in alternativa, varianti dei 4 sopravvissuti con accessori diversi (§5) |
| Stili cosmetici (skin) | Varianti di materiale e accessori sugli stessi modelli | Atlante colori alternativo; 3–4 stili per eroe al lancio |
| Animazioni | Le 20 del kit + Universal Animation Library | Set minimo: idle, corsa, sparo, abilità, colpo subito, morte, vittoria |

### 3.2 Zombie

| ID | Fonte | Lavoro |
|---|---|---|
| N1 Vagante | Zombie del kit 1 | Così com'è |
| N2 Sputatore | Zombie del kit 2 | Gola gonfia (shape key o mesh aggiunta), tinta verde, proiettile acido |
| N3 Bruto | Zombie del kit 3 | Scala 1,3 e braccia allungate; animazione di carica dalla libreria |
| N4 Urlatore | Zombie del kit 4 | Onda dell'urlo come effetto; posa a bocca aperta |
| N5 Gonfio | Zombie del kit 1 o 3, ingrassato | Corpo sferico (scala non uniforme), nube di particelle |
| N6 Colosso | Zombie del kit 3 in scala 2 | Piastre di lamiera da Survival Kit agganciate alle ossa, camminata lenta |

### 3.3 Mondo e Rifugio

| Elemento | Fonte |
|---|---|
| Strade, marciapiedi, facciate, rovine | Downtown City MegaKit |
| Macerie, detriti rimovibili, raccordi | Downtown (pezzi rotti) + Survival Kit; stati intero/aperto come pezzi separati |
| Barili esplosivi, casse | Toon Shooter Game Kit, Zombie Kit |
| Leve, gru, macchine, terminali | Sci-Fi Essentials, Zombie Kit (veicoli) |
| Furgone della scorta, mezzi del convoglio | Zombie Kit (veicoli) |
| Barriere e torrette | Survival Kit + Sci-Fi Essentials (armi su treppiede) |
| Edifici del Rifugio, 3 stati per tipo | Livelli 1–3: Survival Kit (lamiera e legno). Livelli 4–6: Downtown riparato. Livelli 7–10: Downtown con insegne e luci. Riserva: KayKit City Builder Bits |
| Decorazioni | Stylized Nature MegaKit, oggetti Downtown, Survival Kit |

### 3.4 Interfaccia, testi, icone
- **Pannelli:** Kenney UI Pack, ricolorato con la palette del gioco.
- **Icone di risorse, strumenti, edifici ed eroi:** render 3D dei modelli stessi, generati dalla pipeline (TECNICA §7). Così sono coerenti con il gioco e non pongono problemi di licenza.
- **Font** (Google Fonts, licenza SIL OFL):
  - titoli: **Lilita One**;
  - testo: **Rubik**.

  Entrambi coprono l'alfabeto latino esteso, quindi vanno bene per italiano, inglese e future lingue europee.

### 3.5 Audio
- **Effetti:** Kenney Audio (CC0) per UI, impatti, esplosioni e raccolta.
- **Musica:** due tracce in loop più jingle. Fonti in ordine di preferenza:
  1. tracce CC0 da [OpenGameArt](https://opengameart.org), filtrate per licenza CC0;
  2. musica generata con un servizio di AI musicale il cui piano a pagamento concede l'uso commerciale (licenza da verificare al momento dell'uso);
  3. tracce CC-BY con attribuzione nei crediti.

  La scelta finale va registrata con licenza e prova.

### 3.6 Materiali per lo store e le campagne
- **Icona dell'app:** render 3D di un eroe e di uno zombie con i modelli del gioco, ritoccato.
- **Screenshot e video:** catturati dal gioco reale, con scene curate e modalità foto (TECNICA §10). Mai scene di meccaniche che non esistono.
- **Grafica in evidenza (1024×500):** render composito dal gioco.

## 4. Elementi che vanno costruiti (non esistono nei pacchetti)

| Elemento | Approccio |
|---|---|
| Stati intermedi degli edifici del Rifugio | Composizione modulare di pezzi esistenti tramite script, nessuna modellazione da zero |
| Effetti di gioco (onda dell'urlo, nube, corsia del Bruto, anteprime delle aree) | Shader e mesh procedurali in Babylon.js |
| Indicatori fuori schermo e frecce d'ondata | UI procedurale |
| Piastre del Colosso, gola dello Sputatore | Ritocco in Blender eseguito da script (Blender è controllabile in automatico) |

## 5. Prova di coerenza degli asset (tappa A0 della ROADMAP)

Prima di scrivere il gioco:
1. **Scarico** i pacchetti del §2 in `game/assets-src/`, ognuno con il file di licenza originale.
2. **Converto** tutto in GLB e genero un **foglio di confronto**: una scena Babylon con tutti i candidati affiancati, alla stessa scala e con la stessa luce della camera di gioco, più gli screenshot.
3. **Decido**, con i fogli di confronto come prova:
   - quali 4 eroi aggiungere ai 4 del Zombie Kit (Toon Shooter o varianti);
   - se il Rifugio usa Downtown o KayKit;
   - se il retargeting della Universal Animation Library funziona sui modelli scelti.
4. **Registro** la scelta e le attribuzioni in `game/assets/ATTRIBUTIONS.md`.

Criterio di accettazione: stessa densità poligonale a ±50%, stessa logica di texture (atlante a gradiente), proporzioni compatibili. Se un pacchetto fallisce si usa la riserva indicata, non si cambia ambientazione.
