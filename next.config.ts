import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    devIndicators: {
        buildActivity: false,
    },
    transpilePackages: ['three']
};

export default nextConfig;
