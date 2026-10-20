# Holdout City — Game Design Document

Versione 3.0 · 20 ottobre 2026 · documento canonico del design.
Sostituisce PROGETTO, PERSONAGGI-E-SQUADRA e BENCHMARK della versione 2 (in [archivio/v2](../archivio/v2/)), di cui conserva tutti i numeri validi riadattati all'ambientazione.

Documenti collegati: [MONETIZZAZIONE](MONETIZZAZIONE.md) · [TECNICA](TECNICA.md) · [ASSET](ASSET.md) · [ROADMAP](ROADMAP.md) · [LANCIO](LANCIO.md)

---

## 0. Requisiti dell'utente (vincolanti)

Questi punti vengono dall'utente e prevalgono su tutto il resto del documento.

| # | Requisito | Dove è rispettato |
|---|---|---|
| R1 | Attività come quelle delle "finte ads", ma **realmente giocabili, utili e divertenti**, come attività principale | §3–§6 |
| R2 | Città come **progressione permanente** | §9 |
| R3 | Risorse ottenute giocando | §11 |
| R4 | Costruzioni e upgrade **immediati** (nessun timer) | §9, §11 |
| R5 | Libertà di potenziare **tutto**, nell'ordine preferito; nessuna specializzazione che escluda altri upgrade | §8–§11 |
| R6 | Personaggi controllabili e collezionabili | §8 |
| R7 | Produzione passiva (AFK) | §11.6 |
| R8 | Android prioritario, PC se sostenibile | TECNICA, LANCIO §6 |
| R9 | Pubblicità rewarded **facoltative** | MONETIZZAZIONE §3 |
| R10 | Obiettivo commerciale: **guadagnare**, senza diventare pay-to-win | MONETIZZAZIONE §1 |
| R11 | Niente minigiochi di sole operazioni matematiche | §3 |
| R12 | Ambientazione scelta dall'agente in base agli asset gratuiti; motore scelto dall'agente | §1, ASSET, TECNICA |
| R13 | Tutto fatto al massimo, ricco e curato | Intero pacchetto |
| R14 | (20/10/2026) Gli acquisti devono **differenziare il gioco dagli altri**: **pochi**, che migliorano funzioni o le fanno funzionare meglio, **mai acquisti che servono per potenziarsi davvero** | MONETIZZAZIONE, in revisione |
| R15 | (20/10/2026) **Niente programmazione finché il gioco non è definito a fondo** | ROADMAP |

