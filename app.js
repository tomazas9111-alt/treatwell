const STORAGE_KEY = "groziolaikas-demo-v5";
const BACKEND_BASE_URL = "http://localhost:8787/api";
const BACKEND_TIMEOUT_MS = 4000;
const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_BOOKING_LEAD_TIME_MINUTES = 120;
const DEFAULT_BOOKING_BUFFER_MINUTES = 15;
const DEFAULT_BOOKING_CHANGE_NOTICE_MINUTES = 12 * 60;

const today = new Date();
today.setHours(0, 0, 0, 0);

const upcomingDates = Array.from({ length: 6 }, (_, index) => {
  const date = new Date(today.getTime() + index * DAY_MS);
  return toIsoDate(date);
});

const seedCustomerAccounts = [
  {
    id: "customer-monika",
    role: "customer",
    name: "Monika Petrauske",
    email: "monika@groziolaikas.demo",
    phone: "+37061234567",
    password: "Monika123!",
    loyaltyCredits: 18,
    favoriteSalons: ["luna", "nord"],
    createdAt: new Date(Date.now() - 42 * DAY_MS).toISOString(),
    lastLoginAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
];

const staffProfiles = {
  salon: {
    id: "manager-simona",
    role: "salon",
    name: "Simona Vaitkute",
    email: "simona@lunabeauty.demo",
    phone: "+37069811111",
    salonId: "luna",
  },
  admin: {
    id: "admin-owner",
    role: "admin",
    name: "Platformos valdytojas",
    email: "owner@groziolaikas.demo",
    phone: "+37060000000",
  },
};

const portrait = (group, index) => `https://randomuser.me/api/portraits/${group}/${index}.jpg`;

const categoryServices = {
  Plaukai: [
    { id: "balayage", name: "Balayage", duration: 150, basePrice: 74 },
    { id: "cut", name: "Moteriskas kirpimas", duration: 60, basePrice: 29 },
    { id: "gloss", name: "Blizgesio procedura", duration: 45, basePrice: 34 },
  ],
  Nagai: [
    { id: "gel", name: "Gelinis lakavimas", duration: 60, basePrice: 28 },
    { id: "builder", name: "Builder gel korekcija", duration: 80, basePrice: 36 },
    { id: "pedi", name: "Pedikiuras", duration: 60, basePrice: 34 },
  ],
  Veidas: [
    { id: "hydra", name: "Hydra glow", duration: 70, basePrice: 49 },
    { id: "cleanse", name: "Veido valymas", duration: 75, basePrice: 45 },
    { id: "brow-lam", name: "Antakiu laminavimas", duration: 40, basePrice: 31 },
  ],
  Masazai: [
    { id: "relax", name: "Atpalaiduojantis masazas", duration: 60, basePrice: 39 },
    { id: "deep", name: "Gilus nugaros masazas", duration: 45, basePrice: 42 },
    { id: "couple", name: "Poru ritualas", duration: 90, basePrice: 88 },
  ],
};

const cityPriceAdjustments = {
  Vilnius: 6,
  Kaunas: 2,
  Klaipeda: 3,
};

const neighborhoodPriceAdjustments = {
  Senamiestis: 3,
  Naujamiestis: 2,
  Zverynas: 3,
  Centras: 2,
  Zaliakalnis: 1,
  Silainiai: 0,
  Seskine: 0,
  Pajuris: 2,
  Melnrage: 2,
};

const serviceDemandAdjustments = {
  balayage: 8,
  cut: 0,
  gloss: 2,
  gel: 1,
  builder: 3,
  pedi: 3,
  hydra: 5,
  cleanse: 3,
  "brow-lam": 1,
  relax: 2,
  deep: 1,
  couple: 8,
};

const salonLanguagesByCity = {
  Vilnius: ["LT", "EN", "RU"],
  Kaunas: ["LT", "EN"],
  Klaipeda: ["LT", "EN", "RU"],
};

const salonAudienceNotes = {
  Plaukai: [
    "Dazniausiai renkasi klientes, kurios nori ilgiau issilaikancio rezultato ir ramios konsultacijos.",
    "Tinka po darbo rezervacijoms, spalvos korekcijoms ir pirmam didesniam pokyciui be streso.",
    "Labiausiai vertina naturalu dazyma, patogiai nesiojama kirpimo forma ir prieziuros rekomendacijas.",
  ],
  Nagai: [
    "Cia daznai grizta klientes, kurioms svarbi forma, tvarkingas pavirsius ir aiskus nesiojimo terminas.",
    "Populiaru tarp tu, kurios iesko svaraus nude, french arba greitos korekcijos po darbo.",
    "Daznai rezervuoja nuolatines klientes, kurios nori vienodai tvarkingo rezultato kiekviena karta.",
  ],
  Veidas: [
    "Tinka toms, kurios nori aiskaus odos plano, neperkrautos proceduros ir pastebimo svytejimo is karto.",
    "Dazniausiai renkasi klientes pries renginius, po itemptos savaites arba norint susitvarkyti rutina.",
    "Patogu pirmam vizitui, nes proceduros daznai prasideda nuo konsultacijos ir odos poreikio ivertinimo.",
  ],
  Masazai: [
    "Dažniausiai renkasi dirbantys sedima darba, sportuojantys arba ieskantys ramesnio vakaro ritualo.",
    "Populiaru tarp klientu, kurie nori aiskaus nugaros ir peciu atlaisvinimo be pernelyg agresyvaus spaudimo.",
    "Tinka tiek greitam atsistatymui po darbo, tiek ilgesniam ramiam vizitui savaitgalio rytui.",
  ],
};

const salonVibeNotes = {
  Plaukai: [
    "Erdve orientuota i konsultacija, tvarkinga spalvos eiga ir lengvai priziurima rezultata kasdien.",
    "Atmosfera rami, bet gyva - daugiausia rezervuojama dazymams, glotnumui ir kirpimo atnaujinimui.",
    "Dažnas pasirinkimas, kai norisi ne tik paslaugos, bet ir aiskaus plano, kaip nesugadinti rezultato namuose.",
  ],
  Nagai: [
    "Vizitai suplanuoti taip, kad nereiketu skubeti, o rezultatas atrodytu tvarkingai iki kito apsilankymo.",
    "Studijos tempas ramus, daug demesio skiriama svariems tonams, odeliu tvarkai ir formai.",
    "Daug klientu renkasi si salona del nuoseklumo: forma, ilgis ir pavirsius cia labai prognozuojami.",
  ],
  Veidas: [
    "Didelis demesys skiriamas odos komfortui, aiskiai komunikacijai ir proceduroms be bereikalingo agresyvumo.",
    "Dažnai rezervuojama pries renginius arba tada, kai norisi skaistesnes odos per viena vizita.",
    "Cia proceduros daznai papildomos trumpa rekomendacija namu rutinai ir realiu odos poreikiu paaiskinimu.",
  ],
  Masazai: [
    "Salono tempas ramesnis, su daug demesio privatumui, kvapui ir perejimui is darbo rezimo i poilsio busena.",
    "Klientai daznai mini, kad cia lengva suprasti, kokio spaudimo tiketi ir kam procedura labiausiai tinka.",
    "Dalis vizitu rezervuojami poroms arba sedimo darbo sukeltai itampai nugaros ir peciu zonoje mazinti.",
  ],
};

const realisticSalonAudienceNotes = {
  Plaukai: [
    "Dazniausiai renkasi klientes, kurios nori ilgiau issilaikancio rezultato ir ramios konsultacijos.",
    "Tinka po darbo rezervacijoms, spalvos korekcijoms ir pirmam didesniam pokyciui be streso.",
    "Labiausiai vertina naturalu dazyma, patogiai nesiojama kirpimo forma ir prieziuros rekomendacijas.",
  ],
  Nagai: [
    "Cia daznai grizta klientes, kurioms svarbi forma, tvarkingas pavirsius ir aiskus nesiojimo terminas.",
    "Populiaru tarp tu, kurios iesko svaraus nude, french arba greitos korekcijos po darbo.",
    "Daznai rezervuoja nuolatines klientes, kurios nori vienodai tvarkingo rezultato kiekviena karta.",
  ],
  Veidas: [
    "Tinka toms, kurios nori aiskaus odos plano, neperkrautos proceduros ir pastebimo svytejimo is karto.",
    "Dazniausiai renkasi klientes pries renginius, po itemptos savaites arba norint susitvarkyti rutina.",
    "Patogu pirmam vizitui, nes proceduros daznai prasideda nuo konsultacijos ir odos poreikio ivertinimo.",
  ],
  Masazai: [
    "Dazniausiai renkasi dirbantys sedima darba, sportuojantys arba ieskantys ramesnio vakaro ritualo.",
    "Populiaru tarp klientu, kurie nori aiskaus nugaros ir peciu atlaisvinimo be pernelyg agresyvaus spaudimo.",
    "Tinka tiek greitam atsistatymui po darbo, tiek ilgesniam ramiam vizitui savaitgalio rytui.",
  ],
};

const realisticSalonVibeNotes = {
  Plaukai: [
    "Erdve orientuota i konsultacija, tvarkinga spalvos eiga ir lengvai priziurima rezultata kasdien.",
    "Atmosfera rami, bet gyva - daugiausia rezervuojama dazymams, glotnumui ir kirpimo atnaujinimui.",
    "Daznas pasirinkimas, kai norisi ne tik paslaugos, bet ir aiskaus plano, kaip nesugadinti rezultato namuose.",
  ],
  Nagai: [
    "Vizitai suplanuoti taip, kad nereiketu skubeti, o rezultatas atrodytu tvarkingai iki kito apsilankymo.",
    "Studijos tempas ramus, daug demesio skiriama svariems tonams, odeliu tvarkai ir formai.",
    "Daug klientu renkasi si salona del nuoseklumo: forma, ilgis ir pavirsius cia labai prognozuojami.",
  ],
  Veidas: [
    "Didelis demesys skiriamas odos komfortui, aiskiai komunikacijai ir proceduroms be bereikalingo agresyvumo.",
    "Daznai rezervuojama pries renginius arba tada, kai norisi skaistesnes odos per viena vizita.",
    "Cia proceduros daznai papildomos trumpa rekomendacija namu rutinai ir realiu odos poreikiu paaiskinimu.",
  ],
  Masazai: [
    "Salono tempas ramesnis, su daug demesio privatumui, kvapui ir perejimui is darbo rezimo i poilsio busena.",
    "Klientai daznai mini, kad cia lengva suprasti, kokio spaudimo tiketis ir kam procedura labiausiai tinka.",
    "Dalis vizitu rezervuojami poroms arba sedimo darbo sukeltai itampai nugaros ir peciu zonoje mazinti.",
  ],
};

const neighborhoodArrivalNotes = {
  Senamiestis: "Patogu uzsukti pesciomis is centro, bet vakariniai ir savaitgalio laikai cia uzsipildo greiciausiai.",
  Naujamiestis: "Aplink daug biuru ir kaviniu, todel pietu pertraukos bei po darbo rezervacijos daznai dingsta pirmiausia.",
  Zverynas: "Ramesnis rajonas ilgesniems vizitams, ypac kai norisi konsultacijos ar nepertraukiamo poilsio laiko.",
  Centras: "Lengva suderinti su dienos reikalais, todel rezervacijos cia daznai derinamos tarp susitikimu ar po darbo.",
  Zaliakalnis: "Dazniausiai renkasi vietiniai klientai ir tie, kuriems svarbi tylesne aplinka be miesto skubejimo.",
  Silainiai: "Patogu atvykti automobiliu, todel salone daugiau planuotu, is anksto susiderintu rezervaciju.",
  Seskine: "Cia ypac paklausios greitesnes paslaugos, kurias patogu iterpti tarp dienos planu.",
  Pajuris: "Ramesnis ritmas, daugiau savaitgalio rezervaciju ir klientu, kurie nori ilgesnio vizito be skubejimo.",
  Melnrage: "Pajurio lokacija stipriausia savaitgaliais, kai klientai rezervuoja proceduras kartu su poilsio planais.",
};

const salonOfferTemplates = {
  Plaukai: [
    {
      label: "Pirmam vizitui",
      title: "Konsultacija pries %{service}",
      description:
        "Naujos klientes daznai pradeda nuo %{service} ir trumpos konsultacijos, kad rezultatas butu lengvai priziurimas namuose.",
    },
    {
      label: "Populiaru po darbo",
      title: "Vakariniai laikai uzsipildo greiciausiai",
      description:
        "Jei taikai i po darbo vizita, %{service} ir %{service2} verta rezervuoti bent keliomis dienomis anksciau.",
    },
    {
      label: "Dazniausiai renkasi",
      title: "%{service} nuo %{price} EUR",
      description:
        "Klientes cia grizta del naturaliai atrodancio rezultato ir aiskaus plano, kaip islaikyti efekta iki kito vizito.",
    },
  ],
  Nagai: [
    {
      label: "Greitas pasirinkimas",
      title: "%{service} su tvarkinga korekcija",
      description:
        "Didziausia paklausa tenka rezervacijoms po darbo, kai reikia svaraus tono, tikslios formos ir aiskaus nesiojimo termino.",
    },
    {
      label: "Nuolatinems klientems",
      title: "Stabilus rezultatas kas 3-4 savaites",
      description:
        "Cia dazniausiai griztama del %{service2}, nes klientems svarbu, kad ilgis, forma ir pavirsius butu prognozuojami.",
    },
    {
      label: "Top rezervacija",
      title: "%{service} nuo %{price} EUR",
      description:
        "Populiariausi laikai issigaudo greitai, ypac kai reikia ir nuemimo, ir naujo padengimo vieno vizito metu.",
    },
  ],
  Veidas: [
    {
      label: "Pries rengini",
      title: "Greitas glow be agresyvumo",
      description:
        "Klientes dazniausiai renkasi %{service} ar %{service2}, kai nori pailsejusios odos vaizdo dar ta pacia diena.",
    },
    {
      label: "Pirmam apsilankymui",
      title: "Procedura su aiskia konsultacija",
      description:
        "Pries aktyvesnes proceduras komanda trumpai ivertina odos bukle ir pasiulo, ka realu testi namuose.",
    },
    {
      label: "Dazniausiai klausia",
      title: "%{service} nuo %{price} EUR",
      description:
        "Salonas renkamas tada, kai norisi matomo rezultato, bet be bereikalingo odos dirginimo ar per intensyvaus pojucio.",
    },
  ],
  Masazai: [
    {
      label: "Po darbo",
      title: "Nugara ir peciai uzsipildo pirmiausia",
      description:
        "Didziausia paklausa tenka %{service} ir %{service2}, ypac kai klientai nori sumazinti itempa po sedimo darbo.",
    },
    {
      label: "Savaitgalio ritmas",
      title: "Ilgesni ritualai rezervuojami is anksto",
      description:
        "Poru ir ilgesnius seansus klientai dazniausiai planuoja kelioms dienoms i prieki, kad gautu jiems patogu laika.",
    },
    {
      label: "Dazniausiai renkasi",
      title: "%{service} nuo %{price} EUR",
      description:
        "Labiausiai vertinamas aiskiai suderintas spaudimas, ramus tempas ir tikras palengvejimas jau po pirmo apsilankymo.",
    },
  ],
};

const salonPolicyTemplates = {
  Plaukai: [
    "Dazymams ir ilgesnems plauku proceduroms gali buti taikomas uzstatas nuo %{deposit} EUR.",
    "I spalvos vizita verta atvykti be sunkesniu alieju ar stipriu formavimo priemoniu, kad meistrui butu lengviau ivertinti plauka.",
    "Jei norisi didesnio spalvos pokycio, rekomenduojama pastabose parasyti trumpa plauku istorija ir paskutini dazyma.",
  ],
  Nagai: [
    "Builder ar priauginimo korekcijoms verta pastabose nurodyti, ar ant nagu jau yra kita medziaga.",
    "Veluojant daugiau nei 10 min. dizaino dalis gali buti supaprastinta, kad neveluotu kitos klientes rezervacija.",
    "Kai kuriems ilgesniems nagu darbams gali buti taikomas uzstatas nuo %{deposit} EUR.",
  ],
  Veidas: [
    "Jei paskutinemis dienomis naudojai aktyvius serumus, rugstis ar retinoli, tai verta parasyti pastabose dar pries vizita.",
    "Po jautresniu proceduru komanda gali rekomenduoti ta pacia diena vengti saunos, intensyvaus sporto ir stipraus makiazo.",
    "Sudetingesniems odos planams pirmas vizitas gali prasideti nuo trumpesnes konsultacijos ir bukles ivertinimo.",
  ],
  Masazai: [
    "Jei turi traumu, nesena uzdegima ar specifiniu jautriu zonu, parasyk tai pastabose pries vizita.",
    "Veluojant daugiau nei 10 min. seansas gali buti trumpinamas, kad neveluotu kiti rezervuoti laikai.",
    "Ilgesniems savaitgalio ritualams arba poru seansams gali buti taikomas uzstatas nuo %{deposit} EUR.",
  ],
};

function buildSpecialist(config) {
  return {
    id: config.id,
    name: config.name,
    role: config.role,
    load: config.load,
    photo: portrait(config.photoGroup, config.photoIndex),
    bio: config.bio,
  };
}

function buildSalon(config) {
  const services = categoryServices[config.category].map((service, index) => ({
    id: service.id,
    name: service.name,
    duration: service.duration,
    price:
      service.basePrice +
      config.priceShift +
      index * 2 +
      (cityPriceAdjustments[config.city] || 0) +
      (neighborhoodPriceAdjustments[config.neighborhood] || 0) +
      (serviceDemandAdjustments[service.id] || 0),
  }));

  return {
    id: config.id,
    name: config.name,
    city: config.city,
    neighborhood: config.neighborhood,
    category: config.category,
    rating: config.rating,
    reviews: config.reviews,
    priceFrom: Math.min(...services.map((service) => service.price)),
    instant: config.instant,
    repeatRate: config.repeatRate,
    occupancy: config.occupancy,
    description: config.description,
    features: config.features,
    specialists: config.specialists.map(buildSpecialist),
    services,
    baseSlots: config.baseSlots,
  };
}

const salonConfigs = [
  {
    id: "luna",
    name: "Luna Beauty House",
    city: "Vilnius",
    neighborhood: "Naujamiestis",
    category: "Plaukai",
    rating: 4.9,
    reviews: 1284,
    instant: true,
    repeatRate: 67,
    occupancy: 82,
    priceShift: 3,
    description:
      "Modernus plauku salonas vakarinems rezervacijoms, dazymams ir minkstam kirpimo stilizavimui.",
    features: ["Parkingas", "Kortele", "Po darbo"],
    specialists: [
      {
        id: "milda",
        name: "Milda",
        role: "Colorist",
        load: 92,
        photoGroup: "women",
        photoIndex: 44,
        bio: "Specializuojasi i svelnius blond perejimus, balayage ir blizgesio atkurima.",
      },
      {
        id: "rute",
        name: "Rute",
        role: "Hair stylist",
        load: 79,
        photoGroup: "women",
        photoIndex: 68,
        bio: "Megsta gyva kirpima, veida remiantis sluoksniavima ir kasdienes sukuosenas.",
      },
    ],
    baseSlots: ["09:30", "10:30", "12:00", "14:15", "17:00", "18:30"],
  },
  {
    id: "velvet-strand",
    name: "Velvet Strand Studio",
    city: "Vilnius",
    neighborhood: "Zverynas",
    category: "Plaukai",
    rating: 4.8,
    reviews: 742,
    instant: true,
    repeatRate: 62,
    occupancy: 77,
    priceShift: 0,
    description:
      "Jauki studija, kurioje akcentuojamas naturalus plauku kritimas, tonavimas ir galvos odos prieziura.",
    features: ["Arbatos baras", "Naturalios priemones", "Tyli erdve"],
    specialists: [
      {
        id: "gabija",
        name: "Gabija",
        role: "Cut specialist",
        load: 74,
        photoGroup: "women",
        photoIndex: 32,
        bio: "Kuria lengvas formas, curtain bangs ir issaugo plauku ilgi be sunkumo.",
      },
      {
        id: "rokas",
        name: "Rokas",
        role: "Scalp therapist",
        load: 58,
        photoGroup: "men",
        photoIndex: 52,
        bio: "Dirba su galvos odos jautrumu, atstatomosiomis proceduromis ir svytejimu.",
      },
    ],
    baseSlots: ["10:00", "11:30", "13:30", "16:00", "18:20"],
  },
  {
    id: "sruogu-namai",
    name: "Sruogu Namai",
    city: "Kaunas",
    neighborhood: "Centras",
    category: "Plaukai",
    rating: 4.7,
    reviews: 603,
    instant: false,
    repeatRate: 59,
    occupancy: 74,
    priceShift: -2,
    description:
      "Stilingas miesto salonas, orientuotas i sruogavima, tonavima ir minkstas kasdienes sukuosenas.",
    features: ["Studentu mylimas", "Paketas dviems", "Wi-Fi"],
    specialists: [
      {
        id: "lineta",
        name: "Lineta",
        role: "Blond expert",
        load: 81,
        photoGroup: "women",
        photoIndex: 21,
        bio: "Megsta skaidrius blond tonus, sunkiai pastebimus perejimus ir naturalu svytejima.",
      },
      {
        id: "dovile",
        name: "Dovile",
        role: "Stylist",
        load: 66,
        photoGroup: "women",
        photoIndex: 56,
        bio: "Padeda pritaikyti kirpima pagal veido forma ir kasdienio stilizavimo iprocius.",
      },
    ],
    baseSlots: ["09:45", "11:00", "13:15", "15:45", "17:30"],
  },
  {
    id: "atelier27",
    name: "Atelier 27 Hair Room",
    city: "Kaunas",
    neighborhood: "Silainiai",
    category: "Plaukai",
    rating: 4.8,
    reviews: 489,
    instant: true,
    repeatRate: 57,
    occupancy: 68,
    priceShift: 1,
    description:
      "Minimalistine hair room erdve su konsultaciniais dazymais ir glotniomis blowout sesijomis.",
    features: ["Konsultacija", "Baby friendly", "Kortele"],
    specialists: [
      {
        id: "saule-hair",
        name: "Saule",
        role: "Color designer",
        load: 71,
        photoGroup: "women",
        photoIndex: 70,
        bio: "Derina silta ir salta tona pagal odos atspalvi, kad spalva atrodytu gaiviai.",
      },
      {
        id: "arnas",
        name: "Arnas",
        role: "Blowout artist",
        load: 54,
        photoGroup: "men",
        photoIndex: 31,
        bio: "Kurdamas issilaikancias sukuosenas orientuojasi i apimti ir natūralu judesi.",
      },
    ],
    baseSlots: ["10:15", "12:15", "14:15", "16:30", "18:00"],
  },
  {
    id: "plume-story",
    name: "Plume Story Studio",
    city: "Klaipeda",
    neighborhood: "Senamiestis",
    category: "Plaukai",
    rating: 4.9,
    reviews: 538,
    instant: true,
    repeatRate: 63,
    occupancy: 83,
    priceShift: 4,
    description:
      "Pajurio hair lounge, kuriame daug demesio skiriama glotnumui, spindesiui ir personalizuotai spalvai.",
    features: ["Pajurio vaizdas", "Vakariniai laikai", "Premium prieziura"],
    specialists: [
      {
        id: "vilte",
        name: "Vilte",
        role: "Hair artist",
        load: 87,
        photoGroup: "women",
        photoIndex: 47,
        bio: "Kuriasi svelniai judancius plaukus, pakelima prie saknu ir foto draugiskus tonus.",
      },
      {
        id: "domas",
        name: "Domas",
        role: "Treatment expert",
        load: 64,
        photoGroup: "men",
        photoIndex: 36,
        bio: "Renkasi atstatomasias proceduras ir sveiko plauko efekta be apsunkinimo.",
      },
    ],
    baseSlots: ["09:20", "10:50", "13:10", "15:30", "18:10"],
  },
  {
    id: "aura",
    name: "Aura Nail Loft",
    city: "Vilnius",
    neighborhood: "Senamiestis",
    category: "Nagai",
    rating: 4.8,
    reviews: 611,
    instant: false,
    repeatRate: 72,
    occupancy: 88,
    priceShift: 1,
    description:
      "Nagu studija su tvarkingais nude tonais, ilga laikysena ir tiksliu darbelio tempu.",
    features: ["Pedikiuro zona", "Instagrammable", "Po darbo"],
    specialists: [
      {
        id: "kamile",
        name: "Kamile",
        role: "Nail artist",
        load: 93,
        photoGroup: "women",
        photoIndex: 41,
        bio: "Kuriasi svarius nude, pieno ir chrome dizainus kasdieniams ir sventiniams atvejams.",
      },
      {
        id: "egle",
        name: "Egle",
        role: "Pedicure expert",
        load: 64,
        photoGroup: "women",
        photoIndex: 55,
        bio: "Megsta pedikiuro ritualus, tvarkinga forma ir ilgiau issilaikanti rezultata.",
      },
    ],
    baseSlots: ["09:45", "11:15", "15:30", "18:20"],
  },
  {
    id: "milk-nails",
    name: "Milk Nails Room",
    city: "Vilnius",
    neighborhood: "Naujamiestis",
    category: "Nagai",
    rating: 4.9,
    reviews: 522,
    instant: true,
    repeatRate: 69,
    occupancy: 81,
    priceShift: 0,
    description:
      "Svelniu tonu nagu kambarys, kur dominuoja tvarkingos formos, french ir pieniski atspalviai.",
    features: ["French menu", "Greiti laikai", "Kortele"],
    specialists: [
      {
        id: "salomeja",
        name: "Salomeja",
        role: "French specialist",
        load: 84,
        photoGroup: "women",
        photoIndex: 60,
        bio: "Puikiai jaucia trumpa, svari nagu forma ir tvarkinga pienisko french linija.",
      },
      {
        id: "justina",
        name: "Justina",
        role: "Builder gel pro",
        load: 72,
        photoGroup: "women",
        photoIndex: 64,
        bio: "Dirba su ilgesne forma, builder korekcijomis ir itin lygiu pavirsiumi.",
      },
    ],
    baseSlots: ["10:10", "12:40", "14:50", "17:10", "19:00"],
  },
  {
    id: "studio-polka",
    name: "Studio Polka Nails",
    city: "Kaunas",
    neighborhood: "Zaliakalnis",
    category: "Nagai",
    rating: 4.7,
    reviews: 406,
    instant: true,
    repeatRate: 54,
    occupancy: 66,
    priceShift: -2,
    description:
      "Linksma nagu studija, kur derinami minimalistiniai dizainai, spalvu taskai ir sezono akcentai.",
    features: ["Dizaino meniu", "Mergvakariams", "Centras"],
    specialists: [
      {
        id: "medeina",
        name: "Medeina",
        role: "Design nail artist",
        load: 71,
        photoGroup: "women",
        photoIndex: 48,
        bio: "Megsta smulkius grafinius elementus, taškelius ir spalviskai ramius derinius.",
      },
      {
        id: "fausta",
        name: "Fausta",
        role: "Classic manicure",
        load: 59,
        photoGroup: "women",
        photoIndex: 28,
        bio: "Dirba greitai ir tiksliai, kai reikia tvarkingo manikiuro be ilgo sedėjimo.",
      },
    ],
    baseSlots: ["09:30", "11:45", "13:30", "16:15", "18:05"],
  },
  {
    id: "pink-room",
    name: "Pink Room Studio",
    city: "Kaunas",
    neighborhood: "Centras",
    category: "Nagai",
    rating: 4.8,
    reviews: 377,
    instant: false,
    repeatRate: 61,
    occupancy: 71,
    priceShift: 2,
    description:
      "Jauki studija, kurioje klientai renkasi glaze efektus, tvarkinga forma ir ramią atmosfera.",
    features: ["Quiet room", "Coffee", "Top glaze"],
    specialists: [
      {
        id: "migle",
        name: "Migle",
        role: "Glaze specialist",
        load: 77,
        photoGroup: "women",
        photoIndex: 24,
        bio: "Kuriasi stiklo efekto pavirsiu, glazura ir svarius neutralios paletes nagus.",
      },
      {
        id: "neda",
        name: "Neda",
        role: "Pedicure artist",
        load: 63,
        photoGroup: "women",
        photoIndex: 36,
        bio: "Atidziai dirba su pedikiuru ir patogiu rezultatu aktyviam kasdieniam ritmui.",
      },
    ],
    baseSlots: ["10:20", "12:20", "14:40", "17:00", "18:40"],
  },
  {
    id: "gloss-harbor",
    name: "Gloss Harbor Nails",
    city: "Klaipeda",
    neighborhood: "Pajuris",
    category: "Nagai",
    rating: 4.9,
    reviews: 295,
    instant: true,
    repeatRate: 65,
    occupancy: 79,
    priceShift: 3,
    description:
      "Pajurio nagu erdve su sviesiais tonais, glossy pavirsiumi ir greitais vakarais po darbo.",
    features: ["Pajuris", "Express", "Gloss finish"],
    specialists: [
      {
        id: "leva",
        name: "Ieva",
        role: "Gloss nail pro",
        load: 80,
        photoGroup: "women",
        photoIndex: 72,
        bio: "Megsta spindinti pavirsiu, pieniska nude ir itin tiksliai nugludinta odeliu zona.",
      },
      {
        id: "ema",
        name: "Ema",
        role: "Builder gel artist",
        load: 67,
        photoGroup: "women",
        photoIndex: 19,
        bio: "Dirba su tvirta forma ir builder sprendimais toms, kurios nori ilgesnio rezultato.",
      },
    ],
    baseSlots: ["09:50", "11:30", "13:50", "16:20", "18:30"],
  },
  {
    id: "amber",
    name: "Amber Skin Studio",
    city: "Kaunas",
    neighborhood: "Centras",
    category: "Veidas",
    rating: 4.8,
    reviews: 842,
    instant: true,
    repeatRate: 58,
    occupancy: 76,
    priceShift: 3,
    description:
      "Veido proceduru studija, orientuota i odos diagnostika, glow efekta ir antakiu dizaina.",
    features: ["Skin scan", "Kortele", "Po darbo"],
    specialists: [
      {
        id: "ieva",
        name: "Ieva",
        role: "Skin therapist",
        load: 81,
        photoGroup: "women",
        photoIndex: 62,
        bio: "Dirba su glow, drėkinimu ir odos komfortu, kai reikia greito svytejimo efekto.",
      },
      {
        id: "karina",
        name: "Karina",
        role: "Brow expert",
        load: 63,
        photoGroup: "women",
        photoIndex: 14,
        bio: "Formuoja antakius pagal natūralią proporciją ir megsta minksta laminavimo rezultata.",
      },
    ],
    baseSlots: ["10:00", "11:30", "13:45", "16:00", "18:15"],
  },
  {
    id: "nord",
    name: "Nord Brow & Lash",
    city: "Vilnius",
    neighborhood: "Siaures miestelis",
    category: "Veidas",
    rating: 4.9,
    reviews: 734,
    instant: true,
    repeatRate: 64,
    occupancy: 79,
    priceShift: -2,
    description:
      "Minimalistine studija antakiu, blakstienu ir greitu veido proceduru rezervacijoms po darbo.",
    features: ["Greitos proceduros", "Kortele", "Vakariniai laikai"],
    specialists: [
      {
        id: "greta",
        name: "Greta",
        role: "Brow stylist",
        load: 84,
        photoGroup: "women",
        photoIndex: 53,
        bio: "Megsta svelnia forma, neskubraus brow mapping ir itin tvarkinga atspalvio parinkima.",
      },
      {
        id: "ugne",
        name: "Ugne",
        role: "Lash artist",
        load: 71,
        photoGroup: "women",
        photoIndex: 29,
        bio: "Kuriasi atviru zvilgsniu efekta, natūralu pakelima ir lengva blakstienu ritma.",
      },
    ],
    baseSlots: ["08:40", "11:50", "14:20", "18:10"],
  },
  {
    id: "skin-script",
    name: "Skin Script Room",
    city: "Vilnius",
    neighborhood: "Zverynas",
    category: "Veidas",
    rating: 4.7,
    reviews: 502,
    instant: true,
    repeatRate: 60,
    occupancy: 70,
    priceShift: 2,
    description:
      "Ramiai atmosferai skirta odos prieziuros studija su valymais, glow proceduromis ir konsultacijomis.",
    features: ["Konsultacija", "Sensitive skin", "Dermaplaning"],
    specialists: [
      {
        id: "gabija-skin",
        name: "Gabija",
        role: "Facialist",
        load: 73,
        photoGroup: "women",
        photoIndex: 74,
        bio: "Padeda atkurti odos komforta, mazina papilkėjima ir pritaiko svelnias prieziuras.",
      },
      {
        id: "elze",
        name: "Elze",
        role: "Skin analyst",
        load: 61,
        photoGroup: "women",
        photoIndex: 43,
        bio: "Dirba su odos stebejimu, proceduru suderinimu ir namu rutinos patarimais.",
      },
    ],
    baseSlots: ["09:20", "11:10", "13:20", "15:50", "18:00"],
  },
  {
    id: "glow-atelier",
    name: "Glow Atelier House",
    city: "Kaunas",
    neighborhood: "Zaliakalnis",
    category: "Veidas",
    rating: 4.8,
    reviews: 447,
    instant: false,
    repeatRate: 56,
    occupancy: 67,
    priceShift: 1,
    description:
      "Studio pobudzio vieta, orientuota i glow efektus, odos svytejima ir tvarkingas brow proceduras.",
    features: ["Glow menu", "Quiet room", "Coffee"],
    specialists: [
      {
        id: "ramune",
        name: "Ramune",
        role: "Glow therapist",
        load: 68,
        photoGroup: "women",
        photoIndex: 39,
        bio: "Megsta drėkinimo proceduras, skaistuma ir tvarkingai suplanuota rezultatą prieš renginius.",
      },
      {
        id: "monika-brow",
        name: "Monika",
        role: "Brow and lash pro",
        load: 57,
        photoGroup: "women",
        photoIndex: 16,
        bio: "Dirba su brow-lam ir lash-lift, kai reikia tvarkingo efekto be stipraus dramatiškumo.",
      },
    ],
    baseSlots: ["10:30", "12:15", "14:00", "16:30", "18:40"],
  },
  {
    id: "brow-muse",
    name: "Brow Muse Studio",
    city: "Klaipeda",
    neighborhood: "Centras",
    category: "Veidas",
    rating: 4.9,
    reviews: 331,
    instant: true,
    repeatRate: 66,
    occupancy: 73,
    priceShift: -1,
    description:
      "Studija antakiams, blakstienoms ir mini glow proceduroms, kai nori greitai atrodyti pailsėjusi.",
    features: ["Brow mapping", "Quick glow", "Kortele"],
    specialists: [
      {
        id: "eva",
        name: "Eva",
        role: "Brow muse",
        load: 78,
        photoGroup: "women",
        photoIndex: 27,
        bio: "Akcentuoja natūrali antakiu pakelima ir tvarkinga forma prie skirtingu veido tipu.",
      },
      {
        id: "inga",
        name: "Inga",
        role: "Lash lift pro",
        load: 59,
        photoGroup: "women",
        photoIndex: 63,
        bio: "Megsta atvira zvilgsni be sunkumo, minksta uzrietima ir tvarkinga pigmenta.",
      },
    ],
    baseSlots: ["09:15", "11:40", "13:45", "16:10", "18:25"],
  },
  {
    id: "calm",
    name: "Calm Ritual Spa",
    city: "Klaipeda",
    neighborhood: "Pajuris",
    category: "Masazai",
    rating: 4.9,
    reviews: 506,
    instant: true,
    repeatRate: 61,
    occupancy: 69,
    priceShift: 0,
    description:
      "Pajurio spa erdve su poru ritualais, sportiniais masazais ir vakariniais atsipalaidavimo seansais.",
    features: ["Spa lounge", "Poroms", "Dovanu kuponai"],
    specialists: [
      {
        id: "lukas",
        name: "Lukas",
        role: "Therapist",
        load: 57,
        photoGroup: "men",
        photoIndex: 41,
        bio: "Dirba su nugara, itampa ir atpalaidavimu, kai po darbo reikia greitai atsileisti.",
      },
      {
        id: "rasa",
        name: "Rasa",
        role: "Ritual specialist",
        load: 73,
        photoGroup: "women",
        photoIndex: 31,
        bio: "Kuriasi pilnus ritualus su kvapais, svelniu tempu ir aiskia atsipalaidavimo kryptimi.",
      },
    ],
    baseSlots: ["10:15", "12:30", "14:00", "17:30", "19:00"],
  },
  {
    id: "ritual-studio",
    name: "Ritual Studio 8",
    city: "Vilnius",
    neighborhood: "Naujamiestis",
    category: "Masazai",
    rating: 4.8,
    reviews: 422,
    instant: true,
    repeatRate: 58,
    occupancy: 72,
    priceShift: 2,
    description:
      "Miesto masažu studija su giliais nugaros seansais, pečių atlaisvinimu ir vakariniais laikais.",
    features: ["After work", "Shower", "Kortele"],
    specialists: [
      {
        id: "mantas",
        name: "Mantas",
        role: "Deep tissue therapist",
        load: 76,
        photoGroup: "men",
        photoIndex: 22,
        bio: "Megsta tikslinga darba su nugara, pečiais ir aiškiai juntamu palengvejimu po sedimo darbo.",
      },
      {
        id: "oda",
        name: "Oda",
        role: "Relax therapist",
        load: 62,
        photoGroup: "women",
        photoIndex: 46,
        bio: "Kuria leta, svelnu, bet veiksminga rituala su daug demesio kvapui ir tempui.",
      },
    ],
    baseSlots: ["09:40", "11:20", "13:00", "16:10", "18:50"],
  },
  {
    id: "banga-spa",
    name: "Banga Spa Room",
    city: "Klaipeda",
    neighborhood: "Melnrage",
    category: "Masazai",
    rating: 4.7,
    reviews: 318,
    instant: false,
    repeatRate: 53,
    occupancy: 64,
    priceShift: -1,
    description:
      "Tylesne pajurio erdve atsipalaidavimui, poru apsilankymams ir lėtesniems vakaro ritualams.",
    features: ["Pajurio kvapai", "Poroms", "Vakariniai laikai"],
    specialists: [
      {
        id: "nomeda",
        name: "Nomeda",
        role: "Spa therapist",
        load: 58,
        photoGroup: "women",
        photoIndex: 57,
        bio: "Derina letus, raminancius judesius ir svelniu aromatu rituala po ilgos dienos.",
      },
      {
        id: "paulius",
        name: "Paulius",
        role: "Recovery therapist",
        load: 51,
        photoGroup: "men",
        photoIndex: 47,
        bio: "Dirba su sporto nuovargiu ir kompensuoja peties, nugaros bei kaklo itampa.",
      },
    ],
    baseSlots: ["10:00", "12:20", "14:40", "17:00", "19:10"],
  },
  {
    id: "tyla-body",
    name: "Tyla Body Studio",
    city: "Kaunas",
    neighborhood: "Centras",
    category: "Masazai",
    rating: 4.9,
    reviews: 365,
    instant: true,
    repeatRate: 68,
    occupancy: 78,
    priceShift: 3,
    description:
      "Kuno terapiju studija su nugaros, sportiniu ir atpalaiduojanciu masazu meniu vienoje vietoje.",
    features: ["Sportui", "Quiet room", "Po darbo"],
    specialists: [
      {
        id: "justas",
        name: "Justas",
        role: "Sports therapist",
        load: 82,
        photoGroup: "men",
        photoIndex: 61,
        bio: "Renkasi sportini darba, kai reikia atleisti blauzdas, nugara ir po treniruotes pavargusi kuna.",
      },
      {
        id: "adelina",
        name: "Adelina",
        role: "Body ritual expert",
        load: 66,
        photoGroup: "women",
        photoIndex: 52,
        bio: "Megsta ramesnius spa seansus, kuriuose svarbu tempas, kvapas ir gera savijauta po jų.",
      },
    ],
    baseSlots: ["09:50", "11:50", "14:10", "16:30", "18:20"],
  },
  {
    id: "ember-touch",
    name: "Ember Touch House",
    city: "Vilnius",
    neighborhood: "Seskine",
    category: "Masazai",
    rating: 4.8,
    reviews: 284,
    instant: true,
    repeatRate: 55,
    occupancy: 63,
    priceShift: 1,
    description:
      "Siuolaikine masažu erdve, orientuota i greita atsigavima, nugaros atlaisvinima ir poru ritualus.",
    features: ["Express back", "Poroms", "Parkingas"],
    specialists: [
      {
        id: "giedrius",
        name: "Giedrius",
        role: "Back relief therapist",
        load: 69,
        photoGroup: "men",
        photoIndex: 28,
        bio: "Dirba su sedincio darbo palikta kaklo ir nugaros itampa bei greitu palengvejimo jausmu.",
      },
      {
        id: "ruta-body",
        name: "Ruta",
        role: "Relax expert",
        load: 57,
        photoGroup: "women",
        photoIndex: 69,
        bio: "Kuriasi ramius ritualus, kai svarbu letai perjungti kuna is darbo i poilsio rezima.",
      },
    ],
    baseSlots: ["10:30", "12:45", "15:15", "17:30", "19:20"],
  },
];

const contentOverrides = {
  atelier27: {
    specialists: {
      arnas: {
        bio: "Kurdamas issilaikancias sukuosenas orientuojasi i apimti ir naturalu judesi.",
      },
    },
  },
  "studio-polka": {
    specialists: {
      medeina: {
        bio: "Megsta smulkius grafinius elementus, taskelius ir spalviskai ramius derinius.",
      },
      fausta: {
        bio: "Dirba greitai ir tiksliai, kai reikia tvarkingo manikiuro be ilgo sedejimo.",
      },
    },
  },
  "pink-room": {
    description:
      "Jauki studija, kurioje klientai renkasi glaze efektus, tvarkinga forma ir ramia atmosfera.",
  },
  amber: {
    specialists: {
      ieva: {
        bio: "Dirba su glow, drekinimu ir odos komfortu, kai reikia greito svytejimo efekto.",
      },
      karina: {
        bio: "Formuoja antakius pagal naturalia proporcija ir megsta minksta laminavimo rezultata.",
      },
    },
  },
  nord: {
    specialists: {
      ugne: {
        bio: "Kuria atviro zvilgsnio efekta, naturalu pakelima ir lengva blakstienu ritma.",
      },
    },
  },
  "skin-script": {
    specialists: {
      "gabija-skin": {
        bio: "Padeda atkurti odos komforta, mazina papilkejima ir pritaiko svelnias prieziuras.",
      },
    },
  },
  "glow-atelier": {
    specialists: {
      ramune: {
        bio: "Megsta drekinimo proceduras, skaistuma ir tvarkingai suplanuota rezultata pries renginius.",
      },
      "monika-brow": {
        bio: "Dirba su brow-lam ir lash-lift, kai reikia tvarkingo efekto be stipraus dramatiskumo.",
      },
    },
  },
  "brow-muse": {
    description:
      "Studija antakiams, blakstienoms ir mini glow proceduroms, kai nori greitai atrodyti pailsejusi.",
    specialists: {
      eva: {
        bio: "Akcentuoja naturalu antakiu pakelima ir tvarkinga forma prie skirtingu veido tipu.",
      },
    },
  },
  "ritual-studio": {
    description:
      "Miesto masazu studija su giliais nugaros seansais, peciu atlaisvinimu ir vakariniais laikais.",
    specialists: {
      mantas: {
        bio: "Megsta tikslinga darba su nugara, peciais ir aiskiai juntamu palengvejimu po sedimo darbo.",
      },
    },
  },
  "banga-spa": {
    description:
      "Tylesne pajurio erdve atsipalaidavimui, poru apsilankymams ir letesniems vakaro ritualams.",
  },
  "tyla-body": {
    specialists: {
      adelina: {
        bio: "Megsta ramesnius spa seansus, kuriuose svarbu tempas, kvapas ir gera savijauta po ju.",
      },
    },
  },
  "ember-touch": {
    description:
      "Siuolaikine masazu erdve, orientuota i greita atsigavima, nugaros atlaisvinima ir poru ritualus.",
  },
};

function applyContentOverrides(salon) {
  const override = contentOverrides[salon.id];
  if (!override) {
    return salon;
  }

  return {
    ...salon,
    description: override.description || salon.description,
    specialists: salon.specialists.map((specialist) => {
      const specialistOverride = override.specialists?.[specialist.id];
      return specialistOverride ? { ...specialist, ...specialistOverride } : specialist;
    }),
  };
}

const generatedSalonSeeds = {
  Plaukai: [
    {
      name: "Muse Cut Studio",
      city: "Vilnius",
      neighborhood: "Senamiestis",
      rating: 4.8,
      reviews: 464,
      instant: true,
      repeatRate: 63,
      occupancy: 75,
      priceShift: 2,
      description: "Miesto plauku studija su greitais kirpimais, tonavimu ir vakarinemis rezervacijomis.",
      features: ["Blowout menu", "Po darbo", "Kortele"],
    },
    {
      name: "Noir Blowout Bar",
      city: "Vilnius",
      neighborhood: "Seskine",
      rating: 4.7,
      reviews: 392,
      instant: true,
      repeatRate: 60,
      occupancy: 71,
      priceShift: 1,
      description: "Tamsesnio braizo hair baras, kuriame vyrauja glotnus formavimas ir sveiko plauko efektas.",
      features: ["Express", "Parkingas", "Tylus kampas"],
    },
    {
      name: "Silk Frame House",
      city: "Kaunas",
      neighborhood: "Centras",
      rating: 4.8,
      reviews: 426,
      instant: false,
      repeatRate: 58,
      occupancy: 70,
      priceShift: 0,
      description: "Jauki plauku erdve, orientuota i sruogas, pakelima prie saknu ir sviesius tonus.",
      features: ["Konsultacija", "Wi-Fi", "Coffee"],
    },
    {
      name: "Gloss Avenue Hair",
      city: "Kaunas",
      neighborhood: "Zaliakalnis",
      rating: 4.9,
      reviews: 501,
      instant: true,
      repeatRate: 65,
      occupancy: 82,
      priceShift: 3,
      description: "Plauku studija blizgesiui, glotnumui ir foto draugiskam rezultatui po kiekvieno vizito.",
      features: ["Gloss menu", "Vakariniai laikai", "Premium prieziura"],
    },
    {
      name: "Halo Strand Club",
      city: "Klaipeda",
      neighborhood: "Pajuris",
      rating: 4.8,
      reviews: 378,
      instant: true,
      repeatRate: 61,
      occupancy: 74,
      priceShift: 2,
      description: "Pajurio plauku salonas su minkstais perejimais, kirpimais ir atstatomosiomis proceduromis.",
      features: ["Pajuris", "Express care", "Kortele"],
    },
  ],
  Nagai: [
    {
      name: "Nude Craft Room",
      city: "Vilnius",
      neighborhood: "Zverynas",
      rating: 4.8,
      reviews: 433,
      instant: true,
      repeatRate: 67,
      occupancy: 78,
      priceShift: 1,
      description: "Nagu studija svariam nude, milk tones ir tvarkingam manikiurui be skubejimo.",
      features: ["French menu", "Po darbo", "Kortele"],
    },
    {
      name: "Mocha Mani Loft",
      city: "Vilnius",
      neighborhood: "Naujamiestis",
      rating: 4.7,
      reviews: 358,
      instant: true,
      repeatRate: 59,
      occupancy: 69,
      priceShift: 0,
      description: "Minksto braizo nagu loftas su glazura, builder korekcijomis ir pedikiuro zona.",
      features: ["Builder gel", "Coffee", "Greiti laikai"],
    },
    {
      name: "Velvet Nail Code",
      city: "Kaunas",
      neighborhood: "Silainiai",
      rating: 4.8,
      reviews: 402,
      instant: false,
      repeatRate: 62,
      occupancy: 72,
      priceShift: 2,
      description: "Nagu kambarys, kuriame dominuoja minimalistinis dizainas, stipri forma ir ilgesne laikysena.",
      features: ["Dizaino meniu", "Quiet room", "Centras"],
    },
    {
      name: "Sunday Gloss Lab",
      city: "Kaunas",
      neighborhood: "Centras",
      rating: 4.9,
      reviews: 447,
      instant: true,
      repeatRate: 66,
      occupancy: 80,
      priceShift: 3,
      description: "Gloss stilistikos nagu studija su tvarkingu pavirsiumi, french ir svelniais atspalviais.",
      features: ["Gloss finish", "Top glaze", "Kortele"],
    },
    {
      name: "Harbor Mani Studio",
      city: "Klaipeda",
      neighborhood: "Melnrage",
      rating: 4.8,
      reviews: 336,
      instant: true,
      repeatRate: 60,
      occupancy: 73,
      priceShift: 1,
      description: "Pajurio nagu vieta, kurioje klientai renkasi svarius tonus ir ilgesni rezultato nesiojima.",
      features: ["Pajuris", "Pedikiuras", "Express"],
    },
  ],
  Veidas: [
    {
      name: "Skin Bloom Lab",
      city: "Vilnius",
      neighborhood: "Senamiestis",
      rating: 4.8,
      reviews: 472,
      instant: true,
      repeatRate: 63,
      occupancy: 74,
      priceShift: 2,
      description: "Veido proceduru laboratorija glow efektui, druskinimui ir tvarkingai odos rutinai.",
      features: ["Glow menu", "Skin scan", "Kortele"],
    },
    {
      name: "Clear Ritual Room",
      city: "Vilnius",
      neighborhood: "Seskine",
      rating: 4.7,
      reviews: 381,
      instant: true,
      repeatRate: 57,
      occupancy: 68,
      priceShift: 0,
      description: "Studija jautriai odai, antakiams ir greitam svytejimui pries dienos planus.",
      features: ["Sensitive skin", "Po darbo", "Coffee"],
    },
    {
      name: "Brow Edit House",
      city: "Kaunas",
      neighborhood: "Centras",
      rating: 4.9,
      reviews: 451,
      instant: true,
      repeatRate: 65,
      occupancy: 77,
      priceShift: 1,
      description: "Antakiu ir blakstienu studija su glow paslaugomis, brow mapping ir laminavimu.",
      features: ["Brow mapping", "Quick glow", "Kortele"],
    },
    {
      name: "Glow Index Studio",
      city: "Kaunas",
      neighborhood: "Zaliakalnis",
      rating: 4.8,
      reviews: 408,
      instant: false,
      repeatRate: 61,
      occupancy: 72,
      priceShift: 2,
      description: "Veido proceduru vieta skaistumui, valymui ir sklandziai suderintai namu rutinai.",
      features: ["Consulting", "Quiet room", "Glow bar"],
    },
    {
      name: "Sea Light Skin Bar",
      city: "Klaipeda",
      neighborhood: "Pajuris",
      rating: 4.9,
      reviews: 365,
      instant: true,
      repeatRate: 64,
      occupancy: 76,
      priceShift: 1,
      description: "Pajurio skin baras mini ritualams, antakiams ir gaiviam odos vaizdui po vieno vizito.",
      features: ["Pajuris", "Mini glow", "Vakariniai laikai"],
    },
  ],
  Masazai: [
    {
      name: "Drift Massage Room",
      city: "Vilnius",
      neighborhood: "Zverynas",
      rating: 4.8,
      reviews: 391,
      instant: true,
      repeatRate: 59,
      occupancy: 70,
      priceShift: 1,
      description: "Masazu erdve nugaros atlaisvinimui, poru ritualams ir ramiam vakariniam tempui.",
      features: ["After work", "Poroms", "Dusas"],
    },
    {
      name: "Quiet Pressure Studio",
      city: "Vilnius",
      neighborhood: "Naujamiestis",
      rating: 4.7,
      reviews: 347,
      instant: true,
      repeatRate: 56,
      occupancy: 66,
      priceShift: 0,
      description: "Miesto terapiju kambarys, skirtas peciu, kaklo ir nugaros itampai po darbo dienos.",
      features: ["Deep tissue", "Kortele", "Tylu"],
    },
    {
      name: "Reset Body House",
      city: "Kaunas",
      neighborhood: "Silainiai",
      rating: 4.9,
      reviews: 429,
      instant: true,
      repeatRate: 67,
      occupancy: 79,
      priceShift: 2,
      description: "Kuno terapiju studija sportiniam atsigavimui, atpalaidavimui ir poru apsilankymams.",
      features: ["Sportui", "Poroms", "Po darbo"],
    },
    {
      name: "Flow Therapy Lab",
      city: "Kaunas",
      neighborhood: "Centras",
      rating: 4.8,
      reviews: 388,
      instant: false,
      repeatRate: 60,
      occupancy: 71,
      priceShift: 1,
      description: "Terapinis salonas, kuriame derinamas gilus darbas su nugara ir ramesni spa ritualai.",
      features: ["Recovery", "Quiet room", "Kortele"],
    },
    {
      name: "Shore Calm Spa",
      city: "Klaipeda",
      neighborhood: "Melnrage",
      rating: 4.9,
      reviews: 352,
      instant: true,
      repeatRate: 63,
      occupancy: 75,
      priceShift: 3,
      description: "Pajurio spa vieta su poru ritualais, nugara atlaisvinanciais seansais ir letesniu tempu.",
      features: ["Pajuris", "Spa lounge", "Dovanu kuponai"],
    },
  ],
};

const slotSets = [
  ["09:00", "10:20", "12:10", "14:00", "16:15", "18:30"],
  ["09:30", "11:10", "13:00", "15:20", "17:10", "18:50"],
  ["08:40", "10:10", "12:30", "14:20", "16:40", "18:10"],
  ["09:15", "11:00", "12:45", "15:10", "17:30", "19:00"],
  ["10:00", "11:40", "13:20", "15:30", "17:45", "19:10"],
];

const specialistFactoryData = {
  Plaukai: {
    people: [
      { name: "Emilija", group: "women" },
      { name: "Goda", group: "women" },
      { name: "Patricija", group: "women" },
      { name: "Austeja", group: "women" },
      { name: "Livija", group: "women" },
      { name: "Kamile", group: "women" },
      { name: "Tadas", group: "men" },
      { name: "Benas", group: "men" },
      { name: "Nojus", group: "men" },
      { name: "Matas", group: "men" },
      { name: "Vilma", group: "women" },
      { name: "Juste", group: "women" },
      { name: "Jonas", group: "men" },
      { name: "Kajus", group: "men" },
      { name: "Egle", group: "women" },
      { name: "Ula", group: "women" },
    ],
    roles: ["Colorist", "Hair stylist", "Cut specialist", "Blowout artist", "Scalp therapist", "Treatment expert"],
    bios: [
      "Dirba su minkstais perejimais, glotnumu ir sviesiais tonais kasdieniam nesiojimui.",
      "Megsta formuoti lengvas formas, kurios atrodo tvarkingai ir po keliu savaiciu.",
      "Akcentuoja sveiko plauko vaizda, blizgesi ir patogu kasdienio stilizavimo ritma.",
      "Kuria apimti, svelnu judesi ir tvarkinga sukuosenos kritima nuo pat pirmo vizito.",
      "Padeda suderinti spalva, kirpima ir prieziura, kad rezultatas liktu ilgiau.",
      "Orientuojasi i glotnuma, pakelima prie saknu ir lengvai priziurima forma.",
    ],
  },
  Nagai: {
    people: [
      { name: "Salomeja", group: "women" },
      { name: "Gintare", group: "women" },
      { name: "Migle", group: "women" },
      { name: "Urte", group: "women" },
      { name: "Deimante", group: "women" },
      { name: "Toma", group: "women" },
      { name: "Aire", group: "women" },
      { name: "Auguste", group: "women" },
      { name: "Guste", group: "women" },
      { name: "Rugile", group: "women" },
      { name: "Atene", group: "women" },
      { name: "Karole", group: "women" },
      { name: "Lina", group: "women" },
      { name: "Neringa", group: "women" },
      { name: "Vita", group: "women" },
      { name: "Paulina", group: "women" },
    ],
    roles: ["Nail artist", "Manicure expert", "Pedicure pro", "Builder gel artist", "French specialist", "Design specialist"],
    bios: [
      "Megsta svarius tonus, tvarkinga forma ir rezultata, kuris atrodo lengvai bei estetinai.",
      "Dirba su builder, ilgesne forma ir itin lygiu pavirsiumi kasdieniams klientems.",
      "Akcentuoja nude, milk ir french krypti, kai norisi labai svaraus vaizdo.",
      "Kuria minimalistinius dizainus, taskelius ir subtilius sezono akcentus.",
      "Atidziai dirba su pedikiuru ir patogia, ilgiau laikancia nagu forma.",
      "Orientuojasi i greita, bet labai tvarkinga darba be bereikalingo sunkumo.",
    ],
  },
  Veidas: {
    people: [
      { name: "Ieva", group: "women" },
      { name: "Karina", group: "women" },
      { name: "Greta", group: "women" },
      { name: "Ugne", group: "women" },
      { name: "Elze", group: "women" },
      { name: "Monika", group: "women" },
      { name: "Ramune", group: "women" },
      { name: "Eva", group: "women" },
      { name: "Inga", group: "women" },
      { name: "Nijole", group: "women" },
      { name: "Simona", group: "women" },
      { name: "Asta", group: "women" },
      { name: "Jorune", group: "women" },
      { name: "Adele", group: "women" },
      { name: "Lina", group: "women" },
      { name: "Silvija", group: "women" },
    ],
    roles: ["Skin therapist", "Facialist", "Brow expert", "Lash artist", "Glow therapist", "Skin analyst"],
    bios: [
      "Dirba su odos skaistumu, komfortu ir tvarkingai suderintomis proceduromis pagal poreiki.",
      "Megsta glow krypti, lengva odos svytejima ir aisku prieziuros plana po vizito.",
      "Formuoja antakius pagal naturalia proporcija ir svelniai parenka tinkama atspalvi.",
      "Kuria atvira zvilgsni, tvarkinga laminavimo efekta ir minkstesne bendra israiska.",
      "Padeda mazinti papilkejima, atkurti dregmes jausma ir gaivesni odos vaizda.",
      "Derina valyma, glow ir antakiu prieziura, kad vizitas butu vienas ir labai aiskus.",
    ],
  },
  Masazai: {
    people: [
      { name: "Lukas", group: "men" },
      { name: "Rasa", group: "women" },
      { name: "Mantas", group: "men" },
      { name: "Oda", group: "women" },
      { name: "Nomeda", group: "women" },
      { name: "Paulius", group: "men" },
      { name: "Justas", group: "men" },
      { name: "Adelina", group: "women" },
      { name: "Giedrius", group: "men" },
      { name: "Ruta", group: "women" },
      { name: "Aurelijus", group: "men" },
      { name: "Dalia", group: "women" },
      { name: "Saulius", group: "men" },
      { name: "Nora", group: "women" },
      { name: "Karolis", group: "men" },
      { name: "Egle", group: "women" },
    ],
    roles: ["Therapist", "Deep tissue specialist", "Sports therapist", "Relax therapist", "Recovery expert", "Body ritual pro"],
    bios: [
      "Dirba su nugara, peciais ir kaklo itampa, kai reikia aiskiai juntamo palengvejimo.",
      "Megsta sportini darba, blauzdas atpalaiduojancias technikas ir greitesni atsigavima.",
      "Kuria ramesnius ritualus su letesniu tempu, kvapu ir aiskia poilsio busena po seanso.",
      "Orientuojasi i sedimo darbo palikta itempima ir tikslini darba probleminese zonose.",
      "Derina gilesni spaudima su komfortu, kad rezultatas butu veiksmingas ir malonus.",
      "Padeda perjungti kuna is darbo i poilsio rezima bei palaikyti gera savijauta po vizito.",
    ],
  },
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createGeneratedSalonConfigs() {
  return Object.entries(generatedSalonSeeds).flatMap(([category, seeds], categoryIndex) =>
    seeds.map((seed, index) => ({
      id: `${slugify(seed.name)}-${slugify(seed.city)}`,
      category,
      ...seed,
      specialists: [],
      baseSlots: slotSets[(categoryIndex + index) % slotSets.length],
    }))
  );
}

function buildExtendedSpecialists(category, salonId, salonIndex, existingSpecialists) {
  const pool = specialistFactoryData[category];
  const specialists = existingSpecialists.map((specialist) => ({ ...specialist }));
  const usedNames = new Set(specialists.map((specialist) => specialist.name.toLowerCase()));
  let poolCursor = salonIndex * 2;

  while (specialists.length < 8) {
    const person = pool.people[poolCursor % pool.people.length];
    poolCursor += 1;
    if (usedNames.has(person.name.toLowerCase())) {
      continue;
    }

    const specialistIndex = specialists.length;
    usedNames.add(person.name.toLowerCase());
    specialists.push({
      id: `${salonId}-${slugify(person.name)}-${specialistIndex + 1}`,
      name: person.name,
      role: pool.roles[(salonIndex + specialistIndex) % pool.roles.length],
      load: 56 + ((salonIndex * 9 + specialistIndex * 7) % 38),
      photo: portrait(person.group, ((salonIndex * 17 + specialistIndex * 11 + poolCursor) % 90) + 1),
      bio: pool.bios[(salonIndex + specialistIndex) % pool.bios.length],
    });
  }

  return specialists.slice(0, 8);
}

function ensureSalonSpecialists(salon, salonIndex) {
  return {
    ...salon,
    specialists: buildExtendedSpecialists(salon.category, salon.id, salonIndex, salon.specialists),
  };
}

const allSalonConfigs = [...salonConfigs, ...createGeneratedSalonConfigs()];
const salons = allSalonConfigs.map(buildSalon).map(applyContentOverrides).map(ensureSalonSpecialists);

const salonDetailMedia = {
  Plaukai: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80",
  ],
  Nagai: [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1200&q=80",
  ],
  Veidas: [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
  ],
  Masazai: [
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  ],
};

const salonReviewAuthors = [
  "Greta J.",
  "Kamile P.",
  "Egle S.",
  "Austeja M.",
  "Monika K.",
  "Silvija D.",
  "Ruta V.",
  "Emilija T.",
];

const salonReviewDates = ["pries 2 d.", "pries 5 d.", "pries savaite", "pries 2 savaites", "si menesi"];

const salonReviewTemplates = {
  Plaukai: [
    "Labai patiko, kad %{specialist} isklausė, ko noriu, ir pasiule sprendima, kuris tiko mano kasdieniam ritmui.",
    "Spalva gavosi svari ir naturali, o po vizito dar gavau aisku prieziuros plana namams.",
    "Vizitas praejo ramiai, rezultatas atrode brangiai, o plaukai po proceduros liko gyvi ir lengvi.",
  ],
  Nagai: [
    "Tvarkingas darbas, labai svarus pavirsius ir forma, kuri atlaike visas dvi savaites be streso.",
    "Manikiuras atrode tiksliai taip, kaip tikejausi, o %{specialist} dirbo greitai ir labai kruopsciai.",
    "Labai patiko atmosfera ir tai, kad meistre padejo issirinkti tona, kuris tiko prie mano ranku.",
  ],
  Veidas: [
    "Oda po vizito atrode ramesne ir gyvesne, o %{specialist} labai aiskiai paaiskino, kas tinka toliau.",
    "Puikus balansas tarp rezultato ir svelnumo, po proceduros veidas atrode pailsejes ir skaistus.",
    "Labai profesionali konsultacija, tvarkingas ritualas ir aiskus jausmas, kad procedura pritaikyta man.",
  ],
  Masazai: [
    "Po seanso peciai ir nugara jautesi gerokai lengviau, o spaudimas buvo tiksliai toks, kokio reikejo.",
    "Labai rami aplinka, geras tempas ir tikras atsijungimo jausmas jau nuo pirmu minuciu.",
    "Po darbo dienos toks vizitas buvo idealus, nes isejau daug laisvesniu kunu ir ramesne galva.",
  ],
};

const realisticSalonReviewAuthors = [
  "Greta J.",
  "Kamile P.",
  "Egle S.",
  "Austeja M.",
  "Monika K.",
  "Silvija D.",
  "Ruta V.",
  "Emilija T.",
  "Karolina B.",
  "Juste N.",
  "Saule L.",
  "Ugne R.",
];

const realisticSalonReviewDates = [
  "pries 2 d.",
  "pries 5 d.",
  "pries 9 d.",
  "pries 2 savaites",
  "si menesi",
  "vasario pabaigoje",
];

const realisticSalonReviewTemplates = {
  Plaukai: [
    "%{specialist} labai aiskiai paaiskino, kiek prieziuros man reikes namuose, todel rezultatas atrode graziai ir po keliu plovimu.",
    "Spalva gavosi svari ir naturali, o %{service} buvo atlikta be skubejimo ir su aiskiu planu kiekvienam etapui.",
    "Labai patiko, kad po vizito plaukai neatrode perkrauti, o forma buvo pritaikyta tam, kaip realiai juos nesioju kasdien.",
    "Pirma karta per ilga laika isejau su rezultatu, kuris atrodo tvarkingai ir is arciau, ne tik nuotraukose.",
  ],
  Nagai: [
    "Forma liko tvarkinga iki sekancios korekcijos, o pavirsius issilaike be atsilupimu net po aktyvesnes savaites.",
    "%{specialist} dirbo labai tiksliai, o %{service} atrode taip, lyg butu suplanuota butent mano ranku formai.",
    "Labai patiko, kad meistre nepaskubino pasirinkimo ir pasiule tona, kuris realiai tinka kasdienai, o ne tik foto.",
    "Tvarkingas darbas, svarus pavirsius ir normaliai paaiskinta, kiek laiko rezultatas turetu issilaikyti iki kitos rezervacijos.",
  ],
  Veidas: [
    "Oda po vizito atrode ramesne ir gyvesne, o %{specialist} labai aiskiai paaiskino, ka verta testi namuose.",
    "Puikus balansas tarp rezultato ir svelnumo: po %{service} veidas atrode pailsejes, bet nebuvo sudirgintas.",
    "Labai profesionali konsultacija ir aiskus jausmas, kad procedura buvo pritaikyta mano odos buklei, o ne padaryta pagal viena sablona.",
    "Patiko, kad pries procedura aptareme rutina ir lukescius, todel rezultatas buvo realistiskas ir labai tvarkingas.",
  ],
  Masazai: [
    "Po seanso peciai ir nugara jautesi gerokai lengviau, o spaudimas buvo tiksliai toks, kokio reikejo.",
    "Labai rami aplinka ir geras tempas: po %{service} jautesi ne tik poilsis, bet ir tikras palengvejimas ten, kur labiausiai kaupiasi itempa.",
    "Po darbo dienos toks vizitas buvo idealus, nes isejau laisvesniu kunu ir be jausmo, kad procedura buvo per agresyvi.",
    "Patiko, kad %{specialist} pries seansa pasitikslino, kokio spaudimo noriu ir kurioms zonoms skirti daugiausia demesio.",
  ],
};

const cityStreetPool = {
  Vilnius: ["Gedimino pr.", "J. Basanaviciaus g.", "Pylimo g.", "A. Gostauto g."],
  Kaunas: ["Laisves al.", "Kestucio g.", "Savanoriu pr.", "Karaliaus Mindaugo pr."],
  Klaipeda: ["H. Manto g.", "Turgaus g.", "Naujojo Sodo g.", "Taikos pr."],
};

const salonMapCoordinates = {
  "Vilnius-Naujamiestis": { lat: 54.6819, lon: 25.266 },
  "Vilnius-Zverynas": { lat: 54.6959, lon: 25.2367 },
  "Vilnius-Senamiestis": { lat: 54.6784, lon: 25.2877 },
  "Vilnius-Seskine": { lat: 54.7174, lon: 25.2514 },
  "Kaunas-Centras": { lat: 54.8989, lon: 23.9038 },
  "Kaunas-Silainiai": { lat: 54.9282, lon: 23.8794 },
  "Kaunas-Zaliakalnis": { lat: 54.9106, lon: 23.9394 },
  "Klaipeda-Senamiestis": { lat: 55.7091, lon: 21.1324 },
  "Klaipeda-Pajuris": { lat: 55.7422, lon: 21.0913 },
  "Klaipeda-Melnrage": { lat: 55.7467, lon: 21.0822 },
  "Vilnius-default": { lat: 54.6872, lon: 25.2797 },
  "Kaunas-default": { lat: 54.8985, lon: 23.9036 },
  "Klaipeda-default": { lat: 55.7033, lon: 21.1443 },
};

function createSeedBooking({
  id,
  salonId,
  serviceId,
  specialistId,
  date,
  time,
  customerName,
  customerEmail,
  customerPhone,
  paymentMethod,
  status,
}) {
  const salon = getSalon(salonId);
  const service = getService(salon, serviceId);
  const specialist = getSpecialist(salon, specialistId);
  const paymentAmount = paymentMethod === "onsite" ? Math.round(service.price * 0.2) : service.price;
  const createdAt = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();

  return {
    id,
    code: makeBookingCode(id),
    salonId,
    salonName: salon.name,
    serviceId,
    serviceName: service.name,
    specialistId,
    specialistName: specialist.name,
    date,
    time,
    customerName,
    customerEmail,
    customerPhone,
    customerId: customerEmail === seedCustomerAccounts[0].email ? seedCustomerAccounts[0].id : `guest-${id}`,
    paymentMethod,
    paymentAmount,
    totalAmount: service.price,
    notes: "",
    status,
    createdAt,
    updatedAt: createdAt,
  };
}

const seedBookings = [
  createSeedBooking({
    id: "booking-seed-1",
    salonId: "luna",
    serviceId: "balayage",
    specialistId: "milda",
    date: upcomingDates[1],
    time: "17:00",
    customerName: seedCustomerAccounts[0].name,
    customerEmail: seedCustomerAccounts[0].email,
    customerPhone: seedCustomerAccounts[0].phone,
    paymentMethod: "card",
    status: "Patvirtinta",
  }),
  createSeedBooking({
    id: "booking-seed-2",
    salonId: "luna",
    serviceId: "cut",
    specialistId: "rute",
    date: upcomingDates[0],
    time: "12:00",
    customerName: "Juste",
    customerEmail: "juste@example.com",
    customerPhone: "+37067770000",
    paymentMethod: "onsite",
    status: "Uzstatas",
  }),
  createSeedBooking({
    id: "booking-seed-3",
    salonId: "amber",
    serviceId: "hydra",
    specialistId: "ieva",
    date: upcomingDates[2],
    time: "13:45",
    customerName: "Austeja",
    customerEmail: "austeja@example.com",
    customerPhone: "+37068880000",
    paymentMethod: "card",
    status: "Patvirtinta",
  }),
  createSeedBooking({
    id: "booking-seed-4",
    salonId: "calm",
    serviceId: "couple",
    specialistId: "rasa",
    date: upcomingDates[3],
    time: "19:00",
    customerName: "Paulius ir Inga",
    customerEmail: "pora@example.com",
    customerPhone: "+37065551111",
    paymentMethod: "applepay",
    status: "Patvirtinta",
  }),
];

const seedPayments = seedBookings.map((booking) => {
  return {
    id: `payment-${booking.id}`,
    bookingId: booking.id,
    amount: booking.paymentAmount,
    method: booking.paymentMethod,
    status: booking.paymentMethod === "onsite" ? "Uzstatas" : "Apmoketa",
    label: booking.serviceName,
    createdAt: booking.createdAt,
  };
});

const seedActivities = [
  {
    id: "activity-1",
    title: "Luna Beauty House uzpilde popietes langa",
    meta: "17:00 balayage slotas buvo rezervuotas per Lai\u017eyklel\u0117.",
    tone: "info",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "activity-2",
    title: "Monikos vizitas primintas automatiskai",
    meta: "Klientui issiustas priminimas 24 val. iki rezervacijos.",
    tone: "success",
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: "activity-3",
    title: "Platforma uzfiksavo aktyvu miesto srauta",
    meta: "Didziausias srautas siandien - Vilniuje ir Kaune.",
    tone: "warning",
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  },
];

const defaultState = {
  filters: {
    query: "",
    location: "",
    date: "any",
    requestedTime: "",
    city: "all",
    category: "all",
    sort: "recommended",
    instantOnly: false,
  },
  workspace: "customer",
  currentUserRole: null,
  currentUserId: null,
  accounts: seedCustomerAccounts,
  bookings: seedBookings,
  payments: seedPayments,
  activities: seedActivities,
  recentQueries: ["Nagai"],
  selectedSpecialists: {},
  showResults: false,
  activeSalonId: null,
  bookingDraft: null,
  bookingContext: null,
  bookingStep: 1,
};

const state = loadState();
let authView = "login";
const uiState = {
  resultsPending: false,
  toast: null,
  backendAvailable: false,
  backendChecked: false,
  backendWarningShown: false,
  lastServerSnapshotHash: "",
};
const uiTimers = {
  results: 0,
  toast: 0,
  backendSync: 0,
};

const refs = {
  sessionLabel: document.querySelector("#session-label"),
  megaMenu: document.querySelector("#mega-menu"),
  searchForm: document.querySelector("#search-form"),
  searchQueryGroup: document.querySelector("#search-query-group"),
  queryInput: document.querySelector("#query-input"),
  searchSuggestions: document.querySelector("#search-suggestions"),
  recentSearchesSection: document.querySelector("#recent-searches-section"),
  recentSearchList: document.querySelector("#recent-search-list"),
  locationInput: document.querySelector("#location-input"),
  searchDateGroup: document.querySelector("#search-date-group"),
  dateTrigger: document.querySelector("#date-trigger"),
  dateDisplay: document.querySelector("#date-display"),
  datePanel: document.querySelector("#search-date-panel"),
  dateSelect: document.querySelector("#date-select"),
  customDateInput: document.querySelector("#custom-date-input"),
  timeInput: document.querySelector("#time-input"),
  timeDisplay: document.querySelector("#time-display"),
  sortSelect: document.querySelector("#sort-select"),
  instantOnly: document.querySelector("#instant-only"),
  resultsSection: document.querySelector("#salons"),
  salonDetailSection: document.querySelector("#salon-detail"),
  salonDetailShell: document.querySelector("#salon-detail-shell"),
  workspaceSection: document.querySelector("#workspace"),
  workspaceEyebrow: document.querySelector("#workspace-eyebrow"),
  workspaceTitle: document.querySelector("#workspace-title"),
  salonList: document.querySelector("#salon-list"),
  resultsSummary: document.querySelector("#results-summary"),
  activeFilterBar: document.querySelector("#active-filter-bar"),
  activeFilterList: document.querySelector("#active-filter-list"),
  workspacePanel: document.querySelector("#workspace-panel"),
  sessionCard: document.querySelector("#session-card"),
  activityFeed: document.querySelector("#activity-feed"),
  activityEyebrow: document.querySelector("#activity-eyebrow"),
  activityTitle: document.querySelector("#activity-title"),
  paymentsCard: document.querySelector("#payments-card"),
  summaryEyebrow: document.querySelector("#summary-eyebrow"),
  summaryTitle: document.querySelector("#summary-title"),
  toastRegion: document.querySelector("#toast-region"),
  heroBookingsCount: document.querySelector("#hero-bookings-count"),
  heroRevenueTotal: document.querySelector("#hero-revenue-total"),
  heroSalonsCount: document.querySelector("#hero-salons-count"),
  authModal: document.querySelector("#auth-modal"),
  authMessage: document.querySelector("#auth-message"),
  authTabs: Array.from(document.querySelectorAll("#auth-tabs [data-auth-view-target]")),
  authViewButtons: Array.from(document.querySelectorAll("[data-auth-view-target]")),
  authViews: Array.from(document.querySelectorAll("[data-auth-view]")),
  authLoginEmail: document.querySelector("#auth-login-email"),
  authLoginPassword: document.querySelector("#auth-login-password"),
  authLoginSubmit: document.querySelector("#auth-login-submit"),
  authRegisterName: document.querySelector("#auth-register-name"),
  authRegisterPhone: document.querySelector("#auth-register-phone"),
  authRegisterEmail: document.querySelector("#auth-register-email"),
  authRegisterPassword: document.querySelector("#auth-register-password"),
  authRegisterPasswordRepeat: document.querySelector("#auth-register-password-repeat"),
  authRegisterSubmit: document.querySelector("#auth-register-submit"),
  authResetEmail: document.querySelector("#auth-reset-email"),
  authResetPassword: document.querySelector("#auth-reset-password"),
  authResetPasswordRepeat: document.querySelector("#auth-reset-password-repeat"),
  authResetSubmit: document.querySelector("#auth-reset-submit"),
  bookingModal: document.querySelector("#booking-modal"),
  bookingTitle: document.querySelector("#booking-title"),
  bookingSubtitle: document.querySelector("#booking-subtitle"),
  bookingService: document.querySelector("#booking-service"),
  bookingSpecialist: document.querySelector("#booking-specialist"),
  bookingDate: document.querySelector("#booking-date"),
  bookingSlotGrid: document.querySelector("#booking-slot-grid"),
  bookingName: document.querySelector("#booking-name"),
  bookingPhone: document.querySelector("#booking-phone"),
  bookingEmail: document.querySelector("#booking-email"),
  bookingNotes: document.querySelector("#booking-notes"),
  bookingMessage: document.querySelector("#booking-message"),
  bookingBack: document.querySelector("#booking-back"),
  bookingNext: document.querySelector("#booking-next"),
  paymentMethods: document.querySelector("#payment-methods"),
  bookingProgress: document.querySelector("#booking-progress"),
  servicePreview: document.querySelector("#service-preview"),
  bookingSummary: document.querySelector("#booking-summary"),
  megaTriggers: Array.from(document.querySelectorAll("[data-mega-target]")),
  megaPanels: Array.from(document.querySelectorAll("[data-mega-panel]")),
  bookingSteps: Array.from(document.querySelectorAll("[data-step-panel]")),
  serviceFilters: Array.from(document.querySelectorAll("[data-service-filter]")),
  cityFilters: Array.from(document.querySelectorAll("[data-city-filter]")),
  workspaceTabs: Array.from(document.querySelectorAll("[data-switch-workspace]")),
};

initializeMegaMenu();
populateDateFilterOptions();
hydrateControls();
initializeSalonRouting();
initializeAuthModal();
renderAll();
initializeSearchPanel();
void initializeBackend();

refs.searchForm.addEventListener("submit", handleSearchSubmit);
refs.queryInput.addEventListener("input", handleSearchLiveInput);
refs.queryInput.addEventListener("keydown", handleQueryInputKeydown);
if (refs.dateTrigger) {
  refs.dateTrigger.addEventListener("click", handleDateTriggerClick);
  refs.dateTrigger.addEventListener("keydown", handleDateTriggerKeydown);
}
if (refs.customDateInput) {
  refs.customDateInput.addEventListener("change", handleCustomDateChange);
}
if (refs.timeInput) {
  refs.timeInput.addEventListener("change", handleTimeInputChange);
}
refs.sortSelect.addEventListener("change", () => {
  state.filters.sort = refs.sortSelect.value;
  persistAndRender();
});
refs.instantOnly.addEventListener("change", () => {
  state.filters.instantOnly = refs.instantOnly.checked;
  persistAndRender();
});
refs.bookingService.addEventListener("change", () => {
  if (!state.bookingDraft) {
    return;
  }

  state.bookingDraft.serviceId = refs.bookingService.value;
  syncDraftTimeWithAvailability();
  renderBookingFlow();
});
refs.bookingSpecialist.addEventListener("change", () => {
  if (!state.bookingDraft) {
    return;
  }

  state.bookingDraft.specialistId = refs.bookingSpecialist.value;
  syncDraftTimeWithAvailability();
  renderBookingFlow();
});
refs.bookingDate.addEventListener("change", () => {
  if (!state.bookingDraft) {
    return;
  }

  state.bookingDraft.date = refs.bookingDate.value;
  syncDraftTimeWithAvailability();
  renderBookingFlow();
});
refs.bookingName.addEventListener("input", () => updateDraftField("customerName", refs.bookingName.value));
refs.bookingPhone.addEventListener("input", () => updateDraftField("customerPhone", refs.bookingPhone.value));
refs.bookingEmail.addEventListener("input", () => updateDraftField("customerEmail", refs.bookingEmail.value));
refs.bookingNotes.addEventListener("input", () => updateDraftField("notes", refs.bookingNotes.value));
refs.bookingBack.addEventListener("click", handleBookingBack);
refs.bookingNext.addEventListener("click", handleBookingNext);
refs.authLoginSubmit?.addEventListener("click", handleCustomerLogin);
refs.authRegisterSubmit?.addEventListener("click", handleCustomerRegistration);
refs.authResetSubmit?.addEventListener("click", handlePasswordReset);

document.addEventListener("click", handleDocumentClick);

refs.authModal.addEventListener("click", (event) => {
  if (event.target === refs.authModal) {
    closeDialog(refs.authModal);
  }
});

refs.bookingModal.addEventListener("click", (event) => {
  if (event.target === refs.bookingModal) {
    closeDialog(refs.bookingModal);
  }
});

refs.bookingModal.addEventListener("close", () => {
  state.bookingDraft = null;
  state.bookingContext = null;
  state.bookingStep = 1;
  refs.bookingMessage.textContent = "";
});

function initializeAuthModal() {
  if (!refs.authModal) {
    return;
  }

  setAuthView("login");
  setAuthMessage("");

  refs.authViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextView = button.getAttribute("data-auth-view-target");
      if (nextView) {
        setAuthView(nextView);
      }
    });
  });

  [
    refs.authLoginEmail,
    refs.authLoginPassword,
    refs.authRegisterName,
    refs.authRegisterPhone,
    refs.authRegisterEmail,
    refs.authRegisterPassword,
    refs.authRegisterPasswordRepeat,
    refs.authResetEmail,
    refs.authResetPassword,
    refs.authResetPasswordRepeat,
  ]
    .filter(Boolean)
    .forEach((input) => {
      input.addEventListener("keydown", handleAuthInputKeydown);
    });

  refs.authModal.addEventListener("close", () => {
    setAuthMessage("");
    setAuthView("login");
  });
}

