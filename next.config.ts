// import type { NextConfig } from "next";

const nextConfig  = {
  // Enable standalone output for Docker deployment
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
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
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;
