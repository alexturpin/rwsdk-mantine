import { ColorSchemeScript, MantineProvider } from "@mantine/core"

export const Document: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <ColorSchemeScript />
      <title>@redwoodjs/starter-minimal</title>
      <link rel="modulepreload" href="/src/client.tsx" />
    </head>
    <body>
      <div id="root">
        <MantineProvider>{children}</MantineProvider>
      </div>
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
)
