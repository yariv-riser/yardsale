/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'u6m9mrobxz8mn5em.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig;
