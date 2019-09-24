let express = require('../express/lib1/express')

let app = express()

app.get('/1', function(req, res, next) {
  console.log('get1-1')
  next()
}, function(req, res, next) {
  console.log('get1-2')
  res.end('11')
})

app.get('/2', function(req, res, next) {
  console.log('2-1')
  next()
}, function(req, res, next) {
  console.log('2-2')
  res.end('2-2')
  next()
})

app.listen(3000)