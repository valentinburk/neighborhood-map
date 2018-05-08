var CACHE_NAME = 'neighborhood-map-cache';

self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        const urlsToCache = [
          "/",
          "./index.html",
          "./menu.png",
          "./static/js/bundle.js"
        ]
        cache.addAll(urlsToCache)
        console.log('cached');
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(response => {
    if (response) {
      return response;
    }

    return fetch(event.request).then(response => {
      if (response.ok) {
        caches.open(CACHE_NAME).then(cache => {
          cache.add(event.request);
        });
      }
      return response;
    });
  }));
});