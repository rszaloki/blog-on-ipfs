const BASE = 'QmWi3eS9ZsqNbXmZuiABgPebZfFP3M61jFAt7GGYi7sVMV'
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
  console.log(event.request.url,' ==> ')
  if (event.request.url.startsWith(self.location.origin)) {

    const url = new URL(event.request.url)
    const PATH = url.pathname
    const IPFS_PATH = `${BASE}${PATH}`

    console.log(IPFS_PATH);

    event.respondWith(getFile(IPFS_PATH).then(resp => {
      const content = resp[0].content
      return new Response(content)
    }))
  }
})