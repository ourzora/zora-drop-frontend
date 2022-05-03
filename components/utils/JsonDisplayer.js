import { Box } from "@components/primitives"

export function JSONDisplayer({ data }) {
  return (
    <Box className='code-wrapper'>
      <code>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </code>
    </Box>
  )
}
