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
      /**
       * Force the canonical production domain. Anyone (incl. Googlebot) hitting a
       * known *.vercel.app alias is 301'd to www.pressurewashingxpert.com so the
       * staging URLs get de-indexed. Scoped to specific hosts so per-deployment
       * preview URLs keep working.
       */
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "pressurewashingxperts\\.vercel\\.app",
          },
        ],
        destination: "https://www.pressurewashingxpert.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value:
              "v0-pressure-washing-xperts-legallycholo3-6791s-projects\\.vercel\\.app",
          },
        ],
        destination: "https://www.pressurewashingxpert.com/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
