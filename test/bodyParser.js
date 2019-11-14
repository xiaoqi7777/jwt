// bodyParser 和 req.body 实现
// let express = require('express')
let express = require('../express/express')
const path = require('path')

let multer = require('multer')
const app = express()
let url = require('url')
let bodyParser = require('body-parser');
let fs = require('fs')

app.use(cors())
// app.use(myBodyParser())
// 接收 json 格式
app.use(bodyParser.json())
// 处理表单格式的请求体
app.use(bodyParser.urlencoded({ extended: true }));
// 文件上传 upload req.file获取文件的流   dest req.file 获取的保存路径
let upload = multer({ upload: 'upload/' })
app.post('/post', function(req, res, next) {
  let str = req.body
  console.log('str', req.body)
  res.end('str')
})
app.post('/form', function(req, res, next) {
  let str = req.body
  console.log('form', req.body)
  res.end('form')
})
console.log('path', path.join(__dirname, 'upload'))
app.use(express.static(path.join(__dirname, 'upload')));

// app.get('/file', (req, res) => {
//   let img = fs.createReadStream(path.join(__dirname, '../client', 'baidu.png'))
//   // console.log('img', img)
//   res.end(img)
// })
// 只有一个文件类型的用upload.single('avatar') 处理
app.post('/upload', upload.single('avatar'), (req, res) => {
  // req.file 里面存放的文件类型的数据
  // req.body 里面存放的普通类型的数据
  console.log(req.body.name, typeof req.body)
  console.log(req.file); //req.filr 指的是请求体formData里的avatar 字段对应的文件内容
  // console.log(req.file.buffer); //req.filr 指的是请求体formData里的avatar 字段对应的文件内容
  if (req.file) {
    // 将图片写入本地
    fs.writeFileSync(path.join(__dirname, `upload/${req.file.originalname}`), req.file.buffer)
  }

  res.end('file')
})
app.listen(3001)


// //  用来接收 post 参数
function myBodyParser() {
  return function(req, res, next) {
    let rs = []
    req.on('data', function(data) {
      rs += data
    })
    req.on('end', function(data) {
      try {
        req.body = JSON.parse(rs)
        console.log('11', req.body)
      } catch (e) {
        req.body = require('querystring').parse(rs)
        console.log('22', req.body)
      }
      next()
    })
  }
};

function cors() {
  return function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*")
    //允许携带哪个头访问我
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Content-type1')
    //允许哪个方法访问我 默认post get
    res.setHeader('Access-Control-Allow-Methods', 'PUT')
    //允许携带cookie  但是Access-Control-Allow-Origin 不能设置 * 其他都可以
    res.setHeader('Access-Control-Allow-Credentials', true)
    //允许前端获取哪个头
    res.setHeader('Access-Control-Expose-Headers', 'name,ss')
    //预检的存活时间 10s内 options请求只会发一次  
    res.setHeader('Access-Control-Max-Age', 1)
    if (req.method.toLowerCase() == 'options') {
      console.log('12312', req.method.toLowerCase())
      res.end()
    }
    next()
  }
}