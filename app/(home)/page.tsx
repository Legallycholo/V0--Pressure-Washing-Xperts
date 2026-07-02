"use client"

import { Suspense } from "react"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { Header } from "@/components/layout/Header"
import { Hero, HeroWithOfferFromUrl } from "@/components/sections/Hero"
import { SocialProofBar } from "@/components/sections/SocialProofBar"
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
        <SocialProofBar />
        <Services onOpenQuoteForm={openQuoteForm} />
        <BeforeAfter onOpenQuoteForm={openQuoteForm} />
        <WhyChooseUs onOpenQuoteForm={openQuoteForm} />
        <Gallery variant="teaser" />
        <Testimonials />
        <CallBanner onOpenQuoteForm={() => goQuote({ target: "contact" })} />
        <Offers onOpenQuoteForm={openQuoteForm} />
        <FAQ onOpenQuoteForm={openQuoteForm} />
        <section className="bg-ps-bg-alt py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-ps-cyan">
                Service Areas
              </p>
              <h2 className="font-display uppercase tracking-wide text-white text-3xl sm:text-4xl lg:text-5xl">
                Proudly Serving All of{" "}
                <span className="text-ps-cyan text-glow-cyan">Metro Atlanta &amp; Georgia</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-ps-text-muted sm:text-base">
                Based in Ellenwood, GA. Tap your city or call{" "}
                <a
                  href="tel:+18004517213"
                  className="font-semibold text-ps-cyan underline-offset-2 hover:underline"
                >
                  (800) 451-7213
                </a>{" "}
                to confirm same-day availability.
              </p>
            </Reveal>
            <RevealGroup
              as="ul"
              stagger={0.05}
              className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
            >
              {topServiceAreas.map((area) => (
                <RevealItem key={area.slug} as="li">
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-ps-bg px-4 py-3 text-sm font-medium text-ps-text transition-all duration-200 hover:-translate-y-0.5 hover:border-ps-cyan/50 hover:shadow-[0_10px_24px_-10px_rgba(0,229,255,0.4)]"
                  >
                    <MapPin className="size-4 shrink-0 text-ps-cyan" aria-hidden />
                    <span className="truncate group-hover:text-white">{area.cityName}, GA</span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-ps-text-muted">
              <span className="font-semibold text-white">Also serving:</span>{" "}
              Jonesboro, College Park, East Point, Riverdale, Hampton, Lovejoy,
              Union City, Fairburn, and Peachtree City, plus surrounding
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
