# Gallery - structure and follow-ups

This document describes how the Project Gallery is split between the **homepage teaser** and the **full gallery page**, and what to improve next.

## Routes

| URL | Purpose |
|-----|---------|
| `/` (`#gallery`) | Homepage section: **teaser only** - no category pills, first 8 placeholder tiles, **View Full Gallery** links to `/gallery`. |
| `/gallery` | **Canonical** full gallery: category pills, filtered grid, lightbox, optional query `?category=<id>`. |
| `/about/gallery` | **Redirects** to `/gallery` (preserves old bookmarks). |

## Components

- [`components/Gallery.tsx`](components/Gallery.tsx) exports `Gallery` with `variant="teaser" | "full"`.
  - **Teaser** - no `useSearchParams` (no Suspense required on the homepage).
  - **Full** - uses `useSearchParams` + `router.replace` for shareable filter URLs; parent wraps it in `<Suspense>` in [`app/gallery/page.tsx`](app/gallery/page.tsx).

Shared pieces inside the file:

- `GalleryGrid` - responsive 2 / 3 / 4 column grid, keyboard-activatable tiles.
- `GalleryLightbox` - modal viewer; indexes always refer to the **currently visible** item list (teaser: 8 items; full: filtered list).
- `useGalleryLightbox` - body scroll lock + cleanup on unmount.

## Data

- [`data/gallery.ts`](data/gallery.ts) - `galleryCategories`, `galleryItems`, `GALLERY_TEASER_COUNT`, helpers `getGalleryCategoryLabel`, `isValidGalleryCategoryParam`.
- Extend **`GalleryItem`** with `imageSrc`, `thumbSrc`, and `alt` when replacing placeholders with real photos; then swap gradient tiles for `next/image`.

## Navigation

- About → Gallery in [`data/navigation.ts`](data/navigation.ts) points to **`/gallery`**.

## SEO

- Title and description for `/gallery` live in [`app/gallery/layout.tsx`](app/gallery/layout.tsx) (`metadata` export).

## Accessibility

- Full gallery filters use **`role="tablist"`** / **`role="tab"`** with `aria-selected`.
- Section uses `aria-labelledby` pointing at the main heading (`gallery-heading`).
- Teaser uses `<h2>`; full page uses `<h1>` for the same visible title (single H1 on the gallery page).

## Suggested improvements (later)

1. **Real media** - `next/image`, fixed aspect ratio, lazy loading below the fold.
2. **Before & After** - optional `layout: "split"` or dedicated item type for side-by-side comparisons when filtering **Before & After**.
3. **Invalid `?category=`** - currently resets UI to “All”; optionally strip bad params from the URL in one replace.
4. **Featured teaser** - replace “first 8 items” with an explicit `featuredIds` list in data when marketing picks highlights.
5. **Performance** - virtualize the grid if the item count grows large.
