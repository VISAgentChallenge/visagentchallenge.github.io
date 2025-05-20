import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/leaderboard",
        destination: "http://52.250.67.65:8000/leaderboard",
      },
      {
        source: "/api/output",
        destination: "http://52.250.67.65:8000/output",
      },
    ];
  },
};

export default nextConfig;
