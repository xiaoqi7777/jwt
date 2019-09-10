// koa 是一个class express 源码用的es5 koa源码es6
let Koa = require('koa')
// 创建koa的实例
let app = new Koa()
// 默认情况下 请求会来了 会执行 第一个中间件
// 中间件函数有两个参数 第一个就是ctx!=req+res
// next进行下一个函数
app.use((ctx, next) => {
    console.log('1')
    // body就是响应体
    ctx.body = '1'
    next()
})
app.use((ctx, next) => {
    console.log('2')
    ctx.body = '2'
    next()
    ctx.body = '4'
})
let port = 3000
app.listen(port, 'localhost', () => {
    console.log(`server start ${port}`)
})