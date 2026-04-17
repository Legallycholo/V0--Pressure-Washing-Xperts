import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { getMarketingRoute } from "@/data/marketing-route-seo"
import { buildBreadcrumbListJsonLd } from "@/lib/seo/json-ld-builders"
import { buildPublicMetadata } from "@/lib/seo/build-page-metadata"
import { getSiteUrl } from "@/lib/site-url"

const gallerySeo = getMarketingRoute("/gallery")
if (!gallerySeo) {
  throw new Error("Missing /gallery marketing SEO entry")
}
const gallery = gallerySeo

export const metadata: Metadata = buildPublicMetadata({
  title: gallery.title,
  description: gallery.description,
  pathname: "/gallery",
})

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  const base = getSiteUrl()
  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd(base, gallery.breadcrumbs)} />
      {children}
    </>
  )
}
