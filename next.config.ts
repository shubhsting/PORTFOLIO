import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove 'output: export' to enable server-side features and API routes
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
