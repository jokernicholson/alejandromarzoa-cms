/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: ['mongoose', 'aws4'],
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: '/api/media/file/:path*',
      },
    ]
  },
}

export default nextConfig