import { marketingRouteExports } from "@/lib/seo/create-marketing-route-layout"

const { metadata, Layout } = marketingRouteExports("/privacy")
export { metadata }
export default Layout
