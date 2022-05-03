import { Box, Text } from '@components/primitives'
import { useDrops } from '@drops'
import { ethers, utils } from 'ethers'

export function MintPrice({css, useTotal = false, ...props}) {
  const { saleDetails, contractMint } = useDrops()
  
  return (
    <Box
      {...props}
      css={{
        ...css
      }}
    >
      <Text as="span" css={{fontSize: '$caption'}}>
        <span>Mint price:{' '}</span>
        {useTotal
          ? <span>
              {utils.formatEther(contractMint.cost)}&nbsp;ETH
            </span>
          : <span>
              {ethers.utils.formatEther(saleDetails.publicSalePrice)}&nbsp;ETH
            </span>
        }
      </Text>
    </Box>
  )
}