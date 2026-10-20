# HOLDOUT CITY — SISTEMI COMPLETI ED ECONOMIA INTERCONNESSA V3
20 ottobre 2026 — specifica **proposta** di game design, non implementata. Il registro delle decisioni dell'utente prevale. Questo documento approfondisce PRODOTTO-UNIFICATO.md e segnala modifiche suggerite rispetto a CITTA.md/GUADAGNO.md, non le dichiara già approvate.

## 1. Benchmark: cosa fanno i concorrenti e perché
Fonti:
- Last War (aggiornato luglio 2026): https://lastwarhub.com/en/getting-started/basics/ — economia food/iron/coins, eroi con livelli/stelle/equip, shards, ricerca, progressione differenziata, bottleneck dinamico.
- Whiteout Survival: https://wiki.wosforge.org/wiki/Buildings — Sawmill/Hunter's Hut/Coal Mine/Iron Mine, Hero Hall, Academy, research, arena, specialità.
- Whiteout chiavi: https://www.whiteoutsurvival-community.com/tools/wiki/buildings-db.html — Gold/Platinum keys danno heroes/shards/manuals/XP/resources.
- Whiteout risorse: https://wiki.wosforge.org/wiki/Resources — produzione passiva aumentata da livello edificio, ricerca, specialità eroe.
- Whiteout missions: https://whiteoutsurvivalhandbook.com/guides/whiteoutsurvival-lighthouse-intel-missions-guide — missioni Intel come fonti di frammenti e materiali rari.
- Last Z: https://lastzsurvival.com/resources — HQ, farm, lumber, power, warehouse, lab, military camp e missioni.
- Last Z hero tickets: https://lastzwiki.com/en/beginner-guide.html — club con tickets, upgrade eroi, missioni.
- Last War gear factory: https://www.lastwar-guide.org/buildings — crafting e combinazione materiali.

**Meccanica comune**: attività producono materiali e premi, edifici producono passivamente o trasformano, ricompense rare alimentano ricerche/eroi, upgrade aprono nuove attività, eventi spostano incentivi. **Difetto da evitare**: HQ unico gate + timer + risorse monopolizzate da un'unica attività + assalto competitivo a pagamento.

## 2. Grafo globale della progressione
Corsa M1 -> materiali di recupero + bottino mirato + occasionali chiavi
Barricata M2 -> materiali difensivi + viveri + schemi/ricompense
Puzzle M3–M5 -> viveri + materiali + recupero sopravvissuti/chiavi a milestone
Miniere, orti, generatore -> flusso AFK di risorse base
Officina/fonderia -> conversione di base in componenti (CRAFT IMMEDIATO se hai risorse, **nessuna coda temporizzata**)
Centro ricerche -> progetti sbloccati con schemi e materiali, acquisto immediato
Centro reclutamento -> chiavi + frammenti personaggi con ottenimento progressivo **deterministico/anti-sfortuna**
Scuola/addestramento -> potenziamento eroi; personaggi e equip cambiano strategie nei minigiochi
Salvataggi/esplorazione -> nuovi sopravvissuti e settori, ampliano forza lavoro e possibilità
Espansione quartieri -> nuove caselle, giacimenti, edifici e varianti modalità.
Tutti portano a missioni più interessanti, materiali richiesti da obiettivi scelti e nuove capacità della città.

## 3. Economia: risorse collegate e ruoli univoci
Evitare troppi token immediatamente. **Layer 1 (da inizio):**
- **Rottami/materiali**: missioni M1/M2, edificio sfasciacarrozze; costruzione di base, riparazione città, fabbricazione.
- **Viveri**: orto AFK, missioni e puzzle; sblocco residenti/ricerca/addestramento.
- **Metallo**: miniera/missioni di recupero e contratti; edifici militari e upgrade superiori; sbloccare dopo primi 10-20 minuti (proposta).
- **Energia**: generatore e missioni specifiche; tecnologia e automazione; **non è energia per entrare nelle missioni**, è risorsa di città.
**Layer 2 (progressione specialistica):**
- **Componenti**: craft istantaneo da Rottami + Metallo (costo di trasformazione esplicito) e boss/missioni; armi, difese.
- **Schemi**: missioni difficili, contratti, esplorazione; sblocchi tecnologie/ricette/varianti; non valuta acquistabile.
- **Chiavi di reclutamento**: ricompense missioni/contratti/eventi (più raramente nella produzione passiva); *non* per sbloccare un singolo potenziamento edilizio.
- **Frammenti eroe**: eroe specifico o selezionabili, servono a sbloccare/avanzare talenti; duplicati convertiti o indirizzati al progresso.
Non aggiungere oro/gemme/diamanti/ticket giornalieri/valuta PvP prima del motivo verificabile. Mostrare al giocatore wallet base con 3-4 risorse, avanzate in contesti specifici.

