/**
 * Single source of truth for the Project Gallery (homepage teaser + /gallery page).
 * Extend `GalleryItem` with image fields when real assets are ready.
 */

export type GalleryFilterId =
  | "all"
  | "residential"
  | "roof"
  | "commercial"
  | "industrial"
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
}

/** Number of tiles shown on the homepage teaser (4×2 grid at lg). */
export const GALLERY_TEASER_COUNT = 8

export const galleryCategories: GalleryCategory[] = [
  { id: "all", label: "All" },
  { id: "residential", label: "Residential" },
  { id: "roof", label: "Roof Cleaning" },
  { id: "commercial", label: "Commercial" },
  { id: "industrial", label: "Industrial" },
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
  industrial: {
    title: "Heavy-duty sites need a pro crew",
    description:
      "Warehouses, docks, and industrial exteriors—we scale the job to your facility. Get a call-back today.",
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
    title: "Industrial equipment cleaning",
    description:
      "Fleet and equipment washing with the right methods and runoff awareness. Talk to us about your assets.",
  },
}

export const galleryItems: GalleryItem[] = [
  { id: 1, category: "residential", title: "House Exterior Cleaning" },
  { id: 2, category: "residential", title: "Deck Restoration" },
  { id: 3, category: "roof", title: "Roof Soft Wash" },
  { id: 4, category: "roof", title: "Moss Removal" },
  { id: 5, category: "commercial", title: "Storefront Cleaning" },
  { id: 6, category: "commercial", title: "Office Building" },
  { id: 7, category: "industrial", title: "Warehouse Floor" },
  { id: 8, category: "industrial", title: "Loading Dock" },
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
