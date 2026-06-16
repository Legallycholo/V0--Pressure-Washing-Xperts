"use client"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ctaPress } from "@/lib/ctaInteraction"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"

/**
 * Mid-page conversion banner. Call-first by design: leads with the phone
 * number and a tap-to-call button, with the quote form as a secondary path.
 */
interface CallBannerProps {
  onOpenQuoteForm: () => void
}

export function CallBanner({ onOpenQuoteForm }: CallBannerProps) {
  return (
    <section
      aria-label="Call Pressure Washing Xperts now"
      className="bg-gradient-to-br from-brand-blue-dark via-[#1a2942] to-brand-blue"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow">
          Same-Day Availability
        </p>
        <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Ready to get started? Call us now for instant pricing.
        </h2>

        <a
          href={businessPhoneTelHref}
          className={`group mt-5 inline-flex items-center gap-3 text-3xl font-extrabold tracking-tight text-brand-yellow sm:text-4xl lg:text-5xl hover:text-brand-yellow-dark transition-colors ${ctaPress}`}
          aria-label={`Call us now at ${businessPhoneDisplay}`}
        >
          <Phone className="size-7 shrink-0 sm:size-8" aria-hidden />
          {businessPhoneDisplay}
        </a>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className={`w-full sm:w-auto bg-brand-yellow text-brand-blue-dark font-bold text-base px-8 py-4 hover:bg-brand-yellow-dark shadow-lg min-h-[44px] ${ctaPress}`}
          >
            <a href={businessPhoneTelHref}>
              <Phone className="size-5 shrink-0" aria-hidden />
              Call {businessPhoneDisplay} Now
            </a>
          </Button>
          <Button
            type="button"
            onClick={onOpenQuoteForm}
            size="lg"
            className={`w-full sm:w-auto bg-transparent border-2 border-white/50 text-white font-semibold text-base px-8 py-4 hover:bg-white/10 hover:border-white min-h-[44px] ${ctaPress}`}
          >
            Get a Free Estimate
          </Button>
        </div>
      </div>
    </section>
  )
}
