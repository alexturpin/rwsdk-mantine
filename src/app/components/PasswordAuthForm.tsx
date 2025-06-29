import { useState } from "react"
import { Button, TextInput, PasswordInput, Paper, Group, Stack, Text, Alert } from "@mantine/core"
import { authClient } from "~/app/auth-client"

export const PasswordAuthForm = () => {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md" maw={400} mx="auto">
      <form
        onSubmit={async (event) => {
          event.preventDefault()

          if (mode === "login") {
            await authClient.signIn.email(
              { email, password },
              {
                onRequest: () => setLoading(true),
                onError: (err) => setError(err.error.message),
              },
            )
          } else {
            await authClient.signUp.email(
              { email, password, name },
              {
                onRequest: () => setLoading(true),
                onError: (err) => setError(err.error.message),
              },
            )
          }
        }}
      >
        <Stack>
          <Text size="lg" fw={500} ta="center">
            {mode === "login" ? "Login" : "Sign Up"}
          </Text>
          {error && <Alert color="red">{error}</Alert>}
          {mode === "signup" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              required
            />
          )}
          <TextInput
            label="Email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
          <Group justify="space-between" mt="md">
            <Button
              variant="subtle"
              size="xs"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              type="button"
            >
              {mode === "login"
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}
            </Button>
            <Button type="submit" loading={loading}>
              {mode === "login" ? "Login" : "Sign Up"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}
