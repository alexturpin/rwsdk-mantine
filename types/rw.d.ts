import { AppContext } from "~/app"

declare module "rwsdk/worker" {
  interface DefaultAppContext extends AppContext {}
}
