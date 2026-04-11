/**
 * WanderLens — script.js
 * Full-featured tourism discovery app
 * Features: Geolocation, Leaflet maps, Filters, Chatbot, Trip Planner, Favorites, Weather, Dark Mode
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   DATA — Rich curated place dataset
═══════════════════════════════════════════════════════════════ */

const PLACES_DB = [
  // ── Uttarakhand / Haridwar region (default/demo area) ──
  {
    id: 1,
    name: "Har Ki Pauri",
    category: "religious",
    tags: ["temples", "meditation", "heritage"],
    desc: "Sacred ghat on the Ganges where the holy river enters the plains. Witness the mesmerising Ganga Aarti every evening — thousands of oil lamps float downstream in a ritual that has continued for centuries.",
    lat: 29.9457, lng: 78.1642,
    distKm: 0.8,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1626015366386-89392b4f4e4f?w=600&q=80",
    longDesc: "One of India's most sacred ghats, Har Ki Pauri draws pilgrims from across the subcontinent. The evening Ganga Aarti is a UNESCO-recognised cultural event where priests perform elaborate fire rituals on the riverbank.",
  },
  {
    id: 2,
    name: "Rajaji National Park",
    category: "nature",
    tags: ["wildlife", "trekking", "camping"],
    desc: "A biodiversity hotspot stretching across the Shivalik hills. Home to wild elephants, leopards, tigers, and over 400 bird species. A paradise for wildlife photographers.",
    lat: 29.9640, lng: 78.2283,
    distKm: 12.3,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=600&q=80",
    longDesc: "Rajaji spans 820 sq km and is one of northern India's finest wilderness areas. Jeep safaris and elephant-back rides are popular ways to explore the dense sal forests.",
  },
  {
    id: 3,
    name: "Chilla Adventure Zone",
    category: "adventure",
    tags: ["trekking", "camping", "wildlife"],
    desc: "White-water rafting, jungle trails, and zip-lining against a stunning Himalayan backdrop. The Chilla range offers Grade III–IV rapids perfect for adrenaline seekers.",
    lat: 29.9870, lng: 78.2100,
    distKm: 9.5,
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=600&q=80",
    longDesc: "A hub for outdoor adventure sports in the Haridwar region. Rafting on the Ganges through the Chilla range is considered one of India's best beginner-to-intermediate rafting experiences.",
  },
  {
    id: 4,
    name: "Mansa Devi Temple",
    category: "religious",
    tags: ["temples", "heritage", "meditation"],
    desc: "Perched atop the Bilwa Parvat hill, this ancient Shakti temple is reached by cable car. The panoramic views of Haridwar and the Ganges are breathtaking.",
    lat: 29.9490, lng: 78.1720,
    distKm: 2.1,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=600&q=80",
    longDesc: "One of the Siddh Peethas (sacred seats of power) dedicated to Goddess Mansa Devi. The temple receives millions of visitors during the Navratri festivals.",
  },
  {
    id: 5,
    name: "Rishikesh Suspension Bridges",
    category: "adventure",
    tags: ["trekking", "heritage"],
    desc: "Ram Jhula and Lakshman Jhula — iconic hanging bridges across the Ganges offering spectacular views of the river, ghats, and Himalayan foothills.",
    lat: 30.0869, lng: 78.2676,
    distKm: 22.4,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1545622783-b3e021430fee?w=600&q=80",
    longDesc: "These iconic iron suspension bridges have become symbols of Rishikesh. Ram Jhula connects the towns of Shivananda Nagar and Swargashram.",
  },
  {
    id: 6,
    name: "Sapt Rishi Ashram",
    category: "religious",
    tags: ["meditation", "temples"],
    desc: "Where the seven great sages (Saptarishis) meditated so intensely, it's said the Ganges split into seven streams to avoid disturbing them. A deeply serene spiritual retreat.",
    lat: 29.9620, lng: 78.1580,
    distKm: 3.7,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1616430077505-5fa36e44af52?w=600&q=80",
    longDesc: "The ashram sits in a tranquil bend of the Ganges. It's one of the oldest continuously occupied spiritual centres in Haridwar, drawing seekers of all traditions.",
  },
  {
    id: 7,
    name: "Neel Dhara Pakshi Vihar",
    category: "nature",
    tags: ["wildlife", "lakes"],
    desc: "A bird sanctuary on the banks of the Ganges canal hosting migratory species from Siberia, Central Asia and beyond during winter months.",
    lat: 29.9380, lng: 78.1520,
    distKm: 5.2,
    rating: 4.3,
    img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
    longDesc: "The bird sanctuary is especially vibrant from November to February when thousands of migratory birds — including shovelers, teals, and cranes — arrive here.",
  },
  {
    id: 8,
    name: "Daksha Mahadev Temple",
    category: "historical",
    tags: ["heritage", "temples"],
    desc: "An ancient temple dedicated to Shiva, built on the site where King Daksha held the famous Yajna. One of the oldest temples in Haridwar with deep Puranic history.",
    lat: 29.9220, lng: 78.1490,
    distKm: 4.8,
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
    longDesc: "The temple complex commemorates the legendary episode from Hindu mythology where Sati immolated herself at her father Daksha's yajna. The current structure dates to the 19th century.",
  },
  {
    id: 9,
    name: "Patanjali Yogpeeth",
    category: "historical",
    tags: ["meditation", "heritage"],
    desc: "The world's largest yoga institute, sprawling over 100 acres. Features Vedic gardens, research labs, and a museum tracing the history of Ayurveda.",
    lat: 29.9640, lng: 78.1080,
    distKm: 6.9,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    longDesc: "Founded by Baba Ramdev, Patanjali Yogpeeth hosts thousands of visitors daily who come for yoga classes, Ayurvedic treatments, and spiritual discourses.",
  },
  {
    id: 10,
    name: "Sureshwari Devi Temple Trek",
    category: "adventure",
    tags: ["trekking", "temples"],
    desc: "A forested 6km trail ascending through Shivalik hills to a hilltop temple with panoramic views of the Doon Valley and Ganges plains.",
    lat: 29.9550, lng: 78.2400,
    distKm: 14.1,
    rating: 4.2,
    img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80",
    longDesc: "The trek through dense forest is rewarded with a beautiful temple and sweeping views. Best visited early morning for clear sightlines to the distant Himalayan peaks.",
  },
  {
    id: 11,
    name: "Kempty Falls",
    category: "nature",
    tags: ["waterfalls", "trekking"],
    desc: "A 40-metre cascade in the Mussoorie hills, surrounded by lush green forests. One of Uttarakhand's most visited natural waterfalls, ideal for a refreshing dip.",
    lat: 30.4500, lng: 78.0300,
    distKm: 60.2,
    rating: 4.1,
    img: "https://images.unsplash.com/photo-1467890947394-8171244e5410?w=600&q=80",
    longDesc: "Kempty Falls was developed as a picnic spot by British officer John Mekinon in 1835. 'Kempty' derives from 'Camp Tea', a resting place for British officers.",
  },
  {
    id: 12,
    name: "Asan Barrage Wetland",
    category: "nature",
    tags: ["wildlife", "lakes", "camping"],
    desc: "A Ramsar-recognised wetland where the Asan and Yamuna rivers converge. A critical wintering ground for thousands of migratory waterfowl every year.",
    lat: 30.4300, lng: 77.7200,
    distKm: 48.7,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    longDesc: "The Asan Conservation Reserve was India's first Ramsar site in Uttarakhand. Bird watching here is exceptional from October to March.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════════ */
let state = {
  userLat: 29.9457,   // default: Haridwar
  userLng: 78.1642,
  locationName: "Haridwar, Uttarakhand",
  activeFilter: "all",
  activeInterests: ["trekking"],
  favorites: JSON.parse(localStorage.getItem("wl_favorites") || "[]"),
  visibleCount: 6,
  map: null,
  markers: [],
  allPlaces: [],        // filtered + sorted list
  currentPlaceId: null, // for modal
  chatHistory: [],
};

/* ═══════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initParticles();
  initTheme();
  initNavScroll();
  initMobileMenu();
  initInterestTags();
  initFilters();
  initSearch();
  initMap();
  renderPlaces();
  renderFavorites();
  initModals();
  initChatbot();
  initScrollReveal();
  detectLocation(); // attempt geolocation
  lucide.createIcons();
});

/* ─── Loader ────────────────────────────────────────────────── */
function initLoader() {
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
      lucide.createIcons(); // re-run after DOM settle
    }, 1200);
  });
  // Fallback — hide after 3s no matter what
  setTimeout(() => loader.classList.add("hidden"), 3000);
}