function openAuthModal(view = "login") {
  if (!refs.authModal) {
    return;
  }

  setAuthView(view);
  setAuthMessage("");

  const currentUser = getCurrentUser();
  if (currentUser?.role === "customer" && refs.authLoginEmail) {
    refs.authLoginEmail.value = currentUser.email;
  }

  openDialog(refs.authModal);
}

function setAuthView(view) {
  authView = view;
  if (refs.authMessage) {
    refs.authMessage.hidden = true;
    refs.authMessage.textContent = "";
  }
  refs.authTabs.forEach((button) => {
    const isActive = button.getAttribute("data-auth-view-target") === view;
    button.classList.toggle("active", isActive);
  });
  refs.authViews.forEach((panel) => {
    const isActive = panel.getAttribute("data-auth-view") === view;
    panel.classList.toggle("is-hidden", !isActive);
  });
}

function setAuthMessage(message, tone = "info") {
  if (!refs.authMessage) {
    return;
  }

  refs.authMessage.textContent = message;
  refs.authMessage.hidden = !message;
  refs.authMessage.setAttribute("data-tone", tone);
}

function handleAuthInputKeydown(event) {
  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();
  if (authView === "login") {
    handleCustomerLogin();
    return;
  }

  if (authView === "register") {
    handleCustomerRegistration();
    return;
  }

  handlePasswordReset();
}

