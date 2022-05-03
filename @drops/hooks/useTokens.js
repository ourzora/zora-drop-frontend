import useSWR from 'swr'
import { useState, useCallback, useEffect } from 'react'
import { baseUrl } from '@lib/constants'

export const useTokens = (saleDetails, {pageSize = 4, useAll = false}) => {
  const [tokenAmount, setTokenAmount] = useState(pageSize)
  const [allTokensLoaded, setAllTokensLoaded] = useState(useAll)
  
  const { data: tokens, error } =
    useSWR(`${baseUrl}/api/metadata/1...${tokenAmount}`)

  const supply = saleDetails.totalMinted.toNumber()

  const loadMore = useCallback(() => {
    if (supply) {
      const addTokens =
        (tokenAmount + pageSize < supply) ? (tokenAmount + pageSize) : supply
      setTokenAmount(addTokens)
    }
  }, [tokenAmount, supply])

  useEffect(() => {
    if (supply && tokenAmount === parseInt(supply)) {
      setAllTokensLoaded(true)
    }
  }, [supply, tokenAmount])

  useEffect(() => {
    if (useAll && supply) {
      setTokenAmount(parseInt(supply))
      setAllTokensLoaded(true)
    }
  }, [supply])

  return [
    {
      tokens,
      isLoading: !error && !tokens,
      error,
      tokenAmount,
      allTokensLoaded,
      totalSupply: supply,
    },
    loadMore,
  ]
}
