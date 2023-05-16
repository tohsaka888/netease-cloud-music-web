/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["p1.music.126.net", "s2.music.126.net", "p2.music.126.net", "p6.music.126.net"]
  }
}

module.exports = nextConfig
