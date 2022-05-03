import { MerkleTree } from 'merkletreejs'
import { utils } from 'ethers'
import keccak256 from 'keccak256'

export function hashForEntry(entry) {
  return keccak256(
    utils.defaultAbiCoder.encode(
      ['address', 'uint256', 'uint256'],
      [
        utils.getAddress(entry.minter),
        entry.maxCount,
        utils.parseEther(entry.price).toString(),
      ]
    )
  )
}

export function makeTree(entries) {
  entries = entries.map((entry) => {
    entry.hash = hashForEntry(entry)
    return entry
  })
  const tree = new MerkleTree(
    entries.map((entry) => entry.hash),
    keccak256,
    { sortPairs: true }
  )
  entries = entries.map((entry, indx) => {
    entry.hash = utils.hexValue(entry.hash)
    entry.proof = tree.getHexProof(entry.hash, indx)
    entry.price = utils.parseEther(entry.price)
    return entry
  })

  console.log('has merkle root', tree.getHexRoot(), entries.length)
  return {
    tree,
    root: tree.getHexRoot(),
    entries,
  }
}
