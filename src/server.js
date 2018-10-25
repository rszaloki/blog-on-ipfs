import IPFS from 'ipfs'
import 'setimmediate'

let NODE = null

export function getNode () {
  if (!NODE) {
    NODE = new Promise(resolve => {
      const ipfs = new IPFS({
        init: {
          emptyRepo: true
        },
        preload: {
          enabled: false
        }
      })

      ipfs.on('error', error => {
        console.error('IPFS error!', error)
      })

      ipfs.on('stop', () => {
        console.log('IPFS stopped')
      })

      ipfs.on('start', () => {
        console.log('IPFS started')
      })

      ipfs.once('ready', () => {
        console.log('IPFS ready!')
        resolve(ipfs)
      })

    })
  }
  return NODE
}

export function getFile (ipfsPath) {
  return getNode().then(ipfs => ipfs.files.get(ipfsPath))
}