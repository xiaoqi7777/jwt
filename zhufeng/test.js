let options = { user: { name: 'zdpx', age: 9 }, total: 5 }

let str = `
123123
<%if(user){%>
  hello '<%=user.name%>'
<%}else{%>
  hi guest
<%}%>
<ul>
<%for(let i=0;i<total;i++){%>
  <li><%=i%></li>
<%}%>
</ul>
`

function render(str, options) {
  let head = 'let str=``;\n with(obj){ str+=`'
  str = str.replace(/<%=([\s\S]+?)%>/g, function() {
    return '${' + arguments[1] + '}'
  })
  str = str.replace(/<%([\s\S]+?)%>/g, function() {
    return "`;" + arguments[1] + ';\n str+=`'
  })
  let tail = "`};\n return str"
  let html = head + str + tail
  let fn = new Function('obj', html)
  return fn(options, html)
}


let rs = render(str, options)
console.log(rs)

let obj = { a: 1 }
with(obj) {
  console.log(a)
}