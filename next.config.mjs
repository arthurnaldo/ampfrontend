/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['encrypted-tbn0.gstatic.com'], // Add your allowed image domains here
  },
  output: 'export', // Add this line to enable static export
};

export default nextConfig;