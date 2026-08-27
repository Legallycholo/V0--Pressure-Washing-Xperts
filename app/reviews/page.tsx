"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  ExternalLink,
  Search,
  CheckCircle2,
  Phone,
  ArrowRight,
  ShieldCheck,
  Quote,
  MessageSquare,
  Sparkles,
} from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  GOOGLE_REVIEWS,
  REVIEW_CATEGORIES,
  GOOGLE_BUSINESS_REVIEW_URL,
  getReviewStats,
  type GoogleReview,
} from "@/data/reviews"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"
import { ctaPress } from "@/lib/ctaInteraction"

const PAGE_SIZE = 18

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

  return (
    <div className="min-h-screen bg-ps-bg text-ps-text">
      <Header />

      <main className="pt-header-offset">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0F1E] via-[#0d1b2a] to-ps-bg py-12 sm:py-16 lg:py-20 border-b border-ps-cyan/20">
          <div className="absolute inset-0 z-0 bg-hero-pattern opacity-10" />
          <div className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-ps-cyan/10 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 -right-32 h-[28rem] w-[28rem] rounded-full bg-brand-yellow/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-ps-cyan/30 bg-ps-cyan/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-ps-cyan mb-4">
                <Sparkles className="size-4" />
                Verified Customer Reviews
              </div>

              <h1 className="font-display uppercase tracking-wide text-white text-3xl sm:text-4xl lg:text-6xl leading-[0.95]">
                What Our Customers Say About{" "}
                <span className="text-ps-cyan text-glow-cyan">Pressure Washing Xperts</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-ps-text-muted leading-relaxed">
                Read all {stats.total} actual, verified reviews from Google Business Profile. From
                residential house washing and driveway cleaning to commercial properties across
                Metro Atlanta.
              </p>

              {/* Aggregated Rating Card */}
              <div className="mt-8 mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                  {/* Rating */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-4xl sm:text-5xl text-white font-bold">
                        5.0
                      </span>
                      <div className="flex flex-col">
                        <div className="flex gap-0.5 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="size-4 fill-yellow-400" />
                          ))}
                        </div>
                        <span className="text-xs text-white/60 mt-0.5">Google Rating</span>
                      </div>
                    </div>
                  </div>

                  {/* Reviews Count */}
                  <div className="pt-4 sm:pt-0 flex flex-col items-center">
                    <span className="font-display text-3xl sm:text-4xl text-ps-cyan font-bold">
                      {stats.displayCount}
                    </span>
                    <span className="text-xs sm:text-sm text-white/70">Verified 5-Star Reviews</span>
                  </div>

                  {/* Recommendation Rate */}
                  <div className="pt-4 sm:pt-0 flex flex-col items-center">
                    <span className="font-display text-3xl sm:text-4xl text-brand-yellow font-bold">
                      100%
                    </span>
                    <span className="text-xs sm:text-sm text-white/70">Customer Satisfaction</span>
                  </div>
                </div>

                {/* Google Button */}
                <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark gap-2 shadow-lg"
                  >
                    <a
                      href={GOOGLE_BUSINESS_REVIEW_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Leave us a review on Google Business Profile (opens in new window)"
                    >
                      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z" />
                      </svg>
                      Leave a Google Review
                      <ExternalLink className="size-4 ml-1" />
                    </a>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/30 text-white bg-transparent hover:bg-white/10"
                  >
                    <Link href="/contact">Request Free Estimate</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Search Section */}
        <section className="sticky top-header-offset z-30 bg-ps-bg/95 backdrop-blur-md border-b border-white/10 py-4 shadow-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                {REVIEW_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id
                  const count = categoryCounts[cat.id] ?? 0
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-ps-cyan text-brand-blue-dark font-bold shadow-md shadow-ps-cyan/20"
                          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[11px] ${
                          isSelected ? "bg-brand-blue-dark/20 text-brand-blue-dark" : "bg-white/10 text-white/50"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-72 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                <Input
                  type="search"
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-9 bg-white/5 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-ps-cyan text-sm h-9 rounded-full"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Results count label */}
            <div className="mb-6 flex items-center justify-between text-sm text-white/60">
              <p>
                Showing <span className="font-semibold text-white">{visibleReviews.length}</span> of{" "}
                <span className="font-semibold text-white">{filteredReviews.length}</span> reviews
                {searchQuery && (
                  <span>
                    {" "}
                    matching &ldquo;<span className="text-ps-cyan">{searchQuery}</span>&rdquo;
                  </span>
                )}
              </p>
              {filteredReviews.length < GOOGLE_REVIEWS.length && (
                <button
                  onClick={() => {
                    setSelectedCategory("all")
                    setSearchQuery("")
                  }}
                  className="text-xs text-ps-cyan hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            {filteredReviews.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/5 max-w-md mx-auto p-8">
                <Quote className="size-10 text-white/30 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No reviews found</h3>
                <p className="text-sm text-ps-text-muted mb-4">
                  No reviews match your current search or category filter.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("all")
                    setSearchQuery("")
                  }}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {visibleReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
                      className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] p-5 transition-all duration-300 hover:border-ps-cyan/40 hover:shadow-[0_8px_30px_rgba(0,229,255,0.08)]"
                    >
                      <div>
                        {/* Header: Author + Google Icon */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            {/* Avatar placeholder */}
                            <div className="size-11 rounded-full bg-gradient-to-br from-brand-blue to-ps-cyan flex items-center justify-center text-white font-bold text-base shadow-sm ring-2 ring-white/10">
                              {review.author.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <a
                                href={review.authorProfileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-white hover:text-ps-cyan transition-colors text-sm truncate flex items-center gap-1 group/author"
                                aria-label={`View ${review.author}'s Google profile (opens in new tab)`}
                              >
                                <span>{review.author}</span>
                                <ExternalLink className="size-3 opacity-0 group-hover/author:opacity-100 transition-opacity text-ps-cyan" />
                              </a>
                              <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/50 mt-0.5">
                                {review.isLocalGuide && (
                                  <span className="inline-flex items-center gap-0.5 text-orange-400 font-medium bg-orange-400/10 px-1.5 py-0.5 rounded text-[10px]">
                                    <ShieldCheck className="size-3" />
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

                          {/* Google G Icon */}
                          <div className="shrink-0 size-7 rounded-full bg-white/10 flex items-center justify-center text-white/70" title="Verified Google Review">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z" />
                            </svg>
                          </div>
                        </div>

                        {/* Stars + Time + Highlight Tag */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-1.5">
                            <div className="flex gap-0.5 text-yellow-400" aria-label={`${review.rating} out of 5 stars`}>
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="size-3.5 fill-yellow-400" />
                              ))}
                            </div>
                            <span className="text-xs text-white/50">{review.timeAgo}</span>
                          </div>

                          {review.highlightTag && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 px-2 py-0.5 text-[11px] font-semibold text-brand-yellow">
                              <CheckCircle2 className="size-3" />
                              {review.highlightTag}
                            </span>
                          )}
                        </div>

                        {/* Review Body */}
                        <p className="text-white/85 text-sm leading-relaxed mb-4">
                          {review.text}
                        </p>

                        {/* Owner Response Box if exists */}
                        {review.ownerResponse && (
                          <div className="mt-3 rounded-lg border border-white/10 bg-brand-blue-dark/50 p-3 text-xs text-white/80">
                            <div className="flex items-center gap-1.5 font-semibold text-ps-cyan mb-1">
                              <MessageSquare className="size-3" />
                              <span>Pressure Washing Xperts (Owner)</span>
                              <span className="text-[10px] text-white/40 font-normal">
                                · {review.ownerResponse.dateAgo}
                              </span>
                            </div>
                            <p className="italic text-white/70">{review.ownerResponse.text}</p>
                          </div>
                        )}
                      </div>

                      {/* Footer Badge */}
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-white/70 font-medium">
                          {review.serviceLabel}
                        </span>
                        <span className="text-ps-cyan text-[11px]">Google Verified</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Load More Button */}
            {visibleCount < filteredReviews.length && (
              <div className="mt-10 text-center">
                <Button
                  size="lg"
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="bg-white/10 text-white hover:bg-white/20 border border-white/20 px-8 py-5 text-sm font-semibold rounded-full shadow-lg"
                >
                  Load More Reviews ({filteredReviews.length - visibleCount} remaining)
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Conversion CTA Strip */}
        <section className="bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-14 border-t border-ps-cyan/20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide mb-3">
              Ready to Join Our 100+ Satisfied Customers?
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-6">
              Get an honest, upfront quote with same-day availability across Ellenwood, GA and
              Metro Atlanta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className={`bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark text-base px-8 py-6 rounded-md shadow-lg ${ctaPress}`}
              >
                <Link href="/contact">
                  Request Free Callback
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className={`border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-blue-dark text-base px-8 py-6 rounded-md ${ctaPress}`}
              >
                <a href={businessPhoneTelHref}>
                  <Phone className="mr-2 size-5" />
                  Call {businessPhoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </div>
  )
}
