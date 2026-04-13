"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "What types of surfaces can you pressure wash?",
    answer:
      "Concrete, brick, wood decks, vinyl siding, asphalt, stone, fences, and roof shingles. Each surface gets the right PSI and cleaning solution.",
  },
  {
    question: "How much does pressure washing cost?",
    answer:
      "Driveways start around $100–$150; full house exteriors $200–$500 depending on size. We provide free, no-obligation quotes.",
  },
  {
    question: "Is pressure washing safe for my property?",
    answer:
      "Yes. We dial in the right PSI per surface, and switch to soft washing for roofs, siding, and stucco to prevent damage.",
  },
  {
    question: "How often should I have my property pressure washed?",
    answer:
      "Most homes benefit annually. High-humidity areas or commercial sites may need service every 6 months.",
  },
  {
    question: "Do I need to be home during the service?",
    answer:
      "Not required—just leave access to an outdoor spigot. A quick walkthrough beforehand is helpful but optional.",
  },
  {
    question: "What is soft washing and when do you use it?",
    answer:
      "Low-pressure cleaning (under 500 PSI) with biodegradable solution for roofs, stucco, cedar shake, and painted surfaces.",
  },
  {
    question: "Are your cleaning solutions environmentally friendly?",
    answer:
      "Yes. Biodegradable, plant-safe detergents with responsible chemical handling on every job.",
  },
  {
    question: "How do I prepare for my pressure washing appointment?",
    answer:
      "Move furniture, pots, and vehicles from the work area. Close windows and doors. We handle the rest.",
  },
]

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
            {faqs.map((faq, index) => (
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
              onClick={onOpenQuoteForm}
              size="lg"
              className="bg-brand-blue text-white font-bold hover:bg-brand-blue-light"
            >
              Get a Free Quote
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
            >
              <a href="tel:800-451-7213">
                Call Us: (800)-451-7213
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
