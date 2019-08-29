const crypto = require('crypto')

// 编码
function encode (payload, key) {
    let header = { type: 'JWT', alg: 'sha256' }// 声明类型和算法
    var segments = []// 声明一个数组
    segments.push(base64urlEncode(JSON.stringify(header)))// 对header进行base64
    segments.push(base64urlEncode(JSON.stringify(payload)))// 对负载进行base64
    segments.push(sign(segments.join('.'), key))// 加入签名
    return segments.join('.')
}

// 加密
function sign (input, key) {
    return crypto.createHmac('sha256', key).update(input).digest('base64')
}

// 解码
function decode (token, key) {
    if (!token) {
      throw new Error('verify failed')
    } else {
      var segments = token.split('.')
      var headerSeg = segments[0]
      var payloadSeg = segments[1]
      var signatureSeg = segments[2]

      var header = JSON.parse(base64urlDecode(headerSeg))
      var payload = JSON.parse(base64urlDecode(payloadSeg))
      // 验证签名算法
      if (signatureSeg != sign([headerSeg, payloadSeg].join('.'), key)) {
          throw new Error('verify failed')
      }
      // 过期时间verify
      if (payload.exp && Date.now() > payload.exp) {
          throw new Error('Token expired')
      }
      return payload
    }
}

function base64urlEncode (str) {
    return Buffer.from(str).toString('base64')
}

function base64urlDecode (str) {
    return Buffer.from(str, 'base64').toString()
}

module.exports = {
    sign: encode,
    verify: decode
}