import allowlistInput from '../allowlist.json'
import { makeTree } from './merkle-proof'
const treeResult = makeTree(allowlistInput)

export const {
  title,
  decription,
  chainId,
  contractAddress,
  imageHost,
  imageHostAppend,
  redirectOnMint,
  reveal,
  rpcUrl,
  rinkebyRpcUrl,
  graphqlUri,
  baseUrl,
  merkleTree,
} = {
  title: process.env.NEXT_PUBLIC_TITLE,
  decription: process.env.NEXT_PUBLIC_DESCRIPTION,
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  imageHost: process.env.NEXT_PUBLIC_IMAGE_HOST,
  imageHostAppend: process.env.NEXT_PUBLIC_IMAGE_HOST_APPEND,
  redirectOnMint: bool(process.env.NEXT_PUBLIC_REDIRECT_ON_MINT),
  reveal: bool(process.env.NEXT_PUBLIC_REVEAL),
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
  rinkebyRpcUrl: process.env.NEXT_PUBLIC_RINKEBY_RPC_URL,
  merkleTree: treeResult,
  graphqlUri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
}

function bool(string) {
  if (!string) return false
  switch (string.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true
    case 'false':
    case 'no':
    case '0':
    case null:
      return false
    default:
      return Boolean(string)
  }
}
