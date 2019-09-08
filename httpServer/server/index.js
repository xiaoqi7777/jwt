let http = require('http')
let fs = require('fs')
let url = require('url')
let path = require('path')
// let { promisify } = require('util')
let mz = require('mz/fs')
let mime = require('mime')
let chalk = require('chalk')
// console.log(chalk.green('1111'))
let ejs = require('ejs')
// 压缩流
let zlib = require('zlib')
// let str = fs.readFileSync(path.join(__dirname, './index.html'), 'utf8')
// let rs = ejs.render(str, { hello: 'name' })
// let rs = ejs.render(str, { arr: [1, 2, 3] })

let tmpl = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8')

class Server {
  constructor (config) {
    this.config = config
    this.tmpl = tmpl // 读取的模板
  }
  sendError (req, res, e) {
    res.statusCode = 404
    res.end('not fond')
  }

  async handleRequest (req, res) {
    let { dir } = this.config
    let { pathname } = url.parse(req.url)
    let realPath = path.join(dir, pathname)

    try {
      let statObj = await mz.stat(path.join(realPath))
      if (statObj.isDirectory()) {
        let html = path.join(realPath, 'index.html')
        try {
          await mz.access(html)
          this.sendFile(req, res, null, html)
        } catch (e) {
          console.log('22')
          // 是目录
          let dirs = await mz.readdir(realPath)
          dirs = dirs.map(item => ({
            name: item, // 路径的名字
            path: path.join(pathname, item) // 跳转路径
          }))
          let renderStr = ejs.render(this.tmpl, {
            data: {
              dirs: dirs
            }
          })
          res.setHeader('Content-Type', 'text/html;charset=utf8')
          res.end(renderStr)
        }
      } else {
        // 是文件
        this.sendFile(req, res, statObj, realPath)
      }
    } catch (e) {
      this.sendError(req, res, e)
    }
    // 启动服务后默认把当前文件夹的内容 展现给用户
    // 先看当前访问的路径是不是文件夹,如果是文件夹就找index.html
    // 没有index.html 返回读取目录的结果
    // 如果是文件直接显示即可
    // console.log('222222222')
    // res.end('start')
  }
  sendFile (req, res, statObj, realPath) {
    res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf8')
    // let gzip = null
    // if (gzip = this.gzip(req, res)) {
    //   fs.createReadStream(realPath).pipe(gzip).pipe(res)
    // }
    fs.createReadStream(realPath).pipe(res)
  }
  gzip (req, res) {
    let gzip = req.headers['accept-encoding']
    if (gzip) { // 返回一个压缩流 转化流
      if (gzip.match(/\bgzip\b/)) { // 支持gzip格式压缩
        res.setHeader('Content-Encoding', 'gzip')
        return zlib.createGzip()
      } else if (gzip.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate')
        return zlib.createDeflate()
      }
    } else {
      return false
    }
  }
  start () {
    // 就是开启一个服务
    let server = http.createServer(this.handleRequest.bind(this))
    let { port, host } = this.config
    server.listen(port, host, () => {
      console.log('开启服务', port)
    })
  }
}
module.exports = Server
