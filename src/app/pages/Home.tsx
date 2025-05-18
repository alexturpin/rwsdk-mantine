"use client"

import { Box, Button, Card, Container, Group, Text, TextInput, Title } from "@mantine/core"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { PageLayout } from "~/app/layouts/PageLayout"
import { queryClient, trpc } from "~/app/trpc-client"
import { IconSend } from "@tabler/icons-react"

export const Home = () => (
  <PageLayout>
    <Container>
      <Title order={1} mb="lg">
        rwsdk starter
      </Title>
      <IncrementButton />
      <Chat />
    </Container>
  </PageLayout>
)

const IncrementButton = () => {
  const getValue = useQuery(trpc.getValue.queryOptions())
  const incrementValue = useMutation(
    trpc.incrementValue.mutationOptions({
      onSuccess: () => queryClient.invalidateQueries({ queryKey: trpc.getValue.queryKey() }),
    })
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

  const getMessages = useQuery(trpc.getMessages.queryOptions())
  const addMessage = useMutation(
    trpc.addMessage.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.getMessages.queryKey() })
        setMessage("")
      },
    })
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
          rightSection={<IconSend size={16} />}
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