/* ─── Hero Particles ────────────────────────────────────────── */
function initParticles() {
  const container = document.getElementById("heroParticles");
  if (!container) return;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 5 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      animation-duration:${8 + Math.random()*14}s;
      animation-delay:${Math.random()*10}s;
      opacity:${0.2 + Math.random()*0.4};
    `;
    container.appendChild(p);
  }
}

/* ─── Dark Mode ─────────────────────────────────────────────── */
function initTheme() {
  const savedTheme = localStorage.getItem("wl_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  document.getElementById("themeToggle").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("wl_theme", next);
    // Refresh icons
    setTimeout(() => lucide.createIcons(), 50);
  });
}

/* ─── Navbar Scroll ─────────────────────────────────────────── */
function initNavScroll() {
  const nav = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });
}

/* ─── Mobile Menu ───────────────────────────────────────────── */
function initMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mobileNav");
  btn.addEventListener("click", () => nav.classList.toggle("open"));
  // Close on link click
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}

/* ─── Geolocation ───────────────────────────────────────────── */
function detectLocation() {
  const badge = document.getElementById("locationBadge");
  if (!navigator.geolocation) {
    badge.textContent = "Location unavailable";
    return;
  }
  badge.textContent = "Detecting your location…";

  // Button in hero
  document.getElementById("detectLocationBtn").addEventListener("click", () => {
    badge.textContent = "Detecting…";
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, { timeout: 8000 });
  });

  // Auto-attempt
  navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, { timeout: 8000 });
}

function onGeoSuccess(pos) {
  state.userLat = pos.coords.latitude;
  state.userLng = pos.coords.longitude;

  // Reverse geocode with Nominatim (free, no key needed)
  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${state.userLat}&lon=${state.userLng}&format=json`)
    .then(r => r.json())
    .then(data => {
      const city = data.address.city || data.address.town || data.address.village || "Your Area";
      const state_name = data.address.state || "";
      state.locationName = `${city}${state_name ? ", " + state_name : ""}`;
      document.getElementById("locationBadge").textContent = state.locationName;

      // Recalculate distances
      recalcDistances();
      renderPlaces();
      updateMap();
      fetchWeather();
    })
    .catch(() => {
      document.getElementById("locationBadge").textContent = `${state.userLat.toFixed(3)}, ${state.userLng.toFixed(3)}`;
      recalcDistances();
      renderPlaces();
      updateMap();
    });
}

