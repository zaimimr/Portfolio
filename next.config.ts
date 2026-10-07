import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/demo", destination: "https://zaim-demo.vercel.app/" },
      { source: "/demo/:path*", destination: "https://zaim-demo.vercel.app/:path*" },
    ];
  },
};

export default nextConfig;
