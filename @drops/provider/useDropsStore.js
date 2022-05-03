import * as constants from '../../lib/constants'
import { contract } from '../contract'
import { useAllowlist } from '../allowlist'
import { useMintedPerAddress } from '@drops/hooks/useMintedPerAddress'
import { useContractMint } from '../contractMint'
import { useCountdown } from '@drops/hooks/useCountdown'
import { useAccount, useSigner } from 'wagmi'
import { mapValues } from 'lodash'

export function useDropsStore(contractProps) {
  const [account, disconnect] = useAccount({ fetchEns: true })
  const [signer] = useSigner()
  const { saleDetails } = contractProps

  const allowlist = useAllowlist(account)
  const mintedPerAddress = useMintedPerAddress(account, saleDetails)

  const { presaleStart, presaleEnd, publicSaleStart, publicSaleEnd } = mapValues(
    {
      presaleStart: saleDetails.presaleStart,
      presaleEnd: saleDetails.presaleEnd,
      publicSaleStart: saleDetails.publicSaleStart,
      publicSaleEnd: saleDetails.publicSaleEnd,
    },
    (time) => new Date(Number(time) * 1000)
  )

  const countdown = {
    publicSale: useCountdown(publicSaleStart, publicSaleEnd),
    presale: useCountdown(presaleStart, presaleEnd),
  }

  const contractMint = useContractMint(contract, signer, saleDetails, allowlist)

  const isNothingMinted = saleDetails.totalMinted.eq(0)

  const isSoldOut = saleDetails.totalMinted.gte(saleDetails.maxSupply)

  const isPublicSaleMintActive =
    countdown.publicSale.isStarted &&
    !countdown.publicSale.isEnded &&
    saleDetails.publicSaleActive &&
    !isSoldOut

  const isPresaleMintActive =
    countdown.presale.isStarted &&
    !countdown.presale.isEnded &&
    saleDetails.presaleActive &&
    !isSoldOut

  const isSaleActive = isPublicSaleMintActive || isPresaleMintActive

  const isAccountConnected = !!account?.data

  return {
    account,
    disconnect,
    contractProps,
    saleDetails,
    contractMint,
    allowlist,
    mintedPerAddress,
    contract,
    constants,
    isAccountConnected,
    isPublicSaleMintActive,
    isPresaleMintActive,
    isSaleActive,
    isNothingMinted,
    isSoldOut,
    countdown,
    presaleStart,
    presaleEnd,
    publicSaleStart,
    publicSaleEnd,
  }
}
