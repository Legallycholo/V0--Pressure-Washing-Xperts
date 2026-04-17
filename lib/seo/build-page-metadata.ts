import type { Metadata } from "next"
import { businessLegalName } from "@/data/site"
import { absoluteUrl, getSiteUrl } from "@/lib/site-url"

const defaultOgPath = "/icon.svg"

export function buildPublicMetadata(input: {
  title: string
  description: string
  pathname: string
}): Metadata {
  const base = getSiteUrl()
  const canonical = absoluteUrl(input.pathname)
  const ogImageUrl = new URL(defaultOgPath, base).toString()
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: businessLegalName,
      url: canonical,
      title: input.title,
      description: input.description,
      images: [{ url: ogImageUrl, alt: businessLegalName }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [ogImageUrl],
    },
  }
}
