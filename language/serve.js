let langs = {
  en: 'hello world',
  zh: '你好世界',
  ja: '日文~~~',
  'zh-CN': '中文简体'
}
let defaultLanguage = 'en'

// zh-CN;q=0.8,zh;q=0.9,en
let http = require('http')
http.createServer(function (req, res) {
  let l = req.headers['accept-language']
  if (l) {
    let rs = l.split(',').map(item => {
        let [lan, q = 'q=1'] = item.split(';')
        return {
          name: lan,
          q: Number(q.split('=')[1])
        }
      }).sort((a, b) => b.q - a.q)
      console.log('====', rs)
      for (let i = 0; i < rs.length; i++) {
        let l = rs[i].name
        if (langs[l]) {
          return res.end(langs[l])
        }
      }
      res.end(langs[defaultLanguage])
    } else {
      res.end(langs[defaultLanguage])
  }
}).listen(4000)