function onGeoError(err) {
  document.getElementById("locationBadge").textContent = "Using Haridwar (demo)";
  fetchWeather();
}

/* ─── Distance Calculation ──────────────────────────────────── */
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function recalcDistances() {
  PLACES_DB.forEach(p => {
    p.distKm = haversine(state.userLat, state.userLng, p.lat, p.lng);
  });
  PLACES_DB.sort((a, b) => a.distKm - b.distKm);
}

/* ─── Weather (Open-Meteo — free, no key) ───────────────────── */
function fetchWeather() {
  const strip = document.getElementById("weatherStrip");
  const text = document.getElementById("weatherText");
  const loc  = document.getElementById("weatherLocation");

  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${state.userLat}&longitude=${state.userLng}&current_weather=true&hourly=precipitation_probability&timezone=auto`)
    .then(r => r.json())
    .then(data => {
      if (!data.current_weather) return;
      const w = data.current_weather;
      const desc = getWeatherDesc(w.weathercode);
      const icon = getWeatherIcon(w.weathercode);
      text.innerHTML = `${icon} ${desc} · ${Math.round(w.temperature)}°C · Wind ${Math.round(w.windspeed)} km/h`;
      loc.textContent = state.locationName;
      strip.style.display = "block";
      lucide.createIcons();
    })
    .catch(() => { /* silently skip */ });
}

function getWeatherDesc(code) {
  const codes = { 0:"Clear sky", 1:"Mainly clear", 2:"Partly cloudy", 3:"Overcast", 45:"Foggy", 48:"Icy fog", 51:"Light drizzle", 61:"Slight rain", 63:"Moderate rain", 71:"Slight snow", 80:"Rain showers", 95:"Thunderstorm" };
  return codes[code] || codes[Math.floor(code/10)*10] || "Weather data";
}

function getWeatherIcon(code) {
  if (code === 0) return "☀️";
  if (code <= 2)  return "🌤️";
  if (code <= 3)  return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  return "⛈️";
}

/* ─── Interest Tags ─────────────────────────────────────────── */
function initInterestTags() {
  document.querySelectorAll(".tag").forEach(btn => {
    const interest = btn.dataset.interest;
    if (state.activeInterests.includes(interest)) btn.classList.add("active");

    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      if (state.activeInterests.includes(interest)) {
        state.activeInterests = state.activeInterests.filter(i => i !== interest);
      } else {
        state.activeInterests.push(interest);
      }
      renderPlaces();
    });
  });
}

/* ─── Category Filters ──────────────────────────────────────── */
function initFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeFilter = btn.dataset.cat;
      state.visibleCount = 6;
      renderPlaces();
    });
  });

  document.getElementById("loadMoreBtn").addEventListener("click", () => {
    state.visibleCount += 6;
    renderPlaces();
  });
}

/* ─── Search ─────────────────────────────────────────────────── */
function initSearch() {
  const input = document.getElementById("searchInput");
  const btn   = document.getElementById("searchBtn");
  const sugg  = document.getElementById("searchSuggestions");

  const allNames = PLACES_DB.map(p => p.name);

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { sugg.classList.remove("visible"); sugg.innerHTML = ""; return; }

    const matches = allNames.filter(n => n.toLowerCase().includes(q)).slice(0, 5);
    if (!matches.length) { sugg.classList.remove("visible"); return; }

    sugg.innerHTML = matches.map(m =>
      `<div class="suggestion-item" data-name="${m}">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        ${m}
      </div>`
    ).join("");
    sugg.classList.add("visible");
    lucide.createIcons();
  });

  sugg.addEventListener("click", (e) => {
    const item = e.target.closest(".suggestion-item");
    if (!item) return;
    input.value = item.dataset.name;
    sugg.classList.remove("visible");
    performSearch(item.dataset.name);
  });

  btn.addEventListener("click", () => performSearch(input.value.trim()));
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") performSearch(input.value.trim()); });

  // Close suggestions on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".hero-search-wrap")) sugg.classList.remove("visible");
  });
}

function performSearch(query) {
  if (!query) return;
  const q = query.toLowerCase();

  // Highlight matching places
  const match = PLACES_DB.find(p => p.name.toLowerCase().includes(q));
  if (match) {
    // Reset filter
    state.activeFilter = "all";
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.toggle("active", b.dataset.cat === "all"));
    renderPlaces();

    // Scroll to discover and open modal
    document.getElementById("discover").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => openPlaceModal(match), 700);

    // Pan map
    if (state.map) {
      state.map.setView([match.lat, match.lng], 13, { animate: true });
    }
  } else {
    showToast(`No results for "${query}"`);
  }
}

/* ─── Render Places ─────────────────────────────────────────── */
function getFilteredPlaces() {
  return PLACES_DB.filter(p => {
    const catOk = state.activeFilter === "all" || p.category === state.activeFilter;
    return catOk;
  });
}

function renderPlaces() {
  const grid = document.getElementById("placesGrid");
  const empty = document.getElementById("emptyState");
  const loadBtn = document.getElementById("loadMoreBtn");
  const filtered = getFilteredPlaces();

  grid.innerHTML = "";
  if (!filtered.length) {
    empty.style.display = "flex";
    loadBtn.style.display = "none";
    return;
  }
  empty.style.display = "none";

  // Sort: interest-matched first, then by distance
  const sorted = [...filtered].sort((a, b) => {
    const aMatch = a.tags.some(t => state.activeInterests.includes(t));
    const bMatch = b.tags.some(t => state.activeInterests.includes(t));
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return a.distKm - b.distKm;
  });

  const visible = sorted.slice(0, state.visibleCount);
  visible.forEach((place, i) => {
    const card = createPlaceCard(place, i);
    grid.appendChild(card);
  });

  loadBtn.style.display = sorted.length > state.visibleCount ? "flex" : "none";
  lucide.createIcons();
}

function createPlaceCard(place, index) {
  const isFav = state.favorites.includes(place.id);
  const div = document.createElement("div");
  div.className = "place-card reveal";
  div.style.animationDelay = `${index * 0.07}s`;
  div.dataset.id = place.id;

  const stars = "★".repeat(Math.round(place.rating)) + "☆".repeat(5 - Math.round(place.rating));

  div.innerHTML = `
    <div class="card-img-wrap">
      <img src="${place.img}" alt="${place.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'" />
      <span class="card-cat-badge cat-${place.category}">${capitalise(place.category)}</span>
      <button class="card-fav-btn ${isFav ? 'active' : ''}" data-id="${place.id}" title="Save to favourites">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </button>
    </div>
    <div class="card-body">
      <h3 class="card-title">${place.name}</h3>
      <p class="card-desc">${place.desc}</p>
      <div class="card-meta">
        <span class="card-dist">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${place.distKm < 1 ? (place.distKm * 1000).toFixed(0) + "m" : place.distKm.toFixed(1) + " km"}
        </span>
        <span class="card-rating" title="${place.rating}/5">⭐ ${place.rating.toFixed(1)}</span>
      </div>
      <button class="card-view-btn">
        View Details
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  `;

  // Fav toggle
  div.querySelector(".card-fav-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFavorite(place.id);
    renderPlaces();
    renderFavorites();
  });

  // View details
  div.querySelector(".card-view-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    openPlaceModal(place);
  });

  div.addEventListener("click", () => openPlaceModal(place));

  // Scroll-reveal hook
  setTimeout(() => {
    if (div.getBoundingClientRect().top < window.innerHeight + 100) div.classList.add("visible");
  }, 50);

  return div;
}

/* ─── Favorites ─────────────────────────────────────────────── */
function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter(i => i !== id);
    showToast("Removed from favourites");
  } else {
    state.favorites.push(id);
    showToast("Saved to favourites ♥");
  }
  localStorage.setItem("wl_favorites", JSON.stringify(state.favorites));
}

function renderFavorites() {
  const grid = document.getElementById("favGrid");
  const empty = document.getElementById("favEmpty");

  grid.innerHTML = "";
  if (!state.favorites.length) {
    grid.appendChild(empty);
    return;
  }

  const favPlaces = PLACES_DB.filter(p => state.favorites.includes(p.id));
  favPlaces.forEach((place, i) => {
    const card = createPlaceCard(place, i);
    grid.appendChild(card);
  });
  lucide.createIcons();
}

/* ─── Leaflet Map ────────────────────────────────────────────── */
function initMap() {
  state.map = L.map("leafletMap", {
    center: [state.userLat, state.userLng],
    zoom: 11,
    zoomControl: true,
  });

  // OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19,
  }).addTo(state.map);

  // User marker
  const userIcon = L.divIcon({
    html: `<div style="width:14px;height:14px;background:#1a90ff;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(26,144,255,0.6)"></div>`,
    className: "",
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
  L.marker([state.userLat, state.userLng], { icon: userIcon })
    .addTo(state.map)
    .bindPopup(`<div class="popup-name">📍 You are here</div><div class="popup-dist">${state.locationName}</div>`);

  updateMap();
}

function updateMap() {
  if (!state.map) return;

  // Clear old markers
  state.markers.forEach(m => m.remove());
  state.markers = [];

  const catColors = { nature: "#228B22", historical: "#8B5A2B", religious: "#782890", adventure: "#DC5014" };
  const catEmoji  = { nature: "🌿", historical: "🏛️", religious: "🕌", adventure: "⚡" };

  PLACES_DB.forEach(place => {
    const color = catColors[place.category] || "#0d6e6e";
    const emoji = catEmoji[place.category] || "📍";

    const icon = L.divIcon({
      html: `<div style="
        background:${color};
        color:white;
        border:2px solid white;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        width:32px; height:32px;
        display:flex; align-items:center; justify-content:center;
        box-shadow:0 3px 10px rgba(0,0,0,0.3);
        font-size:14px;
      "><span style="transform:rotate(45deg)">${emoji}</span></div>`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const dist = place.distKm < 1 ? (place.distKm * 1000).toFixed(0) + "m" : place.distKm.toFixed(1) + " km";
    const marker = L.marker([place.lat, place.lng], { icon })
      .addTo(state.map)
      .bindPopup(`
        <div class="popup-name">${place.name}</div>
        <div class="popup-dist">${capitalise(place.category)} · ${dist} away</div>
      `);

    marker.on("click", () => openPlaceModal(place));
    state.markers.push(marker);
  });

  // Pan to user
  state.map.setView([state.userLat, state.userLng], 11, { animate: true });
}

