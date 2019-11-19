let glob = require('glob')

let rs = glob.sync('./src/**/*.{js,gif}')
console.log(rs)