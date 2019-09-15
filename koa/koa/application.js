let EventEmitter = require('events')
let http = require('http')
let context = require('./context')
let request = require('./request')
let response = require('./response')
class Application extends EventEmitter {
  constructor(pops) {
    super()
    this.middlewares = []
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
  }
  createContext(req, res) {
    let ctx = this.context
    ctx.request = this.request //request内部自己封装的
    ctx.response = this.response
    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }
  compose(ctx, middlewares) {
    // console.log('middlewares', middlewares.length)
    // let fn = middlewares.reduce((a, b) => (ctx, ...args) => a(ctx, () => b(ctx, ...args)))
    // return fn(ctx, () => {})
    // 主要处理了 promise 的逻辑
    function fn(index) {
      if (index === middlewares.length) return Promise.resolve()
      let route = middlewares[index]
      // Promise.resolve这里的处理是防止 函数一定要返回promise
      return Promise.resolve(route(ctx, () => fn(index + 1)))
    }
    return fn(0)
  }
  handleRequest(req, res) {
    // 先要创建一个context对象
    let ctx = this.createContext(req, res)
    // 要把所有的中间件进行组合
    // this.middlewares[0](ctx)
    let p = this.compose(ctx, this.middlewares)
    res.statusCode = 404;
    res.setHeader('Content-Disposition', 'attachment');
    p.then(function() {
      let body = ctx.body;
      if (body instanceof Stream) { // 先判断流，在判断是不是对象
        body.pipe(res); // 异步方法
      } else if (typeof(body) === 'number') {
        res.setHeader('Content-Type', 'text/plain;charset=utf8');
        res.end(body.toString());
      } else if (typeof body == 'object') {
        res.setHeader('Content-Type', 'application/json;charset=utf8');
        res.end(JSON.stringify(body));
      } else if (typeof body === 'string' || Buffer.isBuffer(body)) {
        res.setHeader('Content-Type', 'text/plain;charset=utf8');
        res.end(body);
      } else {
        res.end(`Not Found`);
      }
    }).catch(e => {
      this.emit('error', e);
    });
  }
  use(cb) {
    this.middlewares.push(cb)
  }
  listen(...args) {
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}

module.exports = Application