import { Box, Text } from '@components/primitives'
import { useDrops } from '@drops'
import { ethers } from 'ethers'

export function PresaleMintPrice({css, ...props}) {
  const { saleDetails } = useDrops()
  
  return (
    <Box
      {...props}
      css={{
        ...css
      }}
    >
      <Text as="span" css={{fontSize: '$caption'}}>
        Mint price:{' '}
        {ethers.utils.formatEther(saleDetails.publicSalePrice)}{' '}
        ETH
      </Text>
    </Box>
  )
}