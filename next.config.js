/** @type {import('next').NextConfig} */
const { hosts: IMAGE_HOSTS } = require('./lib/image-hosts.json');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: IMAGE_HOSTS.map((hostname) => ({
      protocol: 'https',
      hostname,
    })),
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        // The 108 raw /skills/*.md documents are third-party markdown served
        // verbatim — belt-and-braces noindex at the HTTP layer in addition to
        // the robots.txt Disallow (see SEO_GEO_AUDIT.md §6.5b).
        source: '/skills/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        // No crawler directives needed on /api/ responses — they are already
        // Disallow:ed in robots.txt — but an explicit header is more robust.
        source: '/api/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
  async redirects() {
    return [
      { source: '/devtool', destination: '/dev-tools', permanent: true },
      { source: '/devtool/:path*', destination: '/dev-tools/:path*', permanent: true },
      // Shareable shortcut: /booking jumps to the booking card on the homepage.
      { source: '/booking', destination: '/#booking', permanent: true },
      // NOTE: legacy one-segment redirects (/tools/<slug> → /tools/<category>/<slug>,
      // /categories/<cat>, etc.) are intentionally NOT declared here.
      // next.config redirects cannot do dynamic slug→category lookups; they are
      // served as real 308s by middleware.ts from lib/legacy-redirects.json
      // (generated prebuild by scripts/gen-legacy-redirects.mjs).
    ]
  },
};

module.exports = nextConfig;
