const STORAGE_KEY = "groziolaikas-demo-v4";
const DAY_MS = 24 * 60 * 60 * 1000;

const today = new Date();
today.setHours(0, 0, 0, 0);

const upcomingDates = Array.from({ length: 6 }, (_, index) => {
  const date = new Date(today.getTime() + index * DAY_MS);
  return toIsoDate(date);
});

const profiles = {
  customer: {
    id: "customer-monika",
    role: "customer",
    name: "Monika Petrauske",
    email: "monika@groziolaikas.demo",
    phone: "+37061234567",
    loyaltyCredits: 18,
    favoriteSalons: ["luna", "nord"],
  },
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
    price: service.basePrice + config.priceShift + index * 2,
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

  return {
    id,
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
    customerId: customerEmail === profiles.customer.email ? profiles.customer.id : `guest-${id}`,
    paymentMethod,
    paymentAmount,
    totalAmount: service.price,
    notes: "",
    status,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
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
    customerName: profiles.customer.name,
    customerEmail: profiles.customer.email,
    customerPhone: profiles.customer.phone,
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
    city: "all",
    category: "all",
    sort: "recommended",
    instantOnly: false,
  },
  workspace: "customer",
  currentUserRole: null,
  bookings: seedBookings,
  payments: seedPayments,
  activities: seedActivities,
  selectedSpecialists: {},
  bookingDraft: null,
  bookingStep: 1,
};

const state = loadState();

const refs = {
  sessionLabel: document.querySelector("#session-label"),
  megaMenu: document.querySelector("#mega-menu"),
  searchForm: document.querySelector("#search-form"),
  queryInput: document.querySelector("#query-input"),
  locationInput: document.querySelector("#location-input"),
  dateSelect: document.querySelector("#date-select"),
  sortSelect: document.querySelector("#sort-select"),
  instantOnly: document.querySelector("#instant-only"),
  salonList: document.querySelector("#salon-list"),
  resultsSummary: document.querySelector("#results-summary"),
  workspacePanel: document.querySelector("#workspace-panel"),
  sessionCard: document.querySelector("#session-card"),
  activityFeed: document.querySelector("#activity-feed"),
  paymentsCard: document.querySelector("#payments-card"),
  heroBookingsCount: document.querySelector("#hero-bookings-count"),
  heroRevenueTotal: document.querySelector("#hero-revenue-total"),
  heroSalonsCount: document.querySelector("#hero-salons-count"),
  authModal: document.querySelector("#auth-modal"),
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
renderAll();

refs.searchForm.addEventListener("submit", handleSearchSubmit);
refs.queryInput.addEventListener("input", handleSearchLiveInput);
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
  renderBookingFlow();
});
refs.bookingSpecialist.addEventListener("change", () => {
  if (!state.bookingDraft) {
    return;
  }

  state.bookingDraft.specialistId = refs.bookingSpecialist.value;
  renderBookingFlow();
});
refs.bookingDate.addEventListener("change", () => {
  if (!state.bookingDraft) {
    return;
  }

  state.bookingDraft.date = refs.bookingDate.value;
  if (!getAvailableSlots(state.bookingDraft.salonId, state.bookingDraft.date).includes(state.bookingDraft.time)) {
    state.bookingDraft.time = "";
  }
  renderBookingFlow();
});
refs.bookingName.addEventListener("input", () => updateDraftField("customerName", refs.bookingName.value));
refs.bookingPhone.addEventListener("input", () => updateDraftField("customerPhone", refs.bookingPhone.value));
refs.bookingEmail.addEventListener("input", () => updateDraftField("customerEmail", refs.bookingEmail.value));
refs.bookingNotes.addEventListener("input", () => updateDraftField("notes", refs.bookingNotes.value));
refs.bookingBack.addEventListener("click", handleBookingBack);
refs.bookingNext.addEventListener("click", handleBookingNext);

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

