import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: {
        buildActivity: false,
    },
    transpilePackages: ['three']
};

export default nextConfig;
