let Route = require('./route')
let Layer = require('./layer')
let url = require('url')
let methods = require('methods')
let slice = Array.prototype.slice

function Router() {
  this.statck = []
}

Router.prototype._route = function(path) {
  // 在new Route的时候 他内部会收集所有的路由配置
  let route = new Route(path)
  // 首先 每一层 处理函数都是 Layer,一层里面的所有route都放在Route中,route.dispatch.bind(route) 会放到Layout 的处理函数中 接手req,res,next等参数。
  let layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route
  // 当前layout层结构  就是的 path和一堆处理函数
  this.statck.push(layer)
  return route
}

// 每一个请求 方法的配置处理
methods.forEach(method => {
  Router.prototype[method] = function(path) {
    // 是往router 里面添加一层
    let route = this._route(path)
    route[method].apply(route, slice.call(arguments, 1))
    return this
  }
})

// 处理
Router.prototype.handle = function(req, res, out) {
  let index = 0;
  let self = this
  let { pathname } = url.parse(req.url, true)

  function next(err) {
    if (index >= self.statck.length) {
      return out(req, res)
    }
    let layer = self.statck[index++]
    // 当前一层router
    if (layer.match(pathname) && layer.route && layer.route.handler_method(req.method)) {
      if (err) {
        layer.handler_error(err, req, res, next) //专门处理错误的
      } else {
        layer.handler_request(req, res, next)
      }
    } else {
      // 下一层router
      next()
    }
  }
  next('11111')
}

module.exports = Router