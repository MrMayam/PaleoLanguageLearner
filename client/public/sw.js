const CACHE_NAME = 'paleo-hebrew-v1.0.0';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.svg',
  '/icons/icon-512x512.svg',
  '/favicon.ico'
];

// Cache API responses and static assets
const API_CACHE_NAME = 'paleo-hebrew-api-v1.0.0';

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Caching static resources');
        return cache.addAll(urlsToCache);
      }),
      caches.open(API_CACHE_NAME).then((cache) => {
        console.log('API cache opened');
        return Promise.resolve();
      })
    ]).catch((error) => {
      console.error('Cache install failed:', error);
    })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(API_CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
  } else {
    // Handle static resources
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((response) => {
            if (response.ok) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          });
        })
        .catch(() => {
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
        })
    );
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Background sync for progress tracking
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    event.waitUntil(syncProgress());
  }
});

async function syncProgress() {
  try {
    // Sync offline progress when back online
    const cache = await caches.open(API_CACHE_NAME);
    const cachedProgress = await cache.match('/api/user/1/progress');
    if (cachedProgress) {
      // Send cached progress to server
      console.log('Syncing progress data');
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}