import { getFile, getNode } from './src/server'

const BASE = 'QmWA8nDWY9JAd2fneFavWN3Q8A8oYChMiUMhXrxM1tD2zV'
getNode()

console.log('sw loaded')

self.addEventListener('install', (event) => {
  console.log('sw installed')
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  console.log('sw installed')
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin)) {

    const url = new URL(event.request.url)
    const PATH = url.pathname
    const IPFS_PATH = `${BASE}${PATH}`

    console.log(event.request.url, ' ==> ', IPFS_PATH)

    event.respondWith(getFile(IPFS_PATH).then(resp => {
      const content = resp[0].content
      return new Response(content)
    }))
  }
})