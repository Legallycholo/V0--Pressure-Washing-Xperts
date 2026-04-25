"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

const N8N_VISITOR_WEBHOOK =
  "https://n8n-saj4epyyuy1nu2l56qftkiqw.35.231.35.143.sslip.io/webhook/pressureactivelead-visitor"

function VisitorN8nTrackerInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    void fetch(N8N_VISITOR_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: window.location.href,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
      }),
    })
  }, [pathname, searchParams])

  return null
}

export function VisitorN8nTracker() {
  return (
    <Suspense fallback={null}>
      <VisitorN8nTrackerInner />
    </Suspense>
  )
}