### Contratti di fonte/sink
Ogni item deve avere >=2 fonti (eccetto premi speciali cosmetici), >=1 impiego di progresso e info «Dove si trova» contestuale. Ogni missione ha premio base e obiettivo secondario. Il bottino non è gacha a probabilità nascosta.

## 4. Edifici — evoluzione dei 12 già scritti (senza invalidare mappa)
**Produzione**
- Sfasciacarrozze: Rottami/h; livello aumenta estrazione; ricerca efficienza/assegnazione lavoratori.
- Orto: Viveri/h, operatori e tecnologia agricola.
- **Miniera** (NUOVA, priorità alta): Metallo/h; posizionabile sul giacimento del quartiere. Scelte di upgrade: resa, cap locale, efficienza lavoratori. Miniera è edificio reale che cambia modello e rendimento. In prototipo usare giacimento nella prima espansione.
- **Generatore** (NUOVO): Energia/h per tech/crafting, alimentato automaticamente per semplicità; non imporre microgestione carburante come time gate.
- Magazzino: cap AFK esteso e raccolta di massa gratuita; non solo se paghi Pass.
**Ricerca/crafting**
- **Officina/Fonderia** (NUOVA): converte Rottami+Metallo -> Componenti **istantaneamente** senza attesa; sblocca ricette/equip. Stop crafting if wallet insufficient, con pulsante fonte.
- Laboratorio/Centro Ricerca (rifinire edificio esistente): albero Economia/Combattimento/Ricostruzione; spesa immediata di risorse/schemi, niente research timer.
**Eroi e popolazione**
- Centro Radio/Recruit (espansione Radio esistente): chiavi di reclutamento, contratto eroe selezionabile, frammenti e duplicate protection.
- Addestramento: talenti/abilità e preset, materiali e viveri, niente cooldown per cambiare personaggio.
- Case: residenti salvati, lavoratori assegnabili, bonus produzione senza farli aspettare 30 minuti per poter costruire.
**Militari e missioni**
- Armeria: abilità d'arma, equip/loadout M1, nuove alternative. Niente «solo +3% casse» per livello.
- Torre: difese, varianti e posizionamenti in M2.
- Infermeria: resistenze/recuperi M1/M2, non ferite con attesa reale.
**Core**
- QG: avanzamento settori e grandi traguardi; non richiedere di maxare in sequenza 5 edifici solo per cambiare livello.
- Mercato: **conversione limitata fra risorse base**, prevenzione conversioni infinite profittevoli; non valuta premium.
Questa lista amplia i 12 edifici precedenti: alcuni vanno **sostituiti, fusi o raggruppati** per mantenere UI leggibile, non portati automaticamente a 15–20 edifici. Numero definitivo dopo analisi della mappa e pacing.

### Moduli interni dei produttori (profondità senza 30 edifici)
Esempio Miniera: **Trivella** (resa), **Carrelli** (cap), **Squadra** (efficienza lavoratori). 3 moduli per edificio, 3 livelli a modulo in prova. Ogni modulo serve a un problema reale. Ramo di sviluppo non esclusivo: puoi potenziare tutti, ma in ordine libero; può avere un preset focalizzato sull'obiettivo corrente.

## 5. Personaggi, chiavi e sblocchi: regole trasparenti
**Tre componenti distinti:**
1. **Chiave** = apre un «Dossier recluta», non potere casuale acquistato. Chiavi guadagnate giocando, negli incarichi settimanali e milestone.
2. **Frammento eroe** = progresso verso un eroe specifico; progress bar e «dove ottenerlo». Eroi acquisiti con 30 frammenti in piano corrente, cifra ribilanciabile.
3. **Manuale/addestramento** = valuta o risorsa di talento per sbloccare una variante di abilità, separata da chiavi.
**Sistema consigliato per non essere gacha sleale:** reclutamento «progress track»: ogni X chiavi produce garantito un frammento selezionato dal giocatore o un eroe a scelta; ricompense extra variabili possibili SOLO se chiaramente dichiarate, con percentuali se loot random; opzione più semplice: ogni chiave = 1 frammento universale assegnabile a un personaggio scelto, mentre dossier mostrano bonus cosmetici predefiniti. **Senza estrazioni casuali monetizzate** ed evitando il linguaggio «reclutamento casuale» se è deterministico.
Duplicati di eroi già maxati -> convertire in frammenti universali 1:1 o progressi estetici, non ricompense morte. No limiti di apertura quotidiani che impediscono di usare chiavi conquistate.
Roster progetto 8 eroi, ma rendere almeno 3 profondamente diversi prima di produrne 8. Talenti pochi, differenza di strategia in M1 e M2. L'eroe non deve dare +40% produzione gratuita e contemporaneamente essere il migliore in corsa.

