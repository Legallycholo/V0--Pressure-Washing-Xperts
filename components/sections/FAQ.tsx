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
      "We clean concrete driveways, brick walkways, wooden decks, vinyl and hardboard siding, asphalt, stone patios, fences, and roof shingles. Every surface gets the right pressure setting and cleaning solution to avoid damage while delivering a deep clean.",
  },
  {
    question: "How much does pressure washing cost?",
    answer:
      "Pricing depends on the surface type, square footage, and level of buildup. A driveway typically starts around $100 to $150; a full house exterior ranges from $200 to $500 depending on size. We provide free, no-obligation quotes so you know exactly what to expect before we begin.",
  },
  {
    question: "Is pressure washing safe for my property?",
    answer:
      "Yes. Our technicians are trained to dial in the right PSI for each surface. For roofs, painted siding, and stucco we switch to soft washing: a low-pressure method using biodegradable solutions that kills mold and mildew at the root without blasting the surface.",
  },
  {
    question: "How often should I have my property pressure washed?",
    answer:
      "Most homes benefit from an annual cleaning. Properties near tree cover, in high-humidity areas, or with heavy foot traffic (like commercial storefronts and parking lots) may need service every 6 months. We can recommend a maintenance schedule during your free estimate.",
  },
  {
    question: "Do I need to be home during the service?",
    answer:
      "Not necessarily. We just need access to an outdoor water spigot and the areas being cleaned. That said, we always recommend a quick walkthrough before we start so we can note any specific concerns: cracked concrete, sensitive plants, parked vehicles, etc.",
  },
  {
    question: "What is soft washing and when do you use it?",
    answer:
      "Soft washing uses low pressure (under 500 PSI) combined with a biodegradable cleaning solution to remove algae, mold, lichen, and mildew. We use it on roofs, stucco, EIFS, cedar shake, and painted surfaces where high-pressure water could cause damage.",
  },
  {
    question: "Are your cleaning solutions environmentally friendly?",
    answer:
      "Yes. We use biodegradable, plant-safe detergents wherever possible. Before we rinse, we wet down nearby landscaping to dilute any runoff. Our team follows responsible chemical handling and disposal practices on every job.",
  },
  {
    question: "How do I prepare for my pressure washing appointment?",
    answer:
      "Move any patio furniture, potted plants, and vehicles away from the work area. Close all windows and doors. We'll handle the rest (setup, cleaning, rinse-down, and cleanup) and leave your property looking fresh.",
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
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-base">
            Have questions? We have answers. If you {"don't"} see your question here, feel free to contact us.
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
