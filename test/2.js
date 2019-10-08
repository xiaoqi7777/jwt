let express = require('../express/lib/express')
let app = express()
app.get('/1', function(req, res, next) {
  console.log('1')
  next()
}, function(req, res, next) {
  console.log('xxxxx')
  next()
})
app.get('/2', function(req, res, next) {
  console.log('2')
  next()
}).get('/3', function(req, res, next) {
  console.log('3')
  res.end('3')
  next()
})
app.listen(3000)