import { marketingRouteExports } from "@/lib/seo/create-marketing-route-layout"

const { metadata, Layout } = marketingRouteExports("/services/commercial/apartment-complexes")
export { metadata }
export default Layout
