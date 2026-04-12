"use client"

import { useCallback, useEffect, useState } from "react"
import { X } from "lucide-react"
import { offers } from "@/data/offers"
import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

const ROTATE_MS = 10_000
const SESSION_DISMISS_KEY = "pwx_offer_announcement_dismissed"

export function OfferAnnouncementBar() {
  const goQuote = useGoToHomeQuoteSection()
  const [index, setIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_DISMISS_KEY) === "1") {
        setDismissed(true)
      }
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % offers.length)
    }, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  const offer = offers[index]

  const handleActivate = useCallback(() => {
    goQuote({ target: "contact", offerId: offer.id })
  }, [goQuote, offer.id])

  const handleDismiss = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      sessionStorage.setItem(SESSION_DISMISS_KEY, "1")
    } catch {
      /* ignore */
    }
    setDismissed(true)
  }, [])

  if (dismissed) {
    return null
  }

  return (
    <div className="border-b border-white/10 bg-[#070f18]">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex min-h-[var(--announcement-bar-height)] items-stretch">
          <button
            type="button"
            onClick={handleActivate}
            className="flex min-w-0 flex-1 items-center justify-center gap-2 py-2 pr-1 text-left text-xs text-white/90 transition-colors hover:bg-white/5 sm:justify-between sm:text-sm"
            aria-label={`Claim offer: ${offer.discount} ${offer.title}. Opens quote form on the home page.`}
          >
            <span className="min-w-0 flex-1 truncate text-center sm:text-left">
              <span className="font-semibold text-brand-yellow">{offer.discount}</span>
              <span className="text-white/35"> — </span>
              <span>{offer.title}</span>
            </span>
            <span className="hidden shrink-0 font-semibold text-brand-yellow sm:inline">
              Claim
            </span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="flex shrink-0 items-center justify-center px-2.5 text-white/55 transition-colors hover:bg-white/10 hover:text-white sm:px-3"
            aria-label="Close announcement"
          >
            <X className="size-4 sm:size-[1.125rem]" strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}
