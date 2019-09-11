// 输入Let\'s take LeetCode contest 输出 s'teL ekat edoCteeL tsetnoc 每个单词转换顺序

// export default (str) => {
//   let arr = str.split(' ')
//   // 对数组进行遍历 然后每个元素进行反转
//   let result = arr.map(item => {
//     return item.split('').reverse().join('')
//   })
//   return result.join(' ')
// }

// export default (str) => {
//   return str.split(' ').map(item => {
//     return item.split('').reverse().join('')
//   }).join(' ')
// }

// export default (str) => {
//   return str.split(/\s/g).map(item => {
//     return item.split('').reverse().join('')
//   }).join(' ')
// }

export default (str) => {
  return str.match(/[\w']+/g).map(item => {
    return item.split('').reverse().join('')
  }).join(' ')
}