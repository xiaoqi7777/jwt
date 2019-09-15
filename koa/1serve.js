// koa 是一个class express 源码用的es5 koa源码es6
let Koa = require('./koa/application')
// 创建koa的实例
let app = new Koa()
// 默认情况下 请求会来了 会执行 第一个中间件
// 中间件函数有两个参数 第一个就是ctx!=req+res
// next进行下一个函数
// app.use((ctx, next) => {
//     console.log('1')
//     // body就是响应体
//     ctx.body = '1'
//     next()
// })

// ctx上有req属性 req属性就是原生的req
// ctx上有request和response 属性 是自己封装的

// request.req 就是 原生的req
// ctx.url === ctx.request.url 内部做了拦截 取值的时候 会去request上取

let logger = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('123')
    }, 3000)
  })
}


// ctx.path 取路径 原生上没有
// app.use((ctx, next) => {
//   ctx.response.body = '123'
//   next()
//   console.log(ctx.url)
//   // console.log(ctx.req.url)
//   ctx.body = '123'
//   console.log('==>', ctx.response.body)
//   console.log('==>1', ctx.body)
// })

// 注 next前面一定要加await 等下一个执行完成 否则就直接返回了

app.use(async (ctx, next) => {
  let a = await logger()
  console.log(222222222, a) // console.log(ctx.req.url)
  // ctx.body = '123'
  console.log('==>', ctx.response.body)
  console.log('==>2')
  next()
})

let port = 3000
app.listen(port, 'localhost', () => {
  console.log(`server start ${port}`)
})