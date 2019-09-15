let express = require('express')
let app = express()

app.get('/', function(req, res, next) {
  console.log('1')
  // res.end('1')
  next()
}, function(req, res, next) {
  console.log('xxxxx')
  res.end('122222')
  next()
})
// app.get('/', function(req, res, next) {
//   console.log('1')
//   res.end('1')
//   next()
// })
app.get('/2', function(req, res, next) {
  console.log('2')
  res.end('2')
  next()
})
app.get('/3', function(req, res, next) {
  console.log('3')
  res.end('3')
  next()
})
app.listen(3000)