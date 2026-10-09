import { GOOGLE_REVIEWS as GENERATED_GOOGLE_REVIEWS } from "./google-reviews.generated"
import {
  GOOGLE_BUSINESS_REVIEW_URL,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_REVIEW_RATING,
} from "./review-summary"

export interface GoogleReview {
  id: string
  googleContributorId: string
  author: string
  authorProfileUrl: string
  isLocalGuide: boolean
  reviewCount: number
  photoCount: number
  rating: number
  timeAgo: string
  isNew?: boolean
  highlightTag?: string
  text: string
  serviceCategory:
    | "house-washing"
    | "driveways-concrete"
    | "decks-patios"
    | "gutters-roofs"
    | "carpet-cleaning"
    | "commercial"
    | "general"
  serviceLabel: string
  ownerResponse?: {
    dateAgo: string
    text: string
  }
}

export { GOOGLE_BUSINESS_REVIEW_URL, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_RATING }
export const GOOGLE_REVIEWS = GENERATED_GOOGLE_REVIEWS

export interface ReviewCategoryOption {
  id: string
  label: string
  count?: number
}

export const REVIEW_CATEGORIES: ReviewCategoryOption[] = [
  { id: "all", label: "All Reviews" },
  { id: "house-washing", label: "House Washing" },
  { id: "driveways-concrete", label: "Driveways & Concrete" },
  { id: "decks-patios", label: "Decks & Patios" },
  { id: "gutters-roofs", label: "Gutters & Roofs" },
  { id: "carpet-cleaning", label: "Carpet Cleaning" },
  { id: "commercial", label: "Commercial" },
]

export function getAllReviews(): GoogleReview[] {
  return GOOGLE_REVIEWS
}

export function getFeaturedReviews(count = 15): GoogleReview[] {
  return GOOGLE_REVIEWS.filter((review) => review.text).slice(0, count)
}

export function getReviewsByCategory(category: string): GoogleReview[] {
  if (!category || category === "all") return GOOGLE_REVIEWS
  return GOOGLE_REVIEWS.filter((review) => review.serviceCategory === category)
}

export function getReviewStats() {
  const localGuides = GOOGLE_REVIEWS.filter((review) => review.isLocalGuide).length
  return {
    total: GOOGLE_REVIEW_COUNT,
    displayCount: String(GOOGLE_REVIEW_COUNT),
    avgRating: GOOGLE_REVIEW_RATING,
    ratingText: GOOGLE_REVIEW_RATING.toFixed(1),
    localGuidesCount: localGuides,
  }
}
