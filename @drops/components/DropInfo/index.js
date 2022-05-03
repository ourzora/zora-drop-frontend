import { Box, Text } from '@components/primitives'
import { SupplyCounter } from './SupplyCounter'
import { TransactionLimit } from './TransactionLimit'
import { utils } from 'ethers'
import { useActiveMintPhase } from '@lib/mintPhases'
import { MintPrice } from './MintPrice'

export function DropInfo() {
  const activePhase = useActiveMintPhase()

  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 2,
      }}
    >
      {activePhase && (
        <>
          <hr />
          <Text
            css={{
              fontSize: '$caption',
              lineHeight: 1.25,
            }}
          >
            Open for {activePhase.name}
            <br />
            {activePhase.description}
            <br />
            Mint price: {utils.formatEther(activePhase.pricePerToken)} ETH
          </Text>
          <hr />
        </>
      )}
      <SupplyCounter />
      <TransactionLimit />
      <MintPrice />
    </Box>
  )
}
