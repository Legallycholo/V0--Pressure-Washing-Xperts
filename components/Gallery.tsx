"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "all", label: "All" },
  { id: "residential", label: "Residential" },
  { id: "roof", label: "Roof Cleaning" },
  { id: "commercial", label: "Commercial" },
  { id: "industrial", label: "Industrial" },
  { id: "driveways", label: "Driveways & Patios" },
  { id: "hoa", label: "HOA & Community" },
  { id: "masonry", label: "Masonry & Stone" },
  { id: "before-after", label: "Before & After" },
]

// Placeholder gallery items - these will be replaced with real images
const galleryItems = [
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
]

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [showFullGallery, setShowFullGallery] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  const displayedItems = showFullGallery ? filteredItems : filteredItems.slice(0, 8)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    document.body.style.overflow = ""
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return
    const newIndex = direction === "prev"
      ? (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
      : (lightboxIndex + 1) % filteredItems.length
    setLightboxIndex(newIndex)
  }

  return (
    <section id="gallery" className="py-20 bg-section-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-brand-yellow font-semibold text-sm uppercase tracking-wider mb-3">
            Our Work
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
            Project Gallery
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">
            Browse our portfolio of completed projects across residential, commercial, and industrial properties.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-2 min-w-max justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  setShowFullGallery(false)
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
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

        {/* Gallery Grid */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayedItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
              onClick={() => openLightbox(index)}
            >
              {/* Placeholder Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/40 to-section-dark-alt flex items-center justify-center">
                <div className="text-center text-white/40">
                  <div className="text-4xl font-bold mb-1">{item.id}</div>
                  <div className="text-xs">{item.title}</div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-brand-blue-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <Expand className="size-8 text-brand-yellow mx-auto mb-2" />
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-white/60 text-xs capitalize">{item.category.replace("-", " & ")}</p>
                </div>
              </div>

              {/* Border */}
              <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View Full Gallery Button */}
        {!showFullGallery && filteredItems.length > 8 && (
          <div className="mt-10 text-center">
            <Button
              onClick={() => setShowFullGallery(true)}
              size="lg"
              className="bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark"
            >
              View Full Gallery
            </Button>
          </div>
        )}

        {showFullGallery && (
          <div className="mt-10 text-center">
            <Button
              onClick={() => setShowFullGallery(false)}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Show Less
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="size-8" />
          </button>

          {/* Navigation - Previous */}
          <button
            onClick={() => navigateLightbox("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-10" />
          </button>

          {/* Navigation - Next */}
          <button
            onClick={() => navigateLightbox("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="size-10" />
          </button>

          {/* Image Content */}
          <div className="max-w-4xl w-full mx-4">
            <div className="aspect-[4/3] bg-gradient-to-br from-brand-blue/40 to-section-dark-alt rounded-xl flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl font-bold mb-4">{filteredItems[lightboxIndex].id}</div>
                <h3 className="text-2xl font-semibold mb-2">{filteredItems[lightboxIndex].title}</h3>
                <p className="text-white/60 capitalize">
                  {filteredItems[lightboxIndex].category.replace("-", " & ")}
                </p>
              </div>
            </div>
            <div className="mt-4 text-center text-white/50 text-sm">
              {lightboxIndex + 1} of {filteredItems.length}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
