let Router = require('./router')
let Layer = require('./layer')
let url = require('url')
let methods = require('methods')

function Route() {
  function router(req, res, next, n2) {
    // 二级路由或者说多级路由 传递进去的是  router 函数,在layer执行的时候 会走里面来,通过router.handle 调用 proto.handle 执行
    router.handle(req, res, next, 'a1')
  }
  Object.setPrototypeOf(router, proto)
  router.stack = []
  router.paramCallbacks = []
  return router
}
let proto = Object.create(null)
proto._route = function(path) {
  let router = new Router(path)
  let layer = new Layer(path, router.dispatch.bind(router))
  layer.router = router
  this.stack.push(layer)
  return router
}
methods.forEach(method => {
  proto[method] = function(path, ...handler) {
    let router = this._route(path)
    router[method](handler)
  }
})

proto.param = function(name, cb) {
  if (!this.paramCallbacks[name]) {
    this.paramCallbacks[name] = []
  }
  this.paramCallbacks[name].push(cb)
}

proto.process_params = function(layer, req, res, done) {
  let paramCallbacks = this.paramCallbacks
  // layer.keys保存着所有的动态路由
  let keys = layer.keys
  // 当keys 没有的时候 直接返回
  if (!keys && keys.length == 0) {
    done()
  }

  let keyIndex = 0;
  let key = null;
  let name = null;
  let cbs = null;
  let val = null;

  function param() {
    if (keyIndex == keys.length) {
      return done()
    }
    key = keys[keyIndex++]
    name = key.name
    //  paramCallbacks[name] 存放的是多个情况
    cbs = paramCallbacks[name]
    val = req.params[name]
    if (!val || !cbs.length == 0) {
      return done()
    }
    execCallback()
  }
  let cbIndex = 0

  function execCallback() {
    let cb = cbs[cbIndex++]
    if (!cb) {
      return param()
    }
    cb(req, res, execCallback, val, name)
  }
  param()
}

proto.use = function(path, handler) {
  if (typeof handler != 'function') {
    handler = path
    path = '/'
  }
  let layer = new Layer(path, handler)
  layer.router = undefined
  this.stack.push(layer)
}

proto.handle = function(req, res, done, a1) {
  let { pathname } = url.parse(req.url, true)
  let self = this
  let index = 0;

  let removed = '';

  function next(err) {
    if (index == self.stack.length) {
      return done(req, res, err)
    }
    if (err) {
      return done(req, res, err)
    }
    if (removed.length > 0) {
      req.url = removed + req.url
      removed = ''
    }
    let layer = self.stack[index++]
    /*
      一个路由进来 判断方法
        请求的url 和 router收集的u rl 匹配
        请求的method 和 ro uter收集的 method 匹配
    */
    if (layer.match(pathname)) {
      if (!layer.router) {
        // 如果是二级路由 对url 做处理 然后走到中间件 执行传入的Router, 然后会再次执行handle
        let removed = layer.path
        req.url = req.url.slice(removed.length)
        // 是中间件 use
        if (err) {
          layer.handlerErr_request(err, req, res, next)
        } else {
          layer.handler_request(req, res, next)
        }
      } else {
        if (layer.router && layer.router.handle_method(req.method)) {
          req.params = layer.params
          self.process_params(layer, req, res, function() {
            layer.handler_request(req, res, next)
          })
        } else {
          next(err)
        }
      }
    } else {
      next(err)
    }
  }
  next()
}

module.exports = Route