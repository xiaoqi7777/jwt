let http = require('http')

let server = http.createServer((req, res) => {

  console.log(req.url, req.path, req.hostname)
  res.end('1')
})

server.listen(3000)