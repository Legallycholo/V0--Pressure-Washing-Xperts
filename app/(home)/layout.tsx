import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { homeFaqItems } from "@/data/home-faq"
import { buildFaqPageJsonLd } from "@/lib/seo/json-ld-builders"
import { buildPublicMetadata } from "@/lib/seo/build-page-metadata"

export const metadata: Metadata = buildPublicMetadata({
  title: "Pressure Washing Xperts | Metro Atlanta Pressure & Soft Washing",
  description:
    "Licensed, insured pressure washing and soft washing for homes and businesses across Metro Atlanta—driveways, siding, roofs, storefronts, and fleet-ready plans.",
  pathname: "/",
})

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={buildFaqPageJsonLd(homeFaqItems)} />
      {children}
    </>
  )
}
