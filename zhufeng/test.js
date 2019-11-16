function divide(p, r) {
  return Math.floor((p + r) / 2)
}

function merge(A, p, q, r) {
  // 拆分 2,10 | 3,7
  const A1 = A.slice(p, q)
  const A2 = A.slice(q, r)
  // 当j和k 匹配完时候就成2 但是数组中只有2个数 一般给他们一个哨兵
  // 哨兵
  A1.push(Number.POSITIVE_INFINITY)
  A2.push(Number.MAX_SAFE_INTEGER)

  for (let i = p, j = 0, k = 0; i < r; i++) {
    if (A1[j] < A2[k]) {
      A[i] = A1[j++]
    } else {
      A[i] = A2[k++]
    }
    // [p,i]区间已经排序
  }

  return A
}

function merge_sort(A, p, r) {
  if (r - p === 1) {
    return
  }
  const q = divide(p, r)
  merge_sort(A, p, q)
  merge_sort(A, q, r)
  merge(A, p, q, r)
  return A
}

const { assert } = require('chai')
// 单个比较用 equal   数组多个用deepEqual
// assert.equal(divide(0, 10), 5)
// assert.equal(divide(0, 10), 5)
// assert.equal(divide(0, 3), 1)

assert.deepEqual(
  merge([2, 10, 3, 7], 0, 2, 4),
  [2, 3, 7, 10],
  'error1')

// 测试只有2个的情况
assert.deepEqual(
  merge([10, 2, 3, 7], 0, 1, 2),
  [2, 10, 3, 7],
  'error2')

assert.deepEqual(
  merge([10, 2, 7, 3], 2, 3, 4),
  [10, 2, 3, 7],
  'error3')


assert.deepEqual(
  merge([10, 2, 3], 0, 1, 3),
  [2, 3, 10],
  'error3')

assert.deepEqual(
  merge_sort([10, 3, 100], 0, 3),
  [3, 10, 100],
  'error4'
)