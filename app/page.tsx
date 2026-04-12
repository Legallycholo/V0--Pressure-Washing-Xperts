"use client"

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
import { HomeQuoteScrollHandler } from "@/components/HomeQuoteScrollHandler"
import { FloatingCallButton } from "@/components/FloatingCallButton"
import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"
import { isOfferId, type OfferId } from "@/data/offers"

export default function Home() {
  const goQuote = useGoToHomeQuoteSection()

  /** Accepts an optional offer id from Offers; ignores React click events from other CTAs */
  const openQuoteForm = (maybeOffer?: unknown) => {
    const offerId: OfferId | undefined = isOfferId(maybeOffer) ? maybeOffer : undefined
    goQuote({ target: "contact", offerId })
  }

  return (
    <>
      <HomeQuoteScrollHandler />
      <Header onOpenQuoteForm={() => goQuote({ target: "contact" })} />

      <main>
        <Hero onOpenQuoteForm={() => goQuote({ target: "contact" })} />
        <Services onOpenQuoteForm={openQuoteForm} />
        <BeforeAfter onOpenQuoteForm={openQuoteForm} />
        <WhyChooseUs onOpenQuoteForm={openQuoteForm} />
        <Gallery variant="teaser" />
        <Testimonials />
        <Offers onOpenQuoteForm={openQuoteForm} />
        <FAQ onOpenQuoteForm={openQuoteForm} />
        <ContactSection />
      </main>

      <Footer />

      <FloatingCallButton />
    </>
  )
}
