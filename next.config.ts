import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/leaderboard",
        destination: "http://52.250.67.65:8000/leaderboard",
      },
    ];
  },
};

export default nextConfig;

