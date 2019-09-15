let app = {}
app.middlewares = []
app.use = function(cb) {
  app.middlewares.push(cb)
}

app.use((next) => {
  console.log(1, next)
  next()
  console.log(2)
})

app.use((next) => {
  console.log(3, next)
  next()
  console.log(4)
})

// app.use((next) => {
//     console.log(5)
//     next()
//     console.log(6)
// })

let fn = app.middlewares.reduce((a, b) => {
  return (...args) => a(() => b(...args))
})
fn('11')
// let fn = app.middlewares.reduceRight((a, b) => {
//     return () => b(a)
// }, () => {})
// fn()
// function dispatch(index) {
//     // 防止溢出
//     if (index === app.middlewares.length) return () => {}
//     //第一次的中间件
//     let route = app.middlewares[index]
//     route(() => dispatch(index + 1))
// }
// dispatch(0)