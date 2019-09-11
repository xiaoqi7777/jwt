let EventEmitter = require('evnet')
let http = require('http')
let context = require('./context')
let request = require('./request')
let response = require('./response')
class Application extends EventEmitter {
    constructor(pops) {
        super()
        this.middleware = []
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
    }
    createContext(req, res) {
        let ctx = this.context;
        ctx.request = this.request //request内部自己封装的
        ctx.response = this.response
        ctx.req = req
        ctx.res = res
        return ctx
    }
    handleRequest(req, res) {
        // 先要创建一个context对象
        let ctx = this.createContext(req, res)
        // 要把所有的中间件进行组合
        this.middleware[0](ctx)
    }
    use(cb) {
        this.middleware.push(cb)
    }
    listen(...args) {
        let server = http.createServer(this.handleRequest.binf(this))
        server.listen(...args)
    }
}