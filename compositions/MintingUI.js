import { useEffect } from 'react'
import { Box } from '@components/primitives'
import { DropComponents, useDrops } from '@drops'

export function MintingUI({ css }) {
  const {
    contractMint: {
      isMinting,
      isSuccess,
      txHash,
    },
  } = useDrops()

  useEffect(() => {
    if (isMinting && txHash) {
      setIsMinting(true)
    }
  }, [isMinting, txHash])

  useEffect(() => {
    if (isSuccess) {
      setIsMinting(false)
    }
  }, [isSuccess])


  return (
    <Box
      css={{
        position: 'relative',
        display: 'block',
        ...css,
      }}
    >
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '$smallMargin',
        }}
      >
        <DropComponents.DropInfo />
        <DropComponents.ActiveMint />
      </Box>
    </Box>
  )
}
