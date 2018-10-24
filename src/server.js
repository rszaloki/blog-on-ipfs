import IPFS from 'ipfs'
import 'setimmediate'

let NODE = null

export function getNode () {
  if (!NODE) {
    NODE = new Promise(resolve => {
      const ipfs = new IPFS({
        config: {
          Addresses: {
            Swarm: ['/dns4/ws-star1.par.dwebops.pub/tcp/443/wss/p2p-websocket-star']
          }
        },
        init: {
          emptyRepo: true
        }
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