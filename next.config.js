/** @type {import('next').NextConfig} */
const nextConfig = {
  // Local development configuration - no basePath
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig