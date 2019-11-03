let Application = require('./application')
const Router = require('./router')

function createApplication() {
  return new Application()
  // get方法会把当前的路由数据放到router中
}
createApplication.Router = Router

module.exports = createApplication