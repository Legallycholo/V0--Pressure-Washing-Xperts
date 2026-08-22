import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Request a Callback | Pressure Washing Xperts | Metro Atlanta",
  description:
    "Request a callback from Pressure Washing Xperts for pressure washing, soft washing, roof cleaning, driveway cleaning, and commercial services in Metro Atlanta.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-section-dark px-4 pb-14 pt-header-offset text-center text-white sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">Request a Callback</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            Tell us what needs cleaning and we&apos;ll help confirm the scope and next available time.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
