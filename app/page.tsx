"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { TrustBadges } from "@/components/TrustBadges"
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

export default function Home() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  const openQuoteForm = () => setIsQuoteFormOpen(true)
  const closeQuoteForm = () => setIsQuoteFormOpen(false)

  return (
    <>
      <Header onOpenQuoteForm={openQuoteForm} />
      
      <main>
        <Hero onOpenQuoteForm={openQuoteForm} />
        <TrustBadges />
        <Services onOpenQuoteForm={openQuoteForm} />
        <WhyChooseUs onOpenQuoteForm={openQuoteForm} />
        <Gallery />
        <Offers onOpenQuoteForm={openQuoteForm} />
        <BeforeAfter onOpenQuoteForm={openQuoteForm} />
        <Testimonials />
        <FAQ onOpenQuoteForm={openQuoteForm} />
        <ContactSection onOpenQuoteForm={openQuoteForm} />
      </main>

      <Footer />

      <FloatingCallButton />

      <ContactFormModal 
        isOpen={isQuoteFormOpen} 
        onClose={closeQuoteForm} 
      />
    </>
  )
}
