const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const glob = require('glob')
;
const webpack = require('webpack')
const htmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
module.exports = {
  // mode: 'production',
  mode: 'development',
  // mode: 'production',
  // entry 如果是一个文件的话那就是单入口 chunk名字就是main,每个chunk一般都会生成一个文件
  entry: {
    index: './src/index.js',
    // img: './src/img.js',
    // vendors: ['react', 'react-dom']
    // vendor: /node_modules/, // 匹配所有的依赖包
    // vendors: glob.sync('./node_modules/**/*.js'),
  },
  optimization: { // 这里放优化的内容
    minimizer: [ // 表示放优化的插件
      new TerserPlugin({
        parallel: true, // 开启多进程并进行压缩
        cache: true, // 开启缓存
      }),
      new OptimizeCSSAssetsPlugin({

      }),
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'), // 必须是绝对路径
    filename: '[name].[contenthash:8].js',
    // 这个name 对于entry里面的key值
    // hash有3种  hash chunkhash contentHash 当原文件变化hash就变化 用来做缓存的
    publicPath: '/', // 根路径 在浏览器里访问的时候要以什么路径访问
  },
  // 如果你使用了devServer那么所有产出的文件都会写到内存里,而不是写入到硬盘上,主要是为了速度
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port:8080,
    host:'localhost',
    compress:true,
    // before 是一个钩子 此钩子会在web-dev-server启动之前执行
    before(app){ // 可以通过localhost:8080/users 直接访问到
      app.get('/users',(req,res)=>{
        res.json([{id:1,name:'zzzz'}])
      })
    },
    proxy:{
      // "/api":"http://localhost:3000",//这个情况是 访问 localhost:8080/api/users =>映射到 localhost:3000/api/users
      "/api":{
        target:"http://localhost:3000",
        pathRewrite:{
          "^/api":"",// api开头的 改为空
        },// 这种情况是  访问 localhost:8080/api/users =>映射到 localhost:3000/users
      }
    }
  },
  devtool: 'source-map',
  externals :{
    "j":"jQuery",// key 是 包的名字(key 和 页面中引入的包名对应上 随便叫什么都可以 最终会通过externals代理到全局上), 值是jQuery 是全局的变量名
  },
  module: {
    rules: [
      // {
      //   test: /\.(js)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre', // 提前执行   有三种pro nomal post
      //   include: path.join(__dirname, 'src'),
      //   exclude: /node_modules/,
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // use: { ·
        //   loader: 'babel-loader',
        //   options: {
        //     "presets": [ // 插件的集合
        //       "@babel/preset-env", //转义ES6 ES7
        //       "@babel/preset-react", //转义 jsx语法
        //     ],
        //     "plugins": [ // 每个插件代表一个规则
        //       ["@babel/plugin-proposal-decorators", { legacy: true }],
        //       ["@babel/plugin-proposal-class-properties", { loose: true }],
        //       ['@babel/plugin-transform-runtime',{
        //         corejs:false,
        //         helpers:true,
        //         regenerator:true,
        //         useESModules:true
        //       }]
        //     ]
        //   }
        // }
      },
      {
        test: /\.css$/, // 如果用到import 或者 require 文件 是css
        // 从右向左 处理css文件,loader是一个函数
        // MiniCssExtractPlugin.loader 先收集
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        }, 'postcss-loader', 'less-loader'],
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
          },
        },
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(html|htm)/,
        loader: 'html-withimg-loader',
      },
      // {
      //   test: /\.(gif|png|jpg|jpeg|svg)$/,
      //   use: 'file-loader'
      // },
    ],
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
      chunks: ['index','vendors'],// 不写的情况下 会注入所有的资源
      chunksSortMode: 'manual',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].[contentHash].css', // 打包文件的名字 对应的entry的key
      chunkFilename: '[id].css', // 异步加载用的
    }),
    //此插件会自动向所有模块注入一个_变量,引用的就是lodash模块
    //这种注入模块相当于向模块内部注入了一个局部变量
    new webpack.ProvidePlugin({
      _:'lodash'
    }),
    new htmlWebpackExternalsPlugin({
      externals:[
        {
          module:'$',//页面引入模块的名字
          entry:'https://cdn.bootcss.com/jquery/3.4.1/jquery.js',
          global:'jQuery',//从全局对象的那个属性上获取导出的值
        }
      ]
    })
  ],
}
;