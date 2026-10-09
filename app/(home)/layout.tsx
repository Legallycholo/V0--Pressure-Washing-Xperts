import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { homeFaqItems } from "@/data/home-faq"
import { buildFaqPageJsonLd } from "@/lib/seo/json-ld-builders"
import { buildPublicMetadata } from "@/lib/seo/build-page-metadata"

export const metadata: Metadata = buildPublicMetadata({
  title: "Best Pressure Washing in Ellenwood, GA | House & Driveway",
  description:
    "Professional pressure washing in Ellenwood, GA. House washing, driveway cleaning, roof soft washing, and commercial exterior cleaning. Free quotes.",
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
