function Layer(path, handler) {
  this.path = path
  this.handler = handler
}

// 判断这一层 和传入的路径 是否匹配
Layer.prototype.match = function(path) {
  return this.path == path;
}

Layer.prototype.handler_request = function(req, res, next) {
  this.handler(req, res, next)
}

module.exports = Layer