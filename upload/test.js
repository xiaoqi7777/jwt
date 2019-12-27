let express = require('express')
let app = express()
app.use((req, res, next) => {
  console.log(req.headers.referer)
  let origin = req.headers.origin
  /*
    1、返给浏览器的数据 在请求头里面 要是没有'Access-Control-Allow-origin' 请求头 
       浏览器就会显示跨域 这儿设置就可以  第二个参数是* 就是所有
  */
  //设置那个源可以访问我
  res.setHeader('Access-Control-Allow-Origin', "*")
  //允许携带哪个头访问我
  res.setHeader('Access-Control-Allow-Headers', 'name')
  //允许哪个方法访问我 默认post get
  res.setHeader('Access-Control-Allow-Methods', 'PUT')
  //允许携带cookie  但是Access-Control-Allow-Origin 不能设置 * 其他都可以
  res.setHeader('Access-Control-Allow-Credentials', true)
  //允许前端获取哪个头
  res.setHeader('Access-Control-Expose-Headers', 'name,ss')
  //预检的存活时间 10s内 options请求只会发一次  
  res.setHeader('Access-Control-Max-Age', 10)



  if (req.method === 'options') {
    res.end() // options 没有任何意义  他不是每次都发 在固定时间内 触发一次
  }
  next()
})
//静态目录 static() 里面放 访问静态目录的位子
app.use(express.static(__dirname))

app.listen(3000, () => {
  console.log('listen start')
})