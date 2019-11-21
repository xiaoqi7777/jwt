module.exports = {
  "parser":"babel-eslint",// 把源码转成语法树的工具
  "extends":"airbnb",// 继承airbnb规则
  env:{ //指定运行环境
    browser:true,
    node:true
  },
  rules:{
    "linebreak-style":"off"
    }
};