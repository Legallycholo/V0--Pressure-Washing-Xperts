"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Phone, MessageSquareText } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function FloatingCallButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const barClass =
    "fixed bottom-6 left-4 right-4 z-40 flex gap-3 md:hidden transition-all duration-300 motion-reduce:transition-opacity"

  return (
    <div
      className={`${barClass} ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-20 opacity-0"
      }`}
      aria-hidden={!isVisible}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="tel:800-451-7213"
            className="animate-float-cta-ring motion-reduce:animate-none relative flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-yellow px-4 py-3 text-sm font-bold text-brand-blue-dark shadow-lg transition-transform duration-200 hover:bg-brand-yellow-dark active:scale-[0.97] motion-reduce:active:scale-100"
            aria-label="Call us now"
          >
            <Phone className="size-5 shrink-0" />
            <span>Call</span>
          </a>
        </TooltipTrigger>
        <TooltipContent side="top">Tap to call — we answer 7 days a week</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/#contact"
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-brand-blue-dark px-4 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:border-white hover:bg-brand-blue active:scale-[0.97] motion-reduce:active:scale-100"
            aria-label="Request a free quote"
          >
            <MessageSquareText className="size-5 shrink-0" />
            <span>Quote</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="top">Free quote — no obligation</TooltipContent>
      </Tooltip>
    </div>
  )
}
