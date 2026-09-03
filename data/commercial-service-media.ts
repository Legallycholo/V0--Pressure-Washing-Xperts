/**
 * Central config for commercial leaf service pages: benefits-column imagery.
 * Paths are under /public/commercial-services/.
 */

const C = "/commercial-services"

export const commercialTruckWashingMedia = {
  beforeSrc: `${C}/truck-washing-before.webp`,
  afterSrc: `${C}/truck-washing-after.webp`,
  beforeAlt:
    "Commercial semi-truck and box truck with highway road film, diesel soot, and dirty wheels in Atlanta yard",
  afterAlt:
    "Same commercial truck washed clean with polished rims, clear glass, and bright cab finish",
  comparisonLabel: "commercial truck washing",
} as const
