const fs = require('fs')


function render(filepath, options, done) {
  fs.readFile(filepath, 'utf8', (err, str) => {
    let head = 'let tpl = ``;\n with(obj){ tpl=`'
    str = str.replace(/<%=([\s\S]+?)%>/g, function() {
      return '${' + arguments[1] + '}'
    })
    str = str.replace(/<%([\s\S]+?)%>/g, function() {
      return '`;' + arguments[1] + ';\n tpl=`'
    })
    let stail = '`}; return tpl'
    let html = head + str + stail
    let fn = new Function('obj', html)
    let rs = fn(options, html)
    done(err, rs)
  })
}
module.exports = render