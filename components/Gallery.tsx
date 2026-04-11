"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { X, ChevronLeft, ChevronRight, Expand, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  GALLERY_TEASER_COUNT,
  galleryCategories,
  galleryCtaByCategory,
  galleryItems,
  getGalleryCategoryLabel,
  isValidGalleryCategoryParam,
  type GalleryFilterId,
  type GalleryItem,
} from "@/data/gallery"

export type GalleryVariant = "teaser" | "full"

interface GalleryProps {
  variant?: GalleryVariant
}

function GalleryLightbox({
  itemsForView,
  lightboxIndex,
  closeLightbox,
  navigateLightbox,
  showTagPlaceholder = true,
}: {
  itemsForView: GalleryItem[]
  lightboxIndex: number
  closeLightbox: () => void
  navigateLightbox: (direction: "prev" | "next") => void
  /** When false, hides the yellow tag line (homepage Our Work teaser). */
  showTagPlaceholder?: boolean
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        closeLightbox()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [closeLightbox])

  const item = itemsForView[lightboxIndex]
  if (!item) return null

  // Portal to body: animated sections use `transform`, which makes fixed children position against that box instead of the viewport (overlay/nav clash).
  const overlay = (
    <div
      className="fixed inset-0 z-[100] flex h-[100dvh] max-h-[100dvh] flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
    >
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 px-3 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={closeLightbox}
          title="Close viewer (Escape)"
          aria-label="Exit gallery viewer"
          className="border-white/80 bg-black/60 font-semibold text-white shadow-lg hover:bg-white/15 hover:text-white"
        >
          <X className="size-5" aria-hidden />
          Exit
          <span className="ml-1 hidden text-xs font-normal text-white/70 sm:inline">(Esc)</span>
        </Button>
      </div>

      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0 px-2 pb-1 pt-0 sm:px-10 sm:pb-2">
          <div className="relative h-full w-full">
            {item.imageSrc ? (
              <Image
                src={item.imageSrc}
                alt={item.alt ?? item.title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1536px) 92vw, 1400px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/40 to-section-dark-alt">
                <div className="text-center text-white">
                  <div className="mb-4 text-6xl font-bold">{item.id}</div>
                  <h2 className="mb-2 text-2xl font-semibold">{item.title}</h2>
                  <p className="text-white/60">{getGalleryCategoryLabel(item.category)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigateLightbox("prev")}
          className="absolute left-1 top-1/2 z-20 -translate-y-1/2 p-2 text-white/70 transition-colors hover:text-white sm:left-3"
          aria-label="Previous"
        >
          <ChevronLeft className="size-10 sm:size-12" />
        </button>

        <button
          type="button"
          onClick={() => navigateLightbox("next")}
          className="absolute right-1 top-1/2 z-20 -translate-y-1/2 p-2 text-white/70 transition-colors hover:text-white sm:right-3"
          aria-label="Next"
        >
          <ChevronRight className="size-10 sm:size-12" />
        </button>
      </div>

      <div className="shrink-0 space-y-1 border-t border-white/10 bg-black/50 px-4 py-3 text-center pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <p className="text-sm font-medium text-white">{item.title}</p>
        <p className="text-xs text-white/60">{getGalleryCategoryLabel(item.category)}</p>
        {showTagPlaceholder && item.tagPlaceholder ? (
          <p className="text-xs text-brand-yellow/90">{item.tagPlaceholder}</p>
        ) : null}
        <p className="text-sm text-white/50">
          {lightboxIndex + 1} of {itemsForView.length}
        </p>
      </div>
    </div>
  )

  if (typeof document === "undefined") return null
  return createPortal(overlay, document.body)
}

function useGalleryLightbox(itemsForView: GalleryItem[]) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ""
  }, [])

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxIndex === null || itemsForView.length === 0) return
    const newIndex =
      direction === "prev"
        ? (lightboxIndex - 1 + itemsForView.length) % itemsForView.length
        : (lightboxIndex + 1) % itemsForView.length
    setLightboxIndex(newIndex)
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return { lightboxIndex, openLightbox, closeLightbox, navigateLightbox }
}

