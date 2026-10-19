import Link from "next/link"
import { MapPin } from "lucide-react"
import { RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { Header } from "@/components/layout/Header"
import { Hero } from "@/components/sections/Hero"
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
import { SectionHeading } from "@/components/sections/SectionHeading"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { getServiceAreasForNavigation } from "@/data/service-areas"

export default function Home() {
  const topServiceAreas = getServiceAreasForNavigation()

  return (
    <>
      <Header />

      <main>
        <Hero />
        <SocialProofBar />
        <Services />
        <BeforeAfter />
        <WhyChooseUs />
        <Gallery variant="teaser" />
        <Testimonials />
        <Offers />
        <CallBanner />
        <FAQ />
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Service areas"
              title="Serving Ellenwood and Metro Atlanta"
              description="Based in Ellenwood, GA. Pick your city to see local work, reviews, and availability."
            />
            <RevealGroup
              as="ul"
              stagger={0.03}
              className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4"
            >
              {topServiceAreas.map((area) => (
                <RevealItem key={area.slug} as="li">
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="group flex items-center gap-2.5 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-brand-blue-dark transition-colors hover:border-brand-blue/40 hover:bg-accent"
                  >
                    <MapPin className="size-4 shrink-0 text-brand-blue" aria-hidden />
                    <span className="truncate">{area.cityName}, GA</span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-brand-blue-dark">Also serving:</span>{" "}
              East Point, Hampton, Lovejoy, Union City, Fairburn, and Peachtree City, plus surrounding
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
