import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    allowedDevOrigins: ['127.0.2.2', 'localhost:3000', 'localhost:3001']
  }
} as any;

export default nextConfig;