function GalleryGrid({
  itemsForView,
  onOpen,
  showTagChips = true,
}: {
  itemsForView: GalleryItem[]
  onOpen: (index: number) => void
  /** When false, hides tag pills on tiles (homepage Our Work teaser). */
  showTagChips?: boolean
}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {itemsForView.map((item, index) => (
        <div
          key={item.id}
          className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl"
          onClick={() => onOpen(index)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              onOpen(index)
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Open ${item.title} in viewer`}
        >
          {item.thumbSrc || item.imageSrc ? (
            <Image
              src={item.thumbSrc ?? item.imageSrc!}
              alt={item.alt ?? item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-blue/40 to-section-dark-alt">
              <div className="text-center text-white/40">
                <div className="mb-1 text-4xl font-bold">{item.id}</div>
                <div className="text-xs">{item.title}</div>
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 pb-3 pt-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex min-h-6 min-w-6 items-center justify-center rounded bg-white/20 px-1.5 text-xs font-bold text-white">
                {item.id}
              </span>
              {showTagChips && item.tagPlaceholder ? (
                <span className="line-clamp-2 rounded-full bg-brand-yellow/95 px-2.5 py-0.5 text-left text-[10px] font-semibold leading-tight text-brand-blue-dark sm:text-xs">
                  {item.tagPlaceholder}
                </span>
              ) : null}
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-brand-blue-dark/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="text-center px-2">
              <Expand className="mx-auto mb-2 size-8 text-brand-yellow" aria-hidden />
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="text-xs text-white/60">{getGalleryCategoryLabel(item.category)}</p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/10" />
        </div>
      ))}
    </div>
  )
}

function GalleryTeaser() {
  const itemsForView = useMemo(() => galleryItems.slice(0, GALLERY_TEASER_COUNT), [])
  const { lightboxIndex, openLightbox, closeLightbox, navigateLightbox } =
    useGalleryLightbox(itemsForView)

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="animate-fade-in-up bg-section-dark py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            Our Work
          </p>
          <h2
            id="gallery-heading"
            className="text-balance text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            Project Gallery
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Browse our portfolio of completed residential and commercial projects across Metro Atlanta.
          </p>
        </div>

        <GalleryGrid
          itemsForView={itemsForView}
          onOpen={openLightbox}
          showTagChips={false}
        />

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <Button
            asChild
            size="lg"
            className="bg-brand-yellow font-bold text-brand-blue-dark hover:bg-brand-yellow-dark"
          >
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
          <a
            href="tel:800-451-7213"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border border-white/60 rounded-md hover:border-white hover:bg-white/10 transition-all font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-section-dark"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            <span>Call Now</span>
          </a>
        </div>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          itemsForView={itemsForView}
          lightboxIndex={lightboxIndex}
          closeLightbox={closeLightbox}
          navigateLightbox={navigateLightbox}
          showTagPlaceholder={false}
        />
      )}
    </section>
  )
}

function GalleryFull() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<GalleryFilterId>("all")

  useEffect(() => {
    const param = searchParams.get("category")
    if (param === null || param === "") {
      setActiveCategory("all")
      return
    }
    if (isValidGalleryCategoryParam(param)) {
      setActiveCategory(param)
    } else {
      setActiveCategory("all")
    }
  }, [searchParams])

  const setCategory = useCallback(
    (id: GalleryFilterId) => {
      setActiveCategory(id)
      const params = new URLSearchParams(searchParams.toString())
      if (id === "all") {
        params.delete("category")
      } else {
        params.set("category", id)
      }
      const qs = params.toString()
      router.replace(qs ? `/gallery?${qs}` : "/gallery", { scroll: false })
    },
    [router, searchParams]
  )

  const filteredItems: GalleryItem[] = useMemo(() => {
    if (activeCategory === "all") return galleryItems
    return galleryItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const { lightboxIndex, openLightbox, closeLightbox, navigateLightbox } =
    useGalleryLightbox(filteredItems)

  const cta = galleryCtaByCategory[activeCategory]

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="animate-fade-in-up bg-section-dark py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            Our Work
          </p>
          <h1
            id="gallery-heading"
            className="text-balance text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            Project Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Browse our portfolio of completed residential and commercial projects across Metro Atlanta.
          </p>
        </div>

        <div className="mb-10">
          <div
            role="tablist"
            aria-label="Filter gallery by category"
            className="flex flex-wrap justify-center gap-2"
          >
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                id={`gallery-tab-${category.id}`}
                onClick={() => setCategory(category.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-section-dark ${
                  activeCategory === category.id
                    ? "bg-brand-yellow text-brand-blue-dark"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <p className="py-12 text-center text-lg text-white/60">
            No gallery items in this category yet.
          </p>
        ) : (
          <GalleryGrid itemsForView={filteredItems} onOpen={openLightbox} />
        )}

        <div
          className="mx-auto mt-12 max-w-2xl text-center"
          aria-labelledby="gallery-cta-heading"
        >
          <h2
            id="gallery-cta-heading"
            className="text-balance text-2xl font-bold text-white sm:text-3xl"
          >
            {cta.title}
          </h2>
          <p className="mt-3 text-pretty text-lg text-white/70">{cta.description}</p>
          <a
            href="tel:800-451-7213"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border border-white/60 rounded-md hover:border-white hover:bg-white/10 transition-all font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-section-dark"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            <span>Call Now</span>
          </a>
        </div>

        {lightboxIndex !== null && (
          <GalleryLightbox
            itemsForView={filteredItems}
            lightboxIndex={lightboxIndex}
            closeLightbox={closeLightbox}
            navigateLightbox={navigateLightbox}
          />
        )}
      </div>
    </section>
  )
}

export function Gallery({ variant = "full" }: GalleryProps) {
  if (variant === "teaser") {
    return <GalleryTeaser />
  }
  return <GalleryFull />
}
