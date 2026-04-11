import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Project Gallery | Pressure Washing Xperts",
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
