import { marketingRouteExports } from "@/lib/seo/create-marketing-route-layout"

const { metadata, Layout } = marketingRouteExports("/services/commercial/parking-lots-garages")
export { metadata }
export default Layout
