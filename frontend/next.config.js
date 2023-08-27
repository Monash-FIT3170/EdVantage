/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dkkxc50nup77a.cloudfront.net',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
