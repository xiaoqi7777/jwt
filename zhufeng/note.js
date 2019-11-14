/*
1、 算法依赖模型
    内存随机访问的代价是相同的 比如内存最相近的数据结构是数组
    const a = [1,2,3,4,5]
    a[2] // 消耗1
    a[4] // 消耗1
    他的索引操作，占用1单位时间(也就是消耗1的cpu指令)
    创建数组的时候 他会有很多数组方法 都会开辟一个新空间 消耗会很大
    但是 对数组索引赋值的时候 就可以简单的理解 消耗1

    对于变量赋值
    const v = 1  // 也是消耗1

    对于对象
    const obj = {}
    obj['x'] = 1 //可以简单理解 消耗1  因为他结构类似哈希表 

    + - * / ^ | >> 这些可以理解为消耗为1  在cpu内能找到对于的指令集
    '123'+'456' 字符串相加 这个和他规模相关 越大越耗时

    一般遇到库函数的时候 是没有cpu指令集  他的时间复杂度都在常量级别
    数组和字符串等操作 都是和规模相关的

    线性时间 (数组的遍历))
    function find(arr,value){
      for(let i=0;i<arr.length;i++){
        if(arr[i] === value ){
          return value
        }
      }
      return null
    }
    最坏情况下 没有找到值:
    第二行: i=0执行1次; i<arr.length 执行了N+1 i++执行了N次所以总共执行了2N+2
    第三行: 比较操作执行了N次
    第四行: 执行0次
    第七行: 执行1次
    所以算法最坏的情况下 用时 T= 2N+2+N+1 = 3N+3
    这种最坏情况下 复杂度和数据规模N相关的算法最常见 我们c称为x线性时间复杂度


    100W整数数据的排序
    - 先生成1-100W的证书
    - 写一个算法将他们随机打乱
    - 在写一个算法对他们进行排序
    - 最后输出一下自己程序的总执行时间
    function gen(w){
      const arr= []
      for(let i=0;i<w*1000;i++){
        arr[i] = i+1
      }
      let rs = fisher_yates_shuffle(arr)
      return rs
    }
    // 耗时长
    function shuffle_simpe(arr){
      return arr.sort(()=> Math.random()-0.5)
    }
    
    function fisher_yates_shuffle(arr){ 
      // 耗时 2N+1
      for(let i=0;i<arr.length-1;i++){
        // 耗时 c1*N 不清楚的情况可以找字母代替
        const j = i+Math.floor(Math.random()*(arr.length-i));
        // c2*N es6 情况 也不清楚
        [arr[i],arr[j]] = [arr[j],arr[i]]
      }
      // 最后时间 2N+2+(c1+c2)*N => (1+c1+c2)N+ c3
      return arr
    }

    sort 问题
    let c = 0
    for (let j = 0; j < 1000; j++) {
      const a = shuffle_simpe([1, 2, 3, 4])
      if (a[1] == 2) {
        c++
      }
    }
    console.log(c/1000)

    算法复杂度的衡量用3个字母 
    
    复杂度的表示
    渐进上界(主要的)
    渐进下界
    渐进紧密界

    插入排序
      循环不变式:每次循环结束 存在一个已经排序的列表和一个未排序的列表,j指向下一个未排序的数字(或者说已排序的最后一个)
      
      所有数据分两边
      已排序|未排序
    let A = [2,3,5,2,3,7]
    function insertion_sort(A){
      for(let j=1;j<A.length;j++){ // 1;N;N-1 
        const key = A[j]           // N-1
        let i = j-1                // N-1
        while(i>=0&&A[i]>key){     // MK
          A[i+1] = A[i]            // (MK-1)
          i--                      // (MK-1)
        }
        A[i+1] = key               // N-2
      }
    }
    两个循环 基本都是o(n^2)
    // 最好 O(N) 
          没有while 循环
    // 最坏 O(N^2) 
          while拉满,A=[4,3,2,1]
          后面每一项都会和前面进行比较 
          比较的次数 1+2+3+4+...+N => (N+N+..+N)/2 => N^2/2 最终可以说是 0(N^2)
    // 平均情况 O(N^2)
          套公式   1+...+(n/2-1) => N^2/8  

    分治
      分:将问题分解成子问题 子问题规模变小单问题不变
      治:地推解决子问题,子问题的子问题,当子问题足够小,就直接解决
      合:合并子问题的解

      代表:
      归并排序、快递排序 

      归并排序
      const sentinel = Number.MAX_SAFE_INTEGER
      function divide(p, r) {
        return Math.floor((p + r) / 2)
      }

      function conquer(A, p, q, r) {
        const A1 = A.slice(p, q)
        const A2 = A.slice(q, r)
        A1.push(sentinel)
        A2.push(sentinel)
        // k 是循环不变式 一直是处于 已排序和未排序中
        for (let k = p, i = 0, j = 0; k < r; k++) {
          A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++]
        }
      }

      // p 开始位子  r 数组长度
      function merge_sort(A, p = 0, r) {
        r = r || A.length
        if (r - p === 1) { return }
        if (r - p === 2) {
          if (A[p] > A[r - 1]) {
            [A[p], A[r - 1]] = [A[r - 1], A[p]]
          }
          return
        }
        const q = divide(p, r)
        merge_sort(A, p, q)
        merge_sort(A, q, r)
        conquer(A, p, q, r)
      }
      const A = [5, 4, 3, 2, 1]
      merge_sort(A)
      console.log(A)


    数组修改  o(1)
    数组插入元素 O(n)
    追加元素 o(1) 一般来说 复杂的是O(n)


    查找最大值
    Number.NEGATIVE_INFINITY是一个常量 负无穷
    function find_max(arr) {
      let max = Number.NEGATIVE_INFINITY
      for (let i = 0; i < arr.length; i++) {
        max = (arr[i] > max ? arr[i] : max)
      }
      console.log(max)
      return max
    }

    find_max([1, 2, 3, 4])

    等差数列求和公式
    Sn=(A1+An)n/2
    A1是第一项 An是第二项
    1+2+3+4+...+n-1 = (1+n-1)(n-1)/2 = n(n-1)/2   其实复杂度 o(n^2)

    基本上2个循环 就是o(n^2)

    冒泡 也是o(n^2)
    function swap(A, i, j) {
      const t = A[j]
      A[j] = A[i]
      A[i] = t
    }

    function fn(A) {
      for (let i = A.length; i > 0; i--) {
        for (let j = 1; j < i; j++) {
          if (A[j] < A[j - 1]) {
            swap(A, j, j - 1)
          }
        }
      }
      return A
    }
    // 算法校验的 库  跑起来不报异常就正确
    const { assert } = require('chai')
    assert.deepEqual(
      fn([5, 4, 3, 2, 1]),
      [1, 2, 3, 4, 5]
    )

    桶排序 O(n)的算法
      a 桶的数量
      n 代表数据的规模
      G 某一个算法的时长
    
function bucket_sort(A) {
  // a-桶的数量
  const a = A.length

  // 桶 - a项的二维数组
  const B = [...Array(a)].map(x => [])

  // 下标算法
  const indexFunc = (value) => value

  A.forEach(value => {
    B[indexFunc(value)].push(value)
  })
  console.log('b', B)

  // 数组平铺
  return eval(`[${B + ''}]`)
  // 1
  return eval(`[${B + ''}]`)
  // 2
  return [].concat(...B)
  // 3
  return B
    .filter(bucket => {
      return bucket.length > 0
    }) //O(n)
    .reduce((rs, bucket) => {
      // concat O(n)
      return rs.concat(bucket)
    }, [])
}

let v = bucket_sort([1, 2, 3, 1])
console.log(v, v.length)


// 数组打平
let arr = [1, [2, 3], 4]
// 默认打平一层 flat里面可以加参数
1、 arr.flat()
//    
2、 eval(`[${arr + ''}]`)
a、 所有的数组 + ''
都会被转成字符串[1, 2, 4] + '' => 1, 2, 3
b、 在外面包裹[] 最后通过eval 输出
c、 会递归的解构
3、[].concat(...arr)
a、...arr 如果遇到arr里面是2层数组嵌套 他会打平 第三层就不会处理了 不会递归的解构

  *
  /