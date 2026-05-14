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
(function(){
  /* sessionStorage key must stay in sync with lib/analytics.ts (STORAGE_KEY = "utm_params") */
  var params = {};
  try {
    var stored = sessionStorage.getItem('utm_params');
    if (stored) {
      var u = JSON.parse(stored);
      ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'].forEach(function(k){
        if (u && typeof u[k] === 'string' && u[k]) params[k] = u[k];
      });
    }
  } catch(e) {}
  if (typeof gtag === 'function') {
    gtag('event', 'generate_lead', Object.assign({}, params, {
      currency: 'USD',
      value: 1.0
    }));
    gtag('event', 'conversion', Object.assign({}, params, {
      send_to: 'AW-18151841356/dGq1CMSB5KocEMy8vM9D',
      value: 1.0,
      currency: 'USD'
    }));
  }
})();
`}</Script>
      <MarketingLayout>{children}</MarketingLayout>
    </>
  )
}
