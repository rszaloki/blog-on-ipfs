const express = require('express')
const app = express()

const ROOT = __dirname + '/dist/';

app.get('/sw.js', function (req, res, next) {
  res.sendFile('sw.js', {
    root: ROOT,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }, function () {
    next()
  })
})

app.use(function (req, res, next) {
  res.sendFile('seed.html', {
    root: ROOT,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }, function () {
    next()
  })
})

app.listen(3000, function () {
  console.log('Ready');
});