/* ─── Place Modal ────────────────────────────────────────────── */
function initModals() {
  // Place modal
  document.getElementById("modalClose").addEventListener("click", () => closeModal("placeModal"));
  document.getElementById("placeModal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("placeModal")) closeModal("placeModal");
  });

  // Trip modal
  document.getElementById("tripModalClose").addEventListener("click", () => closeModal("tripModal"));
  document.getElementById("tripModal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("tripModal")) closeModal("tripModal");
  });

  // Plan Trip button
  document.getElementById("planTripBtn").addEventListener("click", openTripPlanner);
  document.getElementById("copyItinerary").addEventListener("click", copyItinerary);
}

function openPlaceModal(place) {
  state.currentPlaceId = place.id;
  const isFav = state.favorites.includes(place.id);

  document.getElementById("modalImg").src = place.img;
  document.getElementById("modalImg").alt = place.name;
  document.getElementById("modalName").textContent = place.name;
  document.getElementById("modalCat").textContent = capitalise(place.category);
  document.getElementById("modalCat").className = `modal-cat-badge cat-${place.category}`;
  document.getElementById("modalCatText").textContent = capitalise(place.category);
  const dist = place.distKm < 1 ? (place.distKm * 1000).toFixed(0) + "m away" : place.distKm.toFixed(1) + " km away";
  document.getElementById("modalDist").textContent = dist;
  document.getElementById("modalDesc").textContent = place.longDesc || place.desc;

  // Tags
  const tagsDiv = document.getElementById("modalTags");
  tagsDiv.innerHTML = place.tags.map(t => `<span class="modal-tag">${t}</span>`).join("");

  // Save button
  const saveBtn = document.getElementById("modalSave");
  saveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> ${isFav ? "Saved ♥" : "Save Place"}`;
  saveBtn.onclick = () => {
    toggleFavorite(place.id);
    renderFavorites();
    renderPlaces();
    openPlaceModal(place); // refresh modal state
  };

  // Directions
  document.getElementById("modalDirections").onclick = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}&travelmode=driving`, "_blank");
  };

  openModal("placeModal");
}

