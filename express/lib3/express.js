let Application = require('./application')
let router = require('./route')

function express() {

  return new Application()
}
express.Router = router
module.exports = express