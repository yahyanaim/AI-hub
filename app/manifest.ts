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
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/logo.png', sizes: '128x64', type: 'image/png' },
    ],
  }
}
