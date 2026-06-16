"use client"

import { Fragment } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { contactIconDark, contactRowDark, ctaPress } from "@/lib/ctaInteraction"
import {
  businessAddress,
  businessHoursRows,
  businessMapsUrl,
  businessPhoneDisplay,
  businessPhoneTelHref,
} from "@/data/site"

export function ContactSection() {
  return (
    <section id="contact" className="scroll-offset-header py-12 bg-section-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-start xl:items-center">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-5">
            <p className="text-brand-yellow font-semibold text-sm uppercase tracking-wider mb-2">
              Contact Us
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl text-balance mb-4">
              Call Now for a Same-Day Free Quote
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-5">
              The fastest way to get pricing is to call — we answer 7 days a week and can often schedule same-day. Prefer to write? Send the form and we&apos;ll reach out to book your free on-site visit.
            </p>

            {/* Primary call CTA */}
            <a
              href={businessPhoneTelHref}
              className={`mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-yellow px-6 py-4 text-base font-bold text-brand-blue-dark shadow-lg transition-colors hover:bg-brand-yellow-dark sm:w-auto ${ctaPress}`}
              aria-label={`Call us now at ${businessPhoneDisplay}`}
            >
              <Phone className="size-5 shrink-0" aria-hidden />
              Call {businessPhoneDisplay} Now
            </a>

            {/* Contact Cards */}
            <div className="space-y-3 mb-6">
              {/* Phone */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href={businessPhoneTelHref} className={contactRowDark}>
                    <div className={`${contactIconDark} bg-brand-yellow text-brand-blue-dark`}>
                      <Phone className="size-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Call / Text</p>
                      <p className="text-white font-semibold text-base group-hover:text-brand-yellow transition-colors">
                        {businessPhoneDisplay}
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
              <div className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500 text-white">
                  <Clock className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/60 text-sm">Business Hours</p>
                  <details className="mt-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="cursor-pointer text-sm font-medium text-brand-yellow hover:text-brand-yellow/90 list-none">
                      See business hours
                    </summary>
                    <div className="mt-2 border-t border-white/10 pt-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/45 mb-2">
                        Hours
                      </p>
                      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs text-white/75">
                        {businessHoursRows.map(({ day, hours }) => (
                          <Fragment key={day}>
                            <dt className="text-white/55 whitespace-nowrap">{day}</dt>
                            <dd className="text-white/90 tabular-nums">{hours}</dd>
                          </Fragment>
                        ))}
                      </dl>
                    </div>
                  </details>
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
          </div>

          {/* Right Column - Contact form */}
          <div className="lg:col-span-7 lg:pl-5 xl:pl-8 2xl:pl-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
