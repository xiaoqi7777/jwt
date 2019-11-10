
# 用法
[[toc]]
## 路由
```js
let express = require('../express/express')

let app = express()

app.get('/1', function(req, res, next) {
  next('wrong') // 如果任何出错了，会把错误交给next,然后会跳过后面所有的正常处理函数,交给错误处理中间件进行处理
}, function(req, res, next) {
  res.end('11')
})
app.get('/2', function(req, res, next) {
  next()
})
app.post('/1', function(req, res, next) {
  next()
}, function(req, res, next) {
  res.end('11')
})


app.listen(3000)
```

## 中间件
```js
let express = require('../express/express')
let app = express()

app.use(function(req, res, next) {
  next()
})
app.get('/1', function(req, res, next) {
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
```
## 路径参数问题
```js
let express = require('../express/express')
const app = express()

// 用来批量处理路径参数 
app.param('name', function(req, res, next, val, name) {
  req.user = { id: 1, name: 'zfpx' }
  next()
})
app.param('name', function(req, res, next, val, name) {
  req.user.name = 'zfpx2'
  next()
})
// 路径参数 因为参数在路径里面
app.get('/user/:uid/:name', function(req, res) {
  console.log(req.params) // 路径参数对象
  console.log(req.user)
  res.end('user')
})

app.listen(3000)
```
## 模板引擎
```js
// const express = require('../express')
let express = require('../express/express')
const path = require('path')
const html = require('../express/html.js')
const app = express()
const fs = require('fs')
let url = require('url')

// views是用来设置模板存放根目录
app.set('views', path.resolve(__dirname, 'views'))
// 设置模板引擎 如果render没有指定模板后台名 会以这个作为后缀名
app.set('view engine', 'html')
// 用来设置模板引擎,遇到html结尾的模板用html来进行渲染
app.engine('html', html)


app.use(function(req, res, next) {
  res.render = function(name, options) {
    // 模板后缀
    let ext = '.' + app.get('view engine')
    // 模板文件的名字
    name = name.indexOf('.') == -1 ? name + ext : name
    // 模板位子
    let filepath = path.join(app.get('views'), name)
    // 通过模板后缀 获取对应的渲染引擎
    let render = app.engines[ext]

    function done(err, rs) {
      res.setHeader('Content-Type', 'text/html')
      res.end(rs)
    }
    render(filepath, options, done)
  }
  next()
})

// 当客户端以get方式访问/路径的时候执行对应的回调函数
app.get('/', function(req, res, next) {
  // render 第一个参数是模板的相对路径 模板名称 数据对象
  res.render('index', { title: 'helloxx', user: { name: 'zfxp' } })
})

app.listen(3000)
```

## 静态文件
```js
let express = require('../express/express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000)

```

## bodyParser
```js
let express = require('../express/express')
const path = require('path')
const app = express()
let url = require('url')

function bodyParser() {
  return function(req, res, next) {
    let rs = []
    req.on('data', function(data) {
      rs += data
    })
    req.on('end', function(data) {
      try {
        req.body = JSON.parse(rs)
      } catch (e) {
        req.body = require('querystring').parse(rs)
      }
      next()
    })
  }
};
app.use(bodyParser())
app.post('/post', function(req, res, next) {
  let str = req.body
  res.end('str')
})
app.listen(3000)
```