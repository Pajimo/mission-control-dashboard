/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Netlify deployment configuration (no basePath needed)
  // basePath: '/mission-control-dashboard', // Removed for Netlify
  // assetPrefix: '/mission-control-dashboard/', // Removed for Netlify
}

module.exports = nextConfig