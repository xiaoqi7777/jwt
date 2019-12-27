let request = require('request')
let options = {
  url: 'http://localhost:4000/post', //路径
  method: 'POST', //请求方式
  json: true, //希望返回的数据格式 是json格式
  headers: { //请求头
    "Content-Type": "application/json"
  },
  body: {
    name: 'sg',
    age: 18
  }
}

request(options, function(err, response, body) {
  console.log('err', err)
  console.log('status', response.statusCode)
  console.log('success', body)
})