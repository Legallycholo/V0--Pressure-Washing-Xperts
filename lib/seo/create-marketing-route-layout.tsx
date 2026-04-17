import type { Metadata } from "next"
import type { ReactNode } from "react"
import { JsonLd } from "@/components/seo/JsonLd"
import {
  getMarketingRoute,
  type MarketingRouteDefinition,
} from "@/data/marketing-route-seo"
import {
  buildBreadcrumbListJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo/json-ld-builders"
import { buildPublicMetadata } from "@/lib/seo/build-page-metadata"
import { getSiteUrl } from "@/lib/site-url"

export function marketingRouteExports(pathname: string): {
  metadata: Metadata
  Layout: ({ children }: { children: ReactNode }) => ReactNode
} {
  const found = getMarketingRoute(pathname)
  if (!found) {
    throw new Error(`Missing marketing route SEO for ${pathname}`)
  }
  const seo: MarketingRouteDefinition = found

  const metadata = buildPublicMetadata({
    title: seo.title,
    description: seo.description,
    pathname,
  })

  function MarketingRouteLayout({ children }: { children: ReactNode }) {
    const base = getSiteUrl()
    return (
      <>
        <JsonLd data={buildBreadcrumbListJsonLd(base, seo.breadcrumbs)} />
        {seo.service ? (
          <JsonLd
            data={buildServiceJsonLd(
              base,
              pathname,
              seo.service.name,
              seo.service.description
            )}
          />
        ) : null}
        {children}
      </>
    )
  }

  return { metadata, Layout: MarketingRouteLayout }
}
