import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Supabase Storage public bucket URLs (pastor photo, gallery uploads).
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Default Server Action body limit is 1 MB, which rejects normal
      // camera/phone photos on the gallery upload form.
      bodySizeLimit: "11mb",
    },
  },
};

export default nextConfig;
