import type { Metadata } from "next"
import Script from "next/script"
import { marketingRouteExports } from "@/lib/seo/create-marketing-route-layout"

const { metadata: baseMetadata, Layout: MarketingLayout } =
  marketingRouteExports("/thank-you")

/**
 * Conversion confirmation should never compete with the homepage for ranking
 * and must stay out of Google's index. `follow` is kept so internal link equity
 * (back-to-home link) still flows.
 */
export const metadata: Metadata = {
  ...baseMetadata,
  robots: { index: false, follow: true },
}

/**
 * Google Ads lead-form conversion fires only on this route.
 * Root layout already loads gtag (GA4 + AW config); this inline call runs after interactive
 * so `gtag` is defined (DOM order: root gtag scripts precede route-level `afterInteractive` scripts).
 */
export default function ThankYouLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Script id="google-ads-lead-form-conversion" strategy="afterInteractive">{`
gtag('event', 'conversion', {
  'send_to': 'AW-18151841356/dGq1CMSB5KocEMy8vM9D',
  'value': 1.0,
  'currency': 'USD'
});
`}</Script>
      <MarketingLayout>{children}</MarketingLayout>
    </>
  )
}
