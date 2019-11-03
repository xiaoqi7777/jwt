let Route = require('./route')
let Http = require('http')
let methods = require('methods')

function Application() {
  this._route = null
}

Application.prototype.lazyrouter = function() {
  if (!this._route) {
    this._route = new Route()
  }
}
Application.prototype.param = function(name, handler) {
  this.lazyrouter()
  this._route.param.apply(this._route, arguments)
}

methods.forEach(method => {
  Application.prototype[method] = function(path, ...handler) {
    this.lazyrouter()
    this._route[method](path, ...handler)
  }
})
Application.prototype.use = function() {
  this.lazyrouter()
  this._route.use.apply(this._route, arguments)
}
Application.prototype.listen = function() {
  let server = Http.createServer((req, res) => {
    function done(req, res, err) {
      res.end(`not ${req.method} ${err}`)
    }
    this._route.handle(req, res, done)
  })
  server.listen.apply(server, arguments)
}

module.exports = Application