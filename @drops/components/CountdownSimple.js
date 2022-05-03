import { Box } from '@components/primitives'
import { formattedDate } from '@lib/formattedDate'
import { useDrops } from '@drops'

export function CountdownSimple() {
  // Countdown & presale countdown
  const { countdown, presaleStart, publicSaleStart } = useDrops()

  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '$smallMargin',
        '*': {
          fontSize: '$caption',
          lineHeight: 1.25,
        },
      }}
    >
      <Box>
        <strong>Presale: {countdown.presale.text}</strong>
        <br />
        {formattedDate(presaleStart)}
      </Box>
      <Box>
        <strong>Public sale: {countdown.publicSale.text}</strong>
        <br />
        {formattedDate(publicSaleStart)}
      </Box>
    </Box>
  )
}
