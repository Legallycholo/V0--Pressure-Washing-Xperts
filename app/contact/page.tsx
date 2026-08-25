import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
<<<<<<< HEAD
import { ContactSection } from "@/components/sections/ContactSection"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { buildPublicMetadata } from "@/lib/seo/build-page-metadata"

export const metadata: Metadata = buildPublicMetadata({
  title: "Contact Us | Request a Callback | Pressure Washing Xperts",
  description:
    "Request a callback from Pressure Washing Xperts. Fill out our quick contact form and we'll call you back to book your free pressure washing quote. Serving Ellenwood, GA and Metro Atlanta.",
  pathname: "/contact",
})
=======
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Request a Callback | Pressure Washing Xperts | Metro Atlanta",
  description:
    "Request a callback from Pressure Washing Xperts for pressure washing, soft washing, roof cleaning, driveway cleaning, and commercial services in Metro Atlanta.",
  alternates: { canonical: "/contact" },
}
>>>>>>> origin/main

export default function ContactPage() {
  return (
    <>
      <Header />
<<<<<<< HEAD
      <main className="pt-header-offset">
        <ContactSection />
      </main>
      <Footer />
      <FloatingCallButton />
=======
      <main>
        <section className="bg-section-dark px-4 pb-14 pt-header-offset text-center text-white sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">Request a Callback</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            Tell us what needs cleaning and we&apos;ll help confirm the scope and next available time.
          </p>
        </section>
      </main>
      <Footer />
>>>>>>> origin/main
    </>
  )
}

