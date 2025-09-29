import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      // Production configuration - update with your actual domain
      ...(process.env.NODE_ENV === 'production' ? [{
        protocol: 'https' as const,
        hostname: 'your-production-domain.com',
        port: '',
        pathname: '/uploads/**',
      }] : []),
    ],
  },
};

export default nextConfig;
