let http = require('http')

let fs = require('fs')
let path = require('path')
let url = require('url')
let crypto = require('crypto')

let serve = http.createServer(function (req, res) {
  // 1、强制缓存 当客户段访问服务端时，跟客户端说下次请求别别来找我
  let { pathname } = url.parse(req.url)
  // max-age=10 相对时间  告诉浏览器10s内不在请求我
  // res.setHeader('Cache-Control','max-age=10')
  // Expires 绝对时间
  // res.setHeader('Expires',new Date(Date.now()+10*1000).toGMTString())
  // 清除强制缓存
  res.setHeader('Cache-Control', 'no-cache')

  // 2、一般情况下 会先采用强制缓存 强制缓存使用后 在5s内不会在发请求了，过了5s在次发送请求
  if (pathname === '/') {
    return fs.createReadStream(path.join(__dirname, '304.html')).pipe(res)
  }
  let realPath = path.join(__dirname, pathname)
  fs.stat(realPath, (err, statObj) => {
    if (err) {
      res.statusCode = 404
      return res.end()
    }
    let etag = crypto.createHash('md5').update(fs.readFileSync(realPath, 'utf8')).digest('base64')
    res.setHeader('Etag', etag) // 一般会用文件大小来替代etag
    if (etag === req.headers['if-none-match']) {
      res.statusCode = 304
      res.end()
    } else {
      fs.createReadStream(realPath).pipe(res)
    }

    // 最后的修改时间
    // 最后修改时间不是很准确 这个时间 精确到秒
    // res.setHeader('Last-Modified',statObj.ctime.toGMTString())
    // let ctime = req.headers['if-modified-since']
    // if(ctime === statObj.ctime.toGMTString()){
    //   // 说明是同一个
    //   res.statusCode = 304
    //   res.end();
    // }else{
    //   if(err){
    //     res.statusCode = 404
    //     return res.end();
    //   }else{
    //     fs.createReadStream(realPath).pipe(res)
    //   }
    // }
  })
})
let port = 3000
serve.listen(port, (err) => {
  console.log('start 3000')
})

// 端口号占用 重新开启一个
serve.on('error', function (err) {
  if (err.errno === 'EADDRINUSE') {
    serve.listen(++port)
  }
})