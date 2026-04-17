import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-url"

/**
 * Preview deployments: disallow indexing. Production and local dev: allow + sitemap link.
 * `VERCEL_ENV` is `preview` on Vercel preview deployments.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl()

  if (process.env.VERCEL_ENV === "preview") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    host: new URL(base).hostname,
  }
}
