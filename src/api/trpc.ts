import { initTRPC } from "@trpc/server"
import { AppContext } from "~/app"

const t = initTRPC.context<AppContext>().create()

export const router = t.router
export const publicProcedure = t.procedure
