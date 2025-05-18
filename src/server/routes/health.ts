import { RouteDefinition } from "rwsdk/router"

const route: RouteDefinition["handler"] = () => Response.json({ status: "ok" })

export default route
