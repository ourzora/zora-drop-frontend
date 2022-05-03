import { Box, Text } from "@components/primitives";
import { useOwnedTokens } from "@hooks/useOwnedTokens";
import { useMemo } from "react";
import Link from 'next/link'

export function OwnedTokens({address}) {
  const { ownedTokenIds, error } = useOwnedTokens(address)
  
  const ownedTokensData = useMemo(() => {
    try {
      const tokensToString = ownedTokenIds.toString()
      return {
        link: `/fragments/${tokensToString}`,
        tokens: tokensToString
      }
    } catch (err) {
      console.error(err)
    }
  }, [ownedTokenIds])

  if (error) {
    return null
  }
  if (!ownedTokenIds?.length) {
    return null
  }

  return (
    <Box css={{
      paddingTop: '$smallMargin',
      display: 'flex',
      justifyContent: 'flex-end',
      '@sm': {
        justifyContent: 'flex-start'
      }
    }}>
      <Link href={ownedTokensData.link} passHref>
        <Text as="a" className="small-link">
          Click to see your NFTs!
        </Text>
      </Link>
    </Box>
  )
}