async function handleCustomerLogin() {
  const email = refs.authLoginEmail?.value || "";
  const password = refs.authLoginPassword?.value || "";

  if (uiState.backendAvailable) {
    try {
      const response = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      applyServerSnapshot(response.snapshot || response);
      setAuthMessage("");
      loginAsCustomer(response.account.id, { skipLastLoginUpdate: true });
      return;
    } catch (error) {
      if (error.code !== "BACKEND_UNAVAILABLE") {
        setAuthMessage(error.payload?.message || "Nepavyko prisijungti. Patikrink el. pasta ir slaptazodi.", "error");
        return;
      }
    }
  }

  const account = getCustomerAccountByEmail(email);

  if (!account || account.password !== password) {
    setAuthMessage("Nepavyko prisijungti. Patikrink el. pasta ir slaptazodi.", "error");
    return;
  }

  setAuthMessage("");
  loginAsCustomer(account.id);
}

async function handleCustomerRegistration() {
  const name = String(refs.authRegisterName?.value || "").trim();
  const phone = String(refs.authRegisterPhone?.value || "").trim();
  const email = String(refs.authRegisterEmail?.value || "")
    .trim()
    .toLowerCase();
  const password = String(refs.authRegisterPassword?.value || "");
  const passwordRepeat = String(refs.authRegisterPasswordRepeat?.value || "");

  if (!name || !isValidCustomerPhone(phone) || !isValidCustomerEmail(email)) {
    setAuthMessage("Uzpildyk varda, teisinga telefono numeri ir el. pasta.", "error");
    return;
  }

  if (password.length < 8) {
    setAuthMessage("Slaptazodis turi buti bent 8 simboliu ilgio.", "error");
    return;
  }

  if (password !== passwordRepeat) {
    setAuthMessage("Slaptazodziai nesutampa.", "error");
    return;
  }

  if (getCustomerAccountByEmail(email) || Object.values(staffProfiles).some((profile) => profile.email === email)) {
    setAuthMessage("Paskyra su tokiu el. pastu jau egzistuoja.", "error");
    return;
  }

  if (uiState.backendAvailable) {
    try {
      const response = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, phone, email, password }),
      });
      applyServerSnapshot(response.snapshot || response);
      setAuthMessage("");
      loginAsCustomer(response.account.id, { skipLastLoginUpdate: true });
      return;
    } catch (error) {
      if (error.code !== "BACKEND_UNAVAILABLE") {
        setAuthMessage(error.payload?.message || "Nepavyko sukurti paskyros.", "error");
        return;
      }
    }
  }

  const account = normalizeCustomerAccount({
    id: makeId("customer"),
    name,
    phone,
    email,
    password,
    loyaltyCredits: 10,
    favoriteSalons: [],
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  });

  state.accounts = [account, ...getCustomerAccounts()].map(normalizeCustomerAccount);
  state.activities = [
    {
      id: makeId("activity"),
      title: "Sukurta nauja kliento paskyra",
      meta: `${account.name} uzsiregistravo ir gavo 10 lojalumo tasku pasveikinimui.`,
      tone: "success",
      createdAt: new Date().toISOString(),
    },
    ...state.activities,
  ].slice(0, 10);

  loginAsCustomer(account.id);
}

