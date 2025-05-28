/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable optimizations for Next.js 15
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  images: {
    domains: ['placehold.co'],
  },
  // Ensure compatibility with the latest features
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  // Improve hydration
  reactStrictMode: true
};

module.exports = nextConfig; 