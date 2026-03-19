import type { NextConfig } from "next";

const nextConfig : NextConfig  = {
  // Enable standalone output for Docker deployment
  output: 'standalone',
  
  // Enable experimental features if needed
  experimental: {
    // serverActions: {
    //   bodySizeLimit: '2mb',
    // },
  },
  
  
  // Image optimization configuration
  images: {
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
  },
  
  // Environment variables
  
};

export default nextConfig;
