let http = require('http')
// methods 里面包含了所有的方法名 都是小写，是一个数组
let methods = require('methods')
let Router = require('./router')
let slice = Array.prototype.slice

function Application() {
  this._router = new Router()
}
// 懒加载 
Application.prototype.lazyrouter = function() {
  if (!this._router) {
    this._router = new Router()
  }
}

// 收集
// 收集 路由配置 ,对所有配置的路由 都在router.index 生成一个实例
methods.forEach(method => {
  Application.prototype[method] = function(path) {
    this.lazyrouter()
    // 把path和处理函数 都传递给 处理路径
    this._router[method].apply(this._router, slice.call(arguments))
    return this
  }
})

// 执行
// 监听的时候 用请求的数据 和 之前配置的路由进行匹配 处理
Application.prototype.listen = function() {
  let server = http.createServer((req, res) => {
    function done(req, res) {
      console.log('cannot')
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    this._router.handle(req, res, done)
  })

  server.listen.apply(server, arguments)

}


module.exports = Application