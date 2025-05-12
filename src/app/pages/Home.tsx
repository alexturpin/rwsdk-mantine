import { Title } from "@mantine/core"
import { RequestInfo } from "rwsdk/worker"

export function Home({ ctx }: RequestInfo) {
  return (
    <div>
      <Title order={1}>Hello World</Title>
    </div>
  )
}
