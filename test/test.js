// let express = require('../express/lib2/express')
// // const express = require('express')
// const app = express()

// // 用来批量处理路径参数 
// app.param('uid', function(req, res, next, val, name) {
//   req.user = { id: 1, name: 'zfpx' }
//   next()
// })
// app.param('uid', function(req, res, next, val, name) {
//   req.user.name = 'zfpx2'
//   next()
// })
// // 路径参数 因为参数在路径里面
// app.get('/user/:uid', function(req, res) {
//   console.log(req.params) // 路径参数对象
//   console.log(req.user)
//   res.end('user')
// })

// app.listen(3000)

let express = require('../express/lib3/express')
// const express = require('express')
const app = express()

// 用来批量处理路径参数 
app.param('uid', function(req, res, next, val, name) {
  req.user = { id: 1, name: 'zfpx' }
  next()
})
// app.param('uid', function(req, res, next, val, name) {
//   req.user.name = 'zfpx2'
//   next()
// })
// 路径参数 因为参数在路径里面
app.get('/user/:uid/:id', function(req, res) {
  console.log(req.params) // 路径参数对象
  res.end('user')
})
app.listen(3000)