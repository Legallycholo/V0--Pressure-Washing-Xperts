/**
 * Single source of truth for the Project Gallery (homepage teaser + /gallery page).
 * Extend `GalleryItem` with image fields when real assets are ready.
 */

export type GalleryFilterId =
  | "all"
  | "residential"
  | "roof"
  | "commercial"
  | "driveways"
  | "hoa"
  | "masonry"
  | "before-after"
  | "equipment"

export type GalleryItemCategory = Exclude<GalleryFilterId, "all">

export interface GalleryCategory {
  id: GalleryFilterId
  label: string
}

export interface GalleryItem {
  id: number
  category: GalleryItemCategory
  title: string
  /** Public path for full-size image (optional until assets exist). */
  imageSrc?: string
  /** Thumbnail path for grid tiles (optional). */
  thumbSrc?: string
  /** Alt text for images (optional). */
  alt?: string
  /**
   * Visible tag chip on gallery tiles and in the lightbox (hidden on homepage teaser).
   */
  tagPlaceholder?: string
}

/** Number of tiles shown on the homepage teaser (4×2 grid at lg). */
export const GALLERY_TEASER_COUNT = 8

export const galleryCategories: GalleryCategory[] = [
  { id: "all", label: "All" },
  { id: "residential", label: "Residential" },
  { id: "roof", label: "Roof Cleaning" },
  { id: "commercial", label: "Commercial" },
  { id: "driveways", label: "Driveways & Patios" },
  { id: "hoa", label: "HOA & Community" },
  { id: "masonry", label: "Masonry & Stone" },
  { id: "before-after", label: "Before & After" },
  { id: "equipment", label: "Equipment" },
]

export const galleryCtaByCategory: Record<
  GalleryFilterId,
  { title: string; description: string }
> = {
  all: {
    title: "Ready for results like these?",
    description:
      "Tell us about your property and we’ll recommend the right soft wash or pressure washing approach.",
  },
  residential: {
    title: "Love how a clean home looks?",
    description:
      "Schedule residential washing for siding, decks, and outdoor living spaces—done safely and thoroughly.",
  },
  roof: {
    title: "Protect your roof and curb appeal",
    description:
      "Soft washing removes algae and stains without damaging shingles. Call to discuss your roof cleaning plan.",
  },
  commercial: {
    title: "Keep your business looking its best",
    description:
      "From storefronts to offices, we help you make a strong first impression. Ask about commercial scheduling.",
  },
  driveways: {
    title: "Restore driveways and patios",
    description:
      "Lift oil, mildew, and grime from concrete and pavers. We’ll walk you through what your surface needs.",
  },
  hoa: {
    title: "HOA and community projects welcome",
    description:
      "Pool decks, common areas, and multi-home schedules—we coordinate with boards and managers.",
  },
  masonry: {
    title: "Brick and stone deserve expert care",
    description:
      "Gentle cleaning protects mortar and finishes. Call to discuss masonry and stone washing options.",
  },
  "before-after": {
    title: "Imagine your property transformed",
    description:
      "These projects started where yours might be now. Call and we’ll explain what’s possible for your home or site.",
  },
  equipment: {
    title: "Fleet and equipment washing",
    description:
      "Vehicles and gear cleaned with the right methods and runoff awareness. Talk to us about your assets.",
  },
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: "residential",
    title: "House exterior",
    imageSrc: "/gallery/gallery-01.png",
    thumbSrc: "/gallery/gallery-01.png",
    alt: "Back of a home with white siding, windows, door, and concrete patio.",
    tagPlaceholder: "Residential",
  },
  {
    id: 2,
    category: "commercial",
    title: "Commercial building",
    imageSrc: "/gallery/gallery-02.png",
    thumbSrc: "/gallery/gallery-02.png",
    alt: "Long one-story commercial building with block facade, metal siding, and parking lot.",
    tagPlaceholder: "Commercial",
  },
  {
    id: 3,
    category: "residential",
    title: "Deck & balcony",
    imageSrc: "/gallery/gallery-03.png",
    thumbSrc: "/gallery/gallery-03.png",
    alt: "Elevated wood deck and railing on a multi-unit residential building.",
    tagPlaceholder: "Residential",
  },
  {
    id: 4,
    category: "residential",
    title: "Two-story home",
    imageSrc: "/gallery/gallery-04.png",
    thumbSrc: "/gallery/gallery-04.png",
    alt: "Front of a split-level home with tan siding, brick, garage, and landscaping.",
    tagPlaceholder: "Residential",
  },
  {
    id: 5,
    category: "driveways",
    title: "Concrete driveway",
    imageSrc: "/gallery/gallery-05.png",
    thumbSrc: "/gallery/gallery-05.png",
    alt: "Long residential concrete driveway leading toward a garage.",
    tagPlaceholder: "Driveways & Patios",
  },
  {
    id: 6,
    category: "driveways",
    title: "Driveway cleaning",
    imageSrc: "/gallery/gallery-06.png",
    thumbSrc: "/gallery/gallery-06.png",
    alt: "Driveway with cleaning solution on the surface in front of a garage.",
    tagPlaceholder: "Driveways & Patios",
  },
  {
    id: 7,
    category: "driveways",
    title: "Patio & pergola",
    imageSrc: "/gallery/gallery-07.png",
    thumbSrc: "/gallery/gallery-07.png",
    alt: "Backyard stone paver patio with a wooden pergola and outdoor seating.",
    tagPlaceholder: "Driveways & Patios",
  },
  {
    id: 8,
    category: "residential",
    title: "Suburban home front",
    imageSrc: "/gallery/gallery-08.png",
    thumbSrc: "/gallery/gallery-08.png",
    alt: "Front of a two-story home with light siding, brick around the garage, and landscaping.",
    tagPlaceholder: "Residential",
  },
  { id: 9, category: "driveways", title: "Driveway Revival" },
  { id: 10, category: "driveways", title: "Patio Cleaning" },
  { id: 11, category: "hoa", title: "Community Pool Deck" },
  { id: 12, category: "hoa", title: "Common Area" },
  { id: 13, category: "masonry", title: "Brick Wall Cleaning" },
  { id: 14, category: "masonry", title: "Stone Pathway" },
  { id: 15, category: "before-after", title: "Dramatic Transformation" },
  { id: 16, category: "before-after", title: "Deck Restoration" },
  { id: 17, category: "equipment", title: "Pressure washing rig" },
  { id: 18, category: "equipment", title: "Surface cleaner setup" },
]

export function getGalleryCategoryLabel(categoryId: GalleryItemCategory): string {
  const row = galleryCategories.find((c) => c.id === categoryId)
  return row?.label ?? categoryId
}

export function isValidGalleryCategoryParam(
  value: string | null
): value is GalleryFilterId {
  if (!value) return false
  return galleryCategories.some((c) => c.id === value)
}
