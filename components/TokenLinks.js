import { Text, Box } from "./primitives"
import { baseUrl } from "@lib/constants"

export function TokenLinks({ tokenId }) {
  return (
    <Box css={{
      display: 'flex',
      flexDirection: 'column',
      'a': {
        fontSize: '$navigation',
        textDecoration: 'underline',
        textTransform: 'uppercase',
        '@sm': {
          fontSize: '$small'
        }
      }
    }}>
      <Text>
        <a
          target="_blank"
          rel="noreferrer"
          href={`${baseUrl}/api/metadata/${tokenId}`}
        >
          View Metadata
        </a>
        <br />
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://etherscan.io/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}#code`}
        >
          View Contract
        </a>
      </Text>
      <Text>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://zora.co/collections/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${tokenId}`}
        >
          View on Zora
        </a>
        <br />
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://opensea.io/assets/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${tokenId}`}
        >
          View on Opensea
        </a>
      </Text>
    </Box>
  )
}