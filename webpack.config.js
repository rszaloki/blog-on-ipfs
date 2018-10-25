const path = require('path')
const context = path.resolve(__dirname)

module.exports = {
  mode: 'development',
  context,
  entry: {
    sw: './src/sw.js'
  },
  resolveLoader: {
    alias: {
      'ipfs-deploy':path.resolve(__dirname,'lib/ipfs-deploy.js')
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot:false,
    historyApiFallback: {
      rewrites: [
        {from: /./, to: '/seed.html'}
      ]
    }
  }
}