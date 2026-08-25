"use client"

import Link from "next/link"
import { Phone } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/Reveal"
import { ctaPress } from "@/lib/ctaInteraction"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"
import { homeFaqItems } from "@/data/home-faq"

interface FAQProps {
  onOpenQuoteForm?: () => void
}

export function FAQ({ onOpenQuoteForm }: FAQProps = {}) {
  return (
    <section id="faq" className="py-14 sm:py-16 lg:py-20 bg-ps-bg">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center mb-8">
          <p className="text-ps-cyan font-semibold text-sm uppercase tracking-[0.28em] mb-2">
            FAQ
          </p>
          <h2 className="font-display uppercase tracking-wide text-white text-4xl sm:text-5xl lg:text-6xl">
            Frequently Asked <span className="text-ps-cyan text-glow-cyan">Questions</span>
          </h2>
          <p className="mt-3 text-ps-text-muted max-w-2xl mx-auto text-sm sm:text-base">
            Quick answers to common questions. Don&apos;t see yours? Call us.
          </p>
        </Reveal>

        {/* FAQ Accordion */}
        <Reveal className="rounded-2xl border border-white/10 bg-ps-bg-alt p-4 md:p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
          <Accordion type="single" collapsible className="w-full">
            {homeFaqItems.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-white/10 data-[state=open]:border-l-2 data-[state=open]:border-l-ps-cyan data-[state=open]:pl-3 data-[state=open]:rounded-l"
              >
                <AccordionTrigger className="text-left text-white hover:text-ps-cyan hover:no-underline text-sm md:text-base [&>svg]:text-ps-cyan">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-ps-text-muted leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-ps-text-muted mb-3 text-sm sm:text-base">
            Still have questions? {"We're"} here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className={`bg-ps-cyan text-[#06121f] font-bold hover:bg-brand-yellow-dark shadow-lg ${ctaPress}`}
            >
              <a href={businessPhoneTelHref}>
                <Phone className="size-5 shrink-0" aria-hidden />
                Call {businessPhoneDisplay} Now
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className={`border-2 border-ps-cyan/60 bg-transparent text-ps-cyan hover:bg-ps-cyan/10 hover:text-ps-cyan ${ctaPress}`}
            >
<<<<<<< HEAD
              <Link href="/contact">Request Callback</Link>
=======
              Request Callback
>>>>>>> origin/main
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
