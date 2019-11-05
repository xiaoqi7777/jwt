// const express = require('../express')
let express = require('../express/lib3/express')
const path = require('path')
const html = require('../express/lib3/html.js')
const app = express()
const fs = require('fs')


// views是用来设置模板存放根目录
app.set('views', path.resolve(__dirname, 'views'))
// 设置模板引擎 如果render没有指定模板后台名 会以这个作为后缀名
app.set('view engine', 'html')

// require('ejs').__express => render(filepath,options,callback)
// 用来设置模板引擎,遇到html结尾的模板用html来进行渲染
// app.engine('.html', require('ejs').__express)
app.engine('html', html)

app.use(function(req, res, next) {
  res.render = function(name, options) {
    // 模板后缀
    let ext = '.' + app.get('view engine')
    // 模板文件的名字
    name = name.indexOf('.') == -1 ? name + ext : name
    // 模板位子
    let filepath = path.join(app.get('views'), name)
    // 通过模板后缀 获取对应的渲染引擎
    let render = app.engines[ext]

    function done(err, rs) {
      res.setHeader('Content-Type', 'text/html')
      res.end(rs)
    }
    render(filepath, options, done)
  }
  next()
})

// 当客户端以get方式访问/路径的时候执行对应的回调函数
app.get('/', function(req, res, next) {
  // render 第一个参数是模板的相对路径 模板名称 数据对象
  res.render('index', { title: 'hello', user: { name: 'zfxp' } })
})
app.listen(3000)



// ejs 单个渲染原理
// let str = `hello <%=name%> world <%=age%>`;
// let options = { name: 'zdpx', age: 9 }

// function render(str, options) {
//   return str.replace(/<%=(\w+)%>?/g, ($0, $1, $2, $3) => {
//     return options[$1]
//   })
// }

// let rs = render(str, options)
// console.log(rs)

// ejs if渲染原理
// let options = { user: { name: 'zdpx', age: 9 }, total: 5 }
// let str = `
// <%if(user){%>
//   hello '<%=user.name%>'
// <%}else{%>
//   hi guest
// <%}%>
// <ul>
// <%for(let i=0;i<total;i++){%>
//   <li><%=i%></li>
// <%}%>
// </ul>
// `

// function render(str, options) {
//   let head = "let tpl = ``;\n with(obj){ \n tpl+=` "
//   str = str.replace(/<%=([\s\S]+?)%>/g, function() {
//     return "${" + arguments[1] + "}"
//   })
//   str = str.replace(/<%([\s\S]+?)%>/g, function() {
//     return "`;\n" + arguments[1] + "\n;tpl+=`";
//   })
//   let tail = "`} \n return tpl;"
//   let html = head + str + tail;
//   console.log('html=>', html)
//   let fn = new Function('obj', html)
//   return fn(options)
// }


// let rs = render(str, options)
// console.log(rs)

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

  ejs  用法
  取值 
    <%=age%> 取对象age的值
  循环
    <%if(user){%>
      hello <%=user.name%>
    <%}else{%>
      hi guest
    <%}%>

  */