let proto = {}

// 正向代理 获取ctx.xx 的时候 他会代理到ctx[property].xx上
function defineGetter(property, key) {
  proto.__defineGetter__(key, function() {
    console.log('==get', property, key)
    return this[property][key]
  })
}
// 反向代理  给ctx.body 赋值的时候 他会设置到ctx[property].body 上
function defineSetter(property, key) {
  proto.__defineSetter__(key, function(val) {
    console.log('xxxx=》', property, key)
    this[property][key] = val
  })
}
defineGetter('request', 'path')
defineGetter('request', 'url')
defineGetter('response', 'body')
defineSetter('response', 'body')

module.exports = proto

// // 3种代理
// obj = {
//   request: '123',
//   get url1() {
//     return this.request
//   }
// }
// Object.defineProperty(obj, 'url3', {
//   get: function() {
//     return this.request
//   }
// })
// obj.__defineGetter__('url2', function() {
//   return this.request
// })
// obj
// console.log(obj.url1)
// console.log(obj.url2)
// console.log(obj.url3)