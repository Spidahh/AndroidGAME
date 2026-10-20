# M1 — La Corsa (versione 2)

20 ottobre 2026. Sostituisce la versione 1, bocciata dall'utente (DECISIONI U15). La v1 resta nella cronologia git.
Metodo (CLAUDE.md, regola 9): **analisi dei giochi di riferimento → regole e numeri motivati → prototipo grezzo misurato → test dell'utente**. Niente codice finché questo documento non è approvato.

Legenda:
- **[OSSERVATO]** = scritto nella fonte citata;
- **[COPIATO]** = meccanica presa da un riferimento;
- **[PARAMETRO]** = numero di partenza che il prototipo deve confermare o correggere.

---

## 1. Analisi dei giochi di riferimento

Base: lo studio [STUDIO-MINIGIOCHI-REALI.md](../STUDIO-MINIGIOCHI-REALI.md), §1–2 e §9, con le stesse fonti, rilette il 20/10/2026.

**Differenza voluta rispetto a quello studio:** lo studio propone un solo eroe con al massimo due aiutanti e niente soldati da moltiplicare. Qui invece **la squadra cresce davvero**, come in Frontline Breakthrough, perché l'utente ha chiesto che gli alleati stiano con lui nella sua corsia (U15). Resta escluso solo il moltiplicatore con numeri (+N, ×N).

