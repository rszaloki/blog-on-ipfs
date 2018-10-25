const express = require('express')
const morgan = require('morgan')

const ROOT = __dirname + '/dist/'

const app = express()

app.use(morgan('combined'))
app.use(express.static(ROOT))

app.use(function (req, res, next) {
  res.sendFile('seed.html', {root: ROOT}, function () {
    next()
  })
})

app.listen(3000, function () {
  console.log('Ready')
})
