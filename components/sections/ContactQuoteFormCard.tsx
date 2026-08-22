"use client"

import { ContactForm } from "@/components/ContactForm"
import { cn } from "@/lib/utils"

/** Shared form card used by older service templates. */
export function ContactQuoteFormCard({
  className,
  successRedirectHref,
}: {
  className?: string
  successRedirectHref?: string
}) {
  return (
    <div className={cn("relative w-full min-w-0", className)}>
      <div
        id="contact-form"
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-blue to-section-dark-alt p-4 shadow-2xl sm:p-5"
      >
        <ContactForm className="pt-2" successRedirectHref={successRedirectHref} />
      </div>
    </div>
  )
}
