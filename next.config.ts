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
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_I1PRwfzQUvN4@ep-dry-king-aiqupucl-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
};

export default nextConfig;
