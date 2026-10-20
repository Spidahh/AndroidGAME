> **ATTENZIONE — QUESTA VERSIONE È STORICA.** L'apertura con un rifugio già esistente, il primo minigioco obbligatorio e l'arrivo garantito solo ogni 30 minuti NON rappresentano più il concept. **Fonte corrente: [CITTA-DA-ZERO-MASTER.md](CITTA-DA-ZERO-MASTER.md)**. I nomi dei 12 edifici e i costi riportati sotto sono ipotesi di bilanciamento da riconciliare, non requisiti definitivi.

# La città, i personaggi e l'economia

Progetto di dettaglio, 20 ottobre 2026.
Legenda: ✅ = deciso da te · 🟦 = deciso dall'AI su tua delega (U14), sempre modificabile.

✅ **Richieste:**
- una città da gestire che **si espande con il tempo** (U11);
- città come progressione permanente;
- costruzioni e potenziamenti istantanei;
- tutto potenziabile in qualunque ordine, senza rami esclusivi;
- produzione passiva;
- personaggi controllabili e collezionabili.

Gli ultimi cinque punti vengono dai requisiti del piano v2, riportati in DECISIONI.

---

## 1. Il Rifugio

🟦 **Cos'è:** il deposito dei tram di una città caduta, dove si sono rifugiati i sopravvissuti. Da lì si riconquista la città un quartiere alla volta.

🟦 **Visuale:** verticale come i minigiochi; vista dall'alto inclinata, si scorre col dito e si zooma con due dita. Dalla città si accede a tutti i minigiochi con un tocco su cinque edifici-porta:
- **Strada** → M1;
- **Cancello** → M2;
- **Palazzo crollato** → M3;
- **Tetti** → M4;
- **Incrocio** → M5.

## 2. Come si espande con il tempo

La città cresce in tre modi, tutti visibili:

1. **Quartieri liberati.**
   - La mappa ha **9 quartieri** attorno al Rifugio, invasi dagli zombie.
   - Liberarne uno costa risorse. Il quartiere k-esimo costa **B × (4 + 4k)**, con k da 0 a 8, cioè da 4 a 36 B; tutti insieme fanno 180 B.
   - Liberare un quartiere apre terreno edificabile e cambia l'aspetto della città: gli zombie fuggono, le macerie spariscono, tornano le luci.
   - **Si liberano in qualunque ordine.**
2. **Sopravvissuti che arrivano nel tempo.**
   - Ogni **30 minuti di tempo reale** arriva un sopravvissuto, fino ai posti liberi nelle Case.
   - Si aggiungono **quelli salvati nei minigiochi**: ogni sopravvissuto salvato in M3 o M4 al primo completamento di un livello va a vivere in città. Così giocare fa crescere la città anche in popolazione.
   - I sopravvissuti lavorano negli edifici di produzione e si vedono camminare per le strade.
3. **Edifici che migliorano a vista:** ogni edificio ha 3 aspetti, per i livelli 1–3, 4–7 e 8–10, da baracca a edificio ricostruito con insegne e luci.

## 3. Risorse

| Risorsa | A cosa serve | Da dove arriva |
|---|---|---|
| **Materiali** | Costruire, potenziare, liberare quartieri | Minigiochi, Sfasciacarrozze |
| **Viveri** | Personaggi, popolazione, potenziamenti | Minigiochi, Orto |
| **Pezzi personaggio** | Sbloccare un personaggio (30 pezzi) | Cassaforte M1, capi M2, fine serie dei rompicapo, Radio |

**Unità di calcolo interna** (non mostrata ai giocatori): **B = 100 Materiali + 50 Viveri.**

## 4. Edifici (12)

Regole comuni:
- costruzione e potenziamento **istantanei**;
- **nessun edificio ne richiede un altro**;
- 10 livelli ciascuno;
- **costo del livello n = B × [0,5 + 0,15 × (n − 1)²]**, arrotondato per eccesso: livello 1 = 50 M + 25 V, livello 10 = 1.265 M + 633 V. Per portare un edificio da 1 a 10 servono circa 48 B in totale.

