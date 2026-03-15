/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV === 'development'

const nextConfig = {
  output: isDevelopment ? 'standalone' : 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Only use basePath for GitHub Pages deployment, not development
  ...(isDevelopment ? {} : {
    basePath: '/mission-control-dashboard',
    assetPrefix: '/mission-control-dashboard/',
  }),
}

module.exports = nextConfig