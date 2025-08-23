import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: { ppr: 'incremental' },
  devIndicators: {
    position: 'bottom-right',
  },
  turbopack: {
    root: '/home/light/Desktop/yc_directory',
  },
};

export default nextConfig;