## 6. Altri componenti collezionabili non solo personaggi
- **Blueprint armi**: sbloccano archetipi/tipologie d'arma e nuovi comportamenti, non linear-only rare->legendary danno.
- **Moduli difesa**: cambiano torre M2 (es. area vs precisione) e sfruttano officina/laboratorio.
- **Progetti edificio**: miglioramenti estetici e funzionali dei moduli produttivi (trivella, mulino, autoconsumo).
- **Reperti quartiere**: ricompense milestone dei settori, sbloccano nuove scenografie/cosmetici.
La priorità è evitare di avere chiavi eroe + chiavi arma + chiavi torre + chiavi edificio come 4 valute simili: **un solo sistema di «progetti»** alimenta più collezioni.

## 7. Mappa ed esplorazione
I 9 quartieri sono una visione di crescita. Ogni quartiere libera subito terreno se il giocatore spende risorse e completa una **missione tematica** (M1, M2 o puzzle). Il quartiere ha (i) un giacimento o risorsa, (ii) un edificio/attività, (iii) una trasformazione grafica e (iv) un obiettivo di ripristino; dopo liberazione può avere missioni varianti.
**No gating temporale**: missioni ripetibili, risorse trovabili anche altrove, obiettivo sempre raggiungibile tramite gioco. Recupero sopravvissuti assegna lavoratori. Eventuale spedizione AFK raccoglie risorse base ma non blocca eroi/slot principali per ore.

## 8. Cosa deve fare il giocatore dopo 1 giorno / settimana / mese
- **Primo giorno:** M1 e M2 (se pronte), piccola miniera, prime farm, primi moduli, 2 eroi o progresso evidente verso il secondo, espansione del primo settore, primi dossier/chiavi visibili. Richiede pacing da testare.
- **Prima settimana:** almeno una scelta significativa in produzione, una in combattimento, una nell'eroe, contratto settimanale, primo upgrade tecnologico, diversi piccoli quartieri restaurati.
- **Primo mese:** centro urbano con più produttori, equip/loadout specialistici, tre o più eroi se le soglie permettono, sfide difficoltà elevate e collezioni. Non promettere 30 giorni di contenuto senza simulare.
- **Mid-game/late game:** livelli edifici avanzati, nuove tecnologie e sblocchi compositivi; riduzione farming ripetitivo tramite missioni migliorate che premiano skill, non moltiplicatori HP.

## 9. Matrice cosa ottengo → a cosa serve
| Attività o edificio | Ottieni | Principali usi |
|---|---|---|
| M1 Corsa | Rottami, Metallo, chiave rara/milestone | edifici, Miniera, Officina, reclute |
| M2 Barricata | Rottami, Componenti, Schemi | difese, laboratorio, equip |
| M3 Perno | Viveri, sopravvissuti, schemi | Case, lavoratori, ricerca |
| M4 Disegna difesa | Viveri, materiali, premi evento | Case, tecnologie, decorazioni |
| M5 Libera strada | Metallo, viveri, sopravvissuti | Miniera, centro città, ricerca |
| Sfasciacarrozze | Rottami AFK | città, officina |
| Orto | Viveri AFK | eroi, residenti |
| Miniera | Metallo AFK | officina, livelli alti |
| Generatore | Energia AFK | tecnologie e automazione |
| Officina | Componenti/equip istantanei | armi, torri, moduli |
| Ricerca | nuove opzioni e bonus permanenti | ogni modalità, produttori |
| Dossier eroi | frammenti / eroi | roster, skill/loadout |
| Eventi | chiavi, schemi, cosmetici | personaggi e specialità |
| Espansione quartiere | terreni, depositi, funzioni | crescita permanente |
Questa matrice è incompleta finché non c'è un registro data-driven unico con valori costo/resa e sink per tier.

## 10. Anti-deadlock economy
- Ogni risorsa spendibile deve avere fonte attiva ripetibile o alternativa garantita, anche quando AFK cap pieno.
- Mai costruzione che richiede risorsa prodotta esclusivamente da quella costruzione (dependency cycle).
- Costi di crafting non devono produrre arbitraggio positivo nel Mercato. Verificare conversioni anche sotto bonus eroe/ricerca.
- Nessun personaggio insostituibile per completare contenuto base; il primo eroe vince il tutorial e tutte le prime sfide con abilità.
- Duplicati non sprecati; spazio deposito e gestione lavoratori non devono trasformarsi in mille tap per minuto.

