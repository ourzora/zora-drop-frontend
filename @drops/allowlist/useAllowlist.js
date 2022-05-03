import { useEffect, useState } from 'react'
import { merkleTree as tree } from '../../lib/constants'
import { getAddress, isAddress } from 'ethers/lib/utils'

const initialState = {
  checkedAddress: null,
  isVerified: false,
  entry: null,
}

export function useAllowlist(account) {
  const [state, setState] = useState(initialState)
  const { checkedAddress, isVerified, entry, mintedPerAddress } = state

  const isChecked =
    checkedAddress &&
    account.data?.address &&
    isAddress(checkedAddress) &&
    getAddress(checkedAddress) === getAddress(account.data.address)

  useEffect(() => {
    if (!account.data) return setState(initialState)

    if (!isChecked) check(account.data.address)
  }, [account.data, checkedAddress, isChecked])

  function check(address) {
    const entry = tree.entries.find((e) => getAddress(e.minter) === getAddress(address))
    const isVerified = entry && !!entry.proof.length
    const checkedAddress = address
    console.log({ entry })
    setState((prevState) => ({
      ...prevState,
      checkedAddress,
      entry,
      isVerified,
    }))
  }

  return {
    checkedAddress,
    isVerified,
    isChecked,
    entry,
    tree,
    root: tree.root,
    check,
  }
}
