let Layer = require('./layer')
let methods = require('methods')
let slice = Array.prototype.slice

function Route(path) {
  this.path = path
  this.stack = []
  this.methods = {}
}

Route.prototype.handler_method = function(method) {
  method = method.toLowerCase()
  return this.methods[method]
}

// 收集每个请求 内部的执行的方法  将他们用 layer 实例化 存放在stack中 等待当前的请求匹配的时候 在执行
methods.forEach(method => {
  Route.prototype[method] = function() {
    let handlers = slice.call(arguments)
    this.methods[method] = true
    for (let i = 0; i < handlers.length; i++) {
      let layer = new Layer('/', handlers[i])
      layer.method = method
      this.stack.push(layer)
    }
    return this
  }
})


Route.prototype.dispatch = function(req, res, out) {

  let index = 0;
  let self = this

  function next(err) {
    // 如果一旦 路由函数中出错了 就会跳过当前路由
    if (err) {
      console.log('err', err)
      return out(req, res, err)
    }
    if (index >= self.stack.length) {
      return out(req, res)
    }
    let layer = self.stack[index++]

    if (layer.method === req.method.toLowerCase()) {
      layer.handler_request(req, res, next)
    } else {
      // 当前层走完，到下一个router
      next('123')
    }
  }
  next()
}


module.exports = Route