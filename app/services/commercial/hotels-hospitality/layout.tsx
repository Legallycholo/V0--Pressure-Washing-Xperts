import { marketingRouteExports } from "@/lib/seo/create-marketing-route-layout"

const { metadata, Layout } = marketingRouteExports("/services/commercial/hotels-hospitality")
export { metadata }
export default Layout
