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
  title: "Pressure Washing Xperts | #1 Pressure Washing in Ellenwood & Metro Atlanta",
  description:
    "Professional pressure washing, roof cleaning, and gutter services in Ellenwood, GA. 15+ years experience. Licensed & Insured. Get a free estimate today!",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/site-tab-icon.png?v=2", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
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
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Pressure Washing Xperts",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2193 Gateway Trl",
      addressLocality: "Ellenwood",
      addressRegion: "GA",
      postalCode: "30294",
      addressCountry: "US",
    },
    telephone: "(800) 451-7213",
    url: "https://pressurewashingxpert.com",
    areaServed: ["Ellenwood, GA", "Metro Atlanta"],
    serviceType: [
      "Pressure Washing",
      "Roof Cleaning",
      "Gutter Cleaning",
      "Soft Washing",
    ],
  }
  return (
    <html lang="en">
      <head>
        <Script
          id="localbusiness-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EK4M4BMN05"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-gtag" strategy="afterInteractive">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-EK4M4BMN05', {
    send_page_view: true
  });
`}</Script>
        <Script id="active-lead-activity" strategy="afterInteractive">{`
(function() {
  var hasFired = false;

  function triggerActivityEmail(reason) {
    if (hasFired) return;
    hasFired = true;

    function send(gaId) {
      fetch('/api/active-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ga_id: gaId != null ? String(gaId) : '',
          url: window.location.href,
          trigger_reason: reason,
          referrer: document.referrer
        })
      }).catch(function() {});
    }

    if (typeof gtag !== 'function') {
      send('');
      return;
    }

    gtag('get', 'G-EK4M4BMN05', 'client_id', function(ga_id) {
      send(ga_id);
    });
  }

  setTimeout(function() {
    triggerActivityEmail('Time on site > 60s');
  }, 60000);
})();
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
        <AppProviders>{children}</AppProviders>
        <Analytics />
        <SpeedInsights />
        <VoiceflowChat />
      </body>
    </html>
  )
}
