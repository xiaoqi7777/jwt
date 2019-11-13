let script = `
let tpl = "";
with(obj) {
  if (user) {
    tpl += "hello cc"
  } else {
    tpl += "hello guest"
  }
}
return tpl;
`

let obj = { user: { name: 'zfpx' } };
let fn = new Function('obj', script)
let rs = fn(obj)
console.log(rs)

/*
 js 有三种作用域
    全局作用域
    函数作用域
    with作用域
    在with作用域里 变量名可以从obj的属性上取值
    let obj = {name:'xxx'}
    with(obj){
      console.log('hello',name)//=>xxx
    }
*/