async function handlePasswordReset() {
  const email = String(refs.authResetEmail?.value || "")
    .trim()
    .toLowerCase();
  const password = String(refs.authResetPassword?.value || "");
  const passwordRepeat = String(refs.authResetPasswordRepeat?.value || "");
  const account = getCustomerAccountByEmail(email);

  if (!account) {
    setAuthMessage("Kliento paskyra su tokiu el. pastu nerasta.", "error");
    return;
  }

  if (password.length < 8) {
    setAuthMessage("Naujas slaptazodis turi buti bent 8 simboliu ilgio.", "error");
    return;
  }

  if (password !== passwordRepeat) {
    setAuthMessage("Nauji slaptazodziai nesutampa.", "error");
    return;
  }

  if (uiState.backendAvailable) {
    try {
      const response = await apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      applyServerSnapshot(response.snapshot || response);
      setAuthView("login");
      if (refs.authLoginEmail) {
        refs.authLoginEmail.value = email;
      }
      if (refs.authLoginPassword) {
        refs.authLoginPassword.value = "";
      }
      setAuthMessage(response.message || "Slaptazodis atnaujintas. Dabar gali prisijungti su nauju slaptazodziu.", "success");
      return;
    } catch (error) {
      if (error.code !== "BACKEND_UNAVAILABLE") {
        setAuthMessage(error.payload?.message || "Nepavyko atnaujinti slaptazodzio.", "error");
        return;
      }
    }
  }

  updateCustomerAccountRecord(account.id, { password });
  persistState();
  setAuthView("login");
  if (refs.authLoginEmail) {
    refs.authLoginEmail.value = email;
  }
  if (refs.authLoginPassword) {
    refs.authLoginPassword.value = "";
  }
  setAuthMessage("Slaptazodis atnaujintas. Dabar gali prisijungti su nauju slaptazodziu.", "success");
}

function initializeMegaMenu() {
  if (!refs.megaMenu || !refs.megaTriggers.length || !refs.megaPanels.length) {
    return;
  }

  setActiveMegaPanel("plaukai");
  closeMegaMenu();

  refs.megaTriggers.forEach((trigger) => {
    const target = trigger.getAttribute("data-mega-target");
    const activate = () => {
      if (target) {
        setActiveMegaPanel(target);
        openMegaMenu();
      }
    };

    trigger.addEventListener("mouseenter", activate);
    trigger.addEventListener("focus", activate);
    trigger.addEventListener("click", activate);
  });

  refs.megaMenu.addEventListener("mouseleave", closeMegaMenu);
  refs.megaMenu.addEventListener("focusout", (event) => {
    const nextTarget = event.relatedTarget;
    if (!nextTarget || !refs.megaMenu.contains(nextTarget)) {
      closeMegaMenu();
    }
  });
}

function openMegaMenu() {
  if (!refs.megaMenu) {
    return;
  }

  closeSearchSuggestions();
  closeDatePanel();
  refs.megaMenu.classList.add("open");
  refs.megaMenu.setAttribute("data-open", "true");
}

function closeMegaMenu() {
  if (!refs.megaMenu) {
    return;
  }

  refs.megaMenu.classList.remove("open");
  refs.megaMenu.setAttribute("data-open", "false");
}

function setActiveMegaPanel(target) {
  refs.megaTriggers.forEach((trigger) => {
    const isActive = trigger.getAttribute("data-mega-target") === target;
    trigger.classList.toggle("active", isActive);
    trigger.setAttribute("aria-selected", String(isActive));
  });

  refs.megaPanels.forEach((panel) => {
    const isActive = panel.getAttribute("data-mega-panel") === target;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
}

function initializeSearchPanel() {
  if (!refs.searchForm || !refs.searchQueryGroup || !refs.queryInput || !refs.searchSuggestions) {
    return;
  }

  renderSearchSuggestions();
  renderSearchDatePanel();
  closeSearchSuggestions();
  closeDatePanel();

  refs.queryInput.addEventListener("click", openSearchSuggestions);
  refs.searchQueryGroup.addEventListener("focusout", handleSearchGroupFocusOut);
}

function openSearchSuggestions() {
  if (!refs.searchForm || !refs.queryInput || !refs.searchSuggestions) {
    return;
  }

  closeMegaMenu();
  closeDatePanel();
  refs.searchForm.classList.add("search-query-expanded");
  refs.queryInput.setAttribute("aria-expanded", "true");
  refs.searchSuggestions.setAttribute("aria-hidden", "false");
}

function closeSearchSuggestions() {
  if (!refs.searchForm || !refs.queryInput || !refs.searchSuggestions) {
    return;
  }

  refs.searchForm.classList.remove("search-query-expanded");
  refs.queryInput.setAttribute("aria-expanded", "false");
  refs.searchSuggestions.setAttribute("aria-hidden", "true");
}

function renderSearchSuggestions() {
  if (!refs.recentSearchesSection || !refs.recentSearchList) {
    return;
  }

  const latestQuery = (state.recentQueries || []).filter(Boolean)[0];
  refs.recentSearchesSection.hidden = !latestQuery;
  refs.recentSearchList.innerHTML = latestQuery
    ? `<button class="search-recent-item" type="button" data-search-term="${escapeHtml(latestQuery)}">${escapeHtml(latestQuery)}</button>`
    : "";
}

function saveRecentQuery(query) {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) {
    return;
  }

  state.recentQueries = [
    normalizedQuery,
    ...(state.recentQueries || []).filter((item) => item.toLowerCase() !== normalizedQuery.toLowerCase()),
  ].slice(0, 5);
}

function applySearchSuggestion(query) {
  const normalizedQuery = query.trim();
  refs.queryInput.value = normalizedQuery;
  state.filters.query = normalizedQuery;
  saveRecentQuery(normalizedQuery);
  closeSearchSuggestions();
  persistAndRender();
  refs.locationInput.focus();
}

function openDatePanel() {
  if (!refs.searchForm || !refs.dateTrigger || !refs.datePanel) {
    return;
  }

  closeMegaMenu();
  closeSearchSuggestions();
  renderSearchDatePanel();
  refs.searchForm.classList.add("search-date-expanded");
  refs.dateTrigger.setAttribute("aria-expanded", "true");
  refs.datePanel.setAttribute("aria-hidden", "false");
}

function closeDatePanel() {
  if (!refs.searchForm || !refs.dateTrigger || !refs.datePanel) {
    return;
  }

  refs.searchForm.classList.remove("search-date-expanded");
  refs.dateTrigger.setAttribute("aria-expanded", "false");
  refs.datePanel.setAttribute("aria-hidden", "true");
}

function handleDateTriggerClick(event) {
  event.preventDefault();
  if (refs.searchForm.classList.contains("search-date-expanded")) {
    closeDatePanel();
    return;
  }

  openDatePanel();
}

function handleDateTriggerKeydown(event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handleDateTriggerClick(event);
    return;
  }

  if (event.key === "Escape") {
    closeDatePanel();
  }
}

function handleQueryInputKeydown(event) {
  if (event.key === "Escape") {
    closeSearchSuggestions();
  }
}

function handleSearchGroupFocusOut(event) {
  const nextTarget = event.relatedTarget;
  if (!nextTarget || !refs.searchQueryGroup.contains(nextTarget)) {
    closeSearchSuggestions();
  }
}

function handleCustomDateChange() {
  if (!refs.customDateInput) {
    return;
  }

  state.filters.date = refs.customDateInput.value || "any";
  renderSearchDatePanel();
  persistAndRender();
}

function handleTimeInputChange() {
  state.filters.requestedTime = refs.timeInput?.value || "";
  renderSearchDatePanel();
  persistState();
}

function applyDatePreset(preset) {
  if (preset === "any") {
    state.filters.date = "any";
    state.filters.requestedTime = "";
  }

  if (preset === "today") {
    state.filters.date = upcomingDates[0];
  }

  if (preset === "tomorrow") {
    state.filters.date = upcomingDates[1] || upcomingDates[0];
  }

  renderSearchDatePanel();
  persistAndRender();
}

function getDateDisplayLabel() {
  if (state.filters.date === "any") {
    return "Data nesvarbu";
  }

  if (state.filters.date === upcomingDates[0]) {
    return "Siandien";
  }

  if (state.filters.date === upcomingDates[1]) {
    return "Rytoj";
  }

  return formatDateLabel(state.filters.date);
}

function renderSearchDatePanel() {
  if (!refs.dateDisplay || !refs.dateSelect) {
    return;
  }

  if (
    state.filters.date !== "any" &&
    !Array.from(refs.dateSelect.options).some((option) => option.value === state.filters.date)
  ) {
    refs.dateSelect.insertAdjacentHTML(
      "beforeend",
      `<option value="${state.filters.date}">${formatDateLabel(state.filters.date)}</option>`
    );
  }

  refs.dateSelect.value = state.filters.date;
  refs.dateDisplay.textContent = getDateDisplayLabel();
  refs.dateDisplay.classList.toggle("search-date-label-active", state.filters.date !== "any");

  if (refs.customDateInput) {
    refs.customDateInput.value = state.filters.date === "any" ? "" : state.filters.date;
  }

  if (refs.timeInput) {
    refs.timeInput.value = state.filters.requestedTime || "";
  }

  if (refs.timeDisplay) {
    refs.timeDisplay.textContent = state.filters.requestedTime || "Pasirink laika...";
    refs.timeDisplay.classList.toggle("search-date-label-active", Boolean(state.filters.requestedTime));
  }

  document.querySelectorAll("[data-date-option]").forEach((button) => {
    const preset = button.getAttribute("data-date-option");
    const isActive =
      (preset === "any" && state.filters.date === "any") ||
      (preset === "today" && state.filters.date === upcomingDates[0]) ||
      (preset === "tomorrow" && state.filters.date === upcomingDates[1]);
    button.classList.toggle("active", isActive);
  });
}

function handleDocumentClick(event) {
  if (refs.megaMenu && !event.target.closest("#mega-menu")) {
    closeMegaMenu();
  }

  if (refs.searchQueryGroup && !event.target.closest("#search-query-group")) {
    closeSearchSuggestions();
  }

  if (refs.searchDateGroup && !event.target.closest("#search-date-group")) {
    closeDatePanel();
  }

  const searchTermButton = event.target.closest("[data-search-term]");
  if (searchTermButton) {
    const searchTerm = searchTermButton.getAttribute("data-search-term");
    if (searchTerm) {
      applySearchSuggestion(searchTerm);
    }
    return;
  }

  const dateOptionButton = event.target.closest("[data-date-option]");
  if (dateOptionButton) {
    const preset = dateOptionButton.getAttribute("data-date-option");
    if (preset) {
      applyDatePreset(preset);
    }
    return;
  }

  const openAuthButton = event.target.closest("[data-open-auth]");
  if (openAuthButton) {
    event.preventDefault();
    openAuthModal(openAuthButton.getAttribute("data-open-auth-view") || "login");
    return;
  }

  const closeSalonDetailButton = event.target.closest("[data-close-salon-detail]");
  if (closeSalonDetailButton) {
    event.preventDefault();
    closeSalonDetailPage();
    return;
  }

  const salonScrollButton = event.target.closest("[data-salon-scroll]");
  if (salonScrollButton) {
    const target = salonScrollButton.getAttribute("data-salon-scroll");
    if (target) {
      scrollToSalonDetailAnchor(target);
    }
    return;
  }

  const workspaceButton = event.target.closest("[data-switch-workspace]");
  if (workspaceButton) {
    const workspace = workspaceButton.getAttribute("data-switch-workspace");
    if (workspace && canAccessWorkspace(workspace)) {
      state.workspace = workspace;
      persistAndRender();
    } else if (!state.currentUserRole) {
      openAuthModal("login");
    }
    return;
  }

  const openSalonButton = event.target.closest("[data-open-salon]");
  if (openSalonButton) {
    const salonId = openSalonButton.getAttribute("data-salon-id");
    if (salonId) {
      openSalonDetailPage(salonId);
    }
    return;
  }

  const favoriteButton = event.target.closest("[data-toggle-favorite]");
  if (favoriteButton) {
    const salonId = favoriteButton.getAttribute("data-salon-id");
    if (salonId) {
      toggleFavoriteSalon(salonId);
    }
    return;
  }

  const loginButton = event.target.closest("[data-login-role]");
  if (loginButton) {
    const role = loginButton.getAttribute("data-login-role");
    const accountId = loginButton.getAttribute("data-login-account") || "";
    loginAs(role, accountId);
    return;
  }

  const closeAuthButton = event.target.closest("[data-close-auth]");
  if (closeAuthButton) {
    closeDialog(refs.authModal);
    return;
  }

  const logoutButton = event.target.closest("#logout-button, [data-logout]");
  if (logoutButton) {
    logout();
    return;
  }

  const menuActionLink = event.target.closest(
    "[data-menu-category], [data-menu-query], [data-menu-city], [data-menu-sort], [data-menu-instant]"
  );
  if (menuActionLink) {
    const category = menuActionLink.getAttribute("data-menu-category");
    const query = menuActionLink.getAttribute("data-menu-query");
    const city = menuActionLink.getAttribute("data-menu-city");
    const sort = menuActionLink.getAttribute("data-menu-sort");
    const instant = menuActionLink.getAttribute("data-menu-instant");

    if (category !== null) {
      state.filters.category = category;
      state.filters.city = "all";
      state.filters.location = "";
      refs.locationInput.value = "";
    }

    if (query !== null) {
      state.filters.query = query;
      refs.queryInput.value = query;
      saveRecentQuery(query);
    }

    if (city !== null) {
      state.filters.city = city;
      state.filters.location = city === "all" ? "" : city;
      refs.locationInput.value = state.filters.location;
    }

    if (sort !== null) {
      state.filters.sort = sort;
      refs.sortSelect.value = sort;
    }

    if (instant !== null) {
      state.filters.instantOnly = instant === "true";
      refs.instantOnly.checked = state.filters.instantOnly;
    }

    state.showResults = true;
    clearSalonDetailState();
    closeMegaMenu();
    closeSearchSuggestions();
    closeDatePanel();
    runResultsTransition();
    return;
  }

  const serviceFilterButton = event.target.closest("[data-service-filter]");
  if (serviceFilterButton) {
    const category = serviceFilterButton.getAttribute("data-service-filter");
    state.filters.category = category;
    state.showResults = true;
    clearSalonDetailState();
    runResultsTransition({ scroll: false });
    return;
  }

  const cityFilterButton = event.target.closest("[data-city-filter]");
  if (cityFilterButton) {
    const city = cityFilterButton.getAttribute("data-city-filter");
    state.filters.city = city;
    state.filters.location = city === "all" ? "" : city;
    refs.locationInput.value = state.filters.location;
    state.showResults = true;
    clearSalonDetailState();
    runResultsTransition({ scroll: false });
    return;
  }

  const specialistSelectButton = event.target.closest("[data-select-specialist]");
  if (specialistSelectButton) {
    const salonId = specialistSelectButton.getAttribute("data-salon-specialist");
    const specialistId = specialistSelectButton.getAttribute("data-specialist-id");
    if (salonId && specialistId) {
      state.selectedSpecialists[salonId] = specialistId;
      persistAndRender();
    }
    return;
  }

  const resetFiltersButton = event.target.closest("[data-reset-filters]");
  if (resetFiltersButton) {
    state.filters = { ...defaultState.filters };
    refs.queryInput.value = "";
    refs.locationInput.value = "";
    refs.dateSelect.value = "any";
    if (refs.customDateInput) {
      refs.customDateInput.value = "";
    }
    if (refs.timeInput) {
      refs.timeInput.value = "";
    }
    state.filters.requestedTime = "";
    state.showResults = true;
    clearSalonDetailState();
    closeSearchSuggestions();
    closeDatePanel();
    runResultsTransition();
    return;
  }

  const clearFilterButton = event.target.closest("[data-clear-filter]");
  if (clearFilterButton) {
    clearFilterByKey(clearFilterButton.getAttribute("data-clear-filter"));
    state.showResults = true;
    clearSalonDetailState();
    closeSearchSuggestions();
    closeDatePanel();
    runResultsTransition({ scroll: false });
    return;
  }

  const clearAllFiltersButton = event.target.closest("[data-clear-all-filters]");
  if (clearAllFiltersButton) {
    state.filters = { ...defaultState.filters };
    refs.queryInput.value = "";
    refs.locationInput.value = "";
    refs.dateSelect.value = "any";
    if (refs.customDateInput) {
      refs.customDateInput.value = "";
    }
    if (refs.timeInput) {
      refs.timeInput.value = "";
    }
    state.filters.requestedTime = "";
    state.showResults = true;
    clearSalonDetailState();
    closeSearchSuggestions();
    closeDatePanel();
    runResultsTransition({ scroll: false });
    return;
  }

  const dismissToastButton = event.target.closest("[data-dismiss-toast]");
  if (dismissToastButton) {
    clearToast();
    return;
  }

  const bookingActionButton = event.target.closest("[data-booking-action]");
  if (bookingActionButton) {
    const action = bookingActionButton.getAttribute("data-booking-action");
    const bookingId = bookingActionButton.getAttribute("data-booking-id");
    if (action && bookingId) {
      handleWorkspaceBookingAction(action, bookingId);
    }
    return;
  }

  const paymentMethodButton = event.target.closest("[data-payment-method]");
  if (paymentMethodButton && state.bookingDraft) {
    state.bookingDraft.paymentMethod = paymentMethodButton.getAttribute("data-payment-method");
    refs.bookingMessage.textContent = "";
    renderBookingFlow();
    return;
  }

  const slotButton = event.target.closest("[data-slot-select]");
  if (slotButton && state.bookingDraft) {
    state.bookingDraft.time = slotButton.getAttribute("data-slot-select");
    refs.bookingMessage.textContent = "";
    renderBookingFlow();
    return;
  }

  const openBookingButton = event.target.closest("[data-open-booking]");
  if (openBookingButton) {
    const salonId = openBookingButton.getAttribute("data-salon-id") || "luna";
    const serviceId = openBookingButton.getAttribute("data-service-id") || "";
    const selectedTime = openBookingButton.getAttribute("data-slot-time") || "";
    closeMegaMenu();
    openBooking(salonId, serviceId, selectedTime);
  }
}

function handleSearchSubmit(event) {
  event.preventDefault();
  state.filters.query = refs.queryInput.value.trim();
  state.filters.location = refs.locationInput.value.trim();
  state.filters.date = refs.dateSelect.value || state.filters.date || "any";
  state.filters.requestedTime = refs.timeInput?.value || "";
  saveRecentQuery(state.filters.query);
  if (state.filters.location) {
    const matchedCity = salons.find((salon) => salon.city.toLowerCase() === state.filters.location.toLowerCase())?.city;
    state.filters.city = matchedCity || "all";
  } else {
    state.filters.city = "all";
  }
  state.showResults = true;
  clearSalonDetailState();
  closeSearchSuggestions();
  closeDatePanel();
  runResultsTransition();
  showToast("Paieska atnaujinta", "Atrinkome salonus pagal tavo dabartinius kriterijus.", "info");
}

function handleSearchLiveInput() {
  state.filters.query = refs.queryInput.value.trim();
  persistAndRender();
}

function updateDraftField(field, value) {
  if (!state.bookingDraft) {
    return;
  }

  state.bookingDraft[field] = value;
}

function syncDraftTimeWithAvailability() {
  if (!state.bookingDraft) {
    return [];
  }

  const bookingContext = state.bookingContext || { mode: "create", bookingId: null };
  const editingBookingId = bookingContext.mode === "edit" ? bookingContext.bookingId : "";
  const availableSlots = getAvailableSlots(state.bookingDraft.salonId, state.bookingDraft.date, {
    excludedBookingId: editingBookingId,
    serviceId: state.bookingDraft.serviceId,
    specialistId: state.bookingDraft.specialistId,
  });

  if (!availableSlots.includes(state.bookingDraft.time)) {
    state.bookingDraft.time = "";
  }

  return availableSlots;
}

function handleBookingBack() {
  if (state.bookingStep > 1) {
    state.bookingStep -= 1;
    refs.bookingMessage.textContent = "";
    renderBookingFlow();
  }
}

function handleBookingNext() {
  if (!state.bookingDraft) {
    return;
  }

  if (state.bookingStep === 1) {
    if (!state.bookingDraft.serviceId || !state.bookingDraft.specialistId) {
      refs.bookingMessage.textContent = "Pasirink paslauga ir specialista.";
      return;
    }

    state.bookingStep = 2;
    refs.bookingMessage.textContent = "";
    renderBookingFlow();
    return;
  }

  if (state.bookingStep === 2) {
    if (
      !state.bookingDraft.date ||
      !state.bookingDraft.time ||
      !state.bookingDraft.customerName.trim() ||
      !state.bookingDraft.customerPhone.trim() ||
      !state.bookingDraft.customerEmail.trim()
    ) {
      refs.bookingMessage.textContent = "Uzpildyk data, laika ir kontaktus.";
      return;
    }

    if (!isValidCustomerEmail(state.bookingDraft.customerEmail) || !isValidCustomerPhone(state.bookingDraft.customerPhone)) {
      refs.bookingMessage.textContent = "Patikrink el. pasta ir telefono numeri.";
      return;
    }

    state.bookingStep = 3;
    refs.bookingMessage.textContent = "";
    renderBookingFlow();
    return;
  }

  confirmBooking();
}

function confirmBooking() {
  if (!canCurrentUserStartBooking()) {
    refs.bookingMessage.textContent = "Rezervuoti gali kliente arba svecias. Darbuotoju paskyros rezervuoti negali.";
    return;
  }

  const draft = state.bookingDraft;
  const bookingContext = state.bookingContext || { mode: "create", bookingId: null };
  const existingBooking = bookingContext.mode === "edit" ? getBookingById(bookingContext.bookingId) : null;
  const customer = getActiveCustomerProfile();
  const salon = getSalon(draft.salonId);
  const service = getService(salon, draft.serviceId);
  const specialist = getSpecialist(salon, draft.specialistId);
  const customerName = String(draft.customerName || "").trim();
  const customerPhone = String(draft.customerPhone || "").trim();
  const customerEmail = String(draft.customerEmail || "")
    .trim()
    .toLowerCase();
  const linkedCustomer = customer || getCustomerAccountByEmail(customerEmail);
  const bookingCustomerId = linkedCustomer?.id || existingBooking?.customerId || getGuestCustomerIdFromEmail(customerEmail);

  if (!salon || !service || !specialist) {
    refs.bookingMessage.textContent = "Nepavyko sukomplektuoti rezervacijos.";
    return;
  }

  if (existingBooking && !canCurrentUserManageBooking(existingBooking)) {
    refs.bookingMessage.textContent = "Gali valdyti tik savo rezervacijas.";
    return;
  }

  if (!isValidCustomerEmail(customerEmail) || !isValidCustomerPhone(customerPhone)) {
    refs.bookingMessage.textContent = "Patikrink el. pasta ir telefono numeri.";
    return;
  }

  const availableSlots = getAvailableSlots(salon.id, draft.date, {
    excludedBookingId: existingBooking?.id || "",
    serviceId: draft.serviceId,
    specialistId: draft.specialistId,
  });
  if (!availableSlots.includes(draft.time)) {
    refs.bookingMessage.textContent = "Pasirinktas laikas ka tik buvo uzimtas. Pasirink kita slota.";
    renderBookingFlow();
    return;
  }

  if (!isBookingLeadTimeSatisfied(salon, draft.date, draft.time)) {
    refs.bookingMessage.textContent = `Rezervuoti galima bent ${Math.round(
      getSalonBookingRules(salon).leadTimeMinutes / 60
    )} val. iki vizito. Pasirink velesni laika.`;
    renderBookingFlow();
    return;
  }

  if (
    hasCustomerBookingConflict(
      {
        customerId: bookingCustomerId,
        customerEmail,
        salonId: salon.id,
        serviceId: draft.serviceId,
        date: draft.date,
        time: draft.time,
      },
      existingBooking?.id || ""
    )
  ) {
    refs.bookingMessage.textContent = "Tuo metu jau turi kita aktyvu vizita. Pasirink kita laika.";
    return;
  }

  const nowIso = new Date().toISOString();
  const bookingId = existingBooking?.id || makeId("booking");
  const paymentAmount = draft.paymentMethod === "onsite" ? Math.round(service.price * 0.2) : service.price;
  const bookingStatus = getDraftBookingStatus(salon, draft.paymentMethod);
  const booking = normalizeBooking({
    ...(existingBooking || {}),
    id: bookingId,
    code: existingBooking?.code || makeBookingCode(bookingId),
    salonId: salon.id,
    salonName: salon.name,
    serviceId: service.id,
    serviceName: service.name,
    specialistId: specialist.id,
    specialistName: specialist.name,
    date: draft.date,
    time: draft.time,
    customerName,
    customerEmail,
    customerPhone,
    customerId: bookingCustomerId,
    paymentMethod: draft.paymentMethod,
    paymentAmount,
    totalAmount: service.price,
    duration: service.duration,
    cleanupMinutes: getServiceCleanupMinutes(service, salon),
    endTime: shiftTimeValue(draft.time, service.duration),
    notes: draft.notes.trim(),
    status: bookingStatus,
    createdAt: existingBooking?.createdAt || nowIso,
    updatedAt: nowIso,
  });

  const payment = buildPaymentRecordForBooking(booking, getPaymentByBookingId(booking.id));

  if (existingBooking) {
    state.bookings = state.bookings.map((item) => (item.id === booking.id ? booking : item));
    state.payments = upsertPaymentRecord(state.payments, payment);
    pushActivityEntry(
      `Atnaujinta rezervacija: ${booking.salonName}`,
      `${formatDateLabel(booking.date)} ${booking.time}-${booking.endTime} | ${booking.serviceName}`,
      "info"
    );
    refs.bookingMessage.textContent = "Rezervacija sekmingai perplanuota.";
  } else {
    state.bookings = [booking, ...state.bookings];
    state.payments = [payment, ...state.payments];
    pushActivityEntry(
      `Sukurta rezervacija: ${booking.salonName}`,
      `${booking.date} ${booking.time}-${booking.endTime} | ${booking.serviceName} | ${formatPaymentLabel(booking.paymentMethod)}`,
      "success"
    );
    if (customer) {
      refs.bookingMessage.textContent =
        booking.status === "Laukia patvirtinimo"
          ? "Rezervacijos uzklausa issiusta. Salonas patvirtins laika per 30 min."
          : booking.paymentMethod === "onsite"
          ? "Rezervacija sukurta, uzstatas uzfiksuotas."
          : "Rezervacija ir apmokejimas patvirtinti.";
    } else {
      refs.bookingMessage.textContent =
        booking.status === "Laukia patvirtinimo"
          ? "Rezervacijos uzklausa issiusta. Patvirtinima gausi pagal nurodyta el. pasta."
          : booking.paymentMethod === "onsite"
          ? "Rezervacija sukurta. Uzstatas uzfiksuotas, o detales issiustos tavo kontaktams."
          : "Rezervacija patvirtinta. Jei veliau prisijungsi tuo paciu el. pastu, galesi valdyti savo vizita.";
    }
  }

  state.bookingContext = null;
  if (customer) {
    state.workspace = "customer";
    clearSalonDetailState();
  }

  persistState();
  renderAll();
  if (customer) {
    scrollToWorkspace();
  } else {
    showToast("Rezervacija issiusta", "Vizitas issaugotas ir susietas su tavo el. pastu.", "success");
  }

  window.setTimeout(() => {
    closeDialog(refs.bookingModal);
    state.bookingDraft = null;
    state.bookingStep = 1;
  }, 1100);
}

function handleWorkspaceBookingAction(action, bookingId) {
  const booking = getBookingById(bookingId);
  if (!booking) {
    return;
  }

  if (action === "repeat") {
    if (canCurrentUserManageBooking(booking)) {
      startBookingRepeat(bookingId);
    }
    return;
  }

  if (action === "reschedule") {
    if (canCurrentUserManageBooking(booking)) {
      startBookingEdit(bookingId);
    }
    return;
  }

  if (action === "cancel") {
    if (canCurrentUserManageBooking(booking)) {
      cancelCustomerBooking(bookingId);
    }
  }
}

function startBookingRepeat(bookingId) {
  const booking = getBookingById(bookingId);
  if (!booking || !canCurrentUserManageBooking(booking)) {
    return;
  }

  state.bookingDraft = createBookingDraftFromBooking(booking);
  state.bookingContext = { mode: "repeat", bookingId };
  state.bookingStep = 1;
  refs.bookingMessage.textContent = "";
  renderBookingFlow();
  openDialog(refs.bookingModal);
}

