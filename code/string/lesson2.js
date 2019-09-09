// 找连续相同字符串 用match 匹配

export default (str) => {
    // 建立数据结构，堆栈，用来保存数据
    // a = 偶数  a^1 = 就是偶数+1  若 a 是基数 则 a^1 = 就是基数减一  一般处理1和0之间的关系    
    // a ^ b	对于每一个比特位，当两个操作数相应的比特位有且只有一个1时，结果为1，否则为0。
    let rs = []

    function match(len) {
        let j = len.match(/^(0+|1+)/)[0]
        let o = (j[0] ^ 1).toString().repeat(j.length)
        let reg = new RegExp(`^(${j}${o})`)
        if (reg.test(len)) {
            return RegExp.$1
        } else {
            return ''
        }
    }
    for (let i = 0; i < str.length - 1; i++) {
        let len = match(str.slice(i))
        if (len) {
            rs.push(len)
        }
    }
    return rs
}