/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.jesusgloryintl.com",
      },
      {
        protocol: "https",
        hostname: "test.jesusgloryintl.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.1689designs.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
