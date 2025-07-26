import withPayload from "@payloadcms/next/withPayload";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://images.ctfassets.net/**"),
      new URL("http://images.ctfassets.net/**"),
    ],
  },
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
};

export default withPayload(nextConfig);
