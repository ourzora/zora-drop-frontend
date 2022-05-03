import { Box } from '@components/primitives'
import { useDrops } from '@drops'
import { JSONDisplayer } from '@components/utils/JsonDisplayer'
import { ConnectWallet } from '@drops/components/ConnectWallet'
import { generateSaleConfigurationTuple } from '../lib/mintPhases'

export default function Context() {
  const { allowlist, mintedPerAddress, constants, tokens, contract, contractProps } =
    useDrops()

  const saleConfigurations = generateSaleConfigurationTuple()

  return (
    <Box
      css={{
        padding: '$margin',
        display: 'flex',
        flexDirection: 'column',
        gap: '$margin',
      }}
    >
      <ConnectWallet />
      <Box
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
          position: 'relative',
          gap: '$margin',
        }}
      >
        <Box css={{ width: '100%' }}>
          <strong>Sale configurations</strong>
          <JSONDisplayer data={saleConfigurations} />
        </Box>
        <Box css={{ width: '100%' }}>
          <strong>Drops Context Provider</strong>
          <JSONDisplayer
            data={{
              mintedPerAddress,
              contractProps,
              constants: {
                ...constants,
                merkleTree: { ...constants.merkleTree, tree: undefined },
              },
            }}
          />
        </Box>
        <Box css={{ width: '100%' }}>
          <strong>Allowlist</strong>
          <JSONDisplayer data={{ ...allowlist, tree: undefined }} />
          <br />
          <strong>Tokens</strong>
          <JSONDisplayer data={{ tokens }} />
        </Box>
      </Box>
      <JSONDisplayer data={{ contract }} />
    </Box>
  )
}
