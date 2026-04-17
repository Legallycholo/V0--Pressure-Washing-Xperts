import { marketingRouteExports } from "@/lib/seo/create-marketing-route-layout"

const { metadata, Layout } = marketingRouteExports("/about/we-do-xpert")
export { metadata }
export default Layout
