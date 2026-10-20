# Il progetto — cosa realizziamo, come, come deve essere

Revisione del 20 ottobre 2026, sera, scritta sull'idea dell'utente (DECISIONI U11).
Legenda:
- ✅ **deciso da te**;
- 🔶 **mia proposta**, in attesa del tuo sì o no;
- ❌ **scartato da te**.

---

## 1. L'idea (le tue parole)

> «tutte le ads che vedi, quello che si deve muovere tra le corsie, senza operazioni matematiche, una specie di tower defence, e tutte le pubblicità che si vedono di solito che tutti vogliono giocare, e questi minigiochi devono essere fissi nel gioco, non solo come intro, […] oltre a gestire una città che si espande con il tempo»

✅ **Cosa realizziamo:** un gioco con **due parti fisse**:
1. **I minigiochi delle pubblicità**, quelli che tutti vogliono provare, resi giocabili davvero e **presenti per sempre** nel gioco, non solo come introduzione.
2. **Una città da gestire** che si espande nel tempo.

✅ **Vincoli:**
- ambientazione zombie;
- **nessuna operazione matematica** nei minigiochi;
- dentro ci devono essere la **corsa tra le corsie** e una **specie di tower defense**.

❌ **Scartato:** la proposta "Corsa + Notte" con porte a numeri.

## 2. Perché è un'idea forte (fatti, RICERCA §10)

- **I giochi delle pubblicità attirano, poi deludono.** Molte pubblicità mostrano minigiochi che il gioco non contiene. È un problema talmente noto che Playrix è stata costretta dall'autorità britannica sulla pubblicità ad aggiungere quei minigiochi nei suoi giochi.
- **Chi li ha messi davvero e in modo permanente ne ha guadagnato:**
  - **X-Hero** ha tenuto il minigioco delle sue pubblicità ("SaveDoge", disegnare una protezione) come modalità fissa, ed è arrivato **primo per download negli USA** su iOS;
  - **King of Avalon** ha trasformato le battaglie delle pubblicità in una campagna permanente.
- **Il concorrente più vicino**, *Those Games* di D3 Publisher, raccoglie i minigiochi delle pubblicità, ma è **a pagamento, solo Switch, PlayStation e PC, senza città né progressione**. Su mobile, gratis e con una città che cresce, non risulta nessuno che lo faccia.

**[deduzione]** Il nostro gioco è *"i giochi delle pubblicità, veri, tutti in un posto, e una città che cresce con quello che vinci"*. Le nostre pubblicità mostrano esattamente ciò che si gioca: sono vere.

---

## 3. Catalogo dei minigiochi delle pubblicità

Elenco dei minigiochi tipici delle pubblicità, con la fonte che li documenta e come diventerebbero nel nostro gioco a tema zombie. **Tu scegli quali entrano.**

| # | Minigioco (come appare nelle ads) | Fonte | 🔶 Versione nel nostro gioco | Matematica? |
|---|---|---|---|---|
| M1 | **Corsa tra le corsie**: il personaggio si sposta fra le corsie evitando ostacoli e nemici | ✅ richiesto da te, ✅ nel gioco (U13) | **Progetto di dettaglio: [M1-CORSA.md](M1-CORSA.md)** | No |
| M2 | **Tower defense**: difendere una base da ondate di nemici | ✅ richiesto da te | Piazzi torrette e barricate lungo la strada che porta al rifugio, le ondate di zombie arrivano, potenzi e riposizioni | No |
| M3 | **Tira il perno**: togliere i perni nell'ordine giusto per salvare il personaggio (lava, acqua, nemici, tesoro) | Penn State, Udonis | Togli i perni per far cadere gli zombie nella trappola e portare i viveri al sopravvissuto | No |
| M4 | **Disegna la protezione**: tracciare con il dito una barriera per proteggere qualcuno | GameRefinery (X-Hero) | Disegni un muro per proteggere i sopravvissuti dall'orda per 10 secondi | No |
| M5 | **Parcheggio bloccato**: far uscire le auto nell'ordine giusto | Those Games | Liberi la strada facendo uscire i veicoli prima che arrivi l'orda | No |
| M6 | **Ordina i colori**: separare liquidi o oggetti per colore | Those Games | Smisti le scorte (cibo, acqua, munizioni) nei contenitori giusti | No |
| M7 | **Scegli l'oggetto giusto**: due o tre oggetti, uno salva il personaggio | Udonis, Penn State (Homescapes) | Situazioni del sopravvissuto: scegli lo strumento giusto contro il pericolo | No |
| M8 | **Torre dei numeri**: combattere nemici con un numero più basso del tuo | Those Games | — | **Sì, escluso** |
| M9 | **Corsa del denaro con porte ×/+** | Those Games | — | **Sì, escluso** |

