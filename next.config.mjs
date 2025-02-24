/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
   unoptimized: true, // Disable image optimization
   domains: ['encrypted-tbn0.gstatic.com'], // Add your allowed image domains here
 },
 output: 'export', // Enable static export
 basePath: '/your-repo-name', // Set this to your GitHub repo name
};

export default nextConfig;