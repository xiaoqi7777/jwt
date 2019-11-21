let express = require('express')
let app = express()
app.get('/users',(req,res)=>{
  res.json([{id:1,name:'zzzz'}])
})

app.listen(3000)