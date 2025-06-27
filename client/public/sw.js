const CACHE_NAME = 'paleo-hebrew-v1.0.0';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/alphabet',
  '/sounds',
  '/tracing',
  '/word-building',
  '/progress',
  '/premium',
  '/character-packs',
  '/parent-dashboard'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache install failed:', error);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // Fallback for navigation requests when offline
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline progress tracking
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncProgress());
  }
});

async function syncProgress() {
  try {
    // Sync any cached progress data when back online
    const cache = await caches.open(CACHE_NAME);
    const cachedRequests = await cache.keys();
    
    for (const request of cachedRequests) {
      if (request.url.includes('/api/user/') && request.method === 'POST') {
        // Retry failed API calls
        await fetch(request);
      }
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// Push notifications for learning reminders
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Time to practice your Paleo Hebrew!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Start Learning',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Not Now',
        icon: '/icons/icon-96x96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Paleo Hebrew Learning', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/alphabet')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});