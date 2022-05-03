import { keyframes } from '@stitches/react'
import { useEffect } from 'react'
import { useDrops } from '@drops'
import { MintButton } from './MintButton'
import { Text, Box } from '@components/primitives'
import { redirectOnMint } from '@lib/constants'

const pulse = keyframes({
  '0%': {
    opacity: 0.5,
  },
  '100%': {
    opacity: 1,
  },
})

export function ActiveMint() {
  const {
    isSoldOut,
    contractMint,
    isPresaleMintActive,
    isPublicSaleMintActive,
    allowlist,
    constants,
  } = useDrops()

  useEffect(() => {
    if (contractMint.isSuccess) {
      const endArray = []
      
      contractMint.result.events.forEach((event) => {
        if (event.args?.tokenId !== undefined) {
          endArray.push(Number(event.args?.tokenId.toString()))
        } 
      })

      const end = endArray.slice(-1)
      const start = end - contractMint.qty + 1
      const tokenIds = Array.from({ length: end - start + 1 }, (_, i) => i + start)
      if(redirectOnMint) window.location.href = `/${constants.reveal ? 'token' : 'success'}/${tokenIds.join(',')}?tx=${contractMint.txHash}`
    }
  }, [contractMint.isSuccess, contractMint.result?.events])

  useEffect(() => {
    console.log('contractMint', contractMint)
  },[contractMint && contractMint.isSuccess])

  if (!isSoldOut) {
    return contractMint.isSuccess ? (
      <Text css={{ textAlign: 'center' }}>
        Minted Successfully!
      </Text>
    ) : contractMint.isMinting ? (
      <Box css={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
      }}>
        <Text css={{ animation: `${pulse} 1500ms infinite alternate` }}>
          Minting...
        </Text>
        {contractMint.txHash && (
          <Text
            as="a"
            href={`https://etherscan.io/tx/${contractMint.txHash}`}
            target="_blank"
            rel="noreferrer"
            className='small-link'
            css={{paddingTop: '$smallMargin'}}
          >
            View transaction
          </Text>
        )}
      </Box>
    ) : (
      <>
        {isPresaleMintActive && allowlist.isVerified && (
          <MintButton
            buttonText="Presale Mint"
            onClick={() => contractMint.presaleMint()}
          />
        )}
        {isPublicSaleMintActive && (
          <MintButton
            buttonText="Public Mint"
            onClick={() => contractMint.publicSaleMint()}
          />
        )}
        {contractMint.error && (
          <Box css={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
          }}>
            <br />
            <Text error>
              Error: {contractMint.error.code}
              <br />
              {contractMint.error.reason}
            </Text>
          </Box>
        )}
      </>
    )
  } else {
    return (
      <>
        <hr />
        <Text>Sold out!</Text>
      </>
    )
  }
}