function startBookingEdit(bookingId) {
  const booking = getBookingById(bookingId);
  if (!booking || !canCurrentUserManageBooking(booking) || !canRescheduleBooking(booking)) {
    return;
  }

  state.bookingDraft = createBookingDraftFromBooking(booking, { preserveTime: true });
  state.bookingContext = { mode: "edit", bookingId };
  state.bookingStep = 2;
  refs.bookingMessage.textContent = "";
  renderBookingFlow();
  openDialog(refs.bookingModal);
}

function confirmManagedBooking(bookingId) {
  const booking = getBookingById(bookingId);
  if (!booking || booking.status !== "Uzstatas") {
    return;
  }

  updateManagedBooking(
    bookingId,
    { status: "Patvirtinta" },
    {
      title: `Patvirtinta rezervacija: ${booking.salonName}`,
      meta: `${booking.customerName} | ${formatDateLabel(booking.date)} ${booking.time}`,
      tone: "success",
    }
  );
}

function completeManagedBooking(bookingId) {
  const booking = getBookingById(bookingId);
  if (!booking || isClosedBooking(booking) || getBookingTimestamp(booking) > Date.now()) {
    return;
  }

  updateManagedBooking(
    bookingId,
    { status: "Ivykdyta" },
    {
      title: `Uzbaigta rezervacija: ${booking.salonName}`,
      meta: `${booking.customerName} | ${booking.serviceName}`,
      tone: "info",
    }
  );
}

function cancelCustomerBooking(bookingId) {
  const booking = getBookingById(bookingId);
  if (!booking || !canCurrentUserManageBooking(booking) || isClosedBooking(booking) || !canCancelBooking(booking)) {
    return;
  }

  updateManagedBooking(
    bookingId,
    { status: "Atsaukta" },
    {
      title: `Atsauktas vizitas: ${booking.salonName}`,
      meta: `${formatDateLabel(booking.date)} ${booking.time} | ${booking.serviceName}`,
      tone: "warning",
    }
  );
}

function updateManagedBooking(bookingId, patch, activity) {
  const booking = getBookingById(bookingId);
  if (!booking) {
    return;
  }

  const nextBooking = normalizeBooking({
    ...booking,
    ...patch,
    updatedAt: new Date().toISOString(),
  });
  const payment = buildPaymentRecordForBooking(nextBooking, getPaymentByBookingId(nextBooking.id));

  state.bookings = state.bookings.map((item) => (item.id === bookingId ? nextBooking : item));
  state.payments = upsertPaymentRecord(state.payments, payment);
  pushActivityEntry(activity.title, activity.meta, activity.tone);
  persistAndRender();
}

function buildPaymentRecordForBooking(booking, existingPayment = null) {
  return {
    id: existingPayment?.id || makeId("payment"),
    bookingId: booking.id,
    amount: booking.paymentAmount,
    method: booking.paymentMethod,
    status: getPaymentStatusFromBooking(booking),
    label: booking.serviceName,
    createdAt: existingPayment?.createdAt || booking.createdAt,
    updatedAt: booking.updatedAt || booking.createdAt,
  };
}

function upsertPaymentRecord(payments, nextPayment) {
  const exists = payments.some((payment) => payment.id === nextPayment.id);
  return exists ? payments.map((payment) => (payment.id === nextPayment.id ? nextPayment : payment)) : [nextPayment, ...payments];
}

function pushActivityEntry(title, meta, tone = "info") {
  state.activities = [
    {
      id: makeId("activity"),
      title,
      meta,
      tone,
      createdAt: new Date().toISOString(),
    },
    ...state.activities,
  ].slice(0, 12);

  showToast(title, meta, tone);
}

function loginAs(role, userId = "") {
  if (role === "customer") {
    const customer = getCustomerAccountById(userId) || getPrimaryCustomerAccount();
    if (customer) {
      loginAsCustomer(customer.id);
    }
    return;
  }

  if (!staffProfiles[role]) {
    return;
  }

  if (refs.bookingModal?.open) {
    closeDialog(refs.bookingModal);
  }

  if (role !== "customer") {
    clearSalonDetailState();
  }

  state.currentUserRole = role;
  state.currentUserId = staffProfiles[role].id;
  state.workspace = role;
  state.bookingDraft = null;
  state.bookingContext = null;
  state.bookingStep = 1;
  state.activities = [
    {
      id: makeId("activity"),
      title: `Prisijungta kaip ${formatRoleLabel(role)}`,
      meta: `${staffProfiles[role].name} atidare ${formatRoleLabel(role)} darbo zona.`,
      tone: "info",
      createdAt: new Date().toISOString(),
    },
    ...state.activities,
  ].slice(0, 10);

  persistState();
  renderAll();
  showToast(
    `Prisijungta kaip ${formatRoleLabel(role)}`,
    `${staffProfiles[role].name} atidare savo darbo zona.`,
    "info"
  );
  closeDialog(refs.authModal);
  if (role === "customer" && state.activeSalonId) {
    scrollToSalonDetail();
    return;
  }

  scrollToWorkspace();
}

function loginAsCustomer(accountId, options = {}) {
  const customer = getCustomerAccountById(accountId);
  if (!customer) {
    return;
  }

  if (refs.bookingModal?.open) {
    closeDialog(refs.bookingModal);
  }

  if (!options.skipLastLoginUpdate) {
    updateCustomerAccountRecord(accountId, { lastLoginAt: new Date().toISOString() });
  }
  const nextCustomer = getCustomerAccountById(accountId) || customer;

  state.currentUserRole = "customer";
  state.currentUserId = nextCustomer.id;
  state.workspace = "customer";
  state.bookingDraft = null;
  state.bookingContext = null;
  state.bookingStep = 1;
  state.activities = [
    {
      id: makeId("activity"),
      title: "Prisijungta prie kliento paskyros",
      meta: `${nextCustomer.name} atidare savo rezervaciju ir profilio zona.`,
      tone: "success",
      createdAt: new Date().toISOString(),
    },
    ...state.activities,
  ].slice(0, 10);

  persistState();
  renderAll();
  showToast("Prisijungta prie kliento paskyros", `${nextCustomer.name} gali matyti savo rezervacijas ir megstamus salonus.`, "success");
  closeDialog(refs.authModal);
  if (state.activeSalonId) {
    scrollToSalonDetail();
    return;
  }

  scrollToWorkspace();
}

function logout() {
  if (refs.bookingModal?.open) {
    closeDialog(refs.bookingModal);
  }

  state.currentUserRole = null;
  state.currentUserId = null;
  state.workspace = "customer";
  state.bookingDraft = null;
  state.bookingContext = null;
  state.bookingStep = 1;
  state.activities = [
    {
      id: makeId("activity"),
      title: "Sesija uzdaryta",
      meta: "Vartotojas atsijunge is sistemos.",
      tone: "warning",
      createdAt: new Date().toISOString(),
    },
    ...state.activities,
  ].slice(0, 10);

  persistState();
  renderAll();
  showToast("Sesija uzdaryta", "Puslapis vel rodomas kaip sveciui.", "warning");
  closeDialog(refs.authModal);
}

function openBooking(salonId, serviceId = "", selectedTime = "", context = null) {
  if (!canCurrentUserStartBooking()) {
    handleUnauthorizedBookingAttempt();
    return;
  }

  state.bookingDraft = createBookingDraft(salonId, serviceId, selectedTime);
  state.bookingContext = context || { mode: "create", bookingId: null };
  state.bookingStep = state.bookingDraft.time ? 2 : 1;
  refs.bookingMessage.textContent = "";
  renderBookingFlow();
  openDialog(refs.bookingModal);
}

function renderAll() {
  normalizeRoleBoundaries();
  applyRoleLayoutState();
  syncControls();
  renderSearchSuggestions();
  renderSearchDatePanel();
  renderHeroTotals();
  renderResultsVisibility();
  renderActiveFilters();
  if (state.showResults) {
    renderSalons();
  }
  renderSalonDetail();
  renderWorkspace();
  renderSideRail();
  renderSessionLabel();
  renderActiveStates();
  renderToast();
  if (state.bookingDraft) {
    renderBookingFlow();
  }
}

function renderResultsVisibility() {
  if (!refs.resultsSection) {
    return;
  }

  const canSeeMarketplace = canCurrentUserBrowseMarketplace();
  const shouldShowResults = canSeeMarketplace && state.showResults && !state.activeSalonId;
  refs.resultsSection.hidden = !shouldShowResults;
  refs.resultsSection.setAttribute("aria-hidden", String(!shouldShowResults));
  refs.resultsSection.classList.toggle("results-loading", shouldShowResults && uiState.resultsPending);
}

function getActiveFilterChips() {
  const chips = [];

  if (state.filters.category !== "all") {
    chips.push({ key: "category", label: `Kategorija: ${state.filters.category}` });
  }

  if (state.filters.query) {
    chips.push({ key: "query", label: `Paieska: ${state.filters.query}` });
  }

  if (state.filters.location) {
    chips.push({ key: "location", label: `Vieta: ${state.filters.location}` });
  } else if (state.filters.city !== "all") {
    chips.push({ key: "city", label: `Miestas: ${state.filters.city}` });
  }

  if (state.filters.date !== "any") {
    chips.push({ key: "date", label: `Data: ${formatDateLabel(state.filters.date)}` });
  }

  if (state.filters.requestedTime) {
    chips.push({ key: "requestedTime", label: `Laikas: ${state.filters.requestedTime}` });
  }

  if (state.filters.instantOnly) {
    chips.push({ key: "instantOnly", label: "Momentinis patvirtinimas" });
  }

  return chips;
}

function renderActiveFilters() {
  if (!refs.activeFilterBar || !refs.activeFilterList) {
    return;
  }

  const canShow = canCurrentUserBrowseMarketplace() && state.showResults && !state.activeSalonId;
  const chips = canShow ? getActiveFilterChips() : [];
  refs.activeFilterBar.hidden = !chips.length;

  if (!chips.length) {
    refs.activeFilterList.innerHTML = "";
    return;
  }

  refs.activeFilterList.innerHTML = `
    ${chips
      .map(
        (chip) => `
          <button class="active-filter-chip" type="button" data-clear-filter="${chip.key}">
            <span>${escapeHtml(chip.label)}</span>
            <strong>x</strong>
          </button>
        `
      )
      .join("")}
    <button class="active-filter-reset" type="button" data-clear-all-filters>
      Isvalyti viska
    </button>
  `;
}

