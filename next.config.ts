import type { NextConfig } from "next";

const nextConfig : NextConfig  = {
  output: 'standalone',

  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {},

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    minimumCacheTTL: 31536000,
    deviceSizes: [320, 420, 768, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

};

export default nextConfig;
