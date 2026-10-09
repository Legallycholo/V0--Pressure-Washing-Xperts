import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel"
import { getFeaturedReviews } from "@/data/reviews"
import { GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_RATING } from "@/data/review-summary"

export function Testimonials() {
  return (
    <TestimonialsCarousel
      testimonials={getFeaturedReviews(15)}
      reviewCount={GOOGLE_REVIEW_COUNT}
      rating={GOOGLE_REVIEW_RATING}
    />
  )
}
