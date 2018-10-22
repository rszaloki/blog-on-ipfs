import IPFS from 'ipfs'
import 'setimmediate'

let NODE = null

export function getNode () {
  if (!NODE) {
    NODE = new Promise(resolve => {
      const ipfs = new IPFS({
        init: {
          emptyRepo: true
        }
      })

      ipfs.once('ready', () => {
        resolve(ipfs)
      })
    })
  }
  return NODE
}


export function getFile(ipfsPath) {
  return getNode().then(ipfs => ipfs.files.get(ipfsPath))
}