importScripts("http://localhost:8000/swmodule.js");
importScripts("http://localhost:8000/configuration.js");
importScripts("https://cdnjs.cloudflare.com/ajax/libs/mathjs/14.2.1/math.js");

self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installing...");
    self.skipWaiting(); // Activate the SW immediately
});

self.addEventListener("activate", async (event) => {
    console.log("[Service Worker] Activating...");
    cacheData();
	console.log(getData());
	// console.log(configuration);
	console.log(math.round(math.e, 3));
	const clients = await self.clients.matchAll(); 
	console.log("clients.length:", clients.length); 


    if (self.registration.navigationPreload) {
        event.waitUntil(self.registration.navigationPreload.enable());
        console.log("[Service Worker] Navigation Preload enabled.");
    }
    
    self.clients.claim(); // Take control of clients immediately
});

self.addEventListener("fetch", async (event) => {
    console.log("[Service Worker] Fetching:", event.request.url);
	const clients = await self.clients.matchAll();
	for (const client of clients) {
		client.postMessage({ type: "refresh", a: "a", message: { a: 1, b: 2 } });
	}
    event.respondWith(fetch(event.request)); // Fetch other requests normally
});
