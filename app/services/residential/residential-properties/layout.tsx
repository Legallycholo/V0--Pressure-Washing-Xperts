import { marketingRouteExports } from "@/lib/seo/create-marketing-route-layout"

const { metadata, Layout } = marketingRouteExports("/services/residential/residential-properties")
export { metadata }
export default Layout
