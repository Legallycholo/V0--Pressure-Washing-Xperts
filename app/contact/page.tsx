import type { Metadata } from "next"
import { redirect } from "next/navigation"

/**
 * `/contact` historically appeared in Google Ads sitelinks and external links
 * but the site only ships a `#contact` section on the homepage. This redirect
 * keeps those links working without diluting the homepage canonical.
 */
export const metadata: Metadata = {
  title:
    "Contact Pressure Washing Xperts | Free Quote | Ellenwood, GA & Metro Atlanta",
  description:
    "Get a free pressure washing quote in Ellenwood, GA and Metro Atlanta. Call (800) 451-7213 or fill out our quick online form. Licensed & insured.",
  robots: { index: false, follow: true },
}

export default function ContactPage() {
  redirect("/#contact")
}
