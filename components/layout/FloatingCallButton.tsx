"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"

/** Mobile-only sticky action bar that slides in once the visitor scrolls past the hero. */
export function FloatingCallButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-white/95 px-3 pt-2 pb-safe shadow-[0_-8px_24px_-12px_rgba(11,34,57,0.25)] backdrop-blur-md transition-all duration-300 motion-reduce:transition-opacity md:hidden",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      )}
      aria-hidden={!isVisible}
    >
      <a
        href={businessPhoneTelHref}
        tabIndex={isVisible ? undefined : -1}
        className="flex min-h-12 flex-[1.4] items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 text-sm font-semibold text-white active:scale-[0.98]"
        aria-label={`Call us now at ${businessPhoneDisplay}`}
      >
        <Phone className="size-4 shrink-0" aria-hidden />
        Call {businessPhoneDisplay}
      </a>
      <Link
        href="/contact"
        tabIndex={isVisible ? undefined : -1}
        className="flex min-h-12 flex-1 items-center justify-center rounded-lg border border-input bg-white px-4 text-sm font-semibold text-brand-blue-dark active:scale-[0.98]"
      >
        Free quote
      </Link>
    </div>
  )
}
