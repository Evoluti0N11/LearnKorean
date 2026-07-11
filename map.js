/* ============================================================
   Carte littéraire de Paris — Leaflet + OpenStreetMap (gratuit)
   + API publique Wikipédia (gratuite, sans clé) pour les photos
   ============================================================ */

const PARIS_CENTER = [48.8566, 2.3522];
let leafletMap = null;
let fogCanvas = null;
let fogCtx = null;
let mapMarkers = {};
let fogRedrawQueued = false;

/* ---------------- Cache des résumés Wikipédia (persisté) ---------------- */
const WIKI_CACHE_KEY = "fq_wikicache_v1";
let wikiCache = {};
try { wikiCache = JSON.parse(localStorage.getItem(WIKI_CACHE_KEY) || "{}"); } catch (e) { wikiCache = {}; }
const wikiFetchInFlight = new Set();

function persistWikiCache() {
  try { localStorage.setItem(WIKI_CACHE_KEY, JSON.stringify(wikiCache)); } catch (e) {}
}

async function fetchWikiSummary(title) {
  if (wikiCache[title]) return wikiCache[title];
  if (wikiFetchInFlight.has(title)) return null;
  wikiFetchInFlight.add(title);
  try {
    const res = await fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
    if (!res.ok) throw new Error("bad-response");
    const json = await res.json();
    const data = {
      extract: json.extract || "",
      thumbnail: json.thumbnail || null,
      pageUrl: (json.content_urls && json.content_urls.desktop && json.content_urls.desktop.page) || null
    };
    wikiCache[title] = data;
    persistWikiCache();
    return data;
  } catch (e) {
    return null; // hors-ligne ou API indisponible : repli silencieux sur le contenu local
  } finally {
    wikiFetchInFlight.delete(title);
  }
}

