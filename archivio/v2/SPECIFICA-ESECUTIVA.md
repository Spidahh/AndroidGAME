# AndroidGAME — Specifica esecutiva per lo sviluppo

Versione 1.1 — 20 ottobre 2026. Allegato tecnico del [piano ufficiale](PIANO-DI-LAVORO.md). Include la revisione di interazioni, ritmo e feedback di PROGETTO §20; nessun codice implementato.

## 1. Come usare questa specifica

Questo è il riferimento operativo da tenere aperto al PC: definisce struttura, responsabilità, dati, valori iniziali, contenuti e comportamento atteso. Il piano §20 indica l'ordine concreto delle consegne. Non occorre inventare le regole durante la programmazione.

I vincoli confermati restano quelli di [PROGETTO.md](PROGETTO.md). Tutti i dettagli nuovi di questa specifica sono **parametri e soluzioni proposti dall'agente**, non approvazioni attribuite all'utente. Sono una base completa modificabile, non risultati di bilanciamento o compatibilità già misurati. La redazione non avvia lo sviluppo.

Il catalogo di contenuti ha due profili documentati: C01, 18 missioni e un ambiente modulare, raccomandato per contenere il lavoro; ESTESO, 72 configurazioni e tre ambienti. Il codice delle regole è identico. Il catalogo attivato per l'uscita dipende dalla decisione di portata; le missioni di entrambi i profili sono descritte nel progetto. Durante lo sviluppo si può implementare l'intero nucleo senza confondere il PC di lavoro con una pubblicazione commerciale per PC.

Le informazioni personali non fornite — budget reale, disponibilità settimanale, telefono, account, titolo commerciale e contatti — non vengono simulate. Non impediscono di implementare il gioco: hanno punti di inserimento distinti dalla logica, servizi simulati per lo sviluppo e istruzioni di attivazione prima della distribuzione.

## 2. Prima apertura sul PC

