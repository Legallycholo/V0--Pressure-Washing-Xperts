import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter, Bebas_Neue } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas",
})
import { JsonLd } from "@/components/seo/JsonLd"
import { AppProviders } from "@/components/providers/AppProviders"
import { ChrisChatWidget } from "@/components/ChrisChatWidget"
import { businessLegalName } from "@/data/site"
import {
  buildGlobalJsonLdGraph,
  defaultLogoAbsoluteUrl,
} from "@/lib/seo/json-ld-builders"
import { getSiteUrl } from "@/lib/site-url"
import { UTMCapture } from "@/components/UTMCapture"

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: "Pressure Washing Services in Ellenwood & Atlanta, GA | Pressure Washing Xperts",
  description:
    "Pressure Washing Xperts offers professional pressure washing, soft washing, house washing, driveway cleaning, and roof cleaning in Ellenwood, GA and Metro Atlanta. Over 15 years of experience. Call (800) 451-7213.",
  keywords: [
    "pressure washing near me",
    "pressure washing services",
    "house washing near me",
    "soft washing",
    "pressure washing Ellenwood GA",
    "pressure washing Atlanta",
    "driveway cleaning near me",
    "roof cleaning near me",
    "residential pressure washing",
    "power washing near me",
  ],
  icons: {
    icon: [
      { url: "/site-tab-icon.png?v=3", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/site-tab-icon.png?v=3"],
    apple: "/site-tab-icon.png?v=3",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: businessLegalName,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "geo.region": "US-GA",
    "geo.placename": "Ellenwood, Georgia",
    "geo.position": "33.5965;-84.2916",
    "ICBM": "33.5965, -84.2916",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const base = getSiteUrl()
  const logoUrl = defaultLogoAbsoluteUrl(base)
  const isProduction = process.env.VERCEL_ENV === "production"
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable}`}>
      <body className="font-sans antialiased">
        {/* Google tag: loads GA4 + Google Ads, production only (skipped on Vercel previews) */}
        {isProduction && (
          <>
            <Script
              strategy="afterInteractive"
              src="https://www.googletagmanager.com/gtag/js?id=G-EK4M4BMN05"
            />
            <Script id="google-tag" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EK4M4BMN05');
          gtag('config', 'AW-18151841356');
        `}</Script>
          </>
        )}
        <Script id="active-lead-activity" strategy="afterInteractive">{`
if (typeof window !== 'undefined') {
  const startTime = Date.now();
  let hasFired = false;

  const triggerActivityEmail = (reason) => {
    if (hasFired) return;
    hasFired = true;

    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);

    fetch('/api/active-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: window.location.href,
        trigger_reason: reason,
        time_spent: \`\${timeSpentSeconds} seconds\`,
        referrer: document.referrer
      }),
    });
  };

  setTimeout(() => triggerActivityEmail('High Engagement Timer'), 60000);
}
`}</Script>
        <Script id="visitor-tracker" strategy="afterInteractive">{`
  (function() {
    var webhookUrl = 'https://n8n-saj4epyyuy1nu2l56qftkiqw.35.231.35.143.sslip.io/webhook/Pressureactivelead';
    if (!sessionStorage.getItem('visitor_notified')) {
      var now = new Date();
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: window.location.href,
          referrer: document.referrer || 'Direct',
          timestamp: now.toISOString(),
          localTime: now.toLocaleString('en-US', { timeZone: 'America/New_York', hour12: true }),
          device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
          browser: navigator.userAgent,
          screenResolution: window.screen.width + 'x' + window.screen.height,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        })
      }).catch(function() {});
      sessionStorage.setItem('visitor_notified', 'true');
    }
  })();
`}</Script>
        <JsonLd data={buildGlobalJsonLdGraph(base, logoUrl)} />
        <UTMCapture />
        <AppProviders>
          {children}
        </AppProviders>
        <ChrisChatWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
