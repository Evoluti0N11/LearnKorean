/* ============================================================
   Carte littéraire de FRANCE — Leaflet + OpenStreetMap (gratuit)
   + API publique Wikipédia (gratuite, sans clé) pour les photos
   ============================================================ */

const FRANCE_BOUNDS = L.latLngBounds([41.15, -5.3], [51.3, 9.7]);
// Limites élargies pour permettre à la carte mobile de glisser et dézoomer librement
const FRANCE_MAX_BOUNDS = L.latLngBounds([25.0, -20.0], [65.0, 25.0]);

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
  FRANCE_LOCATIONS.forEach(loc => { if (STATE.completedDays.includes(loc.day)) set.add(loc.id); });
  return set;
}

function locationsForDay(day) {
  return FRANCE_LOCATIONS.filter(l => l.day === day);
}

function locationForDay(day) {
  const all = locationsForDay(day);
  return all.find(l => l.kind === "core") || all[0] || null;
}

/* ---------------- Icônes personnalisées ---------------- */
function makeDivIcon(loc, isUnlocked, justUnlocked) {
  if (isUnlocked) {
    const isCore = loc.kind === "core";
    const icon = isCore ? "📖" : "🔭";
    const cls = `lit-marker ${isCore ? "core" : "extension"}${justUnlocked ? " just-unlocked" : ""}`;
    return L.divIcon({
      className: "",
      html: `<div class="${cls}"><span>${icon}</span></div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -16]
    });
  } else {
    // Les cadenas utilisent désormais des marqueurs Leaflet natifs (garantit l'affichage sur mobile)
    return L.divIcon({
      className: "",
      html: `<div style="width:20px; height:20px; border-radius:50%; background:rgba(42,36,64,0.95); border:1px solid rgba(211,162,77,0.5); display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.5);">🔒</div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  }
}

/* ---------------- Contenu des popups ---------------- */
function loadingPopupHTML(loc) {
  return `
    <div class="loc-popup">
      <div class="loc-photo placeholder"><span>${loc.kind === "core" ? "📖" : "🔭"}</span></div>
      <div class="loc-popup-body">
        <span class="loc-arr">${loc.region} · ${loc.era} · Jour ${loc.day}</span>
        <h4>${loc.name}</h4>
        <p class="loc-note">${loc.note}</p>
        <p class="loc-extract muted">Chargement d'une photo et d'un résumé (Wikipédia)…</p>
      </div>
    </div>`;
}

function fullPopupHTML(loc, wiki) {
  const img = wiki && wiki.thumbnail
    ? `<img class="loc-photo" src="${wiki.thumbnail.source}" alt="${loc.name}" loading="lazy">`
    : `<div class="loc-photo placeholder"><span>${loc.kind === "core" ? "📖" : "🔭"}</span></div>`;
  const extract = wiki && wiki.extract ? `<p class="loc-extract">${truncateText(wiki.extract, 150)}</p>` : "";
  const link = (wiki && wiki.pageUrl) || `https://fr.wikipedia.org/wiki/${encodeURIComponent(loc.wikiTitle)}`;
  return `
    <div class="loc-popup">
      ${img}
      <div class="loc-popup-body">
        <span class="loc-arr">${loc.region} · ${loc.era} · Jour ${loc.day}</span>
        <h4>${loc.name}</h4>
        <p class="loc-note">${loc.note}</p>
        ${extract}
        ${loc.extra ? `<p class="loc-extra">💡 ${loc.extra}</p>` : ""}
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
    zoomSnap: 0.25,
    minZoom: 4, // Abaissé à 4 pour permettre de bien dézoomer sur mobile
    maxZoom: 18,
    maxBounds: FRANCE_MAX_BOUNDS,
    maxBoundsViscosity: 0.7,
    zoomControl: false
  });
  leafletMap.fitBounds(FRANCE_BOUNDS, { padding: [6, 6] });

  L.control.zoom({ position: "bottomright" }).addTo(leafletMap);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
  }).addTo(leafletMap);

  fogCanvas = document.getElementById("fog-canvas");
  fogCtx = fogCanvas.getContext("2d");

  const unlocked = getUnlockedLocationIds();
  const justSet = ui.justUnlockedIds instanceof Set ? ui.justUnlockedIds : new Set();

  FRANCE_LOCATIONS.forEach(loc => {
    if (unlocked.has(loc.id)) {
      // Lieux débloqués
      const marker = L.marker([loc.lat, loc.lon], { icon: makeDivIcon(loc, true, justSet.has(loc.id)) }).addTo(leafletMap);
      
      marker.bindPopup(loadingPopupHTML(loc), { 
        maxWidth: 240, 
        className: "loc-popup-wrap", 
        autoPanPadding: [15, 15] 
      });
      
      marker.on("popupopen", async () => {
        const wiki = await fetchWikiSummary(loc.wikiTitle);
        marker.getPopup().setContent(fullPopupHTML(loc, wiki));
        marker.getPopup().update();
      });
      mapMarkers[loc.id] = marker;
    } else {
      // Lieux verrouillés
      const marker = L.marker([loc.lat, loc.lon], { icon: makeDivIcon(loc, false, false) }).addTo(leafletMap);
      marker.on("click", () => {
        showMapToast(`🔒 « ${loc.name} » se débloque en terminant le Jour ${loc.day}.`);
      });
      mapMarkers[loc.id] = marker;
    }
  });

  leafletMap.on("move zoom resize", scheduleFogRedraw);

  setTimeout(() => {
    leafletMap && leafletMap.invalidateSize();
    redrawFog();

    if (ui.flyToDay) {
      const locs = locationsForDay(ui.flyToDay);
      if (locs.length === 2) {
        leafletMap.flyToBounds(L.latLngBounds([locs[0].lat, locs[0].lon], [locs[1].lat, locs[1].lon]), { padding: [70, 70], maxZoom: 12, duration: 1.1 });
      } else if (locs.length === 1) {
        leafletMap.flyTo([locs[0].lat, locs[0].lon], 12, { duration: 1.1 });
      }
      leafletMap.once("moveend", () => redrawFog());
      ui.flyToDay = null;
    } else if (ui.flyToLocationId) {
      const loc = FRANCE_LOCATIONS.find(l => l.id === ui.flyToLocationId);
      if (loc) {
        leafletMap.flyTo([loc.lat, loc.lon], 13, { duration: 1.1 });
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
  const zoom = leafletMap.getZoom();
  const holeR = Math.max(46, Math.min(100, zoom * 9)); // trous plus petits quand la carte est dézoomée

  fogCtx.globalCompositeOperation = "destination-out";
  FRANCE_LOCATIONS.forEach(loc => {
    if (!unlocked.has(loc.id)) return;
    const pt = leafletMap.latLngToContainerPoint([loc.lat, loc.lon]);
    const grad = fogCtx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, holeR);
    grad.addColorStop(0, "rgba(0,0,0,1)");
    grad.addColorStop(0.65, "rgba(0,0,0,0.95)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    fogCtx.fillStyle = grad;
    fogCtx.beginPath();
    fogCtx.arc(pt.x, pt.y, holeR, 0, Math.PI * 2);
    fogCtx.fill();
  });
  
  // Les cadenas ne sont plus dessinés ici, ils sont gérés de manière native par Leaflet (makeDivIcon)
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