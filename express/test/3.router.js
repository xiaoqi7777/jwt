let express = require('express')
let app = express()

// app.get('/user', function(req, res) {
//   res.end('get')
// }).post(function(req, res) {
//   res.end('post')
// }).post(function(req, res) {
//   res.end('put')
// })
app.get('/', function(req, res, next) {
  console.log('1')
  res.end('1')
  next()
})
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