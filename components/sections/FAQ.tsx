"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal } from "@/components/motion/Reveal"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"
import { homeFaqItems } from "@/data/home-faq"

export function FAQ() {
  return (
    <section id="faq" className="scroll-offset-header bg-section-light py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description={
            <>
              Quick answers to common questions. Don&apos;t see yours? Call{" "}
              <a href={businessPhoneTelHref} className="font-semibold text-brand-blue hover:underline">
                {businessPhoneDisplay}
              </a>
              .
            </>
          }
        />

        <Reveal className="mt-10 rounded-2xl border border-border bg-white px-5 sm:px-7">
          <Accordion type="single" collapsible className="w-full">
            {homeFaqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-brand-blue-dark hover:text-brand-blue hover:no-underline [&>svg]:text-brand-blue">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[0.9375rem] leading-relaxed text-slate-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
