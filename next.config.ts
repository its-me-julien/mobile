/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Ensures strict React mode for better debugging
  images: {
    unoptimized: true, // Still allows for static hosting of images
  },
  trailingSlash: true, // Optional, depends on your routing preference
};

export default nextConfig;