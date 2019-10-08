let http = require('http')
let methods = require('methods')
let Router = require('./router')

let slice = Array.prototype.slice

function Application() {
  this._router = new Router()
}
// 懒加载 
Application.prototype.lazyrouter = function() {
  if (!this._router) {
    this._router = new Router()
  }
}

Application.prototype.get = function(path, ...handler) {
  this.lazyrouter()
  this._router.get(path, ...handler)
  return this
}

Application.prototype.listen = function() {
  let server = http.createServer((req, res) => {
    function done(req, res) {
      console.log('cannot')
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    this._router.handle(req, res, done)
  })

  server.listen.apply(server, arguments)

}


module.exports = Application