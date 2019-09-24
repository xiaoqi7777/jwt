let http = require('http')
let url = require('url')
// methods=>['get','post']
let methods = require('methods')
let slice = Array.prototype.slice.call;

// 实现router 和 应用的分离
let Router = require('./router')

function Application() {
  // this._router = new Router();
}

Application.prototype.lazyrouter = function() {
  if (!this._router) {
    this._router = new Router();
  }
}
// 将所有的请求方式 提前循环
methods.forEach(function(method) {
  Application.prototype[method] = function(path) {
    this.lazyrouter();
    // 这样写可以支持多个处理函数
    this._router[method].apply(this._router, slice(arguments))
    return this;
  }
})
// 懒加载
// Application.prototype.get = function(path, handler) {
//   this.lazyrouter();
//   this._router.get(path, handler)
// }
Application.prototype.listen = function() {
  let self = this
  let server = http.createServer((req, res) => {
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    // 如果路由系统无法处理,没有一条路由跟请求匹配,就交给done来处理
    self._router.handle(req, res, done)
  })
  // server.listen.apply(server, arguments)
  server.listen(...arguments)
}

module.exports = Application