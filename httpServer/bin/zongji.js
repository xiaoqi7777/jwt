/*
 获取命令行下 解析用户执行的参数
 http-server --help 第一个是node执行文件  第二个是执行的文件名 后面的才是参数
// commander 用来解析他们的
console.log(process.argv)

commander 用法
let commander = require('commander')
commander.version('1.0.0').parse(process.argv)
http-server -V 就能打印出来

ejs
  <!-- 处理字符串 用 <%=hello%> -->

  */