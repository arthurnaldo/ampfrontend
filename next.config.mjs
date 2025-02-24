   /** @type {import('next').NextConfig} */
   const nextConfig = {
    images: {
      unoptimized: true, // Disable image optimization
      domains: ['encrypted-tbn0.gstatic.com'], // Add your allowed image domains here
    },
    output: 'export', // Enable static export
  };

  export default nextConfig;