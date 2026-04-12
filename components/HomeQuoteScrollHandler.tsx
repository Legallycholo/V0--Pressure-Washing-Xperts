"use client"

import { useEffect } from "react"

/**
 * Ensures /#hero and /#contact scroll into view after client-side navigation to `/`
 * (fixed header + SPA transitions do not always match native hash scrolling).
 */
export function HomeQuoteScrollHandler() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace(/^#/, "")
      if (id === "hero" || id === "contact") {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }, 80)
      }
    }

    scrollToHash()
    window.addEventListener("hashchange", scrollToHash)
    return () => window.removeEventListener("hashchange", scrollToHash)
  }, [])

  return null
}
