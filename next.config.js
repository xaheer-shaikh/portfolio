/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages uses the repository name as the base path
  basePath: '/portfolio',
  images: {
    unoptimized: true,
  },
  distDir: 'dist',
};

module.exports = nextConfig;