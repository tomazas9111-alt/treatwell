# Laizyklele demo

Tai lokalus, be papildomu priklausomybiu veikiantis grozio rezervaciju puslapis, ikveptas Treatwell tipo platformu strukturu, bet ne 1:1 kopija.

## Kaip paleisti

1. Jei nori tikro backend sluoksnio, paleisk:
   `powershell -ExecutionPolicy Bypass -File .\start-backend.ps1`
2. Atidaryk `index.html` narsykleje.
3. Jei backend veikia, klientu paskyros, rezervacijos, mokejimai ir veiklos srautas bus saugomi faile `backend/data/app-db.json`.
4. Jei backend nepaleistas, puslapis automatiskai naudos vietini `localStorage` demo rezima.

## Kas yra viduje

- consumer-first landing puslapis su `Laizyklele` brandu
- vertikali paieskos forma pagal procedura, rajona ir data
- 40 demo salonu katalogas su 10 salonu kiekvienai paslaugu krypciai
- kiekvienas salonas turi po 8 meistrus su nuotraukomis is interneto
- meistro aprasymas rodomas tik pasirinkus konkretu specialista
- salonu katalogas su laisvais laikais
- rezervacijos modalis su mokejimo zingsniu
- vartotojo paskyros, partnerio ir platformos rodiniai demo tikslams
- `PowerShell` API backendas su failine JSON duomenu baze ir `localhost:8787/api`
- backend auth endpointai klientui: prisijungimas, registracija, slaptazodzio atnaujinimas
- server-side duomenu sinchronizacija rezervacijoms, mokejimams, megstamiems salonams ir activity feed
- responsive dizainas mobiliesiems ir desktop

## Pastaba

Meistru nuotraukos kraunamos is `randomuser.me`, todel jas matysi tik su interneto rysiu. Backendas yra demonstracinis: slaptazodziai laikomi JSON faile paprastu tekstu, todel produkcijai taip palikti negalima.
