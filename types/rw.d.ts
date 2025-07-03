import { AppContext } from "~/app"
import type { RouteDefinition } from "rwsdk/router"

declare module "rwsdk/worker" {
  interface DefaultAppContext extends AppContext {}
}

declare global {
  type RouteHandler = RouteDefinition["handler"]
}
