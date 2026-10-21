# CODEX 01 — QUALITÀ VISIVA, ASSET E INTERFACCIA
## Visione artistica adottata
**Un city-builder mobile premium moderno**, leggibile in portrait con mappa 3D ricca e viva, uno stile stilizzato adulto e coerente. **NON** una demo tecnica con cubi colorati, case fatte con box o icone/emoji. Il mondo parte desolato ma non vuoto di dettaglio: composizione, dislivelli, vegetazione, detriti, segni di abbandono, microambientazione. Col passare del tempo si percepisce il ritorno della vita con strutture visivamente diverse, lavoratori e illuminazione.

### Standard città
- Camera inclinata a ~40–55° come baseline di test, vista su quartiere, prospettiva coerente; gesto drag pan, pinch zoom, tap selezione, long press spostamento. Assicurare edifici leggibili senza schiacciare la visuale. Camera e distanze devono essere confrontate con screenshot di giochi di riferimento prima di fissarle.
- Layout NON planimetria 2D con caselle gigantesche e oggetti sparsi a caso: strade modulari, edifici con basi e footprint coerenti, variazioni terreno e zona, piccoli cluster di props e dettagli. Lo spazio vuoto iniziale è **l'assenza di città**, non una scena nuda e piatta.
- Strutture dei vari stadi: accampamento (tenda, fuoco, banchi, palizzate), avamposto (orti, recuperatore, miniera, officina, container), insediamento (case, strade, elettricità, torri), città (quartieri, laboratori, infrastrutture). Ogni edificio deve avere scala, materiale, funzione e silhouette differente.
- Per ogni asset di edificio, indicare: origine, licenza, dimensioni nel mondo, pivot, footprint, LOD, collisioni, numero tris/texture, eventuale rig, livelli visivi e screenshot in scena.
- Personaggi: adulti stilizzati coerenti tra loro; animazioni di camminata, inattività, lavoro e interazione. **Un modello immobile accanto al produttore non è «persona al lavoro».**

### Standard UI
- Design system prima delle schermate: font leggibile con font legalmente riusabile, griglia spacing coerente, componenti vere (bottom sheet, nav, pulsanti, badge solo per stati utili, progress bar), contrasto e gerarchia. Palette derivata dalla scena, non web dashboard blu/viola generica.
- Prima schermata: mostra **mondo** + hint singolo contestuale. HUD risorse presente solo quando rilevante. Niente pop-up di shop all'avvio, 8 valute e 12 icone persistentemente.
- City screen: mappa occupa il massimo schermo, risorse in alto, barra inferiore discreta; tap edificio mostra **bottom sheet** con nome, funzione, lavoratori, output orario, prossimo cambiamento illustrato, costi, CTA e «dove trovo».
- Gestione edificio: immagini/render reali del suo nuovo aspetto. NO scheda con «livello +1, +3%» e null'altro.
- Reclutamento: eroe a schermo con posa/animazione 3D, abilità con preview realizzata, progress frammenti chiaro, costo e fonti. NO lista di nomi generici.
- Mission screen: vere anteprime tratte da build/modalità, ricompensa, durata, descrizione e accesso rapido. NO thumbnail inventata, fake gameplay o placeholder nei materiali promozionali.
- Caratteri touch min 44–48dp consigliati; safe area, display piccolo/grande, IT/EN, feedback tap, contrasto, simboli aggiuntivi al colore.

### Pipeline degli asset: fonti e decisioni, NON invenzione
Inventario già presente nel repo: `game/assets-src/polypizza/manifest.csv` elenca model_id, bundle, title, licence, glb_url di asset Poly Pizza/Quaternius; è un CATALOGO, non prova che ciascun GLB sia installato, coerente o ottimizzato.
Fonti già previste: **Quaternius Zombie Apocalypse, Toon Shooter, Downtown City MegaKit, Survival**, **Kenney Survival/UI/SFX**. Per ogni pack verificare download effettivo, licenza per quel file, compatibilità GLB con Babylon e animazioni, resa visiva sullo stesso frame. CC-BY richiede attribuzione; CC0 non evita di controllare eventuali contenuti di terzi.
**ASSET-REGISTER.csv da produrre:** asset_id|uso|source_url|author|license|attribution_required|local_path|scale_m|material_style|rig|lod|status|approved.
**Asset-needed prima della scena approvazione:** una scena con terreno e varianti, tenda, fuoco, recuperatore, orto, miniera, officina, strade, ~5 props, 1 protagonista, 2 superstiti, 2 zombie; 3 stadi visuali della città. Tutti REALI; se manca un asset e non è possibile realizzarlo professionalmente, segnare BLOCCO e proporti alternative di origine sicura. Non generare box e dichiarare sostituzione definitiva.
**Uso generazione AI:** consentito per concept preliminari e bozzetti di confronto, ma **non** per inventare modelli 3D finali indistinguibili o texture di qualità dubbia. L'asset finale deve avere licenza/diritti, geometria e rig verificati e coerenza nell'art bible.

### Obiettivi di art review prima di coding massivo
1. Screen comparativo su **medesima scala**: zero edifici, campo, avamposto con 1 produttore, e un primo quartiere sviluppato.
2. Leggibilità su schermo telefono senza zoom obbligatorio; nessun edificio identico a un altro solo per colore.
3. Character scale coerente con porta e strada; strutture non toy-scale in un ambiente realistico e viceversa.
4. Scena non vuota, ma dettagli non sovraccaricano la camera mobile.
5. Minigame M1 e city sembrano appartenere allo STESSO PRODOTTO (palette, silhouette, suono, UI).

### Asset gating
STATUS `UNVERIFIED -> FOUND -> DOWNLOADED -> LICENSED -> IMPORTED -> VISUAL_REVIEWED -> APPROVED`.
Senza `VISUAL_REVIEWED` non chiamare un asset «pronto». Nessuna sostituzione artistica autonoma dove manca `APPROVED`.
