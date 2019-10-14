let Route = require('./route')
let Layer = require('./layer')
let url = require('url')
let methods = require('methods')
let slice = Array.prototype.slice

function Router() {
  function router(req, res, next) {
    // routet.handle 会指向他 proto.handle
    router.handle(req, res, next)
  }
  Object.setPrototypeOf(router, proto)
  router.statck = []
  return router
}
let proto = Object.create(null)
proto._route = function(path) {
  let route = new Route(path)
  // 首先 每一层 处理函数都是 Layer,一层里面的所有route都放在Route中,route.dispatch.bind(route) 会放到Layout 的处理函数中 接手req,res,next等参数。
  let layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route
  // 当前layout层结构  就是的 path和一堆处理函数
  this.statck.push(layer)
  return route
}

proto.use = function(path, handler) {
  if (typeof handler != 'function') {
    handler = path
    path = '/'
  }
  let layer = new Layer(path, handler)
  layer.route = undefined; // 我们正是通过layer有没有route来判断是中间件 还是路由
  this.statck.push(layer);
}

methods.forEach(method => {
  proto[method] = function(path) {
    // 是往router 里面添加一层
    let route = this._route(path)
    route[method].apply(route, slice.call(arguments, 1))
    return this
  }
})

/**
 * 1、处理中间件
 * 2、处理子路由容器
 * 
 * 
 */
proto.handle = function(req, res, out) {
  // slashAdded是否添加过/ removed指的是被移除的字符串
  let index = 0;
  let self = this;
  let slashAdded = false;
  let removed = '';
  let { pathname } = url.parse(req.url, true)
  // err 是接受错误处理
  function next(err) {
    if (removed.length > 0) {
      req.url = removed + req.url;
      removed = "";
    }
    if (index >= self.statck.length) {
      return out(req, res, err)
    }
    let layer = self.statck[index++]
    // 当前一层router
    if (layer.match(pathname)) {
      if (!layer.route) { //这一层是中间件层
        removed = layer.path;
        req.url = req.url.slice(removed.length)
        if (err) {
          layer.handler_error(err, req, res, next)
        } else {
          layer.handler_request(req, res, next)
        }
      } else {
        // 是路由
        if (layer.route && layer.route.handler_method(req.method)) {
          layer.handler_request(req, res, next)
        } else {
          // 下一层router
          next(err)
        }
      }
    } else {
      next(err)
    }
  }
  next()
}

module.exports = Router