let express = require('../express/lib/express')

let app = express()

app.get('/1', function(req, res, next) {
  console.log('get1-1')
  next('wrong') // 如果任何出错了，会把错误交给next,然后会跳过后面所有的正常处理函数,交给错误处理中间件进行处理
}, function(req, res, next) {
  console.log('get1-2')
  res.end('11')
})
app.post('/1', function(req, res, next) {
  console.log('post1-1')
  next()
}, function(req, res, next) {
  console.log('post1-2')
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