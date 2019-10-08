let Layer = require('./layer')

function Route(path) {
  this.path = path
  this.stack = []
  this.methods = {}
}

Route.prototype.handler_method = function(method) {
  method = method.toLowerCase()
  return this.methods[method]
}

Route.prototype.get = function(handlers) {
  for (let i = 0; i < handlers.length; i++) {
    let handler = handlers[i]
    let layer = new Layer('/', handler)
    this.methods['get'] = true
    layer.method = 'get'
    this.stack.push(layer)
  }
}

Route.prototype.dispatch = function(req, res, out) {

  let index = 0;
  let self = this

  function next() {
    if (index >= self.stack.length) {
      return out(req, res)
    }
    let layer = self.stack[index++]

    if (layer.method === req.method.toLowerCase()) {
      layer.handler_request(req, res, next)
    } else {
      // 当前层走完，到下一个router
      next()
    }
  }

  next()

}


module.exports = Route