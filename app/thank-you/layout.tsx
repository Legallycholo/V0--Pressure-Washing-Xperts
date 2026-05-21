import type { Metadata } from "next"
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

export default function ThankYouLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MarketingLayout>{children}</MarketingLayout>
}
