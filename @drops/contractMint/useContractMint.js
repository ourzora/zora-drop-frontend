import { useState } from 'react'
import { BigNumber } from 'ethers'

const MINT_TX_CONFIRMATIONS = 2

const initialState = {
  error: null,
  result: null,
  isLoading: false,
  isMinting: false,
  isAwaitingApproval: false,
  isSuccess: false,
  txHash: null,
}

export function useContractMint(contract, signer, saleDetails, allowlist) {
  let mintDetails = allowlist?.entry

  // If not presale
  if (!mintDetails) {
    mintDetails = {
      price: saleDetails.publicSalePrice,
      maxCount: saleDetails.maxSalePurchasePerAddress,
    }
  }

  const [qty, setQty] = useState(1)
  const cost = BigNumber.from(mintDetails.price).mul(BigNumber.from(qty))

  function updateQty(qty) {
    setQty(Math.max(Math.min(Number(qty), mintDetails.maxCount), 1))
  }

  function mintError(e) {
    updateState({
      error: e,
      result: null,
      isLoading: false,
      isMinting: false,
      isAwaitingApproval: false,
      isSuccess: false,
      txHash: null,
    })
  }

  async function genericMint(stage = 'publicSale') {
    const method =
      stage === 'publicSale' ? 'purchase' : stage === 'presale' ? 'purchasePresale' : null

    if (!method) throw new Error(`Mint stage ${stage} not implemented.`)

    setState(initialState)
    updateState({ isLoading: true, isAwaitingApproval: true })

    const value = cost

    const args =
      method === 'purchase'
        ? [qty]
        : method === 'purchasePresale'
        ? [qty, mintDetails.maxCount, mintDetails.price, mintDetails.proof]
        : []

    try {
      const gasEstimate = await contract
        .connect(signer.data)
        .estimateGas[method](...args, { value })

      const gasLimit = gasEstimate.mul(120).div(100)

      const tx = await contract.connect(signer.data)[method](...args, { gasLimit, value })

      updateState({ isAwaitingApproval: true, isMinting: true, txHash: tx.hash })

      const result = await tx.wait(MINT_TX_CONFIRMATIONS)

      updateState({ result, isMinting: false, isSuccess: true })
    } catch (e) {
      return mintError(e)
    }
  }

  function updateState(updates) {
    setState((state) => ({ ...state, ...updates }))
  }

  async function publicSaleMint() {
    return genericMint('publicSale')
  }

  async function presaleMint() {
    return genericMint('presale')
  }

  const [
    { error, isAwaitingApproval, isSuccess, result, isLoading, isMinting, txHash },
    setState,
  ] = useState(initialState)

  return {
    error,
    isAwaitingApproval,
    isSuccess,
    result,
    isLoading,
    isMinting,
    txHash,
    publicSaleMint,
    presaleMint,
    cost,
    qty,
    updateQty,
  }
}