function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
  document.body.style.overflow = "";
}

/* ─── Trip Planner ───────────────────────────────────────────── */
function openTripPlanner() {
  const filtered = getFilteredPlaces();
  const sorted = [...filtered]
    .sort((a, b) => {
      const aMatch = a.tags.some(t => state.activeInterests.includes(t));
      const bMatch = b.tags.some(t => state.activeInterests.includes(t));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return a.distKm - b.distKm;
    })
    .slice(0, 8);

  if (!sorted.length) { showToast("Add some places to plan a trip!"); return; }

  // Build 2-day itinerary
  const day1 = sorted.slice(0, Math.ceil(sorted.length / 2));
  const day2 = sorted.slice(Math.ceil(sorted.length / 2));

  document.getElementById("tripSubtitle").textContent = `Based on your interests: ${state.activeInterests.join(", ")} · ${sorted.length} stops`;

  const body = document.getElementById("tripBody");
  body.innerHTML = "";

  [day1, day2].forEach((dayPlaces, di) => {
    if (!dayPlaces.length) return;
    const dayDiv = document.createElement("div");
    dayDiv.className = "trip-day";
    const times = ["7:00 AM", "9:30 AM", "12:00 PM", "2:30 PM", "5:00 PM"];
    dayDiv.innerHTML = `
      <div class="trip-day-title">Day ${di + 1}</div>
      ${dayPlaces.map((p, i) => `
        <div class="trip-item">
          <span class="trip-time">${times[i] || "3:00 PM"}</span>
          <div>
            <div class="trip-place-name">${p.name}</div>
            <div class="trip-place-note">${capitalise(p.category)} · ${p.distKm.toFixed(1)} km · ⭐ ${p.rating}</div>
          </div>
        </div>
      `).join("")}
    `;
    body.appendChild(dayDiv);
  });

  openModal("tripModal");
  lucide.createIcons();
}

