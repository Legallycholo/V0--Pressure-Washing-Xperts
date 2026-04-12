/**
 * Central config for residential leaf service pages — benefits-column imagery.
 * Paths are under /public/residential-services/.
 */

const R = "/residential-services"

/** Props accepted by ServicePageTemplate for the benefits-section media block (subset). */
export const residentialHouseWashingMedia = {
  imageSrc: `${R}/house-washing-01.png`,
  imageAlt:
    "Residential home with white horizontal siding, windows, and entry door — exterior ready for soft washing",
} as const

export const residentialDecksFencesMedia = {
  splitImages: [
    {
      src: `${R}/decks-fences-01.png`,
      alt: "Weathered wood deck structure and railing on a multi-story residential building",
    },
    {
      src: `${R}/decks-fences-02.png`,
      alt: "Dark-stained outdoor wood bar counter and posts on a stone patio beside a home",
    },
  ] as const,
} as const

export const residentialDrivewaysSidewalksMedia = {
  splitImages: [
    {
      src: `${R}/driveways-sidewalks-01.png`,
      alt: "Long concrete driveway with pressure washing surface cleaner toward a blue house and garage",
    },
    {
      src: `${R}/driveways-sidewalks-02.png`,
      alt: "Concrete sidewalk slabs with expansion joints and utility access near a lawn",
    },
  ] as const,
} as const

export const residentialBrickStoneMasonryMedia = {
  beforeSrc: `${R}/masonry-before.png`,
  afterSrc: `${R}/masonry-after.png`,
  beforeAlt: "Square concrete pavers beside a brick wall with uneven joints and weeds growing between stones",
  afterAlt: "Same paver area with joints cleaned and surface improved after service",
  comparisonLabel: "paver patio beside brick wall",
} as const

export const residentialGuttersMedia = {
  beforeSrc: `${R}/gutters-before.png`,
  afterSrc: `${R}/gutters-after.png`,
  beforeAlt: "Roof gutter packed with dry brown leaves blocking drainage along the eave",
  afterAlt: "Same gutter line cleared of heavy debris with shingle granule buildup visible for comparison",
  comparisonLabel: "roof gutter cleaning",
} as const

export const residentialCurbingMedia = {
  beforeSrc: `${R}/curbing-before.png`,
  afterSrc: `${R}/curbing-after.png`,
  beforeAlt: "Residential street curb, sidewalk, and lawn with mailbox from a low street perspective",
  afterAlt: "Same neighborhood curb and sidewalk scene after cleaning",
  comparisonLabel: "curb and sidewalk",
} as const
