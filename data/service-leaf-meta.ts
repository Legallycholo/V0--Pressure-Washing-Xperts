export type ServiceLeafCopy = {
  processSteps: Array<{ title: string; description: string }>
  ctaHeadline: string
  ctaSubline: string
}

function s(...pairs: [string, string][]): ServiceLeafCopy["processSteps"] {
  return pairs.map(([title, description]) => ({ title, description }))
}

export const SERVICE_LEAF_COPY: Record<string, ServiceLeafCopy> = {
  "house-washing": {
    processSteps: s(
      ["Tell us about your exterior", "We note siding type, staining, and plant beds."],
      ["Choose soft wash settings", "Pressure and solution matched to your surfaces."],
      ["Wash and rinse", "Mold and algae lifted without blasting paint or trim."],
      ["Walkthrough with you", "You check the result before we pack up."],
    ),
    ctaHeadline: "Freshen your siding before stains set in.",
    ctaSubline: "Get a quote for your home and your timeline.",
  },
  "decks-fences": {
    processSteps: s(
      ["Inspect boards and rails", "We look for soft spots, loose fasteners, and finish wear."],
      ["Pick cleaner and pressure", "Wood, composite, and vinyl each get a different approach."],
      ["Wash and detail", "Mold, gray film, and ground-in dirt come off evenly."],
      ["Dry and next steps", "We point out when stain or seal makes sense."],
    ),
    ctaHeadline: "Enjoy your deck and fence again this season.",
    ctaSubline: "Request a quote for rails, boards, and posts.",
  },
  "driveways-sidewalks": {
    processSteps: s(
      ["Mark oil and trouble spots", "We identify rust, tire marks, and algae patches."],
      ["Pre-treat where it helps", "Targeted products loosen stains before the surface pass."],
      ["Surface clean flat concrete", "Even coverage avoids wand streaks on big slabs."],
      ["Final rinse and check", "You see the full pad before we leave."],
    ),
    ctaHeadline: "Bring your concrete back to a clean, even tone.",
    ctaSubline: "Book washing for driveways, walks, and steps.",
  },
  "roof-soft-washing": {
    processSteps: s(
      ["Roofline and gutter check", "We confirm access, pitch, and delicate areas."],
      ["Apply low-pressure treatment", "Algae and moss get a soft wash that spares granules."],
      ["Dwell and rinse", "Growth dies at the root instead of smearing across shingles."],
      ["Gutter flush if bundled", "Downspouts run clear when you add that service."],
    ),
    ctaHeadline: "Lift black streaks without tearing up shingles.",
    ctaSubline: "Ask about soft wash timing before heavy pollen season.",
  },
  "brick-stone-masonry": {
    processSteps: s(
      ["Survey mortar and stone", "We note cracks, efflorescence, and delicate joints."],
      ["Select safe pressure", "Porous stone and brick get enough force to clean, not etch."],
      ["Wash and spot treat", "Mold, algae, and haze lift without acid damage."],
      ["Rinse and texture check", "Natural color and joint lines stay intact."],
    ),
    ctaHeadline: "Restore masonry without chewing through mortar.",
    ctaSubline: "Patios, walks, and walls handled in one plan.",
  },
  gutters: {
    processSteps: s(
      ["Clear the run", "We remove leaves, granules, and packed debris by section."],
      ["Flush downspouts", "Water proves each outlet drains away from the foundation."],
      ["Check hangers and fascia", "We flag obvious trouble for your repair list."],
      ["Bag and haul debris", "Your beds and lawn stay tidy when we leave."],
    ),
    ctaHeadline: "Keep rainwater moving away from your foundation.",
    ctaSubline: "Pair gutter service with a house wash when you want full exterior care.",
  },
  curbing: {
    processSteps: s(
      ["Walk the curb line", "We note paint, grass, and heavy algae at the street."],
      ["Surface clean concrete", "Flat work gets even pressure along the face and top."],
      ["Detail joints and panels", "Strips and corners get attention, not a single wand pass."],
      ["Quick dry window", "Most curb visits finish well under an hour."],
    ),
    ctaHeadline: "Sharpen the first thing people see at the curb.",
    ctaSubline: "Fast curb and panel cleaning before listing or hosting.",
  },
  "carpet-cleaning": {
    processSteps: s(
      ["Fiber and soil check", "We match method to nylon, polyester, wool blends, and traffic lanes."],
      ["Pre-treat high-traffic areas", "Embedded grit and spots get extra attention first."],
      ["Extract and rinse", "Hot water extraction pulls residue instead of pushing it deeper."],
      ["Groom and dry window", "We set pile direction and share dry times before we go."],
    ),
    ctaHeadline: "Rooms feel lighter when the carpet is truly clean.",
    ctaSubline: "Tell us which rooms carry the most traffic.",
  },
  "indoor-air": {
    processSteps: s(
      ["Review vents and returns", "We locate heavy dust, pet hair, and restricted airflow."],
      ["Contain and clean openings", "Registers and boots get detailed attention."],
      ["Agitate and extract duct surfaces", "Loosened dust is pulled out, not blown into the house."],
      ["System check with you", "We note filters and simple upkeep you can repeat."],
    ),
    ctaHeadline: "Stop your HVAC from recycling old dust.",
    ctaSubline: "Ask about vent and duct cleaning for allergy-heavy homes.",
  },
  "odor-removal": {
    processSteps: s(
      ["Find the source", "We trace pet, smoke, mildew, or organic waste to the material."],
      ["Treat the substrate", "Products work into carpet, pad, or hard surfaces, not just the top."],
      ["Extract or neutralize", "We remove residue that would bring the smell back."],
      ["Ventilate and verify", "You get a clear sense of improvement before we close out."],
    ),
    ctaHeadline: "Remove odors that air freshener cannot fix.",
    ctaSubline: "Describe the issue and we will map a treatment plan.",
  },
  "residential-properties": {
    processSteps: s(
      ["Full exterior walk", "Roofline to driveway, we list every surface you want done."],
      ["One schedule, one crew", "You avoid juggling separate vendors for each area."],
      ["Execute in logical order", "We work top-down so rinse water does not ruin a fresh area."],
      ["Final tour", "You sign off on the full property in one visit."],
    ),
    ctaHeadline: "One quote for roof, siding, and flatwork together.",
    ctaSubline: "Strong fit for spring refreshes and pre-listing prep.",
  },
  "stain-cleaning": {
    processSteps: s(
      ["Identify the stain", "Rust, oil, paint, and organic marks need different chemistry."],
      ["Pre-treat safely", "We test products so the concrete or paver is not etched."],
      ["Wash and lift", "Pressure follows chemistry for a full lift, not a faint shadow."],
      ["Even out the field", "We blend treated spots with the surrounding slab."],
    ),
    ctaHeadline: "Target stubborn marks on driveways and patios.",
    ctaSubline: "Send a photo if you are unsure what caused the stain.",
  },
  "tile-and-grout-cleaning": {
    processSteps: s(
      ["Inspect tile and grout lines", "We note cracked grout, loose tiles, and soil depth."],
      ["Apply grout-safe detergents", "Lines get dwell time mopping never gives them."],
      ["Hot water extraction", "Soil pulls out of porous grout instead of smearing across tile."],
      ["Optional seal", "Ask about sealing to keep lines brighter longer."],
    ),
    ctaHeadline: "Brighten kitchens, baths, and entry floors again.",
    ctaSubline: "Ceramic, porcelain, and many natural stone floors covered.",
  },
  "upholstery-cleaning": {
    processSteps: s(
      ["Fabric code check", "We match method to your sofa, chair, or headboard material."],
      ["Vacuum and pre-treat", "Body oils and pet areas get focused work first."],
      ["Clean and extract", "Soil lifts out with controlled moisture for faster dry times."],
      ["Groom and dry plan", "We set cushions and share when it is safe to sit again."],
    ),
    ctaHeadline: "Sofas and chairs that feel lived-in, not worn out.",
    ctaSubline: "Mention pets, kids, or allergy concerns in your message.",
  },
  "building-washing": {
    processSteps: s(
      ["Facade review", "We choose soft wash or pressure by cladding and staining."],
      ["Protect entries and glass", "Sensitive areas get masked or rinsed as we work."],
      ["Wash top to bottom", "Dirt, mold, and pollution lift without streaking windows."],
      ["Site walk with your team", "You confirm scope and touch-up spots."],
    ),
    ctaHeadline: "Facades that look maintained, not neglected.",
    ctaSubline: "Retail, office, and mixed-use buildings across Metro Atlanta.",
  },
  "parking-lots-garages": {
    processSteps: s(
      ["Traffic and stain map", "Oil, rubber, and organic growth get marked for treatment."],
      ["Degrease and pre-soak", "Heavy spots get product before the surface machine."],
      ["Surface clean lanes", "Wide passes keep stripes and anchors readable."],
      ["Night or weekend finish", "We align timing with your lowest traffic window."],
    ),
    ctaHeadline: "Safer, cleaner lots for tenants and visitors.",
    ctaSubline: "Ask about after-hours scheduling for busy garages.",
  },
  storefronts: {
    processSteps: s(
      ["Entry and signage review", "We plan glass, metal, painted panels, and thresholds."],
      ["Detail glass and frames", "Streak-free squeegee work at customer eye level."],
      ["Wash surrounds", "Sills, awnings, and walks get the same attention as the window."],
      ["Open-ready finish", "We clear water before unlock so doors are safe to use."],
    ),
    ctaHeadline: "First impressions that match how you run the business.",
    ctaSubline: "Keep glass, metal, and painted entry areas consistent.",
  },
  "graffiti-removal": {
    processSteps: s(
      ["Assess paint type and surface", "Brick, metal, concrete, and coated walls need different agents."],
      ["Test a small area", "We confirm color lift without ghosting or substrate damage."],
      ["Remove and neutralize", "Spray paint and marker lift in layers, not one harsh blast."],
      ["Restore appearance", "We blend or spot wash so the wall reads clean to passersby."],
    ),
    ctaHeadline: "Fast response before tags cure into the surface.",
    ctaSubline: "Call or submit photos so we can stage the right products.",
  },
  "dumpster-pads": {
    processSteps: s(
      ["Inspect pad and enclosure", "Grease depth, food waste, and drainage get noted."],
      ["Degrease and dwell", "Commercial products break down oil before pressure."],
      ["Pressure wash and flush", "Sludge moves off the pad toward the drain you maintain."],
      ["Odor check", "The area should read cleaner to staff and inspectors."],
    ),
    ctaHeadline: "Pads that pass the sniff test and the walk-through.",
    ctaSubline: "Recurring programs available for high-volume kitchens.",
  },
  "fleet-washing": {
    processSteps: s(
      ["Vehicle lineup", "Box trucks, vans, trailers, and service rigs each get a plan."],
      ["Pre-soak road film", "Bug splatter and diesel soot loosen before contact wash."],
      ["Wash graphics safely", "Decals and wraps get low-pressure passes."],
      ["Dry and rotate", "Scheduled routes keep every unit presentable between jobs."],
    ),
    ctaHeadline: "Rolling billboards should look sharp on every route.",
    ctaSubline: "On-site washing at your yard when space allows.",
  },
  "glass-mirror-cleaning": {
    processSteps: s(
      ["Access and safety plan", "Ground-level to lift-assisted work scoped in advance."],
      ["Detail glass and frames", "Sills, mullions, and seals get the same streak-free pass."],
      ["Treat mineral and droppings", "Spots that squeegee alone cannot lift get safe chemistry."],
      ["Lobby mirror finish", "Interior glass matches the exterior standard."],
    ),
    ctaHeadline: "Clear glass from the lobby to the top floor.",
    ctaSubline: "Tempered, laminated, and treated glass handled with the right tools.",
  },
  "commercial-gutter-cleaning": {
    processSteps: s(
      ["Map long runs and drains", "Commercial gutters carry more volume than house systems."],
      ["Clear heads and outlets", "We open every choke point along the run."],
      ["Flush and test flow", "Downspouts prove water is leaving the roof line."],
      ["Document on request", "Service notes available for facility managers."],
    ),
    ctaHeadline: "Keep roof drains moving before the next heavy rain.",
    ctaSubline: "Standalone service or bundled with a building wash.",
  },
  "rooftop-skylight-cleaning": {
    processSteps: s(
      ["Rooftop safety review", "Curbs, screens, and equipment pads get marked."],
      ["Low-pressure skylight pass", "Glazing and frames stay safe while light transmission returns."],
      ["Detail mechanical pads", "Bird droppings and debris lift off curbs and screens."],
      ["Coordinate with maintenance", "We align access with your facility window."],
    ),
    ctaHeadline: "More daylight through skylights and clear mechanical pads.",
    ctaSubline: "Facility teams get photos when you need documentation.",
  },
  "apartment-complexes": {
    processSteps: s(
      ["Property walk with management", "Breezeways, pool decks, lots, and pads scoped together."],
      ["Phase the work", "Residents keep reasonable access while we move building to building."],
      ["Wash common surfaces", "Mold, tire marks, and food grease lift on schedule."],
      ["Final punch list", "Touch-up spots before we close the ticket."],
    ),
    ctaHeadline: "Common areas residents judge every single day.",
    ctaSubline: "Multi-building and campus plans across Metro Atlanta.",
  },
  "awning-cleaning": {
    processSteps: s(
      ["Fabric, vinyl, or metal ID", "Each material gets its own pressure and chemistry."],
      ["Low-pressure pre-clean", "Mold and droppings lift without tearing seams."],
      ["Even rinse", "Color stays true without high-pressure fade spots."],
      ["Dry and inspect", "We confirm stitching and hardware before we leave."],
    ),
    ctaHeadline: "Awnings that read sharp from the sidewalk.",
    ctaSubline: "Quick visits timed to avoid your busiest door traffic.",
  },
  "gas-stations": {
    processSteps: s(
      ["Forecourt hazard check", "Spills, covers, and traffic flow noted first."],
      ["Treat fuel and rubber marks", "Pump lanes and islands get targeted chemistry."],
      ["Wash canopy and verticals", "Undersides and columns match brand standards."],
      ["Night or dawn finish", "We clear before peak fuel hours when you need it."],
    ),
    ctaHeadline: "Forecourts that look on-brand and feel safer underfoot.",
    ctaSubline: "Full-site pass from islands to building face.",
  },
  "government-complexes": {
    processSteps: s(
      ["Scope public areas", "Walks, plazas, parking, and facades listed with you."],
      ["Scheduled passes", "We hit windows that fit your operating hours."],
      ["Wash and document", "Consistent results with notes when you need records."],
      ["Walkthrough sign-off", "Punch list cleared before we demobilize."],
    ),
    ctaHeadline: "Dependable cleaning for civic buildings and lots.",
    ctaSubline: "Documentation available for compliance review on request.",
  },
  "hoa-services": {
    processSteps: s(
      ["Align with the board calendar", "Entries, pools, and walks match your maintenance plan."],
      ["Protect landscaping", "Plants and irrigation heads stay off the direct blast."],
      ["Wash monuments and commons", "Signage, fences, and flatwork read uniform."],
      ["Resident-ready finish", "We clear before weekend events when you ask."],
    ),
    ctaHeadline: "HOA standards your neighbors can see at the entrance.",
    ctaSubline: "Recurring programs sized to annual budgets.",
  },
  "hotels-hospitality": {
    processSteps: s(
      ["Arrival path review", "Porte-cochere, drives, and entries scoped for guest impact."],
      ["Early morning passes", "We aim to finish before check-in rush."],
      ["Pool and patio reset", "Chlorine film and foot traffic lift without harsh odor."],
      ["Loading and back-of-house", "Dock areas stay presentable for vendors."],
    ),
    ctaHeadline: "Arrivals that feel cared for before guests reach the desk.",
    ctaSubline: "Exteriors, drives, and pool decks tuned for hospitality traffic.",
  },
  "office-buildings": {
    processSteps: s(
      ["Facade and plaza plan", "Glass, metal, brick, and stucco each get the right method."],
      ["Garage and ramp pass", "Oil and dust lift on structured decks."],
      ["Entry and dumpster zones", "Tenant-facing areas match the lobby standard."],
      ["Night or weekend option", "We work off-hours when garages stay quieter."],
    ),
    ctaHeadline: "Building exteriors that match the quality inside.",
    ctaSubline: "Parking structures, plazas, and dumpster areas included.",
  },
  "parking-decks": {
    processSteps: s(
      ["Deck traffic plan", "Ramps, levels, and exits stay open with phased washing."],
      ["Degrease heavy lanes", "Oil and hydraulic marks get product before pressure."],
      ["Column and stair pass", "Dust, droppings, and growth lift off verticals."],
      ["Stripe visibility check", "Lanes read clearer after organic film is gone."],
    ),
    ctaHeadline: "Structures that feel safer under tires and feet.",
    ctaSubline: "Off-peak scheduling keeps access moving.",
  },
}

export function getServiceLeafCopy(slug: string): ServiceLeafCopy {
  return (
    SERVICE_LEAF_COPY[slug] ?? {
      processSteps: s(
        ["Contact us", "Tell us what you need cleaned."],
        ["Plan the visit", "We confirm method, timing, and access."],
        ["Execute on site", "Crew works the agreed scope."],
        ["Walkthrough", "You approve before we wrap."],
      ),
      ctaHeadline: "Ready to clean up your exterior?",
      ctaSubline: "Straightforward quotes so you know what to expect before we start.",
    }
  )
}
