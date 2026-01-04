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
  devIndicators: {
    position: 'bottom-right',
  },
  turbopack: {
    root: '/home/light/Desktop/yc_directory',
  },
};

export default nextConfig;
