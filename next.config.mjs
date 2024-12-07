/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "assets.aceternity.com",
        protocol: "https",
      },
    ],
  },
  // reactStrictMode: false, // not rendering twice
};

export default nextConfig;
