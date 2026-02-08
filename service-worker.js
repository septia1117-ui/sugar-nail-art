/**
 * Sugar Nail Art - Service Worker
 * Provides offline support and caching for PWA
 */

const CACHE_NAME = "sugar-nail-art-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/cart.html",
  "/orders.html",
  "/app.js",
  "/manifest.json",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/assets/logo.jpg",
  "/assets/basic-package.png",
  "/assets/deluxe-package.png",
  "/assets/premium-package.png",
];

// Install event - cache essential files
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching files");
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest)
        .then((response) => {
          // Check if valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the new response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Network failed, return offline page if available
          return caches.match("/offline.html");
        });
    }),
  );
});

// Background sync (optional - for future features)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-orders") {
    console.log("Service Worker: Syncing orders");
    // Handle background sync here
  }
});

// Push notifications (optional - for future features)
self.addEventListener("push", (event) => {
  const options = {
    body: event.data
      ? event.data.text()
      : "New notification from Sugar Nail Art",
    icon: "/assets/icon-192.png",
    badge: "/assets/icon-192.png",
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification("Sugar Nail Art", options),
  );
});
