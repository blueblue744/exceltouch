const CACHE_NAME = 'excel-editor-v1';
const ASSETS = [
  './index.html',
  './xlsx.bundle.js',
  './manifest.json'
];

// インストール時にファイルをキャッシュする
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// オフライン時はキャッシュからデータを返す
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});