import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Absolute root avoids Turbopack path bugs (e.g. Windows dirs with spaces). */
  turbopack: {
    root: projectRoot,
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