| Edificio | Funzione | Effetto per livello |
|---|---|---|
| **Quartier generale** | Cuore del Rifugio | Velocità d'arrivo dei sopravvissuti: da 1 ogni 30 min a 1 ogni 15 min al livello 10 |
| **Case** | Posti per i sopravvissuti | +6 posti per livello (si possono costruire fino a 6 Case) |
| **Sfasciacarrozze** | Produce Materiali | 20 M/ora al liv. 1, +15% per livello; serve almeno 1 lavoratore, e ogni lavoratore in più fino a 5 aggiunge +10% |
| **Orto** | Produce Viveri | 10 V/ora al liv. 1, stessa crescita |
| **Magazzino** | Quanto si accumula mentre non giochi | 8 ore al liv. 1, +0,5 ore per livello (12,5 ore al livello 10) |
| **Mercato** | Cambio fra Materiali e Viveri | Perdita del 25% al liv. 1, −1,5% per livello (11,5% al 10) |
| **Armeria** | Migliora M1 | Arma di partenza a scelta fra quelle sbloccate (pompa al liv. 2, precisione al 4, fiamme al 6, granate all'8); casse +3% più rapide da aprire per livello |
| **Torre di guardia** | Migliora M2 | Rottami iniziali +5% per livello; difesa di partenza già piazzata dal liv. 3, di secondo livello dal liv. 7 |
| **Laboratorio** | Aiuti nei rompicapo | Suggerimenti gratuiti al giorno: 1 al liv. 1, +1 ogni 2 livelli. Il suggerimento indica la prima mossa, non risolve |
| **Addestramento** | Personaggi | Riduce il costo in Viveri dei livelli dei personaggi del 2% per livello |
| **Infermeria** | Personaggi in M1 e M2 | Ricarica delle abilità −2% per livello |
| **Radio** | Personaggi | 1 pezzo al giorno del personaggio scelto al liv. 1, 2 pezzi al liv. 5, 3 al liv. 10 |

**Decorazioni:** strade, alberi, lampioni, murales, fontane. Costano poco in Materiali, sono solo estetiche e sono infinite. Servono a chi ama sistemare la città.

## 5. Personaggi (8 al lancio)

Si usano in **M1** (chi corre) e in **M2** (chi interviene sul campo). Ognuno ha un'abilità che funziona in entrambi i minigiochi.

| Personaggio | Abilità in M1 | Abilità in M2 |
|---|---|---|
| **Lince** | Scatto che attraversa un ostacolo | Corre al punto toccato e stordisce gli zombie vicini |
| **Falco** | Fuoco di precisione per 3 s | Colpo che attraversa una fila |
| **Miccia** | Granata che apre la cassa davanti | Granata ad area |
| **Volt** | Impulso che ferma i corridori | Rallenta l'ondata in un'area |
| **Rocca** | Scudo per un colpo | Ripara una barricata |
| **Aurora** | Rianima un compagno caduto | Cura una difesa danneggiata |
| **Gancio** | Attira le casse vicine dalla corsia accanto | Raccoglie i rottami in un'area |
| **Eco** | Richiama un compagno extra | Esca che attira l'orda per 5 s |

- **Iniziale:** si parte con **Lince**.
- **Sblocco:** gli altri si sbloccano con **30 pezzi**. **Nessuna estrazione casuale**: si sa sempre da dove arrivano i pezzi e quanti ne mancano.
- **Livelli:** 20, pagati in Viveri. Ogni livello rafforza l'abilità: più durata, più area, meno ricarica. Tutti potenziabili, nessun ramo esclusivo.

## 6. Ricompense dei minigiochi

| Minigioco | Livello n, prima volta | Rigiocato |
|---|---|---|
| M1, M2 (azione, 2–5 min) | B × [1 + 0,03 × (n − 1)] | 60% |
| M3, M4, M5 (rompicapo, 20–90 s) | B × 0,35 × [1 + 0,01 × (n − 1)] | 60% |
| Stelle | +10% della ricompensa per ogni stella nuova | — |
| Modalità infinite (M1, M2) | 0,1 B per ogni soglia superata | Massimo 2 B al giorno |

**Incarichi del giorno:** 3 al giorno, del tipo «completa 2 livelli di M3» o «apri 5 casse in M1». Ognuno vale 0,5 B. Danno un motivo per provare minigiochi diversi.

**Evento settimanale:** un minigioco a rotazione dà ricompense ×1,5 per la settimana.

## 7. Ritmo complessivo (stima da verificare nei test)

- **Contenuto al lancio, prima volta:** 40 livelli di M1, 40 di M2 e 240 di rompicapo valgono circa **245 B**: 63 + 63 + 117. Le stelle aggiungono fino al 30%.
- **Costo della città completa:** 12 edifici al livello 10 (circa 575 B), più 9 quartieri (180 B) e i personaggi.
- **Durata:** la città completa richiede, oltre ai livelli, produzione, rigiocate, incarichi ed eventi. È un obiettivo di **2–3 mesi** di gioco quotidiano, con i minigiochi sempre al centro. I numeri si correggono con i dati reali, mai a pagamento (GUADAGNO).

## 8. Primo accesso

1. Si apre il gioco e **si gioca subito il livello 1 di M1**, cioè la scena della pubblicità, senza menu. Primo zombie entro 5 secondi.
2. Fine livello: «Porta il bottino al Rifugio». Si arriva in città e si costruisce lo Sfasciacarrozze con un tocco guidato.
3. Nei primi 15–20 minuti si aprono, uno dopo l'altro, M2, M3, M4 e M5, ognuno con un primo livello facile. Da lì in poi **tutto è sempre disponibile**.
4. Niente registrazione obbligatoria. Il salvataggio online è automatico; il collegamento all'account Google si propone dopo il primo giorno, per non perdere i progressi.
