import { useEffect, useState } from "react"
import { contract } from '@drops/contract'
import { merkleTree } from '../../lib/constants'
import { uniqBy } from "lodash"

export function useMintedPerAddress(account, saleDetails) {
  const [mintedPerAddress, setMintedPerAddress] = useState(null)
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    if (account.data?.address && saleDetails) {
      // console.log(saleDetails)
      setLoading(true)
      try {
        const result = await contract.mintedPerAddress(account.data?.address)
        let presaleMintsRemaining = merkleTree.entries.filter(entry => entry.minter === account.data?.address)
        presaleMintsRemaining = uniqBy(presaleMintsRemaining, 'minter')[0].maxCount
        
        setMintedPerAddress({
          presaleMints: result.presaleMints.toString(),
          presaleMaxCount: presaleMintsRemaining,
          publicMints: result.publicMints.toString(),
          totalMints: result.totalMints.toString(),
        })
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(err)
        console.error(err)
      }
    }
  }, [
    account.data?.address,
  ])

  return {
    data: mintedPerAddress,
    loading,
    error,
  }
}