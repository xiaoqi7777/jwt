// import './less/index.less'
// import './sass/index.scss'
// import './index.css'

//  react
// import React from 'react';
// import ReactDom from 'react-dom'
// ReactDom.render( < div>123</div>,document.getElementById('root'))


// 装饰器
/*
configurable: true
enumerable: true
initializer: ƒ initializer()
writable: false
*/
function readonly(target,key,discriptor){
  console.log(discriptor)
  discriptor.writable = false
}
class Person{
  @readonly PI = 3.14;
}
let p = new Person()
p.PI = 3.15
console.log(p.PI)