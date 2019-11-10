let path = require('path')
let Application = require('./application')
let router = require('./route')
let fs = require('fs')

function express() {

  return new Application()
}
express.static = function(p) {
  return function(req, res, next) {
    let staticPath = path.join(p, req.path + '.html')
    let exists = fs.existsSync(staticPath)
    if (exists) {
      let html = fs.readFile(staticPath, (err, item) => {
        res.setHeader('Content-Type', 'text/html')
        res.end(item)
      })
    } else {
      next()
    }
  }
}
express.Router = router
module.exports = express