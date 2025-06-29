import { Button } from "@mantine/core"
import { authClient } from "~/app/auth-client"

export const LogoutButton = () => {
  const session = authClient.useSession()

  if (!session.data) return null

  return (
    <Button variant="outline" size="xs" onClick={() => authClient.signOut({})}>
      Logout
    </Button>
  )
}
