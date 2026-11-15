const CACHE = 'ai-planets-guide-20261115-v1';
const FILES = ['/index.html', '/level1.html', '/level2.html', '/level3.html', '/level4.html', '/help.html', '/guide.css', '/app.js', '/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png', '/icons/icon-512-maskable.png', '/icons/apple-touch-icon.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('ai-planets-guide-') && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  const path = url.pathname === '/' ? '/index.html' : url.pathname;
  if (!FILES.includes(path)) return;
  // Only the guide's public files are cached. Analytics and other requests bypass this worker.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(event.request);
      if (response.ok && !response.redirected) {
        await cache.put(path, response.clone());
        return response;
      }
      return (await cache.match(path)) || response;
    } catch {
      return (await cache.match(path)) || new Response('This page has not been saved yet. Reconnect and reopen the guide.', {status:503, headers:{'Content-Type':'text/plain; charset=utf-8'}});
    }
  })());
});
