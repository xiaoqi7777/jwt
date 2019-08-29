let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let jwt = require('./jwt')
// let jwt = require('jsonwebtoken')
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8082')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method.toLowerCase() === 'options') {
        return res.end()
    }
    next()
})
app.use(bodyParser.json())
let secret = 'zfjg'
app.get('/test', (req, res) => {
    let obj = { test: 'test' }
    obj = JSON.stringify(obj)
    res.end(obj)
})
app.post('/login', (req, res) => {
  console.log('/login')
    let { username } = req.body
    if (username === 'admin') { // 如果访问的是admin 种植cookie
        res.json({
            code: 0,
            username: 'admin',
            token: jwt.sign({ username: 'admin', exp: Date.now() + 1000 * 5 }, secret)
        })
    } else {
        res.json({
            code: 1,
            data: '用户名不存在'
        })
    }
})
app.get('/validate', (req, res) => {
    let token = req.headers.authorization
    console.log('token', token)

    try {
      let rs = jwt.verify(token, secret)
      console.log('rs', rs)
        res.json({
          username: rs.username,
          code: 0, // 延长tokne的过期时间
          token: jwt.sign({ username: 'admin', exp: Date.now() + 1000 * 5 }, secret, {
              // expiresIn: 20
          })
      })
    } catch (error) {
      return res.json({
          code: 1,
          data: 'token失效了'
      })
    }

    // jwt.verify(token, secret, (err, decode) => { // 验证token的可靠性
    //     if (err) {
    //       console.log('失效了')
    //         return res.json({
    //             code: 1,
    //             data: 'token失效了'
    //         })
    //     } else {
    //       console.log('成功了')
    //         res.json({
    //             username: decode.username,
    //             code: 0, // 延长tokne的过期时间
    //             token: jwt.sign({ username: 'admin' }, secret, {
    //                 // expiresIn: 20
    //                 exp: Date.now() + 1000 * 10
    //             })
    //         })
    //     }
    // })
})

app.listen(3000)
// console.log(Date.now())