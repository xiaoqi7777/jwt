let express = require('express')
let app = express()
//静态目录 static() 里面放 访问静态目录的位子
app.use(express.static(__dirname))

app.listen(4000, () => {
  console.log('listen start')
})