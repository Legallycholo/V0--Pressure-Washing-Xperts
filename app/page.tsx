"use client"

import { Suspense } from "react"
import { Header } from "@/components/layout/Header"
import { Hero, HeroWithOfferFromUrl } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { WhyChooseUs } from "@/components/sections/WhyChooseUs"
import { Gallery } from "@/components/sections/Gallery"
import { Offers } from "@/components/sections/Offers"
import { BeforeAfter } from "@/components/sections/BeforeAfter"
import { Testimonials } from "@/components/sections/Testimonials"
import { FAQ } from "@/components/sections/FAQ"
import { ContactSection } from "@/components/sections/ContactSection"
import { Footer } from "@/components/layout/Footer"
import { HomeQuoteScrollHandler } from "@/components/sections/HomeQuoteScrollHandler"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
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
        <Suspense
          fallback={
            <Hero onOpenQuoteForm={() => goQuote({ target: "contact" })} />
          }
        >
          <HeroWithOfferFromUrl
            onOpenQuoteForm={() => goQuote({ target: "contact" })}
          />
        </Suspense>
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
