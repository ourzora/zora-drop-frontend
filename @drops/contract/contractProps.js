import { contract } from './contract'
import { BigNumber } from 'ethers'
import merge from 'lodash/merge'
import mapValues from 'lodash/mapValues'

const CONTRACT_PROPS_OVERRIDES = {}

const CONTRACT_PROPS_SCHEMA = {
  config: {
    metadataRenderer: null,
    editionSize: null,
    royaltyBPS: null,
    fundsRecipient: null,
  },
  contractURI: null,
  name: null,
  saleDetails: {
    presaleActive: null,
    publicSaleActive: null,
    publicSaleStart: null,
    publicSaleEnd: null,
    publicSalePrice: null,
    presaleStart: null,
    presaleEnd: null,
    presaleMerkleRoot: null,
    maxSalePurchasePerAddress: null,
    totalMinted: null,
    maxSupply: null,
  },
  symbol: null,
  totalSupply: null,
}

export async function getContractProps() {
  const contractProps = await readContractProps(CONTRACT_PROPS_SCHEMA)

  console.log(JSON.stringify(contractProps))

  return merge(
    contractProps,
    serializeContractProps(
      process.env.NODE_ENV === 'development' ? CONTRACT_PROPS_OVERRIDES : {}
    )
  )
}

const deserialize = (value) => {
  if (typeof value === 'object') {
    if (value.type === 'BigNumber') return BigNumber.from(value)
    return mapValues(value, deserialize)
  }

  return value
}

const serialize = (value) => {
  if (Array.isArray(value)) {
    const stringKeys = Object.keys(value).filter((key) => isNaN(key))

    if (stringKeys.length)
      return Object.fromEntries(stringKeys.map((key) => [key, serialize(value[key])]))

    return value.map((v) => serialize(v))
  }

  if (BigNumber.isBigNumber(value)) return value.toJSON()

  if (typeof value === 'object' && value !== null) return mapValues(value, serialize)

  return value
}

export function hydrateContractProps(props) {
  return mapValues(props, deserialize)
}

function serializeContractProps(props) {
  return mapValues(props, serialize)
}

async function readContractProps(props) {
  const keys = Object.keys(props)

  const values = await Promise.all(keys.map((name) => contract[name]()))

  const rawProps = Object.fromEntries(keys.map((name, index) => [name, values[index]]))

  return serializeContractProps(rawProps)
}
