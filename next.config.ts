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
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://dkf_user:dfk123987pls:5432/dfk_db?schema=public",
  },
};

export default nextConfig;
