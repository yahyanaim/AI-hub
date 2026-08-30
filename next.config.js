/** @type {import('next').NextConfig} */
const { hosts: IMAGE_HOSTS } = require('./lib/image-hosts.json');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: IMAGE_HOSTS.map((hostname) => ({
      protocol: 'https',
      hostname,
    })),
  },
  async redirects() {
    return [
      { source: '/devtool', destination: '/dev-tools', permanent: true },
      { source: '/devtool/:path*', destination: '/dev-tools/:path*', permanent: true },
    ]
  },
};

module.exports = nextConfig;