function copyItinerary() {
  const items = document.querySelectorAll(".trip-item");
  let text = "🗺️ WanderLens Trip Itinerary\n\n";
  let dayNum = 0;
  document.querySelectorAll(".trip-day").forEach((day, di) => {
    text += `── Day ${di + 1} ──\n`;
    day.querySelectorAll(".trip-item").forEach(item => {
      const time = item.querySelector(".trip-time").textContent;
      const name = item.querySelector(".trip-place-name").textContent;
      const note = item.querySelector(".trip-place-note").textContent;
      text += `${time}  ${name} (${note})\n`;
    });
    text += "\n";
  });

  navigator.clipboard.writeText(text)
    .then(() => showToast("Itinerary copied! 📋"))
    .catch(() => showToast("Couldn't copy — please try manually"));
}

/* ─── Chatbot ────────────────────────────────────────────────── */
function initChatbot() {
  const panel = document.getElementById("chatbotPanel");
  const fab   = document.getElementById("chatbotFab");

  // Toggle via FAB
  fab.addEventListener("click", () => {
    panel.classList.toggle("open");
    if (panel.classList.contains("open")) fab.style.display = "none";
  });

  document.getElementById("chatClose").addEventListener("click", () => {
    panel.classList.remove("open");
    fab.style.display = "flex";
  });

  // Also from navbar chat button
  document.getElementById("chatToggle").addEventListener("click", () => {
    panel.classList.add("open");
    fab.style.display = "none";
  });

  // Quick buttons
  document.querySelectorAll(".quick-btn").forEach(btn => {
    btn.addEventListener("click", () => sendChatMessage(btn.dataset.q));
  });

  // Send button & Enter key
  document.getElementById("sendChat").addEventListener("click", () => {
    const msg = document.getElementById("chatInput").value.trim();
    if (msg) sendChatMessage(msg);
  });
  document.getElementById("chatInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const msg = e.target.value.trim();
      if (msg) sendChatMessage(msg);
    }
  });
}

