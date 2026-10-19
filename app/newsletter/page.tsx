"use client"

import { Clock, ArrowRight } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { Newsletter } from "@/components/sections/Newsletter"
import { PageHero } from "@/components/sections/PageHero"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { RevealGroup, RevealItem } from "@/components/motion/Reveal"

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

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <PageHero
          eyebrow="Blog & newsletter"
          title="Pressure Washing Xpert Insights"
          description="Your resource for expert home care advice, exterior maintenance tips, and exclusive subscriber deals across Metro Atlanta."
          showCtas={false}
        />

        <Newsletter />

        {/* Article previews */}
        <section className="bg-section-light py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Recent articles & guides"
              title="Featured property care reads"
              description="Preview sample articles sent to our newsletter subscribers. Subscribe above to get future editions first."
            />

            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((article) => (
                <RevealItem key={article.slug} as="article">
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-white p-6">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-brand-blue">
                          {article.badge}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3.5" aria-hidden />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-brand-blue-dark">{article.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
                      <span className="text-muted-foreground">{article.date}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-brand-blue">
                        Coming soon
                        <ArrowRight className="size-3.5" aria-hidden />
                      </span>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  )
}
