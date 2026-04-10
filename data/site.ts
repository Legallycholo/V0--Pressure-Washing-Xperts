/** Single source for business location and top-bar slogan (navbar, footer, contact). */

export const navSlogan =
  'We don\'t do "good enough." We do Xpert.' as const

export const businessAddressLines = [
  "2193 Gateway Trl",
  "Ellenwood, GA 30294",
] as const

export const businessAddress =
  `${businessAddressLines[0]}, ${businessAddressLines[1]}` as const

export const businessMapsUrl =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessAddress)}`
