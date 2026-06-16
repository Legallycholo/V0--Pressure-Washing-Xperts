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
            <p className="text-ps-cyan font-semibold text-sm uppercase tracking-[0.28em] mb-2">
              Contact Us
            </p>
            <h2 className="font-display uppercase tracking-wide text-white text-4xl sm:text-5xl lg:text-6xl mb-4">
              Ready to <span className="text-ps-cyan text-glow-cyan">Get Started?</span>
            </h2>
            <p className="text-ps-text-muted text-base leading-relaxed mb-3">
              The fastest way to get pricing is to call — we answer 7 days a week and can often schedule same-day. Prefer to write? Send the form and we&apos;ll reach out to book your free on-site visit.
            </p>

            {/* Glowing phone number */}
            <a
              href={businessPhoneTelHref}
              className={`group inline-flex items-center gap-2 font-display tracking-wide text-ps-cyan text-glow-cyan hover:text-brand-yellow-dark transition-colors ${ctaPress}`}
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
              aria-label={`Call us now at ${businessPhoneDisplay}`}
            >
              <Phone className="size-6 shrink-0 sm:size-7" aria-hidden />
              {businessPhoneDisplay}
            </a>
            <p className="mt-1 mb-5 text-sm text-ps-text-muted">Mon–Sun · 8:00 AM – 10:00 PM ET</p>

            {/* Primary call CTA */}
            <a
              href={businessPhoneTelHref}
              className={`animate-cyan-pulse mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-ps-cyan px-6 py-4 font-display tracking-widest text-lg text-[#06121f] shadow-lg transition-colors hover:bg-brand-yellow-dark sm:w-auto ${ctaPress}`}
              aria-label={`Call us now at ${businessPhoneDisplay}`}
            >
              <Phone className="size-5 shrink-0" aria-hidden />
              CALL {businessPhoneDisplay} NOW
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
