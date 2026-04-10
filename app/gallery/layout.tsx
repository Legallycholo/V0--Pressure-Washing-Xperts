import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Project Gallery | Pressure Washing Xperts",
  description:
    "Browse our portfolio of pressure washing projects across residential, commercial, and industrial properties in Metro Atlanta.",
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
