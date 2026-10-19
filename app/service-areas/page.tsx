"use client"


import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { MapPin } from "lucide-react"
import { getServiceAreasForNavigation } from "@/data/service-areas"
import { CtaBand } from "@/components/sections/CtaBand"
import { PageHero } from "@/components/sections/PageHero"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { RevealGroup, RevealItem } from "@/components/motion/Reveal"

export default function ServiceAreasPage() {

  const serviceAreas = getServiceAreasForNavigation()

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <PageHero
          title="Our Service Areas"
          description="Metro Atlanta homes and businesses. Pick your city or request a quote."
        />

        <section className="bg-section-light py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Communities we serve"
              description="Don't see your town? Call and we'll check the next route."
            />

            <RevealGroup className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4" stagger={0.03}>
              {serviceAreas.map((area) => (
                <RevealItem key={area.slug} as="article">
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="group flex h-full items-center gap-3 rounded-2xl border border-border bg-white p-4 transition-colors hover:border-brand-blue/40 hover:bg-accent"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-brand-blue group-hover:bg-white">
                      <MapPin className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-brand-blue-dark">{area.cityName}</span>
                      <span className="block truncate text-xs text-muted-foreground">{area.county}</span>
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <CtaBand
          title="Want a number for your property?"
          description="Free quote, clear scope, no pressure."
        />
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  )
}
