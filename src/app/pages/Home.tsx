"use client"

import { Title } from "@mantine/core"
import { RequestInfo } from "rwsdk/worker"
import { MantineLayout } from "../layouts/MantineLayout"

export function Home({ ctx }: RequestInfo) {
  return (
    <MantineLayout>
      <div>
        <Title order={1}>Hello World</Title>
      </div>
    </MantineLayout>
  )
}
