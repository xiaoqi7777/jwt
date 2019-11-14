let pathToRegexp = require('path-to-regexp')

function Layer(path, handler) {
  this.path = path
  this.handler = handler
  // 存放 动态路径 匹配的值
  this.keys = []
  this.reg = pathToRegexp(this.path, this.keys)
}
Layer.prototype.match = function(url) {

  // 路由
  if (this.path == url) {
    return this.path == url
  }
  // 路径参数
  if (this.router) {
    this.params = {}
    let matchRs = this.reg.exec(url)
    if (matchRs) {
      for (let i = 1; i < matchRs.length; i++) {
        let key = this.keys[i - 1].name
        this.params[key] = matchRs[i]
      }
      return true
    }
  }
  // 中间件
  if (!this.router) {
    return url.startsWith(this.path)
  }
}
Layer.prototype.handler_request = function(req, res, next) {
  this.handler(req, res, next, 'n2')
}
Layer.prototype.handlerErr_request = function(err, req, res, done) {

  if (this.handler.lengtg == 4) {
    return done(err)
  }
  this.handler(err, req, res, done)

}
module.exports = Layer