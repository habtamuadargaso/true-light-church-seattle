import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Add remote photo hosts here once real congregation/pastor photos are hosted,
    // e.g. { remotePatterns: [{ protocol: "https", hostname: "images.example.com" }] }
    remotePatterns: [],
  },
};

export default nextConfig;
