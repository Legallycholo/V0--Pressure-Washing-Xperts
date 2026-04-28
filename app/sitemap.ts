import type { MetadataRoute } from "next"
import { MARKETING_ROUTE_SEO } from "@/data/marketing-route-seo"
import { serviceAreaContent } from "@/data/service-areas"
import { SITE_CONTENT_LAST_UPDATED_ISO } from "@/data/site-content-version"
import { absoluteUrl } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticLastModIso = new Date(
    `${SITE_CONTENT_LAST_UPDATED_ISO}T12:00:00.000Z`
  ).toISOString()

  const entries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: staticLastModIso,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ]

  for (const path of Object.keys(MARKETING_ROUTE_SEO)) {
    entries.push({
      url: absoluteUrl(path),
      lastModified: staticLastModIso,
      changeFrequency: "monthly",
      priority: path.startsWith("/services") ? 0.8 : 0.65,
    })
  }

  for (const city of serviceAreaContent) {
    entries.push({
      url: absoluteUrl(`/service-areas/${city.slug}`),
      lastModified: new Date(`${city.lastUpdatedIso}T12:00:00.000Z`).toISOString(),
      changeFrequency: "monthly",
      priority: 0.75,
    })
  }

  return entries
}
