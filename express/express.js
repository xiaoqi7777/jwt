let path = require('path')
let Application = require('./application')
let router = require('./route')
let fs = require('fs')

function express() {

  return new Application()
}
express.static = function(p) {
  return function(req, res, next) {
    let staticPath = path.join(p, req.url)
    let exists = fs.existsSync(staticPath)
    console.log(staticPath)
    if (exists) {
      let html = fs.readFile(staticPath, (err, item) => {
        // res.setHeader('Content-Type', 'text/html')
        res.setHeader('Content-type', 'image/gif')
        res.end(item)
      })
    } else {
      next()
    }
  }
}
express.Router = router
module.exports = express