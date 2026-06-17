import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  // three usa WebGL en cliente; transpilar para evitar issues de ESM
  transpilePackages: ["three"],
};

export default nextConfig;