function handleDocumentClick(event) {
  if (refs.megaMenu && !event.target.closest("#mega-menu")) {
    closeMegaMenu();
  }

  const openAuthButton = event.target.closest("[data-open-auth]");
  if (openAuthButton) {
    event.preventDefault();
    openDialog(refs.authModal);
    return;
  }

  const workspaceButton = event.target.closest("[data-switch-workspace]");
  if (workspaceButton) {
    const workspace = workspaceButton.getAttribute("data-switch-workspace");
    if (workspace) {
      state.workspace = workspace;
      persistAndRender();
    }
    return;
  }

  const loginButton = event.target.closest("[data-login-role]");
  if (loginButton) {
    const role = loginButton.getAttribute("data-login-role");
    loginAs(role);
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

    closeMegaMenu();
    persistAndRender();
    return;
  }

  const serviceFilterButton = event.target.closest("[data-service-filter]");
  if (serviceFilterButton) {
    const category = serviceFilterButton.getAttribute("data-service-filter");
    state.filters.category = category;
    persistAndRender();
    return;
  }

  const cityFilterButton = event.target.closest("[data-city-filter]");
  if (cityFilterButton) {
    const city = cityFilterButton.getAttribute("data-city-filter");
    state.filters.city = city;
    state.filters.location = city === "all" ? "" : city;
    refs.locationInput.value = state.filters.location;
    persistAndRender();
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
    persistAndRender();
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
  state.filters.date = refs.dateSelect.value;
  if (state.filters.location) {
    const matchedCity = salons.find((salon) => salon.city.toLowerCase() === state.filters.location.toLowerCase())?.city;
    state.filters.city = matchedCity || "all";
  }
  persistAndRender();
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

    state.bookingStep = 3;
    refs.bookingMessage.textContent = "";
    renderBookingFlow();
    return;
  }

  confirmBooking();
}

function confirmBooking() {
  const draft = state.bookingDraft;
  const salon = getSalon(draft.salonId);
  const service = getService(salon, draft.serviceId);
  const specialist = getSpecialist(salon, draft.specialistId);

  if (!salon || !service || !specialist) {
    refs.bookingMessage.textContent = "Nepavyko sukomplektuoti rezervacijos.";
    return;
  }

  const paymentAmount = draft.paymentMethod === "onsite" ? Math.round(service.price * 0.2) : service.price;
  const booking = {
    id: makeId("booking"),
    salonId: salon.id,
    salonName: salon.name,
    serviceId: service.id,
    serviceName: service.name,
    specialistId: specialist.id,
    specialistName: specialist.name,
    date: draft.date,
    time: draft.time,
    customerName: draft.customerName.trim(),
    customerEmail: draft.customerEmail.trim(),
    customerPhone: draft.customerPhone.trim(),
    customerId: profiles.customer.id,
    paymentMethod: draft.paymentMethod,
    paymentAmount,
    totalAmount: service.price,
    notes: draft.notes.trim(),
    status: draft.paymentMethod === "onsite" ? "Uzstatas" : "Patvirtinta",
    createdAt: new Date().toISOString(),
  };

  const payment = {
    id: makeId("payment"),
    bookingId: booking.id,
    amount: paymentAmount,
    method: booking.paymentMethod,
    status: booking.paymentMethod === "onsite" ? "Uzstatas" : "Apmoketa",
    label: booking.serviceName,
    createdAt: booking.createdAt,
  };

  state.bookings = [booking, ...state.bookings];
  state.payments = [payment, ...state.payments];
  if (!state.currentUserRole) {
    state.currentUserRole = "customer";
  }
  state.activities = [
    {
      id: makeId("activity"),
      title: `Sukurta rezervacija: ${booking.salonName}`,
      meta: `${booking.date} ${booking.time} | ${booking.serviceName} | ${formatPaymentLabel(booking.paymentMethod)}`,
      tone: "success",
      createdAt: booking.createdAt,
    },
    ...state.activities,
  ].slice(0, 10);

  state.workspace = "customer";
  refs.bookingMessage.textContent =
    booking.paymentMethod === "onsite"
      ? "Rezervacija sukurta, uzstatas uzfiksuotas."
      : "Rezervacija ir apmokejimas patvirtinti.";

  persistState();
  renderAll();

  window.setTimeout(() => {
    closeDialog(refs.bookingModal);
  }, 1100);
}