**[non verificato]** Altri minigiochi molto diffusi nelle pubblicità recenti (svitare le viti, ordinare il traffico) esistono, ma non ho una fonte affidabile che lo confermi. Li verifico se ti interessano.

### 🔶 Quanti al lancio
- **Proposta:** **M1, M2 e altri 2 o 3 a tua scelta** al lancio; gli altri si aggiungono con gli aggiornamenti.
- **Perché:** ogni minigioco è un gioco a sé, con i suoi livelli. Farne pochi e fatti bene costa meno e diverte di più che farne tanti mediocri.

### 🔶 Come diventano "veri" e fissi
- **Livelli:** ogni minigioco ha i suoi livelli che diventano via via più difficili, sempre disponibili dal menu della città.
- **Differenza con la pubblicità:** si vince o si perde davvero, il livello non va in loop e non è un tutorial finto.
- **Ricompense:** ogni livello dà risorse per la città. Qualunque minigioco preferisci, puoi far crescere la città.

---

## 4. La città

✅ **Una città che si espande nel tempo**, gestita dal giocatore. Dai requisiti del piano precedente (DECISIONI, sezione v2):
- città come progressione permanente;
- costruzioni istantanee;
- tutto potenziabile in qualunque ordine;
- produzione passiva.

🔶 **Proposta di legame città–minigiochi**, da approvare:
- le **risorse** vinte nei minigiochi servono a costruire e ingrandire la città;
- la città **si espande** comprando nuovi quartieri, che si liberano dagli zombie e si ricostruiscono;
- la città **produce** risorse anche mentre non giochi.

Quali edifici e cosa fanno lo definiamo dopo aver scelto i minigiochi: dipende da loro.

---

## 5. Personaggi

✅ Personaggi **controllabili e collezionabili** (requisito v2, DECISIONI).
🔶 Come entrano nei minigiochi e come si ottengono: da definire dopo la scelta dei minigiochi.

---

## 6. Come deve essere

| Requisito | Misura |
|---|---|
| ✅ Niente matematica nei minigiochi | Nessuna porta o scelta basata su calcoli |
| ✅ Minigiochi fissi | Ogni minigioco ha livelli propri, sempre disponibili, non solo all'inizio |
| ✅ Pubblicità solo facoltative | Mai annunci forzati |
| 🔶 Si gioca subito | Primo minigioco entro 10 secondi dalla prima apertura |
| 🔶 Partite brevi | 30 secondi – 3 minuti per livello, a seconda del minigioco |
| 🔶 Fluido | 60 fps sul Samsung S25, almeno 30 su un telefono medio |
| 🔶 Lingue | Italiano e inglese |

---

## 7. Come guadagna

- ✅ **Pubblicità solo facoltative.**
- ✅ **Acquisti:** pochi, che migliorano le funzioni, mai per potenziarsi, diversi dagli altri giochi (U7).
- 🔶 **Quali prodotti precisamente:** si definiscono dopo aver scelto minigiochi e città. Non propongo funzioni da vendere prima che esistano (U9).

---

## 8. Come lo realizziamo

✅ **Niente codice finché il progetto non è approvato.** Tecnologia web 3D (Babylon.js) trasformata in app Android, asset gratuiti, sviluppo fatto dall'AI, prove sul tuo S25.

| Passo | Cosa succede |
|---|---|
| **1. Scegli i minigiochi** | Dal catalogo §3 |
| **2. Definiamo ogni minigioco** | Come si gioca, livelli, difficoltà, cosa si vince. Uno alla volta, con la tua approvazione |
| **3. Definiamo la città** | Edifici, espansione, legame con i minigiochi |
| **4. Personaggi, acquisti, nome** | Sopra ciò che è stato deciso |
| **5. Progetto approvato** | Solo allora si passa alla produzione, con prove sul telefono a ogni passo |
