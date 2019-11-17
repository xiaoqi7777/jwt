const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  // mode: 'production',
  // entry 如果是一个文件的话那就是单入口 chunk名字就是main,每个chunk一般都会生成一个文件
  entry: {
    index: './src/index.js',
    login: './src/login.js',
    common: './src/common.js'
  },
  output: {
    path: path.join(__dirname, 'dist'), // 必须是绝对路径
    filename: '[name].[hash:8].js',
    //这个name 对于entry里面的key值
    // hash有3种  hash chunkHash contentHash 当原文件变化hash就变化 用来做缓存的 
  },
  // 如果你使用了devServer那么所有产出的文件都会写到内存里,而不是写入到硬盘上,主要是为了速度
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
    {
      test: /\.css$/, // 如果用到import 或者 require 文件 是css
      // 从右向左 处理css文件,loader是一个函数
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    // 这个插件是产出html文件,在编译的时候,会读取模板文件
    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定的模板名字
      filename: 'index.html', // 产出的文件名
      hash: true, // 为了避免缓存,可以在产出的资源后面添加hash值
      chunks: ['common', 'index', 'login', ], //引入多个js文件 默认是乱序, 要加入的配置(manual 手动) 才安排数组顺序加入
      chunksSortMode: 'manual', // 对引入代码块进行排序 
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'login.html',
      chunks: ['login']
    }),
  ]
}