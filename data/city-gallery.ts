import { galleryItemIsComparison, galleryItems, type GalleryItem } from "@/data/gallery"

/** Before/after gallery item ids (`galleryItems`) shown on each city page (rotated for variety). */
export const CITY_GALLERY_ITEM_IDS: Record<string, number[]> = {
  atlanta: [11, 12],
  alpharetta: [13, 14],
  marietta: [15, 16],
  roswell: [17, 18],
  "sandy-springs": [19, 20],
  "johns-creek": [21, 22],
  duluth: [11, 15],
  norcross: [12, 16],
  "peachtree-corners": [13, 17],
  suwanee: [14, 18],
  cumming: [19, 11],
  decatur: [20, 12],
  smyrna: [21, 13],
  dunwoody: [22, 14],
  brookhaven: [15, 19],
  tucker: [16, 20],
}

export function getCityGalleryComparisonItems(slug: string): GalleryItem[] {
  const ids = CITY_GALLERY_ITEM_IDS[slug] ?? [11, 12]
  return ids
    .map((id) => galleryItems.find((g) => g.id === id))
    .filter((item): item is GalleryItem => Boolean(item && galleryItemIsComparison(item)))
}
