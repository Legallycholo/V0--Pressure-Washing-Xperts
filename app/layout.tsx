import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"
import "./globals.css"
import { JsonLd } from "@/components/seo/JsonLd"
import { AppProviders } from "@/components/providers/AppProviders"
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
        <Script id="visitor-page-view-tracker" strategy="afterInteractive">
          {`
            fetch('https://n8n-saj4epyyuy1nu2l56qftkiqw.35.231.35.143.sslip.io/webhook/pressureactivelead-visitor', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                event_name: 'page_view',
                page_location: window.location.href,
                page_title: document.title,
                city: '',
                country: '',
                device_category: /Mobi/.test(navigator.userAgent) ? 'mobile' : 'desktop',
                timestamp: new Date().toISOString()
              })
            });
          `}
        </Script>
        <Analytics />
        <SpeedInsights />
        <VoiceflowChat />
      </body>
    </html>
  )
}
