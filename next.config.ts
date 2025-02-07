import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
      appIsrStatus: false,
  },
    images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'www.w3.org',
          },
          {
              protocol: 'https',
              hostname: 'upload.wikimedia.org',
          },
          {
              protocol: 'https',
              hostname: 'assets.vercel.com',
          },
          {
              protocol: 'https',
              hostname: 'git-scm.com',
          },
      ]
    }
};

export default nextConfig;
