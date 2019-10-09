let express = require('express')
let app = express()

app.use(function(req, res, next) {
  console.log('Ware1', Date.now())
  next()
})
app.get('/', function(req, res, next) {
  res.end('1')
})
// 创建一个新的路由容器 或者说路由系统
const user = express.Router()
user.use(function(req, res, next) {
  console.log('Ware2', Date.now())
  next()
})
user.get('/2', function(req, res, next) {
  res.end('2')
})
app.use('/user', user)
app.use(function(err, req, res, next) {
  res.end('catch' + err)
})
app.listen(3000)