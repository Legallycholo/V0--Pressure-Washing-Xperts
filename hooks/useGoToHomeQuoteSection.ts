"use client"

import { useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import type { OfferId } from "@/data/offers"

export type HomeQuoteTarget = "hero" | "contact"

function scrollToHomeSection(sectionId: "hero" | "contact") {
  if (typeof document === "undefined") return
  setTimeout(() => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, 50)
}

/**
 * Navigates to the homepage and scrolls to the hero or contact (quote) section.
 * Optional `offerId` is passed as `?offer=` for the contact form.
 */
export function useGoToHomeQuoteSection() {
  const pathname = usePathname()
  const router = useRouter()

  return useCallback(
    (opts?: { target?: HomeQuoteTarget; offerId?: OfferId }) => {
      const target = opts?.target ?? "contact"
      const sectionId = target === "hero" ? "hero" : "contact"
      const offer = opts?.offerId

      const path = offer
        ? `/?offer=${encodeURIComponent(offer)}#${sectionId}`
        : `/#${sectionId}`

      if (pathname === "/") {
        window.history.replaceState(null, "", path)
        scrollToHomeSection(sectionId)
      } else {
        router.push(path)
      }
    },
    [pathname, router]
  )
}
