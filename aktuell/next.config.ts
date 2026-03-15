import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  serverExternalPackages: ["better-sqlite3", "@prisma/adapter-better-sqlite3"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
