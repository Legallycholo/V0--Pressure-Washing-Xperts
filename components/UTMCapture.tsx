"use client"

import { useEffect } from "react"
import { captureUTMs } from "@/lib/analytics"

/**
 * Mount-once helper that captures UTM + gclid params from the landing URL
 * into sessionStorage. Rendered inside the root layout's <AppProviders> so it
 * runs as soon as the client hydrates.
 */
export function UTMCapture() {
  useEffect(() => {
    captureUTMs()
  }, [])
  return null
}
