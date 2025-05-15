import { apiRoutes } from "~/app/api/api"
import { Document } from "~/app/Document"
import { setCommonHeaders } from "~/app/headers"
import { Home } from "~/app/pages/Home"
import { prefix, render, route } from "rwsdk/router"
import { defineApp } from "rwsdk/worker"

export type AppContext = {}

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx
  },
  render(Document, [route("/", () => <Home />)]),
  prefix("/api", apiRoutes),
])
