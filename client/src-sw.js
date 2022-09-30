const { warmStrategyCache } = require("workbox-recipes");
const { StaleWhileRevalidate, CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const cacheName = 'static-resources';

const matchCallback = ({ request }) => {
  return (
    // CSS
    request.destination === 'style' ||
    // JavaScript
    request.destination === 'script' ||
    // worker
    request.destination === 'worker'
  );
};

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// TODO: Implement asset caching
registerRoute(
  matchCallback,
  new StaleWhileRevalidate({
    cacheName,
    plugins: [
  new CacheableResponsePlugin({
      statuses: [0, 200],
      }),
    ],
  })
);
