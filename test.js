// function quickSort(arr) {
//   var len = arr.length;
//   if (len < 2) {
//     return arr;
//   }
//   var mid = arr.splice(Math.floor(len / 2), 1)[0];
//   var left = [],
//     right = [];
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] < mid) {
//       left.push(arr[i])
//     } else {
//       right.push(arr[i])
//     }
//   }
//   return quickSort(left).concat([mid], quickSort(right))
// }

function selectSort(arr) {
  var len = arr.length;
  var minIndex = 0;
  for (var i = 0; i < len - 1; i++) {
    minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    var temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr
}

let rs = selectSort([1, 4, 6, 5, 1, 2])
console.log('==1', rs)