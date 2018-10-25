const {execSync} = require('child_process')
const {resolve} = require('path')

module.exports = function (source) {
  const {sourcePath} = JSON.parse(source)
  const websiteDir = resolve(this.context, sourcePath)
  const lastDir = websiteDir.split('/').pop()

  const filesAndHashes = execSync(`ipfs add -r --progress=false ${websiteDir}`).toString().split('\n')
  const added = {}
  for (let line of filesAndHashes) {
    if (line.length && line.startsWith('added ')) {
      const [dummy, hash, rawUrl] = line.split(' ')
      const url = rawUrl.trim().slice(lastDir.length) || 'root'
      if (hash && url) {
        console.log('ipfs add', hash, '->', url)
        added[url] = hash
      }
    }
  }

  return JSON.stringify(added)
}