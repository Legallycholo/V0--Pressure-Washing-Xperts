export type CityTestimonial = {
  name: string
  locationLabel: string
  rating: number
  text: string
  service: string
}

/** Two reviews shown per city page. Alpharetta, Marietta, and Roswell use localized voice; others use strong Atlanta Metro reviews. */
const ATLANTA_METRO_PAIR: CityTestimonial[] = [
  {
    name: "Mina Beverly",
    locationLabel: "Metro Atlanta",
    rating: 5,
    text: "Arthur did a thorough job. My home looks almost brand new. I’m happy with his work. I would recommend.",
    service: "House Washing",
  },
  {
    name: "Vanessa Cook",
    locationLabel: "Metro Atlanta",
    rating: 5,
    text: "This young man did an excellent job. I am well pleased with the entire house pressure washing, driveway and sidewalk. Very professional and thorough.",
    service: "House, Driveway & Sidewalk",
  },
]

const ALPHARETTA_PAIR: CityTestimonial[] = [
  {
    name: "Karen W.",
    locationLabel: "Windward, Alpharetta",
    rating: 5,
    text: "Our north side never sees sun and the siding had turned green. I was worried about the trim around the windows. They soft washed it and the green just melted off. Took about a morning. I already told two people on our street.",
    service: "House Washing",
  },
  {
    name: "Marcus T.",
    locationLabel: "Near Avalon, Alpharetta",
    rating: 5,
    text: "We were listing the house and the driveway looked rough next to the photos. They hit the concrete and the curb out front the same day. Appraiser did not bat an eye at the exterior. Worth it for the first impression alone.",
    service: "Driveway & curb",
  },
]

const MARIETTA_PAIR: CityTestimonial[] = [
  {
    name: "Jennifer L.",
    locationLabel: "East Cobb, Marietta",
    rating: 5,
    text: "Clay splashes up on our vinyl every time it rains and it had streaked down the back. They pretreated and rinsed without soaking the beds we just mulched. House looks like we painted it, we did not.",
    service: "House Washing",
  },
  {
    name: "David R.",
    locationLabel: "Near Marietta Square",
    rating: 5,
    text: "We share a drive with our neighbor and both sides were gray with mildew. One pass with their surface cleaner and you could actually see the control joints again. Neighbor split the cost and we are both happy.",
    service: "Driveway cleaning",
  },
]

const ROSWELL_PAIR: CityTestimonial[] = [
  {
    name: "Amy S.",
    locationLabel: "Historic Roswell",
    rating: 5,
    text: "Our walk from the street is old brick and I did not want someone chewing up the mortar. They kept pressure low, took the moss off the joints, and rinsed toward the street like I asked. Looks cared for again.",
    service: "Walk & patio",
  },
  {
    name: "Brian K.",
    locationLabel: "Off Holcomb Bridge, Roswell",
    rating: 5,
    text: "Back deck sits under oaks and was slick after every rain. They cleaned the boards and the composite railing without fuzzing the wood. I am staining next month and the surface is actually ready this time.",
    service: "Deck washing",
  },
]

const CITY_TESTIMONIALS: Record<string, CityTestimonial[]> = {
  alpharetta: ALPHARETTA_PAIR,
  marietta: MARIETTA_PAIR,
  roswell: ROSWELL_PAIR,
}

export function getCityTestimonials(slug: string): CityTestimonial[] {
  return CITY_TESTIMONIALS[slug] ?? ATLANTA_METRO_PAIR
}
