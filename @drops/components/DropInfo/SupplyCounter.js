import { Box, Text } from '@components/primitives'
import { useDrops } from '@drops'

export function SupplyCounter({copy, css, ...props}) {
  const {
    saleDetails
  } = useDrops()
  
  return (
    <Box
      {...props}
      css={{
        ...css
      }}
    >
      <Text as="span" css={{fontSize: '$caption'}}>
        Minted: {saleDetails.totalMinted.toNumber()} / {saleDetails.maxSupply.toNumber()}{copy && ` ${copy}`}
      </Text>
    </Box>
  )
}