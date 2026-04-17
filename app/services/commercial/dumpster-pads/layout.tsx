import { marketingRouteExports } from "@/lib/seo/create-marketing-route-layout"

const { metadata, Layout } = marketingRouteExports("/services/commercial/dumpster-pads")
export { metadata }
export default Layout
