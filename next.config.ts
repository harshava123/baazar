import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? 'http://bazarapi.elitceler.com/api'
      : 'http://localhost:5000/api',
    NEXT_PUBLIC_WS_URL: process.env.NODE_ENV === 'production'
      ? 'http://bazarapi.elitceler.com'
      : 'http://localhost:5000',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'trullu-product-images.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'bazarapi.elitceler.com',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'bazarapi.elitceler.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;

      },
      {
        protocol: 'https',
        hostname: 'bazarapi.elitceler.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
