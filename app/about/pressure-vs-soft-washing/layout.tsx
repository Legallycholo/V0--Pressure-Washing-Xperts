import { marketingRouteExports } from "@/lib/seo/create-marketing-route-layout"

const { metadata, Layout } = marketingRouteExports("/about/pressure-vs-soft-washing")
export { metadata }
export default Layout
