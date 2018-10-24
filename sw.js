const BASE = 'QmWiXWfcJ5nxh7HhXRhnkD2evcbQZ33DxbnC4J7dnDX74c'
import { getFile, getNode } from './src/server'

self.addEventListener('install', (event) => {
  console.log('sw installed')
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  getNode()
  console.log('sw activated')
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin)) {

    const url = new URL(event.request.url)
    const PATH = url.pathname
    const IPFS_PATH = `${BASE}${PATH}`

    event.respondWith(getFile(IPFS_PATH).then(resp => {
      const content = resp[0].content
      return new Response(content)
    }))
  }
})