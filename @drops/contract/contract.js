import { ethers } from 'ethers'
import { chains } from '../../lib/chains'
import contractInterface from './ZoraDropABI.json'
import { chainId, contractAddress } from '../../lib/constants'

export const chain = chains.find((x) => x.id == chainId)?.rpcUrls[0]

export const contract = new ethers.Contract(
  contractAddress,
  contractInterface.abi,
  new ethers.providers.StaticJsonRpcProvider(chain)
)
