/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
      {
        protocol: "https",
        hostname: "source.unsplash",
      },
      {
        protocol: "https",
        hostname: "gabby-dull-drip.glitch.me",
      },
    ],
  },
};

export default nextConfig;
