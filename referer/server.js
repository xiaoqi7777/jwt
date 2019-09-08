let http = require('http')
let url = require('url')
let path = require('path')
let fs = require('fs')
http.createServer(function (req, res) {
  let { pathname } = url.parse(req.url, true)
  if (pathname === '/') {
    return fs.createReadStream(path.join(__dirname, '5.html')).pipe(res)
  }
  let realPath = path.join(__dirname, pathname)
  fs.stat(realPath, (err, statObj) => {
    if (err) return res.end()
    if (req.headers['referer']) {
      // 防盗链
      console.log(req.headers)
      let host = req.headers.host.split(':')[1]
      let referer = url.parse(req.headers['referer']).hostname
      console.log(host, referer)
      if (host === referer) {
        console.log('本机')
        fs.createReadStream(realPath).pipe(res)
      } else {
        console.log('防盗')
        return fs.createReadStream(path.join(__dirname, '2.png')).pipe(res)
      }
    } else {
      fs.createReadStream(realPath).pipe(res)
    }
  })
}).listen(9999)
