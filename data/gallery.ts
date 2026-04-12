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
  /**
   * CSS `object-position` for grid thumbnails only (helps portrait assets fill 4:3 tiles without awkward crops).
   */
  thumbObjectPosition?: string
  /** Before image for interactive comparison (use with `afterSrc`). */
  beforeSrc?: string
  /** After image for interactive comparison (use with `beforeSrc`). */
  afterSrc?: string
  beforeAlt?: string
  afterAlt?: string
  /** Fine-tune alignment between before/after layers (`object-position`). */
  beforeObjectPosition?: string
  afterObjectPosition?: string
  /** Tailwind aspect class for the comparison frame (e.g. `aspect-[4/3]`). */
  comparisonAspect?: string
}

/** True when the item should open the interactive before/after slider in the lightbox. */
export function galleryItemIsComparison(item: GalleryItem): boolean {
  return Boolean(item.beforeSrc && item.afterSrc)
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
      "Schedule residential washing for siding, decks, and outdoor living spaces, done safely and thoroughly.",
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
      "Pool decks, common areas, and multi-home schedules: we coordinate with boards and managers.",
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
}

/** Order is intentional: on the All tab, adjacent tiles use different `tagPlaceholder` values where possible. */
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
    id: 5,
    category: "driveways",
    title: "Concrete driveway",
    imageSrc: "/gallery/gallery-05.png",
    thumbSrc: "/gallery/gallery-05.png",
    alt: "Long residential concrete driveway leading toward a garage.",
    tagPlaceholder: "Driveways & Patios",
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
    id: 6,
    category: "driveways",
    title: "Driveway cleaning",
    imageSrc: "/gallery/gallery-06.png",
    thumbSrc: "/gallery/gallery-06.png",
    alt: "Driveway with cleaning solution on the surface in front of a garage.",
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
  {
    id: 10,
    category: "masonry",
    title: "Stone pavers by foundation",
    imageSrc: "/gallery/gallery-10.png",
    thumbSrc: "/gallery/gallery-10.png",
    alt: "A grid of dark square concrete pavers laid on a green lawn next to a light-colored brick house wall.",
    tagPlaceholder: "Masonry & Stone",
    thumbObjectPosition: "center 55%",
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
    id: 9,
    category: "residential",
    title: "Gutter cleaning",
    imageSrc: "/gallery/gallery-09.png",
    thumbSrc: "/gallery/gallery-09.png",
    alt: "Residential roof with dark asphalt shingles and a white gutter full of granules and debris, with brackets visible, viewed from the roofline toward the yard below.",
    tagPlaceholder: "Residential",
    thumbObjectPosition: "48% 42%",
  },
  {
    id: 11,
    category: "before-after",
    title: "Vinyl siding: side wall",
    imageSrc: "/gallery/before-after/01-after.png",
    thumbSrc: "/gallery/before-after/01-after.png",
    alt: "Clean white vinyl siding on a long side wall after house washing.",
    tagPlaceholder: "Before & After",
    beforeSrc: "/gallery/before-after/01-before.png",
    afterSrc: "/gallery/before-after/01-after.png",
    beforeAlt:
      "Side of a house with white vinyl siding heavily stained with dirt and mildew before washing.",
    afterAlt:
      "Same long side wall with bright, clean white siding after soft washing.",
  },
  {
    id: 12,
    category: "before-after",
    title: "Siding: window & utilities",
    imageSrc: "/gallery/before-after/02-after.png",
    thumbSrc: "/gallery/before-after/02-after.png",
    alt: "House siding with window and meter area after exterior cleaning.",
    tagPlaceholder: "Before & After",
    beforeSrc: "/gallery/before-after/02-before.png",
    afterSrc: "/gallery/before-after/02-after.png",
    beforeAlt:
      "Light vinyl siding with heavy grime around a window and electrical meter before cleaning.",
    afterAlt:
      "Same wall with clean siding, crisp window, and tidier utility fixtures after washing.",
  },
  {
    id: 13,
    category: "before-after",
    title: "Driveway & curb",
    imageSrc: "/gallery/before-after/03-after.png",
    thumbSrc: "/gallery/before-after/03-after.png",
    alt: "Concrete driveway and curb at the street after cleaning.",
    tagPlaceholder: "Before & After",
    beforeSrc: "/gallery/before-after/03-before.png",
    afterSrc: "/gallery/before-after/03-after.png",
    beforeAlt:
      "Concrete driveway and curb with dark staining and weathering before pressure washing.",
    afterAlt:
      "Same driveway and curb looking brighter and cleaner after washing.",
  },
  {
    id: 14,
    category: "before-after",
    title: "Driveway & garage",
    imageSrc: "/gallery/before-after/04-after.png",
    thumbSrc: "/gallery/before-after/04-after.png",
    alt: "Residential driveway leading to a white garage door after cleaning.",
    tagPlaceholder: "Before & After",
    beforeSrc: "/gallery/before-after/04-before.png",
    afterSrc: "/gallery/before-after/04-after.png",
    beforeAlt:
      "Stained concrete driveway with hoses and a covered vehicle parked near the garage before cleaning.",
    afterAlt:
      "Same driveway with a fresher, more uniform concrete surface after washing.",
  },
  {
    id: 15,
    category: "before-after",
    title: "Patio & brick exterior",
    imageSrc: "/gallery/before-after/05-after.png",
    thumbSrc: "/gallery/before-after/05-after.png",
    alt: "Concrete patio beside a white brick home after cleaning.",
    tagPlaceholder: "Before & After",
    beforeSrc: "/gallery/before-after/05-before.png",
    afterSrc: "/gallery/before-after/05-after.png",
    beforeAlt:
      "Stained concrete patio and walkway by a white brick wall and doors before cleaning.",
    afterAlt:
      "Same patio area with cleaner concrete and a brighter appearance after washing.",
  },
  {
    id: 16,
    category: "before-after",
    title: "Foundation pavers",
    imageSrc: "/gallery/before-after/06-after.png",
    thumbSrc: "/gallery/before-after/06-after.png",
    alt: "Square pavers beside a foundation after cleaning.",
    tagPlaceholder: "Before & After",
    beforeSrc: "/gallery/before-after/06-before.png",
    afterSrc: "/gallery/before-after/06-after.png",
    beforeAlt:
      "Dark, weathered pavers with grass in the joints beside a brick wall before cleaning.",
    afterAlt:
      "Same paver pad looking cleaner and more uniform after washing.",
  },
  {
    id: 17,
    category: "before-after",
    title: "Residential driveway",
    imageSrc: "/gallery/before-after/07-after.png",
    thumbSrc: "/gallery/before-after/07-after.png",
    alt: "Concrete driveway slabs toward the house after cleaning.",
    tagPlaceholder: "Before & After",
    beforeSrc: "/gallery/before-after/07-before.png",
    afterSrc: "/gallery/before-after/07-after.png",
    beforeAlt:
      "Concrete driveway with damp-looking stains and uneven tone before cleaning.",
    afterAlt:
      "Same driveway with a more even, refreshed concrete appearance after washing.",
  },
  {
    id: 18,
    category: "before-after",
    title: "Driveway & landscape beds",
    imageSrc: "/gallery/before-after/08-after.png",
    thumbSrc: "/gallery/before-after/08-after.png",
    alt: "Driveway with mulch beds and house in the background after cleaning.",
    tagPlaceholder: "Before & After",
    beforeSrc: "/gallery/before-after/08-before.png",
    afterSrc: "/gallery/before-after/08-after.png",
    beforeAlt:
      "Long driveway with dark patches and a center crack line flanked by trees and mulch beds before cleaning.",
    afterAlt:
      "Same driveway looking cleaner and more consistent after pressure washing.",
  },
  {
    id: 19,
    category: "before-after",
    title: "Retaining wall & walk",
    imageSrc: "/gallery/before-after/09-after.png",
    thumbSrc: "/gallery/before-after/09-after.png",
    alt: "Low retaining wall and sidewalk after cleaning.",
    tagPlaceholder: "Before & After",
    beforeSrc: "/gallery/before-after/09-before.png",
    afterSrc: "/gallery/before-after/09-after.png",
    beforeAlt:
      "Concrete retaining wall and sidewalk with weathered surfaces before cleaning.",
    afterAlt:
      "Same wall and walk looking cleaner and brighter after washing.",
  },
  {
    id: 20,
    category: "before-after",
    title: "Lap siding: side elevation",
    imageSrc: "/gallery/before-after/10-after.png",
    thumbSrc: "/gallery/before-after/10-after.png",
    alt: "Tan horizontal siding on the side of a home after washing.",
    tagPlaceholder: "Before & After",
    beforeSrc: "/gallery/before-after/10-before.png",
    afterSrc: "/gallery/before-after/10-after.png",
    beforeAlt:
      "Tan lap siding with mildew and mud staining along the bottom edge before house washing.",
    afterAlt:
      "Same elevation with clean siding and a tidier appearance after soft washing.",
  },
  {
    id: 21,
    category: "before-after",
    title: "Siding: satellite & meters",
    imageSrc: "/gallery/before-after/11-after.png",
    thumbSrc: "/gallery/before-after/11-after.png",
    alt: "House wall with utilities and satellite dish after exterior cleaning.",
    tagPlaceholder: "Before & After",
    beforeSrc: "/gallery/before-after/11-before.png",
    afterSrc: "/gallery/before-after/11-after.png",
    beforeAlt:
      "Beige siding with satellite dish and utility meters on soiled, stained siding before cleaning.",
    afterAlt:
      "Same area with cleaner siding and brighter trim around utilities after washing.",
  },
  {
    id: 22,
    category: "before-after",
    title: "Rear patio & doors",
    imageSrc: "/gallery/before-after/12-after.png",
    thumbSrc: "/gallery/before-after/12-after.png",
    alt: "Back of a home with white siding, patio slab, and rear door after cleaning.",
    tagPlaceholder: "Before & After",
    beforeSrc: "/gallery/before-after/12-before.png",
    afterSrc: "/gallery/before-after/12-after.png",
    beforeAlt:
      "Rear patio and siding before cleaning (paired angle with the after photo).",
    afterAlt:
      "Rear patio with clean white siding, windows, and door: same home after washing.",
  },
  // Wix gallery import — visually matched before/after pairs
  {
    id: 23,
    category: "before-after",
    title: "Deck stairs restoration",
    imageSrc: "/gallery/wix-before-after/pair-01-after.jpg",
    thumbSrc: "/gallery/wix-before-after/pair-01-after.jpg",
    alt: "Deck stairs after cleaning and restoration.",
    tagPlaceholder: "Residential",
    beforeSrc: "/gallery/wix-before-after/pair-02-after.jpg",
    afterSrc: "/gallery/wix-before-after/pair-01-after.jpg",
    beforeAlt: "Grimy weathered deck stairs before cleaning.",
    afterAlt: "Same deck stairs freshly cleaned and looking restored.",
  },
  {
    id: 24,
    category: "before-after",
    title: "Fence gate restoration",
    imageSrc: "/gallery/wix-before-after/pair-04-after.jpg",
    thumbSrc: "/gallery/wix-before-after/pair-04-after.jpg",
    alt: "Fence gate freshly stained after cleaning.",
    tagPlaceholder: "Residential",
    beforeSrc: "/gallery/wix-before-after/pair-03-after.jpg",
    afterSrc: "/gallery/wix-before-after/pair-04-after.jpg",
    beforeAlt: "Weathered grey wooden fence gate before cleaning and staining.",
    afterAlt: "Same fence gate looking freshly stained and restored after cleaning.",
  },
  {
    id: 25,
    category: "before-after",
    title: "Rug deep cleaning",
    imageSrc: "/gallery/wix-before-after/pair-06-after.jpg",
    thumbSrc: "/gallery/wix-before-after/pair-06-after.jpg",
    alt: "Moroccan-pattern area rug after deep cleaning.",
    tagPlaceholder: "Residential",
    beforeSrc: "/gallery/wix-before-after/pair-05-after.jpg",
    afterSrc: "/gallery/wix-before-after/pair-06-after.jpg",
    beforeAlt: "Grey moroccan-pattern rug heavily soiled before cleaning.",
    afterAlt: "Same rug looking clean and refreshed after deep cleaning.",
  },
  {
    id: 26,
    category: "before-after",
    title: "Sloped residential driveway",
    imageSrc: "/gallery/wix-before-after/pair-08-after.jpg",
    thumbSrc: "/gallery/wix-before-after/pair-08-after.jpg",
    alt: "Sloped concrete driveway after pressure washing.",
    tagPlaceholder: "Driveways & Patios",
    beforeSrc: "/gallery/wix-before-after/pair-07-after.jpg",
    afterSrc: "/gallery/wix-before-after/pair-08-after.jpg",
    beforeAlt: "Stained sloped residential driveway with dark streaks before washing.",
    afterAlt: "Same sloped driveway clean and bright after pressure washing.",
  },
  {
    id: 27,
    category: "before-after",
    title: "Townhouse double-garage driveway",
    imageSrc: "/gallery/wix-before-after/pair-10-after.jpg",
    thumbSrc: "/gallery/wix-before-after/pair-10-after.jpg",
    alt: "Townhouse double-garage driveway after pressure washing.",
    tagPlaceholder: "Driveways & Patios",
    beforeSrc: "/gallery/wix-before-after/pair-09-after.jpg",
    afterSrc: "/gallery/wix-before-after/pair-10-after.jpg",
    beforeAlt: "Townhouse driveway with heavy dark oil and stain streaks before washing.",
    afterAlt: "Same townhouse driveway uniformly clean after pressure washing.",
  },
  {
    id: 28,
    category: "before-after",
    title: "Wood deck cleaning",
    imageSrc: "/gallery/wix-before-after/pair-12-after.jpg",
    thumbSrc: "/gallery/wix-before-after/pair-12-after.jpg",
    alt: "Wood deck boards clean after soft washing.",
    tagPlaceholder: "Residential",
    beforeSrc: "/gallery/wix-before-after/pair-11-after.jpg",
    afterSrc: "/gallery/wix-before-after/pair-12-after.jpg",
    beforeAlt: "Wood deck covered in green algae and mold before cleaning.",
    afterAlt: "Same deck boards clean and free of algae after soft washing.",
  },
  {
    id: 29,
    category: "before-after",
    title: "House siding wash",
    imageSrc: "/gallery/wix-before-after/pair-11-before.jpg",
    thumbSrc: "/gallery/wix-before-after/pair-11-before.jpg",
    alt: "White house siding clean after exterior washing.",
    tagPlaceholder: "Residential",
    beforeSrc: "/gallery/wix-before-after/pair-12-before.jpg",
    afterSrc: "/gallery/wix-before-after/pair-11-before.jpg",
    beforeAlt: "White two-story house with heavy black mold and streaks before washing.",
    afterAlt: "Same house with clean bright white siding after soft washing.",
  },
  {
    id: 30,
    category: "before-after",
    title: "Tan house siding wash",
    imageSrc: "/gallery/wix-before-after/pair-08-before.jpg",
    thumbSrc: "/gallery/wix-before-after/pair-08-before.jpg",
    alt: "Tan house siding clean after exterior washing.",
    tagPlaceholder: "Residential",
    beforeSrc: "/gallery/wix-before-after/pair-07-before.jpg",
    afterSrc: "/gallery/wix-before-after/pair-08-before.jpg",
    beforeAlt: "Tan siding house heavily stained with algae and mildew before washing.",
    afterAlt: "Same house with clean tan siding and bright trim after soft washing.",
  },
  {
    id: 31,
    category: "before-after",
    title: "Rear concrete patio",
    imageSrc: "/gallery/wix-before-after/pair-06-before.jpg",
    thumbSrc: "/gallery/wix-before-after/pair-06-before.jpg",
    alt: "Rear concrete patio slab clean after pressure washing.",
    tagPlaceholder: "Driveways & Patios",
    beforeSrc: "/gallery/wix-before-after/pair-05-before.jpg",
    afterSrc: "/gallery/wix-before-after/pair-06-before.jpg",
    beforeAlt: "Rear patio concrete slab with grime and staining before washing.",
    afterAlt: "Same patio slab clean and bright after pressure washing.",
  },
  {
    id: 32,
    category: "before-after",
    title: "House side siding wash",
    imageSrc: "/gallery/wix-before-after/overflow-02.jpg",
    thumbSrc: "/gallery/wix-before-after/overflow-02.jpg",
    alt: "Tall cream house siding clean after washing.",
    tagPlaceholder: "Residential",
    beforeSrc: "/gallery/wix-before-after/overflow-01.jpg",
    afterSrc: "/gallery/wix-before-after/overflow-02.jpg",
    beforeAlt: "Tall two-story cream house side siding with algae and mildew before washing.",
    afterAlt: "Same cream siding bright and clean after exterior washing.",
  },
  {
    id: 33,
    category: "before-after",
    title: "Brick home driveway",
    imageSrc: "/gallery/wix-before-after/overflow-04.jpg",
    thumbSrc: "/gallery/wix-before-after/overflow-04.jpg",
    alt: "Brick home driveway clean after pressure washing.",
    tagPlaceholder: "Driveways & Patios",
    beforeSrc: "/gallery/wix-before-after/overflow-03.jpg",
    afterSrc: "/gallery/wix-before-after/overflow-04.jpg",
    beforeAlt: "Stained concrete driveway at a brick home during pressure washing.",
    afterAlt: "Same brick home driveway clean and uniform after washing.",
  },
  {
    id: 34,
    category: "before-after",
    title: "House exterior siding",
    imageSrc: "/gallery/wix-before-after/overflow-06.jpg",
    thumbSrc: "/gallery/wix-before-after/overflow-06.jpg",
    alt: "House exterior siding clean after washing.",
    tagPlaceholder: "Residential",
    beforeSrc: "/gallery/wix-before-after/overflow-05.jpg",
    afterSrc: "/gallery/wix-before-after/overflow-06.jpg",
    beforeAlt: "Cream house siding with lean-to outbuilding, algae staining before washing.",
    afterAlt: "Same house siding and outbuilding area clean after soft washing.",
  },
  {
    id: 35,
    category: "before-after",
    title: "Residential driveway",
    imageSrc: "/gallery/wix-before-after/overflow-08.jpg",
    thumbSrc: "/gallery/wix-before-after/overflow-08.jpg",
    alt: "Residential driveway clean after pressure washing.",
    tagPlaceholder: "Driveways & Patios",
    beforeSrc: "/gallery/wix-before-after/overflow-07.jpg",
    afterSrc: "/gallery/wix-before-after/overflow-08.jpg",
    beforeAlt: "Long residential driveway stained and dirty before washing.",
    afterAlt: "Same driveway clean and evenly bright after pressure washing.",
  },
  {
    id: 36,
    category: "before-after",
    title: "Cream house exterior",
    imageSrc: "/gallery/wix-before-after/pair-02-before.jpg",
    thumbSrc: "/gallery/wix-before-after/pair-02-before.jpg",
    alt: "Corner view of a cream house exterior after washing.",
    tagPlaceholder: "Residential",
    beforeSrc: "/gallery/wix-before-after/pair-01-before.jpg",
    afterSrc: "/gallery/wix-before-after/pair-02-before.jpg",
    beforeAlt: "Side of a cream house with HVAC unit and algae staining before exterior washing.",
    afterAlt: "Corner view of the same cream house exterior after washing.",
  },
  {
    id: 37,
    category: "before-after",
    title: "Two-story house rear",
    imageSrc: "/gallery/wix-before-after/pair-04-before.jpg",
    thumbSrc: "/gallery/wix-before-after/pair-04-before.jpg",
    alt: "Two-story home rear from a side angle after washing.",
    tagPlaceholder: "Residential",
    beforeSrc: "/gallery/wix-before-after/pair-03-before.jpg",
    afterSrc: "/gallery/wix-before-after/pair-04-before.jpg",
    beforeAlt: "Rear of a two-story home with deck and heavy algae staining before washing.",
    afterAlt: "Same two-story home rear from a side angle showing the extent of cleaning.",
  },
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
