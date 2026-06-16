"use client"

import { Phone } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ctaPress } from "@/lib/ctaInteraction"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"
import { homeFaqItems } from "@/data/home-faq"

interface FAQProps {
  onOpenQuoteForm: () => void
}

export function FAQ({ onOpenQuoteForm }: FAQProps) {
  return (
    <section id="faq" className="py-12 bg-section-light">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-7">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-wider mb-2">
            FAQ
          </p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl text-balance">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Quick answers to common questions. Don&apos;t see yours? Contact us.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
          <Accordion type="single" collapsible className="w-full">
            {homeFaqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-foreground hover:text-brand-blue hover:no-underline text-sm md:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-3 text-sm sm:text-base">
            Still have questions? {"We're"} here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className={`bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark shadow-lg ${ctaPress}`}
            >
              <a href={businessPhoneTelHref}>
                <Phone className="size-5 shrink-0" aria-hidden />
                Call {businessPhoneDisplay} Now
              </a>
            </Button>
            <Button
              onClick={onOpenQuoteForm}
              size="lg"
              variant="outline"
              className={`border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white ${ctaPress}`}
            >
              Get a Free Estimate
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
