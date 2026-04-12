"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { ContactQuoteForm, type QuoteFormCopy } from "@/components/ContactQuoteForm"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { contactIconDark, contactRowDark, ctaPress } from "@/lib/ctaInteraction"
import { modalCopyDefault, modalCopyOfferIntent } from "@/data/modalCopy"
import { isOfferId } from "@/data/offers"
import { businessAddress, businessMapsUrl } from "@/data/site"

const inlineQuoteCopy = {
  ...modalCopyDefault,
  headline: "Request a Fast Quote",
  subline: "",
  submitLabel: "Submit Request",
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

export function ContactSection() {
  return (
    <section id="contact" className="scroll-offset-header py-20 bg-section-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Column - Contact Info */}
          <div>
            <p className="text-brand-yellow font-semibold text-sm uppercase tracking-wider mb-3">
              Contact Us
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              {"Let's"} transform your property! Contact us today for a free quote or call us directly.
              {"We're"} here to answer any questions you may have.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4 mb-8">
              {/* Phone */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="tel:800-451-7213" className={contactRowDark}>
                    <div className={`${contactIconDark} bg-brand-yellow text-brand-blue-dark`}>
                      <Phone className="size-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Call / Text</p>
                      <p className="text-white font-semibold text-lg group-hover:text-brand-yellow transition-colors">
                        (800)-451-7213
                      </p>
                    </div>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">Tap to call from your phone</TooltipContent>
              </Tooltip>

              {/* Email */}
              <a
                href="mailto:pressurewashingxperts@gmail.com"
                className={contactRowDark}
              >
                <div className={`${contactIconDark} bg-brand-blue-light text-white`}>
                  <Mail className="size-6" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email Us</p>
                  <p className="text-white font-semibold group-hover:text-brand-yellow transition-colors">
                    pressurewashingxperts@gmail.com
                  </p>
                </div>
              </a>

              {/* Hours */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white">
                  <Clock className="size-6" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Business Hours</p>
                  <p className="text-white font-semibold">
                    Mon - Sat: 7:00 AM - 7:00 PM
                  </p>
                </div>
              </div>

              {/* Service Area / Address */}
              <a
                href={businessMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={contactRowDark}
              >
                <div className={`${contactIconDark} shrink-0 bg-brand-silver text-brand-blue-dark`}>
                  <MapPin className="size-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-white/60 text-sm">Location</p>
                  <p className="text-white font-semibold group-hover:text-brand-yellow transition-colors">
                    {businessAddress}
                  </p>
                </div>
              </a>
            </div>

            <a
              href="tel:800-451-7213"
              className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white border border-white/60 rounded-md hover:border-white hover:bg-white/10 transition-all font-sans ${ctaPress}`}
            >
              <Phone className="size-4 shrink-0" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Right Column - Quote form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 to-brand-blue-light/20 rounded-3xl rotate-3" />

            <div
              id="contact-form"
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-brand-blue to-section-dark-alt p-6 sm:p-8 max-h-[min(90vh,52rem)] overflow-y-auto"
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
        </div>
      </div>
    </section>
  )
}
