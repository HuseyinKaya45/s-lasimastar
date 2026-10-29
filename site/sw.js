/* Çevrimdışı önbellek: program başına ayrı önbellek; ilk açılıştan sonra internetsiz çalışır. */
const SURUM = __SURUMLER__;
const ad = u => { const k = new URL(".", self.registration.scope).pathname; const r = new URL(u).pathname.slice(k.length).split("/")[0]; return SURUM[r] ? r : "portal"; };
const cname = id => id + "-" + SURUM[id];
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(cname("portal")).then(c => c.addAll(["./", "./manifest.webmanifest", "./icon-192.png", "./icon-180.png"]))); });
self.addEventListener("activate", e => e.waitUntil((async () => {
  const gecerli = new Set(Object.keys(SURUM).map(cname));
  for (const k of await caches.keys()) if (!gecerli.has(k)) await caches.delete(k);
  await self.clients.claim();
})()));
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const id = ad(r.url), c = await caches.open(cname(id));
    const hit = await c.match(r, {ignoreSearch: true}); if (hit) return hit;
    try { const res = await fetch(r); if (res.ok) c.put(r, res.clone()); return res; }
    catch (err) { const o = await caches.open(cname("portal")); return (await o.match(new URL("./", self.registration.scope).href)) || Response.error(); }
  })());
});
