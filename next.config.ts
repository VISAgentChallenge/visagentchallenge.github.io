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
        destination: `${process.env.API_ENDPOINT}/leaderboard`,
      },
      {
        source: "/api/pdf/:submission_id",
        destination: `${process.env.API_ENDPOINT}/pdf/:submission_id`,
      },
    ];
  },
};

export default nextConfig;
