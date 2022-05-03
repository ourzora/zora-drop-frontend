import { utils } from 'ethers'
import { useState, useEffect, useMemo } from 'react'
import { merkleTree } from './constants'

// {"publicSalePrice": "10000000000000000", "maxSalePurchasePerAddress": 2, "publicSaleStart": 0, "publicSaleEnd": 1654584403, "presaleStart": 0, "presaleEnd": 1654584403, "presaleMerkleRoot": "0x39f71f1d23518244b4c41f997cd3a37b8323310ae9bcd4afd178bb0c208e7b8f"}

export const mintPhases = [
  {
    name: 'Elemental 1/1 Holders',
    description: 'Max 5 per qualifying NFT held',
    maxCount: 5,
    pricePerToken: utils.parseEther('0.08').toString(),
    start: '2022-04-25T15:00:00-04:00',
    end: '2022-04-26T14:00:00-04:00',
  },
  {
    name: 'Elemental Holders',
    description: 'Max 2 per qualifying NFT held',
    maxCount: 2,
    pricePerToken: utils.parseEther('0.12').toString(),
    start: '2022-04-26T15:00:00-04:00',
    end: '2022-04-27T14:00:00-04:00',
  },
  {
    name: 'Allowlist',
    description: 'Max 4 per qualifying NFT held',
    pricePerToken: utils.parseEther('0.5').toString(),
    maxCount: 4,
    start: '2022-04-27T15:00:00-04:00',
    end: '2022-04-28T14:00:00-04:00',
  },
  {
    name: 'Public mint',
    description: 'Max 1 per wallet',
    maxCount: 1,
    pricePerToken: utils.parseEther('1').toString(),
    start: '2022-04-28T15:00:00-04:00',
    end: '2022-04-30T15:00:00-04:00',
  },
]

export function getActivePhases() {
  const publicSale = mintPhases.filter((mp) => mp.name.indexOf('Public') > -1)[0]
  const activePresale = mintPhases.filter(
    (mp) => new Date() >= new Date(mp.start) && new Date() <= new Date(mp.end)
  )[0]

  return {
    activePresale,
    publicSale,
  }
}

export function generateSaleConfigurationTuple() {
  const publicSale = mintPhases.filter((mp) => mp.name.indexOf('Public') > -1)[0]

  const tuples = Object.create(mintPhases).map((mp) => {
    const updatedPhase = {
      ...mp,
      pricePerToken: utils.formatEther(mp.pricePerToken).toString() + ' ETH',
      saleConfigurationTuple: {
        publicSalePrice: mp.pricePerToken,
        maxSalePurchasePerAddress: mp.maxCount,
        publicSaleStart: Math.floor(new Date(publicSale.start).getTime() / 1000),
        publicSaleEnd: Math.floor(new Date(publicSale.end).getTime() / 1000),
        presaleStart:
          mp.name.indexOf('Public') > -1
            ? 0
            : Math.floor(new Date(mp.start).getTime() / 1000),
        presaleEnd:
          mp.name.indexOf('Public') > -1
            ? 0
            : Math.floor(new Date(mp.end).getTime() / 1000),
        presaleMerkleRoot: merkleTree.root,
      },
    }
    return updatedPhase
  })
  return tuples
}

export function useActiveMintPhase() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  })

  const activePhase = useMemo(
    () =>
      mintPhases.find((phase) => {
        const [start, end] = [phase.start, phase.end].map((d) => new Date(d))

        return now >= start && now < end
      }),
    [now]
  )

  return activePhase
}
