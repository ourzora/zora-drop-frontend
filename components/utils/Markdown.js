import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import { Box } from '@components/primitives'

export function MarkDown({
  md,
  css,
  children,
  ...props
}) {
  return (
    <Box
      {...props}
      as="article"
      css={{
        ...css,
        width: '100%',
      }}
    >
      {unified().use(parse).use(remark2react).processSync(md).result}
      {children}
    </Box>
  )
}
