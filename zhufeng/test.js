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
  console.log(B)

  return B
    .filter(bucket => {
      return bucket.length > 0
    }) //O(n)
    .reduce((rs, bucket) => {
      return rs.concat(bucket)
    }, [])
}

bucket_sort([1, 2, 3, 1])