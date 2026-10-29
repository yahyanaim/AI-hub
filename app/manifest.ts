import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Hunt - Discover AI Tools & Developer Resources',
    short_name: 'AI Hunt',
    description: 'Community-driven directory of AI tools, dev tools, repos and courses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#FF6B00',
    icons: [
      { src: '/icons/push-icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/push-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      // The push icon is a full-bleed brand-orange square with the mark kept
      // inside the ~80% safe zone, so it doubles as the maskable launcher icon.
      { src: '/icons/push-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
