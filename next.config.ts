import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
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
        source: "/api/output/:submission_id",
        destination: `${process.env.API_ENDPOINT}/output/:submission_id`,
      },
      {
        source: "/api/submission/:submission_id",
        destination: `${process.env.API_ENDPOINT}/submission/:submission_id `,
      },
    ];
  },
};

export default nextConfig;
