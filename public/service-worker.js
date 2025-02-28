const PIXABAY_CACHE = "pixabay-cache";
const WEATHER_CACHE = "weather-cache";

self.addEventListener("install", (event) => {
  console.log("Service worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // caching pixabay api
  if (url.includes("pixabay.com")) {
    event.respondWith(
      caches.open(PIXABAY_CACHE).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          console.log(`Cache ${cachedResponse ? "HIT" : "MISS"} for: ${url}`);

          const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
              console.log(`Caching: ${url}`);
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            .catch((error) => {
              console.error(`Fetch failed: ${url}`, error);
              return cachedResponse;
            });

          return cachedResponse || fetchPromise;
        });
      })
    );
  }
  // caches weather information
  else if (url.includes("/weather")) {
    event.respondWith(
      caches.open(WEATHER_CACHE).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          console.log(`Cache ${cachedResponse ? "HIT" : "MISS"} for: ${url}`);

          const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
              console.log(`Caching: ${url}`);
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            .catch((error) => {
              console.error(`Fetch failed: ${url}`, error);
              return cachedResponse;
            });

          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});
