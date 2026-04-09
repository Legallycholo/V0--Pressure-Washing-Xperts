"use client"

import Image from "next/image"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactSectionProps {
  onOpenQuoteForm: () => void
}

export function ContactSection({ onOpenQuoteForm }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 bg-section-dark">
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
              <a
                href="tel:800-451-7213"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-yellow text-brand-blue-dark">
                  <Phone className="size-6" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Call / Text</p>
                  <p className="text-white font-semibold text-lg group-hover:text-brand-yellow transition-colors">
                    (800)-451-7213
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:pressurewashingxperts@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-light text-white">
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

              {/* Service Area */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-silver text-brand-blue-dark">
                  <MapPin className="size-6" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Service Area</p>
                  <p className="text-white font-semibold">
                    Serving Your Local Area
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={onOpenQuoteForm}
              size="lg"
              className="w-full sm:w-auto bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark text-lg px-8"
            >
              Get a Free Quote Today
            </Button>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 to-brand-blue-light/20 rounded-3xl rotate-3" />
            
            {/* Image Placeholder */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-brand-blue to-section-dark-alt flex items-center justify-center">
                <div className="text-center text-white/30">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-4xl">IMG</span>
                  </div>
                  <p>Contact Image Placeholder</p>
                </div>
              </div>
            </div>

            {/* Mascot */}
            <div className="absolute -bottom-6 -left-6 z-10">
              <Image
                src="/images/mascot.png"
                alt="Pressure Washing Expert"
                width={150}
                height={190}
                className="h-40 w-auto drop-shadow-2xl"
              />
            </div>

            {/* Quick Response Badge */}
            <div className="absolute top-4 right-4 bg-brand-yellow text-brand-blue-dark rounded-xl p-4 shadow-lg">
              <p className="font-bold text-lg">24-48 Hour</p>
              <p className="text-sm">Response Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
