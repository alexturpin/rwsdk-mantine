import { route } from "rwsdk/router"
import health from "~/server/routes/health"
import trpc from "~/server/routes/trpc"

export const apiRoutes = [route("/health", health), route("/trpc/*", trpc)]
