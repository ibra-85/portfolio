import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true, // Nécessaire avec output: 'export'
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
