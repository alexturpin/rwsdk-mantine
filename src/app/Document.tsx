import styles from "@mantine/core/styles.css?url"

export const Document: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en" data-mantine-color-scheme="dark">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>@redwoodjs/starter-minimal</title>

      <link href={styles} rel="stylesheet"></link>
      <link rel="modulepreload" href="/src/client.tsx" />
    </head>
    <body>
      <div id="root">{children}</div>
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
)
