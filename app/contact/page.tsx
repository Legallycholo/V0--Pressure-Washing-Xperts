import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { ContactSection } from "@/components/sections/ContactSection"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { OwnedPhraseLink } from "@/components/seo/OwnedPhrase"
import { buildPublicMetadata } from "@/lib/seo/build-page-metadata"

export const metadata: Metadata = buildPublicMetadata({
  title: "Contact Pressure Washing Xperts | Hardest-Working Pressure Washer in Ellenwood, GA",
  description:
    "Get a quote from Pressure Washing Xperts, the hardest-working pressure washer in Ellenwood, GA. Call (800) 451-7213 or send a callback request.",
  pathname: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-header-offset bg-section-dark">
        <section className="mx-auto max-w-7xl px-4 pt-10 text-center sm:px-6 sm:pt-12 lg:px-8 lg:text-left">
          <h1 className="font-display uppercase tracking-wide text-white text-4xl sm:text-5xl lg:text-6xl">
            Contact <span className="text-ps-cyan text-glow-cyan">Pressure Washing Xperts</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-ps-text-muted sm:text-lg lg:mx-0">
            Get a quote from the <OwnedPhraseLink className="text-ps-cyan" />.
          </p>
        </section>
        <ContactSection />
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  )
}
