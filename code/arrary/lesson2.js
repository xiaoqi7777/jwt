export default (arr) => {
  // 最大公约数
  let gcd = (a, b) => {
    if (b === 0) {
      return a
    } else {
      return gcd(b, a % b)
    }
  }
  // 转换成字符串用 正则提取
  let groupStr = arr.sort().join('')
  let groupArr = groupStr.match(/(\d)\1+|\d/g)
  while (groupArr.length > 1) {
    let oneArr = groupArr.shift().length
    let twoArr = groupArr.shift().length
    let v = gcd(oneArr, twoArr)
    if (v === 1) {
      return false
    } else {
      groupArr.unshift('0'.repeat(v))
    }
  }
  return groupArr.length ? groupArr[0].length > 1 : false
}