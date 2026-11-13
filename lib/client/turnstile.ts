'use client'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string
          size?: 'invisible' | 'normal' | 'compact'
          execution?: 'render' | 'execute'
          callback?: (token: string) => void
          'error-callback'?: () => void
          'expired-callback'?: () => void
        }
      ) => string
      execute: (widgetId: string) => void
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

let scriptPromise: Promise<void> | null = null

function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => {
      scriptPromise = null
      reject(new Error('Failed to load verification script.'))
    }
    document.head.appendChild(script)
  })
  return scriptPromise
}

/**
 * Returns `x-turnstile-token` header when NEXT_PUBLIC_TURNSTILE_SITE_KEY is
 * configured; returns `{}` immediately when Turnstile is not enabled.
 */
export async function getTurnstileHeaders(): Promise<Record<string, string>> {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()
  if (!siteKey || typeof window === 'undefined') return {}

  await loadTurnstileScript()
  if (!window.turnstile) return {}

  return new Promise<Record<string, string>>((resolve) => {
    const host = document.createElement('div')
    host.style.display = 'none'
    document.body.appendChild(host)

    let settled = false
    let widgetId = ''
    const cleanup = () => {
      try {
        if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
      } catch {
        // ignore
      }
      host.remove()
    }
    const timer = window.setTimeout(() => {
      if (settled) return
      settled = true
      cleanup()
      resolve({})
    }, 8000)

    widgetId = window.turnstile!.render(host, {
      sitekey: siteKey,
      size: 'invisible',
      execution: 'execute',
      callback: (token: string) => {
        if (settled) return
        settled = true
        window.clearTimeout(timer)
        cleanup()
        resolve(token ? { 'x-turnstile-token': token } : {})
      },
      'error-callback': () => {
        if (settled) return
        settled = true
        window.clearTimeout(timer)
        cleanup()
        resolve({})
      },
    })

    window.turnstile!.execute(widgetId)
  })
}
