"use client"

import { useState, useEffect } from "react"
import { Phone } from "lucide-react"

export function FloatingCallButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (approximately)
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <a
      href="tel:800-451-7213"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-brand-yellow text-brand-blue-dark font-bold px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-brand-yellow-dark hover:scale-105 md:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
      aria-label="Call us now"
    >
      <Phone className="size-5" />
      <span className="text-sm">Call Now</span>
    </a>
  )
}