function sendChatMessage(message) {
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");

  // Clear input
  input.value = "";

  // Add user bubble
  appendChatMsg("user", message);

  // Add loading bubble
  const loadId = "load_" + Date.now();
  appendChatMsg("bot", "Thinking…", loadId, true);

  // Scroll to bottom
  messages.scrollTop = messages.scrollHeight;

  // Build context for the API
  const systemPrompt = `You are WanderBot, a friendly and knowledgeable travel assistant for WanderLens, a tourism discovery app. The user is currently in ${state.locationName}. 

Nearby places include: ${PLACES_DB.slice(0, 6).map(p => p.name + " (" + p.category + ")").join(", ")}.

The user's travel interests are: ${state.activeInterests.join(", ")}.

Keep responses concise (2-4 sentences), helpful, enthusiastic, and relevant to travel in this region. Suggest specific places from the list when relevant. Use emojis naturally. Never mention that you're an AI language model.`;

  // Call Anthropic API
  fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [
        ...state.chatHistory,
        { role: "user", content: message }
      ],
    }),
  })
    .then(r => r.json())
    .then(data => {
      const reply = data.content?.map(c => c.text || "").join("") || "Sorry, I couldn't get a response. Please try again!";

      // Update history
      state.chatHistory.push({ role: "user", content: message });
      state.chatHistory.push({ role: "assistant", content: reply });
      // Keep history manageable
      if (state.chatHistory.length > 20) state.chatHistory = state.chatHistory.slice(-20);

      // Replace loading bubble
      const loadBubble = document.getElementById(loadId);
      if (loadBubble) loadBubble.parentElement.remove();
      appendChatMsg("bot", reply);
      messages.scrollTop = messages.scrollHeight;
    })
    .catch(err => {
      const loadBubble = document.getElementById(loadId);
      if (loadBubble) loadBubble.parentElement.remove();
      appendChatMsg("bot", fallbackChatResponse(message));
      messages.scrollTop = messages.scrollHeight;
    });
}

