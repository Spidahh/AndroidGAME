# M1 — La Corsa (corsa tra le corsie)

Progetto di dettaglio del minigioco M1, 20 ottobre 2026.
Legenda: ✅ = deciso da te. **Stato: approvato dall'utente il 20/10/2026 («ok», U14), compreso il telefono in verticale.**

✅ **Richieste dell'utente** (DECISIONI U11, U13):
- si corre tra le corsie;
- nessuna operazione matematica;
- **oggetti a cui devi sparare tanto per prenderli**;
- **scelte da fare**;
- **cose intelligenti**;
- fatto bene, niente di scadente.

---

## 1. L'idea in una riga

✅ **Corri in una strada invasa, spari sempre davanti a te nella tua corsia: scegliere la corsia vuol dire scegliere cosa colpire e cosa evitare. Gli oggetti migliori vanno conquistati sparandogli a lungo, mentre il pericolo si avvicina.**

Il cuore è questo: **la corsia è la mira.**
- Stare in una corsia per aprire la cassa dell'arma ti espone agli zombie che arrivano lì.
- Spostarti ti salva, ma lasci la cassa a metà.

Ogni secondo c'è una decisione vera, senza numeri da calcolare.

---

## 2. Comandi e visuale

| Cosa | Come |
|---|---|
| Visuale | Da dietro e un po' dall'alto, telefono in verticale: la strada si vede lunga davanti, così si legge cosa arriva |
| Corsie | 3 corsie. In alcuni tratti la strada si allarga a 4 o si stringe a 2 |
| Movimento | Scorri a destra o a sinistra: cambio corsia in 0,15 s, risposta immediata. Anche scorrimenti rapidi doppi (due corsie) |
| Avanzata | Automatica. La velocità cresce piano piano nel livello |
| Fuoco | Automatico e continuo, dritto nella tua corsia |
| Abilità | Un pulsante per l'abilità del personaggio (§7), con ricarica |

---

## 3. Oggetti da conquistare sparando

Ogni oggetto ha una **barra di resistenza** e si apre con le **crepe** che si allargano a ogni colpo. **Nessun numero**: si vede quanto manca guardando l'oggetto e la barra. Più l'oggetto è prezioso, più colpi servono e più tempo devi restare in quella corsia.

| Oggetto | Resistenza | Cosa dà (dura per il livello) |
|---|---|---|
| **Cassa arma** | Alta | Un'arma nuova (§4). Sostituisce quella che hai: si sceglie |
| **Gabbia del sopravvissuto** | Media | Un **compagno** che corre in una corsia accanto e spara nella sua (§5) |
| **Cassa potenziamento** | Media | Uno fra: fuoco più rapido, colpi più forti, scudo per 1 colpo, colpo che attraversa |
| **Cassa di bottino** | Bassa–alta | Risorse per la città: piccola, media o grande, si vede dalla dimensione |
| **Cassaforte** | Molto alta, 1 per livello | Bottino grande o pezzo per sbloccare un personaggio. La vera sfida: si apre solo giocando bene |
| **Barile** | Bassa | Esplode e colpisce anche le corsie vicine: apre casse, abbatte gruppi di zombie, rompe barricate |

**Regole che rendono le scelte intelligenti:**
- **Barile e casse.** Un barile accanto a una cassa la apre all'istante: chi lo nota risparmia molto tempo.
- **Oggetti in movimento.** Alcuni sono su un'auto o un carrello e cambiano corsia: devi seguirli.
- **Oggetti dietro le barricate.** Prima apri la strada, poi l'oggetto.
- **Cassa lasciata a metà.** Resta danneggiata: se torni in quella corsia prima che sparisca dietro di te, riprendi da dove eri.
- **Anteprima.** Gli oggetti si vedono in lontananza con la loro icona: sai cosa contengono prima di decidere.

---

## 4. Armi: ognuna cambia il modo di giocare

Si ottengono dalle casse arma durante il livello. Se ne porta **una alla volta**: prenderne una nuova significa lasciare quella che hai. **Scelta vera:** l'arma giusta dipende da cosa sta arrivando.

| Arma | Come spara | Forte contro | Debole contro |
|---|---|---|---|
| **Pistola** (iniziale) | Colpi singoli regolari | — | Tutto ciò che è resistente |
| **Mitragliatrice** | Raffica velocissima, danno basso a colpo | Orde, casse | Zombie corazzati |
| **Fucile a pompa** | Rosa larga: colpisce **anche le corsie vicine**, a corta distanza | Zombie che cambiano corsia, gruppi | Oggetti lontani |
| **Fucile di precisione** | Lento, il colpo **attraversa tutta la corsia** | File di zombie, casse dietro i nemici | Orde veloci |
| **Lanciafiamme** | Getto continuo corto, brucia nel tempo | Corazzati, bruti | Ciò che è lontano |
| **Lanciagranate** | Esplosione ad area, lento | Gruppi, barricate | Corridori veloci |

---

## 5. Compagni: crescere senza numeri

- **Come arrivano:** liberando una gabbia, un sopravvissuto si unisce. Corre **nella corsia accanto** e spara in quella.
- **Quanti:** al massimo **2 compagni**, così si coprono tutte e 3 le corsie.
- **Come si vede la crescita:** con più compagni copri più strada e apri più cose insieme. Si vede, non si conta. È l'equivalente vero della "folla che cresce" delle pubblicità.
- **Si possono perdere:** se uno zombie arriva nella corsia di un compagno, il compagno cade. **Scelta:** proteggerli spostandoti, oppure tenere la tua posizione.
- **Posizione:** i compagni seguono la tua formazione. Se cambi corsia, cambiano anche loro, se c'è spazio.

