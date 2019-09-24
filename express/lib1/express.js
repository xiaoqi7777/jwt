let Application = require('./application')

function createApplication() {
  return new Application()
  // get方法会把当前的路由数据放到router中
}

module.exports = createApplication