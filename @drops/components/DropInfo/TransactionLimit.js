import { Box, Text } from '@components/primitives'
import { useDrops } from '@drops'

export function TransactionLimit({ css, ...props }) {
  const { saleDetails } = useDrops()

  return (
    <Box
      {...props}
      css={{
        ...css,
      }}
    >
      <Text as="span" css={{ fontSize: '$caption' }}>
        Limit: {saleDetails.maxSalePurchasePerAddress.toNumber()} per transaction
      </Text>
    </Box>
  )
}
