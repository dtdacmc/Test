/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: "https://hoodwink.medkomtek.net/api",
  },
};

module.exports = nextConfig;
