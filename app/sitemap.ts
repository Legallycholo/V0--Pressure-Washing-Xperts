import type { MetadataRoute } from "next"
import { MARKETING_ROUTE_SEO } from "@/data/marketing-route-seo"
import { serviceAreaContent } from "@/data/service-areas"
import { SITE_CONTENT_LAST_UPDATED_ISO } from "@/data/site-content-version"
import { getSiteUrl } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const staticLastMod = new Date(`${SITE_CONTENT_LAST_UPDATED_ISO}T12:00:00.000Z`)

  const entries: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 1,
    },
  ]

  for (const path of Object.keys(MARKETING_ROUTE_SEO)) {
    entries.push({
      url: `${base}${path}`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: path.startsWith("/services") ? 0.8 : 0.65,
    })
  }

  for (const city of serviceAreaContent) {
    entries.push({
      url: `${base}/service-areas/${city.slug}`,
      lastModified: new Date(`${city.lastUpdatedIso}T12:00:00.000Z`),
      changeFrequency: "monthly",
      priority: 0.75,
    })
  }

  return entries
}
