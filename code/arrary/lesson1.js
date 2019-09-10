export default (str) => {
    // 建立电话号码键盘映射
    let map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
    // 输入的字符串按单字符分隔变成数组 234=>[2,3,4]
    let num = str.split('')
    // 保存键盘映射的字母内容 23=>['abc','def']
    let code = []
    num.forEach(item => {
        if (map[item]) {
            code.push(map[item])
        }
    })
    let comb = (arr) => {
        // 临时变量用来保存 前两个组合的结果  
        let tmp = []
        // 最外层的循环是遍历第一个元素
        for (let i = 0, il = arr[0].length; i < il; i++) {
            for (let j = 0, jl = arr[1].length; j < jl; j++) {
                tmp.push(`${arr[0][i]}${arr[1][j]}`)
            }
        }
        arr.splice(0, 2, tmp)
        if (arr.length > 1) {
            comb(arr)
        } else {
            return tmp
        }
    }
    return comb(code)
}