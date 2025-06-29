"use client"

import { Box, Button, Card, Container, Group, Text, TextInput, Title } from "@mantine/core"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { PageLayout } from "~/app/layouts/PageLayout"
import { queryClient, trpc } from "~/app/trpc-client"

export const Home = () => (
  <PageLayout title="rwsdk starter">
    <IncrementButton />
    <Chat />
  </PageLayout>
)

const IncrementButton = () => {
  const getValue = useQuery(trpc.sample.getValue.queryOptions())
  const incrementValue = useMutation(
    trpc.sample.incrementValue.mutationOptions({
      onSuccess: () => queryClient.invalidateQueries({ queryKey: trpc.sample.getValue.queryKey() }),
    }),
  )

  return (
    <Button onClick={() => incrementValue.mutate()} loading={getValue.isLoading} mb="lg">
      Increment {getValue.data}
    </Button>
  )
}

const Chat = () => {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const getMessages = useQuery(trpc.sample.getMessages.queryOptions())
  const addMessage = useMutation(
    trpc.sample.addMessage.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.sample.getMessages.queryKey() })
        setMessage("")
      },
    }),
  )

  return (
    <Box>
      <Group mb="md">
        <TextInput
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <TextInput
          id="message"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
        <Button
          onClick={() => addMessage.mutate({ name, message })}
          loading={getMessages.isLoading || addMessage.isPending}
        >
          Send
        </Button>
      </Group>

      {getMessages.data?.map((message) => (
        <Card key={message.id} mb="md">
          <Text>
            {message.name}: {message.message}
          </Text>
        </Card>
      ))}
    </Box>
  )
}
