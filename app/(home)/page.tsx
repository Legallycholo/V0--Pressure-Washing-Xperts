"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Hero, HeroWithOfferFromUrl } from "@/components/sections/Hero"
import { TrustBar } from "@/components/sections/TrustBar"
import { Services } from "@/components/sections/Services"
import { WhyChooseUs } from "@/components/sections/WhyChooseUs"
import { Gallery } from "@/components/sections/Gallery"
import { Offers } from "@/components/sections/Offers"
import { BeforeAfter } from "@/components/sections/BeforeAfter"
import { Testimonials } from "@/components/sections/Testimonials"
import { CallBanner } from "@/components/sections/CallBanner"
import { FAQ } from "@/components/sections/FAQ"
import { ContactSection } from "@/components/sections/ContactSection"
import { Footer } from "@/components/layout/Footer"
import { HomeQuoteScrollHandler } from "@/components/sections/HomeQuoteScrollHandler"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"
import { isOfferId, type OfferId } from "@/data/offers"
import { getTopServiceAreas } from "@/data/service-areas"

export default function Home() {
  const goQuote = useGoToHomeQuoteSection()
  const topServiceAreas = getTopServiceAreas(24)

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
        <TrustBar />
        <Services onOpenQuoteForm={openQuoteForm} />
        <BeforeAfter onOpenQuoteForm={openQuoteForm} />
        <WhyChooseUs onOpenQuoteForm={openQuoteForm} />
        <Gallery variant="teaser" />
        <Testimonials />
        <CallBanner onOpenQuoteForm={() => goQuote({ target: "contact" })} />
        <Offers onOpenQuoteForm={openQuoteForm} />
        <FAQ onOpenQuoteForm={openQuoteForm} />
        <section className="bg-slate-50 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Pressure Washing Across Metro Atlanta &amp; Expanding Statewide
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              Based in Ellenwood, GA and serving the greater Metro Atlanta area —
              tap your city below or call{" "}
              <a
                href="tel:+18004517213"
                className="font-semibold text-brand-blue underline-offset-2 hover:underline"
              >
                (800) 451-7213
              </a>{" "}
              to confirm same-day availability.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {topServiceAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-center text-sm font-medium text-slate-700 transition-colors hover:border-brand-yellow hover:text-slate-900"
                >
                  {area.cityName}, GA
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              <span className="font-semibold text-slate-800">Also serving:</span>{" "}
              Jonesboro, College Park, East Point, Riverdale, Hampton, Lovejoy,
              Union City, Fairburn, and Peachtree City — plus surrounding
              communities across Georgia.
            </p>
          </div>
        </section>
        <ContactSection />
      </main>

      <Footer />

      <FloatingCallButton />
    </>
  )
}
