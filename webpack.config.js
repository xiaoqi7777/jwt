const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  mode: 'production',
  // mode: 'development',
  // mode: 'production',
  // entry 如果是一个文件的话那就是单入口 chunk名字就是main,每个chunk一般都会生成一个文件
  entry: {
    index: './src/index.js',
    img: './src/img.js',
    login: './src/login.js',
    common: './src/common.js'
  },
  optimization: { // 这里放优化的内容
    minimizer: [ //表示放优化的插件
      // new TerserPlugin({
      //   parallel: true, //开启多进程并进行压缩
      //   cache: true, //开启缓存
      // }),
      new OptimizeCSSAssetsPlugin({

      })
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'), // 必须是绝对路径
    filename: '[name].[hash:8].js',
    //这个name 对于entry里面的key值
    // hash有3种  hash chunkhash contentHash 当原文件变化hash就变化 用来做缓存的 
    publicPath: '/', // 根路径 在浏览器里访问的时候要以什么路径访问
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
        // MiniCssExtractPlugin.loader 先收集
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            // 把文件拷贝到那个目录
            outputPath: 'imgs',
            // 重写output 里的publicPath 注意这里要加/ 表示根目录 不加就是当前目录
            publicPath: '/imgs',
            // name: '[name].[ext]'
          }
        }
      },
      {
        test: /\.(html|htm)/,
        loader: 'html-withimg-loader'
      }
      // {
      //   test: /\.(gif|png|jpg|jpeg|svg)$/,
      //   use: 'file-loader'
      // },
    ]
  },
  plugins: [
    // 这个插件是产出html文件,在编译的时候,会读取模板文件
    // new HtmlWebpackPlugin({
    //   template: './src/index.html', // 指定的模板名字
    //   filename: 'index1.html', // 产出的文件名
    //   hash: true, // 为了避免缓存,可以在产出的资源后面添加hash值
    //   chunks: ['common', 'index', 'login', ], //引入多个js文件 默认是乱序, 要加入的配置(manual 手动) 才安排数组顺序加入
    //   chunksSortMode: 'manual', // 对引入代码块进行排序 
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['img']
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].[contentHash].css', //打包文件的名字 对应的entry的key
      chunkFilename: '[id].css' // 异步加载用的
    })
  ]
}