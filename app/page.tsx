"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { Gallery } from "@/components/Gallery"
import { Offers } from "@/components/Offers"
import { BeforeAfter } from "@/components/BeforeAfter"
import { Testimonials } from "@/components/Testimonials"
import { FAQ } from "@/components/FAQ"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"
import { isOfferId, type OfferId } from "@/data/offers"

export default function Home() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)
  const [pendingOfferId, setPendingOfferId] = useState<OfferId | undefined>()

  /** Accepts an optional offer id from Offers; ignores React click events from other CTAs */
  const openQuoteForm = (maybeOffer?: unknown) => {
    setPendingOfferId(isOfferId(maybeOffer) ? maybeOffer : undefined)
    setIsQuoteFormOpen(true)
  }

  const closeQuoteForm = () => {
    setIsQuoteFormOpen(false)
    setPendingOfferId(undefined)
  }

  return (
    <>
      <Header onOpenQuoteForm={() => openQuoteForm()} />

      <main>
        <Hero onOpenQuoteForm={openQuoteForm} />
        <Services onOpenQuoteForm={openQuoteForm} />
        <WhyChooseUs onOpenQuoteForm={openQuoteForm} />
        <Gallery variant="teaser" />
        <Offers onOpenQuoteForm={openQuoteForm} />
        <BeforeAfter onOpenQuoteForm={openQuoteForm} />
        <Testimonials />
        <FAQ onOpenQuoteForm={openQuoteForm} />
        <ContactSection />
      </main>

      <Footer />

      <FloatingCallButton />

      <ContactFormModal
        isOpen={isQuoteFormOpen}
        onClose={closeQuoteForm}
        initialOfferId={pendingOfferId}
      />
    </>
  )
}
