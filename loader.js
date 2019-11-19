// let glob = require('glob')
var glob = require("glob")

// glob(".src/**/*.js", function(er, files) {
//   console.log(files)
// })


let rs = glob.sync('./src/**/*.js')
console.log(rs)