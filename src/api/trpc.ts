import { initTRPC } from "@trpc/server"
import { AppContext } from "~/app"

const t = initTRPC.create<AppContext>()

export const router = t.router
export const publicProcedure = t.procedure
