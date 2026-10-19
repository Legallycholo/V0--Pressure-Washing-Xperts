"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { CheckCircle2 } from "lucide-react"
import { CtaBand } from "@/components/sections/CtaBand"
import { CtaButtons } from "@/components/sections/CtaButtons"
import { PageHero } from "@/components/sections/PageHero"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { navSlogan } from "@/data/site"

const reasons = [
  { title: "Licensed & Insured", desc: "Full coverage for your peace of mind" },
  { title: "Expert Team", desc: "Certified professionals, 14+ years" },
  { title: "Eco-Friendly", desc: "Safe, biodegradable solutions" },
  { title: "Quality Guaranteed", desc: "Satisfaction guarantee on all services" },
  { title: "Competitive Pricing", desc: "Fair pricing, no hidden fees" },
  { title: "Customer First", desc: "Dedicated to exceptional service" },
]

export default function WeDoXpertPage() {

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <PageHero
          title={
            <>
              We Do <span className="text-brand-blue-light">Xpert</span>
            </>
          }
          description={navSlogan}
          showCtas={false}
        />

        {/* Our Story */}
        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-brand-blue-dark sm:text-3xl">Our story</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-slate-700">
              <p>
                Founded on one goal: exceptional results, every time. Our owner brings 14 years of hands-on experience, setting the standard for how the crew approaches every project.
              </p>
              <p>
                Right techniques, eco-friendly solutions, and outcomes you can see from the street.
              </p>
            </div>
            <CtaButtons align="start" className="mt-8" />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-section-light py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Why choose Pressure Washing Xperts?" />
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-white p-6">
                  <CheckCircle2 className="size-6 text-brand-blue" aria-hidden />
                  <h3 className="mt-4 font-semibold text-brand-blue-dark">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Ready to experience the Xpert difference?"
          description="Get a free quote and see why neighbors keep calling us back."
        />
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  )
}
