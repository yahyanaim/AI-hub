import 'server-only'

const AUTOMATED_UA_RE =
  /\b(curl|wget|python-requests|python-urllib|httpx|aiohttp|go-http-client|libwww-perl|scrapy|httpclient|java\/|okhttp|node-fetch|undici)\b/i

export type BotCheckResult =
  | { ok: true }
  | { ok: false; status: number; error: string }

/**
 * Layered anti-bot and payload-size guard for expensive AI POST endpoints.
 * Never applied to public GET catalog/SEO pages so Googlebot, Bingbot, and
 * normal search crawlers are completely unaffected.
 */
export async function checkExpensiveAiBotGuard(
  request: Request,
  options: { maxContentLengthBytes?: number } = {}
): Promise<BotCheckResult> {
  if (options.maxContentLengthBytes) {
    const rawLen = request.headers.get('content-length')
    if (rawLen) {
      const len = Number.parseInt(rawLen, 10)
      if (Number.isFinite(len) && len > options.maxContentLengthBytes) {
        return { ok: false, status: 413, error: 'Request payload too large.' }
      }
    }
  }

  const strictUa = process.env.AI_BOT_STRICT !== 'false'
  if (strictUa) {
    const ua = request.headers.get('user-agent')?.trim() ?? ''
    const requireUa =
      process.env.AI_BOT_REQUIRE_UA === '1' ||
      process.env.VERCEL_ENV === 'production' ||
      process.env.NODE_ENV === 'production'
    if (ua ? ua.length < 8 || AUTOMATED_UA_RE.test(ua) : requireUa) {
      return {
        ok: false,
        status: 403,
        error: 'Automated requests to this AI endpoint are not permitted.',
      }
    }
  }

  // Optional Cloudflare Turnstile verification when configured in env.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim()
  if (turnstileSecret) {
    const token = request.headers.get('x-turnstile-token')?.trim()
    if (!token) {
      return {
        ok: false,
        status: 403,
        error: 'Human verification token required.',
      }
    }
    try {
      const form = new URLSearchParams({
        secret: turnstileSecret,
        response: token,
      })
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: form,
      })
      const verified = (await verifyRes.json()) as { success?: boolean }
      if (!verified.success) {
        return {
          ok: false,
          status: 403,
          error: 'Human verification failed. Please refresh and try again.',
        }
      }
    } catch {
      return {
        ok: false,
        status: 503,
        error: 'Verification service temporarily unavailable.',
      }
    }
  }

  return { ok: true }
}
