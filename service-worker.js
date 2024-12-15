const cacheName = 'hybrid-comparison-v1';
const filesToCache = [
  './',
  './index.html',
  './styles.css'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the cached response if found, otherwise fetch from network.
        return response || fetch(event.request);
      })
  );
});