function renderResultsLoadingState() {
  refs.resultsSummary.textContent = "Ieskome geriausiai tinkanciu salonu...";
  refs.salonList.innerHTML = `
    <section class="salon-loading-grid" aria-hidden="true">
      ${Array.from({ length: 4 }, () => `
        <article class="salon-skeleton-card">
          <div class="salon-skeleton-main">
            <span class="skeleton-line skeleton-line-short"></span>
            <span class="skeleton-line skeleton-line-title"></span>
            <span class="skeleton-line"></span>
            <span class="skeleton-line"></span>
            <div class="skeleton-chip-row">
              <span class="skeleton-chip"></span>
              <span class="skeleton-chip"></span>
              <span class="skeleton-chip"></span>
            </div>
          </div>
          <div class="salon-skeleton-side">
            <span class="skeleton-line skeleton-line-short"></span>
            <span class="skeleton-line"></span>
            <span class="skeleton-line skeleton-line-short"></span>
            <div class="skeleton-chip-row">
              <span class="skeleton-chip"></span>
              <span class="skeleton-chip"></span>
            </div>
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function clearFilterByKey(filterKey) {
  switch (filterKey) {
    case "category":
      state.filters.category = "all";
      break;
    case "query":
      state.filters.query = "";
      refs.queryInput.value = "";
      break;
    case "location":
      state.filters.location = "";
      state.filters.city = "all";
      refs.locationInput.value = "";
      break;
    case "city":
      state.filters.city = "all";
      state.filters.location = "";
      refs.locationInput.value = "";
      break;
    case "date":
      state.filters.date = "any";
      refs.dateSelect.value = "any";
      if (refs.customDateInput) {
        refs.customDateInput.value = "";
      }
      if (refs.timeInput) {
        refs.timeInput.value = "";
      }
      state.filters.requestedTime = "";
      break;
    case "requestedTime":
      state.filters.requestedTime = "";
      if (refs.timeInput) {
        refs.timeInput.value = "";
      }
      break;
    case "instantOnly":
      state.filters.instantOnly = false;
      refs.instantOnly.checked = false;
      break;
    default:
      break;
  }
}

function showToast(title, message = "", tone = "info") {
  uiState.toast = {
    id: makeId("toast"),
    title,
    message,
    tone,
  };

  if (uiTimers.toast) {
    window.clearTimeout(uiTimers.toast);
  }

  renderToast();

  uiTimers.toast = window.setTimeout(() => {
    clearToast();
  }, 3400);
}

function clearToast() {
  uiState.toast = null;
  renderToast();
}

function renderToast() {
  if (!refs.toastRegion) {
    return;
  }

  if (!uiState.toast) {
    refs.toastRegion.innerHTML = "";
    refs.toastRegion.classList.remove("visible");
    return;
  }

  refs.toastRegion.classList.add("visible");
  refs.toastRegion.innerHTML = `
    <article class="toast-card toast-${uiState.toast.tone}">
      <div class="toast-copy">
        <strong>${escapeHtml(uiState.toast.title)}</strong>
        ${uiState.toast.message ? `<p>${escapeHtml(uiState.toast.message)}</p>` : ""}
      </div>
      <button class="toast-dismiss" type="button" data-dismiss-toast aria-label="Uzdaryti pranesima">
        x
      </button>
    </article>
  `;
}

function runResultsTransition(options = {}) {
  const shouldScroll = options.scroll !== false;

  if (uiTimers.results) {
    window.clearTimeout(uiTimers.results);
  }

  uiState.resultsPending = true;
  persistState();
  renderAll();

  if (shouldScroll) {
    scrollToResults();
  }

  uiTimers.results = window.setTimeout(() => {
    uiState.resultsPending = false;
    renderAll();
  }, 240);
}

function renderHeroTotals() {
  if (refs.heroBookingsCount) {
    refs.heroBookingsCount.textContent = `${state.bookings.length}`;
  }

  if (refs.heroRevenueTotal) {
    refs.heroRevenueTotal.textContent = `${sumAmounts(state.payments)} EUR`;
  }

  if (refs.heroSalonsCount) {
    refs.heroSalonsCount.textContent = `${salons.length}`;
  }
}

function renderSalonCard(salon, index, activeDate) {
  const nextSlots = getAvailableSlots(salon.id, activeDate).slice(0, 3);
  const topServices = salon.services.slice(0, 3);
  const profile = getSalonProfileSnapshot(salon);
  const offer = getSalonOffer(salon);
  const trustSignals = getSalonTrustSignals(salon);
  const canBook = canCurrentUserStartBooking();
  const isSalonOwner = state.currentUserRole === "salon" && staffProfiles.salon.salonId === salon.id;
  const favoriteActive = isFavoriteSalon(salon.id);
  const primaryServiceId = topServices[0]?.id || salon.services[0]?.id || "";
  const serviceRows = topServices
    .map((service) => {
      if (canBook) {
        return `
          <button
            type="button"
            class="service-row"
            data-open-booking
            data-salon-id="${salon.id}"
            data-service-id="${service.id}"
          >
            <span>
              <strong>${service.name}</strong><br />
              <small class="muted">${service.duration} min.</small>
            </span>
            <span class="price-tag">${service.price} EUR</span>
          </button>
        `;
      }

      return `
        <div class="service-row">
          <span>
            <strong>${service.name}</strong><br />
            <small class="muted">${service.duration} min.</small>
          </span>
          <span class="price-tag">${service.price} EUR</span>
        </div>
      `;
    })
    .join("");

  const slotItems = nextSlots
    .map((slot) => {
      if (canBook) {
        return `
          <button
            type="button"
            class="slot-chip"
            data-open-booking
            data-salon-id="${salon.id}"
            data-service-id="${primaryServiceId}"
            data-slot-time="${slot}"
          >
            ${slot}
          </button>
        `;
      }

      return `<span class="slot-chip">${slot}</span>`;
    })
    .join("");

  const detailAction = canCurrentUserBrowseMarketplace()
    ? `
      <button class="ghost-button" type="button" data-open-salon data-salon-id="${salon.id}">
        Perziureti salona
      </button>
    `
    : "";
  const favoriteAction = canCurrentUserBrowseMarketplace()
    ? `
      <button class="ghost-button ${favoriteActive ? "favorite-active" : ""}" type="button" data-toggle-favorite data-salon-id="${salon.id}">
        ${favoriteActive ? "Issaugota" : "Issaugoti"}
      </button>
    `
    : "";

  let actionMarkup = `
    ${detailAction}
    ${favoriteAction}
    <button class="primary-button" type="button" data-open-booking data-salon-id="${salon.id}">
      Rezervuoti
    </button>
  `;

  if (canBook) {
    actionMarkup = `
      ${detailAction}
      ${favoriteAction}
      <button class="primary-button" type="button" data-open-booking data-salon-id="${salon.id}">
        Rezervuoti
      </button>
    `;
  } else if (isSalonOwner) {
    actionMarkup = `
      <button class="ghost-button" type="button" data-switch-workspace="salon">
        Atidaryti kalendoriu
      </button>
    `;
  } else if (state.currentUserRole === "admin") {
    actionMarkup = `
      <button class="ghost-button" type="button" data-switch-workspace="admin">
        Atidaryti statistika
      </button>
    `;
  } else if (state.currentUserRole === "salon") {
    actionMarkup = `<span class="muted">Salono paskyra gali tik perziureti rezervuotus laikus.</span>`;
  }

  return `
    <article class="salon-card reveal" style="animation-delay:${Math.min(index * 80, 320)}ms">
      <div class="salon-main">
        <div class="salon-head">
          <div>
            <p class="salon-city">${escapeHtml(salon.city)} | ${escapeHtml(salon.neighborhood)}</p>
            <h3 class="salon-name">${escapeHtml(salon.name)}</h3>
          </div>
          <span class="status-pill ${salon.instant ? "" : "status-pill-soft"}">${
            salon.instant ? "Momentinis" : "Patvirtina per 30 min."
          }</span>
        </div>

        <p class="salon-meta">${salon.rating.toFixed(1)} * | ${salon.reviews} atsiliepimai | nuo ${
          salon.priceFrom
        } EUR</p>
        <p class="salon-description">${escapeHtml(salon.description)}</p>

        <div class="salon-offer-strip">
          <span class="eyebrow">${escapeHtml(offer.label)}</span>
          <strong>${escapeHtml(offer.title)}</strong>
          <p>${escapeHtml(offer.description)}</p>
        </div>

        <p class="salon-local-note">${escapeHtml(profile.neighborhoodNote)}</p>

        <div class="feature-tags">
          ${salon.features.map((feature) => `<span class="feature-tag">${escapeHtml(feature)}</span>`).join("")}
        </div>

        <div class="service-list">
          ${serviceRows}
        </div>
      </div>

      <div class="salon-side">
        <div class="booking-summary-card">
          <div class="list-row">
            <strong>${salon.occupancy}%</strong>
            <span class="muted">dienos uzimtumas</span>
          </div>
          <div class="list-row">
            <strong>${salon.repeatRate}%</strong>
            <span class="muted">griztantys klientai</span>
          </div>
          <div class="list-row">
            <strong>${escapeHtml(profile.languagesLabel)}</strong>
            <span class="muted">kalbos salone</span>
          </div>
        </div>

        <div class="salon-side-note">
          <strong>${escapeHtml(trustSignals[0].title)}</strong>
          <p>${escapeHtml(trustSignals[0].text)}</p>
        </div>

        <div>
          <p class="status-label">${formatDateLabel(activeDate)} laisvi laikai</p>
          <div class="slot-list">
            ${slotItems}
          </div>
        </div>

        <div class="salon-actions">
          ${actionMarkup}
        </div>
      </div>
    </article>
  `;
}

function renderSalonDetail() {
  if (!refs.salonDetailSection || !refs.salonDetailShell) {
    return;
  }

  const canShowDetail = Boolean(state.activeSalonId && canCurrentUserBrowseMarketplace());
  const salon = canShowDetail ? getSalon(state.activeSalonId) : null;
  refs.salonDetailSection.hidden = !salon;
  refs.salonDetailSection.setAttribute("aria-hidden", String(!salon));

  if (!salon) {
    refs.salonDetailShell.innerHTML = "";
    return;
  }

  const leadSpecialist = salon.specialists[0];
  const gallery = getSalonGallery(salon);
  const reviews = getSalonReviews(salon);
  const workingHours = getSalonWorkingHours(salon);
  const policies = getSalonPolicies(salon);
  const address = getSalonAddress(salon);
  const profile = getSalonProfileSnapshot(salon);
  const offer = getSalonOffer(salon);
  const trustSignals = getSalonTrustSignals(salon);
  const mapConfig = getSalonMapConfig(salon, address);
  const nextSlots = getAvailableSlots(salon.id, getActiveResultsDate()).slice(0, 5);
  const favoriteActive = isFavoriteSalon(salon.id);
  const detailPrimaryAction = canCurrentUserStartBooking()
    ? `
      <button class="primary-button" type="button" data-open-booking data-salon-id="${salon.id}">
        Rezervuoti vizita
      </button>
    `
    : `
      <button class="primary-button" type="button" data-open-auth>
        Prisijungti rezervacijai
      </button>
    `;
  const favoriteAction = canCurrentUserBrowseMarketplace()
    ? `
      <button class="ghost-button ${favoriteActive ? "favorite-active" : ""}" type="button" data-toggle-favorite data-salon-id="${salon.id}">
        ${favoriteActive ? "Issaugota vieta" : "Issaugoti salona"}
      </button>
    `
    : "";

  refs.salonDetailShell.innerHTML = `
    <div class="salon-detail-shell">
      <div class="salon-detail-topbar">
        <button class="ghost-button" type="button" data-close-salon-detail>
          Grizti i salonu sarasa
        </button>
        <div class="salon-detail-breadcrumbs">
          <span>Salonai</span>
          <span>/</span>
          <strong>${escapeHtml(salon.name)}</strong>
        </div>
      </div>

      <article class="salon-detail-hero">
        <div class="salon-detail-hero-copy">
          <p class="eyebrow">${escapeHtml(salon.city)} | ${escapeHtml(salon.neighborhood)} | ${escapeHtml(salon.category)}</p>
          <h1>${escapeHtml(salon.name)}</h1>
          <p class="salon-detail-description">${escapeHtml(salon.description)}</p>

          <div class="salon-detail-stat-row">
            <span class="status-chip">${salon.rating.toFixed(1)} * ivertinimas</span>
            <span class="status-chip">${salon.reviews} atsiliepimai</span>
            <span class="status-chip ${salon.instant ? "" : "info"}">${salon.instant ? "Momentinis patvirtinimas" : "Patvirtinimas iki 30 min."}</span>
          </div>

          <div class="feature-tags">
            ${salon.features.map((feature) => `<span class="feature-tag">${escapeHtml(feature)}</span>`).join("")}
          </div>

          <div class="salon-insight-banner">
            <span class="eyebrow">${escapeHtml(offer.label)}</span>
            <strong>${escapeHtml(offer.title)}</strong>
            <p>${escapeHtml(offer.description)}</p>
          </div>

          <div class="salon-detail-actions">
            ${detailPrimaryAction}
            ${favoriteAction}
            <button class="ghost-button" type="button" data-salon-scroll="services">Kainynas</button>
            <button class="ghost-button" type="button" data-salon-scroll="specialists">Meistrai</button>
            <button class="ghost-button" type="button" data-salon-scroll="reviews">Atsiliepimai</button>
          </div>
        </div>

        <div class="salon-detail-gallery">
          <figure class="salon-detail-gallery-main">
            <img src="${gallery[0]}" alt="${escapeHtml(salon.name)} erdve" loading="lazy" referrerpolicy="no-referrer" />
          </figure>
          <div class="salon-detail-gallery-stack">
            <figure class="salon-detail-gallery-small">
              <img src="${gallery[1]}" alt="${escapeHtml(salon.category)} proceduros ${escapeHtml(salon.name)}" loading="lazy" referrerpolicy="no-referrer" />
            </figure>

            <article class="salon-detail-gallery-note">
              <span class="eyebrow">Dazniausiai rezervuoja</span>
              <strong>${escapeHtml(salon.services[0].name)}</strong>
              <p>${escapeHtml(trustSignals[1].text)}</p>
            </article>

            <article class="salon-detail-gallery-lead">
              <img src="${leadSpecialist.photo}" alt="${escapeHtml(leadSpecialist.name)}" loading="lazy" referrerpolicy="no-referrer" />
              <div>
                <span class="eyebrow">Pagrindinis specialistas</span>
                <strong>${escapeHtml(leadSpecialist.name)}</strong>
                <p>${escapeHtml(leadSpecialist.role)} | uzimtumas ${leadSpecialist.load}%</p>
              </div>
            </article>
          </div>
        </div>
      </article>

      <div class="salon-detail-layout">
        <div class="salon-detail-main">
          <article class="salon-detail-card">
            <div class="card-header">
              <div>
                <p class="eyebrow">Apie salona</p>
                <h3>Kas svarbiausia pirmajam vizitui</h3>
              </div>
              <span class="status-pill status-pill-soft">Nuo ${profile.foundedYear} m.</span>
            </div>

            <div class="salon-profile-grid">
              <article class="salon-profile-item">
                <span>Kam labiausiai tinka</span>
                <strong>${escapeHtml(salon.category)} klientams</strong>
                <p>${escapeHtml(profile.audience)}</p>
              </article>
              <article class="salon-profile-item">
                <span>Atmosfera</span>
                <strong>Ritmas ir aptarnavimas</strong>
                <p>${escapeHtml(profile.vibe)}</p>
              </article>
              <article class="salon-profile-item">
                <span>Kalbos</span>
                <strong>${escapeHtml(profile.languagesLabel)}</strong>
                <p>${escapeHtml(profile.arrivalNote)}</p>
              </article>
              <article class="salon-profile-item">
                <span>Rajono ritmas</span>
                <strong>${escapeHtml(salon.neighborhood)}</strong>
                <p>${escapeHtml(profile.neighborhoodNote)}</p>
              </article>
            </div>

            <div class="salon-trust-list">
              ${trustSignals
                .map(
                  (signal) => `
                    <article class="salon-trust-item">
                      <strong>${escapeHtml(signal.title)}</strong>
                      <p>${escapeHtml(signal.text)}</p>
                    </article>
                  `
                )
                .join("")}
            </div>
          </article>

          <article class="salon-detail-card" id="salon-detail-services">
            <div class="card-header">
              <div>
                <p class="eyebrow">Kainynas</p>
                <h3>Paslaugos ir rezervavimo variantai</h3>
              </div>
              <span class="status-pill">${salon.services.length} paslaugos</span>
            </div>
            <div class="salon-service-menu">
              ${salon.services.map((service) => renderSalonDetailServiceRow(salon, service)).join("")}
            </div>
          </article>

          <article class="salon-detail-card" id="salon-detail-specialists">
            <div class="card-header">
              <div>
                <p class="eyebrow">Komanda</p>
                <h3>Meistrai, su kuriais gali rezervuoti</h3>
              </div>
              <span class="status-pill status-pill-soft">${salon.specialists.length} specialistai</span>
            </div>
            <div class="salon-specialist-directory">
              ${salon.specialists.map((specialist) => renderSalonDetailSpecialistCard(specialist)).join("")}
            </div>
          </article>

          <article class="salon-detail-card" id="salon-detail-reviews">
            <div class="card-header">
              <div>
                <p class="eyebrow">Atsiliepimai</p>
                <h3>Ka klientai dazniausiai pamini po vizito</h3>
              </div>
              <span class="status-pill">${salon.rating.toFixed(1)} * vidurkis</span>
            </div>
            <div class="salon-review-grid">
              ${reviews.map(renderSalonReviewCard).join("")}
            </div>
          </article>
        </div>

        <aside class="salon-detail-side">
          <article class="salon-detail-card salon-detail-sticky">
            <div class="card-header">
              <div>
                <p class="eyebrow">Greita informacija</p>
                <h3>Adresas, laikai ir rezervacija</h3>
              </div>
            </div>

            <div class="list-stack">
              <div class="service-row">
                <span>
                  <strong>${escapeHtml(address.primary)}</strong><br />
                  <small class="muted">${escapeHtml(address.secondary)}</small>
                </span>
              </div>

              <div class="service-row">
                <span>
                  <strong>Nuo ${salon.priceFrom} EUR</strong><br />
                  <small class="muted">${salon.repeatRate}% grizta pakartotinai</small>
                </span>
                <span class="status-chip">${salon.occupancy}% uzimta</span>
              </div>

              <div>
                <p class="status-label">${formatDateLabel(getActiveResultsDate())} laisvi laikai</p>
                <div class="slot-list">
                  ${
                    nextSlots.length
                      ? nextSlots
                          .map((slot) =>
                            canCurrentUserStartBooking()
                              ? `<button class="slot-chip" type="button" data-open-booking data-salon-id="${salon.id}" data-service-id="${salon.services[0].id}" data-slot-time="${slot}">${slot}</button>`
                              : `<span class="slot-chip">${slot}</span>`
                          )
                          .join("")
                      : `<p class="muted">Siandien laisvu laiku nebeliko.</p>`
                  }
                </div>
              </div>
            </div>
          </article>

          <article class="salon-detail-card">
            <div class="card-header">
              <div>
                <p class="eyebrow">Zemelapis</p>
                <h3>Kur rasti salona</h3>
              </div>
            </div>

            <div class="salon-map-frame">
              <iframe
                src="${escapeHtml(mapConfig.embedUrl)}"
                title="${escapeHtml(salon.name)} zemelapis"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div class="salon-map-meta">
              <div>
                <strong>${escapeHtml(address.primary)}</strong>
                <p>${escapeHtml(address.secondary)}</p>
              </div>
              <a class="ghost-button" href="${escapeHtml(mapConfig.openUrl)}" target="_blank" rel="noreferrer">
                Atidaryti zemelapyje
              </a>
            </div>
          </article>

          <article class="salon-detail-card">
            <div class="card-header">
              <div>
                <p class="eyebrow">Darbo laikas</p>
                <h3>Kada salonas dirba</h3>
              </div>
            </div>
            <div class="salon-hours-list">
              ${workingHours.map(renderSalonHourRow).join("")}
            </div>
          </article>

          <article class="salon-detail-card">
            <div class="card-header">
              <div>
                <p class="eyebrow">Taisykles</p>
                <h3>Kodel klientams cia patogu</h3>
              </div>
            </div>
            <div class="salon-policy-list">
              ${policies.map((policy) => `<div class="salon-policy-item">${escapeHtml(policy)}</div>`).join("")}
            </div>
          </article>
        </aside>
      </div>
    </div>
  `;
}

function renderSalonDetailServiceRow(salon, service) {
  const actionMarkup = canCurrentUserStartBooking()
    ? `
      <button class="ghost-button" type="button" data-open-booking data-salon-id="${salon.id}" data-service-id="${service.id}">
        Rezervuoti
      </button>
    `
    : `
      <button class="ghost-button" type="button" data-open-auth>
        Prisijungti
      </button>
    `;

  return `
    <div class="salon-service-row">
      <div>
        <strong>${escapeHtml(service.name)}</strong>
        <p>${service.duration} min. | rekomenduojama su ${escapeHtml(salon.specialists[0].name)}</p>
      </div>
      <span class="price-tag">${service.price} EUR</span>
      ${actionMarkup}
    </div>
  `;
}

function renderSalonDetailSpecialistCard(specialist) {
  return `
    <article class="salon-specialist-card">
      <img src="${specialist.photo}" alt="${escapeHtml(specialist.name)}" loading="lazy" referrerpolicy="no-referrer" />
      <div class="salon-specialist-card-copy">
        <strong>${escapeHtml(specialist.name)}</strong>
        <span class="specialist-role">${escapeHtml(specialist.role)}</span>
        <p>${escapeHtml(specialist.bio)}</p>
        <small>Darbo uzimtumas ${specialist.load}%</small>
      </div>
    </article>
  `;
}

function renderSalonReviewCard(review) {
  return `
    <article class="salon-review-card">
      <div class="salon-review-top">
        <strong>${escapeHtml(review.author)}</strong>
        <span class="status-chip">${review.rating.toFixed(1)} *</span>
      </div>
      <p>${escapeHtml(review.text)}</p>
      <div class="salon-review-meta">
        <span>${escapeHtml(review.context)}</span>
        <span>${escapeHtml(review.dateLabel)}</span>
      </div>
    </article>
  `;
}

function renderSalonHourRow(item) {
  return `
    <div class="salon-hour-row">
      <span>${escapeHtml(item.day)}</span>
      <strong>${escapeHtml(item.hours)}</strong>
    </div>
  `;
}

function renderSalons() {
  if (uiState.resultsPending) {
    renderResultsLoadingState();
    return;
  }

  const filtered = getFilteredSalons();
  const activeDate = getActiveResultsDate();
  const categoryOrder = ["Plaukai", "Nagai", "Veidas", "Masazai"];
  refs.resultsSummary.textContent = `Rodomi ${filtered.length} salonai`;

  if (!filtered.length) {
    refs.salonList.innerHTML = `
      <article class="workspace-guard reveal">
        <h3>Neradome tikslaus atitikmens</h3>
        <p>Pabandyk pakeisti miesta, kategorija ar paieskos fraze.</p>
        <div class="guard-actions">
          <button class="primary-button" type="button" data-reset-filters>Rodyti visus salonus</button>
        </div>
      </article>
    `;
    return;
  }

  const groupedSalons = filtered.reduce((accumulator, salon) => {
    if (!accumulator[salon.category]) {
      accumulator[salon.category] = [];
    }

    accumulator[salon.category].push(salon);
    return accumulator;
  }, {});

  refs.salonList.innerHTML = categoryOrder
    .filter((category) => groupedSalons[category]?.length)
    .map((category) => {
      const salonsInCategory = groupedSalons[category];

      return `
        <section class="salon-group">
          <div class="salon-group-header">
            <div>
              <p class="eyebrow">Kategorija</p>
              <h3>${category}</h3>
            </div>
            <span class="status-pill status-pill-soft">${salonsInCategory.length} salonai</span>
          </div>
          <div class="salon-group-list">
            ${salonsInCategory.map((salon, index) => renderSalonCard(salon, index, activeDate)).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function getSalonGallery(salon) {
  const pool = salonDetailMedia[salon.category] || salonDetailMedia.Plaukai;
  const offset = getStableNumber(`${salon.id}-gallery`) % pool.length;
  return Array.from({ length: 3 }, (_, index) => pool[(offset + index) % pool.length]);
}

function applyTemplate(template, tokens = {}) {
  return Object.entries(tokens).reduce((result, [key, value]) => {
    return result.split(`%{${key}}`).join(String(value));
  }, template);
}

function getSalonProfileSnapshot(salon) {
  const seed = getStableNumber(`${salon.id}-profile`);
  const languages = salonLanguagesByCity[salon.city] || ["LT"];
  const audiencePool = realisticSalonAudienceNotes[salon.category] || realisticSalonAudienceNotes.Plaukai;
  const vibePool = realisticSalonVibeNotes[salon.category] || realisticSalonVibeNotes.Plaukai;

  return {
    foundedYear: 2016 + (seed % 8),
    languages,
    languagesLabel: languages.join(", "),
    audience: audiencePool[seed % audiencePool.length],
    vibe: vibePool[Math.floor(seed / 3) % vibePool.length],
    neighborhoodNote:
      neighborhoodArrivalNotes[salon.neighborhood] ||
      "Patogu suderinti vizita su dienos planais, taciau vakariniai laikai uzsipildo greiciausiai.",
    arrivalNote: salon.instant
      ? "Momentinius laikus lengviausia pagauti darbo dienomis, o savaitgalio slotus verta pasiimti anksciau."
      : "Patvirtinimai dazniausiai sukrenta darbo valandomis, todel is anksto suplanuotas vizitas cia jauciasi saugiausiai.",
  };
}

function getSalonOffer(salon) {
  const seed = getStableNumber(`${salon.id}-offer`);
  const templates = salonOfferTemplates[salon.category] || salonOfferTemplates.Plaukai;
  const template = templates[seed % templates.length];
  const primaryService = salon.services[0] || { name: "Populiari paslauga" };
  const secondaryService = salon.services[1] || primaryService;

  return {
    label: template.label,
    title: applyTemplate(template.title, {
      service: primaryService.name,
      service2: secondaryService.name.toLowerCase(),
      price: salon.priceFrom,
    }),
    description: applyTemplate(template.description, {
      service: primaryService.name,
      service2: secondaryService.name.toLowerCase(),
      price: salon.priceFrom,
    }),
  };
}

function getSalonTrustSignals(salon) {
  const profile = getSalonProfileSnapshot(salon);
  const primaryService = salon.services[0] || { name: "Populiari paslauga" };
  const secondaryService = salon.services[1] || primaryService;
  const bookingWindowText =
    salon.occupancy >= 80
      ? "Vakariniai laikai dazniausiai uzsipildo per 4-6 dienas."
      : salon.instant
        ? "Daznai randama laisvu laiku per artimiausias 24-48 val."
        : "Patogiausia rezervuoti bent 2-4 dienas i prieki, ypac savaitgaliui.";

  return [
    {
      title: "Rezervavimo tempas",
      text: bookingWindowText,
    },
    {
      title: "Dazniausiai renkasi",
      text: `${primaryService.name} ir ${secondaryService.name.toLowerCase()} sudaro daugiausia pakartotiniu vizitu.`,
    },
    {
      title: "Komandos ritmas",
      text: `Salone aptarnaujama ${profile.languagesLabel}, o ${salon.repeatRate}% klientu grizta pakartotinai.`,
    },
  ];
}

function getSalonReviews(salon) {
  const templates = realisticSalonReviewTemplates[salon.category] || realisticSalonReviewTemplates.Plaukai;
  const seed = getStableNumber(`${salon.id}-reviews`);
  const leadIndex = seed % salon.specialists.length;

  return Array.from({ length: 4 }, (_, index) => {
    const author = realisticSalonReviewAuthors[(seed + index) % realisticSalonReviewAuthors.length];
    const service = salon.services[(seed + index) % salon.services.length];
    const specialist = salon.specialists[(leadIndex + index) % salon.specialists.length];
    const template = templates[(seed + index) % templates.length];

    return {
      author,
      rating: Math.max(4.7, Math.min(5, salon.rating - (index % 2) * 0.1)),
      service: service.name,
      context: `${service.name} su ${specialist.name}`,
      dateLabel: realisticSalonReviewDates[(seed + index) % realisticSalonReviewDates.length],
      text: applyTemplate(template, {
        specialist: specialist.name,
        service: service.name.toLowerCase(),
      }),
    };
  });
}

function getSalonWorkingHours(salon) {
  const firstSlot = salon.baseSlots[0] || "09:00";
  const lastSlot = salon.baseSlots[salon.baseSlots.length - 1] || "18:00";

  return [
    { day: "Pirmadienis", hours: `${firstSlot} - ${shiftTimeValue(lastSlot, 30)}` },
    { day: "Antradienis", hours: `${firstSlot} - ${shiftTimeValue(lastSlot, 30)}` },
    { day: "Treciadienis", hours: `${firstSlot} - ${shiftTimeValue(lastSlot, 30)}` },
    { day: "Ketvirtadienis", hours: `${firstSlot} - ${shiftTimeValue(lastSlot, 30)}` },
    { day: "Penktadienis", hours: `${firstSlot} - ${shiftTimeValue(lastSlot, 30)}` },
    { day: "Sestadienis", hours: `${shiftTimeValue(firstSlot, 45)} - ${shiftTimeValue(lastSlot, -15)}` },
    { day: "Sekmadienis", hours: salon.instant ? "Pagal isankstine rezervacija" : "Nedirba" },
  ];
}

function getSalonPolicies(salon) {
  const seed = getStableNumber(`${salon.id}-policies`);
  const templates = salonPolicyTemplates[salon.category] || salonPolicyTemplates.Plaukai;
  const primaryService = salon.services[0] || { name: "paslauga", price: salon.priceFrom };
  const deposit = Math.max(10, Math.round((primaryService.price || salon.priceFrom) * 0.2));

  return [
    salon.instant
      ? "Momentiniai laikai rezervuojami iskart, o salono komanda ju papildomai nebetvirtina rankiniu budu."
      : "Rezervacijos patvirtinamos salono darbo valandomis ir dazniausiai atsakomos per 30 min.",
    applyTemplate(templates[seed % templates.length], {
      deposit,
      service: primaryService.name.toLowerCase(),
    }),
    "Nemokamai atsaukti ar perplanuoti galima iki 24 val. pries vizita, veliau rezervacija gali buti apmokestinta pagal salono taisykles.",
  ];
}

function getSalonAddress(salon) {
  const streets = cityStreetPool[salon.city] || ["Centrine g."];
  const building = 6 + (getStableNumber(`${salon.id}-address`) % 24);
  const street = streets[getStableNumber(`${salon.id}-street`) % streets.length];
  const floor = 1 + (getStableNumber(`${salon.id}-floor`) % 4);
  const room = 10 + (getStableNumber(`${salon.id}-room`) % 18);

  return {
    primary: `${street} ${building}, ${salon.city}`,
    secondary: `${salon.neighborhood} | ${salon.category} studija | ${floor} a., studija ${room}`,
  };
}

function getSalonMapConfig(salon, address = getSalonAddress(salon)) {
  const neighborhoodKey = `${salon.city}-${salon.neighborhood}`;
  const defaultCityKey = `${salon.city}-default`;
  const coordinates = salonMapCoordinates[neighborhoodKey] || salonMapCoordinates[defaultCityKey] || { lat: 54.6872, lon: 25.2797 };
  const mapPadding = 0.014;
  const minLon = (coordinates.lon - mapPadding).toFixed(4);
  const maxLon = (coordinates.lon + mapPadding).toFixed(4);
  const minLat = (coordinates.lat - mapPadding).toFixed(4);
  const maxLat = (coordinates.lat + mapPadding).toFixed(4);
  const markerLat = coordinates.lat.toFixed(4);
  const markerLon = coordinates.lon.toFixed(4);
  const mapLabel = encodeURIComponent(`${salon.name}, ${address.primary}`);

  return {
    embedUrl:
      `https://www.openstreetmap.org/export/embed.html?bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}` +
      `&layer=mapnik&marker=${markerLat}%2C${markerLon}`,
    openUrl:
      `https://www.openstreetmap.org/?mlat=${markerLat}&mlon=${markerLon}#map=15/${markerLat}/${markerLon}&query=${mapLabel}`,
  };
}

function getStableNumber(value) {
  return Array.from(String(value)).reduce((sum, character, index) => sum + character.charCodeAt(0) * (index + 1), 0);
}

function shiftTimeValue(timeValue, minutesShift) {
  const [hours, minutes] = timeValue.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + minutesShift;
  const normalized = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const nextHours = String(Math.floor(normalized / 60)).padStart(2, "0");
  const nextMinutes = String(normalized % 60).padStart(2, "0");
  return `${nextHours}:${nextMinutes}`;
}

function renderWorkspace() {
  if (state.workspace === "customer") {
    refs.workspacePanel.innerHTML = renderCustomerWorkspace();
    return;
  }

  if (state.workspace === "salon") {
    refs.workspacePanel.innerHTML = renderSalonWorkspace();
    return;
  }

  refs.workspacePanel.innerHTML = renderAdminWorkspace();
}

function renderCustomerWorkspace() {
  if (state.currentUserRole !== "customer") {
    return renderGuard(
      "Prisijunk prie savo paskyros",
      "Rezervuoti gali ir be paskyros, bet prisijungus matysi savo vizitus, mokejimus ir galesi juos valdyti vienoje vietoje.",
      "Atidaryti paskyra"
    );
  }

  const customer = getCurrentUser();
  const favoriteSalons = (customer.favoriteSalons || []).map((salonId) => getSalon(salonId)).filter(Boolean);
  const bookings = getCustomerBookings(customer);
  const upcomingBookings = bookings.filter(isUpcomingBooking);
  const bookingHistory = bookings
    .filter((booking) => !upcomingBookings.some((item) => item.id === booking.id))
    .sort(sortBookingsDescending);
  const payments = getCustomerPayments(customer).sort(sortPaymentsDescending);
  const lastRepeatableBooking = [...bookings].reverse().find((booking) => booking.status !== "Atsaukta");

  return `
    <section class="workspace-canvas">
      <div class="card-header">
        <div>
          <p class="eyebrow">Mano paskyra</p>
          <h3>${customer.name} rezervacijos</h3>
        </div>
        <span class="status-pill">${customer.loyaltyCredits} loyalty credits</span>
      </div>

      <div class="stat-grid">
        <article class="stat-card">
          <strong>${upcomingBookings.length}</strong>
          <span>aktyvios rezervacijos</span>
        </article>
        <article class="stat-card">
          <strong>${favoriteSalons.length}</strong>
          <span>issaugoti salonai</span>
        </article>
        <article class="stat-card">
          <strong>${customer.loyaltyCredits}</strong>
          <span>lojalumo taskai</span>
        </article>
      </div>

      <div class="panel-grid">
        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Artimiausi vizitai</p>
              <h4>Valdyk rezervacijas vienoje vietoje</h4>
            </div>
          </div>
          <div class="booking-card-grid">
            ${
              upcomingBookings.length
                ? upcomingBookings.map((booking) => renderCustomerBookingCard(booking)).join("")
                : `<p>Nera artimiausiu rezervaciju. Issirink salona ir susikurk pirma vizita.</p>`
            }
          </div>
        </article>

        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Greiti veiksmai</p>
              <h4>Pakartok arba rezervuok nauja</h4>
            </div>
          </div>
          <div class="list-stack">
            <div class="service-row">
              <span>
                <strong>${lastRepeatableBooking ? "Pakartoti paskutine paslauga" : "Greita pradzia"}</strong><br />
                <small class="muted">${
                  lastRepeatableBooking
                    ? `${lastRepeatableBooking.serviceName} pas ${lastRepeatableBooking.salonName}`
                    : "Atsidaryk rezervacijos srauta ir issirink pirma vizita"
                }</small>
              </span>
              ${
                lastRepeatableBooking
                  ? `<button class="ghost-button" type="button" data-booking-action="repeat" data-booking-id="${lastRepeatableBooking.id}">Kartoti</button>`
                  : `<button class="ghost-button" type="button" data-open-booking data-salon-id="luna" data-service-id="balayage">Pradeti</button>`
              }
            </div>
            <div class="service-row">
              <span>
                <strong>Rekomenduojamas po darbo</strong><br />
                <small class="muted">Nord Brow & Lash siandien 18:10</small>
              </span>
              <button class="ghost-button" type="button" data-open-booking data-salon-id="nord" data-service-id="brow-lam" data-slot-time="18:10">
                Imti laika
              </button>
            </div>
            <div class="service-row">
              <span>
                <strong>Megstami salonai</strong><br />
                <small class="muted">${
                  favoriteSalons.length
                    ? favoriteSalons.map((salon) => salon.name).join(", ")
                    : "Issaugok salonus is saraso ir greitai prie ju grizk"
                }</small>
              </span>
              ${
                favoriteSalons[0]
                  ? `<button class="ghost-button" type="button" data-open-booking data-salon-id="${favoriteSalons[0].id}">
                      Rezervuoti
                    </button>`
                  : `<button class="ghost-button" type="button" data-open-salon data-salon-id="luna">
                      Rasti salona
                    </button>`
              }
            </div>
          </div>
        </article>
      </div>

      <div class="panel-grid">
        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Issaugota</p>
              <h4>Tavo megstami salonai</h4>
            </div>
          </div>
          <div class="booking-card-grid">
            ${
              favoriteSalons.length
                ? favoriteSalons
                    .slice(0, 4)
                    .map(
                      (salon) => `
                        <article class="booking-card compact">
                          <div class="booking-card-header">
                            <div>
                              <div class="booking-card-title">
                                <strong>${salon.name}</strong>
                              </div>
                              <p>${salon.city}, ${salon.neighborhood}</p>
                            </div>
                            <span class="status-chip">${salon.rating.toFixed(1)} *</span>
                          </div>
                          <div class="booking-card-actions">
                            <button class="ghost-button" type="button" data-open-salon data-salon-id="${salon.id}">
                              Perziureti
                            </button>
                            <button class="primary-button" type="button" data-open-booking data-salon-id="${salon.id}">
                              Rezervuoti
                            </button>
                          </div>
                        </article>
                      `
                    )
                    .join("")
                : `<p>Kol kas neturi issaugotu salonu. Pazymek juos salono kortelese ar vidiniuose puslapiuose.</p>`
            }
          </div>
        </article>

        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Istorija</p>
              <h4>Ankstesni vizitai ir atsaukimai</h4>
            </div>
          </div>
          <div class="booking-card-grid">
            ${
              bookingHistory.length
                ? bookingHistory.slice(0, 6).map((booking) => renderCustomerBookingCard(booking, { history: true })).join("")
                : `<p>Istorija dar tuscia. Po pirmo vizito cia matysi visus ankstesnius ir atsauktus laikus.</p>`
            }
          </div>
        </article>
      </div>

      <article class="panel-card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Mokejimai</p>
            <h4>Paskutiniai atsiskaitymai</h4>
          </div>
        </div>
        <div class="payments-list">
          ${payments.length ? payments.map(renderPaymentRow).join("") : `<p>Nera mokejimu istorijos.</p>`}
        </div>
      </article>
    </section>
  `;
}

function renderSalonWorkspace() {
  if (state.currentUserRole !== "salon") {
    return renderGuard(
      "Prisijunk kaip partneris",
      "Partneriu zona rodo specialistu apkrova, dienos rezervacijas, pajamas ir uzpildymo rodiklius.",
      "Atidaryti partnerio zona"
    );
  }

  const manager = staffProfiles.salon;
  const salon = getSalon(manager.salonId);
  const salonBookings = getSalonBookings(salon.id);
  const activeBookings = salonBookings.filter((booking) => !isClosedBooking(booking));
  const todaysBookings = activeBookings.filter((booking) => booking.date === upcomingDates[0]);
  const pendingBookings = activeBookings.filter((booking) => booking.status === "Laukia patvirtinimo" || booking.status === "Uzstatas");
  const nextBookings = activeBookings.filter(isUpcomingBooking).slice(0, 6);
  const salonPayments = state.payments.filter((payment) =>
    salonBookings.some((booking) => booking.id === payment.bookingId)
  );

  return `
    <section class="workspace-canvas">
      <div class="card-header">
        <div>
          <p class="eyebrow">Partnerio zona</p>
          <h3>${salon.name} valdymas</h3>
        </div>
        <span class="status-pill">${salon.occupancy}% dienos uzimtumas</span>
      </div>

      <div class="stat-grid">
        <article class="stat-card">
          <strong>${todaysBookings.length}</strong>
          <span>siandienos rezervacijos</span>
        </article>
        <article class="stat-card">
          <strong>${pendingBookings.length}</strong>
          <span>negalutiniai statusai</span>
        </article>
        <article class="stat-card">
          <strong>${sumAmounts(salonPayments)} EUR</strong>
          <span>surinkta per demo</span>
        </article>
      </div>

      <article class="panel-card panel-card-calendar">
        <div class="card-header">
          <div>
            <p class="eyebrow">Darbo kalendorius</p>
            <h4>Artimiausiu dienu uzimtumas pagal laikus</h4>
          </div>
          <span class="status-pill info">${upcomingDates.length} dienu vaizdas</span>
        </div>
        ${renderSalonWorkCalendar(salon, activeBookings)}
      </article>

      <div class="panel-grid">
        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Tvarkarastis</p>
              <h4>${formatDateLabel(upcomingDates[0])} rezervacijos</h4>
            </div>
          </div>
          <div class="booking-card-grid compact">
            ${
              todaysBookings.length
                ? todaysBookings.map((booking) => renderSalonBookingCard(booking)).join("")
                : `<p>Siandien dar yra laisvu langu. Gali paleisti akcija paskutines minutes slotams.</p>`
            }
          </div>
        </article>

        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Artimiausi klientai</p>
              <h4>Kas atvyksta artimiausiai</h4>
            </div>
          </div>
          <div class="booking-card-grid compact">
            ${
              nextBookings.length
                ? nextBookings.map((booking) => renderSalonBookingCard(booking, { compact: true })).join("")
                : `<p>Kol kas nera aktyviu rezervaciju.</p>`
            }
          </div>
        </article>
      </div>

      <div class="panel-grid">
        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Paslaugu mix</p>
              <h4>Kas generuoja daugiausia apyvartos</h4>
            </div>
          </div>
          <div class="bar-list">
            ${salon.services
              .map((service, index) => {
                const percentage = Math.max(38, 76 - index * 12);
                return `
                  <div class="bar-row">
                    <div class="list-row">
                      <span>${service.name}</span>
                      <strong>${service.price} EUR</strong>
                    </div>
                    <div class="bar-track"><div class="bar-fill" style="width:${percentage}%"></div></div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </article>

        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Komandos apkrova</p>
              <h4>Specialistu uzimtumas</h4>
            </div>
          </div>
          <div class="bar-list">
            ${salon.specialists
              .map((specialist) => {
                return `
                  <div class="bar-row">
                    <div class="list-row">
                      <span>${specialist.name} / ${specialist.role}</span>
                      <strong>${specialist.load}%</strong>
                    </div>
                    <div class="bar-track"><div class="bar-fill" style="width:${specialist.load}%"></div></div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderAdminWorkspace() {
  if (state.currentUserRole !== "admin") {
    return renderGuard(
      "Prisijunk kaip platformos valdytojas",
      "Platformos apzvalgoje matysi bendra rezervaciju srauta, miestus ir top salonu performance.",
      "Atidaryti platformos apzvalga"
    );
  }

  const totalRevenue = sumAmounts(state.payments);
  const instantShare = Math.round((salons.filter((salon) => salon.instant).length / salons.length) * 100);
  const cityCounts = getCityBookingCounts();

  return `
    <section class="workspace-canvas">
      <div class="card-header">
        <div>
          <p class="eyebrow">Platformos apzvalga</p>
          <h3>Lai\u017eyklel\u0117 pulse skydelis</h3>
        </div>
        <span class="status-pill">GMV ${totalRevenue} EUR</span>
      </div>

      <div class="stat-grid">
        <article class="stat-card">
          <strong>${state.bookings.length}</strong>
          <span>rezervacijos visoje sistemoje</span>
        </article>
        <article class="stat-card">
          <strong>${instantShare}%</strong>
          <span>momentinio patvirtinimo dalis</span>
        </article>
        <article class="stat-card">
          <strong>${Object.keys(cityCounts).length}</strong>
          <span>aktyvus miestai platformoje</span>
        </article>
      </div>

      <div class="panel-grid">
        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Miestu split</p>
              <h4>Kur vyksta daugiausia veiksmu</h4>
            </div>
          </div>
          <div class="bar-list">
            ${Object.entries(cityCounts)
              .map(([city, value]) => {
                const width = Math.max(28, value * 18);
                return `
                  <div class="bar-row">
                    <div class="list-row">
                      <span>${city}</span>
                      <strong>${value} rezerv.</strong>
                    </div>
                    <div class="bar-track"><div class="bar-fill" style="width:${Math.min(width, 100)}%"></div></div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </article>

        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Top salonai</p>
              <h4>Reitingu ir srauto lyderiai</h4>
            </div>
          </div>
          <div class="list-stack">
            ${salons
              .slice()
              .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
              .slice(0, 4)
              .map((salon) => {
                return `
                  <div class="service-row">
                    <span>
                      <strong>${salon.name}</strong><br />
                      <small class="muted">${salon.city} | ${salon.reviews} atsiliepimai</small>
                    </span>
                    <span class="status-chip">${salon.rating.toFixed(1)} *</span>
                  </div>
                `;
              })
              .join("")}
          </div>
        </article>
      </div>

      <div class="panel-grid">
        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Naujausi uzsakymai</p>
              <h4>Sistemos activity feed</h4>
            </div>
          </div>
          <div class="list-stack">
            ${state.bookings.slice(0, 5).map(renderBookingRow).join("")}
          </div>
        </article>

        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Konversija</p>
              <h4>Rezervavimo srauto apzvalga</h4>
            </div>
          </div>
          <div class="bar-list">
            <div class="bar-row">
              <div class="list-row"><span>Search -> salon card</span><strong>68%</strong></div>
              <div class="bar-track"><div class="bar-fill" style="width:68%"></div></div>
            </div>
            <div class="bar-row">
              <div class="list-row"><span>Salon card -> booking</span><strong>41%</strong></div>
              <div class="bar-track"><div class="bar-fill" style="width:41%"></div></div>
            </div>
            <div class="bar-row">
              <div class="list-row"><span>Booking -> payment</span><strong>84%</strong></div>
              <div class="bar-track"><div class="bar-fill" style="width:84%"></div></div>
            </div>
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderSideRail() {
  const currentUser = getCurrentUser();
  const customerRailMeta =
    currentUser?.role === "customer"
      ? `
        <div class="list-row">
          <span class="muted">issaugota salonu</span>
          <strong>${currentUser.favoriteSalons.length}</strong>
        </div>
        <div class="list-row">
          <span class="muted">lojalumo taskai</span>
          <strong>${currentUser.loyaltyCredits}</strong>
        </div>
      `
      : "";
  refs.sessionCard.innerHTML = currentUser
    ? `
      <div class="list-stack">
        <div class="service-row">
          <span>
            <strong>${currentUser.name}</strong><br />
            <small class="muted">${formatRoleLabel(currentUser.role)} | ${getRoleCapabilitySummary(currentUser.role)}</small>
          </span>
          <span class="status-chip">${currentUser.role}</span>
        </div>
        <div class="list-row">
          <span class="muted">${currentUser.email}</span>
          <button class="ghost-button" type="button" data-logout>Atsijungti</button>
        </div>
        ${customerRailMeta}
      </div>
    `
    : `
      <div class="list-stack">
        <p>Aktyvi sesija dar nepasirinkta.</p>
        <button class="primary-button" type="button" data-open-auth data-open-auth-view="login">Prisijungti arba registruotis</button>
      </div>
    `;

  if (!currentUser) {
    refs.activityEyebrow.textContent = "Prieiga";
    refs.activityTitle.textContent = "Ka daro kiekviena paskyra";
    refs.summaryEyebrow.textContent = "Role";
    refs.summaryTitle.textContent = "Atskirtos atsakomybes";
    refs.activityFeed.innerHTML = `
      <div class="activity-row">
        <div class="list-meta">
          <strong>Kliente</strong>
          <span class="muted">Rezervuoja proceduras ir valdo tik savo vizitus.</span>
        </div>
      </div>
      <div class="activity-row">
        <div class="list-meta">
          <strong>Salono vadove</strong>
          <span class="muted">Mato klientu uzimtus laikus ir darbo kalendoriu be redagavimo.</span>
        </div>
      </div>
      <div class="activity-row">
        <div class="list-meta">
          <strong>Adminas</strong>
          <span class="muted">Stebi platformos statistika ir bendrus rodiklius.</span>
        </div>
      </div>
    `;
    refs.paymentsCard.innerHTML = `
      <div class="list-stack">
        <p>Rezervacijos kuriamos prisijungus arba susikurus kliento paskyra. Partnerio ir admin paskyros skirtos tik perziurai.</p>
        <button class="primary-button" type="button" data-open-auth data-open-auth-view="register">Kurti arba atidaryti paskyra</button>
      </div>
    `;
    return;
  }

  if (currentUser.role === "customer") {
    const bookings = getCustomerBookings(currentUser);
    const payments = getCustomerPayments(currentUser);

    refs.activityEyebrow.textContent = "Vizitai";
    refs.activityTitle.textContent = "Tavo rezervaciju naujienos";
    refs.summaryEyebrow.textContent = "Mokejimai";
    refs.summaryTitle.textContent = "Tavo atsiskaitymu suvestine";
    refs.activityFeed.innerHTML = bookings.length
      ? bookings.slice(0, 5).map(renderCustomerActivityRow).join("")
      : `<p>Dar neturi savo rezervaciju.</p>`;
    refs.paymentsCard.innerHTML = `
      <div class="list-stack">
        <div class="service-row">
          <span>
            <strong>${sumAmounts(payments)} EUR</strong><br />
            <small class="muted">tik tavo rezervaciju suma</small>
          </span>
          <span class="status-chip">${payments.length} mokej.</span>
        </div>
        <div class="payments-list">
          ${payments.length ? payments.slice(0, 3).map(renderPaymentRow).join("") : `<p>Mokejimu dar nera.</p>`}
        </div>
      </div>
    `;
    return;
  }

  if (currentUser.role === "salon") {
    const salonBookings = getSalonBookings(currentUser.salonId);
    const upcomingSalonBookings = salonBookings.filter(isUpcomingBooking);
    const pendingSalonBookings = salonBookings.filter((booking) => booking.status === "Laukia patvirtinimo");
    const depositSalonBookings = salonBookings.filter(
      (booking) => booking.paymentMethod === "onsite" && !isClosedBooking(booking)
    );
    const completedSalonBookings = salonBookings.filter((booking) => booking.status === "Ivykdyta");

    refs.activityEyebrow.textContent = "Kalendorius";
    refs.activityTitle.textContent = "Klientu rezervuoti laikai";
    refs.summaryEyebrow.textContent = "Suvestine";
    refs.summaryTitle.textContent = "Salono rezervaciju busena";
    refs.activityFeed.innerHTML = salonBookings.length
      ? salonBookings.slice(0, 5).map(renderSalonActivityRow).join("")
      : `<p>Klientu rezervaciju kol kas nera.</p>`;
    refs.paymentsCard.innerHTML = `
      <div class="list-stack">
        <div class="service-row">
          <span>
            <strong>${salonBookings.length}</strong><br />
            <small class="muted">klientu rezervuoti laikai</small>
          </span>
          <span class="status-chip">${upcomingSalonBookings.length} aktyv.</span>
        </div>
        <div class="list-stack">
          <div class="list-row"><span>Laukia atvykimo</span><strong>${upcomingSalonBookings.length}</strong></div>
          <div class="list-row"><span>Laukia patvirtinimo</span><strong>${pendingSalonBookings.length}</strong></div>
          <div class="list-row"><span>Su uzstatu</span><strong>${depositSalonBookings.length}</strong></div>
          <div class="list-row"><span>Ivykdyta</span><strong>${completedSalonBookings.length}</strong></div>
        </div>
      </div>
    `;
    return;
  }

  refs.activityEyebrow.textContent = "Signalai";
  refs.activityTitle.textContent = "Naujausi platformos ivykiai";
  refs.summaryEyebrow.textContent = "Statistika";
  refs.summaryTitle.textContent = "Platformos suvestine";
  refs.activityFeed.innerHTML = state.activities
    .slice(0, 5)
    .map((activity) => {
      return `
        <div class="activity-row">
          <div class="list-meta">
            <strong>${activity.title}</strong>
            <span class="muted">${activity.meta}</span>
          </div>
          <span class="status-chip ${activity.tone === "warning" ? "warning" : activity.tone === "info" ? "info" : ""}">
            ${formatTimeAgo(activity.createdAt)}
          </span>
        </div>
      `;
    })
    .join("");
  refs.paymentsCard.innerHTML = `
    <div class="list-stack">
      <div class="service-row">
        <span>
          <strong>${sumAmounts(state.payments)} EUR</strong><br />
          <small class="muted">visa platformos mokejimu suma</small>
        </span>
        <span class="status-chip">${state.payments.length} mokej.</span>
      </div>
      <div class="payments-list">
        ${state.payments.slice(0, 3).map(renderPaymentRow).join("")}
      </div>
    </div>
  `;
}

function renderSessionLabel() {
  const currentUser = getCurrentUser();
  refs.sessionLabel.textContent = currentUser
    ? `${formatRoleLabel(currentUser.role)}: ${currentUser.name}`
    : "Neprisijungta";
  refs.sessionLabel.classList.toggle("session-label-hidden", !currentUser);
}

function renderWorkspaceHeading() {
  if (!refs.workspaceEyebrow || !refs.workspaceTitle) {
    return;
  }

  if (state.currentUserRole === "salon") {
    refs.workspaceEyebrow.textContent = "Partnerio zona";
    refs.workspaceTitle.textContent = "Matyk tik savo salono klientu rezervuotus laikus ir darbo kalendoriu";
    return;
  }

  if (state.currentUserRole === "admin") {
    refs.workspaceEyebrow.textContent = "Platformos apzvalga";
    refs.workspaceTitle.textContent = "Stebek statistika, srautus ir bendrus sistemos rodiklius";
    return;
  }

  refs.workspaceEyebrow.textContent = "Paskyra ir rezervacijos";
  refs.workspaceTitle.textContent = "Vienoje vietoje matyk savo vizitus, pasiulymus ir rezervaciju istorija";
}

function renderActiveStates() {
  refs.serviceFilters.forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-service-filter") === state.filters.category);
  });

  refs.cityFilters.forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-city-filter") === state.filters.city);
  });

  refs.workspaceTabs.forEach((button) => {
    const workspace = button.getAttribute("data-switch-workspace");
    const canViewWorkspace = canAccessWorkspace(workspace);
    button.hidden = !canViewWorkspace;
    button.disabled = !canViewWorkspace;
    button.classList.toggle("active", canViewWorkspace && workspace === state.workspace);
  });
}

function renderBookingFlow() {
  if (!state.bookingDraft) {
    return;
  }

  const bookingContext = state.bookingContext || { mode: "create", bookingId: null };
  const editingBookingId = bookingContext.mode === "edit" ? bookingContext.bookingId : "";
  const salon = getSalon(state.bookingDraft.salonId);
  const service = getService(salon, state.bookingDraft.serviceId);
  const specialist = getSpecialist(salon, state.bookingDraft.specialistId);
  const bookingRules = getSalonBookingRules(salon);
  const availableSlots = getAvailableSlots(salon.id, state.bookingDraft.date, {
    excludedBookingId: editingBookingId,
    serviceId: state.bookingDraft.serviceId,
    specialistId: state.bookingDraft.specialistId,
  });
  const bookingModeLabel = salon.instant ? "Momentinis patvirtinimas" : "Salonas patvirtina per 30 min.";

  refs.bookingTitle.textContent = bookingContext.mode === "edit" ? `Perplanuok ${salon.name}` : `Rezervuok ${salon.name}`;
  refs.bookingSubtitle.textContent =
    bookingContext.mode === "edit"
      ? `${salon.city} | ${salon.category} | pakeisk data, laika arba mokejima`
      : `${salon.city} | ${salon.category} | ${bookingModeLabel.toLowerCase()}`;

  refs.bookingService.innerHTML = salon.services
    .map((item) => {
      return `<option value="${item.id}" ${item.id === state.bookingDraft.serviceId ? "selected" : ""}>
        ${item.name} - ${item.duration} min. - ${item.price} EUR
      </option>`;
    })
    .join("");

  refs.bookingSpecialist.innerHTML = salon.specialists
    .map((item) => {
      return `<option value="${item.id}" ${item.id === state.bookingDraft.specialistId ? "selected" : ""}>
        ${item.name} / ${item.role}
      </option>`;
    })
    .join("");

  refs.bookingDate.innerHTML = upcomingDates
    .map((date) => {
      return `<option value="${date}" ${date === state.bookingDraft.date ? "selected" : ""}>${formatDateLabel(date)}</option>`;
    })
    .join("");

  if (!availableSlots.includes(state.bookingDraft.time)) {
    state.bookingDraft.time = "";
  }
  const projectedEndTime = state.bookingDraft.time ? shiftTimeValue(state.bookingDraft.time, service.duration) : "";

  refs.bookingSlotGrid.innerHTML = availableSlots.length
    ? availableSlots
        .map((slot) => {
          const slotEndTime = shiftTimeValue(slot, service.duration);
          return `
            <button
              type="button"
              class="slot-button ${state.bookingDraft.time === slot ? "active" : ""}"
              data-slot-select="${slot}"
            >
              <span>${slot}</span>
              <small>iki ${slotEndTime}</small>
            </button>
          `;
        })
        .join("")
    : `<p class="muted">Siai paslaugai ir siam meistrui laisvu laiku nebeliko.</p>`;

  refs.bookingName.value = state.bookingDraft.customerName;
  refs.bookingPhone.value = state.bookingDraft.customerPhone;
  refs.bookingEmail.value = state.bookingDraft.customerEmail;
  refs.bookingNotes.value = state.bookingDraft.notes;

  refs.paymentMethods.querySelectorAll("[data-payment-method]").forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-payment-method") === state.bookingDraft.paymentMethod);
  });

  refs.servicePreview.innerHTML = `
    <div class="list-stack">
      <div class="service-row">
        <span>
          <strong>${service.name}</strong><br />
          <small class="muted">${service.duration} min. | ${specialist.name} | ${bookingModeLabel}</small>
        </span>
        <span class="price-tag">${service.price} EUR</span>
      </div>
      <article class="specialist-card">
        <img class="specialist-avatar" src="${specialist.photo}" alt="${specialist.name}" loading="lazy" referrerpolicy="no-referrer" />
        <div class="specialist-copy">
          <strong>${specialist.name}</strong>
          <span class="specialist-role">${specialist.role}</span>
          <p>${specialist.bio}</p>
        </div>
      </article>
      <div class="service-row">
        <span>
          <strong>${salon.name}</strong><br />
          <small class="muted">${salon.city}, ${salon.neighborhood} | rezervacija bent ${Math.round(
            bookingRules.leadTimeMinutes / 60
          )} val. is anksto</small>
        </span>
        <span class="status-chip">${salon.instant ? "Momentinis" : "Perziura"}</span>
      </div>
    </div>
  `;

  refs.bookingSummary.innerHTML = `
    <div class="booking-summary-lines">
      <div class="list-row"><span>Paslauga</span><strong>${service.name}</strong></div>
      <div class="list-row"><span>Specialistas</span><strong>${specialist.name}</strong></div>
      <div class="list-row"><span>Data ir laikas</span><strong>${
        state.bookingDraft.time
          ? `${formatDateLabel(state.bookingDraft.date)} ${state.bookingDraft.time} - ${projectedEndTime}`
          : "Dar nepasirinkta"
      }</strong></div>
      <div class="list-row"><span>Trukme</span><strong>${service.duration} min.</strong></div>
      <div class="list-row"><span>Klientas</span><strong>${state.bookingDraft.customerName || "-"}</strong></div>
      <div class="list-row"><span>Mokejimas</span><strong>${formatPaymentLabel(state.bookingDraft.paymentMethod)}</strong></div>
      <div class="list-row"><span>Rezervacijos tipas</span><strong>${bookingModeLabel}</strong></div>
      <div class="list-row"><span>Suma dabar</span><strong>${
        state.bookingDraft.paymentMethod === "onsite" ? Math.round(service.price * 0.2) : service.price
      } EUR</strong></div>
      <div class="list-row"><span>Visa paslaugos kaina</span><strong>${service.price} EUR</strong></div>
      <div class="booking-policy-note">
        Keitimus gali atlikti iki ${Math.round(bookingRules.changeNoticeMinutes / 60)} val. pries vizita. Tarp vizitu paliekama ${
          bookingRules.bufferMinutes
        } min. paruosimo pertrauka.
      </div>
    </div>
  `;

  refs.bookingSteps.forEach((panel) => {
    const panelStep = Number(panel.getAttribute("data-step-panel"));
    panel.classList.toggle("is-hidden", panelStep !== state.bookingStep);
  });

  Array.from(refs.bookingProgress.children).forEach((step, index) => {
    step.classList.toggle("active", index + 1 === state.bookingStep);
  });

  refs.bookingBack.style.visibility = state.bookingStep === 1 ? "hidden" : "visible";
  refs.bookingNext.textContent =
    state.bookingStep === 3
      ? salon.instant
        ? state.bookingDraft.paymentMethod === "onsite"
          ? "Patvirtinti rezervacija"
          : "Patvirtinti ir apmoketi"
        : state.bookingDraft.paymentMethod === "onsite"
        ? "Siusti uzklausa"
        : "Siusti uzklausa ir autorizuoti"
      : state.bookingStep === 2
      ? "Toliau i mokejima"
      : "Toliau";
}

function renderGuard(title, description, buttonLabel) {
  return `
    <section class="workspace-guard">
      <h3>${title}</h3>
      <p>${description}</p>
      <div class="guard-actions">
        <button class="primary-button" type="button" data-open-auth data-open-auth-view="login">${buttonLabel}</button>
      </div>
    </section>
  `;
}

function renderCustomerBookingCard(booking, options = {}) {
  const salon = getSalon(booking.salonId);
  const payment = getPaymentByBookingId(booking.id);
  const showManagement = !options.history && isUpcomingBooking(booking);
  const canReschedule = showManagement && canRescheduleBooking(booking);
  const canCancel = showManagement && canCancelBooking(booking);
  const changeWindowLabel = getBookingChangeWindowLabel(booking);

  return `
    <article class="booking-card">
      <div class="booking-card-header">
        <div>
          <div class="booking-card-title">
            <strong>${booking.serviceName}</strong>
            <span class="booking-code">${booking.code}</span>
          </div>
          <p>${booking.salonName} su ${booking.specialistName}</p>
        </div>
        <span class="status-chip ${getBookingStatusClass(booking.status)}">${booking.status}</span>
      </div>

      <div class="booking-detail-grid">
        <div>
          <span>Data</span>
          <strong>${getBookingDateTimeLabel(booking)}</strong>
        </div>
        <div>
          <span>Vieta</span>
          <strong>${salon.city}, ${salon.neighborhood}</strong>
        </div>
        <div>
          <span>Trukme</span>
          <strong>${getBookingDurationMinutes(booking)} min.</strong>
        </div>
        <div>
          <span>Mokejimas</span>
          <strong>${formatPaymentLabel(booking.paymentMethod)}</strong>
        </div>
        <div>
          <span>Suma</span>
          <strong>${booking.totalAmount} EUR</strong>
        </div>
        <div>
          <span>Keitimai</span>
          <strong>${changeWindowLabel}</strong>
        </div>
      </div>

      ${
        payment
          ? `
            <div class="booking-inline-meta">
              <span>${payment.status}</span>
              <span>${payment.amount} EUR</span>
            </div>
          `
          : ""
      }

      <div class="booking-card-actions">
        ${
          showManagement
            ? `
              <button class="ghost-button" type="button" data-booking-action="reschedule" data-booking-id="${booking.id}" ${
                canReschedule ? "" : "disabled"
              }>
                Perplanuoti
              </button>
              <button class="ghost-button" type="button" data-booking-action="cancel" data-booking-id="${booking.id}" ${
                canCancel ? "" : "disabled"
              }>
                Atsaukti
              </button>
            `
            : ""
        }
        <button class="primary-button" type="button" data-booking-action="repeat" data-booking-id="${booking.id}">
          Kartoti
        </button>
      </div>
      ${
        showManagement && (!canReschedule || !canCancel)
          ? `<div class="booking-inline-meta"><span>Taisykle</span><span>${changeWindowLabel}</span></div>`
          : ""
      }
    </article>
  `;
}

function renderSalonBookingCard(booking, options = {}) {
  const compactClass = options.compact ? " compact" : "";

  return `
    <article class="booking-card${compactClass}">
      <div class="booking-card-header">
        <div>
          <div class="booking-card-title">
            <strong>${booking.customerName}</strong>
            <span class="booking-code">${booking.code}</span>
          </div>
          <p>${booking.serviceName} su ${booking.specialistName}</p>
        </div>
        <span class="status-chip ${getBookingStatusClass(booking.status)}">${booking.status}</span>
      </div>

      <div class="booking-detail-grid">
        <div>
          <span>Laikas</span>
          <strong>${getBookingDateTimeLabel(booking)}</strong>
        </div>
        <div>
          <span>Kontaktas</span>
          <strong>${booking.customerPhone}</strong>
        </div>
        <div>
          <span>Trukme</span>
          <strong>${getBookingDurationMinutes(booking)} min.</strong>
        </div>
        <div>
          <span>Mokejimas</span>
          <strong>${formatPaymentLabel(booking.paymentMethod)}</strong>
        </div>
        <div>
          <span>Verte</span>
          <strong>${booking.totalAmount} EUR</strong>
        </div>
        <div>
          <span>Busena</span>
          <strong>${getPaymentStatusFromBooking(booking)}</strong>
        </div>
      </div>

      ${booking.notes ? `<div class="booking-inline-meta"><span>Pastaba</span><span>${booking.notes}</span></div>` : ""}
      <div class="booking-inline-meta">
        <span>Prieiga</span>
        <span>tik perziura, pakeitimus valdo kliente</span>
      </div>
    </article>
  `;
}

function renderBookingRow(booking) {
  return `
    <div class="booking-row">
      <div class="booking-row-meta">
        <strong>${booking.salonName} <span class="booking-code inline">${booking.code}</span></strong>
        <span class="muted">${booking.serviceName} su ${booking.specialistName}</span>
        <span class="muted">${getBookingDateTimeLabel(booking)}</span>
      </div>
      <span class="status-chip ${getBookingStatusClass(booking.status)}">${booking.status}</span>
    </div>
  `;
}

function renderPaymentRow(payment) {
  return `
    <div class="payment-row">
      <div class="list-meta">
        <strong>${payment.label}</strong>
        <span class="muted">${formatPaymentLabel(payment.method)}</span>
      </div>
      <div class="list-meta">
        <strong>${payment.amount} EUR</strong>
        <span class="muted">${payment.status}</span>
      </div>
    </div>
  `;
}

function renderCustomerActivityRow(booking) {
  return `
    <div class="activity-row">
      <div class="list-meta">
        <strong>${booking.serviceName}</strong>
        <span class="muted">${getBookingDateTimeLabel(booking)} | ${booking.salonName}</span>
      </div>
      <span class="status-chip ${getBookingStatusClass(booking.status)}">${booking.status}</span>
    </div>
  `;
}

function renderSalonActivityRow(booking) {
  return `
    <div class="activity-row">
      <div class="list-meta">
        <strong>${booking.customerName}</strong>
        <span class="muted">${getBookingDateTimeLabel(booking)} | ${booking.serviceName}</span>
      </div>
      <span class="status-chip ${getBookingStatusClass(booking.status)}">${booking.status}</span>
    </div>
  `;
}

function renderSalonWorkCalendar(salon, bookings) {
  const slots = [...salon.baseSlots].sort(compareTimeValues);

  return `
    <div class="work-calendar-shell">
      <div class="work-calendar-grid work-calendar-grid-head">
        <div class="work-calendar-timehead">Laikas</div>
        ${upcomingDates
          .map((date) => {
            return `
              <div class="work-calendar-dayhead">
                <span>${formatWeekdayLabel(date)}</span>
                <strong>${formatDateLabel(date)}</strong>
              </div>
            `;
          })
          .join("")}
      </div>

      <div class="work-calendar-body">
        ${slots
          .map((slot) => {
            return `
              <div class="work-calendar-grid work-calendar-row">
                <div class="work-calendar-time">${slot}</div>
                ${upcomingDates
                  .map((date) => {
                    const slotBookings = getCalendarSlotBookings(bookings, date, slot);
                    if (!slotBookings.length) {
                      return `
                        <div class="work-calendar-cell empty">
                          <span>Laisva</span>
                        </div>
                      `;
                    }

                    const cellTone = getCalendarBookingsTone(slotBookings);

                    return `
                      <div class="work-calendar-cell ${cellTone}">
                        <strong>${slotBookings.length > 1 ? `${slotBookings.length} rezervacijos` : slotBookings[0].customerName}</strong>
                        ${slotBookings
                          .slice(0, 2)
                          .map(
                            (booking) => `
                              <div class="work-calendar-booking">
                                <span>${getCalendarBookingLabel(booking, slot)}</span>
                                <small>${booking.specialistName} | ${booking.serviceName}</small>
                              </div>
                            `
                          )
                          .join("")}
                        ${slotBookings.length > 2 ? `<small>+${slotBookings.length - 2} dar</small>` : ""}
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function getFilteredSalons() {
  const query = state.filters.query.trim().toLowerCase();
  const location = state.filters.location.trim().toLowerCase();
  const activeDate = getActiveResultsDate();

  return salons
    .filter((salon) => {
      const cityMatch = state.filters.city === "all" || salon.city === state.filters.city;
      const categoryMatch = state.filters.category === "all" || salon.category === state.filters.category;
      const instantMatch = !state.filters.instantOnly || salon.instant;
      const locationMatch =
        !location ||
        salon.city.toLowerCase().includes(location) ||
        salon.neighborhood.toLowerCase().includes(location);
      const dateMatch = state.filters.date === "any" || getAvailableSlots(salon.id, activeDate).length > 0;
      const queryMatch =
        !query ||
        salon.name.toLowerCase().includes(query) ||
        salon.description.toLowerCase().includes(query) ||
        salon.services.some((service) => service.name.toLowerCase().includes(query));

      return cityMatch && categoryMatch && instantMatch && locationMatch && dateMatch && queryMatch;
    })
    .sort((left, right) => {
      if (state.filters.sort === "rating") {
        return right.rating - left.rating || right.reviews - left.reviews;
      }

      if (state.filters.sort === "price-low") {
        return left.priceFrom - right.priceFrom || right.rating - left.rating;
      }

      const scoreLeft = left.rating * 100 + left.reviews + (left.instant ? 80 : 0) + left.repeatRate;
      const scoreRight = right.rating * 100 + right.reviews + (right.instant ? 80 : 0) + right.repeatRate;
      return scoreRight - scoreLeft;
    });
}

function getCustomerBookings(customer) {
  return state.bookings
    .filter(
      (booking) =>
        booking.customerId === customer.id ||
        String(booking.customerEmail || "")
          .trim()
          .toLowerCase() === customer.email
    )
    .sort(sortBookings);
}

function getGuestCustomerIdFromEmail(email) {
  const slug = String(email || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug ? `guest-${slug}` : makeId("guest");
}

function getCustomerPayments(customer) {
  const bookingIds = getCustomerBookings(customer).map((booking) => booking.id);
  return state.payments.filter((payment) => bookingIds.includes(payment.bookingId));
}

function getSalonBookings(salonId) {
  return state.bookings.filter((booking) => booking.salonId === salonId).sort(sortBookings);
}

function getBookingById(bookingId) {
  return state.bookings.find((booking) => booking.id === bookingId);
}

function getPaymentByBookingId(bookingId) {
  return state.payments.find((payment) => payment.bookingId === bookingId);
}

function getCityBookingCounts() {
  return state.bookings.reduce((accumulator, booking) => {
    const salon = getSalon(booking.salonId);
    accumulator[salon.city] = (accumulator[salon.city] || 0) + 1;
    return accumulator;
  }, {});
}

function getAvailableSlots(salonId, date, optionsOrExcludedBookingId = "") {
  const salon = getSalon(salonId);
  if (!salon || !date) {
    return [];
  }

  const options =
    typeof optionsOrExcludedBookingId === "string"
      ? { excludedBookingId: optionsOrExcludedBookingId }
      : optionsOrExcludedBookingId || {};
  const service = getService(salon, options.serviceId);

  if (options.specialistId) {
    return getSpecialistAvailableSlots(salon, date, options.specialistId, service.id, options.excludedBookingId || "");
  }

  const slotSet = new Set();
  salon.specialists.forEach((specialist) => {
    getSpecialistAvailableSlots(salon, date, specialist.id, service.id, options.excludedBookingId || "").forEach((slot) =>
      slotSet.add(slot)
    );
  });

  return [...slotSet].sort(compareTimeValues);
}

function getSpecialistAvailableSlots(salon, date, specialistId, serviceId, excludedBookingId = "") {
  const service = getService(salon, serviceId);
  return [...salon.baseSlots]
    .sort(compareTimeValues)
    .filter((slot) => canReserveSlot(salon, date, specialistId, service, slot, excludedBookingId));
}

function getFirstSpecialistForSlot(salon, date, serviceId, slot, excludedBookingId = "") {
  return salon.specialists.find((specialist) =>
    getSpecialistAvailableSlots(salon, date, specialist.id, serviceId, excludedBookingId).includes(slot)
  );
}

function canReserveSlot(salon, date, specialistId, service, slot, excludedBookingId = "") {
  if (!isBookingLeadTimeSatisfied(salon, date, slot)) {
    return false;
  }

  const proposedRange = getServiceTimeRange(salon, service, slot);
  return !state.bookings.some(
    (booking) =>
      booking.salonId === salon.id &&
      booking.date === date &&
      booking.specialistId === specialistId &&
      booking.id !== excludedBookingId &&
      bookingBlocksSlot(booking) &&
      doTimeRangesOverlap(proposedRange, getBookingTimeRange(booking))
  );
}

function createBookingDraft(salonId, serviceId, selectedTime) {
  const salon = getSalon(salonId);
  const customer = getCurrentUser()?.role === "customer" ? getCurrentUser() : { name: "", phone: "", email: "" };
  const chosenService = getService(salon, serviceId) || salon.services[0];
  const chosenDate = getActiveResultsDate();
  const chosenSpecialist =
    (selectedTime && getFirstSpecialistForSlot(salon, chosenDate, chosenService.id, selectedTime)) || salon.specialists[0];
  const availableSlots = getAvailableSlots(salon.id, chosenDate, {
    serviceId: chosenService.id,
    specialistId: chosenSpecialist.id,
  });

  return {
    salonId: salon.id,
    serviceId: chosenService.id,
    specialistId: chosenSpecialist.id,
    date: chosenDate,
    time: selectedTime && availableSlots.includes(selectedTime) ? selectedTime : "",
    paymentMethod: "card",
    customerName: customer.name,
    customerPhone: customer.phone,
    customerEmail: customer.email,
    notes: "",
  };
}

function createBookingDraftFromBooking(booking, options = {}) {
  const preserveTime = Boolean(options.preserveTime);
  const salon = getSalon(booking.salonId);
  const customer = getCurrentUser()?.role === "customer" ? getCurrentUser() : getPrimaryCustomerAccount();
  const chosenDate = upcomingDates.includes(booking.date) ? booking.date : getActiveResultsDate();
  const availableSlots = getAvailableSlots(salon.id, chosenDate, {
    excludedBookingId: preserveTime ? booking.id : "",
    serviceId: booking.serviceId,
    specialistId: booking.specialistId,
  });

  return {
    salonId: salon.id,
    serviceId: booking.serviceId,
    specialistId: booking.specialistId,
    date: chosenDate,
    time: preserveTime && availableSlots.includes(booking.time) ? booking.time : "",
    paymentMethod: booking.paymentMethod || "card",
    customerName: booking.customerName || customer.name,
    customerPhone: booking.customerPhone || customer.phone,
    customerEmail: booking.customerEmail || customer.email,
    notes: booking.notes || "",
  };
}

function populateDateFilterOptions() {
  const selectableDates = [...upcomingDates];
  if (state.filters.date !== "any" && !selectableDates.includes(state.filters.date)) {
    selectableDates.push(state.filters.date);
  }

  refs.dateSelect.innerHTML = `
    <option value="any">Data nesvarbu</option>
    ${selectableDates
      .map((date) => `<option value="${date}">${formatDateLabel(date)}</option>`)
      .join("")}
  `;
}

function getActiveResultsDate() {
  return state.filters.date === "any" ? upcomingDates[0] : state.filters.date;
}

function hydrateControls() {
  refs.queryInput.value = state.filters.query;
  refs.locationInput.value = state.filters.location;
  refs.dateSelect.value = state.filters.date;
  refs.sortSelect.value = state.filters.sort;
  refs.instantOnly.checked = state.filters.instantOnly;
}

function syncControls() {
  refs.queryInput.value = state.filters.query;
  refs.locationInput.value = state.filters.location;
  refs.dateSelect.value = state.filters.date;
  refs.sortSelect.value = state.filters.sort;
  refs.instantOnly.checked = state.filters.instantOnly;
}

function openDialog(dialog) {
  if (typeof dialog.showModal === "function" && !dialog.open) {
    dialog.showModal();
    return;
  }

  dialog.setAttribute("open", "open");
}

function closeDialog(dialog) {
  if (dialog.open && typeof dialog.close === "function") {
    dialog.close();
    return;
  }

  dialog.removeAttribute("open");
}

function getServerSnapshotPayload() {
  const bookings = (state.bookings || []).map(normalizeBooking);
  return {
    accounts: getCustomerAccounts().map(normalizeCustomerAccount),
    bookings,
    payments: normalizePayments(state.payments || [], bookings),
    activities: Array.isArray(state.activities) ? cloneState(state.activities) : [],
  };
}

function getServerSnapshotHash() {
  return JSON.stringify(getServerSnapshotPayload());
}

function applyServerSnapshot(snapshot) {
  if (!snapshot) {
    return;
  }

  const normalized = normalizeStateShape({
    ...cloneState(defaultState),
    ...cloneState(state),
    accounts: snapshot.accounts ?? state.accounts,
    bookings: snapshot.bookings ?? state.bookings,
    payments: snapshot.payments ?? state.payments,
    activities: snapshot.activities ?? state.activities,
  });

  state.accounts = normalized.accounts;
  state.bookings = normalized.bookings;
  state.payments = normalized.payments;
  state.activities = normalized.activities;
  uiState.lastServerSnapshotHash = getServerSnapshotHash();
}

async function apiRequest(path, options = {}) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), BACKEND_TIMEOUT_MS);

  try {
    const response = await fetch(`${BACKEND_BASE_URL}${path}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: options.body,
      signal: controller.signal,
    });

    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json") ? await response.json() : await response.text();

    if (!response.ok) {
      const error = new Error(payload?.message || `Backend klaida (${response.status})`);
      error.status = response.status;
      error.payload = payload;
      throw error;
    }

    return payload;
  } catch (error) {
    if (error.name === "AbortError" || error instanceof TypeError) {
      error.code = "BACKEND_UNAVAILABLE";
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function initializeBackend() {
  try {
    const snapshot = await apiRequest("/bootstrap");
    uiState.backendAvailable = true;
    uiState.backendChecked = true;
    applyServerSnapshot(snapshot.snapshot || snapshot);
    renderAll();
  } catch (error) {
    uiState.backendAvailable = false;
    uiState.backendChecked = true;
    console.warn("Backend nepasiekiamas, naudojamas localStorage rezimas.", error);
  }
}

function scheduleBackendSync(force = false) {
  if (!uiState.backendAvailable) {
    return;
  }

  const nextHash = getServerSnapshotHash();
  if (!force && nextHash === uiState.lastServerSnapshotHash) {
    return;
  }

  if (uiTimers.backendSync) {
    window.clearTimeout(uiTimers.backendSync);
  }

  uiTimers.backendSync = window.setTimeout(() => {
    void flushBackendSync();
  }, 260);
}

async function flushBackendSync() {
  if (!uiState.backendAvailable) {
    return;
  }

  const payload = getServerSnapshotPayload();
  const snapshotHash = JSON.stringify(payload);
  if (snapshotHash === uiState.lastServerSnapshotHash) {
    return;
  }

  try {
    const response = await apiRequest("/sync", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    applyServerSnapshot(response.snapshot || response);
    uiState.backendWarningShown = false;
  } catch (error) {
    uiState.backendAvailable = false;
    if (!uiState.backendWarningShown) {
      showToast("Backend nepasiekiamas", "Toliau veiks vietinis demo rezimas. Paleisk PowerShell serveri, kad duomenys butu issaugomi faile.", "warning");
      uiState.backendWarningShown = true;
    }
    console.warn("Nepavyko issaugoti duomenu backende.", error);
  }
}

function getSalon(salonId) {
  return salons.find((salon) => salon.id === salonId);
}

function getService(salon, serviceId) {
  return salon.services.find((service) => service.id === serviceId) || salon.services[0];
}

function getSpecialist(salon, specialistId) {
  return salon.specialists.find((specialist) => specialist.id === specialistId) || salon.specialists[0];
}

function getSelectedSalonSpecialist(salon) {
  return getSpecialist(salon, state.selectedSpecialists[salon.id]);
}

function normalizeCustomerAccount(account) {
  const createdAt = account.createdAt || new Date().toISOString();
  return {
    id: account.id || makeId("customer"),
    role: "customer",
    name: String(account.name || "Nauja kliente").trim(),
    email: String(account.email || "")
      .trim()
      .toLowerCase(),
    phone: String(account.phone || "").trim(),
    password: String(account.password || ""),
    loyaltyCredits: Number(account.loyaltyCredits || 0),
    favoriteSalons: Array.isArray(account.favoriteSalons) ? account.favoriteSalons.filter((salonId) => getSalon(salonId)) : [],
    createdAt,
    lastLoginAt: account.lastLoginAt || createdAt,
  };
}

function getCustomerAccounts() {
  return Array.isArray(state.accounts) ? state.accounts : [];
}

function getPrimaryCustomerAccount() {
  return getCustomerAccounts()[0] || normalizeCustomerAccount(seedCustomerAccounts[0]);
}

function getCustomerAccountById(accountId) {
  return getCustomerAccounts().find((account) => account.id === accountId) || null;
}

function getCustomerAccountByEmail(email) {
  const normalizedEmail = String(email || "")
    .trim()
    .toLowerCase();
  return getCustomerAccounts().find((account) => account.email === normalizedEmail) || null;
}

function updateCustomerAccountRecord(accountId, patch) {
  state.accounts = getCustomerAccounts().map((account) =>
    account.id === accountId ? normalizeCustomerAccount({ ...account, ...patch }) : account
  );
}

function getActiveCustomerProfile() {
  if (state.currentUserRole !== "customer") {
    return null;
  }

  return getCustomerAccountById(state.currentUserId) || getPrimaryCustomerAccount();
}

function getCurrentUser() {
  if (state.currentUserRole === "customer") {
    return getActiveCustomerProfile();
  }

  return state.currentUserRole ? staffProfiles[state.currentUserRole] : null;
}

function getDefaultWorkspaceForRole(role = state.currentUserRole) {
  return role || "customer";
}

function canAccessWorkspace(workspace) {
  return workspace === getDefaultWorkspaceForRole();
}

function canCurrentUserBrowseMarketplace() {
  return !state.currentUserRole || state.currentUserRole === "customer";
}

function canCurrentUserStartBooking() {
  return !state.currentUserRole || state.currentUserRole === "customer";
}

function canCurrentUserBook() {
  return state.currentUserRole === "customer";
}

function canCurrentUserManageBooking(booking) {
  const customer = getActiveCustomerProfile();
  return (
    Boolean(booking) &&
    Boolean(customer) &&
    state.currentUserRole === "customer" &&
    (booking.customerId === customer.id ||
      String(booking.customerEmail || "")
        .trim()
        .toLowerCase() === customer.email)
  );
}

function isFavoriteSalon(salonId) {
  const customer = getActiveCustomerProfile();
  return Boolean(customer && customer.favoriteSalons.includes(salonId));
}

function toggleFavoriteSalon(salonId) {
  if (!canCurrentUserBook()) {
    openAuthModal(state.currentUserRole ? "login" : "register");
    return;
  }

  const customer = getActiveCustomerProfile();
  if (!customer) {
    openAuthModal("login");
    return;
  }

  const favoriteSalons = customer.favoriteSalons.includes(salonId)
    ? customer.favoriteSalons.filter((id) => id !== salonId)
    : [...customer.favoriteSalons, salonId];

  updateCustomerAccountRecord(customer.id, { favoriteSalons });
  pushActivityEntry(
    favoriteSalons.includes(salonId) ? "Issaugotas salonas" : "Pasalintas issaugotas salonas",
    `${getSalon(salonId)?.name || "Salon"} ${favoriteSalons.includes(salonId) ? "pridetas" : "pasalintas"} is tavo megstamu vietu.`,
    "info"
  );
  persistAndRender();
}

function getRoleCapabilitySummary(role) {
  if (role === "customer") {
    return "rezervuoja, saugo salonus ir valdo savo vizitus";
  }

  if (role === "salon") {
    return "mato klientu rezervuotus laikus";
  }

  return "stebi statistika ir platformos rodiklius";
}

function handleUnauthorizedBookingAttempt() {
  if (!state.currentUserRole) {
    openAuthModal("login");
    return;
  }

  pushActivityEntry(
    "Rezervacija neleidziama",
    `${formatRoleLabel(state.currentUserRole)} paskyra gali tik naudoti savo skirta darbo zona.`,
    "warning"
  );
  persistState();
  renderAll();
  openAuthModal("login");
}

function normalizeRoleBoundaries() {
  if (!state.currentUserRole) {
    state.currentUserId = null;
  }

  if (state.currentUserRole === "customer" && !getCustomerAccountById(state.currentUserId)) {
    state.currentUserId = getCustomerAccounts()[0]?.id || null;
  }

  if (state.currentUserRole && state.currentUserRole !== "customer") {
    state.currentUserId = staffProfiles[state.currentUserRole]?.id || null;
  }

  const allowedWorkspace = getDefaultWorkspaceForRole();

  if (state.workspace !== allowedWorkspace) {
    state.workspace = allowedWorkspace;
  }

  if (!canCurrentUserBrowseMarketplace()) {
    state.activeSalonId = null;
  } else if (!state.activeSalonId) {
    const salonIdFromHash = getSalonIdFromHash();
    if (salonIdFromHash && getSalon(salonIdFromHash)) {
      state.activeSalonId = salonIdFromHash;
      state.showResults = true;
    }
  }

  if (!canCurrentUserStartBooking() && state.bookingDraft) {
    state.bookingDraft = null;
    state.bookingContext = null;
    state.bookingStep = 1;

    if (refs.bookingModal?.open) {
      closeDialog(refs.bookingModal);
    }
  }
}

function applyRoleLayoutState() {
  const canShowDetail = Boolean(state.activeSalonId && canCurrentUserBrowseMarketplace());
  document.body.dataset.role = state.currentUserRole || "guest";
  document.body.dataset.view = canShowDetail ? "salon-detail" : "default";

  if (!canCurrentUserBrowseMarketplace()) {
    closeMegaMenu();
    closeSearchSuggestions();
    closeDatePanel();
  }

  renderWorkspaceHeading();
}

function persistAndRender() {
  persistState();
  renderAll();
}

function persistState() {
  const serialized = {
    filters: state.filters,
    workspace: state.workspace,
    currentUserRole: state.currentUserRole,
    currentUserId: state.currentUserId,
    accounts: state.accounts,
    bookings: state.bookings,
    payments: state.payments,
    activities: state.activities,
    recentQueries: state.recentQueries,
    selectedSpecialists: state.selectedSpecialists,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  scheduleBackendSync();
}

function scrollToResults() {
  if (!refs.resultsSection) {
    return;
  }

  refs.resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToWorkspace() {
  if (!refs.workspaceSection) {
    return;
  }

  refs.workspaceSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToSalonDetail() {
  if (!refs.salonDetailSection) {
    return;
  }

  refs.salonDetailSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToSalonDetailAnchor(anchor) {
  const element = document.querySelector(`#salon-detail-${anchor}`);
  if (!element) {
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function initializeSalonRouting() {
  syncSalonDetailStateWithHash();
  window.addEventListener("hashchange", handleSalonRouteChange);
}

function handleSalonRouteChange() {
  syncSalonDetailStateWithHash();
  renderAll();

  if (state.activeSalonId) {
    scrollToSalonDetail();
    return;
  }

  if (window.location.hash === "#salons") {
    scrollToResults();
  }
}

function syncSalonDetailStateWithHash() {
  const salonId = getSalonIdFromHash();
  if (!salonId || !canCurrentUserBrowseMarketplace()) {
    state.activeSalonId = null;
    return;
  }

  const salon = getSalon(salonId);
  state.activeSalonId = salon ? salon.id : null;
  if (state.activeSalonId) {
    state.showResults = true;
  }
}

function getSalonIdFromHash() {
  const match = window.location.hash.match(/^#salonas\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function getSalonRouteHash(salonId) {
  return `#salonas/${encodeURIComponent(salonId)}`;
}

function openSalonDetailPage(salonId) {
  if (!canCurrentUserBrowseMarketplace()) {
    return;
  }

  const salon = getSalon(salonId);
  if (!salon) {
    return;
  }

  state.activeSalonId = salon.id;
  state.showResults = true;
  const nextHash = getSalonRouteHash(salon.id);
  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash.slice(1);
    return;
  }

  renderAll();
  scrollToSalonDetail();
}

function closeSalonDetailPage() {
  state.showResults = true;
  clearSalonDetailState({ preserveHash: true });

  if (window.location.hash.startsWith("#salonas/")) {
    window.location.hash = "salons";
    return;
  }

  renderAll();
  scrollToResults();
}

function clearSalonDetailState(options = {}) {
  const preserveHash = Boolean(options.preserveHash);
  state.activeSalonId = null;

  if (!preserveHash && window.location.hash.startsWith("#salonas/") && typeof window.history.replaceState === "function") {
    try {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    } catch (error) {
      window.location.hash = "";
    }
  }
}

function loadState() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return normalizeStateShape(cloneState(defaultState));
  }

  try {
    const parsed = JSON.parse(raw);
    return normalizeStateShape({
      ...cloneState(defaultState),
      ...parsed,
      filters: {
        ...defaultState.filters,
        ...(parsed.filters || {}),
      },
    });
  } catch (error) {
    return normalizeStateShape(cloneState(defaultState));
  }
}

function normalizeStateShape(sourceState) {
  const accountsSource =
    Array.isArray(sourceState.accounts) && sourceState.accounts.length ? sourceState.accounts : seedCustomerAccounts;
  const accounts = accountsSource.map(normalizeCustomerAccount);
  const bookings = (sourceState.bookings || []).map(normalizeBooking);
  const payments =
    sourceState.payments && sourceState.payments.length
      ? normalizePayments(sourceState.payments, bookings)
      : bookings.map((booking) => buildPaymentRecordForBooking(booking));
  const currentUserRole = ["customer", "salon", "admin"].includes(sourceState.currentUserRole)
    ? sourceState.currentUserRole
    : null;
  const currentUserId =
    currentUserRole === "customer"
      ? sourceState.currentUserId || accounts[0]?.id || null
      : currentUserRole
      ? staffProfiles[currentUserRole]?.id || null
      : null;

  return {
    ...sourceState,
    currentUserRole,
    currentUserId,
    accounts,
    bookings,
    payments,
    activities: Array.isArray(sourceState.activities) ? sourceState.activities : cloneState(defaultState.activities),
    bookingDraft: null,
    bookingContext: null,
    bookingStep: 1,
  };
}

function cloneState(source) {
  return JSON.parse(JSON.stringify(source));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDateLabel(dateString) {
  const date = new Date(dateString);
  const monthNames = ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rgp", "Rgs", "Spa", "Lap", "Gru"];
  return `${date.getDate()} ${monthNames[date.getMonth()]}`;
}

function formatWeekdayLabel(dateString) {
  const weekdayNames = ["Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Ses"];
  return weekdayNames[new Date(dateString).getDay()];
}

function formatTimeAgo(isoString) {
  const diffMinutes = Math.max(1, Math.round((Date.now() - new Date(isoString).getTime()) / 60000));
  if (diffMinutes < 60) {
    return `${diffMinutes} min.`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} val.`;
  }

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} d.`;
}

function formatRoleLabel(role) {
  if (role === "customer") {
    return "kliente";
  }

  if (role === "salon") {
    return "salono vadove";
  }

  return "platformos valdytojas";
}

function formatPaymentLabel(method) {
  if (method === "applepay") {
    return "Apple Pay";
  }

  if (method === "onsite") {
    return "Moketi salone";
  }

  return "Kortele";
}

function sumAmounts(items) {
  return items.reduce((sum, item) => sum + Number(item.amount || item.paymentAmount || 0), 0);
}

function getSalonBookingRules(salon) {
  const isLongSessionSalon = salon?.category === "Plaukai" || salon?.category === "Masazai";
  return {
    leadTimeMinutes: isLongSessionSalon ? DEFAULT_BOOKING_LEAD_TIME_MINUTES : 90,
    bufferMinutes: isLongSessionSalon ? DEFAULT_BOOKING_BUFFER_MINUTES : 10,
    changeNoticeMinutes: salon?.instant ? DEFAULT_BOOKING_CHANGE_NOTICE_MINUTES : 24 * 60,
  };
}

function timeValueToMinutes(timeValue = "00:00") {
  const [hours, minutes] = String(timeValue)
    .split(":")
    .map((value) => Number(value || 0));
  return hours * 60 + minutes;
}

function getServiceCleanupMinutes(service, salon) {
  const defaultBuffer = getSalonBookingRules(salon).bufferMinutes;
  if (!service) {
    return defaultBuffer;
  }

  if (service.duration >= 120) {
    return Math.max(defaultBuffer, 20);
  }

  if (service.duration >= 75) {
    return Math.max(defaultBuffer, 15);
  }

  return defaultBuffer;
}

function getServiceTimeRange(salon, service, time) {
  const duration = Number(service?.duration || 60);
  const cleanupMinutes = getServiceCleanupMinutes(service, salon);
  const startMinutes = timeValueToMinutes(time);
  return {
    startMinutes,
    endMinutes: startMinutes + duration,
    blockedEndMinutes: startMinutes + duration + cleanupMinutes,
  };
}

function getBookingTimestamp(booking) {
  return new Date(`${booking.date}T${booking.time || "00:00"}:00`).getTime();
}

function isClosedBooking(booking) {
  return ["Atsaukta", "Ivykdyta", "Neatvyko"].includes(booking.status);
}

function isUpcomingBooking(booking) {
  return !isClosedBooking(booking) && getBookingTimestamp(booking) >= Date.now();
}

function canRescheduleBooking(booking) {
  const salon = getSalon(booking?.salonId);
  const changeNoticeMinutes = getSalonBookingRules(salon).changeNoticeMinutes;
  return !isClosedBooking(booking) && getBookingTimestamp(booking) - Date.now() >= changeNoticeMinutes * 60000;
}

function canCancelBooking(booking) {
  const salon = getSalon(booking?.salonId);
  const changeNoticeMinutes = getSalonBookingRules(salon).changeNoticeMinutes;
  return !isClosedBooking(booking) && getBookingTimestamp(booking) - Date.now() >= changeNoticeMinutes * 60000;
}

function bookingBlocksSlot(booking) {
  return !isClosedBooking(booking);
}

function getBookingDurationMinutes(booking) {
  if (!booking) {
    return 0;
  }

  if (Number.isFinite(Number(booking.duration))) {
    return Number(booking.duration);
  }

  const salon = getSalon(booking.salonId);
  const service = salon ? getService(salon, booking.serviceId) : null;
  return Number(service?.duration || 60);
}

function getBookingCleanupMinutes(booking) {
  if (!booking) {
    return 0;
  }

  if (Number.isFinite(Number(booking.cleanupMinutes))) {
    return Number(booking.cleanupMinutes);
  }

  const salon = getSalon(booking.salonId);
  const service = salon ? getService(salon, booking.serviceId) : null;
  return getServiceCleanupMinutes(service, salon);
}

function getBookingEndTime(booking) {
  if (!booking?.time) {
    return "";
  }

  return booking.endTime || shiftTimeValue(booking.time, getBookingDurationMinutes(booking));
}

function getBookingTimeRange(booking) {
  const startMinutes = timeValueToMinutes(booking.time);
  const duration = getBookingDurationMinutes(booking);
  const cleanupMinutes = getBookingCleanupMinutes(booking);
  return {
    startMinutes,
    endMinutes: startMinutes + duration,
    blockedEndMinutes: startMinutes + duration + cleanupMinutes,
  };
}

function doTimeRangesOverlap(leftRange, rightRange) {
  return leftRange.startMinutes < rightRange.blockedEndMinutes && rightRange.startMinutes < leftRange.blockedEndMinutes;
}

function isBookingLeadTimeSatisfied(salon, date, time) {
  const leadTimeMinutes = getSalonBookingRules(salon).leadTimeMinutes;
  return new Date(`${date}T${time}:00`).getTime() - Date.now() >= leadTimeMinutes * 60000;
}

function getDraftBookingStatus(salon, paymentMethod) {
  if (!salon.instant) {
    return "Laukia patvirtinimo";
  }

  return paymentMethod === "onsite" ? "Uzstatas" : "Patvirtinta";
}

function hasCustomerBookingConflict(draft, excludedBookingId = "") {
  const salon = getSalon(draft.salonId);
  const service = getService(salon, draft.serviceId);
  const proposedRange = getServiceTimeRange(salon, service, draft.time);

  return state.bookings.some(
    (booking) =>
      booking.id !== excludedBookingId &&
      booking.date === draft.date &&
      bookingBlocksSlot(booking) &&
      (booking.customerId === draft.customerId || booking.customerEmail === draft.customerEmail) &&
      doTimeRangesOverlap(proposedRange, getBookingTimeRange(booking))
  );
}

function isValidCustomerEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

function isValidCustomerPhone(phone) {
  return String(phone || "").replace(/[^\d+]/g, "").length >= 8;
}

function getBookingDateTimeLabel(booking) {
  return `${formatDateLabel(booking.date)} ${booking.time}${getBookingEndTime(booking) ? ` - ${getBookingEndTime(booking)}` : ""}`;
}

function getBookingChangeWindowLabel(booking) {
  const changeNoticeHours = Math.round(getSalonBookingRules(getSalon(booking?.salonId)).changeNoticeMinutes / 60);
  return canCancelBooking(booking) ? `iki ${changeNoticeHours} val. pries vizita` : "langas uzsidare";
}

function getCalendarSlotBookings(bookings, date, slot) {
  return bookings
    .filter((booking) => booking.date === date && bookingBlocksSlot(booking) && doesBookingOccupySlot(booking, slot))
    .sort((left, right) => {
      const leftStart = timeValueToMinutes(left.time);
      const rightStart = timeValueToMinutes(right.time);
      if (leftStart !== rightStart) {
        return leftStart - rightStart;
      }

      return left.customerName.localeCompare(right.customerName);
    });
}

function doesBookingOccupySlot(booking, slot) {
  const bookingRange = getBookingTimeRange(booking);
  const slotMinutes = timeValueToMinutes(slot);
  return slotMinutes >= bookingRange.startMinutes && slotMinutes < bookingRange.blockedEndMinutes;
}

function getCalendarBookingsTone(bookings) {
  if (bookings.some((booking) => booking.status === "Atsaukta")) {
    return "danger";
  }

  if (bookings.some((booking) => booking.status === "Laukia patvirtinimo" || booking.status === "Uzstatas")) {
    return "warning";
  }

  if (bookings.some((booking) => booking.status === "Ivykdyta" || booking.status === "Neatvyko")) {
    return "info";
  }

  return "confirmed";
}

function getCalendarBookingLabel(booking, slot) {
  if (booking.time === slot) {
    return `${booking.customerName} | ${booking.time}-${getBookingEndTime(booking)}`;
  }

  return `${booking.customerName} | tesiama iki ${getBookingEndTime(booking)}`;
}

function getBookingStatusClass(status) {
  if (status === "Uzstatas" || status === "Laukia patvirtinimo") {
    return "warning";
  }

  if (status === "Atsaukta") {
    return "danger";
  }

  if (status === "Ivykdyta" || status === "Neatvyko") {
    return "info";
  }

  return "";
}

function getBookingCalendarClass(status) {
  if (status === "Uzstatas" || status === "Laukia patvirtinimo") {
    return "warning";
  }

  if (status === "Atsaukta") {
    return "danger";
  }

  if (status === "Ivykdyta" || status === "Neatvyko") {
    return "info";
  }

  return "confirmed";
}

function getPaymentStatusFromBooking(booking) {
  if (booking.status === "Laukia patvirtinimo") {
    return booking.paymentMethod === "onsite" ? "Laukia uzstato" : "Autorizuota";
  }

  if (booking.status === "Atsaukta") {
    return booking.paymentMethod === "onsite" ? "Uzstatas grazintas" : "Grazinta";
  }

  if (booking.status === "Ivykdyta") {
    return booking.paymentMethod === "onsite" ? "Apmoketa salone" : "Apmoketa";
  }

  return booking.paymentMethod === "onsite" ? "Uzstatas" : "Apmoketa";
}

function normalizeBooking(booking) {
  const createdAt = booking.createdAt || new Date().toISOString();
  const salon = getSalon(booking.salonId);
  const service = salon ? getService(salon, booking.serviceId) : null;
  const duration = Number(booking.duration ?? service?.duration ?? 60);
  const cleanupMinutes = Number(booking.cleanupMinutes ?? getServiceCleanupMinutes(service, salon));
  const endTime = booking.time ? booking.endTime || shiftTimeValue(booking.time, duration) : booking.endTime || "";

  return {
    ...booking,
    code: booking.code || makeBookingCode(booking.id),
    notes: booking.notes || "",
    status: booking.status || "Patvirtinta",
    duration,
    cleanupMinutes,
    endTime,
    createdAt,
    updatedAt: booking.updatedAt || createdAt,
  };
}

function normalizePayments(payments, bookings) {
  return payments.map((payment) => {
    const booking = bookings.find((item) => item.id === payment.bookingId);
    const createdAt = payment.createdAt || booking?.createdAt || new Date().toISOString();

    return {
      ...payment,
      method: payment.method || booking?.paymentMethod || "card",
      amount: Number(payment.amount ?? booking?.paymentAmount ?? 0),
      label: payment.label || booking?.serviceName || "Paslauga",
      status: booking
        ? getPaymentStatusFromBooking({
            ...booking,
            paymentMethod: payment.method || booking.paymentMethod,
          })
        : payment.status || "Apmoketa",
      createdAt,
      updatedAt: payment.updatedAt || createdAt,
    };
  });
}

function sortBookings(left, right) {
  return getBookingTimestamp(left) - getBookingTimestamp(right);
}

function sortBookingsDescending(left, right) {
  return getBookingTimestamp(right) - getBookingTimestamp(left);
}

function sortPaymentsDescending(left, right) {
  return new Date(right.updatedAt || right.createdAt).getTime() - new Date(left.updatedAt || left.createdAt).getTime();
}

function compareTimeValues(left, right) {
  return left.localeCompare(right, undefined, { numeric: true });
}

function toIsoDate(date) {
  return date.toISOString().split("T")[0];
}

function makeBookingCode(source) {
  const normalized = String(source || Date.now()).replace(/[^a-z0-9]/gi, "").toUpperCase();
  return `LZ-${normalized.slice(-6).padStart(6, "0")}`;
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 100000)}`;
}
