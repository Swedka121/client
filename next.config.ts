import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/resources/**",
      },
      {
        protocol: "https",
        hostname: "apis.swedka121.com",
        port: "",
        pathname: "/school/resources/**",
      },
    ],
  },
};

export default nextConfig;
