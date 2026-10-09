import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { getMarketingRoute } from "@/data/marketing-route-seo"
import { buildBreadcrumbListJsonLd, buildReviewsJsonLd } from "@/lib/seo/json-ld-builders"
import { buildPublicMetadata } from "@/lib/seo/build-page-metadata"
import { getSiteUrl } from "@/lib/site-url"
import { GOOGLE_REVIEWS } from "@/data/reviews"
import { GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_RATING } from "@/data/review-summary"

const reviewsSeo = getMarketingRoute("/reviews")
if (!reviewsSeo) {
  throw new Error("Missing /reviews marketing SEO entry")
}
const reviewsRoute = reviewsSeo

export const metadata: Metadata = buildPublicMetadata({
  title: reviewsRoute.title,
  description: reviewsRoute.description,
  pathname: "/reviews",
})

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  const base = getSiteUrl()
  const sampleReviews = GOOGLE_REVIEWS.slice(0, 15).map((r) => ({
    author: r.author,
    rating: r.rating,
    text: r.text || "Rating-only review",
  }))

  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd(base, reviewsRoute.breadcrumbs)} />
      <JsonLd
        data={buildReviewsJsonLd(base, GOOGLE_REVIEW_RATING, GOOGLE_REVIEW_COUNT, sampleReviews)}
      />
      {children}
    </>
  )
}
