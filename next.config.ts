import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Docker/ParsPack image builds that run `.next/standalone/server.js`
  output: "standalone",
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com", "res.cloudinary.com"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
