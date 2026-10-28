/* AI Hub service worker — Web Push for newly published tools.
 * Plain JS on purpose: served verbatim from the site root (scope /).
 * The push payload is JSON: { items: [{ title, body, icon, url }] }.
 */
self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', (event) => {
  let payload
  try {
    payload = event.data ? event.data.json() : null
  } catch {
    payload = null
  }
  const items = Array.isArray(payload?.items) ? payload.items.slice(0, 3) : []

  // Fallback when the payload can't be parsed (e.g. legacy sender).
  if (items.length === 0) {
    event.waitUntil(
      self.registration.showNotification('AI Hub', {
        body: 'New content was just added.',
        icon: '/icons/push-icon-512.png?v=4',
        badge: '/icons/push-icon-192.png?v=4',
        data: { url: '/' },
      })
    )
    return
  }

  event.waitUntil(
    Promise.all(
      items.map(
        (item) =>
          self.registration.showNotification(item.title || 'AI Hub', {
            body: item.body || '',
            // Right-side large icon = the tool's own logo (brand fallback).
            // The left-side small icon is Chrome's slot: it shows the AI Hub
            // launcher icon when the site is installed to the home screen.
            icon: item.icon || '/icons/push-icon-512.png?v=4',
            badge: '/icons/push-icon-192.png?v=4',
            tag: item.url || 'aihub', // one notification per tool, replaces dupes
            data: { url: item.url || '/' },
          })
      )
    )
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const target = (event.notification.data && event.notification.data.url) || '/'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      // Focus an existing window on that URL instead of opening a new tab.
      const existing = clients.find((c) => c.url === target)
      if (existing) return existing.focus()
      return self.clients.openWindow(target)
    })
  )
})
