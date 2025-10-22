import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Update image configuration for v15
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iili.io'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com'
      },
      {
        protocol: 'https',
        hostname: 'docs.google.com'
      }
    ]
  },

  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  compiler:
    process.env.NODE_ENV === 'production'
      ? {
          removeConsole: true
        }
      : {},

  async rewrites() {
    return [];
  },

  async redirects() {
    return [];
  }
};

const withMDX = createMDX();

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
