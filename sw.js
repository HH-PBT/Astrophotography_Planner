/* Night Plan service worker.
   The app shell is cached so it opens instantly and works with no signal.
   Survey cutouts are cached as you look at them, capped, so targets you have
   already opened still show a picture in the field. */
const SHELL = 'np-shell-v7';
const SKY = 'np-sky-v1';
const FILES = ['./', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png'];
const SKY_MAX = 160;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== SHELL && k !== SKY).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

async function trim(name, max) {
  const c = await caches.open(name);
  const keys = await c.keys();
  for (let i = 0; i < keys.length - max; i++) await c.delete(keys[i]);
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  /* the page itself: cache first, so opening is instant and works offline */
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const c = await caches.open(SHELL);
      const hit = await c.match('./index.html');
      const net = fetch(req).then(r => { c.put('./index.html', r.clone()); return r; }).catch(() => null);
      return hit || (await net) || new Response('Offline and nothing cached yet.', { status: 503 });
    })());
    return;
  }

  /* our own files: cache first, refreshed in the background */
  if (url.origin === location.origin) {
    e.respondWith((async () => {
      const c = await caches.open(SHELL);
      const hit = await c.match(req);
      if (hit) { fetch(req).then(r => r.ok && c.put(req, r.clone())).catch(() => { }); return hit; }
      try { const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r; }
      catch (err) { return new Response('', { status: 504 }); }
    })());
    return;
  }

  /* survey images: serve from cache when offline, keep the last few for reference */
  if (/alasky|hips2fits/.test(url.host + url.pathname)) {
    e.respondWith((async () => {
      const c = await caches.open(SKY);
      const hit = await c.match(req);
      if (hit) return hit;
      try {
        const r = await fetch(req);
        if (r.ok) { await c.put(req, r.clone()); trim(SKY, SKY_MAX); }
        return r;
      } catch (err) { return hit || new Response('', { status: 504 }); }
    })());
    return;
  }
  /* weather and everything else stays live — stale forecasts are worse than none */
});
