import { marketingRouteExports } from "@/lib/seo/create-marketing-route-layout"

const { metadata, Layout } = marketingRouteExports("/services/residential/tiny-house-cleaning")
export { metadata }
export default Layout
