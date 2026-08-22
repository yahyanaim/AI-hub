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
};

module.exports = nextConfig;
