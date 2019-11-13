let request = require('request')
const fs = require('fs')
let path = require('path')
let url = 'http://localhost:3001/upload'
let formData = {
  name: 'sg',
  avatar: { //文件类型
    value: fs.createReadStream(path.join(__dirname, 'baidu.png')), // 这是一个可读流,存放头像的内容
    options: {
      filename: 'baidu.png',
      contentType: 'image/png'
    }
  },
}

// url formData 格式都是写死的
request.post({ url, formData }, function(err, response, body) {
  console.log('err', err)
  // console.log('status',response.statusCode)
  console.log('success', body)
})