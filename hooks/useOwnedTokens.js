import { useMemo } from "react";
import useSWR from "swr";

export function useOwnedTokens(address) {
  const { data, error } = useSWR(
    `/api/ownedItems?owner=${address}`,
    (url) => fetch(url).then((res) => res.json())
  );

  const ownedTokenIds = useMemo(() => {
    if (data?.tokens) return data.tokens.map((token) => token?.nft?.tokenData.tokenId) 
  },[data && data?.tokens])

  return {
    tokens: data,
    ownedTokenIds,
    error
  }
}
