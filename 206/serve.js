// 206 断点续传
let http = require('http')
let fs = require('fs')
let path = require('path')
let a = path.join(__dirname, '1.txt')
let statObj = fs.statSync(a)
//  statObj.size 文件的大小
http.createServer(function (req, res) {
  let range = req.headers.range
  if (range) {
    let [, start, end] = range.match(/bytes=(\d*)-(\d*)/)
    // 如果没有开始 默认是0  如果没有结束 默认是总大小减一
    start = start ? Number(start) : 0
    end = end ? Number(end) : statObj.size - 1
    res.statusCode = 206
    res.setHeader('Content-Range', `bytes ${start}-${end}/${statObj.size}`)
    res.setHeader('Accept-Ranges', 'bytes')
    fs.createReadStream(a, { start, end }).pipe(res)
  } else {
    fs.createReadStream(a).pipe(res)
  }
}).listen(3000, 'localhost', function () {
  console.log('localhost 3000')
})
