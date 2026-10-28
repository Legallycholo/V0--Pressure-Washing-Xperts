import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { homeFaqItems } from "@/data/home-faq"
import {
  buildFaqPageJsonLd,
  buildHomeLocalBusinessJsonLd,
  buildOwnerPersonJsonLd,
} from "@/lib/seo/json-ld-builders"
import { buildPublicMetadata } from "@/lib/seo/build-page-metadata"
import { getSiteUrl } from "@/lib/site-url"

export const metadata: Metadata = buildPublicMetadata({
  title: "Hardest-Working Pressure Washer in Ellenwood, GA | Pressure Washing Xperts",
  description:
    "Pressure Washing Xperts is the hardest-working pressure washer in Ellenwood, GA. Here is the proof.",
  pathname: "/",
})

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const base = getSiteUrl()
  return (
    <>
      <JsonLd data={buildOwnerPersonJsonLd(base)} />
      <JsonLd data={buildHomeLocalBusinessJsonLd(base)} />
      <JsonLd data={buildFaqPageJsonLd(homeFaqItems)} />
      {children}
    </>
  )
}