### 1.1 Last War — *Frontline Breakthrough* (la corsa delle pubblicità di Last War)
Fonti: [LDShop](https://www.ldshop.gg/blog/last-war-survival/last-war-frontline-breakthrough-guide.html) · [Heaven Guardian](https://heaven-guardian.com/last-war-frontline-breakthrough-guide/) · [VirgoVixen](https://www.virgovixen.info/events/frontline-breakthrough/) · [Reddit r/LastWarMobileGame](https://www.reddit.com/r/LastWarMobileGame/comments/1s68v67/the_secret_of_frontline_breaktrough/)

[OSSERVATO]:
- **Comando:** si sposta lateralmente una formazione di soldati. Il movimento orizzontale preciso è indicato come la differenza principale fra partite medie e buone. Bisogna spostarsi **prima** di arrivare all'oggetto, perché dopo non c'è più spazio per correggere.
- **La squadra è la risorsa centrale:** più soldati vuol dire più potenza di fuoco e più margine per gli ostacoli successivi.
- **I barili** sono il bonus principale. Ce ne sono di tre tipi:
  - danno soldati;
  - danno armi, che distruggono più in fretta barriere e barili;
  - mettono effetti negativi sui nemici.

  I barili che aggiungono soldati sono i più importanti.
- **Si perdono soldati** colpiti dai nemici, contro gli ostacoli, e buttandosi su gruppi di nemici senza l'arma adatta.
- **Le deviazioni** verso barili di poco valore costano soldati.
- **Struttura:** 5 tappe in sequenza con difficoltà crescente:
  - tappe 1–2 per costruire l'esercito;
  - tappa 3 per mantenere lo slancio;
  - tappa 4 con percorsi più stretti e sequenze di barili più difficili;
  - tappa 5, «il muro».
- **Classifica:** conta quante tappe completi; a parità, quanti soldati arrivano vivi.
- **Lamentele dei giocatori:** difficoltà incoerente, comandi poco precisi, video guida che non corrispondono ai danni reali.
- **Moltiplicatori:** ci sono porte con +N e ×N. *Escluse per decisione dell'utente* (niente matematica, U11).

### 1.2 Last Z — *Shooter Stages*
Fonte: [Last Z Guides](https://lastzguides.com/shooter-stages.html)

[OSSERVATO]:
- **Formato:** livelli verticali a scorrimento, con zombie, ostacoli e bottino; si schiva l'orda sparando.
- **Barili facoltativi:** danno soldati, potenziamenti d'arma o bonus. Si saltano se costano troppo.
- **Porte a resistenza numerata:** **portarle a zero** dà bonus grandi, come abilità caricate o soldati. Passarci attraverso costa danni.
- **Ostacoli indistruttibili** (punte, ruote che rotolano): fanno molto danno e vanno schivati, non colpiti.
- **Fine livello:** ricompensa a fine tappa, che alimenta la crescita della base.

### 1.3 Corse con la folla (Count Masters, Mob Control, Join Clash)
Fonte: [Fake Ad Games](https://fakeadgames.com/archive/last-war-survival) e il mio studio di approfondimento (in corso).

[OSSERVATO]:
- **La folla è vita e forza insieme:** quando incontra un gruppo nemico, entrambe le parti perdono unità.
- **Sconfitta:** si perde quando la folla arriva a zero.

### 1.4 Cosa funziona in tutti, e lo copiamo
1. **La squadra è vita e forza insieme.** Un solo numero che il giocatore capisce al volo e che vede crescere: [COPIATO] da tutti e tre.
2. **Si spara a oggetti con un numero che scende**; a zero danno un premio: [COPIATO] da Last Z e Frontline.
3. **Si perdono soldati in modo proporzionale** a cosa ti colpisce: [COPIATO].
4. **Ostacoli indistruttibili da schivare** in anticipo: [COPIATO] da Last Z.
5. **Le scelte sono di percorso:** quale barile prendere, a quale rinunciare, quando spostarsi prima che sia tardi: [COPIATO] da Frontline.
6. **Difficoltà a tappe chiara:** prima costruisci, poi mantieni, poi precisione, poi il muro: [COPIATO] da Frontline.
7. **Punteggio di fine livello** = soldati arrivati vivi: [COPIATO] da Frontline.

### 1.5 Cosa evitiamo (difetti segnalati dai giocatori)
- Difficoltà incoerente: la curva si misura con test automatici, non a occhio (§6).
- Comandi imprecisi: cambio corsia istantaneo e prevedibile, oggetti grandi e leggibili.
- Danni diversi da quelli mostrati: il numero sull'oggetto è esattamente il danno che manca, e il costo in soldati di ogni pericolo è fisso e coerente.

---

## 2. Regole della Corsa v2

1. **Comando.** Si scorre per spostare la squadra fra **3 corsie**; il cambio è immediato, 0,1 s. Avanzata e fuoco sono automatici.
2. **Squadra.** Tutti i soldati stanno **nella tua corsia**, in formazione dietro il capo (U15). Il numero dei soldati è sempre visibile sopra la squadra.
3. **Fuoco.** Ogni soldato spara dritto nella corsia: la potenza totale è soldati × potenza dell'arma. Gli zombie nelle altre corsie non si colpiscono e non ti colpiscono.
4. **Perdere soldati** (numeri fissi, mostrati da un'etichetta "−N" quando succede):
   - **zombie normale** che ti raggiunge: −1;
   - **veloce:** −1;
   - **corazzato:** −3;
   - **gigante:** −8;
   - **ostacolo indistruttibile:** −5;
   - **barile esploso** troppo vicino: −3.
5. **Zero soldati** = sconfitta. Riprovare è gratis e immediato.
6. **Oggetti da conquistare:** grandi, con un **numero** sopra che scende a ogni colpo. A zero si aprono:
   - **Barile dei soldati:** +N soldati; il valore si vede prima di colpirlo;
   - **Barile dell'arma:** l'arma della squadra sale di un livello (4 livelli);
   - **Barile del gelo:** gli zombie in vista rallentano a metà velocità per 5 s. È l'"effetto negativo sui nemici" di Frontline;
   - **Portone a numero:** sbarra una corsia. Portato a zero dà **+N soldati** e lascia passare; se ci sbatti contro con il numero ancora alto perdi soldati (−5);
   - **Cassaforte:** una per livello, numero alto; dà bottino per la città (stella 2).
7. **Ostacoli da schivare:** punte fisse e **ruote** che scendono lungo una corsia, annunciate da una freccia 1 s prima. Non si distruggono.
8. **Fine livello:** un **muro** con un numero grande, mentre l'orda continua ad arrivare. Oppure, nei livelli 5 e 10, il **capo**: un gigante con un numero enorme e colpi annunciati sulle corsie.
9. **Stelle:**
   1. ★ arrivato;
   2. ★ cassaforte aperta;
   3. ★ arrivato con almeno la metà dei soldati massimi raccolti nel livello.
10. **Tolto rispetto alla v1:** acido, recinzioni elettriche, zombie dai tetti, ladro, medicine, blindato, scatto, compagni in altre corsie, Scudati.

---

## 3. Nemici

| Nemico | Resistenza (livello 1) | Velocità verso di te | Soldati persi se ti raggiunge | Ruolo |
|---|---:|---:|---:|---|
| Zombie | 20 | 1,8 m/s | 1 | L'orda: tanti, deboli, da falciare |
| Veloce | 14 | 4,0 m/s | 1 | Cambia corsia verso di te con una freccia 0,5 s prima: costringe a muoversi o a uccidere in fretta |
| Corazzato | 120 | 1,4 m/s | 3 | Assorbe colpi: costringe ad avere un'arma buona o a cambiare corsia |
| Gigante | 600 | 1,0 m/s | 8 | La minaccia grossa: va abbattuto da lontano o evitato |
| Capo (L5, L10) | 12.000 / 30.000 | fermo davanti | colpi annunciati: −6 | Prova finale di potenza |

Resistenza per livello: **×(1 + 0,15 × (livello − 1))** [PARAMETRO].

## 4. Armi della squadra (salgono di livello con i barili arma)

| Livello | Arma | Danno al secondo per soldato | Particolarità |
|---|---|---:|---|
| 1 | Pistole | 12 | — |
| 2 | Mitra | 20 | — |
| 3 | Fucili d'assalto | 32 | Attraversano 1 nemico |
| 4 | Mitragliatrici pesanti | 50 | Attraversano 2 nemici |

**Potenza della squadra** = soldati × danno al secondo dell'arma. Esempi:
- 10 soldati con le pistole fanno 120 al secondo: un'orda di zombie (20 l'uno) cade al ritmo di 6 al secondo;
- 30 soldati con i mitra fanno 600 al secondo: un gigante (600) cade in un secondo.

## 5. Struttura e densità di un livello

- **Durata:** 90–150 s [PARAMETRO]. Riferimento: le tappe di Frontline durano 1–2 minuti; da verificare nello studio in corso.
- **Struttura:** 6–8 tratti da 40–60 m, ognuno con una **scelta di percorso** e un'**orda**.
- **Orde:** da 20–30 zombie nei primi tratti fino a 60–100 nei livelli finali. **Obiettivo: almeno 30 zombie visibili per la maggior parte del tempo, picchi oltre 80** (richiesta dell'utente: «più nemici nello schermo»).
- **Curva a tappe come Frontline**, ripetuta due volte nei 10 livelli:

| Livello | Fase | Cosa chiede |
|---|---|---|
| 1, 6 | Costruire | Molti barili soldati, orde morbide |
| 2, 7 | Mantenere | Orde più fitte, primi corazzati |
| 3, 8 | Precisione | Ruote e punte, barili in posizioni rischiose |
| 4, 9 | Pressione | Giganti, portoni a numero, veloci |
| 5, 10 | Il muro | Capo finale |

- **Budget di minaccia per tratto:** somma dei soldati che l'orda toglierebbe se arrivasse tutta = **1,2 × soldati attesi a quel punto** [PARAMETRO]. Senza falciare, perdi. Falciando bene, perdi poco.
- **Valore dei barili per tratto:** in media **+0,4 × soldati attesi** [PARAMETRO]. Rinunciare ai barili per stare al sicuro porta ad arrivare al muro troppo deboli.

## 6. Prototipo e criteri di accettazione (misurati, non a occhio)

**Prototipo grezzo.** Solo regole e numeri di questo documento:
- grafica semplice, nessun menu;
- 3 livelli: uno di costruzione, uno di precisione, uno con il capo.

**Misure automatiche,** con tre giocatori simulati:
- **bravo:** sceglie bene la corsia;
- **medio:** reagisce in ritardo;
- **a caso.**

| Misura | Obiettivo |
|---|---|
| Zombie visibili in media / al picco | ≥ 30 / ≥ 80 |
| Tempo fra due scelte di corsia che contano | 6–12 s |
| Giocatore bravo: vittorie | L1 100%, livello di precisione ≥ 80%, capo ≥ 60% |
| Giocatore medio: vittorie | L1 ≥ 80%, capo ≤ 40% |
| Giocatore a caso: vittorie | ≤ 20% oltre il livello 1 |
| Cause di sconfitta | Nessuna oltre il 50%: la difficoltà deve venire da cose diverse |
| Durata | 90–150 s |
| Prestazioni sul profilo telefono medio | ≥ 55 fps con 100 zombie |

Solo se queste misure sono rispettate te lo do da provare. Poi si cambia solo ciò che le misure o la tua prova indicano, scrivendo il perché.

## 7. Cosa riusiamo dal lavoro già fatto
Si riusano solo le parti tecniche, già verificate:
- folle di zombie animate dalla scheda grafica (100+ a 60 fps sul S25);
- strada e ambiente;
- particelle, suoni e interfaccia.

Le regole di gioco si riscrivono da zero secondo questo documento.
