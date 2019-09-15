let Layer = require('./layer')

function Route(path) {
  this.path = path;
  this.stack = [];
  // 表示此路由有此方法的处理函数
  this.methods = []
}
// 对 methods 的优化
Route.prototype.handle_method = function(method) {
  method = method.toLowerCase()
  return this.methods[method]
}
// 真正 路由调用的 get
Route.prototype.get = function(handler) {
  let layer = new Layer('/', handler)
  layer.method = this.method
  this.methods['get'] = true
  // 把当前调用的get方法和回调函数保存到statck中
  this.stack.push(layer)
}
// 执行stack中的所有数据
Route.prototype.dispatch = function(req, res, out) {
  let idx = 0;
  let self = this;

  function next() {
    if (idx >= this.stack.length) {
      out() //route.dispath里的out刚好是Router的next
    }
    let layer = this.stack[idx++];
    if (layer.method == req.method.toLowerCase()) {
      layer.handler_request(req, res, next);
    } else {
      next()
    }
  }
  next()
}
module.exports = Route