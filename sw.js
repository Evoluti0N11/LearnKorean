const CACHE_VERSION = 'v3'; // Aumentiamo la versione per forzare l'aggiornamento
const STATIC_CACHE = `sara-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `sara-dynamic-${CACHE_VERSION}`;

// Le risorse fondamentali che DEVONO essere salvate subito per l'offline
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 1. INSTALLAZIONE: Salva l'App Shell
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Forza l'installazione immediata
  e.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[Service Worker] Cache App Shell salvata');
      return cache.addAll(APP_SHELL);
    })
  );
});

// 2. ATTIVAZIONE: Pulizia profonda delle vecchie cache
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            console.log('[Service Worker] Eliminazione vecchia cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // Prende subito il controllo della pagina
});

// 3. FETCH: Il cervello dell'app
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Ignora le richieste che non sono GET o che vanno verso l'API di traduzione (devono essere sempre live!)
  if (e.request.method !== 'GET' || url.hostname.includes('translate.googleapis.com')) {
    return;
  }

  // STRATEGIA 1: Stale-While-Revalidate per librerie esterne (Tailwind, Font, Mappe)
  // Ti mostra la versione in cache istantaneamente, ma scarica quella nuova in background per la prossima volta
  if (url.hostname.includes('cdn.tailwindcss.com') || 
      url.hostname.includes('unpkg.com') || 
      url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('basemaps.cartocdn.com')) {
    e.respondWith(
      caches.match(e.request).then((cachedRes) => {
        const fetchPromise = fetch(e.request).then((networkRes) => {
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(e.request, networkRes.clone());
          });
          return networkRes;
        }).catch(() => cachedRes); // Se non c'è rete, usa solo la cache
        
        return cachedRes || fetchPromise;
      })
    );
    return;
  }

  // STRATEGIA 2: Cache First con fallback sulla Rete (per il resto dell'app)
  e.respondWith(
    caches.match(e.request).then((cachedRes) => {
      if (cachedRes) {
        return cachedRes; // Restituisce subito il file offline
      }
      
      // Se non c'è in cache, lo va a prendere su internet
      return fetch(e.request).then((networkRes) => {
        // Salva il nuovo file nel Dynamic Cache per la prossima volta
        return caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(e.request, networkRes.clone());
          return networkRes;
        });
      }).catch(() => {
        // STRATEGIA 3: Fallback Estremo (Se sei offline e cerchi una pagina che non hai)
        // Riporta sempre l'utente alla index.html invece di mostrare l'errore del dinosauro di Chrome
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
