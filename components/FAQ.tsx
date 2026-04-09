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
    answer: "Placeholder answer - We can pressure wash a wide variety of surfaces including concrete driveways, wooden decks, vinyl siding, brick, stone, asphalt, and more. Our team uses the appropriate pressure settings and techniques for each surface type to ensure thorough cleaning without damage.",
  },
  {
    question: "How much does pressure washing cost?",
    answer: "Placeholder answer - Pricing varies based on the size of the area, type of surface, level of soiling, and specific services needed. We provide free, no-obligation quotes so you know exactly what to expect before we begin. Contact us today for a personalized estimate.",
  },
  {
    question: "Is pressure washing safe for my property?",
    answer: "Placeholder answer - Yes! Our trained professionals know exactly how to adjust pressure levels and techniques for different surfaces. For delicate surfaces like roofs and certain siding types, we use soft washing methods that rely on specialized cleaning solutions rather than high pressure.",
  },
  {
    question: "How often should I have my property pressure washed?",
    answer: "Placeholder answer - We typically recommend annual pressure washing for most residential properties. However, high-traffic commercial areas, properties near trees, or those in humid climates may benefit from more frequent cleaning. We can help you determine the best schedule for your needs.",
  },
  {
    question: "Do I need to be home during the service?",
    answer: "Placeholder answer - You do not need to be home during the service as long as we have access to water and the areas being cleaned. However, we do recommend a brief walkthrough before we begin to discuss any specific concerns or areas that need special attention.",
  },
  {
    question: "What is soft washing?",
    answer: "Placeholder answer - Soft washing is a low-pressure cleaning method that uses specialized biodegradable cleaning solutions to safely remove mildew, algae, moss, and other organic stains. It is ideal for roofs, delicate siding, and surfaces that could be damaged by high-pressure washing.",
  },
  {
    question: "Are your cleaning solutions environmentally friendly?",
    answer: "Placeholder answer - Yes, we prioritize using eco-friendly, biodegradable cleaning solutions that are safe for your landscaping, pets, and the environment. We take care to protect surrounding plants and grass during our cleaning process.",
  },
  {
    question: "How do I prepare for my pressure washing appointment?",
    answer: "Placeholder answer - We recommend removing any fragile items, outdoor furniture, or decorations from the areas being cleaned. Please ensure vehicles are moved from driveways if applicable. We will handle the rest and leave your property looking great!",
  },
]

interface FAQProps {
  onOpenQuoteForm: () => void
}

export function FAQ({ onOpenQuoteForm }: FAQProps) {
  return (
    <section id="faq" className="py-20 bg-section-light">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-wider mb-3">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Have questions? We have answers. If you {"don't"} see your question here, feel free to contact us.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-foreground hover:text-brand-blue hover:no-underline text-base md:text-lg">
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
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? {"We're"} here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
