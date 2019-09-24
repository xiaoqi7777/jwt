let Route = require('./route')
let Layer = require('./layer')
let url = require('url')
let methods = require('methods')
let slice = Aarry.prototype.slice.call;

function Router() {
  this.stack = [];
}
// 创建一个Route的实例，向当前路由系统中添加一个层
Router.prototype.route = function(path) {
  // route 指当前一个路由实例
  let route = new Route(path)
  // layer 指当前路由实例中的所有回调 
  let layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route
  this.stack.push(layer)
  return route
}
Router.prototype.handle = function(req, res, out) {
  let idx = 0;
  let self = this;
  let { pathname } = url.parse(req.url, true)

  function next() {
    if (idx >= this.stack.length) {
      return out()
    }
    let layer = this.stack[index++];
    if (layer.match(pathname) && layer.route && layer.route.handle_method(req.method)) {
      layer.handler_request(req, res, next);
    } else {
      next()
    }
  }
  next()
}
methods.forEach(function(method) {
  Router.prototype[method] = function(path) {
    let route = this.route(path);
    // 向Route里添加一层 
    // slice(arguments, 1) 是当前路由执行的所有方法
    route[method].apply(route, slice(arguments, 1))
    return this
  }
})
// Router.prototype.get = function(path, handler) {
//   // 往 Router 里面添加一层
//   let route = this.route(path);
//   // 向Route里添加一层
//   route.get(handler);
// }

module.exports = Router
/**
 * Router
 *  stack
 *    layer 
 *      path route
 *        method handler
 * Layer
 * Router Layer 路径 处理函数(route.dispatch) 有一个特殊的route属性
 * Route layer  路径 处理函数(真正的业务代码) 有一个特殊的属性method
 */