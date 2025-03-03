import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: true,
  },
};

export default nextConfig;