function appendChatMsg(role, text, id = null, isLoading = false) {
  const messages = document.getElementById("chatMessages");
  const div = document.createElement("div");
  div.className = `chat-msg ${role}`;
  div.innerHTML = `<div class="msg-bubble ${isLoading ? 'loading' : ''}" ${id ? `id="${id}"` : ""}>${text}</div>`;
  messages.appendChild(div);
}

// Offline fallback responses
function fallbackChatResponse(msg) {
  const q = msg.toLowerCase();
  if (q.includes("near") || q.includes("places")) return `🗺️ Near ${state.locationName}, I'd recommend exploring ${PLACES_DB[0]?.name} and ${PLACES_DB[1]?.name}. Check out the Discover section for more!`;
  if (q.includes("itinerary") || q.includes("day")) return `📅 For a 2-day trip, start with ${PLACES_DB[0]?.name} in the morning, then ${PLACES_DB[1]?.name}. Click "Plan My Trip" for a full personalised itinerary!`;
  if (q.includes("weather") || q.includes("season")) return "☀️ The best time to visit this region is October–March for pleasant weather. Summers can be hot but great for water activities!";
  if (q.includes("food") || q.includes("eat") || q.includes("cuisine")) return "🍛 Don't miss local specialties — aloo puri at the ghats, fresh lassi from street stalls, and the famous Haridwar chaat. Many eateries near the riverside serve pure vegetarian food.";
  return `🌟 Great question! ${state.locationName} has so much to offer. Explore the filtered categories above or use the map to discover places matching your interests!`;
}

/* ─── Scroll Reveal ─────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  // Add reveal to section headers
  document.querySelectorAll(".section-header, .interest-tags, .filter-bar, .map-container").forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });

  // Re-run for dynamically added cards
  const mutObs = new MutationObserver(() => {
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
  });
  mutObs.observe(document.getElementById("placesGrid"), { childList: true });
  mutObs.observe(document.getElementById("favGrid"), { childList: true });
}

/* ─── Toast Notification ────────────────────────────────────── */
function showToast(message) {
  // Remove existing toast
  const existing = document.getElementById("wl-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "wl-toast";
  toast.textContent = message;
  toast.style.cssText = `
    position:fixed; bottom:80px; left:50%; transform:translateX(-50%) translateY(0);
    background:var(--teal); color:#fff;
    padding:10px 22px; border-radius:99px;
    font-size:0.88rem; font-weight:500;
    box-shadow:0 8px 24px rgba(0,0,0,0.2);
    z-index:9999;
    animation: toast-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
  `;

  const style = document.createElement("style");
  style.textContent = `
    @keyframes toast-in { from { opacity:0; transform:translateX(-50%) translateY(20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
    @keyframes toast-out { to { opacity:0; transform:translateX(-50%) translateY(20px); } }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "toast-out 0.3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* ─── Utility ────────────────────────────────────────────────── */
function capitalise(s) { return s.charAt(0).toUpperCase() + s.slice(1); }