function loginAs(role) {
  if (!profiles[role]) {
    return;
  }

  state.currentUserRole = role;
  state.workspace = role;
  state.activities = [
    {
      id: makeId("activity"),
      title: `Prisijungta kaip ${formatRoleLabel(role)}`,
      meta: `${profiles[role].name} atidare ${formatRoleLabel(role)} darbo zona.`,
      tone: "info",
      createdAt: new Date().toISOString(),
    },
    ...state.activities,
  ].slice(0, 10);

  persistState();
  renderAll();
  closeDialog(refs.authModal);
}

function logout() {
  state.currentUserRole = null;
  state.workspace = "customer";
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
  closeDialog(refs.authModal);
}

function openBooking(salonId, serviceId = "", selectedTime = "") {
  state.bookingDraft = createBookingDraft(salonId, serviceId, selectedTime);
  state.bookingStep = selectedTime ? 2 : 1;
  refs.bookingMessage.textContent = "";
  renderBookingFlow();
  openDialog(refs.bookingModal);
}

function renderAll() {
  syncControls();
  renderHeroTotals();
  renderSalons();
  renderWorkspace();
  renderSideRail();
  renderSessionLabel();
  renderActiveStates();
  if (state.bookingDraft) {
    renderBookingFlow();
  }
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
  const selectedSpecialist = getSelectedSalonSpecialist(salon);

  return `
    <article class="salon-card reveal" style="animation-delay:${Math.min(index * 80, 320)}ms">
      <div class="salon-main">
        <div class="salon-head">
          <div>
            <p class="salon-city">${salon.city} | ${salon.neighborhood}</p>
            <h3 class="salon-name">${salon.name}</h3>
          </div>
          <span class="status-pill ${salon.instant ? "" : "status-pill-soft"}">${
            salon.instant ? "Momentinis" : "Patvirtina per 30 min."
          }</span>
        </div>

        <p class="salon-meta">${salon.rating.toFixed(1)} * | ${salon.reviews} atsiliepimai | nuo ${
          salon.priceFrom
        } EUR</p>
        <p class="salon-description">${salon.description}</p>

        <div class="feature-tags">
          ${salon.features.map((feature) => `<span class="feature-tag">${feature}</span>`).join("")}
        </div>

        <div class="specialist-selector">
          <p class="status-label">Pasirink meistra</p>
          <div class="specialist-picker">
            ${salon.specialists
              .map((specialist) => {
                const isActive = specialist.id === selectedSpecialist.id;
                return `
                  <button
                    type="button"
                    class="specialist-option ${isActive ? "active" : ""}"
                    data-select-specialist
                    data-salon-specialist="${salon.id}"
                    data-specialist-id="${specialist.id}"
                  >
                    <span>${specialist.name}</span>
                    <small>${specialist.role}</small>
                  </button>
                `;
              })
              .join("")}
          </div>
        </div>

        <div class="service-list">
          ${topServices
            .map((service) => {
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
            })
            .join("")}
        </div>
      </div>

      <div class="salon-side">
        <article class="specialist-spotlight">
          <img
            class="specialist-spotlight-avatar"
            src="${selectedSpecialist.photo}"
            alt="${selectedSpecialist.name}"
            loading="lazy"
            referrerpolicy="no-referrer"
          />
          <div class="specialist-spotlight-copy">
            <small class="muted">Pasirinktas meistras</small>
            <strong>${selectedSpecialist.name}</strong>
            <span class="specialist-role">${selectedSpecialist.role}</span>
            <p>${selectedSpecialist.bio}</p>
          </div>
        </article>

        <div class="booking-summary-card">
          <div class="list-row">
            <strong>${salon.occupancy}%</strong>
            <span class="muted">dienos uzimtumas</span>
          </div>
          <div class="list-row">
            <strong>${salon.repeatRate}%</strong>
            <span class="muted">griztantys klientai</span>
          </div>
        </div>

        <div>
          <p class="status-label">${formatDateLabel(activeDate)} laisvi laikai</p>
          <div class="slot-list">
            ${nextSlots
              .map((slot) => {
                return `
                  <button
                    type="button"
                    class="slot-chip"
                    data-open-booking
                    data-salon-id="${salon.id}"
                    data-service-id="${topServices[0].id}"
                    data-slot-time="${slot}"
                  >
                    ${slot}
                  </button>
                `;
              })
              .join("")}
          </div>
        </div>

        <div class="salon-actions">
          <button class="primary-button" type="button" data-open-booking data-salon-id="${salon.id}">
            Rezervuoti
          </button>
          <button class="ghost-button" type="button" data-switch-workspace="salon">
            Atidaryti panele
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderSalons() {
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
      "Paskyroje matysi artimiausius vizitus, mokejimus, islaidas ir pakartotines rezervacijas.",
      "Atidaryti paskyra"
    );
  }

  const customer = profiles.customer;
  const bookings = getCustomerBookings(customer);
  const payments = getCustomerPayments(customer);

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
          <strong>${bookings.length}</strong>
          <span>aktyvios rezervacijos</span>
        </article>
        <article class="stat-card">
          <strong>${sumAmounts(payments)} EUR</strong>
          <span>isleista per paskyra</span>
        </article>
        <article class="stat-card">
          <strong>${customer.favoriteSalons.length}</strong>
          <span>issaugoti salonai</span>
        </article>
      </div>

      <div class="panel-grid">
        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Artimiausi vizitai</p>
              <h4>Rezervaciju sarasas</h4>
            </div>
          </div>
          <div class="list-stack">
            ${bookings.length ? bookings.map(renderBookingRow).join("") : `<p>Nera artimiausiu rezervaciju.</p>`}
          </div>
        </article>

        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Greiti veiksmai</p>
              <h4>Kita rezervacija</h4>
            </div>
          </div>
          <div class="list-stack">
            <div class="service-row">
              <span>
                <strong>Pakartoti paskutine paslauga</strong><br />
                <small class="muted">Balayage pas Luna Beauty House</small>
              </span>
              <button class="ghost-button" type="button" data-open-booking data-salon-id="luna" data-service-id="balayage">
                Kartoti
              </button>
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
          </div>
        </article>
      </div>

      <div class="panel-grid">
        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Mokejimu istorija</p>
              <h4>Paskutiniai atsiskaitymai</h4>
            </div>
          </div>
          <div class="payments-list">
            ${payments.length ? payments.map(renderPaymentRow).join("") : `<p>Nera mokejimu istorijos.</p>`}
          </div>
        </article>

        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Lojalumas</p>
              <h4>Kas paskatina grizti</h4>
            </div>
          </div>
          <div class="bar-list">
            <div class="bar-row">
              <div class="list-row"><span>Kreditu panaudojimas</span><strong>72%</strong></div>
              <div class="bar-track"><div class="bar-fill" style="width:72%"></div></div>
            </div>
            <div class="bar-row">
              <div class="list-row"><span>Rezervacijos po 18:00</span><strong>48%</strong></div>
              <div class="bar-track"><div class="bar-fill" style="width:48%"></div></div>
            </div>
            <div class="bar-row">
              <div class="list-row"><span>Push priminimu atidarymai</span><strong>83%</strong></div>
              <div class="bar-track"><div class="bar-fill" style="width:83%"></div></div>
            </div>
          </div>
        </article>
      </div>
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

  const manager = profiles.salon;
  const salon = getSalon(manager.salonId);
  const salonBookings = getSalonBookings(salon.id);
  const todaysBookings = salonBookings.filter((booking) => booking.date === upcomingDates[0]);
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
          <strong>${sumAmounts(salonPayments)} EUR</strong>
          <span>surinkta per demo</span>
        </article>
        <article class="stat-card">
          <strong>${salon.repeatRate}%</strong>
          <span>griztantys klientai</span>
        </article>
      </div>

      <div class="panel-grid">
        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Tvarkarastis</p>
              <h4>${formatDateLabel(upcomingDates[0])}</h4>
            </div>
          </div>
          <div class="list-stack">
            ${todaysBookings.length ? todaysBookings.map(renderBookingRow).join("") : `<p>Siandien dar yra laisvu langu.</p>`}
          </div>
        </article>

        <article class="panel-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Komandos apkrova</p>
              <h4>Specialistai</h4>
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
              <p class="eyebrow">Veiksmai</p>
              <h4>Laisvu langu uzpildymas</h4>
            </div>
          </div>
          <div class="list-stack">
            <div class="service-row">
              <span>
                <strong>Akcija 14:15 langui</strong><br />
                <small class="muted">Pasiulyk -10% push auditorijai netoliese.</small>
              </span>
              <span class="status-chip info">Rekomenduojama</span>
            </div>
            <div class="service-row">
              <span>
                <strong>Pakartotiniu klienciu srautas</strong><br />
                <small class="muted">Issiusti "book again" pasiulyma 47 klientei.</small>
              </span>
              <span class="status-chip">Paruosta</span>
            </div>
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
  refs.sessionCard.innerHTML = currentUser
    ? `
      <div class="list-stack">
        <div class="service-row">
          <span>
            <strong>${currentUser.name}</strong><br />
            <small class="muted">${formatRoleLabel(currentUser.role)}</small>
          </span>
          <span class="status-chip">${currentUser.role}</span>
        </div>
        <div class="list-row">
          <span class="muted">${currentUser.email}</span>
          <button class="ghost-button" type="button" data-logout>Atsijungti</button>
        </div>
      </div>
    `
    : `
      <div class="list-stack">
        <p>Aktyvi sesija dar nepasirinkta.</p>
        <button class="primary-button" type="button" data-open-auth>Pasirinkti role</button>
      </div>
    `;

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
          <small class="muted">bendra mokejimu suma</small>
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
}

function renderActiveStates() {
  refs.serviceFilters.forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-service-filter") === state.filters.category);
  });

  refs.cityFilters.forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-city-filter") === state.filters.city);
  });

  refs.workspaceTabs.forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-switch-workspace") === state.workspace);
  });
}

function renderBookingFlow() {
  if (!state.bookingDraft) {
    return;
  }

  const salon = getSalon(state.bookingDraft.salonId);
  const service = getService(salon, state.bookingDraft.serviceId);
  const specialist = getSpecialist(salon, state.bookingDraft.specialistId);

  refs.bookingTitle.textContent = `Rezervuok ${salon.name}`;
  refs.bookingSubtitle.textContent = `${salon.city} | ${salon.category} | nuo ${salon.priceFrom} EUR`;

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

  const availableSlots = getAvailableSlots(salon.id, state.bookingDraft.date);
  if (!availableSlots.includes(state.bookingDraft.time)) {
    state.bookingDraft.time = "";
  }

  refs.bookingSlotGrid.innerHTML = availableSlots.length
    ? availableSlots
        .map((slot) => {
          return `
            <button
              type="button"
              class="slot-button ${state.bookingDraft.time === slot ? "active" : ""}"
              data-slot-select="${slot}"
            >
              ${slot}
            </button>
          `;
        })
        .join("")
    : `<p class="muted">Siai dienai laisvu laiku nebeliko.</p>`;

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
          <small class="muted">${service.duration} min. | ${specialist.name}</small>
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
          <small class="muted">${salon.city}, ${salon.neighborhood}</small>
        </span>
        <span class="status-chip">${salon.instant ? "Momentinis" : "Manual"}</span>
      </div>
    </div>
  `;

  refs.bookingSummary.innerHTML = `
    <div class="booking-summary-lines">
      <div class="list-row"><span>Paslauga</span><strong>${service.name}</strong></div>
      <div class="list-row"><span>Specialistas</span><strong>${specialist.name}</strong></div>
      <div class="list-row"><span>Data ir laikas</span><strong>${
        state.bookingDraft.time ? `${formatDateLabel(state.bookingDraft.date)} ${state.bookingDraft.time}` : "Dar nepasirinkta"
      }</strong></div>
      <div class="list-row"><span>Klientas</span><strong>${state.bookingDraft.customerName || "-"}</strong></div>
      <div class="list-row"><span>Mokejimas</span><strong>${formatPaymentLabel(state.bookingDraft.paymentMethod)}</strong></div>
      <div class="list-row"><span>Suma dabar</span><strong>${
        state.bookingDraft.paymentMethod === "onsite" ? Math.round(service.price * 0.2) : service.price
      } EUR</strong></div>
      <div class="list-row"><span>Visa paslaugos kaina</span><strong>${service.price} EUR</strong></div>
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
      ? state.bookingDraft.paymentMethod === "onsite"
        ? "Patvirtinti rezervacija"
        : "Patvirtinti ir apmoketi"
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
        <button class="primary-button" type="button" data-open-auth>${buttonLabel}</button>
        <button class="ghost-button" type="button" data-open-booking data-salon-id="luna">Perziureti booking flow</button>
      </div>
    </section>
  `;
}

