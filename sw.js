// Mission Control Service Worker - Enhanced Performance & Caching
// CFO Olamide - Final Sprint PWA Enhancement

const CACHE_NAME = 'mission-control-v2.1'
const STATIC_CACHE = 'mission-control-static-v2.1'
const DYNAMIC_CACHE = 'mission-control-dynamic-v2.1'

// Assets to cache
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/_next/static/css/',
  '/_next/static/chunks/',
  '/offline.html'
]

const DYNAMIC_ASSETS = [
  '/api/',
  '/agents/',
  '/chart/'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🚀 Mission Control SW: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('📦 Mission Control SW: Caching static assets')
      return cache.addAll(STATIC_ASSETS)
    }).catch(err => {
      console.log('⚠️ Mission Control SW: Cache install failed', err)
    })
  )
  
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('⚡ Mission Control SW: Activating...')
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== CACHE_NAME) {
            console.log('🗑️ Mission Control SW: Deleting old cache', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  
  self.clients.claim()
})

// Fetch event - serve cached content with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event
  
  // Skip non-GET requests
  if (request.method !== 'GET') return
  
  // Skip external requests
  if (!request.url.startsWith(self.location.origin)) return
  
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Return cached version if available
      if (cachedResponse) {
        // Update cache in background for dynamic content
        if (isDynamicContent(request.url)) {
          fetch(request).then((freshResponse) => {
            if (freshResponse.ok) {
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, freshResponse.clone())
              })
            }
          })
        }
        return cachedResponse
      }
      
      // Network first for API calls
      if (request.url.includes('/api/')) {
        return fetch(request).then((response) => {
          if (response.ok) {
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, response.clone())
            })
          }
          return response
        }).catch(() => {
          // Return offline page for failed API calls
          return caches.match('/offline.html')
        })
      }
      
      // Cache first for static assets
      return fetch(request).then((response) => {
        if (response.ok) {
          const cache = isStaticContent(request.url) ? STATIC_CACHE : DYNAMIC_CACHE
          caches.open(cache).then((openCache) => {
            openCache.put(request, response.clone())
          })
        }
        return response
      }).catch(() => {
        // Return offline page for failed requests
        return caches.match('/offline.html')
      })
    })
  )
})

// Helper functions
function isStaticContent(url) {
  return url.includes('/_next/static/') || 
         url.includes('/favicon.ico') ||
         url.endsWith('.css') ||
         url.endsWith('.js')
}

function isDynamicContent(url) {
  return url.includes('/api/') || 
         url.includes('/agents/') ||
         url.includes('/chart/')
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Mission Control SW: Background sync triggered')
    event.waitUntil(syncData())
  }
})

async function syncData() {
  try {
    // Sync any pending data when back online
    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      console.log('✅ Mission Control SW: Background sync completed')
      // Notify all clients of successful sync
      const clients = await self.clients.matchAll()
      clients.forEach(client => {
        client.postMessage({ type: 'SYNC_COMPLETE' })
      })
    }
  } catch (error) {
    console.log('❌ Mission Control SW: Background sync failed', error)
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    console.log('📬 Mission Control SW: Push notification received', data)
    
    const options = {
      body: data.body || 'Mission Control update',
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      tag: 'mission-control-update',
      data: data,
      actions: [
        {
          action: 'view',
          title: 'View Dashboard'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Mission Control', options)
    )
  }
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

console.log('🎯 Mission Control Service Worker v2.1 loaded - Final Sprint Enhancement')