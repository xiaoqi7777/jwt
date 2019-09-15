let url = require('url')
module.exports = {
  get url() {
    // 映射到原本的url
    return this.req.url
  },
  get path() {
    let { pathname } = url.parse(this.req.url, true)
    return pathname
  }
}