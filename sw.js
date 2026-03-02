const CACHE_NAME = 'sara-korean-v2';

// I file base da scaricare subito per far partire l'app offline
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json'
];

// Installa il Service Worker e salva l'App Shell
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Salvataggio file base (App Shell)');
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

// Pulisce le vecchie cache se aggiorni l'app
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Service Worker] Rimozione vecchia cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// Intercetta le richieste di rete (La magia dell'Offline)
// Strategia: Cache First, poi Network (e salva nella cache per le prossime volte)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      // Se il file è in cache, restituiscilo immediatamente (funziona offline!)
      return r || fetch(e.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          // Salva in cache anche Tailwind, i Font e le librerie esterne mentre navighi
          if (e.request.method === 'GET' && e.request.url.startsWith('http')) {
            cache.put(e.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});
