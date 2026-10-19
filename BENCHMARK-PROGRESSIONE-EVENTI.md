# Benchmark city builder e calendario di progressione — 19/10/2026

## Visione confermata
City builder Android (PC se semplice): piu giochi, piu raccogli risorse, piu costruisci ed espandi. **Nessun timer di costruzione/upgrade.** Prevedere anche **guadagni AFK/passivi**. Specializzazioni alternative PvE/PvP/economia. Minigiochi attivi, incluso action tipo ads. Monetizzazione opzionale, specie rewarded ads con risorse/ricompense extra. Obiettivo reale: pubblicazione e ricavi, solista con AI e pochi asset.

## Benchmark concorrenti (fonti consultate 19 ottobre 2026)
| Gioco | Sistemi osservati | Da adattare | Da NON riprodurre |
|---|---|---|---|
| Last War: Survival | Arms Race giornaliera a fasi, Alliance Duel 6 giorni, rotazione combattimento/ricerca/costruzione, boss, invasioni, stagioni | Punteggi che premiano attività normalmente utili, giornate a tema, premi a traguardi | Speedup, trattenere risorse sino al giorno “giusto”, PvP dominante e vincoli d'alleanza |
| Whiteout Survival | raccolta AFK, crescita città, alleanze, boss cooperativi, sfide settimanali, moltissimi eventi ricorrenti | Combinare raccolta, PvE e competizioni su cicli diversi | Timer di edifici, eventi obbligatori, vantaggi da spesa in PvP |
| Township | città/farm, task Regatta tra attività città e match-3, eventi, Town Pass, spedizioni | Minigiochi vari collegati direttamente al progresso urbano; missioni alternate | Fare dell'action soltanto una falsa ads o introdurre logistiche a lunga attesa |
| SimCity BuildIt | contest dei sindaci su produzione, upgrade, raccolta, sfide di design; pass ed eventi settimanali; club | Traguardi per attività di sviluppo realmente svolte, bonus estetici, livelli di prestigio | Produzione come attesa obbligatoria; grind dipendente da competizione pay-to-win |
| Frozen City / altri idle city builders | guadagno passivo e raccolta ripetibile | AFK come integrazione di sessioni attive | Esaurire gameplay in pochi click e lunghi tempi morti |

Fonti:
- https://lastwarhub.com/en/events/
- https://www.whiteoutsurvival-community.com/tools/wiki/events.html
- https://playrix.helpshift.com/hc/en/3-township/faq/16605-about-the-regatta-1765929812/
- https://playrix.helpshift.com/hc/en/3-township/section/287-events-and-tournaments/
- https://simcity-buildit.fandom.com/wiki/Contest_of_Mayors
- https://help.ea.com/en/articles/simcity/simcity-buildit/mayors-club/
Le wiki/community possono contenere varianti regionali o di aggiornamento: verificare in-game prima di copiare regole numeriche.

## Sistema suggerito: TRE FONTI DI PROGRESSIONE
1. **Attiva (principale):** minigiochi e missioni giocabili ripetutamente; ricompense basate su difficoltà/abilità e stato della città, mai barriere energia che impongono attesa.
2. **AFK (secondaria):** produzione continua di materiali base dagli edifici, maturata anche offline fino a un deposito/cap; raccolta al rientro, senza timer per completare upgrade. Il cap limita solo accumulo offline, non l'azione quando si è online.
3. **Eventi/obiettivi:** missioni giornaliere, settimanali, stagionali che ricompensano normale gameplay; premi importanti recuperabili attraverso percorsi alternativi per non costringere FOMO o pagamento.

### Bilanciamento da provare, NON deciso
Al primo prototipo testare un obiettivo indicativo 70% progressione accessibile da attività, 20% AFK, 10% bonus eventi, variabile per stile di gioco. Nessuna quota rigida nella versione finale. Materiali base AFK; risorse specialistiche preferibilmente da modalità attive e scelte di specializzazione. Non introdurre valute eccessive. Costruzione immediata se il giocatore paga il costo **in risorse del gioco**.

## Proposta di calendario sostenibile per sviluppatore singolo
- **Sempre disponibili:** minigiochi, farming specifico, espansione città, upgrade, progressione di specializzazione e AFK.
- **Ogni giorno:** 3 missioni diverse adattate allo stile (es: completa due partite, potenzia un edificio, supera una sfida). Bonus modesto senza obbligo di login streak.
- **Ogni settimana:** un tema/obiettivo con più traguardi ottenibili giocando in diverse modalità; una sfida skill-based con difficoltà crescente; reward di progressione e personalizzazione.
- **Ogni mese/4 settimane:** una stagione leggera con missioni aggiuntive, decorazione/cosmetico, sfida speciale e progress track; evitare dipendenze da decine di nuovi asset.
- **Occasionali:** weekend con regole alternative e remix di mappe/nemici; evitare eventi che dipendono da attività simultanea massiva.
- **Più avanti:** classifiche asincrone, gilde, PvP, eventi cooperativi dopo aver validato server, moderazione e anticheat.

### Event system tecnico
Definire gli eventi come dati (JSON/Godot Resources): tipo attività, filtri, progressi, obiettivi, ricompense, date locali/server, variante di regole. Un evento usa minigiochi, risorse ed edifici già esistenti, non richiede un nuovo gioco a ogni settimana. Flag/content versioning per aggiornamenti senza rompere salvataggi. Per eventi competitivi o premium usare backend autorevole e protezioni contro manipolazioni data/ora e salvataggi; offline puro NON è affidabile per leaderboard economiche.

## AFK senza timer di costruzione
Gli edifici generano materiali in modo passivo come vantaggio della specializzazione industriale. I potenziamenti dei produttori sono **istantanei se il costo è disponibile**. Quando l'app è chiusa, contare tempo offline entro una soglia e capacità di magazzino (parametri da testare). Offrire un bonus rewarded ad **facoltativo** sul bottino raccolto, per esempio +50% o raddoppio con limite giornaliero da verificare, non obbligatorio. Non far sì che la quantità extra distrugga progressione competitiva.

## Monetizzazione
- Rewarded ads: bonus su missione, AFK, alternativa ricompensa; mostrare premio base chiaramente; ad solo su scelta volontaria e reward alla conferma del completamento; limiti anti-inflazione.
- IAP: estetiche città/edifici, supporter pack, eventuale track cosmetica stagionale; niente timer/speedup venduti; vantaggi non esclusivi o PvP normalizzato.
- La rimozione annunci ha senso solo se esistono annunci non premiati; “no ads” non deve promettere premi rewarded gratuiti senza specifica.
- Valutare impatto su retention e bilanciamento; ricavi non garantiti senza acquisizione e utenti ricorrenti.

## Fasi reali
**Prima:** implementare ciclo 'minigioco -> risorse -> crescita città -> upgrade ramificati -> AFK -> ritorno'. 
**Poi:** giornaliere + sfida settimanale configurabili con data.
**Poi:** contenuto stagionale e pubblicità premiate.
**Solo successivamente:** live ops online / PvP e complessità sociale.

## Decisioni da verificare
- Tema mondo, minigiochi e ramo industriale/PvE/PvP esatti.
- Durata sessioni attive e come il giocatore varia le missioni.
- Cap AFK, velocità di produzione, prezzi degli upgrade e prevenzione del farming ripetitivo.
- Stagioni e premio finale, server time, privacy, age rating e politica notifiche.
- Competizioni e modalità di ranking da mantenere fair senza cash advantage.
