"use client"

import { PageLayout } from "~/app/layouts/PageLayout"
import { Button, Title } from "@mantine/core"
import { useState } from "react"

export const Home = () => {
  const [count, setCount] = useState(0)
  return (
    <PageLayout>
      <div>
        <Title order={1}>Hello World</Title>
        <Button onClick={() => setCount(count + 1)}>Increment {count}</Button>
      </div>
    </PageLayout>
  )
}
