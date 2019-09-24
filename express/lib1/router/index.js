let Route = require('./route')
let Layer = require('./layer')
let url = require('url')

function Router() {
  this.statck = []
}

Router.prototype._route = function(path) {
  let route = new Route(path)
  // 首先 每一层 处理函数都是 Layer,一层里面的所有route都放在Route中,route.dispatch.bind(route) 会放到Layout 的处理函数中 接手req,res,next等参数。
  let layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route
  // 当前layout层结构  就是的 path和一堆处理函数
  this.statck.push(layer)
  return route
}

Router.prototype.get = function(path, ...handler) {
  console.log('arguments', handler.length)
  // 往当前路由添加路由
  let route = this._route(path)
  // 当route添加handle
  // console.log('get luyou', handler, handler.length)
  route.get(handler)
}
Router.prototype.handle = function(req, res, out) {
  let index = 0;
  let self = this
  let { pathname } = url.parse(req.url, true)

  function next() {
    if (index >= self.statck.length) {
      return out(req, res)
    }
    let layer = self.statck[index++]
    // 当前一层router
    if (layer.match(pathname) && layer.route && layer.route.handler_method(req.method)) {
      layer.handler_request(req, res, next)
    } else {
      // 下一层router
      next()
    }
  }
  next()
}

module.exports = Router