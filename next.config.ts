import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: {
        buildActivity: false,
        position: "bottom-right"
    },
    transpilePackages: ['three']
};

export default nextConfig;
