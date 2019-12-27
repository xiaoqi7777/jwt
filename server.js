let express = require('express');
let bodyParser = require('body-parser');
let multer = require('multer')
let fs = require('fs')
let path = require('path')
let app = express();
// 处理json格式的请求体
app.use(bodyParser.json());
// 处理表单格式的请求体
app.use(bodyParser.urlencoded({ extended: true }));
// 文件上传 upload req.file获取文件的流   dest req.file 获取的保存路径
let upload = multer({ upload: 'upload/' })
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null,path.join(__dirname,'/upload'))
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname)
//   }
// })
// let upload = multer({storage:storage})

app.post('/post', (req, res) => {
  let body = req.body
  console.log(body)
  res.send(body)
})
app.post('/form', (req, res) => {
  let body = req.body
  res.send(body)
})
// 只有一个文件类型的用upload.single('avatar') 处理
app.post('/upload', upload.single('avatar'), (req, res) => {
  // req.file 里面存放的文件类型的数据
  // req.body 里面存放的普通类型的数据
  console.log(req.body.name, typeof req.body)
  console.log(req.file); //req.filr 指的是请求体formData里的avatar 字段对应的文件内容
  // console.log(req.file.buffer); //req.filr 指的是请求体formData里的avatar 字段对应的文件内容
  if (req.file) {
    fs.writeFileSync(path.join(__dirname, `upload/${req.file.originalname}`), req.file.buffer)
  }

  res.send(req.body)
})
app.listen(4000)