import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { JsonLd } from "@/components/seo/JsonLd"
import { AppProviders } from "@/components/providers/AppProviders"
import { VisitorN8nTracker } from "@/components/VisitorN8nTracker"
import { VoiceflowChat } from "@/components/VoiceflowChat"
import { businessLegalName } from "@/data/site"
import {
  buildGlobalJsonLdGraph,
  defaultLogoAbsoluteUrl,
} from "@/lib/seo/json-ld-builders"
import { getSiteUrl } from "@/lib/site-url"

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${businessLegalName} | Metro Atlanta`,
  description:
    "Professional pressure washing and soft washing for Metro Atlanta homes and businesses—exteriors, concrete, roofs, and commercial properties.",
  icons: {
    icon: [{ url: "/site-tab-icon.png", type: "image/png" }],
    shortcut: ["/site-tab-icon.png"],
    apple: "/site-tab-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: businessLegalName,
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const base = getSiteUrl()
  const logoUrl = defaultLogoAbsoluteUrl(base)
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <JsonLd data={buildGlobalJsonLdGraph(base, logoUrl)} />
        <AppProviders>{children}</AppProviders>
        <VisitorN8nTracker />
        <Analytics />
        <SpeedInsights />
        <VoiceflowChat />
      </body>
    </html>
  )
}