## 11. Progressione economica: come calcolare le curve
Definire `wallet(t) = wallet(0) + Σrewards_missions + ΣAFK + Σeventi - Σcostruzioni - Σcraft - Σhero_upgrades`.
Per ogni risorsa r calcolare `T_to_upgrade_r = max(0,costo_r - posseduto_r)/rendimento_attivo_r`, poi tempo reale vincolante tra risorse che si accumulano in parallelo, tenendo presenti missioni che danno bundle.
Per edificio con base C e tier n, costo candidato: `C(n)=round(C0*(1+0.28*(n-1)+0.07*(n-1)^2))` SOLO COME BASELINE, non formula universale: ogni nuovo tier dovrebbe sbloccare qualcosa e non essere soltanto un muro di costo.
**Test di bilanciamento da implementare:** 4 profili 5/15/30/60min giornalieri, AFK 0/8h, rewarded 0/1/3, preferenze M1/M2/puzzle, progresso su 30 giorni, ore a nuovo personaggio, tempo al primo giacimento, percentuale risorse inutilizzate, deadlock, valuta senza sink.
**Criticità strategica:** la crescita permanentemente accelerata da miniera + AFK può svalutare M1. Limitare AFK ai materiali base; risorse specialistiche ottenute principalmente in missione, ma con progressi alternativi.

## 12. Eventi e ricompense
Giornaliere: 3 contratti multi-attività + scelta di ricompensa comune. Settimanale: una campagna di quartiere e obiettivo a traguardi, sempre accessibile per recuperare parte dei premi; missioni più complesse opzionali. Mensile: ripristino tema/settore e premi cosmetici, pochi asset nuovi. Missioni Intel versione nostra: taglie/salvataggi/recuperi come varianti rapide dei giochi, non attese automatiche.
Chiavi e frammenti distribuiti in traguardi giocabili, non solo nel pass ads. Rewarded ad limitate a materiali base, non sblocco eroi/vantaggi di potere competitivo.

## 13. UX per economia stratificata
- Header: mostra 3 risorse principali + espandi inventario; chiavi/frammenti nel tab reclutamento. Tooltip «Dove trovo» e «Usi» su ogni item.
- Scheda edificio: ruolo, produzione/h o capacità, lavoratori assegnati, moduli/trivella, prossimo beneficio visibile, risorse mancanti con CTA verso modalità utili, pulsante upgrade istantaneo.
- Mission card: durata, difficoltà, ricompensa base garantita, materiale che serve per l'upgrade tracciato, eventuale chiave/milestone. Nessun drop occulto.
- Tab Eroi: roster, frammenti X/30, dossier (chiavi), equip, talento, scelta eroe M1/M2, «Dove ottenere».
- Niente cinque notifiche giornaliere forzate o indicatori rossi per tutto; non farti pagare per raccolta multipla/gestione ragionevole.

## 14. Implicazioni tecniche/legali e business
Preservare Babylon.js+Capacitor e le build esistenti. Nuovi sistemi definiti da file dati verificabili, schema grafo fonti/sink e test automatici per ricette/upgrade/economia. Audit asset gratis/CC0/CC-BY e permessi di attribuzione; non incorporare artwork/video/codice proprietario di Last War o Whiteout. Non inventare legalità assoluta.
Play Store API target/consenso/privacy/Google Billing devono essere verificati a build finalizzata. Le chiavi NON vendute e le ricompense deterministicamente note evitano molti rischi di meccaniche a sorpresa, ma NON eliminano ogni obbligo applicabile al gioco o agli SDK. Se si introduce drop casuale con soldi, verificare legge/policy/probabilità prima del rilascio.
I modelli DAU/ad/IAP vanno fondati su retention/ads effettive; non promettere entrate.

## 15. Decisioni proposte (non confermate)
- Adottare quattro risorse primarie (Rottami, Viveri, Metallo, Energia) e due materiali specialistici (Componenti, Schemi) + due progress token (Chiavi, Frammenti). Se complessità UI eccessiva, accorpare Energia nei Componenti.
- Inserire Miniera, Generatore, Officina come edifici veri, **accorpando** edifici preesistenti inutili per restare in 12-14 strutture funzionali.
- Garantire **chiavi gratuite** come milestones e missioni, reclutamento senza gacha venduto, frammenti mirati verso l'eroe selezionato; duplicati recuperati.
- Fare dei nove quartieri un piano di medio periodo, con missioni + risorse di ingresso ma nessun timer per conquistarli.
- Per launch test: 2 produttori + miniera + officina + reclutamento, resto in progressione.
- Non implementare tutto contemporaneamente: completa economia e partita -> cantiere -> chiavi -> miglioramento personaggio come prima prova end-to-end.

## 16. Priorità sviluppo prodotto
P0: M1 divertente, reward -> miniera/officina -> vantaggio percepibile in M1.
P1: AFK che rende ma non sostituisce il gioco, città che cresce visivamente, layout città leggibile.
P2: chiavi/frammenti eroe / blueprint equip / contratti settimanali.
P3: M2 e puzzle che alimentano risorse differenti, farming personalizzato e bilanciamento 30 giorni.
P4: ads e IAP con misure reali, Play Console compliance, marketing web beta.
