import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
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

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-header-offset">
        <ContactSection />
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  )
}

