let fs = require('fs')
let http = require('http')
let path = require('path')
let ws = fs.createWriteStream(path.join(__dirname, '2.txt'))
let start = 0

// 暂停
let pause = false
process.stdin.on('data', (res) => {
  if (res.toString().includes('p')) {
    pause = true
  } else {
    pause = false
    download()
  }
})

download()
function download () {
  http.get({
    host: 'localhost',
    port: 3000,
    headers: {
      'Range': `bytes=${start}-${start + 4}`
    }
  }, function (res) {
    let total = res.headers['content-range'].split('/')[1]
    // pipe 写完就就调end了,结束服务
    // res.pipe(ws)

    // 用res.on('data')
    res.on('data', (data) => {
      ws.write(data)
      start += 5
      if (start < total && !pause) {
        setTimeout(() => {
          download()
        }, 1000)
      }
    })
  })
}