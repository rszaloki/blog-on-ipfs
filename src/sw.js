import HASHES from 'ipfs-deploy!./ipfs-config.json'

console.log('sw loaded')

const ROOT = HASHES.root

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
    console.log(event.request.url)

    event.respondWith(fetch(`https://ipfs.io/ipfs/${ROOT}${PATH}`))
  }
})