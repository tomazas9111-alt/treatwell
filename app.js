const salons = [
  {
    id: "luna",
    name: "Luna Beauty House",
    city: "Vilnius",
    category: "Plaukai",
    rating: 4.9,
    reviews: 1284,
    priceFrom: 25,
    instant: true,
    description:
      "Modernus miesto salonas su stipria plauku spalvos, kirpimo ir express beauty ritualu komanda.",
    services: ["Balayage", "Moteriskas kirpimas", "Express manikiuras"],
    slots: ["10:30", "12:00", "14:15", "17:00"],
  },
  {
    id: "amber",
    name: "Amber Skin Studio",
    city: "Kaunas",
    category: "Veidas",
    rating: 4.8,
    reviews: 842,
    priceFrom: 32,
    instant: true,
    description:
      "Veido proceduru studija, orientuota i odos diagnostika, glow efekta ir antakiu dizaina.",
    services: ["Veido valymas", "Hydra glow", "Antakiu laminavimas"],
    slots: ["11:00", "13:45", "16:00"],
  },
  {
    id: "aura",
    name: "Aura Nail Loft",
    city: "Vilnius",
    category: "Nagai",
    rating: 4.7,
    reviews: 611,
    priceFrom: 18,
    instant: false,
    description:
      "Stilinga nagu studija centre, kur klientes renkasi del precizisko gelinio lakavimo ir dizainu.",
    services: ["Gelinis lakavimas", "Japoniskas manikiuras", "Pedikiuras"],
    slots: ["09:45", "15:30", "18:20"],
  },
  {
    id: "calm",
    name: "Calm Ritual Spa",
    city: "Klaipeda",
    category: "Masazai",
    rating: 4.9,
    reviews: 506,
    priceFrom: 39,
    instant: true,
    description:
      "Pajurio spa erdve su poru ritualais, sportiniais masazais ir vakariniais atsipalaidavimo seansais.",
    services: ["Atpalaiduojantis masazas", "Poru ritualas", "Nugaros terapija"],
    slots: ["12:30", "14:00", "19:00"],
  },
  {
    id: "atelier",
    name: "Atelier 27",
    city: "Kaunas",
    category: "Plaukai",
    rating: 4.6,
    reviews: 390,
    priceFrom: 22,
    instant: false,
    description:
      "Butikinis salonas su personalizuotomis konsultacijomis, dazymo paketais ir proginemis sukuosenomis.",
    services: ["Airtouch", "Kirpimas + atstatymas", "Sukuosena"],
    slots: ["10:00", "13:15", "17:40"],
  },
  {
    id: "nord",
    name: "Nord Brow & Lash",
    city: "Vilnius",
    category: "Veidas",
    rating: 4.9,
    reviews: 734,
    priceFrom: 20,
    instant: true,
    description:
      "Minimalistine studija antakiu, blakstienu ir greitu veido proceduru rezervacijoms po darbo.",
    services: ["Antakiu korekcija", "Blakstienu laminavimas", "Mini veido ritualas"],
    slots: ["08:40", "11:50", "18:10"],
  },
];

const state = {
  query: "",
  city: "all",
  category: "all",
  sort: "recommended",
  instantOnly: false,
  bookingSalonId: "luna",
};

const salonList = document.querySelector("#salon-list");
const resultsSummary = document.querySelector("#results-summary");
const searchForm = document.querySelector("#search-form");
const queryInput = document.querySelector("#query-input");
const citySelect = document.querySelector("#city-select");
const categorySelect = document.querySelector("#category-select");
const sortSelect = document.querySelector("#sort-select");
const instantOnlyCheckbox = document.querySelector("#instant-only");
const serviceCards = document.querySelectorAll("[data-service-filter]");
const cityPills = document.querySelectorAll("[data-city-filter]");
const bookingModal = document.querySelector("#booking-modal");
const bookingTitle = document.querySelector("#booking-title");
const bookingSubtitle = document.querySelector("#booking-subtitle");
const bookingDate = document.querySelector("#booking-date");
const bookingTime = document.querySelector("#booking-time");
const bookingMessage = document.querySelector("#booking-message");
const bookingSubmit = document.querySelector("#booking-submit");

const today = new Date();
bookingDate.min = today.toISOString().split("T")[0];
bookingDate.value = bookingDate.min;

function filterSalons() {
  const query = state.query.trim().toLowerCase();

  let filtered = salons.filter((salon) => {
    const inCity = state.city === "all" || salon.city === state.city;
    const inCategory = state.category === "all" || salon.category === state.category;
    const instantMatch = !state.instantOnly || salon.instant;
    const queryMatch =
      !query ||
      salon.name.toLowerCase().includes(query) ||
      salon.description.toLowerCase().includes(query) ||
      salon.services.some((service) => service.toLowerCase().includes(query));

    return inCity && inCategory && instantMatch && queryMatch;
  });

  filtered = filtered.sort((a, b) => {
    if (state.sort === "rating") {
      return b.rating - a.rating || b.reviews - a.reviews;
    }

    if (state.sort === "price-low") {
      return a.priceFrom - b.priceFrom || b.rating - a.rating;
    }

    const recommendedA = a.rating * 100 + a.reviews + (a.instant ? 70 : 0) - a.priceFrom;
    const recommendedB = b.rating * 100 + b.reviews + (b.instant ? 70 : 0) - b.priceFrom;
    return recommendedB - recommendedA;
  });

  return filtered;
}

