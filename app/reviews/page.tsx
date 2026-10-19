"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  ExternalLink,
  Search,
  CheckCircle2,
  ShieldCheck,
  Quote,
  MessageSquare,
} from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CtaBand } from "@/components/sections/CtaBand"
import { PageHero } from "@/components/sections/PageHero"
import {
  GOOGLE_REVIEWS,
  REVIEW_CATEGORIES,
  GOOGLE_BUSINESS_REVIEW_URL,
  getReviewStats,
} from "@/data/reviews"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 18

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z" />
    </svg>
  )
}

export default function ReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const stats = useMemo(() => getReviewStats(), [])

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return GOOGLE_REVIEWS.filter((review) => {
      const matchesCategory =
        selectedCategory === "all" || review.serviceCategory === selectedCategory
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !query ||
        review.author.toLowerCase().includes(query) ||
        review.text.toLowerCase().includes(query) ||
        review.serviceLabel.toLowerCase().includes(query) ||
        (review.highlightTag && review.highlightTag.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const visibleReviews = useMemo(() => {
    return filteredReviews.slice(0, visibleCount)
  }, [filteredReviews, visibleCount])

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: GOOGLE_REVIEWS.length }
    for (const r of GOOGLE_REVIEWS) {
      counts[r.serviceCategory] = (counts[r.serviceCategory] || 0) + 1
    }
    return counts
  }, [])

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId)
    setVisibleCount(PAGE_SIZE)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setVisibleCount(PAGE_SIZE)
  }

  const resetFilters = () => {
    setSelectedCategory("all")
    setSearchQuery("")
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-section-light">
        <PageHero
          eyebrow="Google customer reviews"
          title="What our customers say about Pressure Washing Xperts"
          description={`Browse all ${stats.total} reviews shown on our Google Business Profile, covering house washing, driveway cleaning, and commercial pressure washing in Ellenwood and nearby communities.`}
          showCtas={false}
        >
          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-5 rounded-2xl border border-white/15 bg-white/5 p-6 sm:flex-row sm:justify-center sm:gap-8">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold">{stats.ratingText}</span>
              <span className="text-left">
                <span className="flex gap-0.5" aria-label={`${stats.ratingText} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </span>
                <span className="mt-1 block text-xs text-white/70">{stats.displayCount} Google reviews</span>
              </span>
            </div>
            <Button asChild variant="inverse" size="lg">
              <a
                href={GOOGLE_BUSINESS_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View all reviews on Google Business Profile (opens in new window)"
              >
                <GoogleIcon className="size-4" />
                View on Google
                <ExternalLink className="size-4" aria-hidden />
              </a>
            </Button>
          </div>
        </PageHero>

        {/* Filter and Search */}
        <section className="sticky top-header-offset z-30 border-b border-border bg-white/95 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:flex-row lg:px-8">
            <div className="flex w-full flex-nowrap items-center gap-2 overflow-x-auto pb-1 lg:w-auto lg:flex-wrap lg:pb-0">
              {REVIEW_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id
                const count = categoryCounts[cat.id] ?? 0
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                      isSelected
                        ? "border-brand-blue bg-brand-blue text-white"
                        : "border-border bg-white text-brand-blue-dark hover:border-brand-blue/40 hover:bg-accent"
                    )}
                  >
                    {cat.label}
                    <span
                      className={cn(
                        "rounded-full px-1.5 text-[11px]",
                        isSelected ? "bg-white/20 text-white" : "bg-section-light text-muted-foreground"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="relative w-full shrink-0 lg:w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                type="search"
                placeholder="Search reviews..."
                aria-label="Search reviews"
                value={searchQuery}
                onChange={handleSearchChange}
                className="h-10 rounded-full bg-white pl-9 text-sm"
              />
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
              <p>
                Showing <span className="font-semibold text-brand-blue-dark">{visibleReviews.length}</span> of{" "}
                <span className="font-semibold text-brand-blue-dark">{filteredReviews.length}</span> reviews
                {searchQuery && (
                  <span>
                    {" "}
                    matching &ldquo;<span className="text-brand-blue">{searchQuery}</span>&rdquo;
                  </span>
                )}
              </p>
              {filteredReviews.length < GOOGLE_REVIEWS.length && (
                <button type="button" onClick={resetFilters} className="text-sm font-medium text-brand-blue hover:underline">
                  Reset filters
                </button>
              )}
            </div>

            {filteredReviews.length === 0 ? (
              <div className="mx-auto max-w-md rounded-2xl border border-border bg-white p-8 py-16 text-center">
                <Quote className="mx-auto mb-3 size-10 text-slate-300" aria-hidden />
                <h3 className="mb-1 text-lg font-bold text-brand-blue-dark">No reviews found</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  No reviews match your current search or category filter.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visibleReviews.map((review, index) => (
                    <motion.article
                      key={review.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
                      className="flex flex-col justify-between rounded-2xl border border-border bg-white p-6"
                    >
                      <div>
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-brand-blue">
                              {review.author.charAt(0).toUpperCase()}
                            </span>
                            <div className="min-w-0">
                              <a
                                href={review.authorProfileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block truncate text-sm font-semibold text-brand-blue-dark hover:text-brand-blue"
                                aria-label={`View ${review.author}'s Google profile (opens in new tab)`}
                              >
                                {review.author}
                              </a>
                              <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                                {review.isLocalGuide && (
                                  <span className="inline-flex items-center gap-0.5 rounded bg-orange-50 px-1.5 py-0.5 text-[10px] font-medium text-orange-700">
                                    <ShieldCheck className="size-3" aria-hidden />
                                    Local Guide
                                  </span>
                                )}
                                {review.reviewCount > 0 && (
                                  <span>
                                    {review.reviewCount} review{review.reviewCount > 1 ? "s" : ""}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <GoogleIcon className="mt-1 size-4 shrink-0 text-slate-400" />
                        </div>

                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.timeAgo}</span>
                          </div>

                          {review.highlightTag && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-brand-blue">
                              <CheckCircle2 className="size-3" aria-hidden />
                              {review.highlightTag}
                            </span>
                          )}
                        </div>

                        <p className="text-sm leading-relaxed text-slate-700">
                          {review.text || "Rating-only review"}
                        </p>

                        {review.ownerResponse && (
                          <div className="mt-4 rounded-xl border border-border bg-section-light p-3 text-xs text-slate-700">
                            <div className="mb-1 flex items-center gap-1.5 font-semibold text-brand-blue-dark">
                              <MessageSquare className="size-3" aria-hidden />
                              <span>Response from the owner</span>
                              <span className="font-normal text-muted-foreground">· {review.ownerResponse.dateAgo}</span>
                            </div>
                            <p className="italic">{review.ownerResponse.text}</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-5 border-t border-border pt-3">
                        <span className="inline-block rounded-full bg-section-light px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          {review.serviceLabel}
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {visibleCount < filteredReviews.length && (
              <div className="mt-10 text-center">
                <Button size="lg" variant="outline" onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}>
                  Load more reviews ({filteredReviews.length - visibleCount} remaining)
                </Button>
              </div>
            )}
          </div>
        </section>

        <CtaBand
          title="Ready for results worth reviewing?"
          description="Get an honest, upfront quote with same-day availability in Ellenwood, GA and nearby communities."
        />
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  )
}
