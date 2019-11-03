let http = require('http')
// methods 里面包含了所有的方法名 都是小写，是一个数组
let methods = require('methods')
let Router = require('./router')
let slice = Array.prototype.slice

function Application() {
  this.settings = {} // 用来保存参数
  this.engines = {} //用来保存文件扩展名和渲染的函数
}
// 懒加载 
Application.prototype.lazyrouter = function() {
  if (!this._router) {
    this._router = new Router()
  }
}
Application.prototype.param = function(name, handler) {
  this.lazyrouter()
  this._router.param.apply(this._router, arguments)
}
// 传二个参数表示设置 传一个参数表示获取
Application.prototype.set = function(key, val) {
  if (arguments.length == 1) {
    return this.settings[key]
  }
  this.settings[key] = val
}
// 规定何种文件用什么方法来渲染
Application.prototype.engine = function(ext, render) {
  let extension = ext[0] == '.' ? ext : '.' + ext
  this.engines[extension] = render;
}
methods.forEach(method => {
  Application.prototype[method] = function(path) {
    if (method == 'get' && arguments.length == 1) {
      return this.set(arguments[0])
    }
    this.lazyrouter()
    // 把path和处理函数 都传递给 处理路径
    this._router[method].apply(this._router, slice.call(arguments))
    return this
  }
})

// Application.prototype.get = function(path, ...handler) {
//   this.lazyrouter()
//   this._router.get(path, ...handler)
//   return this
// }

// 添加中间件,而中间件和普通的路由都是放在一个数组中的，放在this._router.stack

Application.prototype.use = function() {
  this.lazyrouter();
  this._router.use.apply(this._router, arguments);
}

Application.prototype.listen = function() {
  let server = http.createServer((req, res) => {
    function done(req, res, err) {
      console.log('cannot' + err)
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    this._router.handle(req, res, done)
  })

  server.listen.apply(server, arguments)

}


module.exports = Application