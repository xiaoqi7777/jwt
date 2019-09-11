// 找连续相同字符串 用match 匹配


export default (str) => {
  let rs = []

  function match(len) {
    // r=>获取第一个连续的数值
    let r = len.match(/^(0+|1+)/)[0]
    // j=>获取r对应的连续值
    let j = (r[0] ^ 1).toString().repeat(r.length)
    // reg => 要查找的规律
    let reg = new RegExp(`^(${r}${j})`)
    if (reg.test(len)) {
      // RegExp.$1 => 匹配分组的第一个值
      return RegExp.$1
    } else {
      return ''
    }
  }
  // 做位移
  for (let i = 0; i < str.length - 1; i++) {
    let len = match(str.slice(i))
    if (len) {
      rs.push(len)
    }
  }
  return rs
}
// export default (str) => {
//     // 建立数据结构，堆栈，用来保存数据
//     // a = 偶数  a^1 = 就是偶数+1  若 a 是基数 则 a^1 = 就是基数减一  一般处理1和0之间的关系    
//     // a ^ b	对于每一个比特位，当两个操作数相应的比特位有且只有一个1时，结果为1，否则为0。
//     let rs = []
//     function match(len) {
//         let j = len.match(/^(0+|1+)/)[0]
//         let o = (j[0] ^ 1).toString().repeat(j.length)
//         let reg = new RegExp(`^(${j}${o})`)
//         if (reg.test(len)) {
//             return RegExp.$1
//         } else {
//             return ''
//         }
//     }
//     for (let i = 0; i < str.length - 1; i++) {
//         let len = match(str.slice(i))
//         if (len) {
//             rs.push(len)
//         }
//     }
//     return rs
// }