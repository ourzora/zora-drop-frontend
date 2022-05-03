import { utils } from 'ethers'
import { Button } from '@components/Button'
import { Box, Text } from '@components/primitives'
import { useDrops } from '@drops'

export function MintButton({ buttonText, onClick }) {
  const {
    contractMint,
    isAccountConnected,
  } = useDrops()

  return (
    <>
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '$smallMargin',
          opacity: `${isAccountConnected ? 1 : 0.25}`,
          pointerEvents: `${isAccountConnected ? 'all' : 'none'}`
        }}
      >
        <Box
          css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text css={{ fontSize: '$caption' }}>Quantity:</Text>
          <input
            style={{
              width: '6rem',
              marginLeft: '0.4em',
              marginRight: '10px',
              padding: '0 10px',
              border: '1px solid #cccccc',
              fontSize: '$caption',
              height: '100%',
              borderRadius: 5,
              background: '#fff',
              fontWeight: 400,
            }}
            type="number"
            value={contractMint.qty}
            onChange={(e) => {
              contractMint.updateQty(Number(e.target.value))
            }}
          />
        </Box>
        <Box css={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <Button
            disabled={contractMint.isAwaitingApproval || contractMint.isMinting}
            onClick={onClick}
            pill
          >
            {contractMint.isAwaitingApproval ? (
              'Awaiting approval'
            ) : contractMint.isMinting ? (
              'Minting...'
            ) : (
              <>
                {buttonText}{' '}
                <sub
                  style={{
                    fontSize: '90%',
                    marginLeft: '0.2em',
                    verticalAlign: 'baseline',
                    opacity: '0.8',
                  }}
                >
                  ({utils.formatEther(contractMint.cost)} ETH)
                </sub>
              </>
            )}
          </Button>
        </Box>
      </Box>
      {!isAccountConnected &&
        <Text css={{ fontSize: '$caption', textAlign: 'center' }}>Connect Your Wallet to Mint!</Text>
      }
    </>
  )
}
