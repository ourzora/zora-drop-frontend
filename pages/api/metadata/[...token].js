import { ethers } from 'ethers'
const path = require('path')
const fsp = require('fs').promises
import { existsSync } from 'fs'

// import { contractAddress, chainId } from '@lib/constants'

// import { chains } from '@lib/chains'
// import { abi } from '@lib/abi'

// const chain = chains.find((x) => x.id == chainId)?.rpcUrls[0]
// const contract = new ethers.Contract(
//   contractAddress,
//   abi,
//   new ethers.providers.StaticJsonRpcProvider(chain)
// )

const privateDirectory = path.resolve(process.cwd(), 'private')
const validate = async (id, file) => {
  // if (process.env.NEXT_PUBLIC_SHOW_ALL_META === 'true') {
  //   return true
  // }

  try {
    // if (file.indexOf('metadata.json') < 0 && file.indexOf('sample') < 0) {
    //   // Verify token exists
    //   await contract.tokenURI(Number(id))
    // }
    // Verify file exists
    if (!existsSync(file)) {
      throw 'File missing'
    }
  } catch (e) {
    return false
  }
  return true
}

export default function handler(req, res) {
  const { token } = req.query
  const ids = token.pop()
  const dirs = token.splice(-1)

  let idsArr = []
  if (ids.indexOf('...') > -1) {
    const [start, end] = ids.split('...')
    idsArr = Array.from({ length: end - start + 1 }, (_, i) => String(i + Number(start)))
  } else {
    idsArr = ids.split(',').map((x) => x.replace('.json', ''))
  }

  return new Promise(async () => {
    let data
    try {
      data = await Promise.all(
        idsArr.map(async (id) => {
          if (
            process.env.NEXT_PUBLIC_SHOW_MINTED_META === 'true' ||
            id.indexOf('metadata') > -1
          ) {
            const f = path.join(privateDirectory, ...dirs, `${id}.json`)
            if (await validate(id, f)) {
              const file = await fsp.readFile(f, 'utf8')
              return JSON.parse(file)
            } else {
              return null
            }
          } else {
            const f = path.join(privateDirectory, ...dirs, `holding.json`)
            const file = await fsp.readFile(f, 'utf8')
            let json = JSON.parse(file)
            json['tokenId'] = Number(id)
            json['name'] = `Fragments ${id}`
            return json
          }
        })
      )
    } catch (e) {
      console.log(e)
    }
    let result = data.filter((x) => x !== null)

    if (!!result.length) {
      res.setHeader('Cache-Control', `public, max-age=5000`)
      res.setHeader('Content-type', 'application/json')
      if (result && result.length === 1) result = result[0]
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  })
}
