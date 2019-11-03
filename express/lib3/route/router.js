let Layer = require('./layer')
let methods = require('methods')

function Router(path) {
  this.statck = []
  this.path = path
  this.methods = {}
}
Router.prototype.handle_method = function(method) {
  method = method.toLowerCase()
  return this.methods[method]
}
methods.forEach(method => {
  Router.prototype[method] = function(handle) {
    for (let i = 0; i < handle.length; i++) {

      this.methods[method] = true
      let layer = new Layer(this.path, handle[i])
      layer.method = method
      this.statck.push(layer)
    }
  }
})

Router.prototype.dispatch = function(req, res, done) {
  let index = 0;
  let self = this

  function next(err) {
    if (err) {
      return done(err)
    }
    if (index == self.statck.length) {
      return done(req, res)
    }
    let layer = self.statck[index++]
    if (layer.method == req.method.toLowerCase()) {
      layer.handler_request(req, res, next)
    } else {
      next()
    }
  }
  next()
}
module.exports = Router