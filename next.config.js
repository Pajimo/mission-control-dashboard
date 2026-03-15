/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages configuration
  output: 'export',
  trailingSlash: true,
  basePath: '/mission-control-dashboard',
  assetPrefix: '/mission-control-dashboard/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig