let A = [6, 4, 3, 1]

function insertion_sort(A) {
  for (let j = 1; j < A.length; j++) {
    const key = A[j] // 4
    let i = j - 1 // 0
    while (i >= 0 && A[i] > key) {
      A[i + 1] = A[i]
      i--
    }
    A[i + 1] = key
  }
}
insertion_sort(A)