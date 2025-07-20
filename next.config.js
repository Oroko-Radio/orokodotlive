const { withPayload } = require("@payloadcms/next/withPayload");
/** @type {import('next').NextConfig} */
module.exports = withPayload({
  images: {
    remotePatterns: [new URL("https://images.ctfassets.net/**")],
  },
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
});
