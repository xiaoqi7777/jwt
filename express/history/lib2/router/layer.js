function Layer(path, handler) {
  this.path = path
  this.handler = handler
}

// 判断这一层 和传入的路径 是否匹配
Layer.prototype.match = function(path) {
  if (this.path == path) {
    return true
  }
  if (!this.route) { //这是中间件层
    return path.startsWith(this.path)
  }
  return false;

}

Layer.prototype.handler_request = function(req, res, next) {
  this.handler(req, res, next)
}
Layer.prototype.handler_error = function(err, req, res, next) {
  if (this.handler.length !== 4) {
    return next()
  }
  this.handler(err, req, res, next)
}
module.exports = Layer