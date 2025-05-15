import { route } from "rwsdk/router"

export const apiRoutes = [route("/health", () => Response.json({ status: "ok" }))]
