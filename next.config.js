/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    // Enable runtime for static export with dynamic data simulation
    typedRoutes: false
  }
  // Note: API routes disabled for static export - using client-side simulation
}

module.exports = nextConfig