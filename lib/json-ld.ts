/**
 * Safely serialize JSON-LD structured data for embedding in <script type="application/ld+json">.
 *
 * Escapes every "<" as "\u003c" so that any string inside the object (including
 * future user-submitted names/descriptions) can never close the script tag early
 * or inject HTML into the page.
 */
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c')
}