function renderBookingRow(booking) {
  const statusClass =
    booking.status === "Uzstatas" ? "warning" : booking.status === "Patvirtinta" ? "" : "info";

  return `
    <div class="booking-row">
      <div class="booking-row-meta">
        <strong>${booking.salonName}</strong>
        <span class="muted">${booking.serviceName} su ${booking.specialistName}</span>
        <span class="muted">${formatDateLabel(booking.date)} ${booking.time}</span>
      </div>
      <span class="status-chip ${statusClass}">${booking.status}</span>
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
    .filter((booking) => booking.customerEmail === customer.email || booking.customerId === customer.id)
    .sort(sortBookings);
}

function getCustomerPayments(customer) {
  const bookingIds = getCustomerBookings(customer).map((booking) => booking.id);
  return state.payments.filter((payment) => bookingIds.includes(payment.bookingId));
}

function getSalonBookings(salonId) {
  return state.bookings.filter((booking) => booking.salonId === salonId).sort(sortBookings);
}

function getCityBookingCounts() {
  return state.bookings.reduce((accumulator, booking) => {
    const salon = getSalon(booking.salonId);
    accumulator[salon.city] = (accumulator[salon.city] || 0) + 1;
    return accumulator;
  }, {});
}

function getAvailableSlots(salonId, date) {
  const salon = getSalon(salonId);
  const reserved = new Set(
    state.bookings
      .filter((booking) => booking.salonId === salonId && booking.date === date)
      .map((booking) => booking.time)
  );

  return salon.baseSlots.filter((slot) => !reserved.has(slot));
}

function createBookingDraft(salonId, serviceId, selectedTime) {
  const salon = getSalon(salonId);
  const chosenService = getService(salon, serviceId) || salon.services[0];
  const chosenSpecialist = salon.specialists[0];
  const chosenDate = getActiveResultsDate();
  const availableSlots = getAvailableSlots(salon.id, chosenDate);

  return {
    salonId: salon.id,
    serviceId: chosenService.id,
    specialistId: chosenSpecialist.id,
    date: chosenDate,
    time: selectedTime && availableSlots.includes(selectedTime) ? selectedTime : "",
    paymentMethod: "card",
    customerName: profiles.customer.name,
    customerPhone: profiles.customer.phone,
    customerEmail: profiles.customer.email,
    notes: "",
  };
}

function populateDateFilterOptions() {
  refs.dateSelect.innerHTML = `
    <option value="any">Data nesvarbu</option>
    ${upcomingDates
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

function getCurrentUser() {
  return state.currentUserRole ? profiles[state.currentUserRole] : null;
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
    bookings: state.bookings,
    payments: state.payments,
    activities: state.activities,
    selectedSpecialists: state.selectedSpecialists,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
}

function loadState() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return cloneState(defaultState);
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      ...cloneState(defaultState),
      ...parsed,
      filters: {
        ...defaultState.filters,
        ...(parsed.filters || {}),
      },
    };
  } catch (error) {
    return cloneState(defaultState);
  }
}

function cloneState(source) {
  return JSON.parse(JSON.stringify(source));
}

function formatDateLabel(dateString) {
  const date = new Date(dateString);
  const monthNames = ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rgp", "Rgs", "Spa", "Lap", "Gru"];
  return `${date.getDate()} ${monthNames[date.getMonth()]}`;
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

function sortBookings(left, right) {
  const leftStamp = new Date(`${left.date}T${left.time}:00`).getTime();
  const rightStamp = new Date(`${right.date}T${right.time}:00`).getTime();
  return leftStamp - rightStamp;
}

function toIsoDate(date) {
  return date.toISOString().split("T")[0];
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 100000)}`;
}
