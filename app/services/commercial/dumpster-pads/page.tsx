"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function DumpsterPadsPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Dumpster Pad Cleaning"
        description="Eliminate grease, waste buildup, and odors from your commercial dumpster area."
        category="Commercial"
        benefits={[
          "Removes grease, waste residue & organic buildup",
          "Eliminates foul odors at the source",
          "Pressure washing + commercial degreaser treatment",
          "Helps maintain health code compliance",
          "Scheduled maintenance plans available",
          "Fast, discreet service"
        ]}
        onOpenQuoteForm={() => goQuote()}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
