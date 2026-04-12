"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ContactQuoteForm, type QuoteFormCopy } from "@/components/sections/ContactQuoteForm"
import { modalCopyDefault, modalCopyOfferIntent } from "@/data/modalCopy"
import { isOfferId } from "@/data/offers"
import { cn } from "@/lib/utils"

const inlineQuoteCopy = {
  ...modalCopyDefault,
} satisfies QuoteFormCopy

function ContactQuoteFormWithOfferFromUrl() {
  const searchParams = useSearchParams()
  const offerRaw = searchParams.get("offer")
  const initialOfferId = isOfferId(offerRaw) ? offerRaw : undefined
  const copy: QuoteFormCopy = initialOfferId
    ? { ...inlineQuoteCopy, ...modalCopyOfferIntent }
    : inlineQuoteCopy

  return (
    <ContactQuoteForm
      key={offerRaw ?? "default"}
      variant="inline"
      copy={copy}
      showOfferSelect
      initialOfferId={initialOfferId}
      className="pt-2"
    />
  )
}

/** Same quote form card as the homepage contact section (right column). */
export function ContactQuoteFormCard({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full min-w-0", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 to-brand-blue-light/20 rounded-3xl rotate-3" />

      <div
        id="contact-form"
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-brand-blue to-section-dark-alt p-4 sm:p-5 max-h-[min(88vh,44rem)] overflow-y-auto"
      >
        <Suspense
          fallback={
            <ContactQuoteForm
              variant="inline"
              copy={inlineQuoteCopy}
              showOfferSelect
              className="pt-2"
            />
          }
        >
          <ContactQuoteFormWithOfferFromUrl />
        </Suspense>
      </div>
    </div>
  )
}
