"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Sparkles, BookOpen, Clock, Tag, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { Newsletter } from "@/components/sections/Newsletter"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

const featuredArticles = [
  {
    slug: "soft-washing-vs-pressure-washing-georgia",
    title: "Soft Washing vs. Pressure Washing: What Your Siding Actually Needs",
    category: "Maintenance Tips",
    readTime: "4 min read",
    excerpt:
      "High pressure can damage vinyl siding and strip shingle granules. Learn why soft washing with chemical treatment is the safest way to clean Metro Atlanta homes.",
    date: "August 2026",
    badge: "Popular Guide",
  },
  {
    slug: "removing-georgia-red-clay-stains",
    title: "How to Remove Georgia Red Clay Stains from Brick and Concrete",
    category: "Stain Removal",
    readTime: "5 min read",
    excerpt:
      "Georgia red clay contains heavy iron oxide that bonds tightly to porous surfaces. Discover why standard garden hoses fail and how pros lift red clay permanently.",
    date: "July 2026",
    badge: "Pro Secrets",
  },
  {
    slug: "seasonal-exterior-cleaning-checklist-atlanta",
    title: "The Ultimate Metro Atlanta Seasonal Exterior Maintenance Checklist",
    category: "Checklists",
    readTime: "6 min read",
    excerpt:
      "From spring pollen buildup to fall gutter clearing, follow our step-by-step checklist to extend your roof, deck, and driveway lifespan.",
    date: "June 2026",
    badge: "Free Checklist",
  },
]

export default function NewsletterPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <div className="min-h-screen bg-ps-bg text-white">
      <Header onOpenQuoteForm={() => goQuote({ target: "contact" })} />

      <main className="pt-24 sm:pt-28 lg:pt-32">
        {/* Page Hero Banner */}
        <section className="relative overflow-hidden bg-ps-bg-alt py-16 sm:py-20 lg:py-24">
          <div
            className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-ps-cyan/10 blur-[140px]"
            aria-hidden="true"
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Reveal>
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-ps-cyan/30 bg-ps-cyan/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ps-cyan">
                <Sparkles className="size-4 shrink-0" />
                <span>Official Blog &amp; Newsletter Hub</span>
              </div>

              <h1 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
                Pressure Washing <span className="text-ps-cyan text-glow-cyan">Xpert Insights</span>
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ps-text-muted sm:text-lg">
                Your resource for expert home care advice, exterior maintenance tips, and exclusive subscriber deals across Metro Atlanta.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Embedded Interactive Newsletter Signup Form */}
        <Newsletter />

        {/* Blog / Articles Placeholder Section */}
        <section className="bg-ps-bg-alt py-16 sm:py-20 lg:py-24 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ps-cyan">
                Recent Articles &amp; Guides
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
                Featured <span className="text-ps-cyan text-glow-cyan">Property Care Reads</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-ps-text-muted sm:text-base">
                Preview sample articles sent to our newsletter subscribers. Subscribe above to get future editions first!
              </p>
            </Reveal>

            <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
              {featuredArticles.map((article) => (
                <RevealItem key={article.slug} as="article">
                  <div className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-ps-bg p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ps-cyan/40 hover:shadow-[0_10px_30px_-10px_rgba(0,229,255,0.25)]">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full border border-ps-cyan/30 bg-ps-cyan/10 px-3 py-1 text-xs font-semibold text-ps-cyan">
                          {article.badge}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-ps-text-muted">
                          <Clock className="size-3.5" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      <h3 className="mt-4 font-display text-xl font-bold text-white transition-colors group-hover:text-ps-cyan">
                        {article.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-ps-text-muted">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                      <span className="text-ps-text-muted">{article.date}</span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-ps-cyan transition-transform group-hover:translate-x-1">
                        <span>Read Teaser</span>
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Benefits Guarantee Banner */}
        <section className="bg-ps-bg py-12 border-t border-white/10 text-center">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-ps-text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-ps-cyan" />
                <span className="text-white font-medium">100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-ps-cyan" />
                <span className="text-white font-medium">Zero Spam Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="size-5 text-ps-cyan" />
                <span className="text-white font-medium">10% Off Subscriber Coupon</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </div>
  )
}
