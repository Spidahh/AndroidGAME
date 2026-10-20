# M2 — La Barricata (una specie di tower defense)

Progetto di dettaglio, 20 ottobre 2026.
Legenda: ✅ = deciso da te · 🟦 = deciso dall'AI su tua delega (U14), che puoi sempre cambiare.

✅ **Richieste:** una specie di tower defense (U11), fisso nel gioco, nessuna operazione matematica, fatto bene con scelte e cose intelligenti (U13 vale per tutto il gioco).

---

## 1. L'idea in una riga

🟦 **L'orda scende lungo le strade verso il cancello del Rifugio. Tu costruisci e sposti le difese, decidi su cosa concentrare il fuoco e intervieni con il tuo personaggio nei punti critici.**

**Differenza con un tower defense qualunque:** le difese non bastano mai da sole. Le scelte intelligenti sono tre:
1. **Dove** costruire.
2. **Come deviare** l'orda con le barricate.
3. **Quando** usare il personaggio e le trappole dell'ambiente.

---

## 2. Comandi e visuale

| Cosa | Come |
|---|---|
| Visuale | Telefono in verticale, mappa vista dall'alto e un po' inclinata. Gli zombie scendono dall'alto, il cancello è in basso |
| Costruire | Tocchi una piazzola, scegli la difesa da una ruota di icone |
| Concentrare il fuoco | Tocchi un bersaglio (zombie o cassa): le difese in portata lo colpiscono per primo |
| Personaggio | Lo trascini dove serve; spara da solo e ha un'abilità con ricarica |
| Tempo | Pulsante per velocità ×2. Pausa libera |

---

## 3. Difese

Durante il livello si costruiscono con i **rottami**, la moneta della partita. Si guadagnano abbattendo zombie e aprendo casse. Restano nel livello e non toccano le risorse della città. I costi si vedono come icona e barra di rottami posseduti: si compra quando la barra arriva al segno, senza conti.

| Difesa | Funzione | Forte contro | Debole contro |
|---|---|---|---|
| **Mitragliatrice** | Fuoco rapido, singolo bersaglio | Vaganti, corridori | Corazzati |
| **Lanciafiamme** | Cono corto, brucia nel tempo | Gruppi, scudati | Lontani |
| **Mortaio** | Area a distanza, lento, non colpisce vicino | Gruppi lontani | Ciò che arriva sotto |
| **Cecchino** | Lento, il colpo attraversa la fila | Bruti, capi | Orde |
| **Bobina elettrica** | Rallenta e salta da uno zombie all'altro | Orde veloci | Corazzati |
| **Barricata** | Blocca o devia il percorso; gli zombie la attaccano | Guadagna tempo, crea strade lunghe | Bruti, Gonfi |

**Ogni difesa ha 3 livelli nel livello:** il potenziamento cambia l'aspetto e aggiunge un effetto. Esempi: la mitragliatrice al 3° livello spara due colpi insieme, il lanciafiamme lascia una pozza di fuoco.

**Le difese si possono spostare** fra un'ondata e l'altra, gratis. Permette di correggere un errore o di adattarsi alla nuova direzione annunciata.

---

## 4. Scelte intelligenti

1. **Il percorso si cambia.** Con le barricate allunghi la strada degli zombie e li fai passare davanti alle difese più a lungo. Però gli zombie le attaccano, e il Bruto le abbatte in fretta.
2. **Casse sulla strada** (la stessa idea di M1): ogni tanto un lancio di rifornimenti atterra **in mezzo al percorso**. Per aprirla bisogna concentrarci il fuoco (§2). Mentre le difese sparano alla cassa, gli zombie avanzano. Dentro ci sono rottami extra, un'arma per il personaggio o un attacco aereo.
3. **Trappole dell'ambiente:**
   - un distributore che esplode se colpito;
   - un ponte che si fa crollare una volta;
   - un camion da spingere giù dalla discesa.

   Si usano **una sola volta**: farlo troppo presto spreca l'occasione.
4. **Ondate annunciate:** prima di ogni ondata si vedono da quale strada arriva e **quali tipi** di zombie porta. Così si sceglie cosa costruire.
5. **Il personaggio:** è l'unica unità che si muove. Va dove le difese cedono, apre le casse vicine, ripara le barricate. Se cade, torna dopo 10 secondi.

---

## 5. Zombie

Gli stessi tipi di M1, con lo stesso aspetto e lo stesso significato, così il giocatore li riconosce subito:

| Tipo | Comportamento in M2 |
|---|---|
| **Vagante** | Segue la strada, in gruppo |
| **Corridore** | Veloce, prende le scorciatoie libere |
| **Bruto** | Resistente, abbatte le barricate in fretta |
| **Scudato** | Danno ridotto di fronte, va colpito dal lato o col fuoco |
| **Gonfio** | Esplode e danneggia le difese vicine: va abbattuto lontano da esse |
| **Sputatore** | Si ferma e colpisce una difesa da lontano: va eliminato in fretta |
| **Capo** | Uno per livello alla fine: grande, con un attacco speciale annunciato (urlo che accelera gli altri, salto oltre la barricata) |

---

## 6. Struttura di un livello

- **Ondate:** **5–8 per livello**, 3–5 minuti in tutto. La preparazione fra un'ondata e l'altra è libera, senza tempo che scade; si avvia la successiva quando si è pronti.
- **Sconfitta:** il cancello ha una barra di resistenza; se si svuota il livello è perso. Si riprova subito, gratis.
- **Mappe:** 10 mappe diverse (incroci, ponte, centro commerciale, porto, autostrada…), ciascuna con percorsi e trappole propri. **40 livelli** in tutto, perché ogni mappa ospita 4 livelli con ondate diverse.
- **Stelle:**
  1. ★ vinto;
  2. ★ cancello intatto;
  3. ★ tutte le casse aperte.

## 7. Modalità Assedio infinito
Ondate senza fine su una mappa a rotazione settimanale, con classifica. Gli acquisti non possono influire, perché non vendono potenza (GUADAGNO).

## 8. Cosa si porta a casa
- **Bottino:** risorse per la città.
- **Personaggi:** pezzi per sbloccarli, dai livelli con il capo.
- **Stelle:** sbloccano i livelli successivi di M2.

Il collegamento con la città sta in [CITTA.md](CITTA.md) §4: l'edificio **Torre di guardia** fa partire ogni livello con più rottami e aggiunge la possibilità di una difesa di partenza già piazzata.

## 9. Qualità

| Aspetto | Requisito |
|---|---|
| Leggibilità | Fino a 80 zombie sullo schermo e tipi riconoscibili dalla sagoma; portata delle difese visibile quando si tocca |
| Sensazione | Ogni difesa ha suono, effetto e reazione degli zombie propri; le esplosioni delle trappole sono il momento più spettacolare |
| Equità | Ogni livello si vince con 3 stelle senza acquisti e con qualunque personaggio |
| Varietà | Ogni mappa ha almeno due strategie vincenti diverse, verificate giocando |
| Fluidità | 60 fps sul S25 con 80 zombie, 20 difese ed esplosioni |
