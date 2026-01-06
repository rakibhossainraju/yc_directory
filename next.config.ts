import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  cacheComponents: true,
  reactCompiler: true,
  devIndicators: {
    position: 'bottom-right',
  },
  turbopack: {
    root: './',
  },
};

export default nextConfig;
