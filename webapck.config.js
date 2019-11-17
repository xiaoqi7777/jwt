const path = require('path')
module.exports = {
  // 因为开发环境下和生产环境下的webpack配置有很多不一样的地方
  // mode: 'development',
  mode: "development",
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}