"use client"

import Link from "next/link"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ctaPress } from "@/lib/ctaInteraction"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"

/**
 * Mid-page conversion banner. Call-first by design: leads with the phone
 * number and a tap-to-call button, with the quote form as a secondary path.
 */
interface CallBannerProps {
  onOpenQuoteForm?: () => void
}

export function CallBanner({ onOpenQuoteForm }: CallBannerProps = {}) {
  return (
    <section
      aria-label="Call Pressure Washing Xperts now"
      className="relative overflow-hidden bg-[#0A0F1E]"
    >
      {/* cyan glow accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-ps-cyan/15 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ps-cyan/60 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ps-cyan">
          Same-Day Availability
        </p>
        <h2 className="mt-3 font-display uppercase tracking-wide text-white text-3xl sm:text-4xl lg:text-5xl">
          Ready to get started? Call now for{" "}
          <span className="text-ps-cyan text-glow-cyan">instant pricing</span>.
        </h2>

        <a
          href={businessPhoneTelHref}
          className={`group mt-6 inline-flex items-center gap-3 font-display tracking-wide text-ps-cyan text-glow-cyan hover:text-brand-yellow-dark transition-colors ${ctaPress}`}
          style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}
          aria-label={`Call us now at ${businessPhoneDisplay}`}
        >
          <Phone className="size-8 shrink-0 sm:size-10" aria-hidden />
          {businessPhoneDisplay}
        </a>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className={`animate-cyan-pulse w-full sm:w-auto bg-ps-cyan text-[#06121f] font-display tracking-wide sm:tracking-widest text-base sm:text-lg px-4 sm:px-8 py-5 hover:bg-brand-yellow-dark min-h-[48px] ${ctaPress}`}
          >
            <a href={businessPhoneTelHref}>
              <Phone className="size-5 shrink-0" aria-hidden />
              CALL {businessPhoneDisplay} NOW
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className={`w-full sm:w-auto bg-transparent border-2 border-ps-cyan/60 text-ps-cyan font-semibold text-base px-8 py-4 hover:bg-ps-cyan/10 hover:border-ps-cyan min-h-[48px] ${ctaPress}`}
          >
<<<<<<< HEAD
            <Link href="/contact">Request Callback</Link>
=======
            Request Callback
>>>>>>> origin/main
          </Button>
        </div>
      </div>
    </section>
  )
}
