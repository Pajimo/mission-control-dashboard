/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages configuration
  basePath: '/mission-control-dashboard',
  assetPrefix: '/mission-control-dashboard/',
}

module.exports = nextConfig