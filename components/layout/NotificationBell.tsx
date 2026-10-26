'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Gift, Package, Share2, Wrench, Check, Trash2 } from 'lucide-react'
import { useApp, notificationHref, type AppNotification } from '@/lib/store'
import { cn, relativeTime } from '@/lib/utils'

const ICONS: Record<AppNotification['itemType'], typeof Bell> = {
  tool: Wrench,
  devtool: Package,
  repo: Share2,
  offer: Gift,
}

const LABELS: Record<AppNotification['itemType'], string> = {
  tool: 'AI Tool added',
  devtool: 'Dev Tool added',
  repo: 'Editing Tool added',
  offer: 'Offer added',
}

export function NotificationBell() {
  const router = useRouter()
  const {
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
  } = useApp()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const openNotification = (n: AppNotification) => {
    markNotificationRead(n.id)
    setOpen(false)
    router.push(notificationHref(n))
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'relative inline-flex size-9 items-center justify-center rounded-lg transition-colors',
          open ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
        aria-label={`Notifications${unreadNotificationCount ? ` (${unreadNotificationCount} unread)` : ''}`}
        title="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadNotificationCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
            {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-80 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-xl border border-border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="text-sm font-semibold text-foreground">Notifications</span>
            {notifications.length > 0 && (
              <div className="flex items-center gap-2">
                {unreadNotificationCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    title="Mark all as read"
                  >
                    <Check className="h-3 w-3" />
                    Mark all read
                  </button>
                )}
                <button
                  onClick={clearNotifications}
                  className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-red-500"
                  title="Clear all notifications"
                >
                  <Trash2 className="h-3 w-3" />
                  Clear
                </button>
              </div>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="flex min-h-20 items-center justify-center px-4 py-6 text-center text-xs text-muted-foreground">
              Nothing here yet. Items you submit (tools or offers) will show up here.
            </p>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {notifications.map((n) => {
                const Icon = ICONS[n.itemType]
                return (
                  <li key={n.id}>
                    <button
                      onClick={() => openNotification(n)}
                      className={cn(
                        'flex w-full items-start gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-muted/60',
                        !n.read && 'bg-brand-orange/5'
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg',
                          n.itemType === 'offer'
                            ? 'bg-brand-green/10 text-brand-green'
                            : 'bg-secondary text-muted-foreground'
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5">
                          <span className="truncate text-xs font-medium text-muted-foreground">
                            {LABELS[n.itemType]}
                          </span>
                          {!n.read && (
                            <span className="size-1.5 shrink-0 rounded-full bg-brand-orange" aria-label="Unread" />
                          )}
                        </span>
                        <span className="mt-0.5 block truncate text-sm font-medium text-foreground">
                          {n.name}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-muted-foreground">
                          {relativeTime(n.createdAt)}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
