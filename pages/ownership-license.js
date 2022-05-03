import { Box } from "@components/primitives"
import { MarkDown } from '@components/utils/Markdown'
import copy from '@docs/ownershipLicense.md'

export default function OwnershipLicense() {
  return (
    <Box
      as="section"
      sectionSmall
    >
      <MarkDown
        md={copy}
        css={{
          padding: '0 $margin calc($header / 2)',
          '@sm': {
            padding: '0 0 calc($header / 2)',
          }
        }}
      />
    </Box>
  )
}
