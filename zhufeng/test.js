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