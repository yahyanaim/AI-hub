// ============================================================
// Paid guides MVP — direct virement + WhatsApp manual delivery
// No PayPal, no webhook, no ?paid=1 gating.
// Flow: Pay -> "Hi I paid" + receipt on WhatsApp -> PDF back on WhatsApp.
// ============================================================

import type { Offer } from '@/types'

// TODO: replace with your real numbers.
export const WHATSAPP_NUMBER = '212600000000' // digits only, country code + number
export const PAYMENT_RIB = 'RIB 000-000-00000000000000 (Banque — Your Name)'

// Feature flag — guides are hidden until you finish working on them.
// Set to true to re-enable: cards, /guides routes, and sitemap entries.
export const GUIDES_ENABLED = false
export const GUIDE_PRICE_LABEL = (o: Offer) =>
  o.price ? `${o.price} ${o.currency ?? 'MAD'}` : ''

export function isPaidGuide(o: Offer): boolean {
  return o.pricing === 'paid' && typeof o.price === 'number'
}

export function whatsappOrderLink(offer: Offer): string {
  const price = GUIDE_PRICE_LABEL(offer)
  const msg = `Hi, I paid ${price} for "${offer.name}" (${offer.slug}). Here is my receipt:`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export function formatRating(offer: Offer): string | null {
  if (typeof offer.rating !== 'number') return null
  const count = offer.reviewsCount ? ` (${offer.reviewsCount})` : ''
  return `★ ${offer.rating.toFixed(1)}${count}`
}