1. Aprire la repository esistente. Conservare i documenti nella radice; il progetto futuro va in `game/`, con `game/project.godot`. Questi percorsi sono istruzioni, non file già creati.
2. Usare Godot standard con GDScript, renderer Compatibility. La pagina Windows consultata il 20/10/2026 presenta **4.7.2**: versione iniziale candidata da fissare insieme ai template corrispondenti, senza aggiornamenti automatici durante la produzione. [Fonte Godot](https://godotengine.org/download/windows/).
3. Creare un progetto 3D in `game/`; viewport logico 1280×720, finestra ridimensionabile, stretch `canvas_items`, orientamento orizzontale. Fisica a 60 tick/s. L'area di gioco viene adattata senza tagliare HUD o comandi.
4. Installare i template della stessa versione dal gestore export. Eseguire sul PC con F6 la scena corrente e F5 il progetto. Per i primi passaggi non servono account pubblicitari, fatturazione o SDK Android.
5. Impostare gli input della sezione 4 e i servizi simulati della sezione 13. Prima consegna E01: avvio → menu → uscita, senza errori del debugger.
6. Per il primo export Android: OpenJDK 17, Android SDK tramite Android Studio; impostare in Godot i percorsi Java SDK e Android SDK. Installare piattaforma Android 36 e strumenti compatibili seguendo il [setup Android 16](https://developer.android.com/about/versions/16/setup-sdk). La guida Godot consultata riporta anche esempi SDK 35: non copiarli come prova di conformità corrente. [Export Android Godot](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_android.html).
7. Installare il template Gradle dalla versione fissata, creare preset Android debug e release. Eseguire una build debug sul telefono con debug USB abilitato. Usare un identificativo locale di sviluppo, per esempio `org.androidgame.dev`; prima dello store sostituirlo con l'identificativo definitivo del titolare, senza cambiare quello già pubblicato.
8. Non mettere nel repository keystore, password, account di servizio, esportazioni, cache `.godot/` o salvataggi personali. Il preset pubblico contiene impostazioni non segrete; i segreti restano nella configurazione locale o nel sistema di build.

La versione candidata e le integrazioni non sono state installate o provate in questa fase. Se l'export minimo fallisce, si risolve prima di produrre il catalogo artistico; non si cambia motore come conseguenza automatica.

## 3. Struttura da realizzare

Tutti i percorsi della tabella sono relativi a `game/`. Uno script possiede una responsabilità; dati economici e missioni non vengono copiati negli script dei pulsanti.

| Percorso futuro | Responsabilità |
|---|---|
| `scenes/app/main.tscn`, `scripts/app/main.gd` | Radice persistente con contenitore mondo e livello interfaccia |
| `scripts/services/catalog.gd` | Carica e valida cataloghi; nessuna modifica ai saldi |
| `scripts/services/profile_store.gd` | Salvataggio, backup, migrazioni e transazioni |
| `scripts/services/progression.gd` | Saldi, prezzi, proprietà, upgrade, esperienza e AFK |
| `scripts/services/mission_session.gd` | Partita attiva, traguardi, ripresa, risultato unico |
| `scripts/services/recruitment.gd` | Estratte, obiettivo, garanzia e duplicati |
| `scripts/services/platform_services.gd` | Interfaccia unica per pubblicità e acquisti; simulazione su PC |
| `scripts/services/audio.gd` | Bus, volumi, musica e suoni |
| `scenes/city/city.tscn`, `scripts/city/city.gd` | Griglia, selezione, piazzamento e rappresentazione degli edifici |
| `scenes/missions/mission_root.tscn`, `scripts/missions/mission_director.gd` | Carica MissionDef e applica il tipo di obiettivo |
| `scripts/missions/advance_rules.gd` | Settori, bersagli e scorte dell'Avanzata |
| `scripts/missions/recovery_rules.gd` | Recuperi, macchinari e rientro |
| `scripts/missions/defense_rules.gd` | Preparazione, fasi e obiettivo protetto |
| `scenes/actors/player.tscn`, `scripts/actors/player.gd` | Movimento, attacco, abilità e strumento |
| `scenes/actors/enemy.tscn`, `scripts/actors/enemy.gd` | Sei comportamenti configurati da dati, senza sei gerarchie separate |
| `scenes/world/interactable.tscn`, `scripts/world/interactable.gd` | Casse, barili, leve, depositi e dispositivi |
| `scenes/ui/`, `scripts/ui/` | Menu, HUD e pannelli descritti in sezione 11 |
| `data/characters/`, `data/buildings/`, `data/tools/` | Definizioni `.tres` con identificativi stabili |
| `data/missions/`, `data/economy.tres`, `data/contracts.tres` | Missioni, formule e obiettivi |
| `assets/models/`, `assets/materials/`, `assets/ui/`, `assets/audio/` | File finali con provenienza registrata |
| `tests/` | Verifiche significative di transazioni, economia, missioni e salvataggio |
| `build/` | Esportazioni locali ignorate da Git |

Registrare come autoload, nell'ordine: Catalog, ProfileStore, Progression, Recruitment, MissionSession, PlatformServices, Audio. Main gestisce la navigazione; i servizi non cercano nodi dell'HUD. La scena Player ha radice CharacterBody3D, collisione capsula, modello, punto di tiro e sensori di interazione. MissionRoot contiene geometria statica, attori, interazioni, percorso di navigazione e camera. L'HUD è un Control dentro CanvasLayer.

I servizi emettono segnali dopo una modifica persistita: `balance_changed`, `ownership_changed`, `mission_changed`, `purchase_finished`. L'HUD legge il nuovo stato; non decide se un premio sia dovuto. Nodi temporanei vengono rimossi a fine frame. La scena missione non contiene una copia indipendente del saldo cittadino. [Composizione di scene Godot](https://docs.godotengine.org/en/stable/tutorials/scripting/nodes_and_scene_instances.html).

## 4. Coordinate, movimento e combattimento

### 4.1 Spazio e input

Un'unità mondo equivale a un metro di riferimento. Piano XZ, Y verticale; avanzamento lungo +Z. Personaggio raggio 0,35 m, altezza 1,6 m; nessun salto. Velocità 4,5 m/s, accelerazione 24 m/s², arresto 32 m/s²; vettore diagonale normalizzato. Collider statici per muri, CharacterBody per attori, Area per raccolta; separare collisioni mondo, attori, proiettili, interazioni e raccolte.

Geometria percorribile piatta a Y=0; radice degli attori ai piedi e centro della capsula a Y=0,8. Movimento limitato a XZ, nessuna caduta o pendenza da simulare. Le rampe del kit sono decorative e fuori dal percorso utile. Punto di tiro Y=0,9, traiettorie orizzontali; muri laterali impediscono di uscire dal livello. In futuro un terreno con quote diverse richiederebbe una modifica esplicita di questa base.

| Azione | PC di sviluppo | Touch |
|---|---|---|
| `move_left/right/up/down` | A/D/W/S e frecce | Trascinamento nella metà sinistra libera dell'HUD |
| `ability` | Spazio | Pulsante destro principale |
| `tool` | E | Pulsante destro secondario |
| `interact` | F, per azioni non automatiche | Pulsante contestuale vicino al lato destro |
| `target` | Clic sinistro sul mondo | Tocco sul mondo fuori dai controlli |
| `pause/back` | Esc | Pausa e comando Indietro di sistema |

Touch: joystick relativo al punto iniziale del trascinamento, raggio 80 pixel logici, zona morta 12%; separare gli identificativi delle dita per muoversi e usare abilità contemporaneamente. Un tocco sui pulsanti non seleziona bersagli nel mondo. Camera ortografica, inclinazione 55°, ampiezza iniziale 22 m; segue con costante di assestamento 0,15 s e anticipazione di 3 m lungo il movimento. In Avanzata segue l'asse lungo del percorso; nelle arene viene limitata ai bordi. Zoom automatico solo per adattare il rapporto di schermo, senza nascondere gli avvisi fuori campo.

### 4.2 Valori iniziali comuni

| Parametro | Valore proposto |
|---|---:|
| Integrità del personaggio al livello 1 | 100 |
| Danno base / intervallo / portata | 10 / 0,4 s / 8 m |
| Velocità del proiettile del giocatore | 24 m/s |
| Raccolta automatica | Raggio 1,5 m |
| Immunità fra danni ricevuti | 0,35 s; non protegge l'obiettivo |
| Distanza di uso di una leva o macchina | 1,5 m |
| Tempo di attivazione interazione | 0,4 s continuo, interrotto dal movimento |
| Raggio del barile / danno | 3 m / 40 a nemici e strutture; avviso di 0,8 s |
| Cassa temporanea | Un effetto dichiarato; due colpi base per aprirla |

Autoattacco: scegliere prima il bersaglio indicato se vivo, visibile e a portata; altrimenti il nemico visibile più vicino. Se non c'è un nemico valido, lavorare l'interazione recuperabile selezionata o più vicina entro 2 m. Il bersaglio selezionato esplicitamente può essere una struttura anche durante lo scontro. Non sparare attraverso muri solidi. Danno alle strutture recuperabili usa lo stesso attacco base; gli attrezzi lo modificano. Il recupero non richiede un eroe particolare.

Applicare prima il danno base con livello, poi bonus funzionali pertinenti, poi riduzione della protezione del bersaglio. Arrotondare il danno finale a un intero, minimo 1 se il colpo è valido. Bonus dello stesso attributo riferiti alla base si sommano; non vengono moltiplicati fra loro. Integrità e danno del personaggio al livello l: base × [1 + 0,02 × (l−1)]. Nessun nemico scala automaticamente sul livello posseduto.

Collisioni dei colpi verificate sul segmento fra posizione precedente e successiva, per non saltare bersagli sottili. Proiettili del giocatore danneggiano nemici e interazioni ostili/recuperabili, mai alleati; quelli nemici danneggiano attivo, carico e obiettivo. La barriera assorbe prima il danno; l'integrità perde solo il residuo. La raccolta non usa collisioni solide fra pickup e personaggio.

### 4.3 Sei minacce

| ID | Integrità; velocità | Azione | Segnale e risposta |
|---|---|---|---|
| N1 inseguitore | 20; 2,8 m/s | Colpo da 8 entro 0,9 m ogni 1,2 s | Preparazione 0,4 s; spostarsi o interrompere |
| N2 tiratore | 35; 1,8 m/s | Si ferma a 7 m, proiettile da 10 ogni 2 s, velocità 8 m/s | Linea e preparazione 0,7 s; evitare o usare copertura |
| N3 ariete | 60; 2 m/s | Carica 6 m a 7 m/s, danno 18, recupero 4 s | Corsia marcata 1 s; scansarsi, poi vulnerabile per 1,5 s |
| N4 protettore | 80; 1,4 m/s | Riduce del 35% il danno ai nemici entro 3 m; nessuna aura su sé stesso | Collegamento visibile; colpire il protettore o separare i bersagli |
| N5 disturbatore | 45; 2 m/s | Area di raggio 2 m, danno 6 e rallentamento 25% per 2 s, ogni 4 s | Cerchio anticipato 1 s; uscire dall'area |
| N6 macchina prioritaria | 180; 0,8 m/s | Va sull'obiettivo, danno 20 ogni 3 s entro 1 m | Sagoma grande, bersaglio prioritario; interrompere, deviare o distruggere |

N6 senza obiettivo protetto avanza verso il personaggio. N4 non rende invulnerabile nessuno. Le aure dello stesso tipo non si sommano. Evitare danni di contatto automatici: gli attacchi seguono preparazione e recupero. Fuori vista, indicare la direzione dei pericoli che possono raggiungere la camera. La navigazione usa una griglia di celle da 1 m aggiornata quando cambia una struttura: A* con diagonali solo se i due lati sono liberi; nessuna rigenerazione del navmesh per ogni frammento.

Priorità bersaglio: richiamo H08 valido entro il suo raggio; altrimenti N6 verso obiettivo pertinente, gli altri verso l'attivo. N4 segue il nemico alleato più vicino senza entrare nelle coperture; se solo, segue l'attivo. N2 si riposiziona se non ha linea di tiro. N3 blocca la direzione dopo il preavviso e non curva durante la carica. N5 colloca l'area sulla posizione dell'attivo al momento dell'avviso, non la segue dopo. Raggi fisici: N1/N2/N5 0,35 m; N3/N4 0,5 m; N6 0,7 m. Le soglie di passaggio della griglia considerano l'ingombro.

Difficoltà ordinaria: valori di tabella. Impegnativa: integrità nemica ×1,15 e un N2 aggiuntivo nell'ultimo incontro. Avanzata: integrità ×1,30 e aggiunta di un N2 e un N3 nell'ultimo incontro. Danni e segnali anticipatori restano invariati. Premi ×1/1,4/1,8 secondo il modello economico. L'aumento di integrità è limitato e non sostituisce le combinazioni progettate.

## 5. Contratto dei dati

I dati sono Resource tipizzate, con validazione all'avvio in sviluppo. In esportazione, catalogo invalido impedisce di iniziare una nuova partita ma non sovrascrive il profilo. Gli identificativi non cambiano dopo una distribuzione; i nomi visibili sono separati.

| Definizione | Campi obbligatori |
|---|---|
| CharacterDef | id, nome_testo, scena, base_hp, base_damage, intervallo, portata, ability_id, support_id, upgrade_ids[6] |
| UpgradeDef | id, destinatario, costo_MCK, effetto, attributo, valore, unità; nessun requisito di un altro ramo |
| BuildingDef | id, ingombro, livelli[10], upgrade_ids, producer_resource facoltativa, stati_visivi |
| ToolDef | id, costo_MCK, effetto, cariche=2, recupero, raggio, durata |
| EnemyDef | id N1–N6, scena, integrità, velocità, attacco, preparazione, recupero |
| MissionDef | id, modo, schema, variante, dimensioni, spawn, ostacoli, interazioni, eventi, milestone[3], condizione_finale, bonus_abilità |
| EventDef | id, trigger, condizione, azioni ordinate, spawn_positions, actor_ids, completato |
| InteractionGroupDef | id, weakpoint_id facoltativo, member_ids finiti, trasformazioni, danno/area facoltativi, warning_seconds |
| ContractDef | id, contatore, soglia, alternative, reward, finestra e regola di persistenza |
| CosmeticDef | id, contenuto_visivo, product_id facoltativo, modalità di ottenimento; nessun attributo funzionale |

Validare: unicità degli ID; riferimenti esistenti; spazi missione raggiungibili; tre milestone da 20% più finale da 40%; tutti i costi finiti e non negativi; totale probabilità 100%; recuperi positivi con tutti gli upgrade; ingredienti ottenibili senza eventi obbligatori. Controllare anche member_ids dei collegamenti, assenza di spawn sovrapposti ai raccordi e presenza dei bersagli necessari ai bonus nel manifest risolto. Generare un rapporto con ID e causa; non correggere silenziosamente i dati in esecuzione.

## 6. Stati delle missioni, premi e interruzioni

Stati: `PREPARAZIONE → ATTIVA → RISULTATO → CHIUSA`; `SOSPESA` conserva lo stato precedente e `ABBANDONATA` produce un risultato parziale. Una sola missione attiva per profilo. Nessun consumo di energia o costo di partenza.

Prima della partenza salvare scelta di missione, difficoltà, priorità, attivo, supporti e strumento. Generare `run_id` e seed; risolvere le statistiche della formazione in una fotografia valida per quella partita. Non si acquistano upgrade durante la missione; un acquisto dopo il risultato vale dalla successiva.

Le tre milestone ordinarie riconoscono il 20% ciascuna; la conclusione il 40%. Salvare milestone e saldo nella stessa transazione. Casse, nemici e recuperi del livello sono contributi agli obiettivi, non ulteriori accrediti di risorse cittadine: il modello economico non viene raddoppiato da ogni animazione. Depositi opzionali assegnano solo il bonus di abilità previsto, massimo 20% complessivo. I rifornimenti locali di Difesa non sono valuta cittadina.

Per ogni risorsa calcolare a precisione piena il premio ordinario della difficoltà e priorità scelte. Alla quota cumulativa q accreditare `floor(premio × q) − già_accreditato`. Così 20/40/60/100% non perde né duplica unità per arrotondamenti separati. Sconfitta o abbandono conservano la quota realmente maturata. Integrità dell'attivo o obiettivo a zero conclude con sconfitta; il completamento simultaneo prevale solo se l'obiettivo finale era già registrato prima del danno letale nello stesso tick.

Sospensione: fermare la simulazione, salvare timer di gioco, posizione e integrità degli attori, seed e stato RNG, recuperi, cariche, effetti temporanei, interazioni, oggetti presi ed eventi. Le attese degli attacchi usano tempo simulato, non orologio civile. Salvataggio a milestone, evento irreversibile, cambio fase, raccolta unica e ogni 5 s mentre si gioca; in pausa e perdita di focus immediato. Ricostruire per ID; nessuna nuova generazione al ripristino.

Un'interruzione improvvisa può riportare allo snapshot precedente, fino a 5 s per movimento e combattimento ordinario; nessun premio può essere duplicato. Tornando all'app mostrare «Riprendi» e «Abbandona e conserva i traguardi». Un esito concluso ha un receipt immutabile: riaprire il pannello non ripete l'accredito.

## 7. Difesa e interazioni comuni

Obiettivo protetto base: integrità 300. Scorta: 200. Dispositivi iniziali gratuiti: una barriera e una torre, piazzabili in due piazzole entro 8 m dall'obiettivo. La barriera ha 120 integrità e ingombro 2×1 m; la torre 80, danno 6 ogni 0,8 s entro 6 m. I nemici possono aggirare le barriere; il piazzamento non deve chiudere ogni accesso all'obiettivo.

Tre fasi, ciascuna composta da tre emissioni derivate dal pacchetto previsto. Prima emissione all'inizio; la successiva quando la precedente ha finito gli spawn e almeno metà dei suoi attori è eliminata, arrotondando per eccesso. Restano attivi gli eventuali superstiti. La fase termina quando tutte e tre le emissioni e le loro minacce sono risolte: non si aspetta un timer dopo aver già vinto. Obiettivo di ritmo 25–40 s per fase, da tarare con osservazioni, non durata garantita. Dopo fase 1 e 2, 5 s di preparazione facoltativamente saltabili. La terza termina con l'ultimo nemico, poi conclusione. Rifornimenti locali: 10 per N1/N2/N5, 15 per N3/N4 e 25 per N6, raccolti automaticamente entro il raggio; 30 iniziali. Riparazione contestuale: 20 rifornimenti per 40 integrità, recupero 4 s; torre aggiuntiva su piazzola: 40, massimo due torri aggiuntive. Nessun acquisto di rifornimenti reali.

Trasformazioni delle emissioni, applicate ai dati prima di iniziare la missione; non aggiungono attori rispetto a tre copie del pacchetto:

| Emissione | Composizione | Accessi |
|---|---|---|
| 1 — lettura | Pacchetto base; se W6, sostituire N6 con N3 | Accesso base della fase |
| 2 — aggiramento | Sostituire il primo N1 con N2 in fase 1, con N5 nelle fasi 2–3; se W6, sostituire anche N6 con N3 | Se base N: O; se base O: E; se base E: O |
| 3 — conclusione | Se non contiene già N3 o N6, sostituire il primo N1 con N3; altrimenti conservare il pacchetto | Metà degli attori all'accesso base, resto al secondario: E per base N, N per base O/E |

La metà al fronte base si arrotonda per eccesso. Avviso freccia + sagoma del nemico per 2 s prima di ciascuna emissione; il timer fa parte della missione salvata. Durante l'avviso il giocatore resta libero. Le aggiunte di variante e difficoltà avvengono solo dopo queste trasformazioni, nell'ultima emissione interessata. Una fase W6 contiene così un solo N6; gli altri due interventi hanno problemi diversi. DI02 marca con `gate_phase3` gli attori emessi dall'accesso E nella fase 3; DI05 applica i terminali alla torre più vicina entro 8 m, altrimenti mostra che non c'è una torre utile e non avvia il recupero del terminale.

Macchinari: interruttore entro portata, 0,4 s per attivarlo; avviso 1 s prima del cambiamento, poi applicazione di uno stato predefinito (aperto, spento, recuperato). Struttura recuperabile comune: 30 integrità; grande: 60. Barile esplosivo: 10. Nessun collasso fisico generale: animazione, sostituzione del pezzo e aggiornamento di collisione e griglia nello stesso evento.

Oggetti temporanei Avanzata: tre casse complessive, due nel primo settore e una nel terzo, con assegnazione esplicita di PROGETTO §20.2. Effetti: penetrante (+1 bersaglio per colpo), esplosivo (+6 danni in raggio 1,5 m su ogni impatto valido), ampiezza (+0,25 m alla tolleranza del colpo). Tutti si cumulano e si possono recuperare nella stessa partita. Un singolo proiettile può infliggere il proprio danno diretto una volta e il contributo esplosivo una volta a ciascun bersaglio: attraversare tre nemici vicini non moltiplica tre volte l'esplosione sul medesimo attore. Il penetrante attraversa attori e bersagli ambientali fragili, mai muri solidi. La linea di tiro per la selezione considera i muri solidi come occlusori; un nemico davanti non impedisce di mirare al barile dietro, ma può intercettare il colpo non penetrante. La cassa mostra l'effetto prima dell'apertura e lo applica al recupero; nessun sorteggio nascosto. Alla chiusura gli effetti temporanei terminano; le proprietà permanenti restano.

Tre interazioni ambientali condivise, nello script Interactable e nei dati EventDef:

- Collegamento fragile: distruggere il raccordo applica una sola trasformazione a tutti i member_ids del gruppo; ogni membro conserva l'ID e passa allo stato aperto/demolito. Rompere i membri separatamente rimane valido. Raccordo e membri già risolti non producono una seconda trasformazione o altro bottino.
- Catena di barili: l'esplosione ordinaria può armare un altro barile entro il proprio raggio; avviso iniziale 0,8 s, poi ogni barile successivo mantiene almeno 0,12 s di segnale prima di esplodere. Il gruppo predisposto nel livello contiene al massimo sei barili, senza generazione di altri oggetti. Una coppia sorgente/bersaglio infligge danno una sola volta; un barile non esplode due volte. Il limite del gruppo è di costruzione del livello, non un tetto agli upgrade permanenti.
- Macchina: mostrare un rettangolo 2×5 m prima dell'uso, avviso di 1 s dopo l'attivazione, danno 40 a nemici e strutture recuperabili nella striscia; non danneggia attivo o obiettivo alleato. Una sola attivazione per le macchine RE03/RE06; l'apertura prevista avviene anche se nessun nemico era presente. In RE03 il rettangolo si estende dal centro macchina verso −Z, in RE06 verso +Z.

I danni ambientali hanno source_id della macchina o del barile; gli oggetti aperti dal raccordo registrano il weakpoint_id. Salvare membri risolti, barili armati, tempi residui e cause: riprendere una partita non replica una catena e non riapre i recuperi. Effetti di gruppo e conteggi dei bonus derivano dagli stessi eventi, senza una seconda simulazione per il risultato.

## 8. Economia applicativa e salvataggio

Formule e cataloghi economici hanno come fonte [BENCHMARK-PROGRESSIONE-EVENTI.md](BENCHMARK-PROGRESSIONE-EVENTI.md). Usare interi per M/C/K e frazioni razionali per progressi esperienza e AFK; non usare il testo di un'etichetta come valore economico.

Operazione di acquisto: controllare ID, possesso e prezzo corrente; verificare tutte le risorse; preparare il nuovo profilo completo; salvare; sostituire lo stato in memoria; notificare l'interfaccia. Se la scrittura fallisce, saldo e proprietà precedenti restano validi e il pulsante permette di riprovare. Un doppio tocco con la stessa operation_id restituisce il primo esito. Non fare un primo salvataggio con l'addebito e un secondo con il possesso.

Schema del profilo versione 1:

| Campo | Contenuto |
|---|---|
| identity | profile_id casuale locale, schema_version, revision, creation_time |
| wallet | M, C, K interi non negativi |
| city | Area acquistata, posizioni e rotazioni, livello per edificio, upgrade posseduti e decorazioni |
| roster | ID posseduti, livello 1–30, sei acquisti e quota esperienza per profilo |
| loadout | Attivo, due supporti distinti facoltativi, strumento posseduto facoltativo |
| recruitment | Obiettivo non posseduto, contatore 0–19, stato RNG e storico ultimo risultato |
| afk | Timestamp ultimo conteggio, frazione per risorsa, accumulo e cap per produttore |
| objectives | Missioni completate, maestrie, contratti accettati e contatori |
| active_run | Snapshot completo della sezione 6 o nullo |
| results | Riepiloghi degli ultimi 20 esiti; registro compatto persistente di run_id, quote e flag di bonus già riconosciuti |
| commercial | Cosmetici posseduti e operazioni da riconciliare; nessun segreto |
| settings | Lingua, audio, vibrazione, effetti ridotti, scala HUD, qualità |
| onboarding | Dotazione consegnata, personaggio iniziale scelto, tutorial visto o saltato |

Scrivere JSON leggibile in `user://profile.tmp`, verificare deserializzazione e versione, conservare il precedente valido come `profile.bak`, quindi promuovere il temporaneo a principale con sostituzione atomica dove supportata. La promozione è il punto di commit: soltanto dopo si notifica il successo. All'avvio preferire il principale valido, altrimenti proporre il backup valido. Un temporaneo non promosso non prova che l'acquisto sia stato confermato e non viene recuperato automaticamente come revisione più recente; conservarlo per diagnostica o scartarlo dopo il ripristino. La migrazione prepara una nuova copia e conserva l'originale; versione sconosciuta più recente non viene sovrascritta. Il checksum rileva corruzione accidentale, non dimostra assenza di manipolazione.

Nuovo profilo: una sola assegnazione di 120/60/200, Centro, Deposito 1 e personaggio scelto. Nessun tutorial necessario; senza strumento si può giocare e comprarlo dopo. Il salvataggio della dotazione e del flag avviene nella stessa operazione.

AFK: per ogni produttore, conteggiare il tempo positivo dall'ultimo riferimento fino al cap ancora libero, accumulare la frazione con il vecchio tasso, poi applicare modifiche. Nessun produttore significa zero per quella risorsa. A cap pieno non si memorizza tempo illimitato da convertire dopo un upgrade. Raccolta e azzeramento accumulo sono atomici; l'inventario attivo non ha cap. Orologio indietro: delta zero; orologio avanti: massimo cap. Sono regole locali, non protezione anti-cheat garantita.

Gacha: transazione unica comprendente addebito, sorteggio, possesso/rimborso, contatore e stato RNG successivo; nessun nuovo sorteggio su semplice riapertura del risultato. Garanzia: se contatore=19 assegnare l'obiettivo, altrimenti selezione uniforme degli otto; obiettivo ottenuto azzera, altro risultato incrementa. Cambio obiettivo conserva il contatore. Se non resta un obiettivo valido, disabilitare nuove estrazioni. Tutte le probabilità e la via diretta sono visibili prima della conferma.

## 9. Contratti e maestrie

Tre spazi giornalieri, non un quarto slot acquistabile. Giorno locale riferito alla data di sistema, senza più rinnovi quando l'orologio torna indietro; questa regola non certifica sicurezza contro cambi di ora. Un incarico accettato occupa il proprio spazio fino a conclusione o rinuncia senza costo; la rinuncia non genera nuovi incarichi oltre quelli assegnati per quel giorno. Contano solo eventi successivi all'accettazione.

| Spazio | Alternative offerte | Premio alla conclusione |
|---|---|---|
| G1 | Completa 2 missioni qualsiasi oppure raggiungi 6 milestone | 6 M / 3 C / 10 K |
| G2 | Recupera 3 apparati in Recupero oppure completa 2 scorte/recuperi laterali | 6/3/10 |
| G3 | Completa 2 difese oppure elimina 30 minacce in qualsiasi attività | 6/3/10 |

Progetto settimanale: traguardi a 3, 6, 10, 15 e 20 missioni concluse dall'accettazione, ognuno 12/6/20. Una sola riscossione per traguardo; può continuare oltre la settimana. Alla conclusione: emblema estetico; se già posseduto scegliere il primo arredo gratuito non posseduto dal catalogo base, poi solo riconoscimento nel registro, senza estrazioni obbligatorie. Un nuovo progetto non sovrappone un secondo arretrato.

Maestria per ciascuna delle 18 missioni: completamento ordinario; completamento impegnativo; completamento avanzato con bonus di abilità intero. Tre segni permanenti, premio unicamente emblemi e varianti estetiche gratuite; nessun upgrade funzionale richiede le maestrie. Il bonus di abilità della missione continua a dare le risorse previste anche se la maestria è già stata ottenuta.

## 10. Grafica, audio e distinta minima

Direzione proposta: area di recupero industriale diurna, forme semplici, terreno neutro, materiali recuperabili ben distinti, segnaletica con sagome oltre al colore. Nessun ciclo giorno/notte, meteo simulato, dialogo ramificato o doppiaggio necessario alle missioni. I nomi funzionali attuali restano identificativi di lavoro; il titolo commerciale non impedisce la produzione dei sistemi.

| Gruppo | Distinta del profilo C01 |
|---|---|
| Terreno e muri | Pavimento, bordo, parete diritta, angolo, cancello, rampa decorativa senza salto |
| Interazioni | Cassa, barile, deposito piccolo/grande, detrito rimovibile, leva, macchina, apparato, carico, uscita |
| Attori | Un rig umano comune con otto equipaggiamenti/sagome; cinque sagome nemiche mobili e una macchina N6 |
| Difesa | Obiettivo, barriera, torre e relative versioni danneggiate |
| Città | Centro e nove tipi di edificio; tre stati visivi per tipo per livelli 1–3, 4–6, 7–10 |
| Decorazioni gratuite | Panchina, albero, lampione, cassa ornamentale, aiuola, statua; varianti di materiale |
| Animazioni | Idle, cammino, attacco, abilità, danno e caduta; attrezzi come elementi agganciati, non rig separati |
| Effetti | Colpo, impatto, esplosione, barriera, guarigione, interruzione, raccolta e acquisto |
| Audio | Due tracce in loop (città, missioni); 16 eventi sonori: UI, acquisto, tiro, impatto, danno, morte, esplosione, raccolta, apertura, leva, abilità, strumento, allarme, fase, vittoria, sconfitta |
| UI | Icone per 3 risorse, 8 profili, 5 strumenti, 10 edifici, 6 minacce, difficoltà, pausa, audio e stati commerciali |

Asset esterni: usare i candidati già ricercati, scegliendo solo quelli compatibili con dimensioni e licenza. Dove manca un elemento, la distinta indica cosa modellare; non cambiare regole per adattarsi a un pacchetto. Registro in `assets/ATTRIBUTIONS.md`: file, autore, URL, revisione, licenza, obblighi e modifiche. Elementi AI richiedono lo stesso registro dei termini d'uso. Nessun asset candidato è già importato.

Bus audio Master/Music/SFX/UI; livelli iniziali Music −18 dB, SFX −8 dB, UI −10 dB, Master 0 dB, modificabili. Limitare a 12 suoni simultanei; variare pitch degli impatti ±5%; nessuna musica adattiva complessa. Ridurre Music di 4 dB per 1 s durante allarmi. Vibrazione breve facoltativa per danno e acquisto. Effetti ridotti disabilita shake e flash intensi, conserva segnali di pericolo.

## 11. Schermate e comportamento

| Schermata | Contenuto e azioni | Casi da gestire |
|---|---|---|
| Avvio | Caricamento profilo, nuovo gioco, ripresa | Profilo corrotto: proposta di backup; nessun reset automatico |
| Scelta iniziale | Otto profili con abilità e scelta gratuita | Una sola scelta persistita; cambio di selezione prima della conferma gratuito |
| Principale | Gioca, città, personaggi, reclutamento, obiettivi, impostazioni | Ripresa missione prioritaria; nessun popup commerciale obbligatorio |
| Attività | Tre modalità, missioni, difficoltà, priorità e premio | Tutte visibili senza capitoli; indicare sfida più impegnativa senza bloccarla |
| Formazione | Attivo, supporti, strumento e riepilogo effetti | Supporti vuoti validi, nessun duplicato nei tre posti |
| HUD missione | Integrità, obiettivo, traguardi, abilità, cariche, pausa | Non mostrare il bottino come saldo definitivo prima della milestone |
| Risultato | Quote ordinarie, bonus di abilità, saldo, obiettivo di acquisto | Continua, cambia attività, città, bonus pubblicitario facoltativo |
| Città | Vista griglia, selezione edificio, sposta, ruota, amplia | Preview verde/rossa con motivo; movimento edificio gratuito |
| Catalogo | Costo, effetto attuale e successivo, risorse mancanti | Saldo insufficiente: resta aperto, nessun acquisto o pubblicità forzata |
| Personaggio | Livello, sei upgrade, quota esperienza e costo residuo | Con tutti gli acquisti, nessun pulsante lascia intendere un ramo esclusivo |
| Reclutamento | Catalogo, diretto, estrazione, obiettivo, probabilità e contatore | Conferma mostra costo reale; risultato già assegnato non ripete l'operazione |
| Obiettivi | Contratti, progetto settimanale e maestrie | Progetto oltre scadenza ancora completabile; nessuna perdita del progresso |
| Negozio estetico | Preview, contenuto, prezzo localizzato, posseduto e ripristino | Prodotti non caricati: acquisto disabilitato con motivo, gioco disponibile |
| Impostazioni | Italiano/inglese, volumi, vibrazione, effetti ridotti, HUD 100/115/130%, qualità | Back senza perdita; reset profilo separato con conferma esplicita |

Testi di servizio di partenza: «Salvataggio non riuscito. Riprova.»; «Acquisto in attesa»; «Annuncio non disponibile»; «Riprendi la partita»; «Conserva i traguardi e rientra». Traduzioni in CSV con chiavi stabili, italiano e inglese affiancati; i testi commerciali riportano solo contenuto reale e condizioni pertinenti. Non pubblicare note sulle decisioni dell'agente nelle interfacce.

Il risultato può mostrare un solo acquisto fissato dal giocatore: effetto, costo totale e risorse mancanti, aggiornati dopo il premio. Se è acquistabile senza piazzamento, il pulsante usa la stessa transazione del catalogo e poi lascia disponibile Continua; per una costruzione apre la preview della città. Nessuna selezione automatica di un ramo e nessun acquisto della missione già chiusa ne riscrive il risultato. I suggerimenti iniziali su bersaglio, interazione e raccolta sono chiudibili, non bloccano la simulazione e non consegnano un'altra dotazione.

Area sicura applicata a tutti i Control; pulsanti touch almeno 64×64 pixel logici, distanza 12; testo ordinario 24 pixel logici. Finestra PC 1280×720 di partenza, verifica anche 1024×576 e 1920×1080; Android prova rapporti 16:9, 20:9 e tablet 4:3, oltre al telefono fisico disponibile. Lo spazio 3D può estendersi, l'HUD resta raggiungibile e la camera non rivela percorsi fuori dal livello.

Nella formazione mostrare quando un supporto non ha un bersaglio pertinente nella missione scelta, per esempio H04 senza pericoli ambientali. È un'informazione, non un blocco della formazione né una richiesta di possedere un eroe specifico.

## 12. Prestazioni e opzioni

Obiettivi tecnici proposti, da misurare: modalità standard 60 fps sul telefono di riferimento se sostenibile; qualità bassa con limite 30 fps; nessun blocco superiore a 0,25 s durante azione ordinaria; apertura missione entro 5 s dopo il caricamento iniziale sul dispositivo di riferimento. Non costituiscono dichiarazioni di supporto hardware.

Budget iniziale: massimo 40 nemici attivi, 80 proiettili e 30 gruppi di pickup; effetti riutilizzati e pickup raggruppati. Se lo spawn raggiunge il limite, conservarlo in coda senza eliminare minacce necessarie al completamento. Nessuna luce dinamica per proiettile; una luce direzionale, ombre disattivabili; ambienti modulari con materiali condivisi. La qualità bassa riduce ombre, particelle e scala del rendering 3D, senza cambiare regole o leggibilità.

Misurare prima CPU/GPU e allocazioni; ottimizzare il collo di bottiglia osservato, non riscrivere l'architettura per ipotesi. Annotare dispositivo, OS, build, preset e durata della sessione. Un frame rate ottenuto nell'editor sul PC non certifica quello del telefono.

## 13. Pubblicità, acquisti e modalità di sviluppo

`PlatformServices` espone operazioni logiche: disponibilità rewarded, richiesta bonus per result_id, caricamento prodotti, acquisto, ripristino e stato preferenze. Nessun riferimento al plugin nelle scene di missione. In editor un adattatore simulato permette successo, annullamento, errore e callback ripetuto; mostra chiaramente che è simulazione e non eroga acquisti reali.

Base candidata pubblicitaria: Poing Studios Godot AdMob, documentazione primaria del progetto; base candidata fatturazione: GodotGooglePlayBilling, plugin collegato dalla documentazione Godot. Fissare tag/commit e dipendenze in `DEPENDENCIES.md` quando vengono effettivamente scaricati; verificare export minimo prima dell'integrazione completa. [AdMob del fornitore](https://github.com/poingstudios/godot-admob-plugin), [Billing Godot](https://github.com/godot-sdk-integrations/godot-google-play-billing). Non si promette compatibilità già verificata dei due candidati con il motore scelto.

Rewarded: bonus del 20% del premio ordinario effettivo, arrotondato per difetto per risorsa, massimo tre risultati per data locale. Non includere bonus di abilità o contratti nella base. Prima dell'apertura salvare operation_id, result_id, data, premio ordinario e bonus calcolato, slot riservato e stato. Accredito solo dopo callback valida per quell'operazione, una volta. Prenotazioni ancora aperte e bonus già assegnati occupano insieme al massimo tre slot; il conteggio e l'accredito si aggiornano nella stessa transazione. Mancata disponibilità o annullamento definitivo libera la prenotazione senza consumare un premio. Callback tardivo accettato solo se l'operazione è ancora aperta o in riconciliazione; dopo chiusura definitiva si ignora e si registra l'anomalia, senza riutilizzare uno slot già liberato. La sequenza di finalizzazione segue l'ordine degli eventi documentato dal provider; la semplice scomparsa del video non prova l'assenza di una callback premio ancora da consegnare. Riavvio con operazione incerta non genera bonus gratuito: riconciliare se il provider lo permette, altrimenti annullare e lasciare il risultato base acquisito. Non mostrare due annunci contemporanei e non bloccare il gioco per una riconciliazione. Interruzione a metà senza callback non assegna il bonus. Usare unità e dispositivi di test fino alla distribuzione; non cliccare annunci reali per verificarli.

Acquisti proposti non consumabili, puramente estetici: `city_copper` (materiali urbani rame/ardesia), `crew_sand` (abiti e accessori sabbia/verde per il rig comune), `supporter_mark` (emblema e piazza ornamentale). Prezzi di prova da valutare: 2,99 €, 2,99 €, 4,99 € come riferimento del mercato euro; il gioco mostra sempre il prezzo localizzato restituito dallo store. Non sono prezzi approvati, né una previsione di vendite. Nessun abbonamento o catalogo settimanale da produrre.

Flusso billing: dettagli caricati → conferma store → PENDING senza premio oppure PURCHASED → verifica disponibile → registrazione del possesso → acknowledgement → riconciliazione all'avvio/ripristino. Product ID e package devono coincidere; non accettare una stringa ricevuta da un pulsante come prova. Token già elaborato restituisce lo stesso diritto, non un secondo bene. Non consumare prodotti permanenti. Errore di query non revoca un diritto precedentemente riconosciuto; una revoca richiede stato autorevole, non assenza temporanea di rete. Nessuna chiave privata nel client.

Google raccomanda verifica e acknowledgement su backend: [fonte primaria](https://developer.android.com/google/play/billing/security). La proposta semplice locale non offre questa protezione: per soli cosmetici può usare riconciliazione client con un rischio dichiarato di manomissione, da valutare prima della vendita. Controllare firma e campi con gli strumenti effettivamente offerti dall'integrazione; se la prova non è verificabile, non dichiararla verificata e mantenere l'acquisto in riconciliazione. Se si richiede protezione autorevole, il lavoro aggiuntivo è un servizio di verifica (token unici, Google Play Developer API, risposta di entitlement e gestione revoche), con costi e credenziali separati. Non è nascosto dentro «integrare acquisti» e non è un server obbligatorio del gameplay.

Le preferenze pubblicitarie e gli adempimenti effettivi sono gestiti con la configurazione UMP pertinente all'app e ai mercati scelti. Prima di ottenere stato valido non richiedere annunci; il gioco rimane disponibile. Riferimento: [Google UMP](https://developers.google.com/admob/android/privacy).

## 14. Verifiche da eseguire durante lo sviluppo

| ID | Preparazione e azione | Esito atteso |
|---|---|---|
| T01 | Nuovo profilo, saltare e poi rivedere tutorial | Una dotazione, un profilo scelto, nessun doppio premio |
| T02 | Possedere risorse sufficienti; comprare upgrade in ordini diversi | Stesse proprietà finali e prezzi, tutti gli upgrade cumulati |
| T03 | Acquisto con saldo insufficiente / doppio clic / scrittura fallita | Nessun saldo negativo, una sola operazione oppure nessuna modifica |
| T04 | Quattro priorità e tre difficoltà; completare ogni quota | Premi uguali alle formule e nessuna perdita per arrotondamento incrementale |
| T05 | Sconfitta dopo milestone 1, poi nuova partita | Conservato 20%, nessun premio finale, nuovo risultato indipendente |
| T06 | Sospendere dopo cassa e danno, terminare processo e riprendere | Oggetti, integrità e quote ripristinati, nessuna rigenerazione |
| T07 | Corrompere il principale con backup valido | Recupero esplicito, nessun reset o sovrascrittura del backup valido |
| T08 | AFK senza produttori, a cap, con upgrade e raccolte ravvicinate | Tassi e cap corretti, frazioni conservate, saldo attivo invariato dal cap |
| T09 | Sequenza di 19 estrazioni senza obiettivo, poi ventesima | Garanzia certa, counter azzerato; cambio obiettivo non perde il conteggio |
| T10 | Comprare direttamente l'obiettivo; ottenere duplicati; completare roster | Nuovo obiettivo con conteggio conservato, rimborso 50 K, estrazioni disabilitate a catalogo completo |
| T11 | Ognuno degli otto profili in ciascuna attività, senza supporti | Obiettivi e interazioni accessibili, nessuna chiave esclusiva |
| T12 | Attivare tutti gli upgrade contemporaneamente | Recuperi positivi, cariche coerenti, nessun bonus annullato da un tetto nascosto |
| T13 | Rewarded annullato, premio valido, callback ripetuto e riavvio | Base sempre conservata, un bonus al massimo, tre risultati al giorno al massimo |
| T14 | Billing simulato e poi track di test: pending, annullato, acquistato, restore | Nessun premio in pending; diritti permanenti idempotenti e ripristinabili |
| T15 | Ogni missione e configurazione del manifest attivo | Obiettivo raggiungibile, spawn validi, tre milestone e uscita funzionanti |
| T16 | Touch a due dita, aree sicure, rapporti schermo e pause | Nessun comando bloccato o tocco duplicato, HUD leggibile |
| T17 | Sessione prolungata di 30 minuti sul dispositivo annotato | Nessuna crescita incontrollata di memoria, perdita di progressi o degradazione non spiegata |
| T18 | Installare una versione nuova sopra un profilo precedente | Proprietà conservate e migrazione verificata |
| T19 | Raccogliere le casse Avanzata in ordini diversi e combinare penetrazione/esplosione | Effetti mostrati in anticipo, tutti ottenibili, differenza visibile e nessun danno esplosivo duplicato sullo stesso bersaglio dal medesimo proiettile |
| T20 | Risolvere il medesimo recupero per demolizione diretta, raccordo e macchina dove previsti | Vie valide con vantaggi riconoscibili; stesse quote ordinarie e nessun requisito di eroe |
| T21 | Riprendere durante una catena o un avviso di Difesa | Nessun evento duplicato, tre emissioni diverse, numero previsto e quota finale invariati dopo la ripresa |
| T22 | Confrontare partita senza e con un upgrade funzionale posseduto | Cambiamento osservabile nel comportamento indicato, non soltanto nell'animazione di acquisto |
| T23 | Giocare sei missioni alternando attività, poi ripeterne una | Annotare decisioni, tempi senza azione, chiarezza delle cause e motivo della ripetizione; correggere i tratti in cui la scelta non cambia nulla |

Automatizzare soprattutto T02–T10 e T12, dove si controllano invarianti economiche e persistenti. T11, T15–T17 richiedono anche esecuzione osservata; non basta un test che legge il medesimo parametro che dovrebbe verificare. Registrare build, caso, atteso, ottenuto ed evidenza. I test di servizi simulati non sostituiscono quelli delle integrazioni reali.

## 15. Build, distribuzione e manutenzione

Per ogni consegna: validazione dei cataloghi, verifiche interessate, avvio da profilo nuovo e profilo esistente, esportazione debug riproducibile. Annotare motore, commit, dipendenze e build. Nelle release disattivare strumenti di debug, scorciatoie economiche e adattatori commerciali simulati; una validazione impedisce l'export release con flag di simulazione attivo.

Prima dell'invio Android: identificativo definitivo e versionCode crescente; AAB firmato; icone vere; testi e screenshot reali; contatti e privacy del titolare; dichiarazioni coerenti con plugin e dati effettivi; configurazione degli acquisti e degli annunci nei relativi account; esecuzione del percorso di test applicabile all'account reale. Il target API viene ricontrollato sul [requisito Google](https://support.google.com/googleplay/android-developer/answer/11926878?hl=it), non congelato sulla data del documento.

Conservare la chiave e le credenziali con backup separato, fuori da Git. La richiesta attuale non autorizza generazione o uso di identità commerciali. Il PC è l'ambiente di lavoro e verifica; un export desktop commerciale ha preset e distribuzione separati da decidere, senza trasformare il gioco Android in un'app web.

Dopo l'uscita, trattare prima perdita di progressi, acquisti e mancato avvio; poi difetti riproducibili del ciclo principale; poi taratura e nuovi contenuti. Ogni aggiornamento conserva lo schema o ne include la migrazione. Il registro dei problemi contiene versione, riproduzione e stato. Una nuova missione usa il contratto dati e T15; un nuovo personaggio richiede anche T11/T12. Nessuna aggiunta obbliga a ricomprare il catalogo precedente.

## 16. Feedback e ritmo applicativi

Il feedback rende leggibile l'effetto della decisione; non introduce un'altra economia o un punteggio combo da mantenere. Gli eventi di danno, apertura, catena, raccolta e acquisto usano preset comuni, con gli stessi budget grafici e sonori già previsti.

| Evento | Risposta proposta | Limite di leggibilità |
|---|---|---|
| Colpo ordinario | Suono breve, particelle locali, reazione del modello 80 ms | Nessuno shake o arresto globale su ogni proiettile |
| Distruzione di una struttura | Cedimento visivo di 180 ms, pezzi puramente visivi, percorso e collisione aggiornati subito | I frammenti non bloccano il personaggio né producono nuova valuta |
| Catena o macchina che risolve un gruppo | Suono più pieno, sequenza degli elementi evidente, piccolo offset camera fino a 0,06 m che decade in 120 ms | Mai cambiare posizione del corpo o coprire gli avvisi; shake disattivabile |
| Effetto temporaneo raccolto | Simbolo sull'attrezzo e traiettoria del colpo aggiornata; etichetta per 0,6 s | Movimento e abilità restano attivi, nessuna schermata di selezione obbligatoria |
| Upgrade permanente | Confronto dell'effetto e animazione locale dell'oggetto; riepilogo chiudibile subito | Non aggiungere una lunga sequenza di finestre prima di ripartire |
| Rientro o sconfitta | Quote conservate distinte dal premio non ottenuto; indicare l'ultima causa concreta di danno letale se disponibile | Nessun giudizio inventato sul giocatore e nessun annuncio richiesto per riprovare |

Non applicare hit-stop globale in questa prima soluzione: attacco automatico, movimento e segnali devono restare reattivi. Le reazioni sono su modelli, audio e camera visiva; opzione effetti ridotti conserva sagome, aree e frecce. Le tinte cosmetiche non sostituiscono la palette degli avvisi. Stesso preset per lo stesso evento, indipendentemente da acquisti reali o rewarded.

Il ritmo alterna ingresso leggibile, pressione, vantaggio ottenuto e nuova situazione. In A/R, prima di attivare il settore successivo lasciare un tratto percorribile in cui si può raccogliere e leggere l'obiettivo; se il giocatore avanza rapidamente non si aggiunge un'attesa. In D le brevi preparazioni sono saltabili e le emissioni restano finite. Niente aumento automatico dei punti vita per compensare un upgrade appena comprato.

## 17. Osservazione del divertimento durante la produzione

Le osservazioni riguardano il prodotto in sviluppo. Si annotano comportamenti e casi concreti: il giocatore identifica l'effetto di una cassa, decide quale lato raggiungere, prova a usare il raccordo o la macchina, reagisce al nuovo accesso, riconosce un acquisto utile. Spiegazioni necessarie, attese senza decisioni e ripetizioni identiche sono problemi da correggere, non numeri da nascondere dietro effetti visivi.

Per AV01 confrontare due ordini di raccolta; per RE02 demolizione diretta e raccordo; per DI03 intervento sulla macchina e difesa dell'aggiramento. Se le alternative producono la stessa posizione, azione e conseguenza, correggere disposizione o interazione. Usare il medesimo catalogo e la medesima difficoltà nel confronto: non attribuire la differenza a un prezzo o a statistiche modificate di nascosto.

In T23 annotare durata della parte giocata, tempo nei menu, motivo delle soste, opportunità ambientali effettivamente usate e scelta di ripartire. È un'osservazione qualitativa, non una stima di retention del mercato. Un ritmo diverso dall'obiettivo 2–4 minuti si valuta per qualità e rendimento fra attività; non si allunga artificialmente la partita per far tornare il cronometro.

Solo dopo la verifica delle situazioni rappresentative E07 si moltiplicano le configurazioni E11 e si conclude il rivestimento artistico E12. Se la situazione non funziona, si modifica la parte coinvolta; non si aggiunge automaticamente una quarta modalità. I test di economia continuano a proteggere la progressione libera durante queste correzioni.