function renderSalons() {
  const template = document.querySelector("#salon-card-template");
  const filtered = filterSalons();

  salonList.innerHTML = "";
  resultsSummary.textContent = `Rodomi ${filtered.length} salonai`;

  if (!filtered.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state reveal";
    emptyState.innerHTML = `
      <h3>Neradome tikslaus atitikmens</h3>
      <p>Pabandyk pakeisti miesta, paslaugos tipa arba isjungti momentinio patvirtinimo filtra.</p>
    `;
    salonList.appendChild(emptyState);
    return;
  }

  filtered.forEach((salon, index) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".salon-card");

    card.style.animationDelay = `${Math.min(index * 80, 280)}ms`;
    fragment.querySelector(".salon-city").textContent = salon.city;
    fragment.querySelector(".salon-name").textContent = salon.name;
    fragment.querySelector(
      ".salon-meta"
    ).textContent = `${salon.rating.toFixed(1)} * | ${salon.reviews} atsiliepimai | ${
      salon.instant ? "momentinis patvirtinimas" : "patvirtinimas per 30 min."
    }`;
    fragment.querySelector(".salon-description").textContent = salon.description;
    fragment.querySelector(".salon-price").textContent = `${salon.priceFrom} EUR`;

    const badge = fragment.querySelector(".instant-badge");
    if (!salon.instant) {
      badge.textContent = "Patvirtinimas per 30 min.";
      badge.classList.remove("instant-badge");
      badge.classList.add("service-tag");
    }

    const tagHolder = fragment.querySelector(".service-tags");
    salon.services.forEach((service) => {
      const tag = document.createElement("span");
      tag.className = "service-tag";
      tag.textContent = service;
      tagHolder.appendChild(tag);
    });

    const slotHolder = fragment.querySelector(".slot-list");
    salon.slots.slice(0, 3).forEach((slot) => {
      const slotChip = document.createElement("button");
      slotChip.type = "button";
      slotChip.className = "slot-chip";
      slotChip.textContent = slot;
      slotChip.addEventListener("click", () => openBooking(salon.id, slot));
      slotHolder.appendChild(slotChip);
    });

    const bookButton = fragment.querySelector(".book-button");
    bookButton.addEventListener("click", () => openBooking(salon.id));

    salonList.appendChild(fragment);
  });
}

function setActiveButtons(collection, attr, value) {
  collection.forEach((button) => {
    const isActive = button.getAttribute(attr) === value;
    button.classList.toggle("active", isActive);
  });
}

function populateTimeOptions(salon, selectedTime = "") {
  bookingTime.innerHTML = '<option value="">Pasirink laika</option>';

  salon.slots.forEach((slot) => {
    const option = document.createElement("option");
    option.value = slot;
    option.textContent = slot;
    bookingTime.appendChild(option);
  });

  if (selectedTime && salon.slots.includes(selectedTime)) {
    bookingTime.value = selectedTime;
  }
}

function openBooking(salonId = state.bookingSalonId, selectedTime = "") {
  const salon = salons.find((item) => item.id === salonId) || salons[0];
  state.bookingSalonId = salon.id;

  bookingTitle.textContent = `Rezervuok ${salon.name}`;
  bookingSubtitle.textContent = `${salon.city} | ${salon.category} | nuo ${salon.priceFrom} EUR`;
  bookingMessage.textContent = "";
  populateTimeOptions(salon, selectedTime);

  if (typeof bookingModal.showModal === "function" && !bookingModal.open) {
    bookingModal.showModal();
  } else if (!bookingModal.open) {
    bookingModal.setAttribute("open", "open");
  }
}

function closeBooking() {
  if (bookingModal.open && typeof bookingModal.close === "function") {
    bookingModal.close();
  } else {
    bookingModal.removeAttribute("open");
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = queryInput.value;
  state.city = citySelect.value;
  state.category = categorySelect.value;
  setActiveButtons(serviceCards, "data-service-filter", state.category);
  setActiveButtons(cityPills, "data-city-filter", state.city);
  renderSalons();
});

sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  renderSalons();
});

instantOnlyCheckbox.addEventListener("change", () => {
  state.instantOnly = instantOnlyCheckbox.checked;
  renderSalons();
});

serviceCards.forEach((button) => {
  button.addEventListener("click", () => {
    state.category = button.getAttribute("data-service-filter");
    categorySelect.value = state.category;
    setActiveButtons(serviceCards, "data-service-filter", state.category);
    renderSalons();
  });
});

cityPills.forEach((button) => {
  button.addEventListener("click", () => {
    state.city = button.getAttribute("data-city-filter");
    citySelect.value = state.city;
    setActiveButtons(cityPills, "data-city-filter", state.city);
    renderSalons();
  });
});

document.querySelectorAll("[data-open-booking]").forEach((button) => {
  button.addEventListener("click", () => openBooking());
});

document.querySelectorAll("[data-salon-id]").forEach((button) => {
  button.addEventListener("click", () => {
    const salonId = button.getAttribute("data-salon-id");
    openBooking(salonId);
  });
});

bookingSubmit.addEventListener("click", () => {
  const name = document.querySelector("#booking-name").value.trim();
  const phone = document.querySelector("#booking-phone").value.trim();
  const date = bookingDate.value;
  const time = bookingTime.value;
  const salon = salons.find((item) => item.id === state.bookingSalonId);

  if (!name || !phone || !date || !time || !salon) {
    bookingMessage.textContent = "Uzpildyk varda, telefona, data ir laika.";
    return;
  }

  bookingMessage.textContent = `Rezervacija sukurta: ${salon.name}, ${date} ${time}.`;

  window.setTimeout(() => {
    closeBooking();
  }, 1200);
});

bookingModal.addEventListener("click", (event) => {
  if (event.target === bookingModal) {
    closeBooking();
  }
});

renderSalons();