**Definizione operativa di "non pay-to-win"** usata in tutto il progetto (interpretazione dell'agente, scritta qui perché verificabile):

1. Tutto ciò che dà potenza si ottiene anche giocando gratis, senza eccezioni.
2. Il denaro reale può comprare **tempo** (risorse, comodità) e **estetica**, mai potenza esclusiva.
3. Nessun muro di difficoltà progettato per vendere: ogni missione è completabile con l'eroe gratuito e i dispositivi base.
4. Nessun vantaggio comprabile in qualunque classifica o confronto fra giocatori: le sfide competitive usano dotazioni normalizzate (§10.4).
5. Nessuna estrazione casuale acquistabile con denaro reale, direttamente o indirettamente (§8.6).

---

## 1. Identità

### 1.1 In una frase
**Guida una squadra di sopravvissuti a riconquistare una città invasa dagli zombie: sgombera le strade, saccheggia le rovine, tieni le barricate — e trasforma il tuo rifugio in una città viva.**

### 1.2 Ambientazione
Un anno dopo il contagio. La città costiera di **Porto Ferro** è caduta; un gruppo di sopravvissuti si è asserragliato nel vecchio deposito dei tram, il **Rifugio**. Ogni missione riprende un isolato, recupera materiali e richiama altri sopravvissuti via radio. Il Rifugio cresce da recinto di lamiere a quartiere ricostruito, con piazza, luci e mercato.

Il tono è **avventura colorata, non horror**: stile low-poly cartoon (Quaternius), luce di giorno, zombie goffi e leggibili, nessun sangue realistico. Questo tiene la classificazione intorno a PEGI 12 / Teen e il pubblico 13+ (vedi LANCIO §4), evitando le regole Famiglie di Google Play.

### 1.3 Pilastri
1. **Azione leggibile in 3 minuti** — ogni missione ha un ingresso chiaro, una situazione da risolvere e una conclusione; si gioca con un pollice e mezzo.
2. **Preparare l'occasione e sfruttarla** — barili, raccordi, macchine, allineamenti: il movimento crea vantaggi, non serve solo a schivare.
3. **Vedere crescere tutto** — ogni risultato finanzia un acquisto che si vede: in città, sull'eroe, nella missione successiva.
4. **Libertà totale di progressione** — tutto è comprabile in qualunque ordine, niente rami esclusivi, niente timer.
5. **Generosi con chi gioca gratis, irresistibili per chi vuole andare più veloce** — la monetizzazione vende tempo ed estetica.

### 1.4 Perché funziona commercialmente
- Il genere "sopravvivenza + base + zombie" è quello che domina le creatività pubblicitarie dei giochi da cui nasce l'idea (Last War, Whiteout Survival e simili). Il nostro aggancio è **mantenere la promessa delle ads**: la missione mostrata nel video è davvero il gioco.
- Le creatività pubblicitarie e i *playable ad* si producono direttamente dal gioco, perché il gioco è già una pagina web (vedi LANCIO §3).
- Il ciclo "missione breve → acquisto visibile → missione" è adatto a sessioni mobili e a ricompense rewarded naturali (raddoppio bottino, AFK, ripresa).

### 1.5 Nomi funzionali → nomi di gioco

| v2 (funzionale) | v3 italiano | v3 inglese |
|---|---|---|
| Avanzata | **Sgombero** | Clear |
| Recupero operativo | **Saccheggio** | Scavenge |
| Difesa mobile | **Barricata** | Hold the Line |
| Città | **Rifugio** | Haven |
| Materiali M | **Rottami** | Scrap |
| Componenti C | **Componenti** | Parts |
| Crediti K | **Scorte** | Supplies |
| Reclutamento casuale | **Radio** | Radio |
| Biglietto estrazione | **Segnale** | Signal |

---

## 2. Ciclo di gioco

```
┌─────────────┐   risultato    ┌──────────────┐  acquisto immediato  ┌────────────────┐
│  MISSIONE   │ ─────────────▶ │  BOTTINO     │ ───────────────────▶ │ RIFUGIO / EROI │
│ 2–4 minuti  │  quote 20/40%  │ Rottami,     │  nessun timer        │ edifici, livelli│
└─────────────┘                │ Componenti,  │                      │ strumenti       │
       ▲                       │ Scorte       │                      └────────┬───────┘
       │                       └──────────────┘                               │
       └──────────── effetto visibile nella partita successiva ◀──────────────┘
                     + produzione passiva mentre sei via (AFK)
```

**Sessione tipo (5–12 minuti):** apri → raccogli AFK → missione (3 min) → risultato con eventuale raddoppio rewarded → un acquisto → un'altra missione → contratto giornaliero completato → chiudi.

**Tre motivi per rigiocare:** padroneggiare una situazione (maestrie, obiettivi di abilità), provare combinazioni (eroi, strumenti, effetti), finanziare il prossimo acquisto scelto.

---

## 3. Controlli, camera, personaggio

- **Orientamento:** orizzontale.
- **Movimento:** joystick virtuale relativo nella metà sinistra (raggio 80 px logici, zona morta 12%).
- **Attacco:** automatico sul bersaglio valido a portata; un tocco su un nemico o su una struttura ne fissa la priorità.
- **Abilità** (pulsante grande a destra) e **strumento** (pulsante secondario, 2 cariche).
- **Raccolta automatica** entro 1,5 m; azioni contestuali (leve, macchine) con pressione di 0,4 s interrotta dal movimento.
- **Camera:** ortografica, inclinata 55°, ampiezza 22 m, segue con anticipo di 3 m nella direzione del movimento. In Sgombero segue l'asse del percorso; nelle arene resta dentro i bordi.
- **PC/web:** WASD/frecce, Spazio abilità, E strumento, F interazione, clic sinistro bersaglio, Esc pausa.
- Nessun salto, terreno piano (Y=0): semplifica collisioni, navigazione e leggibilità.

**Squadra:** un eroe attivo controllato + due supporti che danno effetti passivi (non sono altre unità da guidare) + uno strumento. Tutti gli eroi si possono possedere e potenziare insieme; la formazione vale solo per la missione.

### 3.1 Valori comuni

| Parametro | Valore |
|---|---:|
| Integrità eroe al livello 1 | 100 |
| Danno base / intervallo / portata | 10 / 0,4 s / 8 m |
| Velocità movimento | 4,5 m/s (accelerazione 24, arresto 32 m/s²) |
| Proiettile eroe | 24 m/s |
| Raccolta automatica | raggio 1,5 m |
| Immunità dopo un colpo | 0,35 s (non protegge l'obiettivo) |
| Uso leva/macchina | 1,5 m, 0,4 s |
| Barile esplosivo | raggio 3 m, 40 danni, avviso 0,8 s |
| Cassa temporanea | un effetto dichiarato, 2 colpi base per aprirla |
| Scala per livello eroe | base × [1 + 0,02 × (livello − 1)] |

**Scelta del bersaglio:** prima quello selezionato se vivo, visibile e a portata; altrimenti lo zombie visibile più vicino; senza nemici, la struttura recuperabile selezionata o più vicina entro 2 m. Nessun colpo attraversa muri solidi.

**Ordine di calcolo del danno:** base × livello → + bonus funzionali additivi sulla base → − riduzione del bersaglio → arrotonda all'intero, minimo 1.

---

## 4. Sgombero (ex Avanzata)

**Fantasia:** avanzare lungo una strada bloccata, abbattere orde, prendere potenziamenti al volo — la scena tipica delle ads, ma con decisioni vere.

- Percorso lungo (X da −8 a +8, Z da −4 a 72) diviso in tre settori; la camera segue l'avanzata; ci si può fermare e riposizionare.
- **Tre casse di potenziamento temporaneo** per partita, visibili in anticipo con simbolo:
  - **Perforanti:** +1 bersaglio attraversato per colpo;
  - **Incendiarie:** +6 danni in raggio 1,5 m su ogni impatto;
  - **Canna larga:** +0,25 m alla tolleranza del colpo.

  Si cumulano, durano la sola partita e non sostituiscono gli upgrade permanenti. Nessuna schermata ferma l'azione per scegliere.
- Barili esplosivi, coperture, ostacoli mobili, leve e cancelli creano le situazioni.
- **Esempio:** una fila di Vaganti copre il centro; dietro c'è un barile. Prendi a sinistra la cassa Perforanti, spari attraverso la fila e fai esplodere il barile: il gruppo successivo cade insieme. Chi resta al centro vince comunque, ma più lentamente e con più danni.

## 5. Saccheggio (ex Recupero operativo)

**Fantasia:** entrare in un isolato in rovina, aprire macerie, riattivare macchinari e portare via tutto prima che l'orda si stringa.

- Arena 32×32 m con tre zone (A, B, C) attivate in sequenza da vicinanza; ogni zona ha un problema di recupero e un gruppo di zombie.
- Tre moduli d'interazione condivisi:
  - **Raccordo fragile:** colpirlo libera insieme tutti i detriti collegati.
  - **Catena di barili:** fino a 6 barili, ognuno con avviso; ogni coppia infligge danno una volta sola.
  - **Macchina locale** (gru, generatore, pressa): mostra prima la striscia 2×5 m che colpirà, poi apre l'accesso e danneggia chi c'è dentro.
- **Non** c'è terreno deformabile né simulazione fisica degli edifici: pezzi predefiniti cambiano stato (intero → aperto/demolito) aggiornando collisioni e griglia di navigazione.
- Nessun viaggio ripetitivo avanti e indietro: il carico si registra quando lo raccogli.

## 6. Barricata (ex Difesa mobile)

**Fantasia:** tenere una posizione mentre l'orda arriva da più lati, piazzando difese e intervenendo di persona dove serve.

- Arena 36×32 m; obiettivo da proteggere al centro (integrità 300); tre accessi (N, O, E).
- Prima di iniziare si piazzano **barriera (120 integrità, 2×1 m)** e **torretta (80 integrità, 6 danni ogni 0,8 s, portata 6 m)** su piazzole fisse.
- Tre fasi, ciascuna con tre ondate:
  1. lettura, dall'accesso base;
  2. aggiramento, dall'accesso secondario;
  3. conclusione, metà dal base e metà dal secondario.

  Ogni ondata è preceduta da una freccia d'avviso di 2 s; tra una fase e l'altra ci sono 5 s di preparazione saltabili.
- **Rifornimenti locali** (non sono valuta della città):
  - si parte con 30;
  - si guadagnano eliminando zombie: Vagante, Sputatore e Gonfio danno 10, Bruto e Urlatore 15, Colosso 25;
  - si spendono in riparazione (20 rifornimenti per +40 integrità, ricarica 4 s) o in una torretta extra (40 rifornimenti, massimo 2).
- **La sconfitta non tocca il Rifugio.** Il retry è gratuito e non richiede pubblicità.

---

## 7. Gli zombie (sei minacce)

| ID | Nome | Integrità; velocità | Attacco | Segnale e risposta |
|---|---|---|---|---|
| N1 | **Vagante** | 20; 2,8 m/s | morso 8 entro 0,9 m ogni 1,2 s | preparazione 0,4 s; spostarsi o interrompere |
| N2 | **Sputatore** | 35; 1,8 m/s | si ferma a 7 m, sputo acido 10 ogni 2 s, velocità 8 m/s | linea e preparazione 0,7 s; schivare o usare copertura |
| N3 | **Bruto** | 60; 2 m/s | carica di 6 m a 7 m/s, danno 18, poi 4 s di recupero | corsia marcata 1 s; scansarsi, poi è vulnerabile per 1,5 s |
| N4 | **Urlatore** | 80; 1,4 m/s | il suo urlo riduce del 35% i danni subiti dagli zombie entro 3 m (non da lui stesso) | onda visibile verso gli zombie protetti; colpirlo o separarli |
| N5 | **Gonfio** | 45; 2 m/s | nube tossica raggio 2 m: danno 6 e rallentamento del 25% per 2 s, ogni 4 s | cerchio anticipato di 1 s; uscire dall'area |
| N6 | **Colosso** | 180; 0,8 m/s | punta all'obiettivo: 20 danni ogni 3 s entro 1 m | sagoma enorme, bersaglio prioritario; rallentare, deviare, abbattere |

Regole comuni:
- **Attacchi:** nessun danno da contatto automatico, ogni attacco ha preparazione e recupero.
- **Effetti:** le aure dello stesso tipo non si sommano.
- **Fuori schermo:** un indicatore ai bordi mostra la direzione dei pericoli.
- **Navigazione:** griglia di celle da 1 m con A*.
- **Scala:** gli zombie non si adattano al livello del giocatore.

**Difficoltà selezionabili (tutte aperte da subito):**

| Difficoltà | Integrità zombie | Aggiunte nell'ultimo incontro | Premio |
|---|---|---|---:|
| Ordinaria | ×1 | — | ×1 |
| Impegnativa | ×1,15 | +1 Sputatore | ×1,4 |
| Incubo | ×1,30 | +1 Sputatore, +1 Bruto | ×1,8 |

---

## 8. Eroi, strumenti, Radio

### 8.1 Otto eroi
Tutti partono da 100 integrità, attacco 10 ogni 0,4 s, 4,5 m/s. Cambia **il modo** di risolvere le situazioni, non la rarità.

| ID | Nome | Ruolo | Abilità (ricarica) | Effetto da supporto |
|---|---|---|---|---|
| H01 | **Lince** | Esploratrice | Scatto di 6 m con 0,4 s di protezione, si ferma prima dei muri (10 s) | Movimento +5% |
| H02 | **Falco** | Tiratore | Raffica di 5 colpi da 10 in 0,4 s, ogni colpo attraversa 2 bersagli, portata 10 m (12 s) | +10% danni a uno zombie isolato (nessun altro entro 3 m) |
| H03 | **Miccia** | Artificiera | Carica esplosiva entro 8 m: 40 danni in raggio 3 m, respinta di 1 m (12 s) | Raggio di tutte le esplosioni +10% |
| H04 | **Volt** | Tecnico | Impulso in raggio 4 m: interrompe per 1 s, rallenta del 25% per 3 s, 10 danni (14 s) | Disinnesca il primo pericolo ambientale, una volta |
| H05 | **Rocca** | Guardiano | Scudo frontale largo 4 m per 4 s, assorbe 60 danni (14 s) | Assorbe il primo colpo subito, una volta |
| H06 | **Aurora** | Medica | Cura 30 l'eroe e l'obiettivo entro 4 m (14 s) | Cura di 20 l'obiettivo quando scende sotto il 40%, una volta (senza obiettivo cura l'eroe) |
| H07 | **Gancio** | Recuperatore | Colpo ad area di raggio 3 m: 40 danni alle strutture, 10 agli zombie, attira gli oggetti (12 s) | Raggio di raccolta +0,5 m |
| H08 | **Eco** | Radiofonista | Esca radio con 40 integrità entro 6 m, attira gli zombie entro 4 m per 5 s (14 s) | Durata degli strumenti +10% |

**Vincoli comuni:**
- Ogni eroe può completare ogni missione da solo con l'attacco base.
- Nessun eroe è la chiave obbligatoria di una situazione.
- Le abilità con mira mostrano un'anteprima; se non c'è una posizione valida, la ricarica non viene consumata.

### 8.2 Livelli e upgrade degli eroi
- **30 livelli**: ogni livello aggiunge il 2% di integrità e danno rispetto alla base (+58% al livello 30, additivo).
- **Sei upgrade per eroe** (costo 60/30/100 ciascuno), senza requisiti reciproci:

| Suffisso | Effetto | Dettaglio |
|---|---|---|
| U1 | Efficacia +25% | protezione / danno / assorbimento / cura / integrità esca |
| U2 | Estensione +20% | distanza / portata / raggio / larghezza |
| U3 | Ricarica −15% | sull'abilità |
| U4 | Effetto secondario | Lince +0,2 s di protezione; Falco +1 bersaglio attraversato; Miccia respinta 2 m; Volt rallentamento 5 s; Rocca +1 m di larghezza; Aurora cura residua 3/s per 4 s; Gancio oggetti attirati in 0,3 s; Eco attira 7 s |
| U5 | Supporto migliorato | raddoppia il valore da supporto; per Volt e Rocca, 2 attivazioni |
| U6 | Interazione ambientale | Lince raccoglie lungo lo scatto; Falco la raffica attiva barili e interruttori; Miccia +20% alle strutture; Volt spegne un dispositivo ostile per 5 s; Rocca le macchine non vengono interrotte sotto lo scudo; Aurora ripara anche la difesa vicina di 20; Gancio +20% alle strutture grandi; Eco l'esca innesca il barile più vicino |

- **Esperienza:** a fine missione paga il 20% del costo del livello successivo dell'attivo e il 10% di ciascun supporto. Non blocca mai: puoi pagare il residuo in risorse in qualunque momento.

### 8.3 Strumenti (uno equipaggiato, tutti posseduti)
Costo 60/30/100 ciascuno; due cariche per missione, 6 s di ricarica fra un uso e l'altro; le cariche si ripristinano gratis a ogni partenza.

| ID | Strumento | Effetto |
|---|---|---|
| T01 | **Calamita** | per 8 s raccolta +3 m, attira gli oggetti |
| T02 | **Granata stordente** | 25 danni e interruzione di 1 s in raggio 3 m |
| T03 | **Scudo portatile** | assorbe 40 per 5 s in raggio 2 m |
| T04 | **Kit medico** | cura 25 l'eroe e l'obiettivo entro 3 m |
| T05 | **Razzo segnalatore** | marca un bersaglio entro 8 m per 6 s: +20% danni subiti |

### 8.4 Formazione
- **Composizione:** un attivo + due supporti diversi (anche vuoti) + uno strumento.
- **Fotografia a inizio partita:** le statistiche vengono congelate alla partenza; gli acquisti fatti dopo valgono dalla missione successiva.
- **Supporto senza effetto:** se in quella missione un supporto non serve (es. Volt senza pericoli ambientali), la schermata lo dice. È un'informazione, non un blocco.

### 8.5 Eroe iniziale
Alla prima apertura si sceglie **gratis uno degli otto**. Dotazione iniziale: **120 Rottami / 60 Componenti / 200 Scorte**, Quartier generale e Magazzino livello 1.

### 8.6 Radio: reclutamento casuale e diretto
- **Reclutamento diretto:** **1.000 Scorte** per un eroe a scelta, sempre disponibile. Le Scorte si guadagnano giocando e si possono anche comprare: è un acquisto **deterministico**, quindi lecito.
- **Radio (casuale):**
  - costa **1 Segnale** a estrazione;
  - il Segnale **si ottiene solo giocando e non si vende mai**, né direttamente né dentro pacchetti a pagamento: è il punto 5 della definizione di non pay-to-win, e tiene la Radio fuori dalle normative sulle loot box a pagamento (MONETIZZAZIONE §7);
  - ogni estrazione pesca uniformemente fra gli eroi del catalogo;
  - si sceglie un **eroe obiettivo** non posseduto: dopo 19 estrazioni senza ottenerlo, la 20ª lo garantisce. Il contatore si conserva anche cambiando obiettivo;
  - un **duplicato** rende 50 Scorte;
  - con il catalogo completo la Radio si sospende fino all'eroe successivo.
- **Fonti di Segnali:**
  - 1 ogni 5 missioni completate;
  - 1 per ogni contratto giornaliero;
  - 2 per ogni traguardo del progetto settimanale;
  - 1 al giorno con un rewarded facoltativo;
  - pass stagionale, solo nel percorso gratuito.
- **Probabilità e contatore** sono sempre mostrati prima della conferma.
- **Eroi futuri:** ogni stagione può aggiungerne uno nuovo (§12.3). Entra subito nel catalogo diretto e nella Radio, mai in esclusiva a pagamento.

---

## 9. Il Rifugio (città)

### 9.1 Regole
- Griglia iniziale 12×12 celle da 1 m, espandibile con sei ampliamenti (16×12 → 24×24); l'ampliamento k (da 0 a 5) costa **B × (2 + k)**.
- **Tutti i tipi di edificio sono nel catalogo da subito.** Possederne uno serve solo a migliorarlo; nessun edificio richiede un altro edificio, capitolo o livello.
- **Costruzione e upgrade istantanei.** Spostare e ruotare gli edifici è gratis e conserva tutto.
- **Funzione unica per tipo:** ogni tipo ha una sola funzione economica; le copie decorative non duplicano produzione o bonus.
- **Nessuna penalità di assenza:** niente fame, decadimento o attacchi alla città mentre sei via.

### 9.2 Edifici

| ID | Edificio | Ingombro | Funzione |
|---|---|---|---|
| HQ | **Quartier generale** | 3×3 | Iniziale. Gestione, Radio, nessun tetto agli altri edifici |
| OFF | **Officina** | 3×3 | Strumenti più efficaci (+5% al liv. 1, +2% per livello) |
| ADD | **Campo d'addestramento** | 3×3 | Contributo dell'esperienza ×[1 + 0,10 × livello] |
| MAG | **Magazzino** | 2×2 | Limite di accumulo AFK: 8 h + 0,5 h per livello oltre il primo |
| SFA | **Sfasciacarrozze** | 3×3 | Produce Rottami |
| LAB | **Laboratorio** | 3×3 | Produce Componenti |
| MER | **Mercato** | 3×3 | Produce Scorte; cambio fra risorse |
| MUR | **Armeria delle mura** | 3×3 | Torrette e barriere più forti (+5% al liv. 1, +2% per livello) |
| GEN | **Generatore** | 2×2 | Ricarica degli strumenti −2% al liv. 1, −1% per livello |
| QUA | **Quartiere** | 4×4 | Solo estetica: 10 stati visivi cumulativi (piazza, panchine, aiuole, luci, alberi, statua, insegna, stemma) |

Dieci livelli per edificio. Il **costo del livello n** è **B × [1 + 0,08 × (n − 1)²]**, arrotondato per eccesso per ogni risorsa:
- livello 1 = 60/30/100;
- livello 5 = 137/69/228;
- livello 10 = 449/225/748.

**Stati visivi:**
- tre modelli per tipo, per i livelli 1–3, 4–6 e 7–10;
- dettagli aggiunti a ogni livello (insegne, luci, impalcature rimosse);
- il Rifugio passa visibilmente da baraccopoli a quartiere ricostruito.

### 9.3 Upgrade urbani (costo 60/30/100 ciascuno, tutti cumulabili)

| ID | Effetto |
|---|---|
| OFF_U1 | Efficacia degli strumenti +25% della base |
| OFF_U2 | Estensione degli strumenti +20% della base |
| OFF_U3 | Attacco base +25% contro le strutture recuperabili |
| OFF_U4 | +1 carica di strumento per missione |
| SFA_U1/U2, LAB_U1/U2, MER_U1/U2 | Tasso produttivo +15% ciascuno, additivo |
| MUR_U1 | Danno delle torrette +25% |
| MUR_U2 | Integrità di barriere e obiettivo +25% |
| MUR_U3 | Portata delle torrette +20% |
| MUR_U4 | Riparazioni in Barricata +25% |
| GEN_U1 | Ricarica degli strumenti −10% |
| GEN_U2 | Raggi dei dispositivi temporanei +20% |
| GEN_U3 | Uso di leve e macchine −25% del tempo (0,3 s) |

### 9.4 Decorazioni
- **Sei decorazioni base** (panchina, albero, lampione, barile dipinto, aiuola, statua), sbloccabili a 6/3/10 ciascuna; poi si piazzano copie gratis senza limite oltre allo spazio.
- **Decorazioni premium** fanno parte del catalogo estetico (MONETIZZAZIONE §4.6): **zero bonus funzionali**, sempre.

---

## 10. Missioni e contenuti

### 10.1 Struttura del premio
- **Quote del premio ordinario:** tre traguardi da **20%** ciascuno + conclusione **40%**. Sconfitta o rientro conservano i traguardi già raggiunti.
- **Bonus fino a +20%:**
  - **obiettivo di abilità** (+10%), specifico della missione, richiede il completamento;
  - **cassa opzionale** (+10%), conservata anche se poi si rientra.
- **Calcolo incrementale:** accredito = `floor(premio × quota_cumulativa) − già_accreditato`. Nessuna perdita o duplicazione per arrotondamento.
- **Accesso libero:** niente energia, niente tentativi giornalieri, niente costo di partenza.

### 10.2 Diciotto missioni di lancio (V0) e varianti
Le tabelle complete con coordinate, incontri, eventi e bonus sono in [archivio/v2/PROGETTO.md §§17–20](../archivio/v2/PROGETTO.md). **Restano valide senza modifiche numeriche**: cambiano solo i nomi (casse = Perforanti/Incendiarie/Canna larga; N1–N6 = tabella §7). In sviluppo vengono trascritte in `game/data/missions/*.json` (TECNICA §5).

| Attività | ID | Schema | Decisione principale |
|---|---|---|---|
| Sgombero | AV01 | Varco | Copertura da aggirare o barile esposto |
| Sgombero | AV02 | Incrocio mobile | Quando fermarsi e quando passare fra ostacoli oscillanti |
| Sgombero | AV03 | Scorta | Liberare il percorso del furgone e proteggerlo |
| Sgombero | AV04 | Convoglio infetto | Fermare i mezzi prima che arrivino |
| Sgombero | AV05 | Recupero laterale | Deviare verso un apparato senza perdere il percorso |
| Sgombero | AV06 | Posizione fortificata | Spegnere gli emettitori per esporre il nido |
| Saccheggio | RE01 | Deposito sepolto | Quali passaggi aprire prima (raccordo) |
| Saccheggio | RE02 | Demolizione controllata | Lato sicuro o raccordo esposto |
| Saccheggio | RE03 | Macchinario fermo | Riattivare la gru e usarla contro l'orda |
| Saccheggio | RE04 | Area contesa | Raccogliere sotto pressione del Gonfio |
| Saccheggio | RE05 | Carico disperso | Aprire la scorciatoia o fare il giro |
| Saccheggio | RE06 | Estrazione | Aprire un'uscita diversa |
| Barricata | DI01 | Due accessi | Spostarsi fra fronti alternati |
| Barricata | DI02 | Aggiramento | Cancello laterale che si apre in fase 3 |
| Barricata | DI03 | Assedio | Colosso verso l'obiettivo mentre l'orda pressa |
| Barricata | DI04 | Rifornimento esposto | Lasciare la posizione per le casse |
| Barricata | DI05 | Presidi separati | Terminali che potenziano le torrette |
| Barricata | DI06 | Perimetro variabile | Riposizionare le difese fra le fasi |

**Varianti deterministiche** (stesse regole, nessuna casualità nascosta):

| Variante | Trasformazione |
|---|---|
| V0 | Base |
| V1 | Specchiata in X, primi due incontri scambiati, Sputatore finale con avviso laterale |
| V2 | Un detrito e un barile accanto al secondo obiettivo, +1 Bruto al secondo incontro con interruttore che lo blocca |
| V3 | Obiettivo spostato di 4 m, +1 Gonfio al terzo incontro, bonus diversi |

**Lancio: V0 + V1 = 36 missioni.** Il costo di V1 è basso: è una trasformazione automatica, da validare e provare. V2 e V3 (altre 36) arrivano con gli aggiornamenti stagionali, insieme ai nuovi temi ambientali: porto, zona industriale, centro storico (vedi ROADMAP).

### 10.3 Obiettivi di abilità (+10%)
Uno per missione, invariati dalla v2:
- **Sgombero:**
  - AV01: un'esplosione colpisce 2 o più zombie;
  - AV02: sensori senza danni dagli ostacoli;
  - AV03: furgone consegnato con almeno il 70% di integrità;
  - AV04: 2 mezzi distrutti prima dell'arresto;
  - AV05: detrito B aperto con il barile;
  - AV06: il Colosso non ferisce l'eroe.
- **Saccheggio:**
  - RE01: detriti B aperti dal raccordo;
  - RE02: un barile colpisce uno zombie e una struttura;
  - RE03: la gru colpisce 2 o più zombie;
  - RE04: dispositivo spento senza subire la nube;
  - RE05: scorciatoia usata prima del rientro;
  - RE06: estrazione con almeno il 50% di integrità.
- **Barricata:**
  - DI01: obiettivo finale con almeno il 70%;
  - DI02: nessun danno all'obiettivo dal cancello;
  - DI03: Colosso abbattuto prima che colpisca;
  - DI04: due casse prese e 20 rifornimenti spesi;
  - DI05: entrambi i terminali usati con torretta in raggio;
  - DI06: una torretta spostata colpisce in fase 3.

### 10.4 Modalità senza fine e sfide (contenuto riutilizzato, lunga durata)
- **Assedio infinito** (Barricata senza fine): ondate crescenti sul layout di Barricata con difficoltà a gradini, fino alla sconfitta.
  - Premio a soglie: ogni 5 ondate un premio crescente fino a un tetto giornaliero (1 B al giorno), per non rompere l'economia.
  - Record personale e **classifica settimanale** su Google Play Games / Supabase.
- **Sfida settimanale**: una missione esistente con modificatori (es. «solo Incendiarie», «Bruti doppi», «nebbia: visuale 14 m») e **dotazione normalizzata uguale per tutti** (stesso eroe, livello 15, tutti e sei gli upgrade, stesso strumento).
  - È l'unica classifica competitiva: nessun acquisto la influenza.
  - Premi: Segnali + cosmetici di stagione per le fasce di percentile, non per posizione assoluta, così anche chi gioca poco riceve qualcosa.
- **Maestrie**: tre stelle per missione (ordinaria, impegnativa, incubo con bonus pieno). Premiano solo emblemi e stili.

---

## 11. Economia

### 11.1 Paniere di riferimento
**B = 60 Rottami / 30 Componenti / 100 Scorte** = premio di una missione ordinaria completata. Valore equivalente: R/60 + C/30 + S/100 = 3.

**Priorità di bottino** scelta prima di partire (vale per tutte le attività):

| Priorità | Rottami | Componenti | Scorte |
|---|---:|---:|---:|
| Bilanciata | 60 | 30 | 100 |
| Rottami | 96 | 21 | 70 |
| Componenti | 42 | 48 | 70 |
| Scorte | 42 | 21 | 160 |

### 11.2 Costi riassunti

| Voce | Formula / costo |
|---|---|
| Livello edificio n (1–10) | B × [1 + 0,08 (n−1)²], per eccesso; totale ≈ 32,8 B per edificio |
| Livello eroe l → l+1 | B × (0,10 + 0,02 l), per eccesso; totale ≈ 11,6 B da 1 a 30 |
| Upgrade eroe, strumento, upgrade urbano | 1 B ciascuno |
| Ampliamento k | B × (2 + k) |
| Reclutamento diretto | 1.000 Scorte |
| Estrazione Radio | 1 Segnale (non acquistabile) |
| Decorazione base | 0,1 B |

**Totale catalogo permanente** (controllo aritmetico v2, invariato): **29.208 R / 14.670 C / 55.460 S**, pari a circa 553 vittorie ordinarie bilanciate senza sconti. Con esperienza, AFK, difficoltà superiori e bonus il percorso realistico per un giocatore gratuito attivo è stimato in **35–60 ore di gioco**. È un parametro da misurare nel soft launch.

### 11.3 Mercato (cambio)
Rapporto 60 R = 30 C = 100 S; perdita del 20% al livello 1, ridotta di 1 punto per livello (11% al livello 10). Nessun ciclo di cambio produce ricchezza.

### 11.4 Esperienza
- **Quota salvata** come frazione del costo del livello attuale, massimo 100%.
- **Al 100%** il passaggio di livello è gratuito ma richiede conferma.
- **Pagamento anticipato:** se si paga prima, la quota si scala dal prezzo e riparte da zero per il nuovo livello.

### 11.5 Difficoltà e bonus
Fattori premio ×1 / ×1,4 / ×1,8. Bonus di abilità e cassa: +10% ciascuno sul premio della difficoltà scelta. Raddoppio rewarded: vedi MONETIZZAZIONE §3.

### 11.6 Produzione passiva (AFK)
- **Tassi al livello 1, solo con il produttore costruito:** 7,5 Rottami/h, 3,75 Componenti/h, 12,5 Scorte/h. Con tutti e tre, in 8 ore matura 1 B.
- **Crescita:** il livello n moltiplica il tasso per 1 + 0,10 × (n−1); i due upgrade di efficienza aggiungono +15% ciascuno (×1,30 complessivo).
- **Limite di accumulo:** quello del Magazzino, 8 h al livello 1 fino a 12,5 h al livello 10. Al massimo, un pieno vale circa 3,86 B.
- **Il limite vale solo per l'AFK:** le risorse guadagnate giocando non hanno tetto.
- **Precisione:** frazioni conservate; ogni upgrade chiude l'intervallo al vecchio tasso prima di applicare il nuovo.
- **Orologio manipolato:** se torna indietro il delta è zero; se va avanti si ferma al limite.

---

## 12. Obiettivi, eventi, stagioni

### 12.1 Contratti giornalieri
Tre spazi, ciascuno a scelta fra due alternative. Ogni contratto completato vale 0,1 B + 1 Segnale.

| Spazio | Alternativa 1 | Alternativa 2 |
|---|---|---|
| G1 | Completa 2 missioni | Raggiungi 6 traguardi |
| G2 | Recupera 3 apparati | Completa 2 scorte o recuperi laterali |
| G3 | Completa 2 Barricate | Elimina 30 zombie |

Un rewarded facoltativo permette di **cambiare un contratto** una volta al giorno.

### 12.2 Progetto settimanale
- **Traguardi:** 3, 6, 10, 15 e 20 missioni completate; ognuno vale 0,2 B + 2 Segnali.
- **Premio finale:** un emblema estetico.
- **Senza scadenza dura:** si può finire oltre la settimana; non si accumulano progetti arretrati.

### 12.3 Stagioni (ogni 6 settimane)
Il motore commerciale ricorrente e il calendario dei contenuti.

**Ogni stagione porta:**
- **un tema** (es. «Porto in fiamme», «Inverno al deposito»), con una palette di luci e decorazioni a tema;
- **6 missioni nuove** (le varianti V2/V3 di uno o due schemi) con il loro modificatore;
- **un eroe nuovo** (H09, H10, …), che entra subito nel catalogo diretto e nella Radio;
- **un pass stagionale**: 30 livelli, percorso gratuito più percorso premium (MONETIZZAZIONE §4.3);
- **cosmetici di stagione** per eroi e Rifugio.

**Costo di produzione** stimato nella ROADMAP §6. Lo schema è pensato per riusare sistemi esistenti: una stagione non introduce modalità nuove.

### 12.4 Eventi brevi (weekend, 48–72 h)
Modificatori sulle missioni esistenti con obiettivi a soglia, per esempio:
- **Notte rossa:** tutte le Barricate con +1 Bruto e premio ×1,25;
- **Corsa ai rottami:** Saccheggio con priorità Rottami +20%.

Si attivano da configurazione remota (TECNICA §9) senza aggiornare l'app.

---

## 13. Primo accesso e interfaccia

### 13.1 I primi 3 minuti (obiettivo: azione entro 5 secondi)
1. **Avvio:** schermata del titolo, nessun login.
2. **Si gioca subito** l'introduzione di **AV01 ridotta**:
   - eroe predefinito Lince in prestito;
   - suggerimenti contestuali chiudibili su movimento, bersaglio e cassa;
   - il primo zombie arriva entro 5 s, la prima cassa entro 20 s.
3. **Risultato:** prima ricompensa e prima animazione del Rifugio («Il Rifugio ti aspetta»).
4. **Scelta del proprio eroe gratuito** fra gli otto, con un video di 3 secondi per ciascuno.
5. **Primo acquisto guidato ma non imposto:** la UI suggerisce Sfasciacarrozze o strumento, ma si può comprare qualunque cosa o niente.
6. **Menu principale:** tre pulsanti attività, contratti visibili.

Saltare il tutorial dà la stessa dotazione, mai doppia.

### 13.2 Schermate
- **Principale:** Gioca (tre attività), Rifugio, Eroi, Radio, Obiettivi, Negozio, Impostazioni. Una missione sospesa ha la priorità («Riprendi»).
- **Preparazione:** missione, difficoltà, priorità, formazione con riepilogo degli effetti, premio previsto.
- **HUD:** integrità, obiettivo, traguardi, abilità, cariche, pausa. Il bottino della partita non appare come saldo prima della milestone.
- **Risultato:**
  - quote ottenute, bonus e pulsante «Raddoppia» rewarded;
  - **obiettivo d'acquisto fissato** con le risorse mancanti;
  - continua, cambia attività, Rifugio.
- **Rifugio:** griglia, anteprima verde/rossa del piazzamento con il motivo, sposta/ruota/amplia gratis.
- **Catalogo:** filtro per effetto, costo, effetto attuale e successivo, risorse mancanti.
- **Eroe:** livello, sei upgrade, quota esperienza, stili posseduti.
- **Radio:** catalogo, eroe obiettivo, contatore, probabilità, reclutamento diretto.
- **Negozio:** offerte e cosmetici (MONETIZZAZIONE §4). Sempre raggiungibile, **mai a comparsa forzata durante il gioco**.
- **Impostazioni:**
  - lingua IT/EN;
  - volumi, vibrazione, effetti ridotti;
  - scala HUD 100/115/130%, qualità grafica;
  - account e salvataggio cloud, privacy e consenso, ripristino acquisti;
  - eliminazione account.

### 13.3 Accessibilità
- **Ingombri:** aree sicure rispettate; pulsanti di almeno 64×64 px logici; testo di almeno 24 px.
- **Segnali di pericolo:** usano forma e animazione oltre al colore; gli avvisi restano visibili anche con effetti ridotti.
- **Opzioni:** shake disattivabile, nessun flash intenso obbligatorio, riduzione movimento.

---

## 14. Direzione artistica e audio

- **Stile:** low-poly cartoon con texture a gradiente (Quaternius), illuminazione diurna calda, contorni morbidi, palette satura ma non neon.
- **Codice colore funzionale:**
  - arancio = pericolo zombie;
  - ciano = interazione utile (leve, raccordi);
  - giallo = bottino;
  - rosso pulsante = avviso imminente.

  Le tinte cosmetiche non usano mai questi colori.
- **Leggibilità prima di tutto:** le sagome degli zombie si distinguono a colpo d'occhio:
  - Vagante: piccolo e curvo;
  - Sputatore: gola gonfia e verde;
  - Bruto: largo, con le braccia lunghe;
  - Urlatore: magro, con l'onda dell'urlo visibile;
  - Gonfio: rotondo, avvolto dalla nube;
  - Colosso: due volte più alto, con piastre di lamiera.
- **Rifugio:** tre stati per edificio (lamiera e legno → mattoni riparati → quartiere rinato con luci e insegne).
- **Feedback** (dettagli in TECNICA §8):
  - impatto con particelle e una reazione del modello di 80 ms;
  - distruzione delle strutture in 180 ms;
  - catene di esplosioni con micro-shake di 0,06 m;
  - nessuno hit-stop globale.
- **Audio:**
  - due tracce in loop: Rifugio rilassato, missione tesa con variante finale;
  - 16+ eventi sonori;
  - bus Master, Music (−18 dB), SFX (−8 dB), UI (−10 dB), al massimo 12 suoni simultanei;
  - musica abbassata di 4 dB durante gli allarmi.

---

## 15. Cosa NON c'è (scelte di portata)

Esclusioni pensate per tenere il progetto realizzabile e sostenibile:
- **Interazione fra giocatori:** niente PvP diretto né razzie di città, e niente chat, gilde o scambi.
- **Meccaniche escluse:** energia, timer di costruzione, reset stagionali di città o eroi, valute premium obbligatorie.
- **Monetizzazione esclusa:** estrazioni casuali a pagamento, contenuti funzionali venduti solo a pagamento.
- **Produzione esclusa:** terreno deformabile, fisica di crollo, dialoghi ramificati, doppiaggio.

Il PvP con dotazioni normalizzate e le funzioni social restano possibili espansioni future, solo con dati reali che le giustifichino (ROADMAP §7).
