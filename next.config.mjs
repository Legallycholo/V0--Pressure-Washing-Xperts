/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: "./",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/services/residential/landscape-features",
        destination: "/services/residential",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