function truncateText(str, max) {
  if (!str) return "";
  if (str.length <= max) return str;
  return str.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

/* ---------------- Progression : quels lieux sont débloqués ---------------- */
function getUnlockedLocationIds() {
  const set = new Set();
  PARIS_LOCATIONS.forEach(loc => { if (STATE.completedDays.includes(loc.day)) set.add(loc.id); });
  return set;
}

function locationForDay(day) {
  return PARIS_LOCATIONS.find(l => l.day === day) || null;
}

/* ---------------- Icônes personnalisées ---------------- */
function makeDivIcon(justUnlocked) {
  return L.divIcon({
    className: "",
    html: `<div class="lit-marker${justUnlocked ? " just-unlocked" : ""}"><span>📖</span></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -16]
  });
}

/* ---------------- Contenu des popups ---------------- */
function loadingPopupHTML(loc) {
  return `
    <div class="loc-popup">
      <div class="loc-photo placeholder"><span>📖</span></div>
      <div class="loc-popup-body">
        <span class="loc-arr">${loc.arrondissement} arr. · Jour ${loc.day}</span>
        <h4>${loc.name}</h4>
        <p class="loc-note">${loc.note}</p>
        <p class="loc-extract muted">Chargement d'une photo et d'un résumé (Wikipédia)…</p>
      </div>
    </div>`;
}

function fullPopupHTML(loc, wiki) {
  const img = wiki && wiki.thumbnail
    ? `<img class="loc-photo" src="${wiki.thumbnail.source}" alt="${loc.name}" loading="lazy">`
    : `<div class="loc-photo placeholder"><span>📖</span></div>`;
  const extract = wiki && wiki.extract ? `<p class="loc-extract">${truncateText(wiki.extract, 160)}</p>` : "";
  const link = (wiki && wiki.pageUrl) || `https://fr.wikipedia.org/wiki/${encodeURIComponent(loc.wikiTitle)}`;
  return `
    <div class="loc-popup">
      ${img}
      <div class="loc-popup-body">
        <span class="loc-arr">${loc.arrondissement} arr. · Jour ${loc.day}</span>
        <h4>${loc.name}</h4>
        <p class="loc-note">${loc.note}</p>
        ${extract}
        <a href="${link}" target="_blank" rel="noopener noreferrer" class="loc-link">En savoir plus sur Wikipédia →</a>
      </div>
    </div>`;
}

/* ---------------- Init / destroy de la carte ---------------- */
function destroyParisMap() {
  if (leafletMap) {
    try { leafletMap.remove(); } catch (e) {}
    leafletMap = null;
  }
  mapMarkers = {};
  fogCanvas = null;
  fogCtx = null;
}

function initParisMap() {
  const container = document.getElementById("paris-map");
  if (!container || typeof L === "undefined") return;
  destroyParisMap();

  leafletMap = L.map(container, {
    center: PARIS_CENTER,
    zoom: 12.3,
    minZoom: 11,
    maxZoom: 18,
    maxBounds: L.latLngBounds([48.79, 2.18], [48.93, 2.49]),
    maxBoundsViscosity: 0.75,
    zoomControl: false
  });

  L.control.zoom({ position: "bottomright" }).addTo(leafletMap);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
  }).addTo(leafletMap);

  fogCanvas = document.getElementById("fog-canvas");
  fogCtx = fogCanvas.getContext("2d");

  const unlocked = getUnlockedLocationIds();

  PARIS_LOCATIONS.forEach(loc => {
    if (!unlocked.has(loc.id)) return;
    const justUnlocked = ui.flyToLocationId === loc.id;
    const marker = L.marker([loc.lat, loc.lon], { icon: makeDivIcon(justUnlocked) }).addTo(leafletMap);
    marker.bindPopup(loadingPopupHTML(loc), { maxWidth: 260, className: "loc-popup-wrap" });
    marker.on("popupopen", async () => {
      const wiki = await fetchWikiSummary(loc.wikiTitle);
      marker.getPopup().setContent(fullPopupHTML(loc, wiki));
    });
    mapMarkers[loc.id] = marker;
  });

  leafletMap.on("move zoom resize", scheduleFogRedraw);
  leafletMap.on("click", (e) => handleMapClickOnLocked(e));

  setTimeout(() => {
    leafletMap && leafletMap.invalidateSize();
    redrawFog();
    if (ui.flyToLocationId) {
      const loc = PARIS_LOCATIONS.find(l => l.id === ui.flyToLocationId);
      if (loc) {
        leafletMap.flyTo([loc.lat, loc.lon], 15, { duration: 1.1 });
        leafletMap.once("moveend", () => {
          redrawFog();
          const m = mapMarkers[loc.id];
          if (m) setTimeout(() => m.openPopup(), 300);
        });
      }
      ui.flyToLocationId = null;
    }
  }, 60);
}

function scheduleFogRedraw() {
  if (fogRedrawQueued) return;
  fogRedrawQueued = true;
  requestAnimationFrame(() => { fogRedrawQueued = false; redrawFog(); });
}

function redrawFog() {
  if (!leafletMap || !fogCtx || !fogCanvas) return;
  const size = leafletMap.getSize();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  fogCanvas.width = size.x * dpr;
  fogCanvas.height = size.y * dpr;
  fogCanvas.style.width = size.x + "px";
  fogCanvas.style.height = size.y + "px";
  fogCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  fogCtx.clearRect(0, 0, size.x, size.y);

  fogCtx.fillStyle = "rgba(9,7,15,0.88)";
  fogCtx.fillRect(0, 0, size.x, size.y);

  const unlocked = getUnlockedLocationIds();
  fogCtx.globalCompositeOperation = "destination-out";
  PARIS_LOCATIONS.forEach(loc => {
    if (!unlocked.has(loc.id)) return;
    const pt = leafletMap.latLngToContainerPoint([loc.lat, loc.lon]);
    const r = 100;
    const grad = fogCtx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r);
    grad.addColorStop(0, "rgba(0,0,0,1)");
    grad.addColorStop(0.65, "rgba(0,0,0,0.95)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    fogCtx.fillStyle = grad;
    fogCtx.beginPath();
    fogCtx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
    fogCtx.fill();
  });
  fogCtx.globalCompositeOperation = "source-over";

  const size2 = size;
  PARIS_LOCATIONS.forEach(loc => {
    if (unlocked.has(loc.id)) return;
    const pt = leafletMap.latLngToContainerPoint([loc.lat, loc.lon]);
    if (pt.x < -20 || pt.y < -20 || pt.x > size2.x + 20 || pt.y > size2.y + 20) return;
    fogCtx.beginPath();
    fogCtx.arc(pt.x, pt.y, 10, 0, Math.PI * 2);
    fogCtx.fillStyle = "rgba(146,145,173,0.55)";
    fogCtx.fill();
    fogCtx.font = "11px sans-serif";
    fogCtx.textAlign = "center";
    fogCtx.textBaseline = "middle";
    fogCtx.fillText("🔒", pt.x, pt.y + 1);
  });
}

function handleMapClickOnLocked(e) {
  if (!leafletMap) return;
  const unlocked = getUnlockedLocationIds();
  const clickPt = e.containerPoint;
  for (const loc of PARIS_LOCATIONS) {
    if (unlocked.has(loc.id)) continue;
    const pt = leafletMap.latLngToContainerPoint([loc.lat, loc.lon]);
    const dist = Math.hypot(pt.x - clickPt.x, pt.y - clickPt.y);
    if (dist <= 14) { showMapToast(`🔒 « ${loc.name} » se débloque en terminant le Jour ${loc.day}.`); return; }
  }
}

let mapToastTimer = null;
function showMapToast(text) {
  const el = document.getElementById("map-toast");
  if (!el) return;
  el.textContent = text;
  el.classList.remove("hidden");
  el.classList.add("show");
  clearTimeout(mapToastTimer);
  mapToastTimer = setTimeout(() => { el.classList.remove("show"); }, 2600);
}