---

## 6. Zombie e pericoli

| Nemico o pericolo | Comportamento | Come si affronta |
|---|---|---|
| **Vagante** | Lento, resta nella sua corsia | Fuoco normale |
| **Corridore** | Veloce, **cambia corsia** con un segnale 0,5 s prima | Leggere il segnale, spostarsi o pompa |
| **Bruto** | Resistentissimo, blocca la corsia | Evitarlo, oppure lanciafiamme o barile |
| **Scudato** | Riceve pochissimo danno di fronte | Esplosioni, fuoco, o colpirlo dal lato con la pompa |
| **Gonfio** | Muore esplodendo e colpisce le corsie vicine | Abbatterlo lontano; usarlo come barile contro gli altri |
| **Sputatore** | Da lontano lancia acido su una corsia, segnalata a terra | Cambiare corsia in tempo |
| **Barricate e auto** | Ostacoli fermi | Abbattere o evitare |
| **Recinzione elettrica** | Si accende e si spegne a tempo | Passare nel momento giusto |
| **Zombie dai tetti** | Cadono dove si vede l'ombra | Evitare l'ombra |

**Regola di correttezza:** ogni pericolo **si annuncia prima** di colpire. Si perde per una scelta sbagliata, mai per un colpo invisibile.

---

## 7. Personaggi

✅ Personaggi controllabili e collezionabili (requisito v2).

✅ In M1 si sceglie **il personaggio che corre**. Ognuno ha un'**abilità**, per esempio:
- **granata:** apre subito la cassa davanti;
- **scatto:** attraversa un ostacolo;
- **richiamo:** fa venire un compagno extra;
- **fuoco concentrato:** per 3 s spara come un fucile di precisione.

Come si ottengono e come crescono si decide quando definiamo i personaggi per tutto il gioco.

---

## 8. Struttura di un livello

✅ Ogni livello dura **1,5–2,5 minuti** ed è **disegnato a mano**, non generato a caso:
1. **Partenza tranquilla** (5–10 s): primi zombie, una cassa facile.
2. **Tre o quattro "scene"**: ognuna mette davanti **una scelta**. Esempi:
   - cassa arma a sinistra con orda in arrivo, gabbia a destra dietro una barricata: cosa prendi per primo?
   - lanciafiamme nella corsia del bruto, oppure tieni il fucile di precisione per la fila di scudati che si vede in fondo?
3. **Finale:** un **capo-zombie** che lancia attacchi sulle corsie (si schivano) e va abbattuto con quello che hai raccolto. In alternativa, un **portone** da sfondare prima che l'orda alle spalle ti raggiunga.

**Tipi di livello**, per varietà:

| Tipo | Obiettivo |
|---|---|
| **Fuga** | Arrivare in fondo |
| **Recupero** | Aprire un oggetto specifico molto resistente, per esempio i medicinali, mentre l'orda incalza |
| **Scorta** | Un furgone corre in una corsia; va protetto |
| **Inseguimento** | Raggiungere e abbattere uno zombie che porta via le scorte |

**Stelle del livello**, senza punteggi da calcolare:
1. ★ arrivato;
2. ★ cassaforte aperta;
3. ★ tutte le gabbie aperte e nessun compagno perso.

Il terzo criterio è stato precisato in fase 2: con la sola condizione «nessun compagno perso» bastava non salvarne nessuno per ottenere la stella.

---

## 9. Cosa si porta a casa

- **Risorse per la città**, dalle casse di bottino e dalla cassaforte.
- **Pezzi per sbloccare personaggi**, da cassaforti e livelli speciali.
- **Stelle:** sbloccano i livelli successivi della Corsa. Non bloccano mai la città.

Armi, compagni e potenziamenti raccolti **valgono solo per quel livello**: ogni partita riparte dalla pistola, ed è questo che rende ogni corsa una sfida di scelte.

✅ **Collegamento con la città** (da definire con la città): un edificio come l'Armeria potrebbe far partire con un'arma diversa o aprire le casse un po' più in fretta. Sempre con risorse di gioco, mai a pagamento (U7).

---

## 10. Quantità

✅ **Al lancio:**
- **40 livelli** disegnati a mano, divisi in 4 zone di città: periferia, centro, porto, zona industriale;
- **una modalità infinita** con classifica, che riusa le scene dei livelli.

Altri livelli arrivano con gli aggiornamenti.

---

## 11. Qualità: come deve essere

| Aspetto | Requisito |
|---|---|
| **Risposta** | Cambio corsia entro 0,15 s dallo scorrimento; nessun ritardo percepibile |
| **Sensazione dei colpi** | Ogni colpo su una cassa la fa sobbalzare e mostra una crepa; l'apertura esplode in pezzi con il suono giusto; gli zombie reagiscono quando vengono colpiti |
| **Armi distinte** | Ognuna con suono, effetto e ritmo propri: si riconoscono a occhi chiusi |
| **Leggibilità** | Corsie sempre chiare; pericoli annunciati; oggetti riconoscibili da lontano dall'icona |
| **Niente matematica** | Nessun numero da confrontare o calcolare: barre, crepe, icone, dimensioni |
| **Fluidità** | 60 fps sul S25, anche con 40 zombie, esplosioni e 3 armi che sparano |
| **Equità** | Ogni livello si può completare con 3 stelle partendo dalla pistola, senza acquisti |
| **Rigiocabilità** | Ogni livello ha almeno due modi diversi di affrontarlo, verificati giocando |
