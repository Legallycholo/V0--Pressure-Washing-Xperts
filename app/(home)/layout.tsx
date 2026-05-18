import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { homeFaqItems } from "@/data/home-faq"
import { buildFaqPageJsonLd } from "@/lib/seo/json-ld-builders"
import { buildPublicMetadata } from "@/lib/seo/build-page-metadata"

export const metadata: Metadata = buildPublicMetadata({
  title:
    "Pressure Washing Near Me | Ellenwood, GA & Metro Atlanta | Pressure Washing Xperts",
  description:
    "Professional pressure washing in Ellenwood, GA and Metro Atlanta. House washing, driveway cleaning, roof soft wash, decks, and commercial. Licensed & insured. Free quotes — call (800) 451-7213.",
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
