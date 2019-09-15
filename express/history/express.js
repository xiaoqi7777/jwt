// 这是路由规则的窗口
let router = [
{
  path: '*',
  methods: '*',
  hander(req, res) {
    res.end(`Cannot ${req.methods} ${req.url}`)
  }
}]
let http = require('http')
let url = require('url')

function createApplication() {
  return {
    // get方法会把当前的路由数据放到router中
    get(path, hander) {
      router.push({
        path,
        method: 'get',
        hander
      })
    },
    listen() {
      let server = http.createServer((req, res) => {
        let { pathname } = url.parse(req.url)
        for (let i = 1; i < router.length; i++) {
          let { path, method, hander } = router[i]
          if (pathname == path && method == req.method.toLowerCase()) {
            return hander(req, res)
          }
        }
        router[0].hander(req, res)
      })
      server.listen.apply(server, arguments)
    }
  }
}

module.exports = createApplication