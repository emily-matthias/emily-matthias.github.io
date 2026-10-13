// Hands the calendar entry to the phone as a real file address (needed by Safari on iPhone).
// It contains no wedding details: the entry itself is put into the browser's local cache by the unlocked page.
self.addEventListener("install", function(){ self.skipWaiting(); });
self.addEventListener("activate", function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function(e){
  var u = new URL(e.request.url);
  if (!/\/wedding\.ics$/.test(u.pathname)) return;
  e.respondWith(caches.open("em-ics").then(function(c){ return c.match(u.origin + u.pathname); })
    .then(function(r){ return r || new Response("Not found", { status: 404 }); }));
});
