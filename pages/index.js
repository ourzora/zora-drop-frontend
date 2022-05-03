import { Head } from '@components/HeadMeta'
import { Box } from '@components/primitives'
import { MintingUI } from '@compositions/MintingUI'

export default function Home() {
  return (
    <Box
      as="section"
      sectionSmall
    >
      <Head />
      <MintingUI />
    </Box>
  )
}
