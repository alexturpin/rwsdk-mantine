"use client"

import { Button, Title } from "@mantine/core"
import { useMutation, useQuery } from "@tanstack/react-query"
import { PageLayout } from "~/app/layouts/PageLayout"
import { queryClient, trpc } from "~/app/trpc-client"

export const Home = () => {
  return (
    <PageLayout>
      <div>
        <Title order={1}>Hello World</Title>
        <IncrementButton />
      </div>
    </PageLayout>
  )
}

const IncrementButton = () => {
  const getValue = useQuery(trpc.getValue.queryOptions())
  const incrementValue = useMutation(
    trpc.incrementValue.mutationOptions({
      onSuccess: () => queryClient.invalidateQueries({ queryKey: trpc.getValue.queryKey() }),
    })
  )

  return <Button onClick={() => incrementValue.mutate()}>Increment {getValue.data}</Button>
}
