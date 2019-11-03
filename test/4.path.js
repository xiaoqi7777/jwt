// let express = require('../express/lib2/express')
// // const express = require('express')
// const app = express()

// // 用来批量处理路径参数 
// app.param('name', function(req, res, next, val, name) {

//   req.user = { id: 1, name: 'zfpx' }
//   next()
// })
// app.param('name', function(req, res, next, val, name) {
//   req.user.name = 'zfpx2'
//   next()
// })
// // 路径参数 因为参数在路径里面
// app.get('/user/:uid/:name', function(req, res) {
//   console.log(req.params) // 路径参数对象
//   console.log(req.user)
//   res.end('user')
// })

// app.listen(3000)

let pathToRegexp = require('path-to-regexp')
let path = '/user/:uid/:name';
let keys = []

// function pathToRegexp(path, keys) {
//   return path.replace(/\:([^\/]+)/g, ($1, $2, $3) => {
//     keys.push({
//       name: $2,
//       replace: false
//     })
//     return '\:([^\/]+)'
//   })
// }

let rs = pathToRegexp(path, keys)
let str = '/user/123/weqw'
let a = rs.exec(str)
console.log(keys)