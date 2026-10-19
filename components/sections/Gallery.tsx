"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { X, ChevronLeft, ChevronRight, Expand, ArrowRight } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider"
import { CtaButtons } from "@/components/sections/CtaButtons"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { Reveal } from "@/components/motion/Reveal"
import { cn } from "@/lib/utils"
import {
  GALLERY_TEASER_COUNT,
  galleryCategories,
  galleryCtaByCategory,
  galleryItemIsComparison,
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
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

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

  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [lightboxIndex])

  const item = itemsForView[lightboxIndex]
  if (!item) return null

  const isComparison = galleryItemIsComparison(item)

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !overlayRef.current) return
    const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    const list = Array.from(focusables).filter(
      (el) => !el.hasAttribute("hidden") && (el.offsetParent !== null || el.getClientRects().length > 0)
    )
    if (list.length === 0) return
    const first = list[0]
    const last = list[list.length - 1]
    const active = document.activeElement
    if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    } else if (e.shiftKey && active === first) {
      e.preventDefault()
      last.focus()
    }
  }

  // Portal to body: animated sections use `transform`, which makes fixed children position against that box instead of the viewport (overlay/nav clash).
  const overlay = (
    <div
      ref={overlayRef}
      onKeyDown={handleOverlayKeyDown}
      className="fixed inset-0 z-[100] flex h-[100dvh] max-h-[100dvh] flex-col bg-black/95 outline-none"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
    >
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 px-3 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={closeLightbox}
          title="Close viewer (Escape)"
          aria-label="Exit gallery viewer"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "border-white/80 bg-black/60 font-semibold text-white shadow-lg hover:bg-white/15 hover:text-white"
          )}
        >
          <X className="size-5" aria-hidden />
          Exit
          <span className="ml-1 hidden text-xs font-normal text-white/70 sm:inline">(Esc)</span>
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0 flex items-center justify-center px-2 pb-1 pt-0 sm:px-10 sm:pb-2">
          <div className="relative flex h-full w-full min-h-0 items-center justify-center">
            {isComparison && item.beforeSrc && item.afterSrc ? (
              <BeforeAfterSlider
                key={`${item.id}-${lightboxIndex}`}
                beforeSrc={item.beforeSrc}
                afterSrc={item.afterSrc}
                beforeAlt={item.beforeAlt ?? `Before: ${item.title}`}
                afterAlt={item.afterAlt ?? `After: ${item.title}`}
                beforeObjectPosition={item.beforeObjectPosition}
                afterObjectPosition={item.afterObjectPosition}
                comparisonLabel={item.title}
                aspectClassName={item.comparisonAspect ?? "aspect-[4/3]"}
                sizes="(max-width: 640px) 100vw, (max-width: 1536px) 92vw, 1400px"
                variant="lightbox"
                className="w-full max-h-[min(72dvh,85svh)] max-w-5xl shadow-black/40"
              />
            ) : item.imageSrc ? (
              <div className="relative h-full w-full min-h-0">
                <Image
                  src={item.imageSrc}
                  alt={item.alt ?? item.title}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1536px) 92vw, 1400px"
                />
              </div>
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
  const activatorRef = useRef<Element | null>(null)

  const openLightbox = (index: number, activator?: Element | null) => {
    activatorRef.current = activator ?? null
    setLightboxIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ""
    requestAnimationFrame(() => {
      const el = activatorRef.current
      if (el instanceof HTMLElement) el.focus()
    })
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
  onOpen: (index: number, activator?: Element | null) => void
  /** When false, hides tag pills on tiles (homepage Our Work teaser). */
  showTagChips?: boolean
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {itemsForView.map((item, index) => (
        <div
          key={item.id}
          className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-section-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={(e) => onOpen(index, e.currentTarget)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              onOpen(index, e.currentTarget)
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Open ${item.title} in viewer`}
        >
          {item.thumbSrc || item.imageSrc ? (
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={item.thumbSrc ?? item.imageSrc!}
                alt={item.alt ?? item.title}
                fill
                className="h-full w-full object-cover transition-transform duration-300 will-change-transform [transform:translateZ(0)] group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                style={{
                  objectFit: "cover",
                  objectPosition: item.thumbObjectPosition ?? "center",
                }}
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-blue/40 to-section-dark-alt">
              <div className="text-center text-white/40">
                <div className="mb-1 text-4xl font-bold">{item.id}</div>
                <div className="text-xs">{item.title}</div>
              </div>
            </div>
          )}

          {showTagChips && item.tagPlaceholder ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-10">
              <span className="line-clamp-2 inline-block rounded-full bg-white/95 px-2.5 py-0.5 text-left text-[11px] font-semibold leading-tight text-brand-blue-dark sm:text-xs">
                {item.tagPlaceholder}
              </span>
            </div>
          ) : null}

          <div className="absolute inset-0 flex items-center justify-center bg-brand-blue-dark/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <div className="px-2 text-center">
              <Expand className="mx-auto mb-2 size-7 text-white" aria-hidden />
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="text-xs text-white/70">{getGalleryCategoryLabel(item.category)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function GalleryTeaser() {
  const itemsForView = useMemo(() => {
    const featured = galleryItems.filter((item) => item.homepageFeatured)
    const remaining = galleryItems.filter((item) => !item.homepageFeatured)
    return [...featured, ...remaining].slice(0, GALLERY_TEASER_COUNT)
  }, [])
  const { lightboxIndex, openLightbox, closeLightbox, navigateLightbox } =
    useGalleryLightbox(itemsForView)

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10">
          <SectionHeading
            id="gallery-heading"
            eyebrow="Our work"
            title="Recent projects around Metro Atlanta"
            description="Homes, driveways, and commercial properties we've cleaned recently. Tap any photo to view it full size."
          />
        </Reveal>

        <GalleryGrid
          itemsForView={itemsForView}
          onOpen={openLightbox}
          showTagChips={false}
        />

        <div className="mt-8 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/gallery">
              View full gallery
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
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
      className="bg-white py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          id="gallery-heading"
          eyebrow="Our work"
          title="Project gallery"
          description="Completed residential and commercial projects across Metro Atlanta. Filter by service or tap a photo to view it full size."
          className="mb-8"
        />

        <div className="mb-8">
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
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  activeCategory === category.id
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-border bg-white text-brand-blue-dark hover:border-brand-blue/40 hover:bg-accent"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <p className="py-8 text-center text-base text-muted-foreground">
            Images coming soon.
          </p>
        ) : (
          <GalleryGrid itemsForView={filteredItems} onOpen={openLightbox} />
        )}

        <div
          className="mx-auto mt-14 max-w-2xl rounded-2xl border border-border bg-section-light px-6 py-10 text-center"
          aria-labelledby="gallery-cta-heading"
        >
          <h2
            id="gallery-cta-heading"
            className="text-xl font-bold text-brand-blue-dark sm:text-2xl"
          >
            {cta.title}
          </h2>
          <p className="mt-2 text-pretty text-base text-muted-foreground">{cta.description}</p>
          <CtaButtons className="mt-6" />
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
