import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/designer-app/:path*",
        destination: "/designer-app/:path*",
      },
    ];
  },
};

export default nextConfig;
