/** @type {import('next').NextConfig} */
module.exports = {
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
